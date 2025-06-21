const model = require('../models/reportModel');

exports.getReport = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing required date parameters (from, to).' });
  }

  try {
    const data = await model.getSalesReport(from, to);
    res.json(data);
  } catch (error) {
    console.error('Error fetching sales report:', error);
    res.status(500).json({ error: 'Failed to load sales report.' });
  }
};
