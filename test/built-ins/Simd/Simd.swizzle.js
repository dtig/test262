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
description: Tests Simd swizzle.
includes: [simdUtilities.js]
---*/

function testSwizzle(type) {
  assert.sameValue('function', typeof type.fn.swizzle);
  var a = createTestValue(type);  // 0, 1, 2, 3, 4, 5, 6, ...
  var indices = [];
  // Identity swizzle.
  for (var i = 0; i < type.lanes; i++) indices.push(i);
  var result = type.fn.swizzle.apply(type.fn, [a].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(a, index); });
  // Reverse swizzle.
  indices.reverse();
  var result = type.fn.swizzle.apply(type.fn, [a].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(a, type.lanes - index - 1); });

  function testIndexCheck(index) {
    for (var i = 0; i < type.lanes; i++) {
      var args = [a].concat(indices);
      args[i + 1] = index;
      throws(function() { type.fn.swizzle.apply(type.fn, args); });
    }
  }
  testIndexCheck(type.lanes);
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(128);
}

simdTypes.filter(isNumerical).forEach(function(type) {
  testSimdFunction(type.name + ' swizzle', function() {
    testSwizzle(type);
  });
});
