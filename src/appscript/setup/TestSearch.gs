function testSearchByName() {
  const results = findBookings("john");

  Logger.log(JSON.stringify(results, null, 2));
}

function testSearchByPhone() {
  const results = findBookings("9999");

  Logger.log(JSON.stringify(results, null, 2));
}

function testSearchByBookingId() {
  const results = findBookings("BK");

  Logger.log(JSON.stringify(results, null, 2));
}
