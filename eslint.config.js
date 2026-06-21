export default [
  {
    files: ["src/**/*.gs"],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        SpreadsheetApp: "readonly",
        Utilities: "readonly",
        Session: "readonly",
        Logger: "readonly",
        HtmlService: "readonly",
        PropertiesService: "readonly",
        UrlFetchApp: "readonly",
        DriveApp: "readonly",
        GmailApp: "readonly",
        ScriptApp: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-redeclare": "error",  
      "no-unreachable": "error",
      "eqeqeq": "error",
      "no-undef": "off"
    }
  }
];