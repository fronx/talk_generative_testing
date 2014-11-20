# GENERATE ALL THE <br>TEST DATA !

---

# hi, i'm fronx.<br>and also @fronx.

---

# why *this* talk,<br />why *me*

---

# layered system
# domain invariants

---

# a lot of tests

---

# but test code is code

---

# write less code

---

# write *less test code*

---

# outline

`1 |` from `expected == actual` to properties
`2 |` generators
`3 |` learn from failures
`4 |` cool stuff you can do
`5 |` suitability

---

# 1<br>from<br>expected == actual<br>to properties

---

# expected == actual

```js
// concatenate a list to itself n times
function concatN(n, list) { … }
```

---

# expected == actual

```js
// concatenate a list to itself n times
function concatN(n, list) { … }

assertEqual(concatN(1, [1,2,3]),
            [1,2,3]);
```

---

# expected == actual

```js
// concatenate a list to itself n times
function concatN(n, list) { … }

assertEqual(concatN(1, [1,2,3]),
            [1,2,3]);

assertEqual(concatN(2, [1,2,3]),
            [1,2,3,1,2,3]);
```

---

# expected == actual

```js
// concatenate a list to itself n times
function concatN(n, list) { … }

assertEqual(concatN(1, [1,2,3]),
            [1,2,3]);       // why is that correct?

assertEqual(concatN(2, [1,2,3]),
            [1,2,3,1,2,3]); // why is that correct?
```

---

# expected == actual

```js
 
 
 
assertEqual(concatN(1, [1,2,3]),
            [1,2,3]);       // why is that correct?
```

---

# properties

```js
// output length == n times input length
// items appear in their original order

assertEqual(concatN(1, [1,2,3]),
            [1,2,3]);
```

---

# properties

```js
// output length == n times input length

assert(concatN(1, someList).length ===
       1 * someList.length);
```

---

# properties

```js
// items appear in their original order
```

---

# properties

```js
// items appear in their original order
// or: every nth item is the same in input/output

// input:  a b c
//           *
//         0 1 2
// output: a b c a b c a b c
//           * . . * . . * .
//         0 1 2 0 1 2 0 1 2
```

---

# properties

```js
// items appear in their original order
// or: every nth item is the same in input/output

  assert(concatN(1, list)[someIndex % list.length] ===
                     list[someIndex % list.length]);
```

---

# properties

```js
// items appear in their original order
// or: every nth item is the same in input/output
exampleIndexes.forEach(function(someIndex) {
  assert(concatN(1, list)[someIndex % list.length] ===
                     list[someIndex % list.length]);
});
```

---

# properties

```js
 
 
 
assertEqual(concatN(2, [1,2,3]),
            [1,2,3,1,2,3]); // why is that correct?
```
---

# properties

```js
// output length == n times input length
// items appear in their original order 
 
assertEqual(concatN(2, [1,2,3]),
            [1,2,3,1,2,3]);
```

---

# properties

```js
// output length == n times input length
var list = ...;

assert(concatN(1, list).length ===
       1 * list.length);

assert(concatN(2, list).length ===
       2 * list.length);
```

---

# properties

```js
// items appear in their original order
var list = ...;
// for (var m...)
assert(concatN(1, list)[m % list.length] ===
                   list[m % list.length]);
// for (var m...)
assert(concatN(2, list)[m % list.length] ===
                   list[m % list.length]);

```

---

# we are testing<br>the *same thing*

---

# this calls for<br>*abstraction*

---

# abstraction

```js
 
  assert(concatN(n, list).length ===
         n * list.length);


 
  assert(concatN(n, list)[m % list.length] ===
                     list[m % list.length]);


```

---

# abstraction

```js
function (list, n) {
  assert(concatN(n, list).length ===
         n * list.length);
}

function(list, n, m) {
  assert(concatN(n, list)[m % list.length] ===
                     list[m % list.length]);
}

```

---

# okay cool, but where does the *data* come from?

---

# 2<br>generators

---

# generators

```js
function (list, n) {
  assert(concatN(n, list).length ===
         n * list.length);
}

function(list, n, m) {
  assert(concatN(n, list)[m % list.length] ===
                     list[m % list.length]);
}

```

---

# generators

