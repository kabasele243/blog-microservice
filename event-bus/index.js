const express = require('express');
const axios = require('axios')

const app = express();

app.use(express.json())

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:5000/events', event);
    axios.post('http://localhost:3001/events', event);
    axios.post('http://localhost:3005/events', event);

    res.send({ status: 'OK'});
})


const port = 3002;
app.listen(port, () => {
    console.log('Event Server runninng into port 3002')
});