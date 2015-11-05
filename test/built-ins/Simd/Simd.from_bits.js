// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/
// From<type>Bits functions.
function testFromBits(toType, fromType, name) {
  assert.sameValue('function', typeof toType.fn[name]);
  for (var v of fromType.interestingValues) {
    var fromValue = createSplatValue(fromType, v);
    var result = toType.fn[name](fromValue);
    for (var i = 0; i < fromType.lanes; i++)
      fromType.buffer[i] = fromType.fn.extractLane(fromValue, i);
    checkValue(toType, result, function(index) { return toType.buffer[index]; });
  }
}

simdTypes.forEach(function(toType) {
  if (!toType.fromBits) return;
  for (var fromType of toType.fromBits) {
    var fn = 'from' + fromType.name + 'Bits';
    test(toType.name + ' ' + fn, function() {
      testFromBits(toType, fromType, fn);
    });
  }
});

