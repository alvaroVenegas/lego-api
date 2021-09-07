const Set = require('../models/sets.model');

const postSet = async (req, res, next) => {
    try{
        const {name} = req.body;
        const set = new Set({name});
        const setInserted = await set.save();
        return res.status(201).json(setInserted);
    }catch(error){
        return next(error)
    }
}

module.exports = {
    postSet
}