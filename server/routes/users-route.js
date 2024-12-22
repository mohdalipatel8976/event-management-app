const User =  require("../models/user-model");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

router.post("/register", async(req, res) => {
    try{
        const userExists = await User.findOne({email:req.body.email});
        if (userExists){
            return res.status(400).json({message: "User Already Exists"});
        }

        const salt = await bcrypt.gensalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        await User.create(req.body);

        return res.status(201).json ({message: "User registered successfully"})

    } catch (error){
        return res.status(500).json({message: error.message})
    }
});

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json({message: "Invalid password"});
        }


    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY);
    return res.status(200).json({message: 'Login successful'})

    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

module.exports = router;