function doGet(e) {
  const spreadsheet = SpreadsheetApp.openByUrl("YOUR SHEET URL");
  
  const sheet1 = spreadsheet.getSheetByName("Sheet1"); // Grader 1
  const sheet2 = spreadsheet.getSheetByName("Sheet2"); // Grader 2

  if (!e || !e.parameter) {
    return ContentService.createTextOutput("Missing parameters").setMimeType(ContentService.MimeType.TEXT);
  }

  let grader = e.parameter.Grader; // Get Grader from URL (1 or 2)
  let sheet = grader === "1" ? sheet1 : sheet2; // Select the correct sheet

  // ✅ Fetching team data
  if (e.parameter.getTeams) {
    let data = sheet.getDataRange().getValues();
    data.shift(); // Remove first header row
    data.shift(); // Remove second header row

  let result = data.map(row => ({
      Team: row[0],
      CategoryA: { SubCategory1: row[1] || 0, SubCategory2: row[2] || 0, SubCategory3: row[3] || 0 },
      CategoryB: { SubCategory1: row[4] || 0, SubCategory2: row[5] || 0, SubCategory3: row[6] || 0 },
      CategoryC: { SubCategory1: row[7] || 0, SubCategory2: row[8] || 0, SubCategory3: row[9] || 0 },
      Total: row[10] || 0
    }));

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }

  // ✅ Updating a team's data
  if (e.parameter.update) {
    let team = e.parameter.Team;

  let catA1 = parseInt(e.parameter.CategoryA1, 10) || 0;
    let catA2 = parseInt(e.parameter.CategoryA2, 10) || 0;
    let catA3 = parseInt(e.parameter.CategoryA3, 10) || 0;

  let catB1 = parseInt(e.parameter.CategoryB1, 10) || 0;
    let catB2 = parseInt(e.parameter.CategoryB2, 10) || 0;
    let catB3 = parseInt(e.parameter.CategoryB3, 10) || 0;

  let catC1 = parseInt(e.parameter.CategoryC1, 10) || 0;
    let catC2 = parseInt(e.parameter.CategoryC2, 10) || 0;
    let catC3 = parseInt(e.parameter.CategoryC3, 10) || 0;

  let totalScore = catA1 + catA2 + catA3 + catB1 + catB2 + catB3 + catC1 + catC2 + catC3;

  let range = sheet.getDataRange();
    let values = range.getValues();
    let teamFound = false;

  for (let i = 1; i < values.length; i++) {
      if (values[i][0] === team) {
        sheet.getRange(i + 1, 2).setValue(catA1);
        sheet.getRange(i + 1, 3).setValue(catA2);
        sheet.getRange(i + 1, 4).setValue(catA3);
        sheet.getRange(i + 1, 5).setValue(catB1);
        sheet.getRange(i + 1, 6).setValue(catB2);
        sheet.getRange(i + 1, 7).setValue(catB3);
        sheet.getRange(i + 1, 8).setValue(catC1);
        sheet.getRange(i + 1, 9).setValue(catC2);
        sheet.getRange(i + 1, 10).setValue(catC3);
        sheet.getRange(i + 1, 11).setValue(totalScore); // Update total

  teamFound = true;
        break;
      }
    }

  if (!teamFound) {
      return ContentService.createTextOutput("Team not found").setMimeType(ContentService.MimeType.TEXT);
    }

  return ContentService.createTextOutput(`Update successful for Grader ${grader}`).setMimeType(ContentService.MimeType.TEXT);
  }

  return ContentService.createTextOutput("Invalid request").setMimeType(ContentService.MimeType.TEXT);
}
