
const express = require('express');
const router = express.Router()
const { postLogin, postLogOut } = require('../controller/login.controller');

router.post('/', postLogin);
router.post('/logout', postLogOut)

module.exports = router;