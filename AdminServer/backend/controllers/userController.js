const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2m" }
    );
  },
    //GET ALL USERS
    getAllUsers: async(req,res)=>{
        try{
            const user = await User.find();
           return res.status(200).json(user);
        }catch(err){
          return  res.status(500).json(err);
        }
    },

    //DELETE USER
    deleteUser: async(req,res)=>{
        try{
            const user = await User.findByIdAndRemove(req.params.id);
         return   res.status(200).json("Delete successfully");
        }catch(err){
          return  res.status(500).json(err);
        }
    },
    
      
    updateEmail: async(req,res)=>{
      try{
        const user = await User.findOne({ username: req.body.username });
        if(!user){
          return  res.status().json("Error");
        }
        if(user.email===req.body.email){
          return  res.status().json("please change email");
        }
        if(user.email!==req.body.email){
        user.email=req.body.email;
        const accessToken = userController.generateAccessToken(user);
         await user.save();
         const { password, ...others } = user._doc;
      return  res.status(200).json({ ...others, accessToken});}
       }catch (err) {
        console.log(err);
        return  res.status(500).json(err);
        
    }
  }  ,
  updatePassword: async(req,res)=>{
    try{
      
      const user = await User.findOne({ username: req.body.username });
    
      if (!user) {
        return  res.status().json("Error");
        }
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          console.log("wrong password")
        return  res.status().json("wrong password");
        }
        if(req.body.newpassword===req.body.password){
          console.log("please change password")
          return  res.status().json("please change password");
        }
        if(validPassword && req.body.newpassword !== req.body.oldpassword){
        const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.newpassword, salt);
        
      user.password = hashed;
      
       await user.save();
      return res.status(200).json(user);}
     }catch (err) {
      console.log(err);
      return  res.status(500).json(err);
  }
}  ,
   
   
}

module.exports = userController;