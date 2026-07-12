function saveInvoiceItem(item) {
  const sheet = getDatabase().getSheetByName("InvoiceItems");

  const itemId = generateId("ITEM");

  const quantity = Number(item.quantity || 0);
  const rate = Number(item.rate || 0);
  const discount = Number(item.discount || 0);

  const taxable = item.taxable === true;

  const gstPercent = Number(getSetting("GST_PERCENT") || 0);

  const subtotal = quantity * rate;
  const taxableAmount = subtotal - discount;
  const taxAmount = taxable ? (taxableAmount * gstPercent) / 100 : 0;
  const amount = taxableAmount + taxAmount;

  const lineNo = sheet.getLastRow();

  sheet.appendRow([
    itemId,
    item.invoiceId,
    lineNo,
    item.category,
    item.description,
    quantity,
    item.unit,
    rate,
    discount,
    taxable,
    taxAmount,
    amount,
    item.notes || "",
    todayDate(),
  ]);

  return itemId;
}

function getInvoiceItems(invoiceId) {
  return findInvoiceItemsByInvoiceId(invoiceId);
}

function findInvoiceItemsByInvoiceId(invoiceId) {
  const sheet = getDatabase().getSheetByName("InvoiceItems");

  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return [];
  }

  const items = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];

    if (row[1] !== invoiceId) {
      continue;
    }

    items.push({
      itemId: row[0],
      invoiceId: row[1],
      lineNo: Number(row[2]),
      category: row[3],
      description: row[4],
      quantity: Number(row[5]),
      unit: row[6],
      rate: Number(row[7]),
      discount: Number(row[8]),
      taxable: row[9] === true || row[9] === "TRUE",
      taxAmount: Number(row[10]),
      amount: Number(row[11]),
      notes: row[12],
      createdAt: row[13],
    });
  }

  items.sort(function (a, b) {
    return a.lineNo - b.lineNo;
  });

  return items;
}

function deleteInvoiceItems(invoiceId) {
  const sheet = getDatabase().getSheetByName("InvoiceItems");

  const values = sheet.getDataRange().getValues();

  for (let i = values.length - 1; i >= 1; i--) {
    if (values[i][1] === invoiceId) {
      sheet.deleteRow(i + 1);
    }
  }

  return true;
}
