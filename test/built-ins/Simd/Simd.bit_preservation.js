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

test('Float32x4 Int32x4 load/store bit preservation', function() {
   // NaNs should stay unmodified when storing and loading to Float32Array
  var taf32 = new Float32Array(4);
  var tai32 = new Int32Array(4);
  var i4a, i4b;
  i4a = SIMD.Int32x4(0x7fc00000,0x7fe00000,0x7ff00000,0x7ff80000);
  SIMD.Int32x4.store(taf32, 0, i4a);
  i4b = SIMD.Int32x4.load(taf32, 0);
  equalInt32x4(i4a, i4b);

  // NaNs should stay unmodified when loading as Float32x4 and storing as Int32x4
  SIMD.Int32x4.store(taf32, 0, i4a);
  var f4 = SIMD.Float32x4.load(taf32, 0);
  SIMD.Float32x4.store(tai32, 0, f4);
  i4b = SIMD.Int32x4.load(tai32, 0);
  equalInt32x4(i4a, i4b);
});
