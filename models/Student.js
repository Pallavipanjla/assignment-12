const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    rollno:{
        type:Number,
        required:true,
        unique:true
    },

    course:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        min:16
    },

    email:{
        type:String,
        required:true,
        match:/^\S+@\S+\.\S+$/
    },

    city:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model("Student", studentSchema);