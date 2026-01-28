import { useContext } from "react";
import { StoreContext } from "../context/Storecontext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    foodList,
    removeFromCart,
    increaseCartQty,
    decreaseCartQty,
  } = useContext(StoreContext);

  const cartFood = foodList.filter((item) => cartItems[item.id]);

  const itemTotal = cartFood.reduce(
    (sum, item) => sum + item.price * cartItems[item.id],
    0
  );

  const deliveryFee = itemTotal > 0 ? 40 : 0;
  const platformFee = itemTotal > 0 ? 10 : 0;
  const gst = Math.round(itemTotal * 0.05); // 5% GST

  const grandTotal = itemTotal + deliveryFee + platformFee + gst;

  if (cartFood.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      {/* LEFT – CART ITEMS */}
      <div className="md:col-span-2 space-y-4">
        {cartFood.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">₹{item.price}</p>

              {/* QTY EDIT */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseCartQty(item.id)}
                  className="w-7 h-7 border rounded"
                >
                  −
                </button>

                <span>{cartItems[item.id]}</span>

                <button
                  onClick={() => increaseCartQty(item.id)}
                  className="w-7 h-7 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="font-semibold text-orange-500">
                ₹{item.price * cartItems[item.id]}
              </span>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT – ORDER SUMMARY */}
      <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

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

        <div className="flex justify-between text-lg font-bold">
          <span>Total Payable</span>
          <span>₹{grandTotal}</span>
        </div>

        <div className="mt-7 ">
          <Link
            to="/checkout"
            className=" bg-orange-500 text-white py-3 px-4 rounded font-semibold hover:bg-orange-600 active:scale-95"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
