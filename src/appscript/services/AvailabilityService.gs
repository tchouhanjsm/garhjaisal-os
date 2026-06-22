/**
 * Returns true if room is available
 */
function isRoomAvailable(roomId, requestedCheckIn, requestedCheckOut) {
  const bookings = getBookingsByRoom(roomId);

  const newCheckIn = new Date(requestedCheckIn);

  const newCheckOut = new Date(requestedCheckOut);

  for (const booking of bookings) {
    const existingCheckIn = new Date(booking.checkIn);

    const existingCheckOut = new Date(booking.checkOut);

    const overlap =
      newCheckIn < existingCheckOut && newCheckOut > existingCheckIn;

    if (overlap) {
      return false;
    }
  }

  return true;
}
