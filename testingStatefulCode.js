function SortedList(ary) {
  var that = this;
  this.state = [];
  this.length = 0
  if (ary) ary.forEach(this.insert);

  function _insert(index, value) {
    var before = that.state.slice(0, index),
        after  = that.state.slice(index);
    that.state = before.concat([value]).concat(after);
    updateLength();
    return that;
  }

  function updateLength() {
    that.length = that.state.length;
  }

  function get(index) {
    return that.state[index];
  }

  function firstIndex(fn) {
    var i = 0;
    while (i < that.length && !fn(get(i)) ++i;
    return i;
  }

  this.insert = function(value) {
    return _insert(
      firstIndex(greaterThan(value)),
      value);
  }

  this.toArray = function() {
    return that.state;
  }
}

function greaterThan(x) {
  return function (b) { return b > x; }
}

function assert(bool, msg) {
  if (!bool) console.error(msg);
}

arbSortedList = function(list, arbVal) {
  return function (size) {
    for (var i=0; i<size; ++i)
      list.insert(arbVal(size)); // stateful!! this may become a problem
  }
}

function arbWholeNum(size) {
  return Math.floor(Math.random() * size);
}

function choose(options) {
  return function() {
    return options[Math.random(options.length)];
  }
}

function arbInt(size) {
  return choose(-1, +1)() * arbWholeNum(size);
}

function gen(fn, size) { return fn(size); }

/////////////////////////////////

function isSorted(list) {
  list.toArray().reduce(function(acc, item) {
    return acc && acc <= item;
  }, true);
}

function test1(list, size) {
  gen(arbSortedList(list, arbInt), size);
  assert(isSorted(list));
}
