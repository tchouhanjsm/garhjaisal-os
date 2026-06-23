function saveInvoice(invoice) {
  const sheet = getDatabase().getSheetByName("Invoices");

  sheet.appendRow([
    invoice.invoiceId,

    invoice.invoiceType,

    invoice.bookingId,

    invoice.guestId,

    invoice.guestName,

    invoice.company,

    invoice.gstin,

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

function getInvoiceById(invoiceId) {
  const sheet = getDatabase().getSheetByName("Invoices");

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === invoiceId) {
      return rows[i];
    }
  }

  return null;
}
