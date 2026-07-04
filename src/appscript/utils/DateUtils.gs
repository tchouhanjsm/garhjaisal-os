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
