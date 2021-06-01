const express = require('express');
const router = express.Router();
const controller = require('../controllers/addOrChangeColor.controller')

router.post('/', controller.addOrChangeColor);

module.exports = router;