import { useEffect, useState } from "react";
import { addfood } from "../service/foodservice";
import { toast } from "react-toastify";

const Add = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      toast.error("Please select image");
      return;
    }

    setLoading(true);

    const food = { name, price, category, description };

    try {
      await addfood(food, image);
      toast.success("Food added successfully ");

      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      toast.error("Error adding food ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-6 px-4">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-5">
        Add New Food
      </h2>

      {/* White Card */}
      <div
        className="
        bg-white
        rounded-2xl
        shadow-xl
        border border-gray-100
        p-6
      "
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <label
            className="
            block w-full h-44
            rounded-xl
            border border-gray-200
            bg-gray-50
            cursor-pointer
            overflow-hidden
          "
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-contain bg-white"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Click to upload food image
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;

                setImage(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </label>

          {/* Food Name */}
          <input
            type="text"
            required
            placeholder="Food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full px-4 py-2.5
              border border-gray-300
              rounded-lg
              focus:ring-2 focus:ring-indigo-500
              outline-none
            "
          />

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <input
              type="number"
              required
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="
                w-full px-4 py-2.5
                border border-gray-300
                rounded-lg
                focus:ring-2 focus:ring-indigo-500
                outline-none
              "
            />

            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full px-4 py-2.5
                border border-gray-300
                rounded-lg
                focus:ring-2 focus:ring-indigo-500
                outline-none
              "
            >
              <option value="">Category</option>
              <option>Biryani</option>
              <option>Burger</option>
              <option>Pizza</option>
              <option>Cake</option>
              <option>Ice Cream</option>
              <option>Rolls</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            rows="3"
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full px-4 py-2.5
              border border-gray-300
              rounded-lg
              resize-none
              focus:ring-2 focus:ring-indigo-500
              outline-none
            "
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-3
              rounded
              text-white font-semibold
              transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }
            `}
          >
            {loading ? "Adding food..." : "Add Food"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
