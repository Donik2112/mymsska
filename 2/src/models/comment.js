const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listing_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('Comment', commentSchema);