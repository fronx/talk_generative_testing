# GENERATE ALL THE <br>TEST DATA !

---

# why *this* talk,<br />why *me*

---

# i don’t enjoy<br>talking about things<br>i’ve fully figured out

---

# i *have to* talk<br>about stuff<br> i *haven't* quite <br>figured out yet

---

# i will *totally* read everything that's written on these slides

---

# outline

* [2 min] limits of classical unit testing
* [8 min] basics of random testing
* [5 min] how does it work?
* [5 min] how to test code with impurities?
* [2 min] bonus: model-based testing
* [3 min] conclusion

---

basic idea: abstract test cases
i.e. reduce them to the essential

from expected == actual
to propertyOf(expected)
to propertyOf(generated)

(compare to functional abstraction?)
"but isn't that the same as writing the implementation?"
no. that is, it can be, but it doesn't have to be.

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
