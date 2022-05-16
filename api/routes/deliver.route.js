const express = require('express');
const router = express.Router();
const controller = require('../controllers/deliver.controller')

router.post('/', controller.setDelivered);

module.exports = router;