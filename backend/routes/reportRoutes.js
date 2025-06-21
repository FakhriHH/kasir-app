const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/sales', authenticateToken, controller.getReport);

module.exports = router;
