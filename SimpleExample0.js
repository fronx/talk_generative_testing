var assert = require('assert');

function assertArraysEqual(actual, expected) {
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

function concatN(n, list) {
  var result = list;
  while (--n !== 0) result = result.concat(list);
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

// Great, but: I forgot a special case!

// assertArraysEqual(
//   concatN(0, [1,2,3]),
//   []
// );
