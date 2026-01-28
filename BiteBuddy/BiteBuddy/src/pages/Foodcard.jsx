import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col">
      
      {/* Image */}
      <div className="w-full h-36 rounded-lg bg-gray-100 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=Food";
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col grow">
        <h3 className="text-sm md:text-base font-medium text-gray-800 truncate">
          {item.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {item.description}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {item.category}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-orange-500 font-semibold">
            ₹{item.price}
          </span>

          <Link
            to={`/food/${item.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
