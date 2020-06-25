const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  login: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    requires: true
  }
});

userSchema.statics.reg = async function (login, email, password) {
  const existUser = await this.findOne({email: email})
  if(existUser) throw new Error('User exist already')
  const user = new this({email: email})
user.password = password
user.login = login;
await user.save()
return user
}

userSchema.statics.author = async function(email, password){
const user = await this.findOne({email: email})
if(!user) throw Error('User lost') 
if(user.password !== password) throw new Error('Wrong password')
return user
}

module.exports = mongoose.model('User', userSchema)
