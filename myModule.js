const fs = require('fs');

function getRegex(regexString) {
    let pattern = `${regexString}`; // let the MAIN patern be what the user put in
    return new RegExp(pattern, 'g'); // add global search
}

function removeReplacePaternFromFile(file, patternToRemove, paternToReplace) {
    let data = fs.readFileSync(file, "utf-8");
    let regex = getRegex(patternToRemove);
    let newValue = data.replace(regex, paternToReplace);
    fs.writeFileSync(file, newValue, "utf-8");
}

//function replaceSimpleString() {
//    let data = "\n\n my data \n\n";
//    let regex = getRegex("\n\r");
//    let newValue = data.replace(regex, '');
//    console.log(newValue);
//}
module.exports = { getRegex, removeReplacePaternFromFile };