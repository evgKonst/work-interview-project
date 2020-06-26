const express = require('express');
const session = require('express-session')

const loginRouter = express.Router();
const User = require('../models/user');
// console.log('started entries');
loginRouter.use(session({ 
  // store: new FileStore(),
  secret: 'fffff'
  // resave: false,
  // cookie: {
    // expires: 7000
  // }
}))


loginRouter.get('/', (req, res)=>{
  res.render('authorization/login')
})
loginRouter.get('/reg', (req, res)=>{
res.render('authorization/reg')
})
loginRouter.post('/reg', async (req, res)=>{
console.log(req.body)
await User.reg(req.body.login, req.body.email, req.body.password)
res.redirect('/login')
})

loginRouter.get('/log', (req, res)=>{
  res.render('authorization/author')

})
 loginRouter.post('/log', async (req, res)=>{

   console.log(req.body)

   let user
   
  try{
     user = await User.author(req.body.login, req.body.password)
  } catch (error){
    res.render('authorization/author', {error: error})
    return
  }
  console.log(req.session.authUser)
  req.session.authUser = user;
   res.redirect('../entries')
 })
function authFunc(req, res, next){
  if(!req.session.authUser){
    res.redirect('/login/log')
  } else {
    next()
  }
}
loginRouter.get('/logout', (req, res)=>{
  delete req.session.authUser
  res.redirect('/')
})

module.exports = {loginRouter, authFunc};
