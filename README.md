# Overview

A simple app for two people to grade basic games submitted by students. This system utilizes Google Sheets as a database and Google Apps Script as middleware between the sheet and the front-end, which is built using React.

## Requirements

To ensure the script functions properly, the Google Sheet must have two sheets:

- Sheet1

- Sheet2

## Technology Stack

- Google Apps Script (Middleware/Server)

- Google Sheets (Database)

- React (Frontend)

## Setup Instructions

Create a Google Sheet and name it appropriately.

![Sheet Header](https://github.com/KaarelVv/grading_system/blob/devKaarel/public/Header.png)

Ensure it contains Sheet1 and Sheet2.

Deploy the Google Apps Script to act as a backend middleware.

Connect the frontend to retrieve and update data from the Google Sheet.

## License

This project is open-source.

### Google script 
    
    function doGet(e) {
    const spreadsheet = SpreadsheetApp.openByUrl("SHEET_URL");
  
    const sheet1 = spreadsheet.getSheetByName("Sheet1"); // Grader 1
    const sheet2 = spreadsheet.getSheetByName("Sheet2"); // Grader 2

    if (!e || !e.parameter) {
    return ContentService.createTextOutput("Missing parameters").setMimeType(ContentService.MimeType.TEXT);
    }

    let grader = e.parameter.Grader; // Get Grader from URL (1 or 2)
    let sheet = grader === "1" ? sheet1 : sheet2; // Select the correct sheet

    // Fetching team data
    if (e.parameter.getTeams) {
    let data = sheet.getDataRange().getValues();
    data.shift(); // Remove first header row
    data.shift(); // Remove second header row

    let result = data.map(row => ({
      Team: row[0],
      UserExperienceDesign: { VisualAttractiveness: row[1] || 0, Interactivity: row[2] || 0, Animations: row[3] || 0 },
      EducationalAccuracy: { CybersecurityRelevance: row[4] || 0, FactAccuracy: row[5] || 0, LearningValue: row[6] || 0 },
      Functionality: { BugFreePerformance: row[7] || 0, Documentation: row[8] || 0, CodeStructure: row[9] || 0 },
      Total: row[10] || 0
    }));

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    }

    //  Updating a team's data
    if (e.parameter.update) {
    let team = e.parameter.Team;

    let ua1 = parseInt(e.parameter.VisualAttractiveness, 10) || 0;
    let ua2 = parseInt(e.parameter.Interactivity, 10) || 0;
    let ua3 = parseInt(e.parameter.Animations, 10) || 0;

    let ed1 = parseInt(e.parameter.CybersecurityRelevance, 10) || 0;
    let ed2 = parseInt(e.parameter.FactAccuracy, 10) || 0;
    let ed3 = parseInt(e.parameter.LearningValue, 10) || 0;

    let fn1 = parseInt(e.parameter.BugFreePerformance, 10) || 0;
    let fn2 = parseInt(e.parameter.Documentation, 10) || 0;
    let fn3 = parseInt(e.parameter.CodeStructure, 10) || 0;

    let totalScore = ua1 + ua2 + ua3 + ed1 + ed2 + ed3 + fn1 + fn2 + fn3;

    let range = sheet.getDataRange();
    let values = range.getValues();
    let teamFound = false;

    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === team) {
        sheet.getRange(i + 1, 2).setValue(ua1);
        sheet.getRange(i + 1, 3).setValue(ua2);
        sheet.getRange(i + 1, 4).setValue(ua3);
        sheet.getRange(i + 1, 5).setValue(ed1);
        sheet.getRange(i + 1, 6).setValue(ed2);
        sheet.getRange(i + 1, 7).setValue(ed3);
        sheet.getRange(i + 1, 8).setValue(fn1);
        sheet.getRange(i + 1, 9).setValue(fn2);
        sheet.getRange(i + 1, 10).setValue(fn3);
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
