// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/
simdTypes.filter(isSmallIntType).forEach(function(type) {
  function saturate(type, a) {
    if (a < type.minVal) return type.minVal;
    if (a > type.maxVal) return type.maxVal;
    return a;
  }
  test(type.name + ' addSaturate', function() {
    testBinaryOp(type, 'addSaturate', function(a, b) { return saturate(type, a + b); });
  });
  test(type.name + ' subSaturate', function() {
    testBinaryOp(type, 'subSaturate', function(a, b) { return saturate(type, a - b); });
  });
});

