function formatDateOnly(dateValue) {
  if (!dateValue) {
    return "";
  }

  return Utilities.formatDate(
    new Date(dateValue),
    Session.getScriptTimeZone(),
    "dd-MMM-yyyy",
  );
}
function formatInvoiceDate(date) {
  if (!date) {
    return "";
  }

  return Utilities.formatDate(
    new Date(date),
    Session.getScriptTimeZone(),
    "dd MMM yyyy",
  );
}
