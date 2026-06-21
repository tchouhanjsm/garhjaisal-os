function createBooking(data) {

  if (!data.guestName) {
    throw new Error(
      "Guest name is required"
    );
  }
  const room =
    getRoomById(data.roomId);

  if (!room) {
    throw new Error(
      "Invalid room"
    );
  }
  const booking = {

    bookingId:
      generateBookingId(),

    guestId: 
      getOrCreateGuest(data),

    guestName:
      data.guestName,

    phone:
      data.phone || "",

    checkIn:
      data.checkIn,

    checkOut:
      data.checkOut,

    nights:
      calculateNights(
        data.checkIn,
        data.checkOut
      ),

    roomId:
      data.roomId,

    roomName:
      room.roomName,

    rate:
      data.rate || 0,

    advance:
      data.advance || 0,

    company:
      data.company || "",

    source:
      data.source || "DIRECT",

    notes:
      data.notes || "",

    status:
      "CONFIRMED",

    createdBy:
      data.createdBy || "SYSTEM",

    createdAt:
      today()
  };

  const available =
  isRoomAvailable(
    booking.roomId,
    booking.checkIn,
    booking.checkOut
  );

if (!available) {
  throw new Error(
    `Room ${booking.roomId} is not available`
  );
}

  saveBooking(booking);
  updateGuestStayStats(
    booking.guestId,
    booking.checkOut
  );

  logAudit(
    booking.createdBy,
    "BOOKING",
    "CREATE",
    booking.bookingId,
    booking.guestName
  );

  return booking;
}