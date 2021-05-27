// mongoose create the models
const mongoose = require("mongoose");
const { Schema, model }=mongoose; 

const userSchema= new Schema({
    Firstname: {type: String, required: true},
    Lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: Number,
    role: {
      type: String,
      enum: ["student", "admin", "teacher"],
      default: "student",
    },
    profiePicture: {type: String},

    },{timestamps: true,});
    
   

module.exports= User= model("user", userSchema);

  