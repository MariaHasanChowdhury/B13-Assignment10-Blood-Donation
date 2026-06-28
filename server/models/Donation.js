const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  requesterName: String,
  requesterEmail: String,
  recipientName: String,
  recipientDistrict: String,
  recipientUpazila: String,
  hospitalName: String,
  fullAddress: String,
  bloodGroup: String,
  donationDate: String,
  donationTime: String,
  requestMessage: String,
  status: { type: String, enum: ['pending','inprogress','done','canceled'], default: 'pending' },
  donorName: String,
  donorEmail: String,
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);