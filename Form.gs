//This function takes the submitted form data and places into Campaign Details page
function onFormSubmit(e) {
  // Get the form responses

  var responses = e.values;
  //List all sheets
  var sheetList = ["Campaign Details", "Product Details", "Manager Details"];
  var formList = ["Campaign Form", "Product Form", "Manager Form"];
  
  // Loop to Determine Sheet to append to
  for (var i = 0; i <= sheetList.length; i = i + 1){
    if (e.range.getSheet().getName() === formList[i]) {
      var sheetName = sheetList[i];
    }
  }
  // Remove Timestamp
  responses.splice(0,1);
  // Append the form responses to the destination sheet
  var destinationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  destinationSheet.appendRow(responses);
}
