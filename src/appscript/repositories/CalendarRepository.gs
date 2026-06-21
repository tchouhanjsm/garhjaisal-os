function getAllRooms() {

  const sheet =
    getDatabase()
      .getSheetByName("Rooms");

  const rows =
    sheet.getDataRange()
      .getValues()
      .slice(1);

  return rows.map(row => ({
    roomId: row[0],
    roomNo: row[1],
    roomName: row[2]
  }));
}

function getAllBookings() {

  const sheet =
    getDatabase()
      .getSheetByName("Bookings");

  const rows =
    sheet.getDataRange()
      .getValues()
      .slice(1);

  return rows.map(row => ({
    bookingId: row[0],
    guestName: row[2],

    checkIn: row[4],
    checkOut: row[5],

    roomId: row[7],
    roomName: row[8],

    status: row[14]
  }));
}