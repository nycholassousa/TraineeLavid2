var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: String,
  created_at: Date,
  file: Object
});

module.exports = mongoose.model('Upload', videoSchema);
