const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    ages: {type:String},
    pieces: {type:Number},
    article:{type:Number, required:true},
    doc:{type:String},
    set:{type: mongoose.Types.ObjectId, ref: 'sets'},
    category:{type: mongoose.Types.ObjectId, ref: 'categories'},
    userId: { type: mongoose.Types.ObjectId, ref: 'users' }
},
{
    timestamps: true,
}    
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;