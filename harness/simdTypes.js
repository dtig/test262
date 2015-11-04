// Copyright information

/*---
info: >
 SIMD Test Suite
includes:
  - testSimdFunction.js
---*/

function binaryMul(a, b) { return a * b; }
var binaryImul;
if (typeof Math.imul !== 'undefined') {
  binaryImul = Math.imul;
} else {
  binaryImul = function(a, b) {
    var ah = (a >>> 16) & 0xffff;
    var al = a & 0xffff;
    var bh = (b >>> 16) & 0xffff;
    var bl = b & 0xffff;
    // the shift by 0 fixes the sign on the high part
    // the final |0 converts the unsigned value into a signed value
    return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
  };
}

var _f32x4 = new Float32Array(4);
var _f64x2 = new Float64Array(_f32x4.buffer);
var _i32x4 = new Int32Array(_f32x4.buffer);
var _i16x8 = new Int16Array(_f32x4.buffer);
var _i8x16 = new Int8Array(_f32x4.buffer);
var _ui32x4 = new Uint32Array(_f32x4.buffer);
var _ui16x8 = new Uint16Array(_f32x4.buffer);
var _ui8x16 = new Uint8Array(_f32x4.buffer);

var float32x4 = {
  name: "Float32x4",
  fn: SIMD.Float32x4,
  floatLane: true,
  signed: true,
  numerical: true,
  lanes: 4,
  laneSize: 4,
  interestingValues: [0, -0, 1, -1, 1.414, 0x7F, -0x80, -0x8000, -0x80000000, 0x7FFF, 0x7FFFFFFF, Infinity, -Infinity, NaN],
  view: Float32Array,
  buffer: _f32x4,
  mulFn: binaryMul,
}

var int32x4 = {
  name: "Int32x4",
  fn: SIMD.Int32x4,
  intLane: true,
  signed: true,
  numerical: true,
  logical: true,
  lanes: 4,
  laneSize: 4,
  minVal: -0x80000000,
  maxVal: 0x7FFFFFFF,
  interestingValues: [0, 1, -1, 0x40000000, 0x7FFFFFFF, -0x80000000],
  view: Int32Array,
  buffer: _i32x4,
  mulFn: binaryImul,
}

var int16x8 = {
  name: "Int16x8",
  fn: SIMD.Int16x8,
  intLane: true,
  signed: true,
  numerical: true,
  logical: true,
  lanes: 8,
  laneSize: 2,
  laneMask: 0xFFFF,
  minVal: -0x8000,
  maxVal: 0x7FFF,
  interestingValues: [0, 1, -1, 0x4000, 0x7FFF, -0x8000],
  view: Int16Array,
  buffer: _i16x8,
  mulFn: binaryMul,
}

var int8x16 = {
  name: "Int8x16",
  fn: SIMD.Int8x16,
  intLane: true,
  signed: true,
  numerical: true,
  logical: true,
  lanes: 16,
  laneSize: 1,
  laneMask: 0xFF,
  minVal: -0x80,
  maxVal: 0x7F,
  interestingValues: [0, 1, -1, 0x40, 0x7F, -0x80],
  view: Int8Array,
  buffer: _i8x16,
  mulFn: binaryMul,
}

var uint32x4 = {
  name: "Uint32x4",
  fn: SIMD.Uint32x4,
  intLane: true,
  unsigned: true,
  numerical: true,
  logical: true,
  lanes: 4,
  laneSize: 4,
  minVal: 0,
  maxVal: 0xFFFFFFFF,
  interestingValues: [0, 1, 0x40000000, 0x7FFFFFFF, 0xFFFFFFFF],
  view: Uint32Array,
  buffer: _ui32x4,
  mulFn: binaryImul,
}

var uint16x8 = {
  name: "Uint16x8",
  fn: SIMD.Uint16x8,
  intLane: true,
  unsigned: true,
  numerical: true,
  logical: true,
  lanes: 8,
  laneSize: 2,
  laneMask: 0xFFFF,
  minVal: 0,
  maxVal: 0xFFFF,
  interestingValues: [0, 1, 0x4000, 0x7FFF, 0xFFFF],
  view: Uint16Array,
  buffer: _ui16x8,
  mulFn: binaryMul,
}

var uint8x16 = {
  name: "Uint8x16",
  fn: SIMD.Uint8x16,
  intLane: true,
  unsigned: true,
  numerical: true,
  logical: true,
  lanes: 16,
  laneSize: 1,
  laneMask: 0xFF,
  minVal: 0,
  maxVal: 0xFF,
  interestingValues: [0, 1, 0x40, 0x7F, 0xFF],
  view: Int8Array,
  buffer: _ui8x16,
  mulFn: binaryMul,
}

var bool32x4 = {
  name: "Bool32x4",
  fn: SIMD.Bool32x4,
  boolLane: true,
  lanes: 4,
  laneSize: 4,
  interestingValues: [true, false],
}

