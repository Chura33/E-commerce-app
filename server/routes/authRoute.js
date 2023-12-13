const express = require("express");
const router = express.Router();
const auth = require('../middlewares/authorization');
const User = require("../models/User")
const bcrypt = require("bcryptjs");
const {body, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");
const config = require("../config/keys")


router.get("/", auth, async(req, res)=>{
    const id = req.user.id;

    const user = await User.findById(id).select("-password");
    console.log(user);
    res.json({user});
})

router.post('/', 
[
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],

async(req,res)=>{
    const loginErrors = validationResult(req);
    if (!loginErrors.isEmpty()) {
        console.log("there are errors")
        console.log(loginErrors.array())
        return res.status(400).json({ errors: loginErrors.array() });
      }

      
   try{
    let user = await User.findOne({
        email: req.body.email
    });

    if (!user){
        // if there's no user. This means that the login credentials are wrong
        res.status(400).send("Email or password is invalid") 
    }

    else{
        const {email, password} = req.body;
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect){
            // if the password is not correct: send a vague message to the user.
            return res.status(400).send("Invalid email or password");
        }

        const payload = {
            user:{
                id: user.id,
            }
        }

        jwt.sign(
            payload,
            config.secret,
            {expiresIn: 3600 *24},
            (err, token) =>{
                if (err) throw err;
                res.json({token})
            }
        )
    }
   }

catch(error){
    if (error.name === 'ValidationError') {
        // Mongoose validation error
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ errors });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
}
})

module.exports = router;