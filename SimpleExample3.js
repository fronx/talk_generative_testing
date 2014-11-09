var assert = require('assert');

function repeat(n, list) {
  var result = [];
  while (n-- > 0) result = result.concat(list);
  return result;
}

// repeat(1, [1,2,3]) === [1,2,3]
// What makes it correct?
//   repeat(n, list).length === n * list.length
//   (among others)

// repeat(2, [1,2,3]) === [1,2,3,1,2,3]
//    repeat(n, list).length === n * list.length

// repeat(0, [1,2,3]) === []
//    repeat(n, list).length === n * list.length

// abstraction ftw!
// let's test that property directly rather than representing
// it via examples we manually picked:
//
//   repeat(n, list).length === n * list.length;
//

function forAll(generators, test, name) {
  var size   = 0,
      failed = false,
      args   = [];
  while (!failed && size < 100) {
    args = generators.map(function (gen) { return gen(size); });
    if (!test.apply(this, args)) {
      failed = true;
      console.error("oops, found a counter example: ", args, name || test);
      console.trace();
    };
    size++;
  }
  if (!failed) console.log("ran 100 tests successfully: ", name || test);
}

function arbWhole(size) {
    return Math.floor(Math.random() * size);
}

function arbInt(size) {
    return arbWhole(2 * size) - size;
}

function arbArray(innerGen) {
  return function (size) {
    var result = [];
    while (size--) result.push(innerGen(size));
    return result;
  }
}

forAll([arbInt, arbArray(arbInt)],
  function (n, list) {
    return repeat(n, list).length ===
      (n < 0 ? 0 : n * list.length);
  });

forAll([arbInt, arbArray(arbInt), arbWhole],
  function (n, list, m) {
    return n < 1 || repeat(n, list)[m % list.length] ===
      list[m % list.length];
  });
