const fs = require('fs'); // Get access to the file system module 
const myModule = require('./myModule'); // Get my written functions
let fileName = "eg-ep114VocabFresh.txt"; // Just the name of the file for now, need to make this an input

// "Sync" doesn't let the next line run until all data is loaded
let data = fs.readFileSync('savedItems.json'); // Read the saved json from your save file
let savedItems = JSON.parse(data); // Prase it into ACTUAL json, from data to javascript object

let vocabData = fs.readFileSync(fileName); // Get the raw data from the vocab file, !! adding 'utf-8' changes things
let vocabText = vocabData.toString(); // Get the vocab file as one long string with line breaks
let lines = vocabText.split(/[\r\n]+/g); // Split each of those lines into an array, each array element in one line ( or vocab term )

let readInItems = []; // Array to fill up --> will be the array of items (objects) that just got read in
myModule.storeReadInLinesAsItems(readInItems, lines);

// Loop through the items made from the NEWLY ready in file
// If it's already saved, just increment the save
// If it's not saved, add it to saved
for(let i = 0; i < readInItems.length; i++) {
    if(myModule.isAlreadySaved(savedItems, readInItems[i])) {            
        let termValue = readInItems[i].term;            
        let item = myModule.getItemWithTerm(savedItems, termValue);
        item.encountered = ++item.encountered;
    } else {
        saveditems.push(readInItems[i]);
    }
}

// Loop through every saved item
// If the patern is in the read in file, remove that patern and put it at the bottom of 
// the file with its occurence data
for(let i = 0; i < savedItems.length; i++) {

    let freshVocabText = fs.readFileSync(fileName).toString();

    let savedLine = savedItems[i].term;
    let lineOccurences = savedItems[i].encountered;
    if(freshVocabText.includes(savedLine)) {
        let newValue = freshVocabText.replace(new RegExp(`${savedLine}`, 'g'), "");
        fs.writeFileSync(fileName, newValue);
        fs.appendFileSync(fileName, `${savedLine} --> ${lineOccurences}\r\n`);

        console.log('Write done');
    }
}



// Remove multiple line breaks and replace them with only one line break
myModule.removeReplacePaternFromFile(fileName, "[\r\n]+", "\r\n");


// Resave the saved items in the json file to be used next time the app runs
savedItemsData = JSON.stringify(savedItems, null, 2);
// Write the lines to the json file
fs.writeFile('savedItems.json', savedItemsData, finished);
function finished(err) {
    console.log('Done writing');
}









