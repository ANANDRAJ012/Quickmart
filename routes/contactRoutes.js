// routes/contactFormRouter.js

const express = require('express');
const router = express.Router();
const contactController = require('../controller/ContactController');
const { isAuth } = require('../services/common');


// Define the route for submitting a contact form
router.post('/', isAuth(), contactController.submitContactForm);

// Define the route for fetching open requests
router.get('/issue', isAuth(), contactController.getOpenRequests);

exports.router = router;
