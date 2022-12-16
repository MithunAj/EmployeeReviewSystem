const { use } = require('passport');
const User = require('../models/user')


module.exports.destroySession = function(req,res){
    req.logOut(function(err){
        if(err){
            console.log(err);
            return res.redirect('back');
        }
        return res.redirect('/users/SignIn')
    });
    
}

module.exports.editEmployee = async function(req,res){
    let user = await User.findById(req.params.id);

    if(user){
        return res.render('employee_details',{
            emp : user
        })
    }

    return res.redirect('back');
}

module.exports.createUser = async function(req,res){

    try {

        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
    
        let user = await User.findOne({email:req.body.email});

        if(!user){
            await User.create(req.body);
            return res.redirect('/users/SignIn');
        }else{
            console.log('user could not be created');
            return res.redirect('back');
        }



    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
   


}

module.exports.userSignIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/home')
    }

    return res.render('signIn');
}

module.exports.userSignUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/home');
    }

    return res.render('signUp');
}

module.exports.createSession = async function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    return res.redirect('users/signIn')
}

module.exports.updateUser = async function(req,res){
    if(req.user.isAdmin){
    let user = await User.findById(req.params.id);
    if(req.body.name){
        user.name = req.body.name;
    };
    if(req.body.email){
        user.email = req.body.email;
    }
    if(req.body.password){
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }else{
            user.password = req.body.password;
        }
    }
    user.save();
    }
    return res.redirect('back');
}

module.exports.makeAdmin = async function(req,res){
    try {
        if(req.user.isAdmin){
        await User.findByIdAndUpdate(req.params.id,{isAdmin:true});
        }
        return res.redirect('/home');

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.removeUser = async function(req,res){
    
    if(req.user.isAdmin){
        await User.findByIdAndDelete(req.params.id);
    }
    return res.redirect('/home');
}

module.exports.addNew = async function(req,res){

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    let user = await User.findOne({email:req.body.email});

    if(!user){
        await User.create(req.body);
        return res.redirect('/home');
    }else{
        console.log('user could not be created');
        return res.redirect('back');
    }
    
}