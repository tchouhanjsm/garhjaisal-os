function testCreateInvoice() {
  const booking = getBookingById("BK00004");

  Logger.log("Booking:");
  Logger.log(booking);

  const invoice = createInvoice({
    bookingId: "BK00004",
  });

  Logger.log("Invoice:");
  Logger.log(invoice);
}
function testFinalizeInvoice() {
  const invoice = createInvoice({
    bookingId: "BK00004",
  });

  addInvoiceItem(invoice.invoiceId, {
    category: InvoiceCategory.FOOD,
    description: "Dinner",
    quantity: 2,
    unit: InvoiceUnit.MEAL,
    rate: 800,
    discount: 0,
    taxable: true,
    notes: "",
  });

  addInvoiceItem(invoice.invoiceId, {
    category: InvoiceCategory.DESERT_SAFARI,
    description: "Private Desert Safari",
    quantity: 2,
    unit: InvoiceUnit.PERSON,
    rate: 4500,
    discount: 0,
    taxable: true,
    notes: "",
  });

  const finalized = finalizeInvoice(invoice.invoiceId);

  Logger.log(finalized);
}
function runInvoiceTests() {
  testCreateInvoice();
  testFinalizeInvoice();
}

function testInvoiceHtml() {
  const html = generateInvoicePdf("INV-2009");

  Logger.log(html);
}

function testGenerateInvoicePdf() {
  const fileId = generateInvoicePdf("INV-2010");

  Logger.log(fileId);
}

function testInvoiceLifecycle() {
  const invoice = createInvoice({
    bookingId: "BK00004",
  });

  Logger.log(invoice);
}

function testMarkInvoicePaid() {
  const invoice = markInvoicePaid("INV-2007");

  Logger.log(invoice);
}
