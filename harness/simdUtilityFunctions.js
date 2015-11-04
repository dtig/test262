// Copyright information

/*---
info: >
 SIMD Test Suite
includes: [simdTypes.js]
---*/

// Utility functions.
function minNum(x, y) {
  return x != x ? y :
         y != y ? x :
         Math.min(x, y);
}

function maxNum(x, y) {
  return x != x ? y :
         y != y ? x :
         Math.max(x, y);
}

function sameValue(x, y) {
  if (x == y)
    return x != 0 || y != 0 || (1/x == 1/y);

  return x != x && y != y;
}

function sameValueZero(x, y) {
  if (x == y) return true;
  return x != x & y != y;
}

// Create a value for testing, with vanilla lane values, i.e. [0, 1, 2, ..]
// for numeric types, [false, true, true, ..] for boolean types. These test
// values shouldn't contain NaNs or other "interesting" values.
function createTestValue(type) {
  var lanes = [];
  for (var i = 0; i < type.lanes; i++)
    lanes.push(i);
  return type.fn.apply(type.fn, lanes);
}

function createSplatValue(type, v) {
  var lanes = [];
  for (var i = 0; i < type.lanes; i++)
    lanes.push(v);
  return type.fn.apply(type.fn, lanes);
}

function checkValue(type, a, expect) {
  var fail = false;
  for (var i = 0; i < type.lanes; i++) {
    var v = type.fn.extractLane(a, i);
    var ev = simdConvert(type, expect(i));
    if (!sameValue(ev, v) && Math.abs(ev - v) >= 0.00001)
      fail = true;
  }
  if (fail) {
    var lanes = [];
    for (var i = 0; i < type.lanes; i++)
      lanes.push(simdConvert(type, expect(i)));
    $ERROR('expected SIMD.' + type.name + '(' + lanes +
        ') but found ' + a.toString());
  }
}

// SIMD reference functions.

function simdConvert(type, value) {
  if (type.buffer === undefined) return !!value;  // bool types
  type.buffer[0] = value;
  return type.buffer[0];
}

// Reference implementation of toString.
function simdToString(type, value) {
  value = type.fn.check(value);
  var str = "SIMD." + type.name + "(";
  str += type.fn.extractLane(value, 0);
  for (var i = 1; i < type.lanes; i++) {
    str += ", " + type.fn.extractLane(value, i);
  }
  return str + ")";
}

// Reference implementation of toLocaleString.
function simdToLocaleString(type, value) {
  value = type.fn.check(value);
  var str = "SIMD." + type.name + "(";
  str += type.fn.extractLane(value, 0).toLocaleString();
  for (var i = 1; i < type.lanes; i++) {
    str += ", " + type.fn.extractLane(value, i).toLocaleString();
  }
  return str + ")";
}

