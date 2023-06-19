import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [amount, setAmount] = useState(0);
  const [response, setResponse] = useState(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/process-payment', { amount });

      setResponse(response.data);
      console.log(response.data)
      // window.location.href = response.data.pp_SecureHash;
      // window.location.href= 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/'
      window.location.href = `https://sandbox.jazzcash.com.pk/WalletLinkingPortal/Wallet/PostToMerchant?requestId=${response.data.requestId}&merchantCode=${response.data.merchantId}
      `


    } catch (error) {
      console.error('An error occurred while processing the payment:', error);
    }
    // try {
    //   const response = await fetch('http://localhost:5000/process-payment', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ amount }),
    //   });

    //   const data = await response.json();
    //   setResponse(data);
    //   window.location.href = data.pp_SecureHash;
    // } catch (error) {
    //   console.error('An error occurred while processing the payment:', error);
    // }
  };

  return (
    <div>
      <h1>Payment Form</h1>
      <label>
        Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <button onClick={handlePaymentSubmit}>Submit Payment</button>
      {response && (
        <div>
          <h2>Payment Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
