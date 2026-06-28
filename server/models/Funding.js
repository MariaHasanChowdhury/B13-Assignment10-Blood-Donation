const mongoose = require('mongoose');

const fundingSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Funding', fundingSchema);