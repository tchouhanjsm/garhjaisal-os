function shortenGuestName(
  fullName
) {

  const parts =
    fullName
      .trim()
      .split(" ");

  if (
    parts.length === 1
  ) {
    return parts[0];
  }

  return (
    parts[0] +
    " " +
    parts[1][0] +
    "."
  );
}