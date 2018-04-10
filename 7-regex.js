var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = "http://www.ora.com:80/goodparts?q#fragment";

var result = parse_url.exec(url)

var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];

var blanks = '       ';
var i;

for (i = 0; i < names.length; i += 1) {
    console.log(names[i] + ':' +
        blanks.substring(names[i].length), result[i]);
}

// url:    http://www.ora.com:80/goodparts?q#fragment
// scheme: http
// slash:  //
// host:   www.ora.com
// port:   80
// path:   goodparts
// query:  q
// hash:   fragment

var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

var test = function (num) {
    document.writeln(parse_number.test(num));
};

test('1');                // true
test('number');           // false
test('98.6');             // true
test('132.21.86.100');    // false
test('123.45E-67');       // true
test('123.45D-67');       // false

// Make a regular expression object that matches
// a JavaScript string.

var my_regexp = new RegExp("\"(?:\\\\.|[^\\\\\\\"])*\"", 'g');

function make_a_matcher(  ) {
  return /a/gi;
}

var x = make_a_matcher(  );
var y = make_a_matcher(  );

// Beware: x and y are the same object!

x.lastIndex = 10;

document.writeln(y.lastIndex);    // 10