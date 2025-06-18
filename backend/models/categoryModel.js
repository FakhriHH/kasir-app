const db = require('../config/db');

const getAllCategory = () => db('categories');
const createCategory = (data) => db('categories').insert(data);
const updateCategory = (id, data) => db('categories').where({ id }).update(data);
const deleteCategory = (id) => db('categories').where({ id }).del();


module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory
};