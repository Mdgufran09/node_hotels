const mongoose=require('mongoose');
require('dotenv').config();

//define the mongodb connection url
//const mongoURL=process.env.MONGODB_URL_LOCAL    //replace 'mydatabase'with your database name

const mongoURL=process.env.MONGODB_URL;
//set up mongodb connection
mongoose.connect(mongoURL);
  
const db=mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongodb server');
});

db.on('error',(err)=>{
    console.log('mongodb connection error',err);
});

db.on('disconnected',()=>{
    console.log('mongodb disconnected');
});

module.exports=db;