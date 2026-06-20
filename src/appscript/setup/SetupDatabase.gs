function initializeSystem() {
  const ss = getDatabase();

  setupSettingsSheet(ss);
  setupUsersSheet(ss);
  setupRoomsSheet(ss);
  setupGuestsSheet(ss);
  setupBookingsSheet(ss);
  setupAuditLogsSheet(ss);

  seedRooms(ss);

  Logger.log("GarhJaisal OS initialized successfully.");
}

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

  return sheet;
}

function setupSettingsSheet(ss) {
  const headers = [
    "Key",
    "Value"
  ];

  const sheet = createSheet(
    ss,
    "Settings",
    headers
  );

  const settings = [
    ["HOTEL_NAME", "Garh Jaisal Haveli"],
    ["GST_NUMBER", ""],
    ["PHONE", ""],
    ["EMAIL", ""],
    ["INVOICE_PREFIX", "INV"],
    ["NEXT_INVOICE_NUMBER", "1"]
  ];

  sheet
    .getRange(2, 1, settings.length, 2)
    .setValues(settings);
}

function setupUsersSheet(ss) {
  createSheet(
    ss,
    "Users",
    [
      "UserID",
      "Email",
      "Name",
      "Role",
      "Active",
      "CreatedAt"
    ]
  );
}

function setupRoomsSheet(ss) {
  createSheet(
    ss,
    "Rooms",
    [
      "RoomID",
      "RoomNo",
      "RoomName",
      "Category",
      "Floor",
      "Capacity",
      "Status",
      "Active"
    ]
  );
}

function setupGuestsSheet(ss) {
  createSheet(
    ss,
    "Guests",
    [
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
    ]
  );
}

function setupBookingsSheet(ss) {
  createSheet(
    ss,
    "Bookings",
    [
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
    ]
  );
}

function setupAuditLogsSheet(ss) {
  createSheet(
    ss,
    "AuditLogs",
    [
      "LogID",
      "Timestamp",
      "User",
      "Module",
      "Action",
      "RecordID",
      "Details"
    ]
  );
}

function seedRooms(ss) {
  const sheet =
    ss.getSheetByName("Rooms");

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
    .getRange(
      2,
      1,
      rooms.length,
      rooms[0].length
    )
    .setValues(rooms);
}