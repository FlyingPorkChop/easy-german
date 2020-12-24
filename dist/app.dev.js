"use strict";

/*

    Need to fool around in test range with
    files that have blank lines, and see what happens when
    I split files with blank lines

    Extra change here

*/
var fs = require('fs'); // Get access to the file system module 


var myModule = require('./myModule'); // Get my written functions


var newVocabFile = "eg-ep114VocabFresh.txt"; // Just the name of the file for now, need to make this an input
// "Sync" doesn't let the next line run until all data is loaded

var data = fs.readFileSync('savedItems.json'); // Read the saved json from your save file

var savedItems = JSON.parse(data); // Prase it into ACTUAL json, from data to javascript object

var vocabData = fs.readFileSync(newVocabFile); // Get the raw data from the vocab file, !! adding 'utf-8' changes things

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
    savedItems.push(readInItems[i]);
  }
} // Sort the savedItems array


savedItems.sort(function (a, b) {
  return a.encountered - b.encountered;
}); // Define a new construction of the vocab file, starting with a blank string

var newVocabText = ""; // Loop through every saved item

for (var _i = 0; _i < savedItems.length; _i++) {
  var savedLine = savedItems[_i].term;
  var lineOccurences = savedItems[_i].encountered;

  if (vocabText.includes(savedLine)) {
    newVocabText += "".concat(savedLine, " --> ").concat(lineOccurences, "\r\n");
  }
}

fs.writeFileSync(newVocabFile, newVocabText); // Loop through every saved item
// If the patern is in the read in file, remove that patern and put it at the bottom of 
// the file with its occurence data
//for(let i = 0; i < savedItems.length; i++) {
//    let freshVocabText = fs.readFileSync(newVocabFile).toString();
//    let savedLine = savedItems[i].term;
//    let lineOccurences = savedItems[i].encountered;
//
//    if(freshVocabText.includes(savedLine)) {
//
//        if(lineOccurences > 1) {
//            let newValue = freshVocabText.replace(new RegExp(`${savedLine}`, 'g'), "");
//            fs.writeFileSync(newVocabFile, newValue);
//            fs.appendFileSync(newVocabFile, `${savedLine} --> ${lineOccurences}\r\n`);
//        } else {
//            let newValue = freshVocabText.replace(new RegExp(`${savedLine}`, 'g'), "");
//            fs.writeFileSync(newVocabFile, newValue);
//            fs.appendFileSync(newVocabFile, `${savedLine} --> Item added \r\n`);
//        }
//
//        console.log('Write done');
//    }
//}
// Remove multiple line breaks and replace them with only one line break

myModule.removeReplacePaternFromFile(newVocabFile, "[\r\n]+", "\r\n"); // Resave the saved items in the json file to be used next time the app runs

savedItemsData = JSON.stringify(savedItems, null, 2); // Write the lines to the json file

fs.writeFile('savedItems.json', savedItemsData, finished);

function finished(err) {
  console.log('Done writing');
}