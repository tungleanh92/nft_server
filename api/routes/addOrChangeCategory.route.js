const express = require('express');
const router = express.Router();
const controller = require('../controllers/addOrChangeCategory.controller')

router.post('/', controller.addOrChangeCategory);

module.exports = router;