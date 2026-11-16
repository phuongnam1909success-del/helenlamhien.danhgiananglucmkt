/**
 * READY TO WORK? — Google Apps Script Backend
 * Tự động tạo Google Sheet lưu kết quả bài đánh giá năng lực Digital Marketing
 */

const SHEET_NAME = 'READY_TO_WORK_Ket_Qua_Danh_Gia';
const TAB_RESPONSES = 'Responses';
const TAB_SUMMARY = 'Summary';

function getOrCreateSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  let ssId = props.getProperty('SPREADSHEET_ID');
  let ss = null;

  if (ssId) {
    try {
      ss = SpreadsheetApp.openById(ssId);
    } catch (err) {
      ss = null;
    }
  }

  if (!ss) {
    ss = SpreadsheetApp.create(SHEET_NAME);
    ssId = ss.getId();
    props.setProperty('SPREADSHEET_ID', ssId);
  }

  // Tab Responses
  let respSheet = ss.getSheetByName(TAB_RESPONSES);
  if (!respSheet) {
    respSheet = ss.getSheets()[0];
    respSheet.setName(TAB_RESPONSES);
    respSheet.appendRow([
      'Timestamp',
      'Customer Thinking (1-5)',
      'Execution (1-5)',
      'Data Literacy (1-5)',
      'AI Literacy (1-5)',
      'Learning Agility (1-5)',
      'Total Score (5-25)',
      'Level',
      'User Agent',
    ]);
    respSheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#0c4348').setFontColor('#ffffff');
    respSheet.setFrozenRows(1);
  }

  // Tab Summary
  let sumSheet = ss.getSheetByName(TAB_SUMMARY);
  if (!sumSheet) {
    sumSheet = ss.insertSheet(TAB_SUMMARY);
    sumSheet.appendRow(['Chỉ số tổng hợp', 'Giá trị']);
    sumSheet.appendRow(['Tổng lượt tham gia', '=COUNTA(Responses!A2:A)']);
    sumSheet.appendRow(['Điểm trung bình tổng (5-25)', '=IFERROR(AVERAGE(Responses!G2:G), 0)']);
    sumSheet.appendRow(['TB Hiểu khách hàng', '=IFERROR(AVERAGE(Responses!B2:B), 0)']);
    sumSheet.appendRow(['TB Thực thi Marketing', '=IFERROR(AVERAGE(Responses!C2:C), 0)']);
    sumSheet.appendRow(['TB Tư duy dữ liệu', '=IFERROR(AVERAGE(Responses!D2:D), 0)']);
    sumSheet.appendRow(['TB Năng lực AI', '=IFERROR(AVERAGE(Responses!E2:E), 0)']);
    sumSheet.appendRow(['TB Học hỏi & Thích nghi', '=IFERROR(AVERAGE(Responses!F2:F), 0)']);
    sumSheet.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#0c4348').setFontColor('#ffffff');
  }

  return ss;
}

function doGet() {
  const ss = getOrCreateSpreadsheet_();
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'ok',
      message: 'READY TO WORK GAS Backend is running',
      spreadsheetUrl: ss.getUrl(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    const ss = getOrCreateSpreadsheet_();
    const sheet = ss.getSheetByName(TAB_RESPONSES);

    sheet.appendRow([
      new Date(),
      Number(data.customer_thinking) || 1,
      Number(data.execution) || 1,
      Number(data.data_literacy) || 1,
      Number(data.ai_literacy) || 1,
      Number(data.learning_agility) || 1,
      Number(data.total_score) || 5,
      String(data.level_title || ''),
      String(data.user_agent || ''),
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        spreadsheetUrl: ss.getUrl(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: err.message,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
