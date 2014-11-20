# GENERATE ALL THE <br>TEST DATA !

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

1 | from expected == actual to properties
2 | generators
3 | shrinking
4 | cool stuff you can do
5 | trade-offs

---

# disclaimer

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

# look!

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
  assert(concatN(n, list).length ===
         n * list.length);
});

forAll(arbList, arbInt, arbInt, function(list, n, m) {
  assert(concatN(n, list)[m % list.length] ===
                     list[m % list.length]);
});

```

---

# generators

* `arbInt`  
* `arbList`

---

# let's make our own generators!

* `arbInt`

```js
function arbWhole (size) {
  return Math.floor(Math.random() * size);
} // --> num between 0 and size
```

---

# let's make our own generators!

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

# `size` does *not* determine<br>the size _precisely_

# it merely *allows* more complex test cases

---

# let's make our own generators!

* `arbList`

```js
function arbList (size) {
  var i, list = [],
      listSize = arbWhole(size);
  // TODO: collect content
  //       for list
  //
  return list;
}
```
---

# let's make our own generators!

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

# let's make our own generators!

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

# 3<br>shrinking

---

# shrinking

```js

```

---

# 4<br>cool stuff you can do

---

# cool stuff you can do

* random user actions
* idempotence
* symmetry
* compare implementations

---

# trade-offs

* investing in generators vs.
*

---

# questions

---

# limits of classical unit testing

* can be interpreted as **partial** specifications
* it may be hard to infer what the property is from the example --> i should have an example for that
* abstraction to the rescue!
* remove what's not essential
* analogous to defining functions

---

# basics of random testing

* symmetries: stored value == retrieved value
* idempotence: normalizing a value twice should not change the result
* something with recursive functions?
*

---

writing generators takes time and effort
but it's a good investment!
you can use them in other tests

---

# what's "wrong" with example-based unit testing?

* unchecked assumption that examples are representative

---

# comparing two implementations

forall inputs. oldFn == newFn

````
forAll(arbInput, function (in) {
  return oldFn(in) == newFn(in);
}
````
---

# conclusion

* is it worth it?
  study from 2002: bugs add 30% to the cost of software
*

---

# appendix

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

#
