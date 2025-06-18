const db = require('../config/db');

const getAllProduct = () => db('products').select('products.*', 'categories.name as category').leftJoin('categories', 'products.category_id', 'categories.id');
const getProductById = (id) => db('products').where({ id }).first();
const createProduct = (data) => db('products').insert(data);
const updateProduct = (id, data) => db('products').where({ id }).update(data);
const deleteProduct = (id) => db('products').where({ id }).del();

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};