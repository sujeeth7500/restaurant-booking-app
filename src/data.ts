import { Restaurant, MenuItem, Table } from './types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Sree Annapoorna',
    location: 'Perundurai Road, Erode',
    cuisine: 'South Indian',
    imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Authentic South Indian cuisine with traditional flavors'
  },
  {
    id: '2',
    name: 'Hotel Kannappa',
    location: 'Brough Road, Erode',
    cuisine: 'Non-Vegetarian',
    imageUrl: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Famous for authentic Chettinad style non-veg dishes'
  },
  {
    id: '3',
    name: 'Adyar Ananda Bhavan',
    location: 'Sathy Road, Erode',
    cuisine: 'Vegetarian',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Premium vegetarian dining with North & South Indian specialties'
  },
  {
    id: '4',
    name: 'Meridian Restaurant',
    location: 'Perundurai Road, Erode',
    cuisine: 'Multi-Cuisine',
    imageUrl: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Fine dining with Indian, Chinese and Continental dishes'
  },
  {
    id: '5',
    name: 'Nellai Tirunelveli Restaurant',
    location: 'EVN Road, Erode',
    cuisine: 'South Indian',
    imageUrl: 'https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Traditional Tamil Nadu style meals and tiffins'
  },
  {
    id: '6',
    name: 'Ponram Hotel',
    location: 'Railway Station Road, Erode',
    cuisine: 'Non-Vegetarian',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Popular spot for biriyani and tandoori items'
  }
];

export const menuItems: MenuItem[] = [
  // Sree Annapoorna Menu
  {
    id: 'm1',
    restaurantId: '1',
    name: 'Masala Dosa',
    category: 'Main Course',
    price: 80,
    imageUrl: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Crispy dosa with potato filling'
  },
  {
    id: 'm2',
    restaurantId: '1',
    name: 'Idli Sambar',
    category: 'Starters',
    price: 50,
    imageUrl: 'https://images.pexels.com/photos/14477896/pexels-photo-14477896.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Soft steamed idlis with sambar and chutney'
  },
  {
    id: 'm3',
    restaurantId: '1',
    name: 'Filter Coffee',
    category: 'Drinks',
    price: 30,
    imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Traditional South Indian filter coffee'
  },
  {
    id: 'm4',
    restaurantId: '1',
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 40,
    imageUrl: 'https://images.pexels.com/photos/14825946/pexels-photo-14825946.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sweet milk solid dumplings in sugar syrup'
  },

  // Hotel Kannappa Menu
  {
    id: 'm5',
    restaurantId: '2',
    name: 'Chicken 65',
    category: 'Starters',
    price: 180,
    imageUrl: 'https://images.pexels.com/photos/12737657/pexels-photo-12737657.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Spicy fried chicken appetizer'
  },
  {
    id: 'm6',
    restaurantId: '2',
    name: 'Mutton Biryani',
    category: 'Main Course',
    price: 280,
    imageUrl: 'https://images.pexels.com/photos/14057545/pexels-photo-14057545.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Aromatic biryani with tender mutton'
  },
  {
    id: 'm7',
    restaurantId: '2',
    name: 'Fresh Lime Soda',
    category: 'Drinks',
    price: 40,
    imageUrl: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Refreshing lime soda'
  },
  {
    id: 'm8',
    restaurantId: '2',
    name: 'Ice Cream',
    category: 'Desserts',
    price: 60,
    imageUrl: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Assorted ice cream flavors'
  },

  // Adyar Ananda Bhavan Menu
  {
    id: 'm9',
    restaurantId: '3',
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 160,
    imageUrl: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Grilled cottage cheese with spices'
  },
  {
    id: 'm10',
    restaurantId: '3',
    name: 'Veg Thali',
    category: 'Main Course',
    price: 200,
    imageUrl: 'https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Complete vegetarian meal with variety'
  },
  {
    id: 'm11',
    restaurantId: '3',
    name: 'Mango Lassi',
    category: 'Drinks',
    price: 70,
    imageUrl: 'https://images.pexels.com/photos/1488477/pexels-photo-1488477.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Creamy mango yogurt drink'
  },
  {
    id: 'm12',
    restaurantId: '3',
    name: 'Ras Malai',
    category: 'Desserts',
    price: 80,
    imageUrl: 'https://images.pexels.com/photos/11479636/pexels-photo-11479636.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Soft cheese patties in sweet milk'
  },

  // Meridian Restaurant Menu
  {
    id: 'm13',
    restaurantId: '4',
    name: 'Spring Rolls',
    category: 'Starters',
    price: 120,
    imageUrl: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Crispy vegetable spring rolls'
  },
  {
    id: 'm14',
    restaurantId: '4',
    name: 'Grilled Chicken Steak',
    category: 'Main Course',
    price: 320,
    imageUrl: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Juicy grilled chicken with sides'
  },
  {
    id: 'm15',
    restaurantId: '4',
    name: 'Mojito',
    category: 'Drinks',
    price: 90,
    imageUrl: 'https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Refreshing mint mocktail'
  },
  {
    id: 'm16',
    restaurantId: '4',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    price: 120,
    imageUrl: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Warm chocolate cake with molten center'
  }
];

