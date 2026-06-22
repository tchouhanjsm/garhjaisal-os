function logAudit(user, module, action, recordId, details) {
  const sheet = getDatabase().getSheetByName("AuditLogs");

  const logId = Utilities.getUuid();

  sheet.appendRow([logId, new Date(), user, module, action, recordId, details]);
}
