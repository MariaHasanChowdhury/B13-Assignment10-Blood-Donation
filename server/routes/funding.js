const router = require('express').Router();
const Funding = require('../models/Funding');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const verifyToken = require('../middleware/verifyToken');

// Get all fundings
router.get('/', verifyToken, async (req, res) => {
  try {
    const fundings = await Funding.find().sort({ date: -1 });
    res.json(fundings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Total funding amount
router.get('/total', verifyToken, async (req, res) => {
  try {
    const result = await Funding.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);
    res.json({ total: result[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create payment intent
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save funding
router.post('/', verifyToken, async (req, res) => {
  try {
    const funding = await Funding.create(req.body);
    res.status(201).json(funding);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;