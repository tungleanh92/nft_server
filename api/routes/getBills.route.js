const express = require('express');
const router = express.Router();
const controller = require('../controllers/getBills.controller')

router.post('/', controller.getCustomer);

module.exports = router;