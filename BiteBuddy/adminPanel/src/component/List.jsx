import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteFood } from "../service/fooddelete";

const FoodList = () => {
  const [list, setList] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const fetchList = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/foods");
      setList(res.data);
    } catch (err) {
      toast.error("Error while getting data");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFood(deleteId);
      toast.success("Food deleted successfully");
      setDeleteId(null);
      fetchList();
    } catch (err) {
      toast.error("Error deleting food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Food List</h2>
        <p className="text-sm text-gray-600">
          All available food items
        </p>
      </div>

      {/* Table Header */}
      <div className="bg-gray-100 rounded-t-xl px-6 py-3 text-sm font-semibold text-gray-600 flex justify-between">
        <span>Food</span>
        <span className="mr-10">Price</span>
      </div>

      {/* List */}
      <div className="bg-white rounded-b-xl shadow border border-gray-100">
        {list.length === 0 ? (
          <p className="p-6 text-gray-500 text-sm">No food found</p>
        ) : (
          list.map((item) => (
            <FoodRow
              key={item.id}
              food={item}
              onDelete={() => setDeleteId(item.id)}
            />
          ))
        )}
      </div>

      {/* 🔥 CUSTOM DELETE MODAL */}
      {deleteId && (
        <div className="
          fixed inset-0 z-50
          bg-black/40
          flex items-center justify-center
        ">
          <div className="
            bg-white
            rounded-2xl
            shadow-xl
            w-80
            p-6
            text-center
          ">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete food?
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              This action cannot be undone
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="
                  px-4 py-2 rounded-lg
                  text-gray-600
                  hover:bg-gray-100
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="
                  px-4 py-2 rounded-lg
                  bg-red-600
                  text-white
                  hover:bg-red-700
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FoodRow = ({ food, onDelete }) => {
  return (
    <div
      className="
        flex items-center justify-between
        px-6 py-4
        border-b last:border-b-0
        hover:bg-gray-50
        transition
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          {food.imageUrl && (
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            {food.name}
          </h3>
          <p className="text-sm text-gray-500">
            {food.category}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <p className="font-semibold text-gray-900">
          ₹{food.price}
        </p>

        <button
          onClick={onDelete}
          className="
            text-red-500
            hover:text-red-700
            text-lg
            transition
          "
          title="Delete food"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default FoodList;
