// Set SPREADSHEET_ID and WEBHOOK_TOKEN in Apps Script > Project Settings > Script properties.
function initialize() {
  const settings = PropertiesService.getScriptProperties();
  settings.setProperty('SPREADSHEET_ID', '1GKY1FT6fIfmZTLgS9f2er7nuuoxeCSm7zbVfIqafq7k');
  if (!settings.getProperty('WEBHOOK_TOKEN')) {
    settings.setProperty('WEBHOOK_TOKEN', Utilities.getUuid() + Utilities.getUuid());
  }
  SpreadsheetApp.openById(settings.getProperty('SPREADSHEET_ID')).setSpreadsheetTimeZone('Asia/Seoul');
  console.log('연결 설정 완료');
}

function doPost(event) {
  const reply = (success) => ContentService.createTextOutput(JSON.stringify({ success }))
    .setMimeType(ContentService.MimeType.JSON);
  let lock;
  try {
    const settings = PropertiesService.getScriptProperties();
    const expectedToken = settings.getProperty('WEBHOOK_TOKEN');
    const spreadsheetId = settings.getProperty('SPREADSHEET_ID');
    const data = JSON.parse(event.postData.contents);
    if (!expectedToken || !spreadsheetId || data.token !== expectedToken) return reply(false);
    const email = String(data.email || '').trim().toLowerCase();
    if (data.consent !== true || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(false);
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return reply(false);
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('이메일 알림 신청') || spreadsheet.insertSheet('이메일 알림 신청');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['신청일시', '이메일', '수신 동의', '동의 버전']);
      sheet.setFrozenRows(1);
    }
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existing = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      if (existing.some(row => String(row[0]).toLowerCase() === email)) return reply(true);
    }
    // Prefix apostrophe so spreadsheet software cannot interpret user input as a formula.
    sheet.appendRow([new Date(), "'" + email, '동의', 'launch-v1']);
    sheet.getRange(sheet.getLastRow(), 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    SpreadsheetApp.flush();
    return reply(true);
  } catch {
    return reply(false);
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
