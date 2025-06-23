const db = require('../config/db');

const getIncomingReport = async (startDate, endDate) => {
  return db('product_in')
    .join('products', 'product_in.product_id', 'products.id')
    .select('products.name as product_name')
    .sum('product_in.qty as total_incoming')
    .whereBetween('product_in.date_in', [startDate, endDate])
    .groupBy('products.name')
    .orderBy('total_incoming', 'desc');
};

const getOutgoingReport = async (startDate, endDate) => {
  return db('product_out')
    .join('products', 'product_out.product_id', 'products.id')
    .select('products.name as product_name')
    .sum('product_out.qty as total_outgoing')
    .whereBetween('product_out.date_out', [startDate, endDate])
    .groupBy('products.name')
    .orderBy('total_outgoing', 'desc');
};

module.exports = {
  getIncomingReport,
  getOutgoingReport
};
