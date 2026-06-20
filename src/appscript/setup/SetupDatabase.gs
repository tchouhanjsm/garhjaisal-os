/**
 * GarhJaisal OS
 * Initial Database Setup
 *
 * Run:
 * initializeSystem()
 */

function initializeSystem() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  createUsersSheet(ss);
  createRoomsSheet(ss);
  createGuestsSheet(ss);
  createBookingsSheet(ss);
  createAuditLogsSheet(ss);

  seedRooms(ss);

  Logger.log("GarhJaisal OS initialized successfully.");
}

/**
 * USERS
 */
function createUsersSheet(ss) {
  const headers = [
    "UserID",
    "Email",
    "Name",
    "Role",
    "Active",
    "CreatedAt"
  ];

  createSheet(ss, "Users", headers);
}

/**
 * ROOMS
 */
function createRoomsSheet(ss) {
  const headers = [
    "RoomID",
    "RoomNo",
    "RoomName",
    "Category",
    "Floor",
    "Capacity",
    "Status",
    "Active"
  ];

  createSheet(ss, "Rooms", headers);
}

/**
 * GUESTS
 */
function createGuestsSheet(ss) {
  const headers = [
    "GuestID",
    "Name",
    "Phone",
    "Email",
    "Nationality",
    "IDType",
    "IDNumber",
    "Notes",
    "TotalStays",
    "CreatedAt"
  ];

  createSheet(ss, "Guests", headers);
}

/**
 * BOOKINGS
 */
function createBookingsSheet(ss) {
  const headers = [
    "BookingID",
    "GuestID",
    "GuestName",
    "Phone",
    "CheckIn",
    "CheckOut",
    "RoomID",
    "Rate",
    "Advance",
    "Company",
    "Source",
    "Notes",
    "Status",
    "CreatedBy",
    "CreatedAt"
  ];

  createSheet(ss, "Bookings", headers);
}

/**
 * AUDIT LOGS
 */
function createAuditLogsSheet(ss) {
  const headers = [
    "LogID",
    "Timestamp",
    "User",
    "Module",
    "Action",
    "RecordID",
    "Details"
  ];

  createSheet(ss, "AuditLogs", headers);
}

/**
 * GENERIC SHEET CREATOR
 */
function createSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  sheet.clear();

  sheet
    .getRange(1, 1, 1, headers.length)
    .setValues([headers]);

  sheet.setFrozenRows(1);

  sheet.autoResizeColumns(1, headers.length);
}

/**
 * SEED HOTEL ROOMS
 */
function seedRooms(ss) {
  const sheet = ss.getSheetByName("Rooms");

  const rooms = [
    ["R001", 1, "Sunrise", "Heritage", "Ground", 2, "Available", true],
    ["R002", 2, "Purple", "Heritage", "Ground", 2, "Available", true],
    ["R003", 3, "Scarlet", "Heritage", "Ground", 2, "Available", true],
    ["R004", 4, "Blue", "Heritage", "First", 2, "Available", true],
    ["R005", 5, "Green", "Heritage", "First", 2, "Available", true],
    ["R006", 6, "Opium", "Heritage", "First", 2, "Available", true],
    ["R007", 7, "Red", "Heritage", "First", 2, "Available", true]
  ];

  sheet
    .getRange(2, 1, rooms.length, rooms[0].length)
    .setValues(rooms);

  sheet.autoResizeColumns(1, 8);
}