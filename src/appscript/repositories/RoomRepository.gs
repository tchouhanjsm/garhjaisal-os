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