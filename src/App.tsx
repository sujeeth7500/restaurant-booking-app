import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import RestaurantsPage from "./components/RestaurantsPage";
import MenuPage from "./components/MenuPage";
import BookingPage, { BookingData } from "./components/BookingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import MyBookingsPage from "./components/MyBookingsPage";
import PaymentPage from "./components/PaymentPage";
import { supabase } from "./lib/supabase";

type Page =
  | "home"
  | "restaurants"
  | "menu"
  | "booking"
  | "confirmation"
  | "register"
  | "login"
  | "mybookings"
  | "payment";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setCurrentPage("home");
      } else {
        setCurrentPage("register");
      }
      setSessionChecked(true);
    });
  }, []);

  const handleNavigate = (page: string, restaurantId?: string, bookingData?: any) => {
    setCurrentPage(page as Page);
    if (restaurantId) setSelectedRestaurantId(restaurantId);
    if (bookingData) setBookingData(bookingData);
    window.scrollTo(0, 0);
  };

  const handleBookingComplete = (data: BookingData) => {
    setBookingData(data);
    setCurrentPage("confirmation");
  };

  if (!sessionChecked) return null;

  return (
    <>
      {currentPage === "register" && (
        <RegisterPage onNavigate={handleNavigate} />
      )}

      {currentPage === "login" && (
        <LoginPage onLoginSuccess={() => setCurrentPage("home")} />
      )}

      {currentPage === "home" && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {currentPage === "mybookings" && (
        <MyBookingsPage onNavigate={handleNavigate} />
      )}

      {currentPage === "restaurants" && (
        <RestaurantsPage onNavigate={handleNavigate} />
      )}

      {currentPage === "menu" && (
        <MenuPage
          restaurantId={selectedRestaurantId}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === "booking" && (
        <BookingPage
          restaurantId={selectedRestaurantId}
          onNavigate={handleNavigate}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {currentPage === "payment" && bookingData && (
        <PaymentPage
          bookingData={bookingData}
          onPaymentSuccess={() => setCurrentPage("confirmation")}
          onNavigate={handleNavigate}
        />
      )}

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
