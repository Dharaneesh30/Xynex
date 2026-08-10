import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';

// Models
import User from './models/User.js';
import Order from './models/Order.js';
import Review from './models/Review.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'xynex_super_secret_key_2026';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Database Connection
const connectDB = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB via MONGO_URI');
    } else {
      console.log('No MONGO_URI provided. Starting in-memory MongoDB for zero-setup demo...');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`Connected to In-Memory MongoDB at ${mongoUri}`);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
connectDB();

// Auth Middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};

// --- AUTH ROUTES --- //

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, error: 'User already exists' });
    
    const user = await User.create({ name, email, password, avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random` });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
    
    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
      res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
    } else {
      res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/auth/me', protect, (req, res) => {
  res.json({ success: true, user: { id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user.avatar } });
});


// --- ORDER ROUTES --- //

app.post('/api/orders', protect, async (req, res) => {
  const { items, total, designImage, address } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'No order items' });
  }

  try {
    // 1. Save to DB
    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice: total,
      shippingAddress: address,
      designSnapshot: designImage || null
    });

    // 2. Email logic (simplified for space)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const formattedDate = deliveryDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    let attachments = [];
    let imageCid = '';
    if (designImage) {
      const base64Data = designImage.replace(/^data:image\/jpeg;base64,/, "");
      attachments.push({ filename: 'room-design.jpg', content: Buffer.from(base64Data, 'base64'), cid: 'designsnapshot' });
      imageCid = '<p>Your Design:</p><img src="cid:designsnapshot" style="max-width:100%; border-radius:8px;"/>';
    }

    const itemsHtml = items.map(i => `<tr><td>${i.name}</td><td>${i.qty}</td><td>$${(i.price * i.qty).toLocaleString()}</td></tr>`).join('');
    
    // Customer email
    transporter.sendMail({
      from: `"XYNEX Orders" <${process.env.SMTP_USER || 'orders@xynex.com'}>`,
      to: req.user.email,
      subject: `Your XYNEX Order Invoice - Expected ${formattedDate}`,
      html: `<h2>Thank you for your order, ${req.user.name}!</h2><p>Address: ${address}</p><table border="1" cellpadding="10" style="border-collapse: collapse;"><tr><th>Item</th><th>Qty</th><th>Total</th></tr>${itemsHtml}<tr><td colspan="2"><strong>Total Paid</strong></td><td><strong>$${total.toLocaleString()}</strong></td></tr></table>${imageCid}`,
      attachments
    }).catch(e => console.error('Email error:', e));

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
});

app.get('/api/orders/me', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

// --- REVIEWS ROUTES --- //

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch reviews' });
  }
});

app.post('/api/reviews', protect, async (req, res) => {
  const { rating, text } = req.body;
  if (!text) return res.status(400).json({ success: false, error: 'Review text is required' });

  try {
    const review = await Review.create({
      user: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
      rating: Number(rating) || 5,
      text
    });
    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add review' });
  }
});

// Seed Initial Reviews if Empty
const seedReviews = async () => {
  try {
    const count = await Review.countDocuments();
    if (count === 0) {
      await Review.insertMany([
        { user: new mongoose.Types.ObjectId(), name: "Sarah J.", avatar: "https://ui-avatars.com/api/?name=Sarah+J", text: "XYNEX made it incredibly easy to visualize the layout before committing to any purchases.", rating: 5 },
        { user: new mongoose.Types.ObjectId(), name: "Michael C.", avatar: "https://ui-avatars.com/api/?name=Michael+C", text: "The 3D design studio is a game changer! Being able to walk through my room before buying furniture gave me so much confidence.", rating: 5 },
        { user: new mongoose.Types.ObjectId(), name: "Elena R.", avatar: "https://ui-avatars.com/api/?name=Elena+R", text: "I wasn't sure if the mid-century modern sofa would fit in my apartment. Thanks to Xynex, I knew exactly how it would look.", rating: 4 }
      ]);
      console.log('Seeded initial reviews');
    }
  } catch (err) {
    console.error('Failed to seed reviews', err);
  }
};
mongoose.connection.once('open', seedReviews);

// --- DESIGN QUERY ROUTE --- //
app.post('/api/design-query', async (req, res) => {
  const { name, email, message, image, items } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  const attachments = [];
  if (image) {
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    attachments.push({ filename: 'room-design-query.jpg', content: Buffer.from(base64Data, 'base64'), cid: 'querysnapshot' });
  }

  const itemsHtml = items && items.length > 0 
    ? `<h3>Items in Room:</h3><ul>${items.map(i => `<li>${i.name}</li>`).join('')}</ul>`
    : '<p>No items placed.</p>';

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"XYNEX Design Studio" <${process.env.SMTP_USER || 'no-reply@xynex.com'}>`,
      replyTo: `"${name}" <${email}>`,
      to: process.env.SMTP_FROM || 'dharaneesh0530@gmail.com',
      subject: `Design Query from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Query:</strong></p><p>${message}</p>${itemsHtml}${image ? '<p><strong>Attached Room Design:</strong></p><img src="cid:querysnapshot" alt="Room Snapshot" style="max-width: 600px;" />' : ''}`,
      attachments
    });

    res.status(200).json({ success: true, message: 'Design query sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to process query.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
