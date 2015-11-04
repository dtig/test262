// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
simdTypes.filter(isIntType).forEach(function(type) {
  test(type.name + ' not', function() {
    testUnaryOp(type, 'not', function(a) { return ~a; });
  });
});

simdTypes.filter(isBoolType).forEach(function(type) {
  test(type.name + ' not', function() {
    testUnaryOp(type, 'not', function(a) { return !a; });
  });
});

