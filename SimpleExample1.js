var assert = require('assert');

function assertArraysEqual(actual, expected) {
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

function repeat(n, list) {
  var result = [];
  while (n-- !== 0) result = result.concat(list);
  return result;
}

assertArraysEqual(
  repeat(1, [1,2,3]),
  [1,2,3]
);

assertArraysEqual(
  repeat(2, [1,2,3]),
  [1,2,3,1,2,3]
);

assertArraysEqual(
  repeat(0, [1,2,3]),
  []
);

// Great, but: this test doesn't even terminate:

// assertArraysEqual(
//   repeat(-100, [1,2,3]),
//   []
// );
