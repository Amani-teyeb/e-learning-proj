const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");


exports.Register = async (req, res) => {
    try {
      // req.body= Firstname , Lastname, email , password , phone
      const { Firstname, Lastname, phone, email, password } = req.body;
      // test email
      const findUser = await User.findOne({ email });
      // email should be unique
      if (findUser) {
        return res
          .status(400)
          .send({ errors: [{ msg: "email should be unique" }] });
      }
      // new user
      const newUser = new User({
        Firstname,
        Lastname,
        phone,
        email,
        password,
        role:'teacher'
      });
      // hachage de passeword 
      const hashedpassword = await bcrypt.hash(password, saltRounds);
      newUser.password = hashedpassword;
      //then we save user
      await newUser.save();
      // create token
      // CRRE UN TOKEN= meftaa7
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
      res.status(200).send({ msg: "register succ", user: newUser, token});
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "user not saved" }] });
  }
};

exports.login= async(req,res)=>{
  try {
    //email & password
   const {email, password}= req.body;
   // find user
   const findUser = await User.findOne({email});
   // if user not exist
   if (!findUser){
      return res.status(400).send({errors:[{msg:"bad credential"}]})
   } 
   // else verify password
  const comparePass = await bcrypt.compare(password, findUser.password);
  if (!comparePass){
    return res.status(400).send({errors:[{msg:"bad credential"}]})
  }
  // create token 
  const token = jwt.sign(
    {
      id: findUser._id,
      // Firstname wel email
      role : findUser.role
    },
    process.env.SECRET_KEY,
    { expiresIn: "3h" }
  );
  res.status(200).send({msg:"login succ", user: findUser, token})
  } catch (error) {
    res.status(500).send({errors:[{msg:"Something went wrong"}]})
    console.log(error)
  }
}