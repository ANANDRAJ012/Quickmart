const express = require('express');
const router = express.Router();
const contactController = require('../controller/ContactController');


// POST /api/contact route
router.post('/', contactController.submitContactForm);

exports.router = router;
