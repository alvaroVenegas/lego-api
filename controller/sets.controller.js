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

const getSets = async (req, res, next) => {
    try{
        const sets = await Set.find()
        return res.status(200).json(sets)
    }catch(error){
        return next(error)
    }
}

const deleteSet = async (req, res, next) => {
    try{
        const { id } = req.params;
        const setDeleted = await Set.findByIdAndDelete(id);
        return res.status(200).json(setDeleted)

    }catch(error){
        return next(error)
    }
}

module.exports = {
    postSet,
    getSets,
    deleteSet
}