
// another comment
// anothera
// more!
// added this comment after updating git

// ok so I think I'll just use VS code instead of git bash

// Get access to the file system module
const fs = require('fs');
const myModule = require('./myModule');
const { loadavg } = require('os');
let fileName = "eg-ep114VocabFresh.txt"; // Just the name of the file for now, need to make this an input

// Take a term, and check to see if it's already in the json
function isAlreadySaved(item) {
    let isAlreadySaved = false;
    let term = item.term;

    for(let i = 0; i < savedItems.length; i++) {                        
        let savedTerm = savedItems[i].term;
        if(savedTerm == term) {                
            isAlreadySaved = true;
            break;
        }      
    }
    return isAlreadySaved;
}

// Return an item with a term that matches the search term
function getItemWithTerm(searchTerm) {
    for(let i = 0; i < savedItems.length; i++) {
        if(savedItems[i].term == searchTerm)
            return savedItems[i];
    }
    return `No item with term: ${searchTerm}`;
}

// "Sync" doesn't let the next line run until all data is loaded
let data = fs.readFileSync('savedLines.json'); // Read the saved json from your save file
let savedItems = JSON.parse(data); // Prase it into ACTUAL json

let vocabData = fs.readFileSync(fileName); // Get the raw data from the vocab file, !! adding 'utf-8' changes things
let vocabText = vocabData.toString(); // Get the vocab file as one long string with line breaks

let lines = vocabText.split(/[\r\n]+/g); // Split each of those lines into an array, each array element in one line ( or vocab term )

let readInItems = []; // Array to fill up --> will be the array of items (objects) that just got read in

// For every line, make a term object and add it to the term objects array
for(let i = 0; i < lines.length; i++) {
    let term = lines[i];
    let item = {
        term: `${term}`,
        encountered: 1
    }
    readInItems.push(item);
}

// Loop through the items made from the NEWLY ready in file
// If it's already saved, just increment the save
// If it's not saved, add it to saved
for(let i = 0; i < readInItems.length; i++) {
    if(isAlreadySaved(readInItems[i])) {            
        let termValue = readInItems[i].term;            
        let item = getItemWithTerm(termValue);
        item.encountered = ++item.encountered;
    } else {
        savedItems.push(readInItems[i]);
    }
}

// Loop through every saved item
// If the patern is in the read in file, remove that patern and put it at the bottom of 
// the file with its occurence data


myModule.removeReplacePaternFromFile(fileName, "[\r\n]+", "\r\n");

savedItemsData = JSON.stringify(savedItems, null, 2);
// Write the lines to the json file
fs.writeFile('savedLines.json', savedItemsData, finished);
function finished(err) {
    console.log('Done writing');
}



