var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('test.txt'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    var array = line.split('\t');
    console.log('{name: \'' + array[1] + '\', code: \'' + array[0] + '\'},');
});