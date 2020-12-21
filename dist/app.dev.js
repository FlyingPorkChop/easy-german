"use strict";

// another comment
// anothera
// more!
// added this comment after updating git
// ok so I think I'll just use VS code instead of git bash
// Get access to the file system module
var fs = require('fs');

var myModule = require('./myModule');

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
} // Return an item with a term that matches the search term


function getItemWithTerm(searchTerm) {
  for (var i = 0; i < savedItems.length; i++) {
    if (savedItems[i].term == searchTerm) return savedItems[i];
  }

  return "No item with term: ".concat(searchTerm);
} // "Sync" doesn't let the next line run until all data is loaded


var data = fs.readFileSync('savedLines.json'); // Read the saved json from your save file

var savedItems = JSON.parse(data); // Prase it into ACTUAL json

var vocabData = fs.readFileSync(fileName); // Get the raw data from the vocab file, !! adding 'utf-8' changes things

var vocabText = vocabData.toString(); // Get the vocab file as one long string with line breaks

var lines = vocabText.split(/[\r\n]+/g); // Split each of those lines into an array, each array element in one line ( or vocab term )

var readInItems = []; // Array to fill up --> will be the array of items (objects) that just got read in
// For every line, make a term object and add it to the term objects array

for (var i = 0; i < lines.length; i++) {
  var term = lines[i];
  var item = {
    term: "".concat(term),
    encountered: 1
  };
  readInItems.push(item);
} // Loop through the items made from the NEWLY ready in file
// If it's already saved, just increment the save
// If it's not saved, add it to saved


for (var _i = 0; _i < readInItems.length; _i++) {
  if (isAlreadySaved(readInItems[_i])) {
    var termValue = readInItems[_i].term;

    var _item = getItemWithTerm(termValue);

    _item.encountered = ++_item.encountered;
  } else {
    savedItems.push(readInItems[_i]);
  }
} // Loop through every saved item
// If the patern is in the read in file, remove that patern and put it at the bottom of 
// the file with its occurence data


myModule.removeReplacePaternFromFile(fileName, "[\r\n]+", "\r\n");
savedItemsData = JSON.stringify(savedItems, null, 2); // Write the lines to the json file

fs.writeFile('savedLines.json', savedItemsData, finished);

function finished(err) {
  console.log('Done writing');
}