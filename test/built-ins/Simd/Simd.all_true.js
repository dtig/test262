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
description: AllTrue returns true if all the SIMDElements are true.
includes: [simdUtilities.js]
---*/

function testAllTrue(type) {
  assert.sameValue('function', typeof type.fn.allTrue);
  // All lanes 'true'.
  var a = type.fn.splat(true);
  ok(type.fn.allTrue(a));
  // One lane 'false'.
  for (var i = 0; i < type.lanes; i++) {
    a = type.fn.replaceLane(a, i, false);
    ok(!type.fn.allTrue(a));
  }
  // All lanes 'false'.
  a = type.fn.splat(false);
  ok(!type.fn.allTrue(a));
}

simdTypes.filter(isBoolType).forEach(function(type) {
  testSimdFunction(type.name + ' allTrue', function() {
    testAllTrue(type, 'allTrue');
  });
});
