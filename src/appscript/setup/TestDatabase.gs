function testDatabaseConnection() {
  const db = getDatabase();

  Logger.log("Connected to: " + db.getName());
}
