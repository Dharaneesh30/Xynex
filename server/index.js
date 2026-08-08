import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Order Endpoint
app.post('/api/orders', async (req, res) => {
  const { items, customer, total } = req.body;
  
  if (!customer?.email || !items?.length) {
    return res.status(400).json({ success: false, error: 'Invalid order data.' });
  }

  // Create HTML table for items
  const itemsHtml = items.map(i => `<tr><td>${i.name}</td><td>${i.qty}</td><td>$${(i.price * i.qty).toLocaleString()}</td></tr>`).join('');
  
  const invoiceHtml = `
    <h2>Order Invoice from XYNEX</h2>
    <p>Hi ${customer.name},</p>
    <p>Thank you for your order! Here is your invoice:</p>
    <table border="1" cellpadding="10" style="border-collapse: collapse; text-align: left;">
      <tr><th>Item</th><th>Qty</th><th>Total</th></tr>
      ${itemsHtml}
      <tr><td colspan="2"><strong>Subtotal + GST (Total)</strong></td><td><strong>$${total.toLocaleString()}</strong></td></tr>
    </table>
    <p>Shipping Address: ${customer.address}</p>
  `;

  try {
    // 1. Send Invoice to Customer
    await transporter.sendMail({
      from: `"XYNEX Orders" <${process.env.SMTP_USER}>`,
      to: customer.email,
      subject: `Your XYNEX Order Invoice`,
      html: invoiceHtml,
    });

    // 2. Send Order Info to Owner
    await transporter.sendMail({
      from: `"XYNEX Store" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_FROM || 'dharaneesh0530@gmail.com',
      subject: `New Order Received from ${customer.name}`,
      html: `<h2>New Order Received!</h2><p><strong>Customer:</strong> ${customer.name} (${customer.email})</p><p><strong>Address:</strong> ${customer.address}</p><h3>Order Details:</h3><table border="1" cellpadding="10" style="border-collapse: collapse;"><tr><th>Item</th><th>Qty</th><th>Total</th></tr>${itemsHtml}<tr><td colspan="2"><strong>Total Paid</strong></td><td><strong>$${total.toLocaleString()}</strong></td></tr></table>`,
    });

    res.status(200).json({ success: true, message: 'Order processed successfully.' });
  } catch (error) {
    console.error('Error processing order emails:', error);
    res.status(500).json({ success: false, error: 'Failed to process order.' });
  }
});

// Contact Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_FROM || 'hello@xynex.com', 
      subject: `New Contact Request from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
