function addPayment(payment) {
  validatePayment(payment);
  const invoice = getInvoiceById(payment.invoiceId);

  if (!invoice) {
    throw new Error("Invoice not found.");
  }

  payment.bookingId = invoice.bookingId;
  payment.guestId = invoice.guestId;
  payment.paymentDate = payment.paymentDate || todayDate();

  const savedPayment = savePayment(payment);

  updateInvoicePaymentSummary(invoice.invoiceId);

  return savedPayment;
}

function calculateAmountPaid(invoiceId) {
  const payments = getPaymentsByInvoice(invoiceId);

  return payments.reduce(function (total, payment) {
    return total + payment.amount;
  }, 0);
}
function calculateBalance(invoiceId) {
  const invoice = getInvoiceById(invoiceId);

  if (!invoice) {
    throw new Error("Invoice not found.");
  }

  return invoice.totalAmount - calculateAmountPaid(invoiceId);
}
function refundPayment() {}

function updateInvoicePaymentSummary(invoiceId) {
  const invoice = getInvoiceById(invoiceId);

  const amountPaid = calculateAmountPaid(invoiceId);

  invoice.amountPaid = amountPaid;
  invoice.balance = invoice.totalAmount - amountPaid;

  if (invoice.balance <= 0) {
    invoice.amountPaid = invoice.totalAmount;
    invoice.balance = 0;
    invoice.status = InvoiceStatus.PAID;
    invoice.paymentDate = todayDate();
  } else {
    invoice.status = InvoiceStatus.FINALIZED;
  }

  updateInvoice(invoice);
}

function validatePayment(payment) {
  if (!payment.invoiceId) {
    throw new Error("Invoice ID is required.");
  }

  if (!payment.amount || payment.amount <= 0) {
    throw new Error("Payment amount must be greater than zero.");
  }

  if (!payment.paymentMethod) {
    throw new Error("Payment method is required.");
  }
}
