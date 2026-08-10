import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  text: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
