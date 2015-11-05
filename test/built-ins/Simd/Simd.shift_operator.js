// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/
// Compare shift op's behavior to ref op at each lane.
function testShiftOp(type, op, refOp) {
  assert.sameValue('function', typeof type.fn[op]);
  var zero = type.fn();
  for (var v of type.interestingValues) {
    var s = type.laneSize * 8;
    for (var bits of [-1, 0, 1, 2, s - 1, s, s + 1]) {
      var expected = simdConvert(type, refOp(simdConvert(type, v), bits));
      var a = type.fn.splat(v);
      var result = type.fn[op](a, bits);
      checkValue(type, result, function(index) { return expected; });
    }
  }
}

simdTypes.filter(isIntType).forEach(function(type) {
  test(type.name + ' shiftLeftByScalar', function() {
    function shift(a, bits) {
      if (bits>>>0 >= type.laneSize * 8) return 0;
      return a << bits;
    }
    testShiftOp(type, 'shiftLeftByScalar', shift);
  });
});

simdTypes.filter(isSignedIntType).forEach(function(type) {
  test(type.name + ' shiftRightByScalar', function() {
    function shift(a, bits) {
      if (bits>>>0 >= type.laneSize * 8)
        bits = type.laneSize * 8 - 1;
      return a >> bits;
    }
    testShiftOp(type, 'shiftRightByScalar', shift);
  });
});

simdTypes.filter(isUnsignedIntType).forEach(function(type) {
  test(type.name + ' shiftRightByScalar', function() {
    function shift(a, bits) {
      if (bits>>>0 >= type.laneSize * 8) return 0;
      if (type.laneMask)
        a &= type.laneMask;
      return a >>> bits;
    }
    testShiftOp(type, 'shiftRightByScalar', shift);
  });
});

