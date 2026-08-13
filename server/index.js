import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Models
import User from './models/User.js';
import Order from './models/Order.js';
import Review from './models/Review.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'xynex_super_secret_key_2026';

const allowedOrigins = [
  process.env.FRONTEND_URL,          // e.g. https://xynex.vercel.app
  'http://localhost:5173',
  'http://localhost:3001',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));

// Database Connection — requires MONGO_URI environment variable
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('[DB] ERROR: MONGO_URI environment variable is not set. Please add it in your Render dashboard.');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[DB] Connected to MongoDB Atlas.');
  } catch (error) {
    console.error('[DB] Connection error:', error.message);
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

const adminProtect = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ success: false, error: 'Not authorized as an admin' });
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
    
    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, isAdmin: user.isAdmin } });
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
      res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, isAdmin: user.isAdmin } });
    } else {
      res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/auth/me', protect, (req, res) => {
  res.json({ success: true, user: { id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user.avatar, isAdmin: req.user.isAdmin } });
});


// --- ADMIN ROUTES --- //

app.get('/api/admin/users', protect, adminProtect, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

app.put('/api/admin/users/:id', protect, adminProtect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.isAdmin !== undefined) {
        user.isAdmin = req.body.isAdmin;
      }
      const updatedUser = await user.save();
      res.json({ success: true, user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin } });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
});

app.delete('/api/admin/users/:id', protect, adminProtect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ success: true, message: 'User removed' });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
});

// --- ORDER ROUTES --- //

// Helper: build reusable email transporter
const getTransporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

