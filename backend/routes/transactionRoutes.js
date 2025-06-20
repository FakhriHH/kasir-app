const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaction.Controller');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, controller.create);
router.get('/', authenticateToken, controller.list);
router.get('/:id', authenticateToken, controller.detail);

module.exports = router;
