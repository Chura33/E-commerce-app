const express = require("express");
const router = express.Router();
const User = require("../models/User")
const {body, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const keys = require("../config/keys")

router.get('/', (req,res)=>{
    res.send("This is the user route");
})
router.post('/', 
[body('name').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),],
async(req,res)=>{
    const expressValidationErrors = validationResult(req);
    if (!expressValidationErrors.isEmpty()) {
        return res.status(400).json({ errors: expressValidationErrors.array() });
      }
   try{
    let user = await User.findOne({
        email: req.body.email
    });

    if (!user){
        let {name, email, password} = req.body;
        const salt = await(bcrypt.genSalt(saltRounds));
        const hash = await bcrypt.hash(password, salt);
        password = hash;
        user = new User({
            name, email, password
        })
        user.save();
        // console.log(newUser);
        // res.status(201).send("New User Created");
        const payload = {
            user:{
                id:user.id
            }
        }

        try{
            const token = await jwt.sign(payload,
                 keys.secret,
                 {expiresIn: 3600 * 24})
            res.status(201).json({token});
        }
        catch(err){
            res.status(500).send("jwt error")
        }
        // jwt.sign(payload,
        //      keys.secret,
        //      {expiresIn: 3600 * 24},
        //      (err, token)=>{
        //         if (err) throw err;
        //         res.json({token})
        //      });

        console.log(payload);
    }

    else{
        res.status(400).send("This user already exists")
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