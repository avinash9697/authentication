const mongoose = require("mongoose");

let RegisterUser = new mongoose.Schema({
    Firstname :{
        type : String,
        required : true,

    },
    Lastname :{
        type : String,
        required : true,

    },
    Email :{
        type : String,
        required : true,

    },
    password :{
        type : String,
        required : true,

    }
})

module.exports = mongoose.model("RegisterUser",RegisterUser);