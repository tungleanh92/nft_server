const express = require('express');
const router = express.Router();
const controller = require('../controllers/addOrChangeProduct.controller')

router.post('/', controller.addOrChangeProduct);

module.exports = router;