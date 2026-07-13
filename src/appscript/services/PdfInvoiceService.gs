/**
 * PDF Invoice Service
 */

function generateInvoicePdf(invoiceId) {
  const html = buildInvoiceHtml(invoiceId);

  const blob = Utilities.newBlob(html, "text/html", "invoice.html").getAs(
    MimeType.PDF,
  );

  return saveInvoicePdf(invoiceId, blob);
}

function buildInvoiceHtml(invoiceId) {
  const invoice = getInvoiceById(invoiceId);
  const booking = getBookingById(invoice.bookingId);
  invoice.companyAddress = "";
  if (booking) {
    invoice.phone = booking.phone || "";
  }

  if (!invoice) {
    throw new Error("Invoice not found.");
  }

  invoice.invoiceDate = formatInvoiceDate(invoice.invoiceDate);
  invoice.checkIn = formatInvoiceDate(invoice.checkIn);
  invoice.checkOut = formatInvoiceDate(invoice.checkOut);

  const items = getInvoiceItems(invoiceId);
  Logger.log("Items Count: " + items.length);
  Logger.log(JSON.stringify(items));

  const template = HtmlService.createTemplateFromFile(
    "templates/InvoiceTemplate",
  );
  invoice.subtotal = formatCurrency(invoice.subtotal);
  invoice.gstAmount = formatCurrency(invoice.gstAmount);
  invoice.totalAmount = formatCurrency(invoice.totalAmount);
  invoice.amountPaid = formatCurrency(invoice.amountPaid);
  invoice.balance = formatCurrency(invoice.balance);

  items.forEach(function (item) {
    item.rate = formatCurrency(item.rate);
    item.taxAmount = formatCurrency(item.taxAmount);
    item.amount = formatCurrency(item.amount);
  });
  const hotel = {
    name: getSetting("HOTEL_NAME"),
    address: getSetting("HOTEL_ADDRESS"),
    city: getSetting("HOTEL_CITY"),
    phone: getSetting("HOTEL_PHONE"),
    email: getSetting("HOTEL_EMAIL"),
    website: getSetting("HOTEL_WEBSITE"),

    bankName: getSetting("BANK_NAME"),
    accountName: getSetting("BANK_ACCOUNT_NAME"),
    accountNo: getSetting("BANK_ACCOUNT_NO"),
    ifsc: getSetting("BANK_IFSC"),
    upiId: getSetting("UPI_ID"),
  };

  template.hotel = hotel;
  template.invoice = invoice;
  template.items = items;

  return template.evaluate().getContent();
}

function saveInvoicePdf(invoiceId, pdfBlob) {
  const invoice = getInvoiceById(invoiceId);

  const folder = DriveApp.getFolderById(CONFIG.INVOICE_FOLDER_ID);

  const fileName = invoice.invoiceId + " - " + invoice.guestName + ".pdf";

  const file = folder.createFile(pdfBlob).setName(fileName);

  invoice.pdfFileId = file.getId();
  invoice.pdfUrl = file.getUrl();
  invoice.pdfGeneratedAt = todayDate();

  updateInvoice(invoice);

  return file.getId();
}

function openInvoicePdf(invoiceId) {
  const invoice = getInvoiceById(invoiceId);

  if (!invoice.pdfFileId) {
    throw new Error("PDF has not been generated.");
  }

  return DriveApp.getFileById(invoice.pdfFileId).getUrl();
}
