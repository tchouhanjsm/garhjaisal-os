/**
 * PDF Invoice Service
 */

function generateInvoicePdf(invoiceId) {
  const html = buildInvoiceHtml(invoiceId);

  Logger.log(html);

  return html;
}

function buildInvoiceHtml(invoiceId) {
  const invoice = getInvoiceById(invoiceId);
  invoice.invoiceDate = formatInvoiceDate(invoice.invoiceDate);
  invoice.checkIn = formatInvoiceDate(invoice.checkIn);
  invoice.checkOut = formatInvoiceDate(invoice.checkOut);

  if (!invoice) {
    throw new Error("Invoice not found.");
  }

  const items = getInvoiceItems(invoiceId);

  const template = HtmlService.createTemplateFromFile(
    "templates/InvoiceTemplate",
  );

  template.invoice = invoice;
  template.items = items;

  return template.evaluate().getContent();
}

function saveInvoicePdf(invoiceId, pdfBlob) {
  throw new Error("Not implemented yet.");
}

function openInvoicePdf(invoiceId) {
  throw new Error("Not implemented yet.");
}
