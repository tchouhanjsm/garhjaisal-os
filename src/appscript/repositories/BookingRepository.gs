function saveBooking(booking) {

  const sheet =
    getDatabase()
      .getSheetByName("Bookings");

  sheet.appendRow([
  booking.bookingId,
  booking.guestId,
  booking.guestName,
  booking.phone,

  booking.checkIn,
  booking.checkOut,
  booking.nights,

  booking.roomId,
  booking.roomName,

  booking.rate,
  booking.advance,

  booking.company,

  booking.source,

  booking.notes,

  booking.status,

  booking.createdBy,

  booking.createdAt
]);

  return booking;
}