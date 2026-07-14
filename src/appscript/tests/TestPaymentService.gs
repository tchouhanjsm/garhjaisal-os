function testAddPayment() {
  const payment = addPayment({
    invoiceId: "INV-2007",

    amount: 5000,

    paymentMethod: PaymentMethod.UPI,

    referenceNo: "UPI123456",
  });

  Logger.log(payment);
}
function testPartialPayment() {
  Logger.log(getInvoiceById("INV-2007"));
}

function runPaymentTests() {
  testAddPayment();

  testInvoiceBalance();
}

function testInvoiceBalance() {
  const invoice = getInvoiceById("INV-2007");

  Logger.log(invoice);

  Logger.log(calculateAmountPaid(invoice.invoiceId));

  Logger.log(calculateBalance(invoice.invoiceId));
}

function testMultiplePayments() {
  addPayment({
    invoiceId: "INV-2007",
    amount: 10000,
    paymentMethod: PaymentMethod.CASH,
  });

  addPayment({
    invoiceId: "INV-2007",
    amount: 6630,
    paymentMethod: PaymentMethod.CARD,
  });

  Logger.log(getInvoiceById("INV-2007"));
}
