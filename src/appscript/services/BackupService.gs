function runBackup() {

  const source =
    SpreadsheetApp.openById(
      CONFIG.DATABASE_ID
    );

  const backup =
    SpreadsheetApp.openById(
      CONFIG.BACKUP_DATABASE_ID
    );

  const sheets = [
    "Settings",
    "Users",
    "Rooms",
    "Guests",
    "Bookings",
    "AuditLogs",
    "Calendar"
  ];

  sheets.forEach(name => {

    const sourceSheet =
      source.getSheetByName(name);

    if (!sourceSheet) {
      return;
    }

    let backupSheet =
      backup.getSheetByName(name);

    if (!backupSheet) {
      backupSheet =
        backup.insertSheet(name);
    }

    backupSheet.clear();

    const data =
      sourceSheet
        .getDataRange()
        .getValues();

    if (data.length > 0) {

      backupSheet
        .getRange(
          1,
          1,
          data.length,
          data[0].length
        )
        .setValues(data);

    }

  });

  Logger.log(
    "Backup completed"
  );
}