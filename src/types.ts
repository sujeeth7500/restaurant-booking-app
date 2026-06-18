export interface Restaurant {
  id: string;
  name: string;
  location: string;
  cuisine: string;
  imageUrl: string;
  description: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  category: 'Starters' | 'Main Course' | 'Desserts' | 'Drinks';
  price: number;
  imageUrl: string;
  description: string;
}

export interface Table {
  id: string;
  restaurantId: string;
  tableNumber: number;
  capacity: number;
  status: 'available' | 'booked';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  isReturning: boolean;
  totalBookings: number;
}

export interface Booking {
  id: string;
  restaurantId: string;
  tableId: string;
  customerId: string;
  bookingDate: string;
  bookingTime: string;
  numberOfGuests: number;
  status: 'confirmed' | 'cancelled' | 'completed';
}
