const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  foundedOn: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  logoPath: { type: String },
  rating: { type: Array },
  review: { type: Array }
});

module.exports = mongoose.model('Company', companySchema);