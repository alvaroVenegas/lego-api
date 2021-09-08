const express = require('express');
const router = express.Router();
const { postUser, getUsers, getUserById } = require('../controller/users.controller')

router.post('/register', postUser);
router.get('/', getUsers)
router.get('/:id', getUserById);

module.exports = router;