```js
forAll(arbList, arbInt, function(list, n) {
  return concatN(n, list).length ===
         n * list.length;
});

forAll(arbList, arbInt, arbInt, function(list, n, m) {
  return concatN(n, list)[m % list.length] ===
                     list[m % list.length];
});

```

---

# generators

* `arbInt`  
* `arbList`

---

# generators

* `arbInt`

```js
function arbWhole (size) {
  return Math.floor(Math.random() * size);
} // --> num between 0 and size
```

---

# generators

* `arbInt`

```js
function arbWhole (size) {
  return Math.floor(Math.random() * size);
} // --> num between 0 and size

function arbInt (size) {
  return arbWhole(2 * size) - size;
} // --> num between -size and size
```

---

# what's `size` good for?

---

# size: with one value dimension

````
 +----------------------> arbInt
0|*
 |
 v size
````

---

# size: with one value dimension

````
 +----------------------> arbInt
0|*
3|**
 |
 v size
````
---

# size: with one value dimension

````
 +----------------------> arbInt
0|*
3|**
5| ** *
 v size
````

---

# size: with one value dimension

````
 +----------------------> arbInt
0|*
3|**
5| ** *
 |  **    *
9| *   *
 |  *   *    *
 | *             *  *
 v size
````

---

# generators

* `arbList`

```js
function arbList (size) {
  var list = [],
      listSize = arbWhole(size);
  // TODO: collect content
  //       for list
  //
  return list;
}
```

---

# generators

* `arbList`

```js
function arbList (size) {
  var list = [],
      listSize = arbWhole(size);
  for (var i=0; i<listSize; i++) {
    list.push(arbInt(size));
  }
  return list;
}
```

---

# size: with two value dimensions

````
 +----------------------> arbInt
 |*** *  *         *
 |* ** *  *   *        *
 |* ** *
 |  **    *
 | *   *         *     (size is the limiting radius)
 |         *
 | *              *
 v arbList
````

---

# failure, shrinking

````
 +----------------------> arbInt
 |*** *  *         *
 |* ** *  *   *        *
 |* ** *
 |  **    *
 | *   *         X <-- failure
 |         *
 | *              *
 v arbList
````

---

# failure, shrinking

````
 +----------------------> arbInt
 |*** *  *         *
 |* ** *  *   *        *
 |* ** * Mxxxx <-- minimal example
 |  **    *   xx
 | *   *        xX <-- failure
 |         *
 | *              *
 v arbList
````

---

# shrinking and reducing `size` do *not* achieve the same thing

---

# generators

* `arbList`

```js
function arbList (size) {
  var i, list = [],
      listSize = arbWhole(size);
  for (i = 0; i < listSize; i += 1) {
    list.push(arbInt(size));
  }
  return list;
}
```

---

# generators

* `arbList`

```js
function arbList (itemGen, size) {
  var i, list = [],
      listSize = arbWhole(size);
  for (i = 0; i < listSize; i += 1) {
    list.push(itemGen(size));
  }
  return list;
}
```

---

# generators

```js
// usage
var l1 = arbList(arbInt, 1);
var l2 = arbList(arbInt, 20);

var i1 = arbInt(1);
var i2 = arbInt(10);

// different signatures :(
```

---

# generators

```js
// desired usage

arbList(arbInt)

arbList(arbList(arbInt))

arbList(arbList(arbList(arbStr)))
```

---

# ?

---

# we

---

# we need

---

# we need some

---

# we need some<br>*CUR*

---

# we need some<br>*CUR*(*RY*)

---

# we need some<br>*CUR*(*RY*)(*ING*)

---

# we need some<br>*CUR*(*RY*)(*ING*).

---

# we

---

# we need

---

# we need some

---

# we need some<br>*CUR*

---

# we need some<br>*CUR*(*RY*)

---

# we need some<br>*CUR*(*RY*)(*ING*)

---

# we need some<br>*CUR*(*RY*)(*ING*).

---

# ok

---

# generators

```js
// arbList :: ((Int -> a), Int) -> [a]
function arbList (itemGen, size) {

    var i, list = [],
        listSize = arbWhole(size);
    for (i = 0; i < listSize; i += 1) {
      list.push(itemGen(size));
    }
    return list;

}
```

---

# generators

