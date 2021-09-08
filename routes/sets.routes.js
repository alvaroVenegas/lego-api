const express = require('express');
const router = express.Router();
const {postSet, getSets, deleteSet, putSet} = require('../controller/sets.controller')

router.post('/', postSet);
router.get('/', getSets);
router.delete('/:id', deleteSet)
router.put('/:id', putSet)


module.exports = router;

