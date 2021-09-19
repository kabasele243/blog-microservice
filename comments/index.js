const express = require('express');
const {randomBytes} = require('crypto');

const app = express();
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const comments = commentsByPostId[req.params.id] || [];
})

app.post('/posts/:id/comments', (req, res) => {

    const commentId = randomBytes(4).toString('hex');

    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    
    comments.push({ id: commentId, content});

    commentsByPostId[req.params.id] = comments;

    res.send(201).send(comments);

})


const port = 6000;
app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`)
})