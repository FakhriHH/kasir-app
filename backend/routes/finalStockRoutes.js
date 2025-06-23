const express = require('express');
const router = express.Router();
const controller = require('../controllers/finalStockController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, controller.getStockReport);

module.exports = router;
