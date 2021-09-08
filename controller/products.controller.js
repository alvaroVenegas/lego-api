const Product = require('../models/products.model');

const postProduct = async (req,res,next) => {
    try{
        const product = new Product(req.body)
        const productInserted = await product.save()
        return res.status(201).json(productInserted)
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
//no recoge el id de la cookie, averiguar que pasa
const getProductsByUser = async (req, res, next) => {
    try{    
        const userIdLogeado = req.user._id
        console.log(userIdLogeado)        
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





module.exports = {
    postProduct,
    getProducts,
    deleteProduct,
    getProductsByUser
}