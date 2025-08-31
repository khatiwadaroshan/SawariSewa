import React, { useState } from "react";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";

export default function PaymentForm({ bookingId, amount }) {
  const [method, setMethod] = useState("eSewa");

  const handlePayment = async () => {
    try {
      if (method === "eSewa") {
        // Call backend to create payment
        const response = await axios.post(
          "http://localhost:5000/api/payments",
          {
            bookingId,
            amount,
            method,
          }
        );

        const esewaData = response.data.esewaData;

        // Create and submit form dynamically
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://uat.esewa.com.np/epay/main";

        Object.keys(esewaData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = esewaData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }

      if (method === "Khalti") {
        // Khalti configuration
        const config = {
          publicKey: "test_public_key_here", // Replace with your Khalti public key
          productIdentity: bookingId,
          productName: "Vehicle Booking",
          amount: amount * 100, // in paisa
          onSuccess(payload) {
            console.log("Khalti Success:", payload);
            // Call your backend to mark payment success
            axios.post("http://localhost:5000/api/payments", {
              bookingId,
              amount,
              method: "Khalti",
              status: "Completed",
              transactionId: payload.idx,
            });
            alert("Payment Successful via Khalti!");
          },
          onError(error) {
            console.log("Khalti Error:", error);
            alert("Payment failed via Khalti.");
          },
          onClose() {
            console.log("Khalti Widget closed");
          },
        };

        const checkout = new KhaltiCheckout(config);
        checkout.show({ amount: amount * 100 });
      }

      if (method === "Cash") {
        // Just mark payment completed in backend
        await axios.post("http://localhost:5000/api/payments", {
          bookingId,
          amount,
          method: "Cash",
          status: "Completed",
        });
        alert("Payment marked as Cash collected!");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Complete Payment</h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Select Payment Method:
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="eSewa">eSewa</option>
          <option value="Khalti">Khalti</option>
          <option value="Cash">Cash</option>
        </select>
      </div>

      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Pay Rs.{amount}
      </button>
    </div>
  );
}
