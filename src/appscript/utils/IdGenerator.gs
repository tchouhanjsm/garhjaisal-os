function generateBookingId() {
  const bookingsSheet = getDatabase().getSheetByName("Bookings");

  const lastRow = bookingsSheet.getLastRow();

  const nextNumber = Math.max(lastRow, 1);

  return "BK" + String(nextNumber).padStart(5, "0");
}

function generateGuestId() {
  const sheet = getDatabase().getSheetByName("Guests");

  const nextNumber = Math.max(sheet.getLastRow(), 1);

  return "GST" + String(nextNumber).padStart(5, "0");
}
