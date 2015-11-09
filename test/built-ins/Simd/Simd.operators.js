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
function testOperators(type) {
  var inst = createTestValue(type);
  throws(function() { Number(inst) });
  throws(function() { +inst });
  throws(function() { -inst });
  throws(function() { ~inst });
  throws(function() { Math.fround(inst) });
  throws(function() { inst|0} );
  throws(function() { inst&0 });
  throws(function() { inst^0 });
  throws(function() { inst>>>0 });
  throws(function() { inst>>0 });
  throws(function() { inst<<0 });
  throws(function() { (inst + inst) });
  throws(function() { inst - inst });
  throws(function() { inst * inst });
  throws(function() { inst / inst });
  throws(function() { inst % inst });
  throws(function() { inst < inst });
  throws(function() { inst > inst });
  throws(function() { inst <= inst });
  throws(function() { inst >= inst });
  throws(function() { inst(); });

  assert.sameValue(inst[0], undefined);
  assert.sameValue(inst.a, undefined);
  assert.sameValue(!inst, false);
  assert.sameValue(!inst, false);
  assert.sameValue(inst ? 1 : 2, 1);
  assert.sameValue(inst ? 1 : 2, 1);

  assert.sameValue('function', typeof inst.toString);
  assert.sameValue(inst.toString(), simdToString(type, inst));
  assert.sameValue('function', typeof inst.toLocaleString);
  assert.sameValue(inst.toLocaleString(), simdToLocaleString(type, inst));
  // TODO: test valueOf?
}

simdTypes.forEach(function(type) {
  test(type.name + ' operators', function() {
    testOperators(type);
  });
});
