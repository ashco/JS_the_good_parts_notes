// https://www.safaribooksonline.com/library/view/javascript-the-good/9780596517748/ch04s03.html

// Method Invocation Pattern

// Create myObject. It has a value and an increment
// method. The increment method takes an optional
// parameter. If the argument is not a number, then 1
// is used as the default.

var myObject = {
  value: 0,
  increment: function (inc) {
      // console.log(this);
      this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment(  );
// console.log(myObject.value);    // 1

myObject.increment(2);
// console.log(myObject.value);    // 3




// Function Invocation Pattern
function add (a, b) {
  // console.log(this)
  return a + b;
}

var sum = add(3, 4);    // sum is 7

// Augment myObject with a double method.

myObject.double = function (  ) {
  var that = this; //workaround

  var helper = function () {
    // console.log(this);
    that.value = add(that.value, that.value);
  }

  helper();   //invoke helper as a function
}

// invoke double as a method

myObject.double();
// console.log(myObject.value); //6


// Constructor Invocation Pattern

// Create a constructor function called Quo.
// It makes an object with a status property.

var Quo = function (string) {
  this.status = string;
};

// Give all instances of Quo a public method
// called get_status.

Quo.prototype.get_status = function () {
  return this.status;
}

// Make an instance of Quo.

var myQuo = new Quo('confused');

// console.log(myQuo.get_status());


// Apply Invocation Pattern

// Make an array of 2 numbers and add them.

var array = [3 , 5];
var sum = add.apply(null, array);

// Make an object with a status member.

var statusObject = {
  status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method.

var status = Quo.prototype.get_status.apply(statusObject);
// console.log(status);

// Arguments

// Make a function that adds a lot of stuff.

// Note that defining the variable sum inside of
// the function does not interfere with the sum
// defined outside of the function. The function
// only sees the inner one.

var sum = function() {
  var i, sum = 0;
  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
}

// console.log(sum(4, 8, 15, 16, 23, 42)); // 108
var newSum = new sum()

// Exceptions

var add = function (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    }
  }
  return a + b;
}

// Make a try_it function that calls the new add
// function incorrectly.

var try_it = function(){
  try {
    add('seven');
  } catch (e) {
    console.log(e.name + ': ' + e.message);
  }
}

function mult (a, b) {
  if(typeof a !== 'number' || typeof b !== 'number'){
    throw {
      name: 'SuperError',
      message: 'you suck'
    };
  }
  return a - b;
}

var tryMult = function (a, b) {
  try {
    mult(a, b);
  } catch (e){
    console.log(e);
  }
}

// Function.prototype.method = function (name, func) {
//   this.prototype[name] = func;
//   return this;
// }

Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) { // protect against accidental overwrite
      this.prototype[name] = func;
      return this;
  }
};



Number.method('interger', function(){
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

// document.writeln((-10 / 3).integer(  ));  // −3


String.method('trim', function () {
  return this.replace(/^\s+|\s+$/g, '');
});

// document.writeln('"' + "   neat   ".trim(  ) + '"');



// Closure

var myObject = (function () {
  var value = 0;

  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function () {
      return value;
    }
  }
}());



var storyBook = (function(){
  var story = '';

  return({
    addToStory: function (string){
      story += string;
    },

    tellStory: function(){
      console.log(story);
    }
  });
})();


// Create a maker function called quo. It makes an
// object with a get_status method and a private
// status property.

var quo = function (status) {
  return {
    get_status: function () {
      return status;
    }
  }
}

// Make an instance of quo.

var myQuo = quo('amazed');
console.log(myQuo.get_status());


// Define a function that sets a DOM node's color
// to yellow and then fades it to white.

var fade = function (node) {
  var level = 1;
  var step = function (  ) {
      var hex = level.toString(16);
      node.style.backgroundColor = '#FFFF' + hex + hex;
      if (level < 15) {
          level += 1;
          setTimeout(step, 100);
      }
  };
  setTimeout(step, 100);
};

fade(document.body);


// BAD EXAMPLE
var add_the_handlers = function (nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
      nodes[i].onclick = function (e) {
          alert(i);
      };
  }
};

// END BAD EXAMPLE

// BETTER EXAMPLE

// Make a function that assigns event handler functions to an array of nodes.
// When you click on a node, an alert box will display the ordinal of the node.

var add_the_handlers = function (nodes) {
  var helper = function (i) {
     return function (e) {
        alert(i);
     };
  };
  var i;
  for (i = 0; i < nodes.length; i += 1) {
      nodes[i].onclick = helper(i);
  }
};

// MODULES

String.method('deentityify', function (  ) {

  // The entity table. It maps entity names to
  // characters.

      var entity = {
          quot: '"',
          lt:   '<',
          gt:   '>'
      };

  // Return the deentityify method.

      return function (  ) {

  // This is the deentityify method. It calls the string
  // replace method, looking for substrings that start
  // with '&' and end with ';'. If the characters in
  // between are in the entity table, then replace the
  // entity with the character from the table. It uses
  // a regular expression (Chapter 7).

          return this.replace(/&([^&;]+);/g,
              function (a, b) {
                  var r = entity[b];
                  return typeof r === 'string' ? r : a;
              }
          );
      };
  }(  ));

console.log('&lt;&quot;&gt;'.deentityify(  ));  // <">


// var serial_maker = function() {

// // Produce an object that produces unique strings. A
// // unique string is made up of two parts: a prefix
// // and a sequence number. The object comes with
// // methods for setting the prefix and sequence
// // number, and a gensym method that produces unique
// // strings.

//   var prefix = '';
//   var seq = 0;

//   return {
//     set_prefix: function (p) {
//       prefix = String(p);
//     },
//     set_seq: function (s) {
//       seq = s;
//     },
//     gensym: function () {
//       var result = prefix + seq;
//       seq += 1;
//       return result;
//     }
//   }
// }

// var seqer = serial_maker();
// seqer.set_prefix('Q');
// seqer.set_seq(1000);
// var unique = seqer.gensym();

var serial_maker = function () {
  var prefix = '';
  var sequence = 0;

  return {
    setPrefix: function (pre) {
      prefix = pre;
    },
    setSequence: function (s){
      sequence = s;
    },
    assign: function(){
      var serial = prefix + sequence;
      sequence ++;
      return serial;
    }
  }
}

var newSerial = serial_maker();

newSerial.setPrefix('ashCo');
newSerial.setSequence(10000);

//Currying
Function.method('curry', function(){
  var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this;

  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)));
  }
});

var add1 = add.curry(1);
console.log(add1(6));

// Memoization

// RECURSIVE - TRIGGERS 453 TIMES
// var fibonacci = function (n) {
//   return n < 2 ? n : fibonacci(n -1) + fibonacci(n - 2);
// }

// MEMOIZED - TRIGGERS 18 TIMES
var fibonacci = (function (  ) {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}( ));



// for(var i = 0; i < 10; i++){
//   console.log(i + ': ' + (i));
// }

var memoizer = function (memo, formula) {
  var recur = function(n) {
    var result = memo[n];
    if (typeof result !== 'number'){
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  }
  return recur;
}

var fibonacci = memoizer([0, 1], function (recur, n) {
  return recur(n - 1) + recur(n - 2);
})

var factorial = memoizer([1, 1], function (recur, n) {
  return n * recur(n − 1);
});


