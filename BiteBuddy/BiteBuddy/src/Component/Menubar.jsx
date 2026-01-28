import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/Storecontext";
import logo from "../assets/logo-Photoroom.png";
import { useUser, useClerk } from "@clerk/clerk-react";

const Menubar = () => {
  const [open, setOpen] = useState(false);
  const { cartItems } = useContext(StoreContext);

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const cartCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="mx-auto w-[92%] md:w-[80%] py-3">
        <nav className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BiteBuddy" className="h-10 w-auto " />
            <span className="hidden sm:block font-bold text-lg text-gray-800">
              BiteBuddy
            </span>
          </Link>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/explore">
              Explore
            </Link>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/cart" className="relative text-xl text-gray-700">
              <i className="bi bi-cart3"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 🔐 AUTH SECTION */}
            {!isSignedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-500"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-linear-to-r from-orange-500 to-red-500 shadow"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm font-medium text-gray-700">
                  Hi, {user.firstName}
                </span>

                <button
                  onClick={() => signOut()}
                  className=" px-3 py-2.5 flex items-center gap-2 text-sm font-semibold text-white rounded   bg-linear-to-r from-red-500  to-rose-500 hover:from-red-600 hover:to-rose-600 shadow active:scale-95 transition-all"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE BTN */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-gray-700"
          >
            {open ? "✕" : "☰"}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden mt-4 bg-white rounded-xl shadow-lg">
            <Link onClick={() => setOpen(false)} className="mobile-link" to="/">
              Home
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="mobile-link"
              to="/explore"
            >
              Explore
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="mobile-link"
              to="/contact"
            >
              Contact
            </Link>

            <Link
              onClick={() => setOpen(false)}
              className="mobile-link"
              to="/cart"
            >
              Cart ({cartCount})
            </Link>

            {!isSignedIn ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  className="mobile-link"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/register"
                  className="block text-center py-3 font-semibold text-white bg-orange-500"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="   w-full py-3 flex items-center justify-center gap-2 font-semibold text-sm text-white bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 rounded-b-xl active:scale-95 transition-all"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Menubar;
