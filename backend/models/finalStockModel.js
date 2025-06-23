const db = require('../config/db');

const getFinalStock = async () => {
  return db('products')
    .leftJoin('categories', 'products.category_id', 'categories.id')
    .select(
      'products.id',
      'products.name as product_name',
      'categories.name as category',
      'products.stock as current_stock',
      'products.price'
    )
    .orderBy('products.name', 'asc');
};

module.exports = { getFinalStock };