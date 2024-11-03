const express = require('express');
const Razorpay = require('razorpay');

const app = express();
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY',
  key_secret: 'YOUR_RAZORPAY_SECRET',
});

app.post('/create-payment-link', async (req, res) => {
  const { amount } = req.body; // Receive amount in smallest currency unit (paise for INR)
  const options = {
    amount: amount,
    currency: 'INR',
    description: 'Purchase Description',
  };

  try {
    const response = await razorpay.invoices.create(options);
    res.json({ url: response.short_url });
  } catch (error) {
    res.status(500).send({ error: 'Error creating payment link' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
