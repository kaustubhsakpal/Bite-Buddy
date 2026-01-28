import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Receipt,
  IndianRupee,
  Activity,
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFoods: 0,
    ordersToday: 0,
    revenueToday: 0,
  });

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = async () => {
    try {
      const summaryRes = await axios.get(
        "http://localhost:8080/api/dashboard/summary"
      );

      const activityRes = await axios.get(
        "http://localhost:8080/api/dashboard/activity"
      );

      setStats(summaryRes.data);
      setActivities(activityRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard API error", err);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Real-time overview of your business
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <TrendingUp size={16} />
          Live
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <StatCard
          title="Total Foods"
          value={stats.totalFoods}
          icon={<Box />}
          color="indigo"
        />

        <StatCard
          title="Orders Today"
          value={stats.ordersToday}
          icon={<Receipt />}
          color="purple"
        />

        <StatCard
          title="Revenue Today"
          value={`₹${stats.revenueToday}`}
          icon={<IndianRupee />}
          color="emerald"
        />

      </div>

      {/* ACTIVITY */}
      <div className="bg-white rounded-2xl border shadow-sm">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            Recent Activity
          </h2>
          <span className="text-sm text-gray-400">
            Latest updates
          </span>
        </div>

        {activities.length === 0 ? (
          <p className="p-6 text-gray-500">No activity yet</p>
        ) : (
          <div className="divide-y">
            {activities.map((item, index) => (
              <ActivityRow
                key={index}
                title={item.title}
                amount={item.amount}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

// ---------- STAT CARD ----------
const colorMap = {
  indigo: "bg-indigo-50 text-indigo-600",
  purple: "bg-purple-50 text-purple-600",
  emerald: "bg-emerald-50 text-emerald-600",
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="
    bg-white border rounded-2xl p-6
    shadow-sm hover:shadow-md transition
    flex items-center justify-between
  ">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-semibold text-gray-900 mt-1">
        {value}
      </h2>
    </div>

    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}
    >
      {icon}
    </div>
  </div>
);

// ---------- ACTIVITY ROW ----------
const ActivityRow = ({ title, amount }) => (
  <div className="flex items-center justify-between px-6 py-4">
    <div className="flex items-center gap-3 text-gray-700">
      <Activity size={18} className="text-gray-400" />
      <span>{title}</span>
    </div>
    <span className="font-medium text-gray-900">
      ₹{amount}
    </span>
  </div>
);

export default Dashboard;
