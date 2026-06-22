function createInvoice(bookingId) {
  const booking = getBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  const subtotal = booking.rate * booking.nights;

  const gstPercent = 5;

  const gstAmount = subtotal * (gstPercent / 100);

  const totalAmount = subtotal + gstAmount;

  const invoice = {
    invoiceId: generateInvoiceId(),

    bookingId: booking.bookingId,

    guestId: booking.guestId,

    guestName: booking.guestName,

    company: booking.company || "",

    invoiceDate: today(),

    checkIn: booking.checkIn,

    checkOut: booking.checkOut,

    roomName: booking.roomName,

    nights: booking.nights,

    rate: booking.rate,

    subtotal: subtotal,

    gstPercent: gstPercent,

    gstAmount: gstAmount,

    totalAmount: totalAmount,

    amountPaid: 0,

    balance: totalAmount,

    pdfFileId: "",

    status: "DRAFT",

    createdAt: today(),
  };

  saveInvoice(invoice);

  return invoice;
}
