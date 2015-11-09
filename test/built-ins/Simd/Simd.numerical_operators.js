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
simdTypes.filter(isNumerical).forEach(function(type) {
  test(type.name + ' equal', function() {
    testRelationalOp(type, 'equal', function(a, b) { return a == b; });
  });
  test(type.name + ' notEqual', function() {
    testRelationalOp(type, 'notEqual', function(a, b) { return a != b; });
  });
  test(type.name + ' lessThan', function() {
    testRelationalOp(type, 'lessThan', function(a, b) { return a < b; });
  });
  test(type.name + ' lessThanOrEqual', function() {
    testRelationalOp(type, 'lessThanOrEqual', function(a, b) { return a <= b; });
  });
  test(type.name + ' greaterThan', function() {
    testRelationalOp(type, 'greaterThan', function(a, b) { return a > b; });
  });
  test(type.name + ' greaterThanOrEqual', function() {
    testRelationalOp(type, 'greaterThanOrEqual', function(a, b) { return a >= b; });
  });
  test(type.name + ' add', function() {
    testBinaryOp(type, 'add', function(a, b) { return a + b; });
  });
  test(type.name + ' sub', function() {
    testBinaryOp(type, 'sub', function(a, b) { return a - b; });
  });
  test(type.name + ' mul', function() {
    testBinaryOp(type, 'mul', type.mulFn);
  });
});

