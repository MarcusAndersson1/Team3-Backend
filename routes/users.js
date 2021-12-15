var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/users/login', async (req, res, next)  => {

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is not found')

  res.send({ user: user._id })

})

router.post('/users/signup', async (req, res, next) => {

  let user = new User({
    email: req.body.email,
    password: req.body.password
  })

  const savedUser = await user.save()
  res.send({ user: user._id })

})

router.get('/users/', function (req, res, next) {

  User.find(function (err, user) {
      if (err) { res.status(500).json({"message": "Internal Server Error"}) }
      res.json({ "users": user })
  })
})

module.exports = router;
