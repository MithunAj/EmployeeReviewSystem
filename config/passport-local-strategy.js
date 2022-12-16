const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new localStrategy({
    usernameField : 'email',
    passReqToCallback: true
    },
    function(req,email,password,done){
        // find an user with email coming from the req
        User.findOne({email:email},function(err,user){
            // in case of any error finding the user
            if(err){
                console.log('Error finding the user');
                return done(err);
            }
            // in case the user was not found or the password did not match
            if( !user || user.password != password){
                
                return done(null,false)
            }
            // if user was found with a matching password
            return done(null,user);

        })
    }
));


passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log(err);
            return done(err);
        }

        return done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    // passport puts an method on to the request called isAuthenticated
    // if the user is signed in pass on the req to next function (controller actions)
       if(req.isAuthenticated()){
            return next();
       };
       
       // if not authenticated

       return res.redirect('signIn');
}


passport.setAuthenticatedUser = function(req,res,next){
      
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    };

    return next();

};


module.exports = passport;