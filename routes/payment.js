const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.post('/', (req, res) => {
  const { amount, user_id, payment_method } = req.body;

  const isSuccess = Math.random() > 0.3;
  if (isSuccess) {
    res.json({
      status: 'success',
      transaction_id: uuidv4(),
      amount,
      payment_method
    });
  } else {
    res.json({
      status: 'failed',
      reason: 'insufficient funds'
    });
  }
});

module.exports = router;