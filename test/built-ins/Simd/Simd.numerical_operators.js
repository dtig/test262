// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/
simdTypes.filter(isNumerical).forEach(function(type) {
  test(type.name + ' equal', function() {
    testRelationalOp(type, 'equal', function(a, b) { return a == b; });
  });
  test(type.name + ' notEqual', function() {
    testRelationalOp(type, 'notEqual', function(a, b) { return a != b; });
  });
  test(type.name + ' lessThan', function() {
    testRelationalOp(type, 'lessThan', function(a, b) { return a < b; });
  });
  test(type.name + ' lessThanOrEqual', function() {
    testRelationalOp(type, 'lessThanOrEqual', function(a, b) { return a <= b; });
  });
  test(type.name + ' greaterThan', function() {
    testRelationalOp(type, 'greaterThan', function(a, b) { return a > b; });
  });
  test(type.name + ' greaterThanOrEqual', function() {
    testRelationalOp(type, 'greaterThanOrEqual', function(a, b) { return a >= b; });
  });
  test(type.name + ' add', function() {
    testBinaryOp(type, 'add', function(a, b) { return a + b; });
  });
  test(type.name + ' sub', function() {
    testBinaryOp(type, 'sub', function(a, b) { return a - b; });
  });
  test(type.name + ' mul', function() {
    testBinaryOp(type, 'mul', type.mulFn);
  });
});

