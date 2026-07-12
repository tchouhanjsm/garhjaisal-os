/**
 * ID Generator
 */

function generateId(prefix) {
  const timestamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyyMMddHHmmssSSS",
  );

  return prefix + timestamp;
}

function generateBookingId() {
  return generateSequentialId("BK", "Bookings", 0);
}

function generateInvoiceId() {
  return generateSequentialId("INV", "Invoices", 0);
}

function generateItemId() {
  return generateSequentialId("ITEM", "InvoiceItems", 0);
}

function generatePaymentId() {
  return generateSequentialId("PAY", "Payments", 0);
}

function generateGuestId() {
  return generateSequentialId("GST", "Guests", 0);
}

function generateSequentialId(prefix, sheetName, idColumn) {
  const sheet = getSheet(sheetName);

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return prefix + "00001";
  }

  const lastId = String(sheet.getRange(lastRow, idColumn + 1).getValue());

  if (!lastId.startsWith(prefix)) {
    return prefix + "00001";
  }

  const number = parseInt(lastId.replace(prefix, ""), 10);

  return prefix + Utilities.formatString("%05d", number + 1);
}
