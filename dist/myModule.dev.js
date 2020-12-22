"use strict";

var fs = require('fs'); // Take a string that represents a regex and return a regex object
// The entered string does not need the starting and ending : "/"'s or the g


function getRegex(regexString) {
  var pattern = "".concat(regexString); // let the MAIN patern be what the user put in

  return new RegExp(pattern, 'g'); // add global search
} // Given a regex patern string, remove said patern from the file and replace it with another patern string


function removeReplacePaternFromFile(file, patternToRemove, paternToReplace) {
  var data = fs.readFileSync(file, "utf-8");
  var regex = getRegex(patternToRemove);
  var newValue = data.replace(regex, paternToReplace);
  fs.writeFileSync(file, newValue, "utf-8");
} // Take a term, and check to see if it's already in the json


function isAlreadySaved(savedItems, item) {
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


function getItemWithTerm(savedItems, searchTerm) {
  for (var i = 0; i < savedItems.length; i++) {
    if (savedItems[i].term == searchTerm) return savedItems[i];
  }

  return "No item with term: ".concat(searchTerm);
} // For every line, make a term object and add it to the read in objects array


function storeReadInLinesAsItems(readInItems, lines) {
  for (var i = 0; i < lines.length; i++) {
    var term = lines[i];
    var item = {
      term: "".concat(term),
      encountered: 1
    };
    readInItems.push(item);
  }
}

module.exports = {
  getRegex: getRegex,
  removeReplacePaternFromFile: removeReplacePaternFromFile,
  isAlreadySaved: isAlreadySaved,
  getItemWithTerm: getItemWithTerm,
  storeReadInLinesAsItems: storeReadInLinesAsItems
};