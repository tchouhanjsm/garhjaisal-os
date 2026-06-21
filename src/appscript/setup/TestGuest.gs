function testGuestCreation() {

  const booking =
    createBooking({

      guestName:
        "John Smith",

      phone:
        "9999999999",

      email:
        "john@example.com",

      checkIn:
        "2027-01-15",

      checkOut:
        "2027-01-17",

      roomId:
        "R003",

      rate:
        5000,

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