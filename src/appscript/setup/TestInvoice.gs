function testBookingLookup() {
  const booking = getBookingById("BK00004");

  Logger.log(JSON.stringify(booking, null, 2));
}
