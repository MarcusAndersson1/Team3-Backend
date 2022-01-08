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

client.subscribe('/timeslots/book/response')

async function bookTimeHelper(id){
    tryCount = 0
    currentId = id
    client.subscribe('/timeslots/book/response')
    for(i=0;i <= maxTries;i++){
        await timer(100)
        bookTime(id)
        console.log("xaxaxaxa")
    }
    console.log("after")
    if (!messageRecieved){
        return '404'
    }else{
        messageRecieved = false
        return '200'
    }
}


async function bookTime(clinicId, timeslotId){
    let message = `${clinicId}` + " " + `${timeslotId}`
    console.log(message)
   client.publish('/timeslots/book/',message)
}
client.on('connect', function(){
    console.log('Client has subscribed successfully')
})
client.on('message', async function (topic, message) {
    let statusCode = message.toString()
    if (statusCode == '200'){
        messageRecieved = true
        i = maxTries
        console.log(statusCode)
        client.unsubscribe('/timeslots/book/')
        
    }
    else if (statusCode == '404' || message == '403'){
        messageRecieved = true
        i = maxTries
        console.log(statusCode)
        client.unsubscribe('/timeslots/book/')
    }
    else { 
            client.unsubscribe('/timeslots/book/')
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
bookTime("61d8203942783868569c9382","61d8203942783868569c9388")

module.exports = router;