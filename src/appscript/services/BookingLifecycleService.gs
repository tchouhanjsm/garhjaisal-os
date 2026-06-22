function checkInBooking(bookingId) {
  const booking = getBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status === "CHECKED_IN") {
    throw new Error("Guest already checked in");
  }

  updateBookingStatus(bookingId, "CHECKED_IN");

  updateBookingCheckInDate(bookingId, today());

  logAudit("SYSTEM", "BOOKING", "CHECK_IN", bookingId, booking.guestName);

  return true;
}

function checkOutBooking(bookingId) {
  const booking = getBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status !== "CHECKED_IN") {
    throw new Error("Guest must be checked in first");
  }

  updateBookingStatus(bookingId, "CHECKED_OUT");

  updateBookingCheckOutDate(bookingId, today());

  logAudit("SYSTEM", "BOOKING", "CHECK_OUT", bookingId, booking.guestName);

  return true;
}
