function saveInvoice(invoice) {
  const sheet = getDatabase().getSheetByName("Invoices");

  sheet.appendRow([
    invoice.invoiceId,
    invoice.bookingId,
    invoice.guestId,
    invoice.guestName,
    invoice.company,

    invoice.invoiceDate,

    invoice.checkIn,
    invoice.checkOut,

    invoice.roomName,

    invoice.nights,

    invoice.rate,

    invoice.subtotal,

    invoice.gstPercent,
    invoice.gstAmount,

    invoice.totalAmount,

    invoice.amountPaid,

    invoice.balance,

    invoice.pdfFileId,

    invoice.status,

    invoice.createdAt,
  ]);

  return invoice;
}
