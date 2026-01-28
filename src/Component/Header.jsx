import { useRef } from "react";
import { Link } from "react-router-dom";

import biryani from "../assets/biryani.avif";
import burger from "../assets/burger.avif";
import pizza from "../assets/pizza.avif";
import cakes from "../assets/cake.avif";
import icecream from "../assets/ice-cream.avif";
import rolls from "../assets/rolls.avif";
import salad from "../assets/salad.avif";
import herobg from "../assets/food-backgrounds-092ac.webp";

const categories = [
  { name: "Biryani", img: biryani },
  { name: "Burger", img: burger },
  { name: "Cakes", img: cakes },
  { name: "Ice Creams", img: icecream },
  { name: "Pizza", img: pizza },
  { name: "Rolls", img: rolls },
  { name: "Salad", img: salad },
  { name: "Biryani", img: biryani },
  { name: "Burger", img: burger },
  { name: "Cakes", img: cakes },
  { name: "Ice Creams", img: icecream },
  { name: "Pizza", img: pizza },
  { name: "Rolls", img: rolls },
  { name: "Salad", img: salad },
];

const Header = ({ setSelectedCategory }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full px-3 ">
      {/* HERO SECTION */}
      <section
        className="relative px-6 py-10 rounded-2xl shadow-md overflow-hidden"
        style={{
          backgroundImage: `url(${herobg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Order your favorite food here
          </h1>

          <p className="mt-2 text-gray-200">
            Discover the best food and drinks near you
          </p>

          <Link
            to="/explore"
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold"
          >
            Explore
          </Link>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-white opacity-80 animate-bounce">
          <span className="text-xs">Scroll</span>
          <span className="text-xl">↓</span>
        </div>
      </section>

      {/* CATEGORY SLIDER */}
      <section className="py-8 relative">
        {/* LEFT ARROW */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow items-center justify-center"
        >
          ←
        </button>

        {/* SLIDER */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-8 px-12 overflow-x-scroll scrollbar-hide"
        >
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(item.name)}
              className="flex flex-col items-center justify-center cursor-pointer min-w-40"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow items-center justify-center"
        >
          →
        </button>
      </section>
    </div>
  );
};

export default Header;
