function arbWhole(size) {
    return Math.floor(Math.random() * size);
}

function arbInt(size) {
    return arbWhole(2 * size) - size;
}

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

console.log(arbList(arbList(arbList(arbWhole)))(7));
