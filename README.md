# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### How to use react bootstrap
https://react-bootstrap.netlify.app/docs/getting-started/why-react-bootstrap

### GS backend
`
    
    function doGet(e) {
    
    const sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Yf36ymF2PFH5DRWZP4sxBQaQDjMKynmax-Edmo2ntpA/edit?gid=0#gid=0").getSheetByName("Sheet1");

    // If no parameters are provided, return all team data
    if (!e || !e.parameter || Object.keys(e.parameter).length === 0) {
      let data = sheet.getDataRange().getValues();
      data.shift(); // Remove headers

    let result = data.map(row => ({
      Team: row[0],
      CategoryA: {
        SubCategory1: row[1] || 0,
        SubCategory2: row[2] || 0,
        SubCategory3: row[3] || 0
      },
      CategoryB: {
        SubCategory1: row[4] || 0,
        SubCategory2: row[5] || 0,
        SubCategory3: row[6] || 0
      },
      CategoryC: {
        SubCategory1: row[7] || 0,
        SubCategory2: row[8] || 0,
        SubCategory3: row[9] || 0
      },
      Total: row[10] || 0
    }));

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }

  
    // If "update=true" is in the URL, process the update request
    if (e.parameter.update) {
    let team = e.parameter.Team;

    let catA1 = parseInt(e.parameter.CategoryA1, 10);
    let catA2 = parseInt(e.parameter.CategoryA2, 10);
    let catA3 = parseInt(e.parameter.CategoryA3, 10);

    let catB1 = parseInt(e.parameter.CategoryB1, 10);
    let catB2 = parseInt(e.parameter.CategoryB2, 10);
    let catB3 = parseInt(e.parameter.CategoryB3, 10);

    let catC1 = parseInt(e.parameter.CategoryC1, 10);
    let catC2 = parseInt(e.parameter.CategoryC2, 10);
    let catC3 = parseInt(e.parameter.CategoryC3, 10);

    let totalScore = catA1 + catA2 + catA3 + catB1 + catB2 + catB3 + catC1 + catC2 + catC3;

    let range = sheet.getDataRange();
    let values = range.getValues();

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

        sheet.getRange(i + 1, 11).setValue(totalScore); // Updating Total Points

        let updatedRow = sheet.getRange(i + 1, 1, 1, 11).getValues()[0];

        return ContentService.createTextOutput(JSON.stringify({
          Team: updatedRow[0],
          CategoryA: {
            SubCategory1: updatedRow[1],
            SubCategory2: updatedRow[2],
            SubCategory3: updatedRow[3]
          },
          CategoryB: {
            SubCategory1: updatedRow[4],
            SubCategory2: updatedRow[5],
            SubCategory3: updatedRow[6]
          },
          CategoryC: {
            SubCategory1: updatedRow[7],
            SubCategory2: updatedRow[8],
            SubCategory3: updatedRow[9]
          },
          Total: updatedRow[10]
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput("Team not found")
      .setMimeType(ContentService.MimeType.TEXT);
    }

    return ContentService.createTextOutput("Invalid request")
    .setMimeType(ContentService.MimeType.TEXT);
    }


`
