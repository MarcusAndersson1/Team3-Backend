var mqtt = require('mqtt')
var client  = mqtt.connect('tcp://127.0.0.1:1883') 
var express = require('express');
var router = express.Router();
var maxTries = 10
var messageRecieved = false
var tryCount
var currentId
const timer = ms => new Promise(res => setTimeout(res, ms))
var i = 0;
var q = 0;
var times

router.get('/timeslots/:id', async function(req, res, next) {
    // let result = await bookTimeHelper(req.params.id)
    let result = await getAll()
    console.log("resultat: ")
    console.log(result)
    res.json(result)
  });

  router.get('/timeslots/', async function(req, res, next) {
    let result = await getAll()
    res.json(result)
  });

async function bookTimeHelper(id){
    tryCount = 0
    currentId = id
    client.subscribe('/timeslots/book/'+id)
    for(i=0;i <= maxTries;i++){
        await timer(100)
        bookTime(id)
        console.log("xaxaxaxa")
    }
    console.log("after")
    if (!messageRecieved){
        return '400'
    }else{
        messageRecieved = false
        return '200'
    }
}


async function bookTime(id){
   client.publish('/timeslots/book/',id)
}

client.on('message', async function (topic, message) {
    if (message == '200'){
        messageRecieved = true
        i = maxTries
        client.unsubscribe('/timeslots/book/'+currentId)
        
    }
    else if (message == '400'){
        messageRecieved = true
        i = maxTries
        client.unsubscribe('/timeslots/book/'+currentId)
    }
    else{ 
            client.unsubscribe('/timeslots/book/'+currentId)
        }
    if(topic == '/timeslots/all/'){
        console.log("meddelande")
        const timeslots = await parseJson(message)
        times = timeslots
        q = maxTries
    }
})
async function parseJson(message){
    console.log('parse')
    return JSON.parse(message.toString())
}

async function getAll(){
    client.subscribe('/timeslots/all/')
    timeslots = ''
    for(q=0;q <= maxTries;q++){
        await timer(100)
        client.publish('/timeslots/request/all/',"penis vagene unid")
    }
    return times
}

module.exports = router;