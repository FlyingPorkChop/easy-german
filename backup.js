// Get access to the file system module
const fs = require('fs');
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

function getItemIndexWithTerm(searchTerm) {
    for(let i = 0; i < savedItems.length; i++) {
        if(savedItems[i].term == searchTerm)
            return i;
    }
    return `No item with term: ${searchTerm}`;
}

// "Sync" doesn't let the next line run until all data is loaded
let data = fs.readFileSync('savedLines.json'); // Read the saved json from your save file
let savedItems = JSON.parse(data); // Prase it into ACTUAL json

let vocabData = fs.readFileSync(fileName); // Get the raw data from the vocab file
let vocabText = vocabData.toString(); // Get the vocab file as one long string with line breaks

let lines = vocabText.split(/[\r\n]+/g); // Split each of those lines into an array, each array element in one line ( or vocab term )

let itemObjectsArray = []; // Array to fill up --> will be the array of items (objects) that just got read in

// For every line, make a term object and add it to the term objects array
for(let i = 0; i < lines.length; i++) {
    let term = lines[i];
    let item = {
        term: `${term}`,
        encountered: 1
    }
    itemObjectsArray.push(item);
}

for(let i = 0; i < itemObjectsArray.length; i++) {
    if(isAlreadySaved(itemObjectsArray[i])) {            
        let termValue = itemObjectsArray[i].term;            
        let index = getItemIndexWithTerm(termValue);

        console.log(`Item with the term: ${termValue} is already saved`);

        let currentCount = savedItems[index].encountered;
        savedItems[index].encountered = currentCount + 1;
        console.log("just added to encountered")
    } else {
        savedItems.push(itemObjectsArray[i]);
    }
}

//let itemObjectsArrayData = JSON.stringify(itemObjectsArray, null, 2); // Stringify array of objects so I can store it in savedLines.json

savedItemsData = JSON.stringify(savedItems, null, 2);

// Write the lines to the json file
fs.writeFile('savedLines.json', savedItemsData, finished);
function finished(err) {
    console.log('Done writing');
}











