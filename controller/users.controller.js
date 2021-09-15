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
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(201).json(user)
        });
    };
    passport.authenticate('register', done)(req);
}; 

const getUsers = async (req,res,next) => {
    try{
        const users = await User.find();//peticion a mongo sin contraseña
        return res.status(200).json(users);
    }catch(error){
        return next(error)
    }
}

const getUserById = async (req,res,next)=>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        user.password = null;
        
        return res.status(200).json(user)

    }catch(error){
        return next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        const userDeleted = await User.findByIdAndDelete(id);
        userDeleted.password = null;
        return res.status(200).json(userDeleted)
    }catch(error){
        return next(error)
    }
}

const putPassword = async (req, res, next) => {
    try {
        const userPwd = req.user
        const newPassword = req.body.newPassword
        const saltRounds = 15;
        const passwordHas = await bcrypt.hash(newPassword, saltRounds)
        userPwd.password = passwordHas       
        await User.findByIdAndUpdate(userPwd._id, userPwd)
        return res.status(200).json('Password modificada')
    } catch {
        return res.status(500).json('Error al cambiar la password')
    }
};

module.exports = {
    postUser,
    getUsers,
    getUserById,
    deleteUser,
    putPassword
}