import React, { useState } from "react";
import PaymentForm from "./PaymentForm"; 
import './PaymentDetails.css';
function ParentComponent() {
  const handlePaymentSubmit = (paymentDetails) => {
    // Handle payment submission logic here
    console.log("Payment submitted:", paymentDetails); 
  };

  return (
    <div>
      <h1>Payment Form</h1>
      <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
    </div>
  );
}

export default ParentComponent;
