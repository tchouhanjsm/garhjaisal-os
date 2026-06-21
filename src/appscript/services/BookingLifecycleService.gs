function checkInBooking(
  bookingId
) {

  updateBookingStatus(
    bookingId,
    "CHECKED_IN"
  );

  updateBookingCheckInDate(
    bookingId,
    today()
  );

  logAudit(
    "SYSTEM",
    "BOOKING",
    "CHECK_IN",
    bookingId,
    ""
  );

}

function checkOutBooking(
  bookingId
) {

  updateBookingStatus(
    bookingId,
    "CHECKED_OUT"
  );

  updateBookingCheckOutDate(
    bookingId,
    today()
  );

  logAudit(
    "SYSTEM",
    "BOOKING",
    "CHECK_OUT",
    bookingId,
    ""
  );

}