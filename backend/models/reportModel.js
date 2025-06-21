const db = require('../config/db');

const getSalesReport = async (startDate, endDate) => {
  const transactions = await db('transactions')
    .whereBetween('transaction_date', [startDate, endDate]);

  const totalSales = transactions.reduce((sum, trx) => sum + trx.total, 0);
  const transactionCount = transactions.length;

  // Ambil detail produk terjual
  const soldProduct = await db('transaction_details')
    .join('products', 'transaction_details.product_id', 'products.id')
    .select('products.name')
    .sum('transaction_details.quantity as total_terjual')
    .whereIn('transaction_id', transactions.map(t => t.id))
    .groupBy('products.name')
    .orderBy('total_terjual', 'desc');

  return {
    total_sales: totalSales,
    transaction_count: transactionCount,
    sold_product: soldProduct
  };
};

module.exports = { getSalesReport };
