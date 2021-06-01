const express = require('express');
const router = express.Router();
const controller = require('../controllers/subscribeEmail.controller')

router.post('/', controller.subscribeEmail);

module.exports = router;