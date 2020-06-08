const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: 'User Profile'
    });
}



//Render the signup page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: 'Codeial | SignUp'
    });
}


//Render the sign In page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'Codeial | SignIn'
    });
};

module.exports.create = function(req, res){
    if(req.body.password!= req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log("Error in ifnding user in signing up"); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log("Error in creating user while singing up");
                
               return
            }

            return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }

    });
}


//signin and create a session for the user
module.exports.createSession = function(req, res){
    //TODO later
}


//after clicking on signup it should direct to sign in rght
//yes