var bool16x8 = {
  name: "Bool16x8",
  fn: SIMD.Bool16x8,
  boolLane: true,
  lanes: 8,
  laneSize: 2,
  interestingValues: [true, false],
}

var bool8x16 = {
  name: "Bool8x16",
  fn: SIMD.Bool8x16,
  boolLane: true,
  lanes: 16,
  laneSize: 1,
  interestingValues: [true, false],
}

// Filter functions.
function isFloatType(type) { return type.floatLane; }
function isIntType(type) { return type.intLane; }
function isBoolType(type) { return type.boolLane; }
function isNumerical(type) { return type.numerical; }
function isLogical(type) { return type.logical; }
function isSigned(type) { return type.signed; }
function isSignedIntType(type) { return type.intLane && type.signed; }
function isUnsignedIntType(type) { return type.intLane && type.unsigned; }
function isSmallIntType(type) { return type.intLane && type.lanes >= 8; }
function isSmallUnsignedIntType(type) { return type.intLane && type.unsigned && type.lanes >= 8; }
function hasLoadStore123(type) { return !type.boolLane && type.lanes == 4; }

// Each SIMD type has a corresponding Boolean SIMD type, which is returned by
// relational ops.
float32x4.boolType = int32x4.boolType = uint32x4.boolType = bool32x4;
int16x8.boolType = uint16x8.boolType = bool16x8;
int8x16.boolType = uint8x16.boolType = bool8x16;

// SIMD fromTIMD types.
float32x4.from = [int32x4, uint32x4];
int32x4.from = [float32x4, uint32x4];
int16x8.from = [uint16x8];
int8x16.from = [uint8x16];
uint32x4.from = [float32x4, int32x4];
uint16x8.from = [int16x8];
uint8x16.from = [int8x16];

// SIMD fromBits types.
float32x4.fromBits = [int32x4, int16x8, int8x16, uint32x4, uint16x8, uint8x16];
int32x4.fromBits = [float32x4, int16x8, int8x16, uint32x4, uint16x8, uint8x16];
int16x8.fromBits = [float32x4, int32x4, int8x16, uint32x4, uint16x8, uint8x16];
int8x16.fromBits = [float32x4, int32x4, int16x8, uint32x4, uint16x8, uint8x16];
uint32x4.fromBits = [float32x4, int32x4, int16x8, int8x16, uint16x8, uint8x16];
uint16x8.fromBits = [float32x4, int32x4, int16x8, int8x16, uint32x4, uint8x16];
uint8x16.fromBits = [float32x4, int32x4, int16x8, int8x16, uint32x4, uint16x8];

var simdTypes = [float32x4,
                 int32x4, int16x8, int8x16,
                 uint32x4, uint16x8, uint8x16,
                 bool32x4, bool16x8, bool8x16];

if (typeof simdPhase2 !== 'undefined') {
  var float64x2 = {
    name: "Float64x2",
    fn: SIMD.Float64x2,
    floatLane: true,
    signed: true,
    numerical: true,
    lanes: 2,
    laneSize: 8,
    interestingValues: [0, -0, 1, -1, 1.414, 0x7F, -0x80, -0x8000, -0x80000000, 0x7FFF, 0x7FFFFFFF, Infinity, -Infinity, NaN],
    view: Float64Array,
    buffer: _f64x2,
    mulFn: binaryMul,
  }

  var bool64x2 = {
    name: "Bool64x2",
    fn: SIMD.Bool64x2,
    boolLane: true,
    lanes: 2,
    laneSize: 8,
    interestingValues: [true, false],
  }

  float64x2.boolType = bool64x2;

  float32x4.fromBits.push(float64x2);
  int32x4.fromBits.push(float64x2);
  int16x8.fromBits.push(float64x2);
  int8x16.fromBits.push(float64x2);
  uint32x4.fromBits.push(float64x2);
  uint16x8.fromBits.push(float64x2);
  uint8x16.fromBits.push(float64x2);

  float64x2.fromBits = [float32x4, int32x4, int16x8, int8x16,
                        uint32x4, uint16x8, uint8x16];

  int32x4.fromBits = [float32x4, int16x8, int8x16, uint32x4, uint16x8, uint8x16];
  int16x8.fromBits = [float32x4, int32x4, int8x16, uint32x4, uint16x8, uint8x16];
  int8x16.fromBits = [float32x4, int32x4, int16x8, uint32x4, uint16x8, uint8x16];
  uint32x4.fromBits = [float32x4, int32x4, int16x8, int8x16, uint16x8, uint8x16];
  uint16x8.fromBits = [float32x4, int32x4, int16x8, int8x16, uint32x4, uint8x16];
  uint8x16.fromBits = [float32x4, int32x4, int16x8, int8x16, uint32x4, uint16x8];

  simdTypes.push(float64x2);
  simdTypes.push(bool64x2);
}
