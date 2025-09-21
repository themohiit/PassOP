const mongoose = require("mongoose");

const Mongo_Url = process.env.MONGOOSE_conn;


mongoose.connect(Mongo_Url).then(()=>{
    console.log('MongoDB connected...');
}).catch((err)=>{
    console.log('MongoDB connection failed',err)
})