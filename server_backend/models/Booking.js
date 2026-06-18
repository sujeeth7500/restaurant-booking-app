import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  restaurantId: String,
  tableId: String,
  tableNumber: Number,
  date: String,
  time: String,
  endTime: String,
  customerName: String,
  customerEmail: String,
  customerPhone: String
});

export default mongoose.model("Booking", bookingSchema);
