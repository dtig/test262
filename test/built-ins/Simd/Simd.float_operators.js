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
description: Test floating point SIMD operations.
includes: [simdUtilities.js]
---*/
simdTypes.filter(isFloatType).forEach(function(type) {
  testSimdFunction(type.name + ' div', function() {
    testBinaryOp(type, 'div', function(a, b) { return a / b; });
  });
  testSimdFunction(type.name + ' abs', function() {
    testBinaryOp(type, 'abs', Math.abs);
  });
  testSimdFunction(type.name + ' min', function() {
    testBinaryOp(type, 'min', Math.min);
  });
  testSimdFunction(type.name + ' max', function() {
    testBinaryOp(type, 'max', Math.max);
  });
  testSimdFunction(type.name + ' minNum', function() {
    testBinaryOp(type, 'minNum', minNum);
  });
  testSimdFunction(type.name + ' maxNum', function() {
    testBinaryOp(type, 'maxNum', maxNum);
  });
  testSimdFunction(type.name + ' sqrt', function() {
    testUnaryOp(type, 'sqrt', function(a) { return Math.sqrt(a); });
  });
  testSimdFunction(type.name + ' reciprocalApproximation', function() {
    testUnaryOp(type, 'reciprocalApproximation', function(a) { return 1 / a; });
  });
  testSimdFunction(type.name + ' reciprocalSqrtApproximation', function() {
    testUnaryOp(type, 'reciprocalSqrtApproximation', function(a) { return 1 / Math.sqrt(a); });
  });
})

