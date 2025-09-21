const { string, required } = require('joi');
const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  
    UserId:{
        type:String,
        required:true
    },
    website: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Password', passwordSchema);
