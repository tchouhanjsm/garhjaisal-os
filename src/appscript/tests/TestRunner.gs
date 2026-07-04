function runAllTests() {
  Logger.log("===== Running Invoice Tests =====");

  testCreateInvoice();
  testAddInvoiceItem();
  testCalculateTotals();
  testFinalizeInvoice();

  Logger.log("===== All Tests Completed =====");
}
