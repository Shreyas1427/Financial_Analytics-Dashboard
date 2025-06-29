import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  user_id: { type: String, required: true },
  user_profile: { type: String, required: false }
});

export default mongoose.model('Transaction', transactionSchema);
