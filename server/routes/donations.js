const router = require('express').Router();
const Donation = require('../models/Donation');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

// Create donation request
router.post('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.status === 'blocked') return res.status(403).json({ message: 'Blocked users cannot create requests' });
    const donation = await Donation.create(req.body);
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all pending (public)
router.get('/pending', async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'pending' });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get my donations
router.get('/my', verifyToken, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { requesterEmail: req.user.email };
    if (status) filter.status = status;
    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all donations (admin/volunteer)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single donation
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update donation
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete donation
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;