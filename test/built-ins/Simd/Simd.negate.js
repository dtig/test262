// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/
simdTypes.filter(isSigned).forEach(function(type) {
  test(type.name + ' neg', function() {
    testUnaryOp(type, 'neg', function(a) { return -a; });
  });
});

