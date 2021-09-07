const express = require('express');
const router = express.Router();
const {postSet, getSets, deleteSet} = require('../controller/sets.controller')

router.post('/', postSet);
router.get('/', getSets);
router.delete('/:id', deleteSet)

module.exports = router;

