// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
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

  isEqual(inst[0], undefined);
  isEqual(inst.a, undefined);
  isEqual(!inst, false);
  isEqual(!inst, false);
  isEqual(inst ? 1 : 2, 1);
  isEqual(inst ? 1 : 2, 1);

  isEqual('function', typeof inst.toString);
  isEqual(inst.toString(), simdToString(type, inst));
  isEqual('function', typeof inst.toLocaleString);
  isEqual(inst.toLocaleString(), simdToLocaleString(type, inst));
  // TODO: test valueOf?
}

simdTypes.forEach(function(type) {
  test(type.name + ' operators', function() {
    testOperators(type);
  });
});
