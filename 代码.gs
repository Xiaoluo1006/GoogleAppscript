// Function to add a new campaign
function addCampaign(campaignName, startDateTime, endDateTime, productName, discountedPrice, stockAvailable, traffic, conversionRate, budgetAllocated, managerName, status) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Campaign Details');
  sheet.appendRow([campaignName, startDateTime, endDateTime, productName, discountedPrice, stockAvailable, traffic, conversionRate, budgetAllocated, managerName, status]);
}

// Function to add a new product
function addProduct(productId, productName, category, price, stockAvailable, picture) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Product Details');
  sheet.appendRow([productId, productName, category, price, stockAvailable, picture]);
}

// Function to add a new manager
function addManager(name, gender, age, email, campaignNameHeld) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Manager Details');
  sheet.appendRow([name, gender, age, email, campaignNameHeld]);
}

// Function to create a KPI chart for campaigns
function createKPIChart() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Campaign Details');
  var dataRange = sheet.getRange('G1:H' + sheet.getLastRow()); // Assuming Traffic and Conversion Rate are in columns G and H
  
  var chart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(dataRange)
      .setPosition(5, 5, 0, 0)
      .setOption('title', 'Campaign KPI')
      .build();
  
  sheet.insertChart(chart);
}

// Function to search for a manager and return their details
function searchManager(managerName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Manager Details');
  var data = sheet.getDataRange().getValues();
  
  var managerDetails = [];
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim().toLowerCase() === managerName.trim().toLowerCase()) {
      managerDetails = data[i];
      break;
    }
  }
  
  return managerDetails;
}

// Function to get campaign details based on the campaign name
function getCampaignDetails(campaignName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Campaign Details');
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    var currentCampaignName = String(data[i][0]).trim();
    Logger.log('Comparing: [' + currentCampaignName + '] with [' + campaignName + ']');
    if (currentCampaignName.toLowerCase() === campaignName.trim().toLowerCase()) {
      Logger.log('Match found: ' + currentCampaignName);
      return data[i].map(function(cell) {
        return String(cell).trim();
      });
    }
  }
  Logger.log('No match found for: ' + campaignName);
  return null;
}

// Function to get product details based on the product name
function getProductDetails(productName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Product Details');
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    var currentProductName = String(data[i][1]).trim();
    Logger.log('Comparing: [' + currentProductName + '] with [' + productName + ']');
    if (currentProductName.toLowerCase() === productName.trim().toLowerCase()) {
      Logger.log('Match found: ' + currentProductName);
      // Convert each cell value to string and trim it to avoid any issues with formatting
      return data[i].map(function(cell) {
        return String(cell).trim();
      });
    }
  }
  Logger.log('No match found for: ' + productName);
  return null;
}

function setProductNameValidation() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var campaignsSheet = ss.getSheetByName('Campaign Details');
  var productsSheet = ss.getSheetByName('Product Details');
  
  // Get the range of product names from the Products sheet
  var productRange = productsSheet.getRange('B2:B');
  
  // Set data validation rule for Product Name column in Campaigns sheet
  var productNameColumn = campaignsSheet.getRange('D2:D'); // Assuming D column for Product Name
  var rule = SpreadsheetApp.newDataValidation().requireValueInRange(productRange).build();
  
  productNameColumn.setDataValidation(rule);
}

// Run the function to set up data validation
setProductNameValidation();

// Function to create the web app
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}
