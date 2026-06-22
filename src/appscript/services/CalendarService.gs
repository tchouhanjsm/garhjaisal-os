function generateMonthlyCalendar(year, month) {
  const db = getDatabase();

  const sheet = db.getSheetByName("Calendar");

  sheet.clear();

  const rooms = getAllRooms();

  const bookings = getAllBookings();

  const daysInMonth = new Date(year, month, 0).getDate();

  const headers = ["Room"];

  for (let day = 1; day <= daysInMonth; day++) {
    headers.push(String(day).padStart(2, "0"));
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  rooms.forEach((room, index) => {
    sheet.getRange(index + 2, 1).setValue(room.roomName);
  });

  bookings.forEach((booking) => {
    if (booking.status === "CANCELLED") {
      return;
    }

    const roomRow = rooms.findIndex((room) => room.roomId === booking.roomId);

    if (roomRow === -1) {
      return;
    }

    const start = new Date(booking.checkIn);

    const end = new Date(booking.checkOut);

    const guest = shortenGuestName(booking.guestName);

    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      if (d.getFullYear() !== year) {
        continue;
      }

      if (d.getMonth() + 1 !== month) {
        continue;
      }

      const column = d.getDate() + 1;

      const row = roomRow + 2;

      sheet.getRange(row, column).setValue(guest);
    }
  });

  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);

  Logger.log("Calendar generated");
}

function generateTodayView() {
  const today = new Date();

  generateMonthlyCalendar(today.getFullYear(), today.getMonth() + 1);
}
