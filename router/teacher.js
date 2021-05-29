const express = require("express");
const { Register, login } = require("../controllers/teacher");
const { validation, registerValidate, loginValidate } = require("../middleware/validateUser");
const {isAuth} = require("../middleware/isAuth");

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
  
module.exports = router;