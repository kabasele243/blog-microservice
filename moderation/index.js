const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if( type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:3005/events', {
            type: 'CommentCreated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }
    res.send({});
})
const port = 3006;
app.listen(port, () => {
    console.log(`Moderation Server listening on port ${port}`)
})