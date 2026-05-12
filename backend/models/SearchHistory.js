const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  weather_condition: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
