const User = require('../models/users.model');
const passport = require('passport');
const bcrypt = require('bcrypt');

const postUser = (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        const error = 'Completa todos los campos'
        return next(error)
    }
    const done = (error, user) => {
        if (error) return next(error);
        /*Si quisiera que el usuario registrado se logueara 
        automaticamente despues de registrar

        //console.log('entrando a reques.login', user)
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            //return res.redirect('/user/register');
        });*/
        return res.status(201).json(user)
    };
    passport.authenticate('register', done)(req);
}; 

const getUsers = async (req,res,next) => {
    try{
        const users = await User.find();
        return res.status(200).json(users);
    }catch(error){
        return next(error)
    }
}

const getUserById = async (req,res,next)=>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        user.password = null
        return res.status(200).json(user)

    }catch(error){
        return next(error)
    }
}

module.exports = {
    postUser,
    getUsers,
    getUserById,
}