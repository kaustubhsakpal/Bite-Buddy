import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/Storecontext";

const Viewdetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    foodList,
    increaceQty,
    decreaseQty,
    Quantities,
    addToCart,
  } = useContext(StoreContext);

  const food = foodList.find((item) => item.id == id);

  const qty = Quantities[id] || 1;

  if (!food) {
    return (
      <div className="text-center py-20 text-gray-500">
        Food not found 🍽️
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 shadow-2xl"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-sm">

        <div className="w-full h-72 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={food.imageUrl}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{food.name}</h1>

          <p className="mt-4 text-gray-600">{food.description}</p>

          <p className="mt-6 text-3xl font-bold text-orange-500">
            ₹{food.price}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => decreaseQty(id)}
              className="w-8 h-8 border rounded"
            >
              −
            </button>

            <span className="font-medium">{qty}</span>

            <button
              onClick={() => increaceQty(id)}
              className="w-8 h-8 border rounded"
            >
              +
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => {
              addToCart(id, qty);
              navigate("/cart");
            }}
            className="mt-4 w-full md:w-auto px-6 py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 active:scale-95 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewdetails;
