var assert = require('assert');

function assertArraysEqual(actual, expected) {
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

function concatN(n, list) {
  var result = [];
  while (n-- > 0) result = result.concat(list);
  return result;
}

assertArraysEqual(
  concatN(1, [1,2,3]),
  [1,2,3]
);

assertArraysEqual(
  concatN(2, [1,2,3]),
  [1,2,3,1,2,3]
);

assertArraysEqual(
  concatN(0, [1,2,3]),
  []
);

assertArraysEqual(
  concatN(-100, [1,2,3]),
  []
);

// Great, but:
//   Are any of these numbers (or lists) special in any way?
//     Which ones?
//  How do we know these results are correct?
//    What makes them correct?
//    2, [1,2,3] --> [1,2,3,1,2,3]
//    what if i replaced the 3 with a 0? would that change anything?
//    2, [1,2,0] --> [1,2,0,1,2,0]
//    it changed something in the result, but only in every 3rd position
//    what if i changed n from 2 to 3, does that matter?
//    3, [1,2,0] --> [1,2,0,1,2,0,1,2,0]
//    yes, it makes the result longer
//    so why did we pick that test case and not a different one?
//    …
//    …
//    there is no reason. it's arbitrary.
//    what if we removed all those concrete values
//    and replaced them with variables?
//
//    concatN(n, list) --> ???
//
//    what do we know about the result?
//    its length:
//       concatN(n, list).length === n < 0 ? 0 : n * list.length
//    the position of values:
//       concatN(n, list)[m % list.length] === list[m % list.length]
//
