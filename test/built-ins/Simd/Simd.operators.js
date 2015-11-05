// Copyright information

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
