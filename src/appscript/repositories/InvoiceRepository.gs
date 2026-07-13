/**
 * Invoice Repository
 */

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
    invoice.nights,
    invoice.subtotal,
    invoice.discount,
    invoice.gstPercent,
    invoice.gstAmount,
    invoice.totalAmount,
    invoice.amountPaid,
    invoice.balance,
    invoice.pdfFileId,
    invoice.pdfUrl || "",
    invoice.pdfGeneratedAt || "",
    invoice.status,
    invoice.createdAt,
    invoice.updatedAt || "",
    invoice.paymentDate || "",
  ]);

  return invoice;
}

function getInvoiceById(invoiceId) {
  const sheet = getDatabase().getSheetByName("Invoices");
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    const row = values[i];

    if (row[0] !== invoiceId) continue;

    return {
      invoiceId: row[0],
      invoiceType: row[1],
      bookingId: row[2],
      guestId: row[3],
      guestName: row[4],
      company: row[5],
      gstin: row[6],
      invoiceDate: row[7],
      checkIn: row[8],
      checkOut: row[9],
      nights: Number(row[10]),
      subtotal: Number(row[11]),
      discount: Number(row[12]),
      gstPercent: Number(row[13]),
      gstAmount: Number(row[14]),
      totalAmount: Number(row[15]),
      amountPaid: Number(row[16]),
      balance: Number(row[17]),
      pdfFileId: row[18],
      pdfUrl: row[19],
      pdfGeneratedAt: row[20],
      status: row[21],
      createdAt: row[22],
      updatedAt: row[23],
      paymentDate: row[24],
    };
  }

  return null;
}

function getAllInvoices() {
  const sheet = getDatabase().getSheetByName("Invoices");
  const values = sheet.getDataRange().getValues();
  const invoices = [];

  for (let i = 1; i < values.length; i++) {
    invoices.push(getInvoiceById(values[i][0]));
  }

  return invoices;
}

function updateInvoice(invoice) {
  const sheet = getDatabase().getSheetByName("Invoices");
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] !== invoice.invoiceId) continue;

    sheet
      .getRange(i + 1, 1, 1, 25)
      .setValues([
        [
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
          invoice.nights,
          invoice.subtotal,
          invoice.discount,
          invoice.gstPercent,
          invoice.gstAmount,
          invoice.totalAmount,
          invoice.amountPaid,
          invoice.balance,
          invoice.pdfFileId,
          invoice.pdfUrl,
          invoice.pdfGeneratedAt,
          invoice.status,
          invoice.createdAt,
          todayDate(),
          invoice.paymentDate || "",
        ],
      ]);

    return true;
  }

  throw new Error("Invoice not found: " + invoice.invoiceId);
}

function deleteInvoice(invoiceId) {
  const sheet = getDatabase().getSheetByName("Invoices");
  const values = sheet.getDataRange().getValues();

  for (let i = values.length - 1; i >= 1; i--) {
    if (values[i][0] === invoiceId) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }

  return false;
}
