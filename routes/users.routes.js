const express = require('express');
const router = express.Router();
const {isAuth, isAdmin} = require('../middlewares/auth.middleware')
const { postUser, getUsers, getUserById } = require('../controller/users.controller')

router.post('/register', postUser);
router.get('/', [isAdmin], getUsers)
router.get('/:id', [isAuth], getUserById);

module.exports = router;