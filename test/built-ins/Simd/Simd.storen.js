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
description: Tests Simdstore functions.
includes: [simdUtilities.js]
---*/

function testStore(type, name, count) {
  var storeFn = type.fn[name];
  assert.sameValue('function', typeof storeFn);
  var bufLanes = 2 * type.lanes;  // Test all alignments.
  var bufSize = bufLanes * type.laneSize + 8;  // Extra for over-alignment test.
  var ab = new ArrayBuffer(bufSize);
  var buf = new type.view(ab);
  var a = createTestValue(type); // Value containing 0, 1, 2, 3 ...
  function checkBuffer(offset) {
    for (var i = 0; i < count; i++)
      if (buf[offset + i] != i) return false;
    return true;
  }
  // Test aligned stores.
  for (var i = 0; i < type.lanes; i++) {
    storeFn(buf, i, a);
    ok(checkBuffer(i));
  }
  // Test the 2 over-alignments.
  var f64 = new Float64Array(ab);
  var stride = 8 / type.laneSize;
  for (var i = 0; i < 1; i++) {
    storeFn(f64, i, a);
    ok(checkBuffer(stride * i));
  }
  // Test the 7 mis-alignments.
  var i8 = new Int8Array(ab);
  for (var misalignment = 1; misalignment < 8; misalignment++) {
    storeFn(i8, misalignment, a);
    // Shift the buffer down by misalignment.
    for (var i = 0; i < i8.length - misalignment; i++)
      i8[i] = i8[i + misalignment];
    ok(checkBuffer(0));
  }

  function testIndexCheck(buf, index) {
    throws(function () { storeFn(buf, index, type.fn()); });
  }
  testIndexCheck(buf, -1);
  testIndexCheck(buf, bufSize / type.laneSize - count + 1);
  testIndexCheck(buf.buffer, 1);
  testIndexCheck(buf, "a");
}

simdTypes.filter(isNumerical).forEach(function(type) {
  testSimdFunction(type.name + ' store', function() {
    testStore(type, 'store', type.lanes);
  });
});

simdTypes.filter(hasLoadStore123).forEach(function(type) {
  testSimdFunction(type.name + ' store1', function() {
    testStore(type, 'store1', 1);
  });
  testSimdFunction(type.name + ' store1', function() {
    testStore(type, 'store2', 2);
  });
  testSimdFunction(type.name + ' store3', function() {
    testStore(type, 'store3', 3);
  });
});

