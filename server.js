console.clear();
// import express
const express=require('express');
const connectDB = require('./config/connectDB');
// l'instance app de la méthode express
const app=express();

require("dotenv").config();
connectDB();
app.use(express.json());
// creer le middlew ware de express 
app.use("/api/user", require("./router/user"));

app.use("/api/teacher", require("./router/teacher"));



// port
const PORT=process.env.PORT;
//create server using the method listen
app.listen(PORT, (err)=> err ? console.error(err):console.log(`server is running on port ${PORT}`))