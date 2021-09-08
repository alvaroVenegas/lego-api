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

module.exports = {
    postProduct
}