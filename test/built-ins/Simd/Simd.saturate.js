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
description: Tests saturate methods.
includes: [simdUtilities.js]
---*/

simdTypes.filter(isSmallIntType).forEach(function(type) {
  function saturate(type, a) {
    if (a < type.minVal) return type.minVal;
    if (a > type.maxVal) return type.maxVal;
    return a;
  }
  testSimdFunction(type.name + ' addSaturate', function() {
    testBinaryOp(type, 'addSaturate', function(a, b) { return saturate(type, a + b); });
  });
  testSimdFunction(type.name + ' subSaturate', function() {
    testBinaryOp(type, 'subSaturate', function(a, b) { return saturate(type, a - b); });
  });
});

