import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      const token = res.data.token;

      // 🔥 IMPORTANT: pehle console log
      console.log("ADMIN TOKEN 👉", token);

      // 🔥 SAVE TOKEN
      localStorage.setItem("adminToken", token);

      // 🔥 VERIFY SAVE
      console.log(
        "TOKEN FROM LOCALSTORAGE 👉",
        localStorage.getItem("adminToken")
      );

      // 🔥 SMALL DELAY (VERY IMPORTANT)
      setTimeout(() => {
        window.location.replace("/");
      }, 200);

    } catch (err) {
      console.error("LOGIN ERROR", err);
      setError("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        <input
          className="form-control mb-3"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
