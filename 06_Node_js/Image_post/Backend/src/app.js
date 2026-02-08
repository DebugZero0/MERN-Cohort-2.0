const express = require('express');
const multer = require('multer');
const cors = require('cors');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.models');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });
app.use(express.static('./public'));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/create-post', upload.single('image'), async (req, res) => {

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const result = await uploadFile(req.file.buffer);

    const post = new postModel({
        image: result.url,
        caption: req.body.caption,
    });
    await post.save();

    return res.status(201).json({ 
        message: 'Post created successfully',
        post 
    });
});

app.get('/posts', async (req, res) => {
    const posts = await postModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ posts });
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({
        message: 'Post deleted successfully',
        post: deletedPost,
    });
});

app.patch('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { caption } = req.body;
    const updatedPost = await postModel.findByIdAndUpdate(
        id,
        { caption },
        { new: true }
    );
    if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json({
        message: 'Post updated successfully',
        post: updatedPost,
    });
});

app.use('*name',(req, res) => {
    res.sendFile(path.join(__dirname,'..','/public/index.html'));
});

module.exports = app;