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
description: Tests SIMD Select.
includes: [simdUtilities.js]
---*/

function testSelect(type) {
  assert.sameValue('function', typeof type.fn.select);
  // set a and b to values that are different for all numerical types.
  var av = 1;
  var bv = 2;
  var a = type.fn.splat(av);
  var b = type.fn.splat(bv);
  // test all selectors with a single 'true' lane.
  for (var i = 0; i < type.lanes; i++) {
    var selector = type.boolType.fn();
    selector = type.boolType.fn.replaceLane(selector, i, true);
    var result = type.fn.select(selector, a, b);
    checkValue(type, result, function(index) { return index == i ? av : bv; });
  }
}

simdTypes.filter(isNumerical).forEach(function(type) {
  testSimdFunction(type.name + ' select', function() {
    testSelect(type);
  });
});
