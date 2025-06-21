const { transactions } = require('../config/db');
const model = require('../models/transactionModel');
const { v4: uuidv4 } = require('uuid');

// exports.create = async (req, res) => {
//   const { items, transaction_date } = req.body;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ error: 'Item pembelian tidak boleh kosong' });
//   }

//   const transaction_code = 'TRX-' + uuidv4().slice(0, 8).toUpperCase();

//   const user_id = req.user.id;

//   try {
//     const trxId = await model.insertTransaction(
//       { transaction_code, user_id, total: 0, transaction_date },
//       items
//     );

//     res.status(201).json({ message: 'Transaksi berhasil', transaction_id: trxId });
//   } catch (err) {
//     console.error('Error simpan transaksi:', err);
//     res.status(500).json({ error: 'Gagal menyimpan transaksi' });
//   }
// };

exports.create = async (req, res) => {
  const { items, transaction_date } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Item pembelian tidak boleh kosong' });
  }

  const transaction_code = 'TRX-' + uuidv4().slice(0, 8).toUpperCase();
  const user_id = req.user.id;

  try {
    const trxId = await model.insertTransaction(
      {
        transaction_code,
        user_id,
        transaction_date
      },
      items
    );

    res.status(201).json({
      message: 'Transaksi berhasil disimpan',
      transaction_id: trxId,
      transaction_code
    });
  } catch (err) {
    console.error('Gagal simpan transaksi:', err.message);
    res.status(500).json({ error: 'Gagal menyimpan transaksi', detail: err.message });
  }
};

exports.list = async (req, res) => {
  const data = await model.getAllTransaction();
  res.json(data);
};

exports.detail = async (req, res) => {
  const detail = await model.getDetailById(req.params.id);
  res.json(detail);
};
