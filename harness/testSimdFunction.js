// clearer marking
var currentName = '<global>';
var skipValueTests = false;

function test(name, func) {
  currentName = name;
  if (typeof skipValueTests !== 'undefined' && skipValueTests &&
      name.indexOf('value semantics') != -1) return;
  try {
    func();
  } catch (e) {
    e.message += " (Testing with " + name + ".)";
    throw e;
  }
}

function isEqual(a, b) {
  if (a != b)
    $ERROR('equal(' + a + ', ' + b + ') failed in ' + currentName);
}

function notEqual(a, b) {
  if (a == b)
    $ERROR('notEqual(' + a + ', ' + b + ') failed in ' + currentName);
}

function throws(func) {
  var pass = false;
  try {
    func();
  } catch (e) {
    pass = true;
  }
  if (!pass)
    $ERROR('throws failed in ' + currentName);
}

function ok(x) {
  if (!x)
    $ERROR('not ok in ' + currentName);
}
