const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockOutController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, controller.index);
router.post('/', authenticateToken, controller.create);

module.exports = router;
