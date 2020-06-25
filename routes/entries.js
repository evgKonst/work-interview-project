const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const Company = require('../models/company');
const {authFunc} = require('./login')
const session = require('express-session')

// entries
router.get('/', authFunc, async function (req, res, next) {
    let company = await Company.find();
    // req.session.authUser._id
    // console.log(company);
    
    res.render('entries/index', { company });
});

router.post('/', async function (req, res, next) {
  console.log(req.body.body)
  let arr = req.body.body.split('/')
  console.log(arr)
  arr2 = [];
  for(i=0; i<arr.length; i+=1){
    const newPost =  await new Post({ date: new Date, dateInterv: req.body.date, body: arr[i], author: req.session.authUser._id });
    await newPost.save()
    arr2.push(newPost)
  }
  console.log(arr2)

    let companyUse = await Company.findOne({name: req.body.company})
    if(!companyUse){
    const newCompany = await new Company({
      name: req.body.company,
      // question: newPost._id,
    })
    for(i=0;i<arr2.length; i++){
      newCompany.question.push(arr2[i]._id)

      await newCompany.save()
    }
    
    res.redirect(`/entries/${newCompany._id}`);
  } else {
    for(i=0;i<arr2.length; i++){
    await Company.updateOne({name: req.body.company}, {$push: {question: arr2[i]._id}})
    }
  }
 res.redirect(`/entries`);

});

//new entries
router.get('/new', function (req, res, next) {
    res.render('entries/new');
});

//detail entry
router.get('/:id', async function (req, res, next) {
    let company = await Company.findById(req.params.id);
    // console.log(company.question)
  let arr = [];
  for(i=0; i<company.question.length; i++){
    let post = await Post.findById(company.question[i])
    arr.push(post)
  }
  console.log(arr);
    // let question = await Post.find()
    res.render('entries/show', {arr, company});
});

router.post('/:id', async function (req, res) {
  let post = await Post.findById(req.params.id);
  // console.log(req.body)
  if(req.session.authUser._id == post.author ){
    post.body = req.body.body;
     await post.save();

    res.redirect(`/entries`);
  } else {
    res.redirect(`/entries`)
  
  }
});

router.delete('/:id', async function (req, res) {
  
    let post = await Post.findById(req.params.id);
    // console.log(post._id)
    if(req.session.authUser._id==post.author){
      await Post.deleteOne({'_id': req.params.id})
      
    } 
     
    res.redirect('/entries');
});

router.get('/:id/:cip/edit', async function (req, res, next) {
  console.log(req.params.id)
    let post = await Post.findById(req.params.id);
    res.render('entries/edit', { post });
});


module.exports = router;


