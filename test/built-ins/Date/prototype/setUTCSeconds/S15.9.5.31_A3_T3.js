// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: >
    The Date.prototype.setUTCSeconds property "length" has { ReadOnly,
    DontDelete, DontEnum } attributes
es5id: 15.9.5.31_A3_T3
description: Checking DontEnum attribute
---*/

if (Date.prototype.setUTCSeconds.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.setUTCSeconds.length property has the attribute DontEnum');
}

for(var x in Date.prototype.setUTCSeconds) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.setUTCSeconds.length has the attribute DontEnum');
  }
}
