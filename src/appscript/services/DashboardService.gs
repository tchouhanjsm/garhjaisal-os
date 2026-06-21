function generateDashboard() {
    const db =
      getDatabase();

  let dashboard =
  db.getSheetByName(
    "Dashboard"
  );

if (!dashboard) {

  dashboard =
    db.insertSheet(
      "Dashboard"
    );

}

dashboard.clear();

  const today =
    todayDate();

  const bookings =
    getAllBookings();

  const rooms =
    getAllRooms();

  const arrivals =
    bookings.filter(
      b =>
        b.checkIn === today &&
        b.status !== "CANCELLED"
    );

  const departures =
    bookings.filter(
      b =>
        b.checkOut === today &&
        b.status !== "CANCELLED"
    );

  const inHouse =
    bookings.filter(
      b =>
        b.checkIn <= today &&
        b.checkOut > today &&
        b.status !== "CANCELLED"
    );

  const occupiedRoomIds =
    [
      ...new Set(
        inHouse.map(
          b => b.roomId
        )
      )
    ];

  const availableRooms =
    rooms.filter(
      room =>
        !occupiedRoomIds.includes(
          room.roomId
        )
    );

  let row = 1;

  dashboard
    .getRange(row++, 1)
    .setValue(
      "GARHJAISAL OS DASHBOARD"
    );

  row++;

  dashboard
    .getRange(row++, 1)
    .setValue(
      "Today's Arrivals"
    );

  arrivals.forEach(a => {

    dashboard
      .getRange(row++, 1)
      .setValue(
        `${a.guestName} - ${a.roomName}`
      );

  });

  row++;

  dashboard
    .getRange(row++, 1)
    .setValue(
      "Today's Departures"
    );

  departures.forEach(d => {

    dashboard
      .getRange(row++, 1)
      .setValue(
        `${d.guestName} - ${d.roomName}`
      );

  });

  row++;

  dashboard
    .getRange(row++, 1)
    .setValue(
      "In-House Guests"
    );

  inHouse.forEach(g => {

    dashboard
      .getRange(row++, 1)
      .setValue(
        `${g.guestName} - ${g.roomName}`
      );

  });

  row++;

  dashboard
    .getRange(row++, 1)
    .setValue(
      "Available Rooms"
    );

  availableRooms.forEach(r => {

    dashboard
      .getRange(row++, 1)
      .setValue(
        r.roomName
      );

  });

}