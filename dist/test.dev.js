"use strict";

var input = document.querySelector('input');
var textArea = document.querySelector('textarea');
input.addEventListener('change', function () {
  var files = input.files;
  if (files.length == 0) return;
  var file = files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    var file = e.target.result;
    var lines = file.split(/\r\n|\n/);
    textArea.value = lines.join('\n');
  };

  reader.onerror = function (e) {
    return alert(e.target.error.name);
  };

  reader.readAsText(file);
});