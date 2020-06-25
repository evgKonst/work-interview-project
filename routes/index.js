const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Company = require('../models/company')

router.get('/', function (req, res, next) {
  res.redirect('/login');
});

router.post('/find', async (req, res)=>{
  console.log(req.body)
  const company = await Company.findOne({name: req.body.company})

  res.json({company})
  })
module.exports = router;
