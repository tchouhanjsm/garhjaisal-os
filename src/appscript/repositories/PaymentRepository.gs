function savePayment(payment) {
  const sheet = getDatabase().getSheetByName("Payments");

  const paymentId = generateId("PAY");

  sheet.appendRow([
    paymentId,
    payment.invoiceId,
    payment.bookingId,
    payment.guestId,
    payment.paymentDate,
    payment.amount,
    payment.paymentMethod,
    payment.referenceNo || "",
    payment.notes || "",
    payment.createdBy || "SYSTEM",
    todayDate(),
  ]);

  payment.paymentId = paymentId;

  return payment;
}

function getPaymentById(paymentId) {
  const sheet = getDatabase().getSheetByName("Payments");

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    const row = values[i];

    if (row[0] !== paymentId) {
      continue;
    }

    return {
      paymentId: row[0],
      invoiceId: row[1],
      bookingId: row[2],
      guestId: row[3],
      paymentDate: row[4],
      amount: Number(row[5]),
      paymentMethod: row[6],
      referenceNo: row[7],
      notes: row[8],
      createdBy: row[9],
      createdAt: row[10],
    };
  }

  return null;
}

function getPaymentsByInvoice(invoiceId) {
  const sheet = getDatabase().getSheetByName("Payments");

  const values = sheet.getDataRange().getValues();

  const payments = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];

    if (row[1] !== invoiceId) {
      continue;
    }

    payments.push({
      paymentId: row[0],
      invoiceId: row[1],
      bookingId: row[2],
      guestId: row[3],
      paymentDate: row[4],
      amount: Number(row[5]),
      paymentMethod: row[6],
      referenceNo: row[7],
      notes: row[8],
      createdBy: row[9],
      createdAt: row[10],
    });
  }

  return payments;
}

function getPaymentsByBooking(bookingId) {}

function deletePayment(paymentId) {
  const sheet = getDatabase().getSheetByName("Payments");

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === paymentId) {
      sheet.deleteRow(i + 1);

      return true;
    }
  }

  return false;
}
