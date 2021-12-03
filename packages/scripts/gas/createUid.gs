function createUid(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('manage VC');

  let array = e.values
  const uid = Utilities.getUuid();
  array.unshift(uid);
  sheet.appendRow(array);
}
