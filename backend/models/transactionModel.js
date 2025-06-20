const db = require('../config/db');

const insertTransaction = async (trxData, detailItems) => {
  return db.transaction(async trx => {
    const [trxId] = await trx('transactions').insert(trxData);

    for (const item of detailItems) {
      const products = await trx('products').where('id', item.product_id).first();
      const subtotal = item.quantity * products.price;

      await trx('transaction_details').insert({
        transaction_id: trxId,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: products.price,
        subtotal
      });

      await trx('products').where('id', item.product_id).decrement('stock', item.quantity);
    }

    return trxId;
  });
};

const getAllTransaction = () => {
  return db('transactions')
    .join('users', 'transactions.user_id', 'users.id')
    .select('transactions.*', 'users.username as kasir');
};

const getDetailById = (id) => {
  return db('transaction_details')
    .where('transaction_id', id)
    .leftJoin('products', 'transaction_details.product_id', 'products.id')
    .select('transaction_details.*', 'products.name as name_product');
};

module.exports = { insertTransaction, getAllTransaction, getDetailById };
