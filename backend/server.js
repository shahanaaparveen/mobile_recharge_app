import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from './models/User.js';
import Transaction from './models/Transaction.js';
import Plan from './models/Plan.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mobile-recharge';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Seed initial plans if none exist
    const planCount = await Plan.countDocuments();
    if (planCount === 0) {
      const initialPlans = [
        { operator: 'Airtel', amount: 199, validity: '28 days', data: '1GB/day', description: 'Unlimited calls + SMS' },
        { operator: 'Jio', amount: 299, validity: '56 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day' },
        { operator: 'Vi', amount: 399, validity: '84 days', data: '1.5GB/day', description: 'Unlimited calls + Weekend data rollover' },
        { operator: 'BSNL', amount: 149, validity: '30 days', data: '1GB/day', description: 'Unlimited calls + 100 SMS/day' }
      ];
      
      await Plan.insertMany(initialPlans);
      console.log('Initial plans seeded');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });
    
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Recharge Plans
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch plans' });
  }
});

// Admin: Create plan
app.post('/api/admin/plans', async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create plan' });
  }
});

// Admin: Update plan
app.put('/api/admin/plans/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update plan' });
  }
});

// Admin: Delete plan
app.delete('/api/admin/plans/:id', async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete plan' });
  }
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Recharge Transaction
app.post('/api/recharge', authenticateToken, async (req, res) => {
  try {
    const { phone, operator, amount, planId } = req.body;
    
    const transaction = new Transaction({
      userId: req.userId,
      phone,
      operator,
      amount,
      planId,
      status: 'success',
      transactionId: `TXN${Date.now()}`
    });
    
    await transaction.save();
    
    res.json({
      message: 'Recharge successful',
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Recharge failed' });
  }
});

// Get Transactions
app.get('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

// Admin: Get all transactions
app.get('/api/admin/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

// Admin: Get statistics
app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalRevenue = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const successRate = await Transaction.countDocuments({ status: 'success' });
    
    const operatorStats = await Transaction.aggregate([
      { $group: { _id: '$operator', count: { $sum: 1 }, revenue: { $sum: '$amount' } } }
    ]);
    
    const dailyStats = await Transaction.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 7 }
    ]);
    
    res.json({
      totalUsers,
      totalTransactions,
      totalRevenue: totalRevenue[0]?.total || 0,
      successRate: totalTransactions > 0 ? ((successRate / totalTransactions) * 100).toFixed(1) : 0,
      operatorStats,
      dailyStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});