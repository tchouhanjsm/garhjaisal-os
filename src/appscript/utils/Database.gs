/**
 * Database Utilities
 */

function getDatabase() {
  return SpreadsheetApp.openById(CONFIG.DATABASE_ID);
}

function getBackupDatabase() {
  return SpreadsheetApp.openById(CONFIG.BACKUP_DATABASE_ID);
}

function getSheet(sheetName) {
  const sheet = getDatabase().getSheetByName(sheetName);

  if (!sheet) {
    throw new Error("Sheet not found: " + sheetName);
  }

  return sheet;
}
