Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}



var objectLiteral = {
  name: 'Jojo',
  type: {
    color: 'red',
    weight: 900
  }
}

function ConstructorFNC(name, color, weight) {
  this.name = name;
  this.type = color;
  this.weight = weight;

}

const test2 = new ConstructorFNC('Jaja', 'yellow', 70);


var objectCreate = Object.create(objectLiteral);


// Function.method('new', function (  ) {

//   // Create a new object that inherits from the
//   // constructor's prototype.

//       var that = Object.beget(this.prototype);

//   // Invoke the constructor, binding -this- to
//   // the new object.

//       var other = this.apply(that, arguments);

//   // If its return value isn't an object,
//   // substitute the new object.

//       return (typeof other === 'object' && other) || that;
//   });






var Mammal = function (name) {
  this.name = name;
};

Mammal.prototype.get_name = function (  ) {
    return this.name;
};

Mammal.prototype.says = function (  ) {
    return this.saying || '';
};








// var myMammal = new Mammal('Herb the Mammal');
// var name = myMammal.get_name(  ); // 'Herb the Mammal'







// var Cat = function (name) {
//   this.name = name;
//   this.saying = 'meow';
// };

// Replace Cat.prototype with a new instance of Mammal

// Cat.prototype = new Mammal(  );

// Augment the new prototype with
// purr and get_name methods.

// Cat.prototype.purr = function (n) {
//     var i, s = '';
//     for (i = 0; i < n; i += 1) {
//         if (s) {
//             s += '-';
//         }
//         s += 'r';
//     }
//     return s;
// };
// Cat.prototype.get_name = function (  ) {
//     return this.says(  ) + ' ' + this.name + ' ' + this.says(  );
// };

// var myCat = new Cat('Henrietta');
// var says = myCat.says(  ); // 'meow'
// var purr = myCat.purr(5); // 'r-r-r-r-r'
// var name = myCat.get_name(  );
//            'meow Henrietta meow'


Function.method('inherits', function (Parent) {
  this.prototype = new Parent(  );
  return this;
});

// var Cat = function (name) {
//   this.name = name;
//   this.saying = 'meow';
// }.
//   inherits(Mammal).
//   method('purr', function (n) {
//       var i, s = '';
//       for (i = 0; i < n; i += 1) {
//           if (s) {
//               s += '-';
//           }
//           s += 'r';
//       }
//       return s;
//   }).
//   method('get_name', function (  ) {
//       return this.says(  ) + ' ' + this.name + ' ' + this.says(  );
//   });

  // Prototypal

  var myMammal = {
    name : 'Herb the Mammal',
    get_name : function (  ) {
        return this.name;
    },
    says : function (  ) {
        return this.saying || '';
    }
};

var myCat = Object.create(myMammal);

myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function (  ) {
    return this.says() + ' ' + this.name + ' ' + this.says();
};



// FUNCTIONAL INHERITANCE
// Does not contain 'this', makes functions durable
var mammal = function (spec) {
  var that = {};

  that.get_name = function (  ) {
      return spec.name;
  };

  that.says = function (  ) {
      return spec.saying || '';
  };

  return that;
};

var myMammal = mammal({name: 'Herb'});

var cat = function (spec) {
  spec.saying = spec.saying || 'meow';
  var that = mammal(spec);
  that.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };
  that.get_name = function () {
    return that.says() + ' ' + spec.name + ' ' + that.says();
  }
  return that;
}

var myCat = cat({name: 'Henrietta'});


Object.method('superior', function(name) {
  var that = this,
      method = that[name];
  return function() {
    return method.apply(that, arguments);
  }
});


var coolcat = function (spec) {
  var that = cat(spec),
      super_get_name = that.superior('get_name');
  that.get_name = function (n) {
    return 'like ' + super_get_name() + ' baby';
  }
  return that;
}

var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name(  );
//        'like meow Bix meow baby'



//PARTS

var eventuality = function (that) {
  var registry = {};

  that.fire = function (event) {

// Fire an event on an object. The event can be either
// a string containing the name of the event or an
// object containing a type property containing the
// name of the event. Handlers registered by the 'on'
// method that match the event name will be invoked.

      var array,
          func,
          handler,
          i,
          type = typeof event === 'string' ? event : event.type;

// If an array of handlers exist for this event, then
// loop through it and execute the handlers in order.

      if (registry.hasOwnProperty(type)) {
          array = registry[type];
          for (i = 0; i < array.length; i += 1) {
              handler = array[i];

// A handler record contains a method and an optional
// array of parameters. If the method is a name, look
// up the function.

              func = handler.method;
              if (typeof func === 'string') {
                  func = this[func];
              }

// Invoke a handler. If the record contained
// parameters, then pass them. Otherwise, pass the
// event object.

              func.apply(this,
                  handler.parameters || [event]);
          }
      }
      return this;
  };

  that.on = function (type, method, parameters) {

// Register an event. Make a handler record. Put it
// in a handler array, making one if it doesn't yet
// exist for this type.

      var handler = {
          method: method,
          parameters: parameters
      };
      if (registry.hasOwnProperty(type)) {
          registry[type].push(handler);
      } else {
          registry[type] = [handler];
      }
      return this;
  };
  return that;
};