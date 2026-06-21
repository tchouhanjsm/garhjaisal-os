function saveBooking(booking) {

  const sheet =
    getDatabase()
      .getSheetByName("Bookings");

  sheet.appendRow([
  booking.bookingId,      // 1
  booking.guestId,        // 2

  booking.roomName,       // 3
  booking.guestName,      // 4
  booking.phone,          // 5

  booking.checkIn,        // 6
  booking.checkOut,       // 7
  booking.nights,         // 8

  booking.roomId,         // 9

  booking.rate,           // 10
  booking.advance,        // 11

  booking.company,        // 12
  booking.source,         // 13
  booking.notes,          // 14

  booking.status,         // 15

  "",                     // 16 CheckInDate
  "",                     // 17 CheckOutDate

  booking.createdBy,      // 18
  booking.createdAt       // 19
]);

  return booking;
}

function updateBookingStatus(
  bookingId,
  status
) {

  const sheet =
    getDatabase()
      .getSheetByName(
        "Bookings"
      );

  const rows =
    sheet
      .getDataRange()
      .getValues();

  for (
    let i = 1;
    i < rows.length;
    i++
  ) {

    if (
      rows[i][0] ===
      bookingId
    ) {

      sheet
        .getRange(
          i + 1,
          15
        )
        .setValue(
          status
        );

      return true;
    }
  }

  return false;
}


function updateBookingCheckInDate(
  bookingId,
  date
) {

  const sheet =
    getDatabase()
      .getSheetByName(
        "Bookings"
      );

  const rows =
    sheet
      .getDataRange()
      .getValues();

  for (
    let i = 1;
    i < rows.length;
    i++
  ) {

    if (
      rows[i][0] ===
      bookingId
    ) {

      sheet
        .getRange(
          i + 1,
          16
        )
        .setValue(
          date
        );

      return true;
    }
  }

  return false;
}
function updateBookingCheckOutDate(
  bookingId,
  date
) {

  const sheet =
    getDatabase()
      .getSheetByName(
        "Bookings"
      );

  const rows =
    sheet
      .getDataRange()
      .getValues();

  for (
    let i = 1;
    i < rows.length;
    i++
  ) {

    if (
      rows[i][0] ===
      bookingId
    ) {

      sheet
        .getRange(
          i + 1,
          17
        )
        .setValue(
          date
        );

      return true;
    }
  }

  return false;
}