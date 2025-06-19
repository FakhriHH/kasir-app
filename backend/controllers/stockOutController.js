const model = require('../models/stockOutModel');

exports.index = async (req, res) => {
  try {
    const data = await model.getAll();
    res.json(data);
  } catch (error) {
    console.error('Error menampilkan data :', error);
    res.satuts(500).json({ error: 'Gagal menampilkan data.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { product_id, qty, date_out } = req.body;
    await model.create({ product_id, qty, date_out });
    res.status(201).json({ message: 'Barang keluar dicatat' });
  } catch (error) {
    console.error('Error membuat data :', error);
    res.satuts(500).json({ error: 'Gagal membuat data.' });
  }
};
