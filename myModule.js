const fs = require('fs');

// Take a string that represents a regex and return a regex object
// The entered string does not need the starting and ending : "/"'s or the g
function getRegex(regexString) {
    let pattern = `${regexString}`; // let the MAIN patern be what the user put in
    return new RegExp(pattern, 'g'); // add global search
}

// Given a regex patern string, remove said patern from the file and replace it with another patern string
function removeReplacePaternFromFile(file, patternToRemove, paternToReplace) {
    let data = fs.readFileSync(file, "utf-8");
    let regex = getRegex(patternToRemove);
    let newValue = data.replace(regex, paternToReplace);
    fs.writeFileSync(file, newValue, "utf-8");
}

// Take a term, and check to see if it's already in the json
function isAlreadySaved(savedItems, item) {
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
function getItemWithTerm(savedItems, searchTerm) {
    for(let i = 0; i < savedItems.length; i++) {
        if(savedItems[i].term == searchTerm)
            return savedItems[i];
    }
    return `No item with term: ${searchTerm}`;
}

// For every line, make a term object and add it to the read in objects array
function storeReadInLinesAsItems(readInItems, lines) {
    for(let i = 0; i < lines.length; i++) {
        let term = lines[i];
        let item = {
            term: `${term}`,
            encountered: 1
        }
        readInItems.push(item);
    }
}

module.exports = { getRegex, removeReplacePaternFromFile, isAlreadySaved, getItemWithTerm, storeReadInLinesAsItems };