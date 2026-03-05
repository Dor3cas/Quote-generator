//the env connection should be at the top
const dotenv = require('dotenv').config();

const express = require('express');
const  mongoose = require('mongoose');

const Quote = require("./models/Quote");

const PORT = 3000;
const app = express ();
 
// connect to mongo
mongoose.connect(process.env.MONGO_URL)
.then (() => console.log('Mongo coneccted'))
.catch(err => console.log(err));

//route
app.get("/", async(req,res) =>{
    try {
        const quotes = await Quote.find();

        if (quotes.length ===0){
            return res.send('No quotes found!');
        }

       const randomIndex = Math.floor(Math.random() * quotes.length);
       const randomQuote = quotes[randomIndex];
       
       res.send (`
        <h2>Today's quote</h2>
        <p>"${randomQuote.text}"</p>
        <p><strong>- ${randomQuote.author}</strong></p>
        `);

    } catch (error){
        res.status(500).send("Error fetching quotes");
    
    }
     });
     //start server
    app.listen(PORT,() => {
        console.log(`Server running on port ${PORT}`);
    });
