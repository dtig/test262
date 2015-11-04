// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
function testAnyTrue(type) {
  isEqual('function', typeof type.fn.anyTrue);
  // All lanes 'false'.
  var a = type.fn.splat(false);
  ok(!type.fn.anyTrue(a));
  // One lane 'true'.
  for (var i = 0; i < type.lanes; i++) {
    a = type.fn.replaceLane(a, i, true);
    ok(type.fn.anyTrue(a));
  }
  // All lanes 'true'.
  a = type.fn.splat(true);
  ok(type.fn.anyTrue(a));
}

simdTypes.filter(isBoolType).forEach(function(type) {
  test(type.name + ' anyTrue', function() {
    testAnyTrue(type, 'anyTrue');
  });
});
