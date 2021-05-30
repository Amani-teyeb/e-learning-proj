const express = require("express");
const router = express.Router();
const {isAuth} = require("../middleware/isAuth");
const Course = require("../models/Course");

router.get('/courses', isAuth ,async(req,res)=>{
    try {
        const courses =await Course.find()
        res.status(200).send({msg:"all courses", courses})
    } catch (error) {
        res.status(500).send("impossible to get courses")
    }
});

module.exports = router;
