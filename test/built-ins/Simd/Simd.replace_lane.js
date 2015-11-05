// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdUtilities.js]
---*/
function testReplaceLane(type) {
  assert.sameValue('function', typeof type.fn.replaceLane);
  var a = createTestValue(type);
  for (var v of type.interestingValues) {
    var expected = simdConvert(type, v);
    for (var i = 0; i < type.lanes; i++) {
      var result = type.fn.replaceLane(a, i, v);
      checkValue(type, result,
                 function(index) {
                   return index == i ? expected : type.fn.extractLane(a, index);
                 });
    }
  }

  function testIndexCheck(index) {
    throws(function() { type.fn.replaceLane(a, index, 0); });
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

simdTypes.forEach(function(type) {
  test(type.name + ' replaceLane', function() {
    testReplaceLane(type);
  });
});

