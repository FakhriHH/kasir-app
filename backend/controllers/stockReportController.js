const model = require('../models/stockReportModel');

exports.getIncoming = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing required date parameters (from, to).' });
  }

  try {
    const data = await model.getIncomingReport(from, to);
    res.json({ date_range: { from, to }, incoming: data });
  } catch (err) {
    console.error('Error loading incoming stock report:', err);
    res.status(500).json({ error: 'Failed to load incoming stock report.' });
  }
};

exports.getOutgoing = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing required date parameters (from, to).' });
  }

  try {
    const data = await model.getOutgoingReport(from, to);
    res.json({ date_range: { from, to }, outgoing: data });
  } catch (err) {
    console.error('Error loading outgoing stock report:', err);
    res.status(500).json({ error: 'Failed to load outgoing stock report.' });
  }
};
