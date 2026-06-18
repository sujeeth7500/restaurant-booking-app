import { useState } from "react";
import HomePage from "./components/HomePage";
import RestaurantsPage from "./components/RestaurantsPage";
import MenuPage from "./components/MenuPage";
import BookingPage, { BookingData } from "./components/BookingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import MyBookingsPage from "./components/MyBookingsPage";
import PaymentPage from "./components/PaymentPage";   // ✅ NEW IMPORT


type Page =
  | "home"
  | "restaurants"
  | "menu"
  | "booking"
  | "confirmation"
  | "register"
  | "login"
  | "mybookings"
  | "payment";   // ✅ ADDED PAYMENT PAGE

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("register");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  // ⭐ Updated handleNavigate: now supports bookingData
  const handleNavigate = (
    page: string,
    restaurantId?: string,
    bookingData?: any
  ) => {
    setCurrentPage(page as Page);

    if (restaurantId) setSelectedRestaurantId(restaurantId);
    if (bookingData) setBookingData(bookingData);

    window.scrollTo(0, 0);
  };

  // ⭐ Booking complete → used only if skipping payment
  const handleBookingComplete = (data: BookingData) => {
    setBookingData(data);
    setCurrentPage("confirmation");
  };

  return (
    <>
      {/* REGISTER */}
      {currentPage === "register" && (
        <RegisterPage onNavigate={handleNavigate} />
      )}

      {/* LOGIN */}
      {currentPage === "login" && (
        <LoginPage onLoginSuccess={() => setCurrentPage("home")} />
      )}

      {/* HOME */}
      {currentPage === "home" && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {/* MY BOOKINGS */}
      {currentPage === "mybookings" && (
        <MyBookingsPage onNavigate={handleNavigate} />
      )}

      {/* RESTAURANTS */}
      {currentPage === "restaurants" && (
        <RestaurantsPage onNavigate={handleNavigate} />
      )}

      {/* MENU */}
      {currentPage === "menu" && (
        <MenuPage
          restaurantId={selectedRestaurantId}
          onNavigate={handleNavigate}
        />
      )}

      {/* BOOKING */}
      {currentPage === "booking" && (
        <BookingPage
          restaurantId={selectedRestaurantId}
          onNavigate={handleNavigate}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* PAYMENT PAGE */}
      {currentPage === "payment" && bookingData && (
        <PaymentPage
          bookingData={bookingData}
          onPaymentSuccess={() => setCurrentPage("confirmation")}
          onNavigate={handleNavigate}
        />
      )}

      {/* CONFIRMATION */}
      {currentPage === "confirmation" && bookingData && (
        <ConfirmationPage
          bookingData={bookingData}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}

export default App;
