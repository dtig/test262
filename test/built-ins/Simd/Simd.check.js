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
description: Checks if a SIMDTypeDescriptor is not a SIMDDescriptor.
includes: [simdUtilities.js]
---*/

function testCheck(type) {
  assert.sameValue('function', typeof type.fn.check);
  // Other SIMD types shouldn't check for this type.
  var a = type.fn();
  for (var otherType of simdTypes) {
    if (otherType === type)
      assert.sameValue(a, type.fn.check(a));
    else
      throws(function() { otherType.check(a); });
  }
  // Neither should other types.
  for (var x of [ {}, "", 0, 1, true, false, undefined, null, NaN, Infinity]) {
    throws(function() { type.fn.check(x); });
  }
}

simdTypes.forEach(function(type) {
  testSimdFunction(type.name + ' check', function() {
    testCheck(type);
  });
});
