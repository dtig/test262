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
description: Test Shift operations.
includes: [simdUtilities.js]
---*/

// Compare shift op's behavior to ref op at each lane.
function testShiftOp(type, op, refOp) {
  assert.sameValue('function', typeof type.fn[op]);
  var zero = type.fn();
  for (var v of type.interestingValues) {
    var s = type.laneSize * 8;
    for (var bits of [-1, 0, 1, 2, s - 1, s, s + 1]) {
      var expected = simdConvert(type, refOp(simdConvert(type, v), bits));
      var a = type.fn.splat(v);
      var result = type.fn[op](a, bits);
      checkValue(type, result, function(index) { return expected; });
    }
  }
}

simdTypes.filter(isIntType).forEach(function(type) {
  testSimdFunction(type.name + ' shiftLeftByScalar', function() {
    function shift(a, bits) {
      if (bits>>>0 >= type.laneSize * 8) return 0;
      return a << bits;
    }
    testShiftOp(type, 'shiftLeftByScalar', shift);
  });
});

simdTypes.filter(isSignedIntType).forEach(function(type) {
  testSimdFunction(type.name + ' shiftRightByScalar', function() {
    function shift(a, bits) {
      if (bits>>>0 >= type.laneSize * 8)
        bits = type.laneSize * 8 - 1;
      return a >> bits;
    }
    testShiftOp(type, 'shiftRightByScalar', shift);
  });
});

simdTypes.filter(isUnsignedIntType).forEach(function(type) {
  testSimdFunction(type.name + ' shiftRightByScalar', function() {
    function shift(a, bits) {
      if (bits>>>0 >= type.laneSize * 8) return 0;
      if (type.laneMask)
        a &= type.laneMask;
      return a >>> bits;
    }
    testShiftOp(type, 'shiftRightByScalar', shift);
  });
});

