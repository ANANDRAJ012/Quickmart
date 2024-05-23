// routes/requestRoutes.js

const express = require('express');
const router = express.Router();
const requestController = require('../controller/requestController');
const { isAuth } = require('../services/common');

// Define the route for raising a request
router.post('/raise-request', isAuth(), requestController.raiseRequest);
router.get('/:orderId', isAuth(), requestController.getOpenRequestByOrder);


exports.router = router;
