const express = require('express');
const app = express();
const cors = require("cors");
const jazzcash = require('jazzcash-checkout'); // Assuming you have the Jazzcash library installed
app.use(cors());
app.options("*", cors());
// Configure Jazzcash credentials
jazzcash.credentials({
  config: {
    merchantId: "MC57944", // Merchant Id
    password: "1218080ygf", // Password
    hashKey: "5246swvbtd",
    // requestID : "ReqId" + Math.floor(Math.random() * 100000000000) // Hash Key
  },
  environment: 'sandbox' // available environment live or sandbox
});

app.use(express.json());

app.post('/process-payment', (req, res) => {
  const { amount } = req.body;

  // Set Jazzcash data fields according to the request
  jazzcash.setData({
    pp_Amount: amount * 100,
    pp_BillReference: "billRef123",
    pp_Description: "Test Payment",
    pp_MobileNumber: "03123456789",
    pp_CNIC: "345678",
  });

  // Create Jazzcash request
  jazzcash.createRequest("PAY")
    .then((response) => {
      response = JSON.parse(response); // Parse the response
      res.json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while processing the payment.' });
    });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
