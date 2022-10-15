const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  _id: {
    type: String,
    ref: 'user',
    required: true,
  },
});

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /https?:\/\/(w{3}.)?[0-9a-zA-z-]{1,}.[a-zA-z\W]{1,}\/?([0-9a-zA-z_\W]{1,})?/.test(v),
      message: 'это не ссылка',
    },
  },
  owner: ownerSchema,
  likes: [{
    type: String,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
