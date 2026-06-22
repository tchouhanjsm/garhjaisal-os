function getDatabase() {
  return SpreadsheetApp.openById(CONFIG.DATABASE_ID);
}
