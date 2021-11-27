var express = require('express');
var router = express.Router();

router.get('/test', function (req,res,next){
    console.log('test works')
    res.send('get test')
})

router.post('/test', function (req,res,next){
    console.log('test created')
    res.send('post test')
})

module.exports = router;