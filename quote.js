 const express = require('express');
 const app = express();
 const fs = require('fs');
 const port = 3000;
 
 app.use(express.json());

 function getquotes(){
   const data = fs.readFileSync('quotes.json');
   return JSON.parse(data);
 }

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