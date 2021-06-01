const express = require('express');
const router = express.Router();
const controller = require('../controllers/getProduct.controller')

router.post('/', controller.getProduct);

module.exports = router;