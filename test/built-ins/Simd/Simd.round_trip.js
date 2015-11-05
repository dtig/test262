// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/

test('Float32x4 Int32x4 round trip', function() {
  // NaNs should stay unmodified across bit conversions
  var m = SIMD.Int32x4(0xFFFFFFFF, 0xFFFF0000, 0x80000000, 0x0);
  var m2 = SIMD.Int32x4.fromFloat32x4Bits(SIMD.Float32x4.fromInt32x4Bits(m));
  // NaNs may be canonicalized, so these tests may fail in some implementations.
  equalInt32x4(m, m2);
});

