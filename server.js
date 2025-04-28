const express = require('express');
const app = express();

const paymentRouter = require('./routes/payment');
const toxicityRouter = require('./routes/toxicity');
const reportRouter = require('./routes/report');

app.use(express.json());

app.use('/payment', paymentRouter);
app.use('/toxicity', toxicityRouter);
app.use('/report', reportRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});