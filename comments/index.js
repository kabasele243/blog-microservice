const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/', (req, res) => {
  res.send("salut mon frere")
})
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:3002/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id
    }
  })

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type)
  res.send({})
})
const port = 3001;
app.listen(port, () => {
    console.log(`Comment Server is Running on Port ${port}`)
})