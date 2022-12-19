const { compile } = require('ejs');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User  = require('../models/user');
const userController = require('../controller/users');
const Review = require('../models/review');

router.get('/home',async function(req,res){

    if(req.isAuthenticated()){
        if(req.user.isAdmin){
            let users = await User.find({});
            let reviews = await Review.find({}).populate('reviewOf reviewBy');
            return res.render('home',{
                usersList: users,
                reviews : reviews
            })
        }else{
            let reviews = await Review.find({reviewBy:req.user.id}).populate('reviewOf reviewBy');
 
            return res.render('home',{
                reviews : reviews
            });
        }
        
    }else{
        return res.redirect('users/signIn')
    }
})

router.get('/',function(req,res){
    return res.redirect('/home');
})

router.use('/users',require('./users'))

router.use('/reviews',require('./review'));

module.exports = router;