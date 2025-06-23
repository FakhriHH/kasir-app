const model = require('../models/finalStockModel');

exports.getStockReport = async (req, res) => {
  try {
    const data = await model.getFinalStock();
    res.json({ updated_at: new Date(), products: data });
  } catch (error) {
    console.error('Error loading final stock report:', error);
    res.status(500).json({ error: 'Failed to load final stock report.' });
  }
};
