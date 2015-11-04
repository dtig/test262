// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
test('Float32x4 Int32x4 bit conversion', function() {
  var m = SIMD.Int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.Float32x4.fromInt32x4Bits(m);
  isEqual(1.0, SIMD.Float32x4.extractLane(n, 0));
  isEqual(2.0, SIMD.Float32x4.extractLane(n, 1));
  isEqual(3.0, SIMD.Float32x4.extractLane(n, 2));
  isEqual(4.0, SIMD.Float32x4.extractLane(n, 3));
  n = SIMD.Float32x4(5.0, 6.0, 7.0, 8.0);
  m = SIMD.Int32x4.fromFloat32x4Bits(n);
  isEqual(0x40A00000, SIMD.Int32x4.extractLane(m, 0));
  isEqual(0x40C00000, SIMD.Int32x4.extractLane(m, 1));
  isEqual(0x40E00000, SIMD.Int32x4.extractLane(m, 2));
  isEqual(0x41000000, SIMD.Int32x4.extractLane(m, 3));
  // Flip sign using bit-wise operators.
  n = SIMD.Float32x4(9.0, 10.0, 11.0, 12.0);
  m = SIMD.Int32x4(0x80000000, 0x80000000, 0x80000000, 0x80000000);
  var nMask = SIMD.Int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.Int32x4.xor(nMask, m); // flip sign.
  n = SIMD.Float32x4.fromInt32x4Bits(nMask);
  isEqual(-9.0, SIMD.Float32x4.extractLane(n, 0));
  isEqual(-10.0, SIMD.Float32x4.extractLane(n, 1));
  isEqual(-11.0, SIMD.Float32x4.extractLane(n, 2));
  isEqual(-12.0, SIMD.Float32x4.extractLane(n, 3));
  nMask = SIMD.Int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.Int32x4.xor(nMask, m); // flip sign.
  n = SIMD.Float32x4.fromInt32x4Bits(nMask);
  isEqual(9.0, SIMD.Float32x4.extractLane(n, 0));
  isEqual(10.0, SIMD.Float32x4.extractLane(n, 1));
  isEqual(11.0, SIMD.Float32x4.extractLane(n, 2));
  isEqual(12.0, SIMD.Float32x4.extractLane(n, 3));
});
