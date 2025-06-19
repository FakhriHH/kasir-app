const db = require('../config/db');

const getAll = () =>
  db('product_out')
    .select('product_out.*', 'product.name as product_name')
    .leftJoin('products', 'product_out.product_id', 'products.id');

const create = async (data) => {
  await db('products').where('id', data.product_id).decrement('stock', data.qty);
  return db('product_out').insert(data);
};

module.exports = { getAll, create };
