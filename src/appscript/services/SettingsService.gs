function getSetting(key) {

  const sheet =
    getDatabase()
      .getSheetByName("Settings");

  const rows =
    sheet.getDataRange()
      .getValues();

  for (let i = 1; i < rows.length; i++) {

    if (rows[i][0] === key) {
      return rows[i][1];
    }

  }

  return null;
}

function isProduction() {

  return (
    getSetting(
      "SYSTEM_MODE"
    ) === "PRODUCTION"
  );
}