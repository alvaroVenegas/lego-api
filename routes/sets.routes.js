const express = require('express');
const router = express.Router();
const { postSet, getSets, deleteSet, putSet } = require('../controller/sets.controller')
const { isAdmin } = require('../middlewares/auth.middleware')

router.post('/', [isAdmin], postSet);
router.get('/', [isAdmin], getSets);
router.delete('/:id', [isAdmin], deleteSet)
router.put('/:id', [isAdmin], putSet)


module.exports = router;

