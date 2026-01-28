import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `no-underline flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "bg-white/20 text-white"
         : "text-white/80 hover:bg-white/10 hover:text-white"
     }`;

  return (
    <aside
      className="
      fixed top-0 left-0 h-screen w-56
      bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950
      text-white shadow-2xl z-40 flex flex-col
    "
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-xl">
          🍽️
        </div>
        <span className="text-lg font-semibold tracking-wide">
          FoodAdmin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavLink to="/" className={linkClass}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/add" className={linkClass}>
          ➕ Add Food
        </NavLink>

        <NavLink to="/list" className={linkClass}>
          📋 Food List
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          🧾 Orders
        </NavLink>

        {/* Messages (always visible, no auth logic) */}
        <NavLink to="/admin/messages" className={linkClass}>
          📨 Messages
        </NavLink>
      </nav>

      <div className="px-4 py-3 border-t border-white/10 text-xs text-white/50">
        Admin Panel
      </div>
    </aside>
  );
};

export default Sidebar;
