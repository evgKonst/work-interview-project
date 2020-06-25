const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  date: Date,
  dateInterv: String,
  body: String,
  author: {
    type: mongoose.Types.ObjectId,
    resf: 'users',
  }
})

module.exports = mongoose.model('Posts', postSchema);