// Helper: generate order ID string
const genOrderId = (mongoId) => `XNX-${String(mongoId).slice(-8).toUpperCase()}`;

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

    const orderId = genOrderId(order._id);
    const orderDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    // Build attachments for design image
    const attachments = [];
    let designImgTag = '';
    if (designImage) {
      const mimeMatch = designImage.match(/^data:(image\/\w+);base64,/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const ext = mime.split('/')[1];
      const base64Data = designImage.replace(/^data:image\/\w+;base64,/, '');
      attachments.push({
        filename: `room-design.${ext}`,
        content: Buffer.from(base64Data, 'base64'),
        cid: 'xynex_design_snapshot'
      });
      designImgTag = `
        <div style="margin-top:32px;">
          <h3 style="color:#a78bfa;font-size:14px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Your Room Design</h3>
          <img src="cid:xynex_design_snapshot" alt="Room Design" style="width:100%;max-width:560px;border-radius:12px;border:1px solid #333;"/>
        </div>`;
    }

    // Build items rows
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const gst = subtotal * 0.18;
    const itemRowsHtml = items.map(i => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #2a2a3a;color:#e2e8f0;">
          <span style="font-weight:600;">${i.name}</span>
          ${i.color ? `<br/><span style="font-size:12px;color:#a0aec0;">Color: ${i.color}</span>` : ''}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #2a2a3a;color:#a0aec0;text-align:center;">${i.qty}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #2a2a3a;color:#e2e8f0;text-align:right;font-family:monospace;">₹${(i.price * i.qty).toLocaleString('en-IN')}</td>
      </tr>`).join('');

    // 2. Send CUSTOMER invoice email
    const customerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0d0d1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);border-radius:16px 16px 0 0;padding:40px;text-align:center;">
          <div style="font-size:28px;font-weight:900;letter-spacing:4px;color:#fff;">XYNEX</div>
          <div style="font-size:12px;color:#a78bfa;letter-spacing:3px;margin-top:4px;text-transform:uppercase;">Interior Universe</div>
          <div style="margin-top:20px;display:inline-block;background:linear-gradient(135deg,#7c3aed,#2563eb);padding:8px 20px;border-radius:20px;">
            <span style="color:#fff;font-size:13px;font-weight:600;">✓ Order Confirmed</span>
          </div>
        </td></tr>

        <!-- Thank You Message -->
        <tr><td style="background:#13132b;padding:32px 40px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">
          <h1 style="margin:0 0 8px;color:#fff;font-size:22px;">Thank you, ${req.user.name}! 🎉</h1>
          <p style="margin:0;color:#a0aec0;font-size:15px;line-height:1.6;">Your order has been placed successfully. We're excited to help transform your space! Here's your invoice for reference.</p>
        </td></tr>

        <!-- Order Info Bar -->
        <tr><td style="background:#1a1a2e;padding:20px 40px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="color:#a0aec0;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Order ID<br/><span style="color:#a78bfa;font-size:16px;font-weight:700;letter-spacing:2px;font-family:monospace;">${orderId}</span></td>
              <td style="color:#a0aec0;font-size:12px;text-transform:uppercase;letter-spacing:1px;text-align:center;">Order Date<br/><span style="color:#e2e8f0;font-size:14px;font-weight:600;">${orderDate}</span></td>
              <td style="color:#a0aec0;font-size:12px;text-transform:uppercase;letter-spacing:1px;text-align:right;">Est. Delivery<br/><span style="color:#4ade80;font-size:14px;font-weight:600;">${estimatedDelivery}</span></td>
            </tr>
          </table>
        </td></tr>

        <!-- Shipping Address -->
        <tr><td style="background:#13132b;padding:20px 40px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">
          <div style="font-size:12px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">📦 Shipping To</div>
          <div style="color:#e2e8f0;font-size:14px;line-height:1.6;">${address}</div>
        </td></tr>

        <!-- Items Table -->
        <tr><td style="background:#1a1a2e;padding:24px 40px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">
          <div style="font-size:12px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;">🛋️ Order Items</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #2a2a3a;">
            <thead>
              <tr style="background:#0d0d1a;">
                <th style="padding:12px 16px;text-align:left;color:#a0aec0;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Product</th>
                <th style="padding:12px 16px;text-align:center;color:#a0aec0;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Qty</th>
                <th style="padding:12px 16px;text-align:right;color:#a0aec0;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Amount</th>
              </tr>
            </thead>
            <tbody>${itemRowsHtml}</tbody>
          </table>
        </td></tr>

        <!-- Totals -->
        <tr><td style="background:#13132b;padding:20px 40px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="color:#a0aec0;padding:4px 0;font-size:14px;">Subtotal</td><td style="text-align:right;color:#e2e8f0;font-family:monospace;font-size:14px;">₹${subtotal.toLocaleString('en-IN')}</td></tr>
            <tr><td style="color:#a0aec0;padding:4px 0;font-size:14px;">GST (18%)</td><td style="text-align:right;color:#e2e8f0;font-family:monospace;font-size:14px;">₹${gst.toLocaleString('en-IN')}</td></tr>
            <tr><td style="color:#a0aec0;padding:4px 0;font-size:14px;">Shipping</td><td style="text-align:right;color:#4ade80;font-family:monospace;font-size:14px;">FREE</td></tr>
            <tr><td colspan="2" style="padding-top:12px;"><hr style="border:none;border-top:1px solid #2a2a3a;"/></td></tr>
            <tr><td style="color:#fff;font-size:18px;font-weight:700;padding-top:8px;">Total Paid</td><td style="text-align:right;color:#a78bfa;font-family:monospace;font-size:22px;font-weight:900;padding-top:8px;">₹${total.toLocaleString('en-IN')}</td></tr>
          </table>
        </td></tr>

        <!-- Design Snapshot -->
        ${designImgTag ? `<tr><td style="background:#1a1a2e;padding:24px 40px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">${designImgTag}</td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="background:#0d0d1a;border-radius:0 0 16px 16px;padding:32px 40px;text-align:center;border:1px solid #1e1e3a;border-top:none;">
          <p style="color:#a0aec0;font-size:13px;line-height:1.8;margin:0 0 16px;">Questions? Reply to this email or reach out to us.<br/>We'll get back to you within 24 hours.</p>
          <div style="font-size:11px;color:#4a4a6a;">© 2026 XYNEX Interior Universe · All rights reserved</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // 3. Send ADMIN notification email
    const adminItemRowsHtml = items.map(i => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #2a2a3a;color:#e2e8f0;">${i.name}${i.color ? ` <span style="color:#9ca3af;font-size:12px;">(${i.color})</span>` : ''}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #2a2a3a;color:#a0aec0;text-align:center;">${i.qty}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #2a2a3a;color:#4ade80;text-align:right;font-family:monospace;">₹${(i.price * i.qty).toLocaleString('en-IN')}</td>
      </tr>`).join('');

    const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a14;padding:30px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- Admin Header -->
        <tr><td style="background:linear-gradient(135deg,#1a1a2e,#0f3460);border-radius:14px 14px 0 0;padding:30px;">
          <div style="font-size:22px;font-weight:900;letter-spacing:3px;color:#fff;">XYNEX</div>
          <div style="font-size:12px;color:#a78bfa;letter-spacing:2px;margin-top:2px;">ADMIN NOTIFICATION</div>
          <div style="margin-top:16px;background:#dc2626;display:inline-block;padding:6px 16px;border-radius:16px;">
            <span style="color:#fff;font-size:12px;font-weight:700;">🛒 NEW ORDER RECEIVED</span>
          </div>
        </td></tr>

        <!-- Customer Info -->
        <tr><td style="background:#13132b;padding:24px 30px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">
          <div style="font-size:12px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">👤 Customer Details</div>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="color:#a0aec0;font-size:13px;padding:3px 12px 3px 0;">Name:</td><td style="color:#fff;font-weight:600;font-size:14px;">${req.user.name}</td></tr>
            <tr><td style="color:#a0aec0;font-size:13px;padding:3px 12px 3px 0;">Email:</td><td style="color:#60a5fa;font-size:14px;">${req.user.email}</td></tr>
            <tr><td style="color:#a0aec0;font-size:13px;padding:3px 12px 3px 0;">Order ID:</td><td style="color:#a78bfa;font-weight:700;font-family:monospace;font-size:14px;">${orderId}</td></tr>
            <tr><td style="color:#a0aec0;font-size:13px;padding:3px 12px 3px 0;">Date:</td><td style="color:#e2e8f0;font-size:14px;">${orderDate}</td></tr>
          </table>
        </td></tr>

        <!-- Shipping -->
        <tr><td style="background:#1a1a2e;padding:20px 30px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">
          <div style="font-size:12px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">📦 Shipping Address</div>
          <div style="color:#e2e8f0;font-size:14px;">${address}</div>
        </td></tr>

        <!-- Items -->
        <tr><td style="background:#13132b;padding:20px 30px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">
          <div style="font-size:12px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;margin-bottom:14px;">🛋️ Items Ordered</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2a3a;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#0d0d1a;">
                <th style="padding:10px 14px;text-align:left;color:#6b7280;font-size:11px;text-transform:uppercase;">Product</th>
                <th style="padding:10px 14px;text-align:center;color:#6b7280;font-size:11px;text-transform:uppercase;">Qty</th>
                <th style="padding:10px 14px;text-align:right;color:#6b7280;font-size:11px;text-transform:uppercase;">Total</th>
              </tr>
            </thead>
            <tbody>${adminItemRowsHtml}</tbody>
          </table>
        </td></tr>

        <!-- Totals -->
        <tr><td style="background:#1a1a2e;padding:20px 30px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="color:#6b7280;font-size:13px;">Subtotal</td><td style="text-align:right;color:#e2e8f0;font-family:monospace;">₹${subtotal.toLocaleString('en-IN')}</td></tr>
            <tr><td style="color:#6b7280;font-size:13px;">GST (18%)</td><td style="text-align:right;color:#e2e8f0;font-family:monospace;">₹${gst.toLocaleString('en-IN')}</td></tr>
            <tr><td colspan="2"><hr style="border:none;border-top:1px solid #2a2a3a;margin:10px 0;"/></td></tr>
            <tr><td style="color:#fff;font-weight:700;font-size:16px;">TOTAL</td><td style="text-align:right;color:#4ade80;font-family:monospace;font-size:20px;font-weight:900;">₹${total.toLocaleString('en-IN')}</td></tr>
          </table>
        </td></tr>

        <!-- Design Snapshot for Admin -->
        ${designImgTag ? `<tr><td style="background:#13132b;padding:20px 30px;border-left:1px solid #1e1e3a;border-right:1px solid #1e1e3a;">${designImgTag}</td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="background:#0a0a14;border-radius:0 0 14px 14px;padding:20px 30px;text-align:center;border:1px solid #1e1e3a;border-top:none;">
          <div style="font-size:11px;color:#374151;">XYNEX Admin Portal · Automated Order Notification</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // 4. Send emails (non-blocking — order is already saved)
    try {
      const transporter = getTransporter();
      await Promise.all([
        transporter.sendMail({
          from: `"XYNEX" <${process.env.SMTP_USER}>`,
          to: req.user.email,
          subject: `✅ Order Confirmed — ${orderId} | XYNEX`,
          html: customerHtml,
          attachments
        }),
        transporter.sendMail({
          from: `"XYNEX Orders" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_FROM || 'dharaneesh0530@gmail.com',
          subject: `🛒 New Order ${orderId} from ${req.user.name}`,
          html: adminHtml,
          attachments
        })
      ]);
      console.log(`[EMAIL] Invoice sent to ${req.user.email} & admin`);
    } catch (emailError) {
      console.error('[EMAIL] Failed to send order emails:', emailError.message);
      // Order is already saved — don't fail the request because of email
    }

    res.status(201).json({ success: true, order, orderId });
  } catch (error) {
    console.error('[ORDER]', error);
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

// Serve static files from dist (built React app)
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../dist');

app.use(express.static(distPath));

// Handle client-side routing by serving index.html for non-API GET routes.
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) {
    return next();
  }

  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
