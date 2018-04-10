// https://www.safaribooksonline.com/library/view/javascript-the-good/9780596517748/ch03s05.html

var flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
      IATA: "SYD",
      time: "2004-09-22 14:55",
      city: "Sydney"
  },
  arrival: {
      IATA: "LAX",
      time: "2004-09-23 10:42",
      city: "Los Angeles"
  },
  temp: 'temp'
};

var empty_object = {};

var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard",
    "nickname": "Woody"
};

var middle = stooge['middle-name'] || '(none)';
var status = flight.status || 'unknown';

if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  }
}

var another_stooge = Object.create(stooge);

another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

stooge.profession = 'actor';


// var name; 
// for (name in another_stooge) {
//   if (typeof another_stooge[name] !== 'function') {
//     document.writeln(name + ': ' + another_stooge[name]);
//   }
// }

var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];

for (var i = 0; i < properties.length; i += 1) {
    console.log(properties[i] + ': ' +
            another_stooge[properties[i]]);
    }

    // another_stooge.nickname    // 'Moe'

    // // Remove nickname from another_stooge, revealing
    // // the nickname of the prototype.
    
    // delete another_stooge.nickname;
    
    // another_stooge.nickname    // 'Curly'

var MYAPP = {};

MYAPP.stooge = {
  "first-name": "Joe",
  "last-name": "Howard"
};
  
MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};