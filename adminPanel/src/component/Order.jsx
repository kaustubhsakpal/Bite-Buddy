import { useEffect, useState } from "react";
import axios from "axios";
import { Check, X } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  //  get orders from backend (JWT PROTECTED)
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:8080/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //  HANDLE ALL RESPONSE TYPES
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.orders)
        ? res.data.orders
        : [];
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setOrders([]);
      setLoading(false);
    }
  };

  //  accept / reject order (JWT PROTECTED)
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `http://localhost:8080/api/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ⚡ instant UI update
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl shadow-sm p-5">
      <h2 className="text-lg font-semibold mb-4">Orders</h2>

      {loading && (
        <p className="text-sm text-gray-500">Loading orders...</p>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-sm text-gray-500">No orders yet</p>
      )}

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              flex justify-between items-center
              backdrop-blur-lg bg-white/50
              border border-white/30
              rounded-xl px-4 py-3
            "
          >
            {/* LEFT */}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {order.item} × {order.quantity}
              </p>
              <p className="text-xs text-gray-600">
                ₹{order.amount}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <span
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full
                  ${
                    order.status === "PENDING"
                      ? "bg-yellow-100/80 text-yellow-700"
                      : order.status === "ACCEPTED"
                      ? "bg-green-100/80 text-green-700"
                      : "bg-red-100/80 text-red-700"
                  }
                `}
              >
                {order.status}
              </span>

              {order.status === "PENDING" && (
                <>
                  <button
                    onClick={() =>
                      updateStatus(order.id, "ACCEPTED")
                    }
                    className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
                    title="Accept order"
                  >
                    <Check size={14} />
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(order.id, "REJECTED")
                    }
                    className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
                    title="Reject order"
                  >
                    <X size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
