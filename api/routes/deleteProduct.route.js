const express = require('express');
const router = express.Router();
const controller = require('../controllers/deleteProduct.controller')

router.post('/', controller.deleteProduct);

module.exports = router;