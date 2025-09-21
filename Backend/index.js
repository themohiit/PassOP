const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/authrouter");
require("dotenv").config();
require('./models/db')

const Port = process.env.PORT || 8080 ; 

app.get('/ping' , (req,res)=>{
    res.send("PONG");
})
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',router);

app.listen(Port,()=>{
    console.log(`http://localhost:${Port}`);
})