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
function testAnyTrue(type) {
  assert.sameValue('function', typeof type.fn.anyTrue);
  // All lanes 'false'.
  var a = type.fn.splat(false);
  ok(!type.fn.anyTrue(a));
  // One lane 'true'.
  for (var i = 0; i < type.lanes; i++) {
    a = type.fn.replaceLane(a, i, true);
    ok(type.fn.anyTrue(a));
  }
  // All lanes 'true'.
  a = type.fn.splat(true);
  ok(type.fn.anyTrue(a));
}

simdTypes.filter(isBoolType).forEach(function(type) {
  test(type.name + ' anyTrue', function() {
    testAnyTrue(type, 'anyTrue');
  });
});
