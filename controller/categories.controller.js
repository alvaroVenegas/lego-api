const Category = require('../models/categories.model');


const postCategory = async (req, res, next) => {
    try{
        const {name} = req.body;
        const category = new Category({name});
        const categoryInserted = await category.save();
        return res.status(201).json(categoryInserted);
    }catch(error){
        return next(error)
    }
}

module.exports = {
    postCategory
}