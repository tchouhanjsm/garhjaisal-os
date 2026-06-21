function today() {

  return Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd"
  );
}

function calculateNights(
  checkIn,
  checkOut
) {

  const start =
    new Date(checkIn);

  const end =
    new Date(checkOut);

  const diff =
    end - start;

  return Math.round(
    diff /
    (1000 * 60 * 60 * 24)
  );
}
function todayDate() {

  return Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd"
  );

}