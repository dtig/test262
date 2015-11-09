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
// From<type>Bits functions.
function testFromBits(toType, fromType, name) {
  assert.sameValue('function', typeof toType.fn[name]);
  for (var v of fromType.interestingValues) {
    var fromValue = createSplatValue(fromType, v);
    var result = toType.fn[name](fromValue);
    for (var i = 0; i < fromType.lanes; i++)
      fromType.buffer[i] = fromType.fn.extractLane(fromValue, i);
    checkValue(toType, result, function(index) { return toType.buffer[index]; });
  }
}

simdTypes.forEach(function(toType) {
  if (!toType.fromBits) return;
  for (var fromType of toType.fromBits) {
    var fn = 'from' + fromType.name + 'Bits';
    test(toType.name + ' ' + fn, function() {
      testFromBits(toType, fromType, fn);
    });
  }
});

