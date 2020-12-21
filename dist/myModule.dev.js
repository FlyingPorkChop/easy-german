"use strict";

var fs = require('fs');

function getRegex(regexString) {
  var pattern = "".concat(regexString); // let the MAIN patern be what the user put in

  return new RegExp(pattern, 'g'); // add global search
}

function removeReplacePaternFromFile(file, patternToRemove, paternToReplace) {
  var data = fs.readFileSync(file, "utf-8");
  var regex = getRegex(patternToRemove);
  var newValue = data.replace(regex, paternToReplace);
  fs.writeFileSync(file, newValue, "utf-8");
} //function replaceSimpleString() {
//    let data = "\n\n my data \n\n";
//    let regex = getRegex("\n\r");
//    let newValue = data.replace(regex, '');
//    console.log(newValue);
//}


module.exports = {
  getRegex: getRegex,
  removeReplacePaternFromFile: removeReplacePaternFromFile
};