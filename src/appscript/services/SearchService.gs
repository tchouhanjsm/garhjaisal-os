function findBookings(query) {
  if (!query) {
    return [];
  }

  return searchBookings(query);
}
