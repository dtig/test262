// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/
// Test the constructor and splat with the given lane values.
function testConstructor(type) {
  assert.sameValue('function', typeof type.fn);
  assert.sameValue('function', typeof type.fn.splat);
  for (var v of type.interestingValues) {
    var expected = simdConvert(type, v);
    var result = createSplatValue(type, v);
    checkValue(type, result, function(index) { return expected; });
    // splat.
    result = type.fn.splat(v);
    checkValue(type, result, function(index) { return expected; });
  }
}

simdTypes.forEach(function(type) {
  test(type.name + ' constructor', function() {
    testConstructor(type);
  });
});
