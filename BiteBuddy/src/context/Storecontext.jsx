import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../Service/Foodservice";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);

  const [Quantities, setQuantities] = useState({});

  const increaceQty = (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 1) + 1,
    }));
  };

  const decreaseQty = (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 1 ? prev[foodId] - 1 : 1,
    }));
  };

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const addToCart = (foodId, qty = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + qty,
    }));
    setQuantities((prev) => ({
      ...prev,
      [foodId]: 1,
    }));
  };

  const removeFromCart = (foodId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[foodId];
      return updated;
    });
  };

  const increaseCartQty = (foodId) => {
    setCartItems((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));
  };

  const decreaseCartQty = (foodId) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (updated[foodId] > 1) {
        updated[foodId] -= 1;
      } else {
        delete updated[foodId]; 
      }

      return updated;
    });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFoodList();
        setFoodList(data);
      } catch (error) {
        toast.error("Failed to fetch food list");
        setFoodList([]);
      }
    };
    loadData();
  }, []);

  const store = {
    foodList,
    Quantities,
    increaceQty,
    decreaseQty,
    cartItems,
    addToCart,
    removeFromCart,
    increaseCartQty,
    decreaseCartQty,
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};
