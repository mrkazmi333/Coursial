const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const user = require('../models/user');
const User = require('../models/user');


//Tell passport to use a new startegy for google login
passport.use(new googleStrategy({
        clientID: "878356116849-b54cnl6tcj7i5o0jdj135itd40ohtmeo.apps.googleusercontent.com",
        clientSecret: "uA7KsFExDlK678r5QK_ohkBR",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        //Find a user with google email in out=r database email
        User.findOne({email: profile.emails[0].value}).exec( function(err, user){
            if(err){console.log('Error in google strategy-passport', err) ; return;}

            console.log(profile);
            if(user){
                //If found set the user as req.user
                return done(null, user);
            }else{
                //If no tfound create  user in the database with the name email and a random password and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('Error in creating user google strategy-passport', err) ; return;}

                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;