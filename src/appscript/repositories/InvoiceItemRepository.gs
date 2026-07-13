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
  const taxAmount = taxable ? taxableAmount * (gstPercent / 100) : 0;

  const amount = subtotal - discount + taxAmount;

  Logger.log({
    quantity,
    rate,
    subtotal,
    taxableAmount,
    gstPercent,
    taxAmount,
    amount,
  });

  const lineNo = sheet.getLastRow();

  sheet.appendRow([
    itemId,
    item.invoiceId,
    lineNo,
    item.category,
    item.referenceId || "",
    item.description,
    quantity,
    item.unit,
    rate,
    discount,
    taxable,
    gstPercent,
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
      referenceId: row[4],
      description: row[5],
      quantity: Number(row[6]),
      unit: row[7],
      rate: Number(row[8]),
      discount: Number(row[9]),
      taxable: row[10] === true || row[10] === "TRUE",
      gstPercent: Number(row[11]),
      taxAmount: Number(row[12]),
      amount: Number(row[13]),
      notes: row[14],
      createdAt: row[15],
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
