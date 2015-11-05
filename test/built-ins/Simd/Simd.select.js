// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/
function testSelect(type) {
  assert.sameValue('function', typeof type.fn.select);
  // set a and b to values that are different for all numerical types.
  var av = 1;
  var bv = 2;
  var a = type.fn.splat(av);
  var b = type.fn.splat(bv);
  // test all selectors with a single 'true' lane.
  for (var i = 0; i < type.lanes; i++) {
    var selector = type.boolType.fn();
    selector = type.boolType.fn.replaceLane(selector, i, true);
    var result = type.fn.select(selector, a, b);
    checkValue(type, result, function(index) { return index == i ? av : bv; });
  }
}

simdTypes.filter(isNumerical).forEach(function(type) {
  test(type.name + ' select', function() {
    testSelect(type);
  });
});
