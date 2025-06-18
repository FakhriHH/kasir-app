const model = require('../models/categoryModel');

exports.index = async (req, res) => {
    try {
        const data = await model.getAllCategory();
        res.json(data);
    } catch (error) {
        console.error('error mengambil data kategori :', error);
        res.satuts(500).json({ error: 'Gagal mengambil data kategori.' });
    }
};

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Nama Kategori harus diisi." });
        }
        await model.createCategory({ name });
        res.status(201).json({ message: 'Kategori ditambahkan' });
    } catch (error) {
        console.error('Error menambahkan kategori:', error);
        res.status(500).json({ error: 'Gagal menambhakan kategori' });
    }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updated = await model.updateKategori(id, { name });

    if (!updated) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan.' });
    }

    res.json({ message: 'Kategori diupdate' });
  } catch (error) {
    console.error('Error mengupdate kategori:', error);
    res.status(500).json({ error: 'Gagal mengupdate kategori.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await model.deleteKategori(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan.' });
    }

    res.json({ message: 'Kategori dihapus' });
  } catch (error) {
    console.error('Error menghapus kategori:', error);
    res.status(500).json({ error: 'Gagal menghapus kategori.' });
  }
};