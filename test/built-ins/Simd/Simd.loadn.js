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
function testLoad(type, name, count) {
  var loadFn = type.fn[name];
  assert.sameValue('function', typeof loadFn);
  var bufLanes = 2 * type.lanes;  // Test all alignments.
  var bufSize = bufLanes * type.laneSize + 8;  // Extra for over-alignment test.
  var ab = new ArrayBuffer(bufSize);
  var buf = new type.view(ab);
  for (var i = 0; i < bufLanes; i++) buf[i] = i; // Number buffer sequentially.
  // Test aligned loads.
  for (var i = 0; i < type.lanes; i++) {
    var a = loadFn(buf, i);
    checkValue(type, a, function(index) { return index < count ? i + index : 0; });
  }
  // Test the 2 possible over-alignments.
  var f64 = new Float64Array(ab);
  var stride = 8 / type.laneSize;
  for (var i = 0; i < 1; i++) {
    var a = loadFn(f64, i);
    checkValue(type, a, function(index) { return index < count ? stride * i + index : 0; });
  }
  // Test the 7 possible mis-alignments.
  var i8 = new Int8Array(ab);
  for (var misalignment = 1; misalignment < 8; misalignment++) {
    // Shift the buffer up by 1 byte.
    for (var i = i8.length - 1; i > 0; i--)
      i8[i] = i8[i - 1];
    var a = loadFn(i8, misalignment);
    checkValue(type, a, function(index) { return index < count ? i + index : 0; });
  }

  function testIndexCheck(buf, index) {
    throws(function () { loadFn(buf, index); });
  }
  testIndexCheck(buf, -1);
  testIndexCheck(buf, bufSize / type.laneSize - count + 1);
  testIndexCheck(buf.buffer, 1);
  testIndexCheck(buf, "a");
}

simdTypes.filter(isNumerical).forEach(function(type) {
  test(type.name + ' load', function() {
    testLoad(type, 'load', type.lanes);
  });
});

simdTypes.filter(hasLoadStore123).forEach(function(type) {
  test(type.name + ' load1', function() {
    testLoad(type, 'load1', 1);
  });
  test(type.name + ' load2', function() {
    testLoad(type, 'load2', 2);
  });
  test(type.name + ' load3', function() {
    testLoad(type, 'load3', 3);
  });
});
