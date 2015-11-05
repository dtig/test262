// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/

function testCheck(type) {
  assert.sameValue('function', typeof type.fn.check);
  // Other SIMD types shouldn't check for this type.
  var a = type.fn();
  for (var otherType of simdTypes) {
    if (otherType === type)
      assert.sameValue(a, type.fn.check(a));
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
