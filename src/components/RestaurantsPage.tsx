import { useState, useMemo } from 'react';
import { MapPin, UtensilsCrossed, Filter } from 'lucide-react';
import { restaurants } from '../data';
import { Restaurant } from '../types';

interface RestaurantsPageProps {
  onNavigate: (page: string, restaurantId?: string) => void;
}

export default function RestaurantsPage({ onNavigate }: RestaurantsPageProps) {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  const cuisines = useMemo(() => {
    const uniqueCuisines = Array.from(new Set(restaurants.map((r) => r.cuisine)));
    return ['All', ...uniqueCuisines];
  }, []);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(restaurants.map((r) => r.location)));
    return ['All', ...uniqueLocations];
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const cuisineMatch = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
      const locationMatch = selectedLocation === 'All' || restaurant.location === selectedLocation;
      return cuisineMatch && locationMatch;
    });
  }, [selectedCuisine, selectedLocation]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 LOGOUT BUTTON (added without any change to design) */}
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

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="mb-6 text-white hover:text-gray-200 transition"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Restaurants in Erode</h1>
          <p className="text-lg text-orange-100">Discover the best dining experiences in town</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Filter Restaurants</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-16">
            <UtensilsCrossed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No restaurants found with the selected filters</p>
            <button
              onClick={() => {
                setSelectedCuisine('All');
                setSelectedLocation('All');
              }}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onNavigate: (page: string, restaurantId?: string) => void;
}

function RestaurantCard({ restaurant, onNavigate }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>

        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{restaurant.location}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
            {restaurant.cuisine}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{restaurant.description}</p>

        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('menu', restaurant.id)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
          >
            View Menu
          </button>
          <button
            onClick={() => onNavigate('booking', restaurant.id)}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Book Table
          </button>
        </div>
      </div>
    </div>
  );
}
