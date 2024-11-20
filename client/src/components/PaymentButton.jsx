import React from "react";
import axios from "axios";
import url from '../url.jsx';

const PaymentButton = ({ amount }) => {
  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => handlePayment();
    script.onerror = () => alert("Razorpay SDK failed to load. Are you online?");
    document.body.appendChild(script);
  };

  const handlePayment = async () => {
    try {
      // Create order on the server
      const { data } = await axios.post(`${url}/api/payment/create-order`, { amount });

      const options = {
        key: "rzp_test_FRFdoaNdjz8LjW",
        amount: data.order.amount,
        currency: "INR",
        name: "CampusNest",
        description: "Rent Payment",
        order_id: data.order.id,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Verify payment signature on the server
          const verifyResponse = await axios.post(`${url}/api/payment/verify-payment`, paymentData);

          if (verifyResponse.data.success) {
            alert("Payment Successful!");
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: "Ashish Chauhan",
          email: "asch20080@gmail.com",
          contact: "8171065385",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <button onClick={loadRazorpayScript}>
      Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;
