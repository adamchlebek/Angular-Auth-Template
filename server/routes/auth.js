require('dotenv').config();

//Packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');

//Validation
const registerValidation = require('../validation/registerValidation');
const loginValidation = require('../validation/loginValidation');

//Models
const User = mongoose.model("users");

//App Vars
const saltRounds = 10; //The higher saltRounds, the more hashing rounds are done
const secret = process.env.SECRET;
const expirationTime = 604800; //7 days in seconds

//Passport config
require('../config/passport')(passport);

//Register User
router.post('/register', (req, res) => {
    //Form Validation
    const { errors, isValid } = registerValidation(req.body);

    //Check validation
    if(!isValid){ return res.status(400).json(errors) }

    //Check if email is in use
    User.findOne({ email: req.body.email }).then((user) => {
        if(user){ return res.status(400).json(['Email already in use.']) }

        const newUser = new User({
            email: req.body.email,
            password: req.body.password
        })

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;

                newUser.save().then((user) => {
                    res.json(user)
                }).catch((err) => {
                    console.log(err)
                })
            })
        })
    })
})

//Login User
router.post('/login', (req, res) => {
    //Form Validation
    const { errors, isValid } = loginValidation(req.body);

    //Check Validation
    if(!isValid){ return res.status(400).json(errors) }

    //Find user by email
    User.findOne({ email: req.body.email }).then((user) => {
        if(!user){ return res.status(404).json(['No account with this email']) }

        //Check password
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if(isMatch){
                //Create JWT Payload
                const payload = {
                    id: user.id,
                    email: user.email,
                    created: user.created
                };

                //Sign token
                jwt.sign(payload, secret, { expiresIn: expirationTime }, (err, token) => {
                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    })
                });
            }else{
                return res.status(400).json(['Password incorrect!'])
            }
        })
    })
})

module.exports = router;