function testDoubleBooking() {

  createBooking({
    guestName: "Guest One",
    phone: "1111111111",

    checkIn: "2026-07-10",
    checkOut: "2026-07-12",

    roomId: "R001",

    rate: 4000,

    createdBy: "OWNER"
  });

  createBooking({
    guestName: "Guest Two",
    phone: "2222222222",

    checkIn: "2026-07-11",
    checkOut: "2026-07-13",

    roomId: "R001",

    rate: 4000,

    createdBy: "OWNER"
  });
}