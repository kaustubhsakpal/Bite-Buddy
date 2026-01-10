import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FoodDisplay from "../Component/FoodDisplay";

const Explore = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  // agar Home se category aayi ho
  const category = location.state?.category || "";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* SEARCH BAR */}
      <div className="mb-8">
        <div className="flex items-center bg-white shadow-sm rounded-xl px-4 py-3">
          <input
            type="text"
            placeholder="Search for dishes, pizza, burger..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
          <span className="text-gray-400 ml-2">🔍</span>
        </div>
      </div>

      {/* FOOD LIST */}
      <FoodDisplay search={search} category={category} />
    </div>
  );
};

export default Explore;
