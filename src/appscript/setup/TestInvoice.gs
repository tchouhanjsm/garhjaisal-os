function testCreateInvoice() {
  const invoice = createInvoice("BK00004");

  Logger.log(JSON.stringify(invoice, null, 2));
}
