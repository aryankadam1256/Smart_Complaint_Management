const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  type: { type: String, required: true },
  details: { type: String, required: true },
  location: { type: String, required: true },
  image: String,
  status: { type: String, default: 'Pending' },
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
