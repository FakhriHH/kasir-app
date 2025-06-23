const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockReportController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/incoming', authenticateToken, controller.getIncoming);
router.get('/outgoing', authenticateToken, controller.getOutgoing);

module.exports = router;
