const User= require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')


// check Home Page
const test = (req, res) =>{
    res.json('test is working')
}

//  register end
const registerUser = async(req, res) =>
{
    try {
        //get the data from frontend and store in object
        const {name, email, password} = req.body;

     //check the correctness of data entered
     if (!name) {
        return res.json ({
            error : "name is required"
        })
     };
     if(!password || password.length <6)
     {
        return res.json({
            error : "Password is required and should be at least 6 characters long "
        })
     };
     // for email check whether it already exist
     if(!email){
        return res.json({
            error: "email is required"
        })
     }
     const exist = await User.findOne({email});
     if(exist)
     {
        return res.json({
            error: "this email is taken already"
        })
     }
     

    const hashedPassword = await hashPassword(password)


     //create above user 
     const user= await User.create({
        name, email, password: hashedPassword 
     })
     // return the created user now
     return res.json(user)


    } catch (error) {
        console.log(error)
    }
}


// login endpoint

const loginUser = async (req, res) =>
{
    try {
        const {email, password} = req.body;

        if(!email) {
            return res.json
            ({error : "enter the registered email"})
        }
        const exist = await User.findOne({email})
        if(!exist) {
            return res.json ({
                error : "this email/user does not exist"
            })
        }
        
        //check the password
        const match = await comparePassword(password, exist.password)

        //if password matched we will send cookie (it's like informing user about login)
        if(match) {
             jwt.sign({email: exist.email, id: exist._id, name: exist.name}, process.env.JWT_SECRET, {}, (err, token)=>
                {
                    if(err) throw err;
                    res.cookie('token', token).json(exist)
                })
        }
        if(!match) {
            res.json({
                error: "password do not match"
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) =>
{
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) =>{
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}