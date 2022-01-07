var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/users/login', async (req, res, next)  => {

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is not found')

  if(req.body.password === user.password){
    res.cookie("logged-in", "true", {maxAge: 60 * 60 * 1000}).status(200).send() //cookie exprires after 1 hour
  }
  else{
    res.status(400).send('Wrong password')
  }
  
})

router.post('/users/signup', async (req, res, next) => {

  if(req.body.email.length < 8){
    res.status(400).send('Email must be over 8 characters')
  }else if(!req.body.email.includes('@')){
    res.status(400).send('Email needs to contain a "@" to be valid')
  }else if(req.body.password.length < 6){
    res.status(400).send('Password lenght shall exeede 6 characters')
  }else{
    let user = new User({
      email: req.body.email,
      password: req.body.password
    })
  
    const savedUser = await user.save()

    res.status(200).send()
  }
})

router.get('/users/', function (req, res, next) {

  User.find(function (err, user) {
      if (err) { res.status(500).json({"message": "Internal Server Error"}) }
      res.json({ "users": user })
  })
})

// function encrypt(username){
//   let name = username.split("")
//   let newName
//   for(var i = 0; i < name.size() -1; i++){
//     newName = newName + (name[i] << 2)
//   }
//   return newName
// } 

// function decrypt(usernameEnc){
  
// } 

module.exports = router;
