import { useEffect, useState } from "react";
import { Calendar, Clock, Users, LogOut as LogOutIcon, XCircle, Home } from "lucide-react";
import { supabase } from "../lib/supabase";

interface MyBookingsPageProps {
  onNavigate: (page: string) => void;
}

export default function MyBookingsPage({ onNavigate }: MyBookingsPageProps) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("date", { ascending: true });

      if (!error && data) setBookings(data);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      alert("Failed to cancel: " + error.message);
      return;
    }

    setBookings((prev) => prev.filter((b) => b.id !== id));
    alert("Booking cancelled successfully!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    onNavigate("login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">

      <div className="absolute top-5 right-36">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <Home size={18} /> Home
        </button>
      </div>

      <div className="absolute top-5 right-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <LogOutIcon size={18} /> Logout
        </button>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Bookings</h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && bookings.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-xl mb-4">No bookings found</p>
          <button
            onClick={() => onNavigate("restaurants")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Book a Table
          </button>
        </div>
      )}

      <div className="flex flex-col gap-6 max-w-3xl">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold mb-1">{b.restaurant_name}</h2>
            <p className="text-gray-500 text-sm mb-4">Table {b.table_number}</p>

            <div className="flex items-center gap-3 text-gray-700 mb-2">
              <Calendar size={18} />
              {b.date}
            </div>

            <div className="flex items-center gap-3 text-gray-700 mb-2">
              <Clock size={18} />
              {b.time} - {b.end_time}
            </div>

            <div className="flex items-center gap-3 text-gray-700 mb-4">
              <Users size={18} />
              {b.guests} {b.guests === 1 ? "Guest" : "Guests"}
            </div>

            <button
              onClick={() => cancelBooking(b.id)}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              <XCircle size={18} /> Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
