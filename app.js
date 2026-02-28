const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;
app.use(express.json());

//CONNECTION POOL
const pool = mysql.createPool({
    host:'localhost',
    user:'nodeuser',
    password:'kezasabrine6^',
    database:'quotesdB'
});

app.get('/',async(req,res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM quotes');
        if(rows.length === 0) return res.send('No quotes found!');
        const randomIndex = Math.floor(Math.random()*rows.length);
        res.send(`Today's quote:<br>${rows[randomIndex].quote}`);
    } catch (err) {
        console.error(err);
      res.status(500).send('Error in fetching quotes');
    }
    
});
app.listen(port, () =>{
    console.log('Server running');
});