```js
// arbList :: (Int -> a) -> (Int -> [a])
function arbList (itemGen) {
  return function gen(size) {
    var i, list = [],
        listSize = arbWhole(size);
    for (i = 0; i < listSize; i += 1) {
      list.push(itemGen(size));
    }
    return list;
  };
}
```

---

# generators

```js
arbList(arbList(arbList(arbWhole)))(7)

[ [ [],
    [ 0, 1, 5, 0, 1, 2 ],
    [ 1, 4, 0, 3 ],
    [],
    [ 6, 2, 4, 5, 4, 4 ] ],
  [ [ 2, 5, 1 ], [], [] ],
  [ [ 4, 0, 6, 1 ], [ 5, 6, 6, 1 ] ],
  [ [ 3, 4, 4, 6, 6 ], [ 0, 0, 2, 4 ], [ 4, 4, 1, 4, 1 ] ],
  [ [],
    [ 0, 2, 4, 4, 6, 5 ],
    [ 5, 2, 1, 3, 1 ],
    [ 0, 4, 0, 6, 4, 6 ] ] ]
```

---

# 3<br>learn from failures

---

# learn from failures

```js
oops, found a counter example:  [ -1, [ 0, 0 ] ] function (n, list) {
    return concatN(n, list).length ===
      n * list.length;
  }

oops, found a counter example:  [ 0, [ 0 ], 0 ] function (n, list, m) {
    return concatN(n, list)[m % list.length] ===
                       list[m % list.length];
  }

// and after rerunning:
oops, found a counter example:  [ -1, [ 0 ], -1 ] function (n, list, m) {
    return concatN(n, list)[m % list.length] ===
                       list[m % list.length];
  }
```

---

# learn from failures

````
failures for:

n ==  0
n == -1

m ==  0
m == -1
````

---

# learn from failures

````
failures for:

n ==  0  |
n == -1  |  our length property is just wrong

m ==  0  |  with n=0: item at any index is undefined
m == -1  |  item at negative index is undefined
````

---

# learn from failures

```js
forAll([arbInt, arbArray(arbInt)],
  function (n, list) {
    return concatN(n, list).length ===
      n * list.length;
  });

forAll([arbInt, arbArray(arbInt), arbInt],
  function (n, list, m) {
    return concatN(n, list)[m % list.length] ===
                       list[m % list.length];
  });
```

---

# learn from failures

```js
forAll([arbInt, arbArray(arbInt)],
  function (n, list) {
    return concatN(n, list).length ===
      (n < 0 ? 0 : n * list.length);
  });

forAll([arbInt, arbArray(arbInt), arbWhole],
  function (n, list, m) {
    return n < 1 || concatN(n, list)[m % list.length] ===
                                list[m % list.length];
  });
```

---

# learn from failures

```js
ran 100 tests successfully:  function (n, list) {
    return concatN(n, list).length ===
      (n < 0 ? 0 : n * list.length);
  }

ran 100 tests successfully:  function (n, list, m) {
    return n < 1 || concatN(n, list)[m % list.length] ===
                                list[m % list.length];
  }
```

---

# yay  \o/

---

# 4 | cool stuff you can do

* random user actions
* idempotence
* symmetry
* compare implementations

---

# 5 | suitability

* generators pay off for big, common domains
* more dimensions —> more code saved
* too abstract and loose for TDD
* good for regression testing

---

# but in any case
# test *properties*<br>not values

---

# or at least
# test *properties*,<br>in addition to values

---

# thanks.

# @fronx

---

# questions

---

# appendix

---

# comparing two implementations

````
forAll(arbInput, function (in) {
  return oldFn(in) == newFn(in);
}
````

---

# existing libraries

- **node-quickcheck**
  does not support shrinking
- **macchiato**
  string-based generator lookup
- **jscheck**
  no shrinking, few combinators

---

# existing libraries (2)

- **bilby.js**
  no combinators, interface is unusual
- **qc**
  it's pretty good, actually

---

# generators

```js
var url = { protocol: 'http'
          , domain: xkcd.com
          , path: /5/
          , query: ''
          }

function arbUrl(size) {
  return { protocol: arbProtocol      // such custom
         , domain:   arbDomain(size)  // many param
         , path:     arbPath(size)    // much size
         , query:    arbQuery(size)   // wow
         };
}
```
---

#
