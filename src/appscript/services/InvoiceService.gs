function createInvoice(bookingId) {
  const booking = getBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  const subtotal = booking.rate * booking.nights;

  const gstPercent = Number(getSetting("GST_PERCENT"));

  const gstAmount = subtotal * (gstPercent / 100);

  const totalAmount = subtotal + gstAmount;

  const advance = booking.advance || 0;

  const balance = totalAmount - advance;

  const invoice = {
    invoiceId: generateInvoiceId(),

    bookingId: booking.bookingId,

    invoiceType: "BOOKING",

    guestId: booking.guestId,

    guestName: booking.guestName,

    company: booking.company || "",

    gstin: getSetting("GSTIN"),

    invoiceDate: todayDate(),

    checkIn: booking.checkIn,

    checkOut: booking.checkOut,

    roomName: "Heritage Room Accommodation",

    nights: booking.nights,

    rate: booking.rate,

    subtotal: subtotal,

    gstPercent: gstPercent,

    gstAmount: gstAmount,

    totalAmount: totalAmount,

    amountPaid: advance,

    balance: balance,

    pdfFileId: "",

    status: "DRAFT",

    createdAt: todayDate(),
  };

  saveInvoice(invoice);

  return invoice;
}
