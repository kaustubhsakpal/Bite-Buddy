import { toast } from "react-toastify";
import axios from "axios";

export const handlePayment = async (
  grandTotal,
  orderPayload,
  onSuccess
) => {
  try {
    // 1️⃣ Create Razorpay Order
    const res = await fetch(
      "http://localhost:8080/api/payment/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal * 100,
        }),
      }
    );

    const razorpayOrder = await res.json();

    const options = {
      key: "rzp_test_S17yBvgjIcmNGb",
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "BiteBuddy",
      description: "Food Order Payment",
      order_id: razorpayOrder.orderId,

      // 🔥 PAYMENT SUCCESS HANDLER
      handler: async function (response) {
        // 2️⃣ Verify payment
        const verifyRes = await fetch(
          "http://localhost:8080/api/payment/verify-payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }
        );

        const result = await verifyRes.json();

        if (result.status === "success") {
          // 3️⃣ SAVE ORDER IN BACKEND 🔥🔥🔥
          await axios.post(
            "http://localhost:8080/api/orders",
            {
              item: orderPayload.item,
              quantity: orderPayload.quantity,
              amount: orderPayload.amount,
            }
          );

          toast.success("Payment Successful 🎉");
          onSuccess(); // redirect
        } else {
          toast.error("Payment verification failed");
        }
      },

      theme: {
        color: "#f97316",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    toast.error("Payment error");
  }
};
