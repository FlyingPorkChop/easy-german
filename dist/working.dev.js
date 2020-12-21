"use strict";

// Get access to the file system module
var fs = require('fs');

var _require = require('os'),
    loadavg = _require.loadavg;

var fileName = "eg-ep114VocabFresh.txt"; // Just the name of the file for now, need to make this an input
// Take a term, and check to see if it's already in the json

function isAlreadySaved(item) {
  var isAlreadySaved = false;
  var term = item.term;

  for (var i = 0; i < savedItems.length; i++) {
    var savedTerm = savedItems[i].term;

    if (savedTerm == term) {
      isAlreadySaved = true;
      break;
    }
  }

  return isAlreadySaved;
}

function getItemIndexWithTerm(searchTerm) {
  for (var i = 0; i < savedItems.length; i++) {
    if (savedItems[i].term == searchTerm) return i;
  }

  return "No item with term: ".concat(searchTerm);
} // "Sync" doesn't let the next line run until all data is loaded


var data = fs.readFileSync('savedLines.json'); // Read the saved json from your save file

var savedItems = JSON.parse(data); // Prase it into ACTUAL json

var vocabData = fs.readFileSync(fileName); // Get the raw data from the vocab file

var vocabText = vocabData.toString(); // Get the vocab file as one long string with line breaks

var lines = vocabText.split(/[\r\n]+/g); // Split each of those lines into an array, each array element in one line ( or vocab term )

var itemObjectsArray = []; // Array to fill up --> will be the array of items (objects) that just got read in
// For every line, make a term object and add it to the term objects array

for (var i = 0; i < lines.length; i++) {
  var term = lines[i];
  var item = {
    term: "".concat(term),
    encountered: 1
  };
  itemObjectsArray.push(item);
}

for (var _i = 0; _i < itemObjectsArray.length; _i++) {
  if (isAlreadySaved(itemObjectsArray[_i])) {
    var termValue = itemObjectsArray[_i].term;
    var index = getItemIndexWithTerm(termValue);
    console.log("Item with the term: ".concat(termValue, " is already saved"));
    var currentCount = savedItems[index].encountered;
    savedItems[index].encountered = currentCount + 1;
    console.log("just added to encountered");
  } else {
    savedItems.push(itemObjectsArray[_i]);
  }
} //let itemObjectsArrayData = JSON.stringify(itemObjectsArray, null, 2); // Stringify array of objects so I can store it in savedLines.json


savedItemsData = JSON.stringify(savedItems, null, 2); // Write the lines to the json file

fs.writeFile('savedLines.json', savedItemsData, finished);

function finished(err) {
  console.log('Done writing');
}