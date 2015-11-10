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
description: Tests SIMD ReplaceLane.
includes: [simdUtilities.js]
---*/

function testReplaceLane(type) {
  assert.sameValue('function', typeof type.fn.replaceLane);
  var a = createTestValue(type);
  for (var v of type.interestingValues) {
    var expected = simdConvert(type, v);
    for (var i = 0; i < type.lanes; i++) {
      var result = type.fn.replaceLane(a, i, v);
      checkValue(type, result,
                 function(index) {
                   return index == i ? expected : type.fn.extractLane(a, index);
                 });
    }
  }

  function testIndexCheck(index) {
    throws(function() { type.fn.replaceLane(a, index, 0); });
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

simdTypes.forEach(function(type) {
  testSimdFunction(type.name + ' replaceLane', function() {
    testReplaceLane(type);
  });
});

