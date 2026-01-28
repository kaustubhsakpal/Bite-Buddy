import { useContext } from "react";
import { StoreContext } from "../context/Storecontext";
import Card from "../pages/Foodcard";

// 🔧 helper function (KEY FIX)
const normalize = (value = "") =>
  value.toLowerCase().replace(/\s+/g, "").replace(/s$/, "");

const FoodDisplay = ({ search = "", category }) => {
  const { foodList } = useContext(StoreContext);

  const filteredFood = foodList?.filter((item) => {
    // search filter
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    // category filter
    const matchCategory =
      !category || category.trim() === ""
        ? true
        : normalize(item.category) === normalize(category);

    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4">
      {filteredFood && filteredFood.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
          {filteredFood.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-20">
          <p className="text-lg font-medium">No food found 🍽️</p>
          <p className="text-sm mt-2">
            Try searching something else
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
