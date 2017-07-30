// main.js

// Now a.js is requested, it will be bundled into another file
var load = require('bundle-loader?lazy!./a.js');

// To wait until a.js is available (and get the exports)
//  you need to async wait for it.
window.setTimeout(function(){
    load(function(file) {
      document.open();
      document.write('<h1>' + file + '</h1>');
      document.close();
    });
},5000)