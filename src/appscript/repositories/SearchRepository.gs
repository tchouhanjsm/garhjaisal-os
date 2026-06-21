function searchBookings(query) {

  const sheet =
    getDatabase()
      .getSheetByName("Bookings");

  const values =
    sheet.getDataRange()
      .getValues();

  const rows =
    values.slice(1);

  const q =
    String(query)
      .toLowerCase()
      .trim();

  return rows
    .filter(row => {

      return row.some(cell =>
        String(cell)
          .toLowerCase()
          .includes(q)
      );

    })
    .map(row => ({
      bookingId: row[0],
      guestId: row[1],
      guestName: row[2],
      phone: row[3],
      checkIn: row[4],
      checkOut: row[5],
      nights: row[6],
      roomId: row[7],
      rate: row[8],
      company: row[10],
      status: row[13]
    }));
}