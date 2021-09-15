const express = require('express');
const router = express.Router();
const {postProduct, getProducts, deleteProduct, getProductsByUser, putProduct} = require('../controller/products.controller')
const {upload, uploadToCloudinary} = require('../middlewares/file.middleware')


router.post('/', [upload.single('doc'), uploadToCloudinary], postProduct);

router.get('/', getProducts) // muestra todos los legos
router.get('/user', getProductsByUser) //muestra los legos que ha subido el user

router.delete('/:id',deleteProduct)

router.put('/:id', putProduct)

module.exports = router;