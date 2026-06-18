import {
  CheckCircle,
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  Home,
  BookOpen,
  Download,
} from "lucide-react";

import { BookingData } from "./BookingPage";

interface ConfirmationPageProps {
  bookingData: BookingData;
  onNavigate: (page: string) => void;
}

export default function ConfirmationPage({
  bookingData,
  onNavigate,
}: ConfirmationPageProps) {
  // Correct Time Slot Labels
  const TIME_SLOTS: Record<string, string> = {
    "07:00": "7:00 AM - 8:00 AM",
    "08:30": "8:30 AM - 9:30 AM",
    "10:00": "10:00 AM - 11:00 AM",
    "11:30": "11:30 AM - 12:30 PM",
    "13:00": "1:00 PM - 2:00 PM",
    "14:30": "2:30 PM - 3:30 PM",
    "16:00": "4:00 PM - 5:00 PM",
    "17:30": "5:30 PM - 6:30 PM",
    "19:00": "7:00 PM - 8:00 PM",
    "20:30": "8:30 PM - 9:30 PM",
    "22:00": "10:00 PM - 11:00 PM",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ⭐ Download PDF Receipt
  const downloadReceipt = () => {
    const content = `
==== TABLE BOOKING RECEIPT ====

Restaurant: ${bookingData.restaurantName}

Date: ${formatDate(bookingData.date)}
Time: ${TIME_SLOTS[bookingData.time]}
Table Number: ${bookingData.tableNumber}
Guests: ${bookingData.guests}

Customer Name: ${bookingData.customerName}
Email: ${bookingData.customerEmail}
Phone: ${bookingData.customerPhone}

Payment Status: PAID
Booking ID: BKG-${Date.now()}

Generated On: ${new Date().toLocaleString()}

Thank you for booking with us!
    `;

    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Booking_Receipt_${bookingData.tableNumber}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4 py-12">
      {/* LOGOUT */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            onNavigate("login");
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>

      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-green-100 text-lg">
              See you soon at {bookingData.restaurantName}
            </p>
          </div>

          <div className="p-8">
            {/* PRIORITY BOX */}
            {bookingData.isPriority && (
              <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 text-amber-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Priority Booking</span>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  Thank you for being a returning customer! Your reservation has
                  been prioritized.
                </p>
              </div>
            )}

            {/* SUMMARY */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Booking Summary
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              {/* Restaurant */}
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Restaurant</p>
                  <p className="font-semibold">
                    {bookingData.restaurantName}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">
                    {formatDate(bookingData.date)}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold">
                    {TIME_SLOTS[bookingData.time]}
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className="flex items-center gap-3 text-gray-700">
                <Users className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Table & Guests</p>
                  <p className="font-semibold">
                    Table {bookingData.tableNumber} • {bookingData.guests}{" "}
                    {bookingData.guests === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
              </div>
            </div>

            {/* CUSTOMER DETAILS */}
            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">
              Customer Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{bookingData.customerEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{bookingData.customerPhone}</p>
                </div>
              </div>
            </div>

            {/* IMPORTANT BOX */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> Please arrive 10 minutes early.
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              {/* HOME */}
              <button
                onClick={() => onNavigate("home")}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>

              {/* MY BOOKINGS */}
              <button
                onClick={() => onNavigate("mybookings")}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                My Bookings
              </button>

              {/* DOWNLOAD RECEIPT */}
              <button
                onClick={downloadReceipt}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            We look forward to serving you!{" "}
            <span className="text-orange-600 font-semibold">
              Thank you for choosing us.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
