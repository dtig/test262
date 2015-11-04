// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
// From<type> functions.
function testFrom(toType, fromType, name) {
  isEqual('function', typeof toType.fn[name]);
  for (var v of fromType.interestingValues) {
    var fromValue = createSplatValue(fromType, v);
    v = simdConvert(fromType, v);
    if (toType.minVal !== undefined &&
        (v < toType.minVal || v > toType.maxVal)) {
      throws(function() { toType.fn[name](fromValue) });
    } else {
      v = simdConvert(toType, v);
      var result = toType.fn[name](fromValue);
      checkValue(toType, result, function(index) { return v; });
    }
  }
}

simdTypes.forEach(function(toType) {
  if (!toType.from) return;
  for (var fromType of toType.from) {
    var fn = 'from' + fromType.name;
    test(toType.name + ' ' + fn, function() {
      testFrom(toType, fromType, fn);
    });
  }
});

