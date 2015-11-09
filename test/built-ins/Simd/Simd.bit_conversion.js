//  Copyright (C) 2015
//
//  This software is provided 'as-is', without any express or implied
//  warranty.  In no event will the authors be held liable for any damages
//  arising from the use of this software.
//
//  Permission is granted to anyone to use this software for any purpose,
//  including commercial applications, and to alter it and redistribute it
//  freely, subject to the following restrictions:
//
//  1. The origin of this software must not be misrepresented; you must not
//     claim that you wrote the original software. If you use this software
//     in a product, an acknowledgment in the product documentation would be
//     appreciated but is not required.
//  2. Altered source versions must be plainly marked as such, and must not be
//     misrepresented as being the original software.
//  3. This notice may not be removed or altered from any source distribution.
/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/

test('Float32x4 Int32x4 bit conversion', function() {
  var m = SIMD.Int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.Float32x4.fromInt32x4Bits(m);
  assert.sameValue(1.0, SIMD.Float32x4.extractLane(n, 0));
  assert.sameValue(2.0, SIMD.Float32x4.extractLane(n, 1));
  assert.sameValue(3.0, SIMD.Float32x4.extractLane(n, 2));
  assert.sameValue(4.0, SIMD.Float32x4.extractLane(n, 3));
  n = SIMD.Float32x4(5.0, 6.0, 7.0, 8.0);
  m = SIMD.Int32x4.fromFloat32x4Bits(n);
  assert.sameValue(0x40A00000, SIMD.Int32x4.extractLane(m, 0));
  assert.sameValue(0x40C00000, SIMD.Int32x4.extractLane(m, 1));
  assert.sameValue(0x40E00000, SIMD.Int32x4.extractLane(m, 2));
  assert.sameValue(0x41000000, SIMD.Int32x4.extractLane(m, 3));
  // Flip sign using bit-wise operators.
  n = SIMD.Float32x4(9.0, 10.0, 11.0, 12.0);
  m = SIMD.Int32x4(0x80000000, 0x80000000, 0x80000000, 0x80000000);
  var nMask = SIMD.Int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.Int32x4.xor(nMask, m); // flip sign.
  n = SIMD.Float32x4.fromInt32x4Bits(nMask);
  assert.sameValue(-9.0, SIMD.Float32x4.extractLane(n, 0));
  assert.sameValue(-10.0, SIMD.Float32x4.extractLane(n, 1));
  assert.sameValue(-11.0, SIMD.Float32x4.extractLane(n, 2));
  assert.sameValue(-12.0, SIMD.Float32x4.extractLane(n, 3));
  nMask = SIMD.Int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.Int32x4.xor(nMask, m); // flip sign.
  n = SIMD.Float32x4.fromInt32x4Bits(nMask);
  assert.sameValue(9.0, SIMD.Float32x4.extractLane(n, 0));
  assert.sameValue(10.0, SIMD.Float32x4.extractLane(n, 1));
  assert.sameValue(11.0, SIMD.Float32x4.extractLane(n, 2));
  assert.sameValue(12.0, SIMD.Float32x4.extractLane(n, 3));
});
