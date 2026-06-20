function testCreateBooking() {

  const booking =
    createBooking({

      guestName:
        "John Smith",

      phone:
        "9999999999",

      checkIn:
        "2026-07-01",

      checkOut:
        "2026-07-03",

      roomId:
        "R001",

      rate:
        4500,

      advance:
        1000,

      company:
        "Direct",

      source:
        "DIRECT",

      notes:
        "Test Booking",

      createdBy:
        "OWNER"
    });

  Logger.log(
    JSON.stringify(
      booking,
      null,
      2
    )
  );
}