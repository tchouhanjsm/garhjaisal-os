function testFoundation() {
  Logger.log(getDatabase().getName());

  Logger.log(generateInvoiceId());

  Logger.log(generateItemId());

  Logger.log(generatePaymentId());
}
