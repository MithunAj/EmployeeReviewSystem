const { compile } = require('ejs');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User  = require('../models/user');
const userController = require('../controller/users');

router.get('/home',async function(req,res){

    if(req.isAuthenticated()){
        if(req.user.isAdmin){
            let users = await User.find({});
            return res.render('home',{
                usersList: users
            })
        }
        return res.render('home');
    }else{
        return res.redirect('users/signIn')
    }
})

router.use('/users',require('./users'))


module.exports = router;