var fs = require('fs'),
    readline = require('readline');

var current = "";
var skills = [];

var rd = readline.createInterface({
    input: fs.createReadStream('skills.txt'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    var array = line.split('\t');
	if(array[3] === 'IM') {
    if(current === "") {
    	current = array[0];
    }
	if(current !== array[0]) {
	  console.log('{code: \'' + current + '\', skills: ' +  JSON.stringify(skills) + '},');
	  skills = [];
	  current = array[0];
	}

    if(array[4] >= 3.00) {
	skills.push(array[2]);
    }
    }
});