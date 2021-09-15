const Product = require('../models/products.model');

const postProduct = async (req,res,next) => {
    try{
        const productDoc = req.file ? req.file.filename : null;
        const product = new Product({
            name : req.body.name,
            ages : req.body.ages,
            pieces : req.body.pieces,
            article : req.body.article,
            doc : productDoc,
            user : req.user._id
        });
        //product.user = req.user._id;
        const productInserted = await product.save();
        return res.status(201).json(productInserted);
    }catch(error){
        return next(error)
    }
}

const getProducts = async (req, res, next) => {
    try{
        const products = await Product.find().populate('set').populate('user')
        return res.status(200).json(products)
    }catch(error){
        return next (error)
    }
}

const getProductsByUser = async (req, res, next) => {
    try{    
        const userIdLogeado = req.user._id
        const productsMongo = await Product.find({user:userIdLogeado}).populate('set')
        return res.status(200).json(productsMongo)

    }catch(error){
        return next (error)
    }
}

const deleteProduct = async (req, res, next) => {
    try{
        const {id} = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)
        return res.status(200).json(deletedProduct)

    }catch(error){
        return next(error)
    }
}

const putProduct = async (req, res, next) => {
    try{
        const {id} = req.params;
        //const {name, ages, pieces, article, doc, set} = req.body;
        const user = req.user._id
        const productPut = {};

        if(req.body.name) productPut.name = req.body.name;
        if(req.body.ages) productPut.ages = req.body.ages;
        if(req.body.pieces) productPut.pieces = req.body.pieces;
        if(req.body.article) productPut.article = req.body.article;
        if(req.body.doc) productPut.doc = req.body.doc;
        if(req.body.set) productPut.set = req.body.set;
        
        productPut.user = user;

        const productUpdatedBd = await Product.findByIdAndUpdate(id, productPut)
        return res.status(200).json(productUpdatedBd)

    }catch(error){
        return next(error)
    }

}




module.exports = {
    postProduct,
    getProducts,
    deleteProduct,
    getProductsByUser,
    putProduct
}