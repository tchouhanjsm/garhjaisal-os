function createInvoice(invoiceData) {
  const booking = getBookingById(invoiceData.bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  const invoice = {
    invoiceId: generateInvoiceId(),
    bookingId: booking.bookingId,
    invoiceType: invoiceData.invoiceType || "BOOKING",
    guestId: booking.guestId,
    guestName: booking.guestName,
    company: booking.company || "",
    gstin: getSetting("GSTIN"),
    invoiceDate: todayDate(),
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    nights: booking.nights,
    subtotal: 0,
    discount: 0,

    gstPercent: Number(getSetting("GST_PERCENT")),

    gstAmount: 0,
    totalAmount: 0,

    amountPaid: booking.advance || 0,
    balance: 0,

    pdfFileId: "",
    status: "DRAFT",
    createdAt: todayDate(),
  };

  saveInvoice(invoice);

  // Add room charge as first line item
  addInvoiceItem(invoice.invoiceId, {
    category: InvoiceCategory.ROOM,
    description: "Heritage Room",
    quantity: Number(booking.nights),
    unit: InvoiceUnit.NIGHT,
    rate: Number(booking.rate),
    discount: 0,
    taxable: true,
    notes: "",
  });

  calculateTotals(invoice.invoiceId);

  return getInvoiceById(invoice.invoiceId);
}

/**
 * Add an item to an invoice.
 */
function addInvoiceItem(invoiceId, item) {
  const invoice = getInvoiceById(invoiceId);

  if (!invoice) {
    throw new Error("Invoice not found.");
  }

  if (invoice.status === InvoiceStatus.FINALIZED) {
    throw new Error("Cannot modify a finalized invoice.");
  }

  item.invoiceId = invoiceId;

  const itemId = saveInvoiceItem(item);

  calculateTotals(invoiceId);

  return itemId;
}

/**
 * Get all items for an invoice.
 */
function getInvoiceItems(invoiceId) {
  return findInvoiceItemsByInvoiceId(invoiceId);
}

/**
 * Calculate invoice totals and update invoice.
 */
function calculateTotals(invoiceId) {
  const items = getInvoiceItems(invoiceId);

  let subtotal = 0;
  let discount = 0;
  let taxAmount = 0;

  items.forEach(function (item) {
    subtotal += Number(item.quantity) * Number(item.rate);
    discount += Number(item.discount || 0);

    if (item.taxable === true || item.taxable === "TRUE") {
      taxAmount += Number(item.taxAmount || 0);
    }
  });

  const grandTotal = subtotal - discount + taxAmount;

  const invoice = getInvoiceById(invoiceId);

  invoice.subtotal = subtotal;
  invoice.discount = discount;
  invoice.gstAmount = taxAmount;
  invoice.totalAmount = grandTotal;
  invoice.balance = grandTotal - invoice.amountPaid;

  updateInvoice(invoice);

  return {
    subtotal: subtotal,
    discount: discount,
    taxAmount: taxAmount,
    grandTotal: grandTotal,
  };
}

/**
 * Finalize invoice.
 */
function finalizeInvoice(invoiceId) {
  const invoice = getInvoiceById(invoiceId);

  if (!invoice) {
    throw new Error("Invoice not found.");
  }

  calculateTotals(invoiceId);

  invoice.status = InvoiceStatus.FINALIZED;

  updateInvoice(invoice);

  return invoice;
}
