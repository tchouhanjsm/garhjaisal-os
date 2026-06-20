function createBooking(data) {

  if (!data.guestName) {
    throw new Error(
      "Guest name is required"
    );
  }

  const booking = {

    bookingId:
      generateBookingId(),

    guestId: "",

    guestName:
      data.guestName,

    phone:
      data.phone || "",

    checkIn:
      data.checkIn,

    checkOut:
      data.checkOut,

    roomId:
      data.roomId,

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
      new Date()
  };

  saveBooking(booking);

  logAudit(
    booking.createdBy,
    "BOOKING",
    "CREATE",
    booking.bookingId,
    booking.guestName
  );

  return booking;
}