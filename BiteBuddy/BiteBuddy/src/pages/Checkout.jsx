import { useContext, useState } from "react";
import { StoreContext } from "../context/Storecontext";
import { useNavigate } from "react-router-dom";
import { handlePayment } from "../Service/paymenthandel";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, foodList } = useContext(StoreContext);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // cart ke items
  const cartFood = foodList.filter((item) => cartItems[item.id]);

  // calculations (SAME AS BEFORE)
  const itemTotal = cartFood.reduce(
    (sum, item) => sum + item.price * cartItems[item.id],
    0
  );

  const deliveryFee = itemTotal > 0 ? 40 : 0;
  const platformFee = itemTotal > 0 ? 10 : 0;
  const gst = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + deliveryFee + platformFee + gst;

  if (cartFood.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No items to checkout 🛒
      </div>
    );
  }

  // 🔥 ONLY LOGIC FIX HERE
  const handlePayClick = () => {
    const { name, phone, street, city, state, pincode } = address;

    if (!name || !phone || !street || !city || !state || !pincode) {
      toast.error("Please fill all delivery details before payment");
      return;
    }

    // ✅ SIMPLE ORDER PAYLOAD (backend compatible)
    const firstItem = cartFood[0];

    const orderPayload = {
      item: firstItem.name,
      quantity: cartItems[firstItem.id],
      amount: grandTotal,
    };

    handlePayment(grandTotal, orderPayload, () => {
      navigate("/ordersuccess", {
        state: {
          amount: grandTotal,
        },
      });
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      {/* LEFT – DELIVERY DETAILS */}
      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm space-y-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Delivery Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={address.name}
            onChange={(e) =>
              setAddress({ ...address, name: e.target.value })
            }
            className="h-11 border rounded-lg px-4 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) =>
              setAddress({ ...address, phone: e.target.value })
            }
            className="h-11 border rounded-lg px-4 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <input
          type="text"
          placeholder="Street Address"
          value={address.street}
          onChange={(e) =>
            setAddress({ ...address, street: e.target.value })
          }
          className="h-11 w-full border rounded-lg px-4 outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
            className="h-11 border rounded-lg px-4 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) =>
              setAddress({ ...address, state: e.target.value })
            }
            className="h-11 border rounded-lg px-4 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
            className="h-11 border rounded-lg px-4 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* RIGHT – ORDER SUMMARY */}
      <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        {cartFood.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-2">
            <span>
              {item.name} × {cartItems[item.id]}
            </span>
            <span>₹{item.price * cartItems[item.id]}</span>
          </div>
        ))}

        <hr className="my-3" />

        <div className="flex justify-between text-sm mb-2">
          <span>Item Total</span>
          <span>₹{itemTotal}</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>Delivery Charges</span>
          <span>₹{deliveryFee}</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>Platform Fee</span>
          <span>₹{platformFee}</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>GST (5%)</span>
          <span>₹{gst}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between text-lg font-bold mb-4">
          <span>Total Payable</span>
          <span>₹{grandTotal}</span>
        </div>

        <button
          onClick={handlePayClick}
          className="w-full bg-orange-500 text-white py-3 rounded font-semibold hover:bg-orange-600 active:scale-95 transition"
        >
          Pay ₹{grandTotal}
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="w-full mt-3 text-sm text-gray-500 hover:underline"
        >
          ← Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Checkout;
