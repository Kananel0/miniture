import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({ totalAmount, shippingData }) => {
  return (
    <div className="w-full mt-4">
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
        
        // This function sets up the details of the transaction
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Miniture Store Purchase",
                amount: {
                  currency_code: "USD",
                  value: totalAmount.toString(),
                },
              },
            ],
          });
        }}

        // This function handles the successful payment
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          
          console.log("Payment Successful!");
          console.log("Order Details:", order);
          console.log("Shipping to:", shippingData);

          alert(`Transaction completed by ${order.payer.name.given_name}!`);
          
          // You can redirect to a success page here
          // window.location.href = "/success";
        }}

        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          alert("There was an error processing your payment.");
        }}
      />
    </div>
  );
};

export default PaypalButton;