export const tables: Table[] = [
  // Restaurant 1 Tables
  { id: 't1', restaurantId: '1', tableNumber: 1, capacity: 2, status: 'available' },
  { id: 't2', restaurantId: '1', tableNumber: 2, capacity: 4, status: 'available' },
  { id: 't3', restaurantId: '1', tableNumber: 3, capacity: 4, status: 'booked' },
  { id: 't4', restaurantId: '1', tableNumber: 4, capacity: 6, status: 'available' },
  { id: 't5', restaurantId: '1', tableNumber: 5, capacity: 2, status: 'available' },
  { id: 't6', restaurantId: '1', tableNumber: 6, capacity: 4, status: 'booked' },
  { id: 't7', restaurantId: '1', tableNumber: 7, capacity: 8, status: 'available' },
  { id: 't8', restaurantId: '1', tableNumber: 8, capacity: 2, status: 'available' },

  // Restaurant 2 Tables
  { id: 't9', restaurantId: '2', tableNumber: 1, capacity: 2, status: 'available' },
  { id: 't10', restaurantId: '2', tableNumber: 2, capacity: 4, status: 'available' },
  { id: 't11', restaurantId: '2', tableNumber: 3, capacity: 4, status: 'available' },
  { id: 't12', restaurantId: '2', tableNumber: 4, capacity: 6, status: 'booked' },
  { id: 't13', restaurantId: '2', tableNumber: 5, capacity: 2, status: 'available' },
  { id: 't14', restaurantId: '2', tableNumber: 6, capacity: 4, status: 'available' },

  // Restaurant 3 Tables
  { id: 't15', restaurantId: '3', tableNumber: 1, capacity: 2, status: 'available' },
  { id: 't16', restaurantId: '3', tableNumber: 2, capacity: 4, status: 'booked' },
  { id: 't17', restaurantId: '3', tableNumber: 3, capacity: 4, status: 'available' },
  { id: 't18', restaurantId: '3', tableNumber: 4, capacity: 6, status: 'available' },
  { id: 't19', restaurantId: '3', tableNumber: 5, capacity: 2, status: 'available' },
  { id: 't20', restaurantId: '3', tableNumber: 6, capacity: 8, status: 'available' },

  // Restaurant 4 Tables
  { id: 't21', restaurantId: '4', tableNumber: 1, capacity: 2, status: 'available' },
  { id: 't22', restaurantId: '4', tableNumber: 2, capacity: 4, status: 'available' },
  { id: 't23', restaurantId: '4', tableNumber: 3, capacity: 4, status: 'available' },
  { id: 't24', restaurantId: '4', tableNumber: 4, capacity: 6, status: 'booked' },
  { id: 't25', restaurantId: '4', tableNumber: 5, capacity: 2, status: 'available' },

  // Restaurant 5 Tables
  { id: 't26', restaurantId: '5', tableNumber: 1, capacity: 2, status: 'available' },
  { id: 't27', restaurantId: '5', tableNumber: 2, capacity: 4, status: 'available' },
  { id: 't28', restaurantId: '5', tableNumber: 3, capacity: 4, status: 'booked' },
  { id: 't29', restaurantId: '5', tableNumber: 4, capacity: 6, status: 'available' },

  // Restaurant 6 Tables
  { id: 't30', restaurantId: '6', tableNumber: 1, capacity: 2, status: 'available' },
  { id: 't31', restaurantId: '6', tableNumber: 2, capacity: 4, status: 'available' },
  { id: 't32', restaurantId: '6', tableNumber: 3, capacity: 4, status: 'available' },
  { id: 't33', restaurantId: '6', tableNumber: 4, capacity: 6, status: 'available' },
  { id: 't34', restaurantId: '6', tableNumber: 5, capacity: 8, status: 'booked' }
];
