const express = require('express');
const router = express.Router();
const controller = require('../controllers/getCCB.controller')

router.get('/', controller.getCCB);

module.exports = router;