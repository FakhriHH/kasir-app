const model = require('../models/productModel');

exports.index = async (req, res) => {
    try {
        const data = await model.getAllProduct();
        res.json(data);
    } catch (error) {
        console.error('Error mengambil data Produk :', error);
        res.satuts(500).json({ error: 'Gagal mengambil data Produk.' });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, price, stock, unit, category_id } = req.body;
        await model.createProduct({ name, price, stock, unit, category_id });
        res.status(201).json({ message: 'Produk ditambahkan' });
    } catch (error) {
        console.error('Error menambahkan Produk:', error);
        res.status(500).json({ error: 'Gagal menambhakan Produk' });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, price, stock, unit, category_id } = req.body;
        await model.updateProduct(req.params.id, { name, price, stock, unit, category_id });
        res.json({ message: 'Produk diupdate' });
    } catch (error) {
        console.error('Error mengupdate Produk:', error);
        res.status(500).json({ error: 'Gagal mengupdate produk' });
    }
};

exports.remove = async (req, res) => {
    try {
        await model.deleteProduct(req.params.id);
        res.json({ message: 'Produk dihapus' });
    } catch (error) {
        console.error('Error menghapus produk:', error);
        res.status(500).json({ error: 'Gagal menghapus produk' });
    }
};
