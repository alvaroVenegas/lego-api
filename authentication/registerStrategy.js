const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users.model');
const validations = require('../utils/validations')
const passport = require('passport')

const registerStrategy = new LocalStrategy(
    {
        usernameField: 'userName',
        passwordField: 'password',
        passReqToCallback:true
    },
    async (req, userName, password, done) => {
        try {
            const userExist = await User.findOne({userName})
            if(userExist){
                const error = new Error('El usuario ya existe')
                return done(error, null)
            }
            if(!validations.isValidPassword(password)){
                const error = new Error('El password introducido no es válido')
                return done (error, null)
            }
            const saltRounds = 15;
            const passwordHas = await bcrypt.hash(password, saltRounds)
            const newUser = new User(
                {
                    userName : userName,
                    password : passwordHas,
                }
            )
            const userMG = await newUser.save();
            userMG.password = null;
            return done (null, userMG)
        }catch(error){
            return done(error, null)
        }
    }    
)



module.exports = registerStrategy