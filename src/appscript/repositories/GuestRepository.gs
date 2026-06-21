function findGuestByPhoneOrEmail(phone, email) {

  const sheet =
    getDatabase()
      .getSheetByName("Guests");

  const values =
    sheet.getDataRange().getValues();

  const rows =
    values.slice(1);

  for (const row of rows) {

    const guestPhone =
      row[2];

    const guestEmail =
      row[3];

    if (
      (phone && guestPhone === phone) ||
      (email && guestEmail === email)
    ) {

      return {
        guestId: row[0],
        name: row[1],
        phone: row[2],
        email: row[3],
        totalStays: row[8],
        lastStay: row[9]
      };

    }
  }

  return null;
}

function createGuest(guest) {

  const sheet =
    getDatabase()
      .getSheetByName("Guests");

  sheet.appendRow([
    guest.guestId,
    guest.name,
    guest.phone,
    guest.email,
    guest.nationality,
    guest.idType,
    guest.idNumber,
    guest.notes,
    0,
    "",
    today()
  ]);

  return guest;
}

function updateGuestStayStats(
  guestId,
  checkoutDate
) {

  const sheet =
    getDatabase()
      .getSheetByName("Guests");

  const values =
    sheet.getDataRange().getValues();

  for (
    let i = 1;
    i < values.length;
    i++
  ) {

    if (
      values[i][0] === guestId
    ) {

      const totalStays =
        Number(values[i][8] || 0);

      sheet
        .getRange(i + 1, 9)
        .setValue(totalStays + 1);

      sheet
        .getRange(i + 1, 10)
        .setValue(checkoutDate);

      return;
    }
  }
}