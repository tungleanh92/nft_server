const express = require('express');
const router = express.Router();
const controller = require('../controllers/submitCartForm.controller');

router.post('/', controller.submitCartForm);

module.exports = router;