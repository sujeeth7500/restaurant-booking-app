import { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { restaurants, tables } from "../data";
import { Customer } from "../types";

interface BookingPageProps {
  restaurantId: string;
  onNavigate: (page: string, restaurantId?: string, bookingData?: any) => void;
  onBookingComplete: (bookingData: BookingData) => void; // (Not used anymore)
}

export interface BookingData {
  restaurantId: string;
  restaurantName: string;
  tableId: string;
  tableNumber: number;
  date: string;
  time: string;
  guests: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  isPriority: boolean;
}

export default function BookingPage({
  restaurantId,
  onNavigate,
}: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isPriorityCustomer, setIsPriorityCustomer] = useState(false);
  const [showPriorityMessage, setShowPriorityMessage] = useState(false);

  const restaurant = useMemo(() => {
    return restaurants.find((r) => r.id === restaurantId);
  }, [restaurantId]);

  const restaurantTables = useMemo(() => {
    return tables.filter((t) => t.restaurantId === restaurantId);
  }, [restaurantId]);

  // Default date
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // ⭐ TIME SLOTS
  const TIME_SLOTS = [
    { label: "7:00 AM - 8:00 AM", value: "07:00" },
    { label: "8:30 AM - 9:30 AM", value: "08:30" },
    { label: "10:00 AM - 11:00 AM", value: "10:00" },
    { label: "11:30 AM - 12:30 PM", value: "11:30" },
    { label: "1:00 PM - 2:00 PM", value: "13:00" },
    { label: "2:30 PM - 3:30 PM", value: "14:30" },
    { label: "4:00 PM - 5:00 PM", value: "16:00" },
    { label: "5:30 PM - 6:30 PM", value: "17:30" },
    { label: "7:00 PM - 8:00 PM", value: "19:00" },
    { label: "8:30 PM - 9:30 PM", value: "20:30" },
    { label: "10:00 PM - 11:00 PM", value: "22:00" },
  ];

  // ⭐ Fetch booked time slots from backend
  useEffect(() => {
    if (!selectedDate) return;

    fetch(
      `/api/booking/availability?restaurantId=${restaurantId}&date=${selectedDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        const takenTimes = data.map((b: any) => b.time);
        setBookedSlots(takenTimes);
      })
      .catch(() => setBookedSlots([]));
  }, [selectedDate, restaurantId]);

  // Priority customer check
  const checkReturningCustomer = () => {
    const existingCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    ) as Customer[];

    const returning = existingCustomers.find(
      (c) => c.email === customerEmail || c.phone === customerPhone
    );

    setIsPriorityCustomer(!!returning);
    setShowPriorityMessage(!!returning);
  };

  // ⭐ Calculate end time (+1 hour)
  function calculateEndTime(start: string) {
    const [h, m] = start.split(":").map(Number);
    const endHour = h + 1;
    return `${String(endHour).padStart(2, "0")}:${m === 0 ? "00" : m}`;
  }

  // ⭐ Submit booking → redirect to Payment Page
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTableId) {
      alert("Please select a table");
      return;
    }

    const selectedTable = restaurantTables.find((t) => t.id === selectedTableId);
    if (!selectedTable) return;

    const endTime = calculateEndTime(selectedTime);

    // booking object to send to payment page
    const bookingData: BookingData = {
      restaurantId,
      restaurantName: restaurant?.name || "",
      tableId: selectedTable.id,
      tableNumber: selectedTable.tableNumber,
      date: selectedDate,
      time: selectedTime,
      guests: numberOfGuests,
      customerName,
      customerEmail,
      customerPhone,
      isPriority: isPriorityCustomer,
    };

    // ⭐ Redirect to payment page
    onNavigate("payment", "", {
      ...bookingData,
      endTime,
    });
  };

  if (!restaurant) {
    return <div className="text-center py-10">Restaurant not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* LOGOUT */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            onNavigate("login");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>

      {/* HEADER */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate("restaurants")}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          <h1 className="text-4xl font-bold">Book Your Table</h1>
          <p className="text-orange-100">{restaurant.name}</p>
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT SIDE */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

              {/* DATE */}
              <label className="block mb-4">
                <span className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" /> Select Date
                </span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </label>

              {/* TIME */}
              <label className="block mb-4">
                <span className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4" /> Select Time
                </span>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border px-4 py-2 rounded"
                  required
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot.value);
                    return (
                      <option
                        key={slot.value}
                        value={slot.value}
                        disabled={isBooked}
                        className={isBooked ? "text-red-500" : ""}
                      >
                        {slot.label} {isBooked ? "(Booked)" : "(Available)"}
                      </option>
                    );
                  })}
                </select>
              </label>

              {/* GUESTS */}
              <label className="block mb-4">
                <span className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4" /> Guests
                </span>
                <select
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                  className="w-full border px-4 py-2 rounded"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* CUSTOMER DETAILS */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Your Information</h2>

              {/* PRIORITY MESSAGE */}
              {showPriorityMessage && (
                <div className="p-3 mb-4 bg-green-100 border border-green-300 rounded">
                  <p className="text-green-700 font-semibold">
                    ⭐ Returning Customer — Priority Booking Applied!
                  </p>
                </div>
              )}

              {/* NAME */}
              <label className="block mb-4">
                <span className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" /> Full Name
                </span>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </label>

              {/* EMAIL */}
              <label className="block mb-4">
                <span className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4" /> Email
                </span>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  onBlur={checkReturningCustomer}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </label>

              {/* PHONE */}
              <label className="block mb-4">
                <span className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4" /> Phone
                </span>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  onBlur={checkReturningCustomer}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </label>
            </div>
          </div>

          {/* RIGHT SIDE — TABLES */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-5">
              <h2 className="text-2xl font-bold mb-6">Select Your Table</h2>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {restaurantTables.map((table) => (
                  <button
                    key={table.id}
                    type="button"
                    onClick={() =>
                      table.status === "available" || isPriorityCustomer
                        ? setSelectedTableId(table.id)
                        : null
                    }
                    disabled={table.status === "booked" && !isPriorityCustomer}
                    className={`aspect-square rounded border-2 flex flex-col items-center justify-center
                      ${
                        selectedTableId === table.id
                          ? "bg-orange-500 border-orange-600 text-white"
                          : table.status === "available"
                          ? "bg-white border-gray-300"
                          : "bg-gray-400 border-gray-500 text-white"
                      }
                    `}
                  >
                    <span className="text-lg font-bold">
                      T{table.tableNumber}
                    </span>
                    <span className="text-xs">
                      <Users className="w-3 h-3 inline mr-1" />
                      {table.capacity}
                    </span>
                  </button>
                ))}
              </div>

              {selectedTableId && (
                <div className="bg-orange-50 border border-orange-200 p-4 mb-6 rounded">
                  <p className="font-semibold">
                    Selected Table: T
                    {restaurantTables.find((t) => t.id === selectedTableId)
                      ?.tableNumber}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedTableId || !selectedTime}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
