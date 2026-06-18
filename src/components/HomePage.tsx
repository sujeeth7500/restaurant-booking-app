import { UtensilsCrossed } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">

      {/* 🔥 LOGOUT BUTTON (added) */}
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
      {/* 🔥 END LOGOUT */}

      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <div className="flex items-center gap-3 mb-6">
            <UtensilsCrossed className="w-16 h-16 text-orange-500" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 tracking-tight">
            Book Your Table Instantly
          </h1>

          <p className="text-xl md:text-2xl text-center mb-2 text-gray-200">
            in Erode
          </p>

          <p className="text-lg md:text-xl text-center mb-12 max-w-2xl text-gray-300">
            Discover the best restaurants in Erode and book your table hassle-free.
            Experience fine dining at your fingertips.
          </p>

          {/* ⭐ MAIN BUTTON */}
          <button
            onClick={() => onNavigate('restaurants')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-12 py-4 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
          >
            Find Restaurants
          </button>

          {/* ⭐ NEW: MY BOOKINGS BUTTON */}
          <button
            onClick={() => onNavigate('mybookings')}
            className="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-lg px-12 py-4 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
          >
            My Bookings
          </button>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">100+</div>
              <div className="text-gray-300">Tables Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">6</div>
              <div className="text-gray-300">Premium Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-300">Booking Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Choose Restaurant</h3>
              <p className="text-gray-600">Browse and select from top restaurants in Erode</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">View Menu</h3>
              <p className="text-gray-600">Check out the delicious menu offerings</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Select Table</h3>
              <p className="text-gray-600">Pick your preferred table and time slot</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Confirm Booking</h3>
              <p className="text-gray-600">Get instant confirmation and enjoy your meal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
