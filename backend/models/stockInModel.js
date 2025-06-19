const db = require('../config/db');

const getAll = () => 
    db('product_in')
        .select('product_in.*', 'products.name as product_name')
        .leftJoin('products', 'product_in.product_id', 'products.id');

const create = async (data) => {
    await db('products').where('id', data.product_id).increment('stock', data.qty);
    return db('product_in').insert(data);
};

module.exports = { getAll, create };