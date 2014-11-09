// convert between lists and trees
//
// translate changes to the list representation
//   to changes to the tree
//
// translate changes to the tree representation
//   to changes to the list

// example tree:
//   a
//   b
//     c
//     d
//       e
//   f
//     g
//   h

// node list + edge list
// [a,b,c,d,e,f,g,h]
// {c->b, d->b, e->d, g->f}

function identity (x) { return x; }

function NestedList (data) {
  var that = this;
  this.data = data;
  this.synced = [];

  this.at = function (fn) {
    return function _at(path, data) {
      var data = data || that.data;
      return path.length === 1
        ? fn(data[path[0]], path[0], data)
        : _at(path.slice(1), data[path[0]].children);
    }
  };
  this.get = this.at(identity);
  this.remove = function (path) {
    function _remove(item, index, data) {
      data.splice(index, 1);
    }
    that.at(_remove)(path);
  };
}

function Graph (data) {
  var that = this;
  this.nodes = data.nodes;
  this.edges = data.edges;
  this.synced = [];

  this.get = function (index) {
    return that.data[index];
  };
  function exists (item) {
    return that.nodes.indexOf(item) >= 0;
  }
  function edgeValid (pair) {
    return exists(pair[0]) && exists(pair[1]);
  }
  function cleanup () {
    var index = that.edges.length;
    while (index--)
      if (!edgeValid(that.edges[index]))
        that.edges.splice(index, 1);
  }
  this.remove = function (index) {
    function removeItem (item, index) {
      that.children(item).forEach(removeItem);
      that.nodes.splice(index, 1);
    }
    that.removeItem(that.get(index), index);
    cleanup();
  };
  this.children = function (item) {
    function isChild (pair) { return pair[0] === item; }
    function from    (pair) { return pair[0]; }
    return that.edges.filter(isChild).map(from);
  }
}

function main () {
  var state = {};
  var clipboard = [];

  function node(name) {
    if (!state.hasOwnProperty(name)) {
      state[name] = {name: name};
    }
    return state[name];
  }
  function edge(nameA, nameB) {
    return [node(nameA), node(nameB)];
  }

  var tree1 = new Graph({
    nodes: ['a','b','c','d','e','f','g','h'].map(node),
    edges: [['c', 'b'], ['d', 'b'], ['e', 'd'], ['g', 'f']].map(edge)
  });

  var tree2 = new NestedList([
    {name: 'a', children: []},
    {name: 'b', children: [
      {name: 'c', children: []},
      {name: 'd', children: [
        {name: 'e', children: []},
      ]},
    ]},
    {name: 'f', children: [
      {name: 'g', children: []}
    ]},
    {name: 'h', children: []},
  ]);

  tree1.synced = [tree2];
  tree2.synced = [tree1];

  tree2.remove([1, 1]);

  return tree2;
}

module.exports.main = main;

// var t = require('./ListsTrees.js').main()
