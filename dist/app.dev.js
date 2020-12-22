"use strict";

/*

    Need to fool around in test range with
    files that have blank lines, and see what happens when
    I split files with blank lines

    Extra change here

*/
var fs = require('fs'); // Get access to the file system module 


var myModule = require('./myModule'); // Get my written functions


var fileName = "eg-ep114VocabFresh.txt"; // Just the name of the file for now, need to make this an input
// "Sync" doesn't let the next line run until all data is loaded

var data = fs.readFileSync('savedItems.json'); // Read the saved json from your save file

var savedItems = JSON.parse(data); // Prase it into ACTUAL json, from data to javascript object

var vocabData = fs.readFileSync(fileName); // Get the raw data from the vocab file, !! adding 'utf-8' changes things

var vocabText = vocabData.toString(); // Get the vocab file as one long string with line breaks

var lines = vocabText.split(/[\r\n]+/g); // Split each of those lines into an array, each array element in one line ( or vocab term )

var readInItems = []; // Array to fill up --> will be the array of items (objects) that just got read in

myModule.storeReadInLinesAsItems(readInItems, lines); // Loop through the items made from the NEWLY ready in file
// If it's already saved, just increment the save
// If it's not saved, add it to saved

for (var i = 0; i < readInItems.length; i++) {
  if (myModule.isAlreadySaved(savedItems, readInItems[i])) {
    var termValue = readInItems[i].term;
    var item = myModule.getItemWithTerm(savedItems, termValue);
    item.encountered = ++item.encountered;
  } else {
    saveditems.push(readInItems[i]);
  }
} // Loop through every saved item
// If the patern is in the read in file, remove that patern and put it at the bottom of 
// the file with its occurence data


for (var _i = 0; _i < savedItems.length; _i++) {
  var freshVocabText = fs.readFileSync(fileName).toString();
  var savedLine = savedItems[_i].term;
  var lineOccurences = savedItems[_i].encountered;

  if (freshVocabText.includes(savedLine)) {
    var newValue = freshVocabText.replace(new RegExp("".concat(savedLine), 'g'), "");
    fs.writeFileSync(fileName, newValue);
    fs.appendFileSync(fileName, "".concat(savedLine, " --> ").concat(lineOccurences, "\r\n"));
    console.log('Write done');
  }
} // Remove multiple line breaks and replace them with only one line break


myModule.removeReplacePaternFromFile(fileName, "[\r\n]+", "\r\n"); // Resave the saved items in the json file to be used next time the app runs

savedItemsData = JSON.stringify(savedItems, null, 2); // Write the lines to the json file

fs.writeFile('savedItems.json', savedItemsData, finished);

function finished(err) {
  console.log('Done writing');
}