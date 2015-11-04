// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
simdTypes.filter(isLogical).forEach(function(type) {
  test(type.name + ' and', function() {
    testBinaryOp(type, 'and', function(a, b) { return a & b; });
  });
  test(type.name + ' or', function() {
    testBinaryOp(type, 'or', function(a, b) { return a | b; });
  });
  test(type.name + ' xor', function() {
    testBinaryOp(type, 'xor', function(a, b) { return a ^ b; });
  });
});

