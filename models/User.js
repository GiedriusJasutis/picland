const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  createImageStore: [
    new mongoose.Schema({
      image: {
        type: String,
        required: true
      },

      description: {
        type: String,
        required: true
      },

      creator: {
        type: String,
        required: false
      }
    })
  ]
});

module.exports = mongoose.model('User', userSchema);
