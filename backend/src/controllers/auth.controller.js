import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (userId) =>{
    jwt.sign({id:userId}, process.env.JWT_SECRET, { expiresIn: "7d" })
}

export const register = async(req, res)=>{
    try{
        const {name, email, password} = req.body;

        const exists = await User.findOne({email});
        if(exists) return res.status(400).json({message: "User already exists"});

        const hashed = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        res.status(201).json({message: "Registered Successfully"});

    }catch(err){
        res.status(500).json({message: err.message});
    }
}


export const login = async(req, res)=>{
    try{
        const {email, password} = req.body;

        const exists = await User.findOne({email});
        if(!exists) return res.status(400).json({message: "Invalid Credentials"});

        const isMatch = await bcrypt.compare(password, exists.password);
        if(!exists) return res.status(400).json({message: "Invalid Credentials"});

        const token = createToken(exists._id);

        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.json({
            message: "Login Successful",
            user: {id: exists._id, name: exists.name, email: exists.email}
        });

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const logout = async(req, res)=>{
    res.clearCookie("token");
    res.json({message:"Logged Out"});
};