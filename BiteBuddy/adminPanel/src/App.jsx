import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Routes, Route } from "react-router-dom";

import Dashboard from "./component/Dashboard";
import Add from "./component/Add";
import List from "./component/List";
import Order from "./component/Order";
import Sidebar from "./component/Sidebar";
import AdminMessages from "./component/AdminMessages";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-slate-300 to-indigo-200">
      <ToastContainer />
      <Sidebar />

      <div className="ml-56 min-h-screen">
        <div className="px-6 pt-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Order />} />
            <Route
              path="/admin/messages"
              element={<AdminMessages />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
