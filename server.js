const express = require('express');
require('dotenv').config()
const cors = require('cors');
const path = require("path");
var cookies = require("cookie-parser");
var app = express();

const mongoose = require('mongoose');

const Comments = require('./models/commentModel')
app.use(express.json());
app.use(cookies());
app.use(cors());
app.use(require('morgan')('dev'));

const URI = process.env.URI
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})


const io = require('socket.io')(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on('connection', client => {
   
  client.on('createComment', async data => { 

    const {username, content, product_id, createdAt} = data

  
    const newComment = new Comments({
      username, content, product_id ,createdAt
  })
    await newComment.save()

  });

  client.on('createCommentmulter', async data => { 

    const {username, content, product_id, createdAt} = data

    const comment = await Comments.findById(product_id)
    if(comment){
      comment.reply.push({ product_id, username, content, createdAt})

      await comment.save()
   
  }

 
  });


  client.on('disconnect', () => { /* … */ });
});

app.use("/images", express.static(path.join(__dirname, "public/images")));
 
app.use("/api", require('./router/Hang'))

app.use("/api", require('./router/Sanpham'))

app.use("/api", require('./router/User'))

app.use("/api/conversations", require('./router/iduserchatuser'))


const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))