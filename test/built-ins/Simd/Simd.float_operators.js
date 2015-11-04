// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
simdTypes.filter(isFloatType).forEach(function(type) {
  test(type.name + ' div', function() {
    testBinaryOp(type, 'div', function(a, b) { return a / b; });
  });
  test(type.name + ' abs', function() {
    testBinaryOp(type, 'abs', Math.abs);
  });
  test(type.name + ' min', function() {
    testBinaryOp(type, 'min', Math.min);
  });
  test(type.name + ' max', function() {
    testBinaryOp(type, 'max', Math.max);
  });
  test(type.name + ' minNum', function() {
    testBinaryOp(type, 'minNum', minNum);
  });
  test(type.name + ' maxNum', function() {
    testBinaryOp(type, 'maxNum', maxNum);
  });
  test(type.name + ' sqrt', function() {
    testUnaryOp(type, 'sqrt', function(a) { return Math.sqrt(a); });
  });
  test(type.name + ' reciprocalApproximation', function() {
    testUnaryOp(type, 'reciprocalApproximation', function(a) { return 1 / a; });
  });
  test(type.name + ' reciprocalSqrtApproximation', function() {
    testUnaryOp(type, 'reciprocalSqrtApproximation', function(a) { return 1 / Math.sqrt(a); });
  });
})

