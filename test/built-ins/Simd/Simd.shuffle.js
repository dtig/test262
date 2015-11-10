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
description: Tests SIMD shuffle.
includes: [simdUtilities.js]
---*/

function testShuffle(type) {
  assert.sameValue('function', typeof type.fn.shuffle);
  var indices = [];
  for (var i = 0; i < type.lanes; i++) indices.push(i);

  var a = type.fn.apply(type.fn, indices);            // 0, 1, 2, 3, 4 ...
  var b = type.fn.add(a, type.fn.splat(type.lanes));  // lanes, lanes+1 ...
  // All lanes from a.
  var result = type.fn.shuffle.apply(type.fn, [a, b].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(a, index); });
  // One lane from b.
  for (var i = 0; i < type.lanes; i++) {
    var args = [a, b].concat(indices);
    args[2 + i] += type.lanes;
    var result = type.fn.shuffle.apply(type.fn, args);
    checkValue(type, result, function(index) {
      var val = index == i ? b : a;
      return type.fn.extractLane(val, index);
    });
  }
  // All lanes from b.
  for (var i = 0; i < type.lanes; i++) indices[i] += type.lanes;
  var result = type.fn.shuffle.apply(type.fn, [a, b].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(b, index); });

  function testIndexCheck(index) {
    for (var i = 0; i < type.lanes; i++) {
      var args = [a, b].concat(indices);
      args[i + 2] = index;
      throws(function() { type.fn.shuffle.apply(type.fn, args); });
    }
  }
  testIndexCheck(2 * type.lanes);
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
  testSimdFunction(type.name + ' shuffle', function() {
    testShuffle(type);
  });
});
