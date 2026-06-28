const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

// Get all users (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.put('/me', verifyToken, async (req, res) => {
  try {
    const { name, avatar, bloodGroup, district, upazila } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { name, avatar, bloodGroup, district, upazila }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update user role/status
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search donors
router.get('/search', async (req, res) => {
  try {
    const { bloodGroup, district, upazila } = req.query;
    const filter = { role: 'donor', status: 'active' };
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (district) filter.district = district;
    if (upazila) filter.upazila = upazila;
    const donors = await User.find(filter).select('-password');
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;