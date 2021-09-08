const express = require('express');
const router = express.Router();
const { postUser } = require('../controller/users.controller')

router.post('/register', postUser);

module.exports = router;