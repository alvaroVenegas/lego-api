const express = require('express');
const router = express.Router();
const {postSet} = require('../controller/sets.controller')

router.post('/', postSet);

module.exports = router;

