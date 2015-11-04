// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
function testAllTrue(type) {
  isEqual('function', typeof type.fn.allTrue);
  // All lanes 'true'.
  var a = type.fn.splat(true);
  ok(type.fn.allTrue(a));
  // One lane 'false'.
  for (var i = 0; i < type.lanes; i++) {
    a = type.fn.replaceLane(a, i, false);
    ok(!type.fn.allTrue(a));
  }
  // All lanes 'false'.
  a = type.fn.splat(false);
  ok(!type.fn.allTrue(a));
}

simdTypes.filter(isBoolType).forEach(function(type) {
  test(type.name + ' allTrue', function() {
    testAllTrue(type, 'allTrue');
  });
});
