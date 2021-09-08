const express = require('express');
const router = express.Router();
const {postProduct, getProducts, deleteProduct, getProductsByUser} = require('../controller/products.controller')

router.post('/new', postProduct);
router.get('/', getProducts)
router.get('/user', getProductsByUser)
router.delete('/delete/:id',deleteProduct)

module.exports = router;