// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js, simdUtilityFunctions.js, testSimdFunction.js]
---*/
function testSwizzle(type) {
  isEqual('function', typeof type.fn.swizzle);
  var a = createTestValue(type);  // 0, 1, 2, 3, 4, 5, 6, ...
  var indices = [];
  // Identity swizzle.
  for (var i = 0; i < type.lanes; i++) indices.push(i);
  var result = type.fn.swizzle.apply(type.fn, [a].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(a, index); });
  // Reverse swizzle.
  indices.reverse();
  var result = type.fn.swizzle.apply(type.fn, [a].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(a, type.lanes - index - 1); });

  function testIndexCheck(index) {
    for (var i = 0; i < type.lanes; i++) {
      var args = [a].concat(indices);
      args[i + 1] = index;
      throws(function() { type.fn.swizzle.apply(type.fn, args); });
    }
  }
  testIndexCheck(type.lanes);
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(128);
}

simdTypes.filter(isNumerical).forEach(function(type) {
  test(type.name + ' swizzle', function() {
    testSwizzle(type);
  });
});
