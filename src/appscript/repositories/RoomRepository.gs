function getBookingsByRoom(roomId) {

  const sheet =
    getDatabase()
      .getSheetByName("Bookings");

  const values =
    sheet.getDataRange().getValues();

  const rows =
    values.slice(1);

  return rows
    .filter(row =>
      row[6] === roomId &&
      row[12] !== "CANCELLED"
    )
    .map(row => ({
      bookingId: row[0],
      guestId: row[1],
      guestName: row[2],
      phone: row[3],
      checkIn: row[4],
      checkOut: row[5],
      roomId: row[6],
      status: row[12]
    }));
}

function getRoomById(roomId) {

  const sheet =
    getDatabase()
      .getSheetByName("Rooms");

  const rows =
    sheet.getDataRange()
      .getValues()
      .slice(1);

  for (const row of rows) {

    if (row[0] === roomId) {

      return {
        roomId: row[0],
        roomNo: row[1],
        roomName: row[2]
      };
    }
  }

  return null;
}