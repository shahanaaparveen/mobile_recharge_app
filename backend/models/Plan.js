import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  validity: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Plan', planSchema);