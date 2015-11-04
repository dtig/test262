// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
simdTypes.filter(isSigned).forEach(function(type) {
  test(type.name + ' neg', function() {
    testUnaryOp(type, 'neg', function(a) { return -a; });
  });
});

