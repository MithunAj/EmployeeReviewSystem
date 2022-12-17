const express = require('express');
const User = require('../models/user');
const router = express.Router();
const userController = require('../controller/users')
const passport = require('passport');

router.get('/edit/:id',passport.checkAuthentication,userController.editEmployee);

router.get('/destroy-session',userController.destroySession);

router.post('/create', userController.createUser);

router.get('/signIn', userController.userSignIn);

router.get('/signUp',userController.userSignUp);

router.get('/create-session',passport.authenticate('local',{failureRedirect: 'signIn',session:true}),userController.createSession);

router.post('/update/:id',passport.checkAuthentication,userController.updateUser);

router.get('/makeAdmin/:id',passport.checkAuthentication,userController.makeAdmin);

router.get('/remove/:id',passport.checkAuthentication,userController.removeUser);

router.get('/addNew',passport.checkAuthentication,function(req,res){
    return res.render('add_user');
})

router.post('/createNew',passport.checkAuthentication,userController.addNew);

router.post('/createReview',passport.checkAuthentication,userController.createReview);

module.exports = router;