function testCheckIn() {
  checkInBooking("BK00004");
}

function testCheckOut() {
  checkOutBooking("BK00004");
}
function debugBookingStatus() {
  const booking = getBookingById("BK00004");

  Logger.log(JSON.stringify(booking, null, 2));
}
