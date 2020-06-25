const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  question: [{
    type: mongoose.Types.ObjectId,
    ref: 'posts'
  }]
})


module.exports = mongoose.model('Company', companySchema);
