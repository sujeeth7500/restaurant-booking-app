import { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";

export default function PaymentPage({ bookingData, onPaymentSuccess, onNavigate }: any) {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    setTimeout(async () => {
      // -----------------------------
      // SAVE BOOKING TO MONGODB
      // -----------------------------
      await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: bookingData.restaurantId,
          tableId: bookingData.tableId,
          tableNumber: bookingData.tableNumber,
          date: bookingData.date,
          time: bookingData.time,
          endTime: bookingData.endTime,
          customerName: bookingData.customerName,
          customerEmail: bookingData.customerEmail,
          customerPhone: bookingData.customerPhone
        }),
      });

      setLoading(false);

      // Go to confirmation page
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      {/* LOGOUT */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => onNavigate("login")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Payment
        </h2>

        {/* BOOKING SUMMARY */}
        <div className="mb-6 space-y-2">
          <p className="font-semibold">Restaurant: {bookingData.restaurantName}</p>
          <p>Date: {bookingData.date}</p>
          <p>Time: {bookingData.time}</p>
          <p>Table: {bookingData.tableNumber}</p>
          <p className="font-bold text-orange-600 text-lg">
            Amount: ₹200 (Table Reservation Fee)
          </p>
        </div>

        {/* PAYMENT METHOD */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Payment Method</h3>

          <div className="space-y-3">

            <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
              <input
                type="radio"
                checked={method === "card"}
                onChange={() => setMethod("card")}
              />
              <CreditCard />
              Card Payment
            </label>

            <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
              <input
                type="radio"
                checked={method === "upi"}
                onChange={() => setMethod("upi")}
              />
              <Smartphone />
              UPI Payment
            </label>

          </div>
        </div>

        {/* PAYMENT FORM */}
        <div className="space-y-3 mb-6">
          {method === "card" && (
            <>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full border p-2 rounded-lg"
              />
            </>
          )}

          {method === "upi" && (
            <input
              type="text"
              placeholder="Enter UPI ID (example@upi)"
              className="w-full border p-2 rounded-lg"
            />
          )}
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transform transition"
        >
          {loading ? "Processing..." : "Pay ₹200"}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          *This is a demo payment. No real money will be deducted.
        </p>
      </div>
    </div>
  );
}
