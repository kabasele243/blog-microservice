const express = require('express');
const axios = require('axios')

const app = express();

app.use(express.json())

app.post('/events', (req, res) => {
    const event = req.body;
    //Post Service
    axios.post('http://posts-clusterip-srv:5000/events', event).catch((err) => {
        console.log(err.message);
      });;
    //Comment Service
    axios.post('http://comments-srv:3001/events', event).catch((err) => {
        console.log(err.message);
      });;
    //Query Service
    axios.post('http://query-srv:3005/events', event).catch((err) => {
        console.log(err.message);
      });;
    //moderation service
    axios.post('http://moderation-srv:3006/events', event).catch((err) => {
        console.log(err.message, 'vraiment');
      });;

    res.send({ status: 'OK'});
})


const port = 3002;
app.listen(port, () => {
    console.log('Event Server runninng into port 3002')
});