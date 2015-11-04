// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
function testCheck(type) {
  isEqual('function', typeof type.fn.check);
  // Other SIMD types shouldn't check for this type.
  var a = type.fn();
  for (var otherType of simdTypes) {
    if (otherType === type)
      isEqual(a, type.fn.check(a));
    else
      throws(function() { otherType.check(a); });
  }
  // Neither should other types.
  for (var x of [ {}, "", 0, 1, true, false, undefined, null, NaN, Infinity]) {
    throws(function() { type.fn.check(x); });
  }
}

simdTypes.forEach(function(type) {
  test(type.name + ' check', function() {
    testCheck(type);
  });
});
