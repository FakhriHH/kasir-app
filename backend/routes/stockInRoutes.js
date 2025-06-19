const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockInController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, controller.index);
router.post('/', authenticateToken, controller.create);

module.exports = router;
