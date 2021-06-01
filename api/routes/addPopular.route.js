const express = require('express');
const router = express.Router();
const controller = require('../controllers/addPopular.controller')

router.post('/', controller.addPopularPoint);

module.exports = router;