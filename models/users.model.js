const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    //email: {type: String, required: true},
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    }
},
    {
        timestamps: true,
    })

const User = mongoose.model('users', userSchema);
module.exports = User;