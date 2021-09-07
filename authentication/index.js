const passport = require('passport');
const User = require('../models/users.model');
const registerStrategy = require ('./registerStrategy')
const loginStrategy = require ('./loginStrategy')

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    try{
        const userExist = await User.findById(userId);
        return done(null, userExist)
    }catch(error){
        return done(error,null)
    }
});

passport.use('register' , registerStrategy)
passport.use('login' , loginStrategy)