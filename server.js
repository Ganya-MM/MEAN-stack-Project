const mongoose = require('mongoose'); 
const Msg = require('./models/messages')
var io = require('socket.io')(3000);
// const mongoDB = 'mongodb+srv://okmobile:ckmobile123@cluster0.orw9j.mongodb.net/message-database?retryWrites=true&w=majority'
// const mongoDB = "mongodb+srv://ganyamm:ganyamm@cluster0.orw9j.mongodb.net/ProductDB?retryWrites=true&w=majority";
const mongoDB = 'mongodb+srv://ganyamm:ganyamm@cluster0.orw9j.mongodb.net/message-database?retryWrites=true&w=majority'


mongoose.connect(mongoDB,{ useUnifiedTopology: true, useNewUrlParser: true  }).then(()=>{
  console.log('connected')
}).catch(err=>console.log(err))




io.on('connection', (socket) => {
    Msg.find().then(result=>{
      socket.emit('output-messages',result)
    })
    console.log('a user connected');
    socket.emit('message','CHAT APPLICATION')
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chatmessage',msg=>{
      const message = new Msg({msg});
      message.save().then(()=>{
        io.emit('message',msg)
      })
      
    })
  });
