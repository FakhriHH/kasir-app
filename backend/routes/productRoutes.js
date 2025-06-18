const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, controller.index); 
router.post('/', authenticateToken, requireAdmin, controller.create);
router.put('/:id', authenticateToken, requireAdmin, controller.update);
router.delete('/:id', authenticateToken, requireAdmin, controller.remove);

module.exports = router;
