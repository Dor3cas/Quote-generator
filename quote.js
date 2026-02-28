 const express = require('express');
 const  mongoose = require('mongoose');
 const dotenv = require('dotenv');
 dotenv.config()
 const app = express();
 const fs = require('fs');
 const port = 3000;
 
 app.use(express.json());

 function getquotes(){
   const data = fs.readFileSync('quotes.json');
   return JSON.parse(data);
 }
 const connectDB = async () => {
   try{
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log("db connected successfully")
   }catch(error){
      console.log("connection error:",error.message)
      process.exit(1)
   }
 }
 connectDB()

 /*function getRandomquote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
 }*/
 app.get("/",(req,res)=>{
    const quotes = getquotes();
    const randomIndex = Math.floor(Math.random()* quotes.length);
    res.send(`The  today's quote: <br>${quotes[randomIndex].text}`);
 });
 app.listen(port, ()=>{
    console.log("The server is running");
 })