function getOrCreateGuest(data) {

  const existingGuest =
    findGuestByPhoneOrEmail(
      data.phone,
      data.email
    );

  if (existingGuest) {
    return existingGuest.guestId;
  }

  const guestId =
    generateGuestId();

  createGuest({
    guestId,
    name:
      data.guestName,

    phone:
      data.phone || "",

    email:
      data.email || "",

    nationality:
      data.nationality || "",

    idType:
      "",

    idNumber:
      "",

    notes:
      ""
  });

  return guestId;
}