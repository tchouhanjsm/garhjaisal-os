function generateDashboard() {
  const db = getDatabase();

  let dashboard = db.getSheetByName("Dashboard");

  if (!dashboard) {
    dashboard = db.insertSheet("Dashboard");
  }

  dashboard.clear();

  const today = todayDate();

  const rooms = getAllRooms();

  const bookings = getAllBookings();

  const inHouse = bookings.filter((booking) => booking.status === "CHECKED_IN");

  const arrivals = bookings.filter(
    (booking) =>
      booking.checkIn &&
      Utilities.formatDate(
        new Date(booking.checkIn),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd",
      ) === today,
  );

  const departures = bookings.filter(
    (booking) =>
      booking.checkOut &&
      Utilities.formatDate(
        new Date(booking.checkOut),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd",
      ) === today,
  );

  const occupiedRoomIds = [
    ...new Set(inHouse.map((booking) => booking.roomId)),
  ];

  const availableRooms = rooms.filter(
    (room) => !occupiedRoomIds.includes(room.roomId),
  );

  const totalRooms = rooms.length;

  const occupiedRooms = occupiedRoomIds.length;

  const occupancy = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

  const todayObj = new Date();

  const nextThreeDays = bookings.filter((booking) => {
    const arrival = new Date(booking.checkIn);

    const diff = Math.floor((arrival - todayObj) / (1000 * 60 * 60 * 24));

    return diff >= 1 && diff <= 3;
  });

  let row = 1;

  dashboard.getRange(row++, 1).setValue("GARHJAISAL OS DASHBOARD");

  dashboard.getRange(row++, 1).setValue("Generated: " + new Date());

  row++;

  dashboard.getRange(row++, 1).setValue(`Rooms Total: ${totalRooms}`);

  dashboard.getRange(row++, 1).setValue(`Occupied Rooms: ${occupiedRooms}`);

  dashboard
    .getRange(row++, 1)
    .setValue(`Available Rooms: ${availableRooms.length}`);

  dashboard.getRange(row++, 1).setValue(`Occupancy: ${occupancy.toFixed(2)}%`);

  row += 2;

  dashboard.getRange(row++, 1).setValue("TODAY'S ARRIVALS");

  arrivals.forEach((booking) => {
    dashboard
      .getRange(row++, 1)
      .setValue(`${booking.guestName} - ${booking.roomName}`);
  });

  row += 2;

  dashboard.getRange(row++, 1).setValue("TODAY'S DEPARTURES");

  departures.forEach((booking) => {
    dashboard
      .getRange(row++, 1)
      .setValue(`${booking.guestName} - ${booking.roomName}`);
  });

  row += 2;

  dashboard.getRange(row++, 1).setValue("IN-HOUSE GUESTS");

  inHouse.forEach((booking) => {
    dashboard
      .getRange(row++, 1)
      .setValue(`${booking.guestName} - ${booking.roomName}`);
  });

  row += 2;

  dashboard.getRange(row++, 1).setValue("AVAILABLE ROOMS");

  availableRooms.forEach((room) => {
    dashboard.getRange(row++, 1).setValue(room.roomName);
  });

  row += 2;

  dashboard.getRange(row++, 1).setValue("UPCOMING ARRIVALS (NEXT 3 DAYS)");

  nextThreeDays.forEach((booking) => {
    dashboard
      .getRange(row++, 1)
      .setValue(`${booking.guestName} - ${booking.roomName}`);
  });

  dashboard.autoResizeColumn(1);
}
