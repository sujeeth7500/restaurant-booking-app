import { useMemo } from 'react';
import { ArrowLeft, IndianRupee } from 'lucide-react';
import { restaurants, menuItems } from '../data';
import { MenuItem } from '../types';

interface MenuPageProps {
  restaurantId: string;
  onNavigate: (page: string, restaurantId?: string) => void;
}

export default function MenuPage({ restaurantId, onNavigate }: MenuPageProps) {
  const restaurant = useMemo(() => {
    return restaurants.find((r) => r.id === restaurantId);
  }, [restaurantId]);

  const restaurantMenu = useMemo(() => {
    return menuItems.filter((item) => item.restaurantId === restaurantId);
  }, [restaurantId]);

  const categorizedMenu = useMemo(() => {
    const categories: { [key: string]: MenuItem[] } = {
      Starters: [],
      'Main Course': [],
      Desserts: [],
      Drinks: [],
    };

    restaurantMenu.forEach((item) => {
      categories[item.category].push(item);
    });

    return categories;
  }, [restaurantMenu]);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 LOGOUT BUTTON ADDED */}
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
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-4 max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('restaurants')}
            className="mb-4 text-white hover:text-gray-200 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Restaurants
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{restaurant.name}</h1>
          <p className="text-lg text-gray-200">{restaurant.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Our Menu</h2>
          <button
            onClick={() => onNavigate('booking', restaurantId)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Book a Table
          </button>
        </div>

        {Object.entries(categorizedMenu).map(([category, items]) => {
          if (items.length === 0) return null;

          return (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-orange-500">
                {category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
}

function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-orange-600 font-bold text-lg">
            <IndianRupee className="w-4 h-4" />
            <span>{item.price}</span>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
}
