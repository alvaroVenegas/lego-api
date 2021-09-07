const mongoose = require('mongoose');
const setSchema = new mongoose.Schema({
    name:{type:String, required:true}
},
{
    timestamps:true,
}
);

const Set = mongoose.model('sets', setSchema);

module.exports = Set;

