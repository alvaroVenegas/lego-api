const express = require('express');
const router = express.Router();
const {postProduct} = require('../controller/products.controller')

router.post('/new', postProduct);

module.exports = router;