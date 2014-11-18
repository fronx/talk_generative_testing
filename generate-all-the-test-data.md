# GENERATE ALL THE <br>TEST DATA !

---

# why *this* talk,<br />why *me*

---

# low-level data layer
# --> *mistakes* <--
# high-level domain invariants

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

* [ 4 min] expected == actual
* [ 4 min] properties
* [10 min] generators

// * [5 min] how to test code with impurities?
// * [2 min] bonus: model-based testing
// * [3 min] conclusion

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


assertEqual(concatN(1, [1,2,3]),
            [1,2,3]);
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

var list = [1,2,3];
assert(concatN(1, list).length ===
       1 * list.length);
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
// or: every nth item is the same

// input:  a b c
//           *
// output: a b c a b c a b c . . .
//           * . . * . . * . . * .
```

---

# properties

```js
// items appear in their original order

  assert(concatN(1, list)[m % list.length] ===
         list[m % list.length]);

// input:  a b c
//           *
// output: a b c a b c a b c . . .
//           * . . * . . * . . * .
```

---

# properties

```js
// items appear in their original order
[2,5,10,12].forEach(function(m) {
  assert(concatN(1, list)[m % list.length] ===
         list[m % list.length]);
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
var list = [1,2,3];

assert(concatN(1, list).length ===
       1 * list.length);

assert(concatN(2, list).length ===
       2 * list.length);
```

---

# properties

```js
// items appear in their original order
var list = [1,2,3];
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

# this calls for<br>*ABSTRACTION*

---

# abstraction

```js
 
         concatN(n, list).length ===
         n * list.length;


 
         concatN(n, list)[m % list.length] ===
         list[m % list.length]);


```

---

# abstraction

```js
function (list, n) {
  return concatN(n, list).length ===
         n * list.length;
}

function(list, n, m) {
  return concatN(n, list)[m % list.length] ===
         list[m % list.length]);
}

```

---

# okay cool, but what does that have to do with *generating* test cases?

---

# look!

---

# abstraction

```js
function (list, n) {
  return concatN(n, list).length ===
         n * list.length;
}

function(list, n, m) {
  return concatN(n, list)[m % list.length] ===
         list[m % list.length]);
}

```

---

# abstraction

```js
forAll(arbList, arbInt, function(list, n) {
  return concatN(n, list).length ===
         n * list.length;
});

forAll(arbList, arbInt, arbInt, function(list, n, m) {
  return concatN(n, list)[m % list.length] ===
         list[m % list.length]);
});

```

---

# *beauty, eh?*

---

# observation 1

# testing properties is *not* the same as rewriting the implementation

* though it can be hard to see how

---

# observation 2

# properties can be completely *independent*

* avoid accidental overlapping

---

# let's make our own generators!

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

# how does it work?

* let's look at the whole implementation of the original quickcheck: (screenshot)
* okay cool…

---

// i need one good example that i can use accross everything
// i should write unit tests for it
// maybe even do it test-driven
// and then show how there is the assumption that the examples are representative
// is the sorted list a good example? not really.
// what could possibly go wrong in the implementation?
//

---

// no matter what, i always want X to be true

---

// show an example here
// use the most mathy notation i can find

---

// translate it into javascript
// now everything is clear
// maybe

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
