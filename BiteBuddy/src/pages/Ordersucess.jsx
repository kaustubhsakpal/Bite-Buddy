import { useLocation, Link, Navigate } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();
  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="mt-3 text-gray-600">
        Payment ID:{" "}
        <span className="font-medium">{state.paymentId}</span>
      </p>

      <p className="mt-1 text-gray-600">
        Amount Paid: ₹{state.amount}
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default OrderSuccess;
