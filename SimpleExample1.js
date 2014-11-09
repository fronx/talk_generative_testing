var assert = require('assert');

function assertArraysEqual(actual, expected) {
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

function concatN(n, list) {
  var result = [];
  while (n-- !== 0) result = result.concat(list);
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

// Great, but: this test doesn't even terminate:

// assertArraysEqual(
//   concatN(-100, [1,2,3]),
//   []
// );
