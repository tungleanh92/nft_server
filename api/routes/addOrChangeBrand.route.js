const express = require('express');
const router = express.Router();
const controller = require('../controllers/addOrChangeBrand.controller')

router.post('/', controller.addOrChangeBrand);

module.exports = router;