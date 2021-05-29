//importer express pour creer les routes
const express = require("express");
const { Register, login } = require("../controllers/user");
const { validation, registerValidate, loginValidate } = require("../middleware/validateUser");
const {isAuth, adminMiddleware} = require("../middleware/isAuth");
const User = require("../models/User");

//const { Register } = require("../controllers/user.controllers");
const router = express.Router();

/*router.get("/", (req,res) =>{
    res.send("testing router");
});*/

/*sign in
@ meth : post
@ path: http: localhost:5000/api/user/register
@ params : body
@ public
*/
router.post("/register", registerValidate() ,validation ,Register);
/*login
@ meth : post
@ path: http: localhost:5000/api/user/login
@ params : body
@ public
*/
router.post("/login",loginValidate() ,validation ,login);


/*
@method: GET
@ path:http:localhost:5000/api/user/current
@ parameter: req.headers  
public
*/
router.get("/current", isAuth, (req, res) => {
    res.send({ msg: "authorized", user: req.user });
  });

//@desc all users
//@method get

router.get('/allusers',isAuth, adminMiddleware ,async(req,res)=>{
    try {
        const students =await User.find()
        res.status(200).send({msg:"all users", users})
    } catch (error) {
        res.status(500).send("impossible to get users")
    }
});

//@desc update user
//@method put
//@req.body
//@req.params

router.put("/:Id",isAuth, adminMiddleware,async(req,res)=>{
  try {
     const {Id}=req.params
     
     const user=await User.findOneAndUpdate({_id:Id},{$set:{...req.body}})
     res.status(200).send({msg:"user edited", user})
  } catch (error) {
     res.status(500).send("impossible to edit user")
  }
 })

 router.get('/:Id',isAuth, adminMiddleware,async(req,res)=>{
  try {
      const {Id}=req.params
      const user = await User.findOne({_id:Id})
      res.status(200).send({msg:"user", user})
  } catch (error) {
      res.status(500).send("impossible to get user")
  }
  })

 router.delete('/:Id',isAuth, adminMiddleware,async(req,res)=>{
  try {
      const {Id}=req.params
      const user=await Contact.findByIdAndDelete(Id)
      res.status(200).send({msg:"user deleted", user})
  } catch (error) {
      res.status(500).send("impossible to delet user")
  }
})




  
module.exports = router;