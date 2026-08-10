import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      qty: Number,
      color: String,
      thumbnail: String
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  designSnapshot: {
    type: String, // Base64 data URL
    required: false
  },
  shippingAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Processing'
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
