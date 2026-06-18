import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();


// ===================================================================
// 🔍 CHECK TIME OVERLAP (start1 < end2 && start2 < end1)
// ===================================================================
function overlaps(start1, end1, start2, end2) {
  return start1 < end2 && start2 < end1;
}


// ===================================================================
// 🚀 CREATE NEW BOOKING
// ===================================================================
router.post("/create", async (req, res) => {
  try {
    const {
      restaurantId,
      tableId,
      tableNumber,
      date,
      time,
      endTime,
      customerName,
      customerEmail,
      customerPhone,
    } = req.body;

    // Validate required fields
    if (!restaurantId || !tableId || !date || !time || !endTime) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Check existing bookings for same table & date
    const existing = await Booking.find({ tableId, date });

    // Check time conflicts
    const conflict = existing.find((b) =>
      overlaps(time, endTime, b.time, b.endTime)
    );

    if (conflict) {
      return res.status(400).json({
        message: "This time slot is already booked for this table",
      });
    }

    // Save booking
    const newBooking = new Booking({
      restaurantId,
      tableId,
      tableNumber,
      date,
      time,
      endTime,
      customerName,
      customerEmail,
      customerPhone,
    });

    await newBooking.save();

    res.json({
      message: "Booking saved successfully",
      booking: newBooking,
    });

  } catch (error) {
    console.error("❌ Booking Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ===================================================================
// 📅 GET BOOKED TIME SLOTS (Used in Frontend for disabling time)
// ===================================================================
router.get("/availability", async (req, res) => {
  try {
    const { restaurantId, date } = req.query;

    if (!restaurantId || !date) {
      return res.status(400).json({
        message: "restaurantId and date are required",
      });
    }

    const bookings = await Booking.find({ restaurantId, date }).sort({
      time: 1,
    });

    res.json(bookings);

  } catch (error) {
    console.error("❌ Availability Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ===================================================================
// 📌 GET MY BOOKINGS (Using Email or Phone)
// ===================================================================
router.get("/mybookings", async (req, res) => {
  try {
    const { email, phone } = req.query;

    if (!email && !phone) {
      return res.status(400).json({
        message: "Email or Phone is required",
      });
    }

    const bookings = await Booking.find({
      $or: [
        { customerEmail: email },
        { customerPhone: phone }
      ]
    }).sort({ date: 1, time: 1 });

    res.json(bookings);

  } catch (error) {
    console.error("❌ MyBookings Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ===================================================================
// ❌ CANCEL BOOKING (delete by id)
// ===================================================================
router.delete("/cancel/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    console.error("❌ Cancel Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
