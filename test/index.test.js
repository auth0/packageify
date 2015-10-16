var packageify = require('..');
var path = require('path');
var test = require('tape');
var TEST_FILE_PATH = __filename;

test('Replaces "package.x" requires with data from package.json', function(t) {
  var buffer = '';
  packageify(TEST_FILE_PATH)
    .on('data', function(d) { buffer += d })
    .on('end', function() {
      t.ok(buffer.indexOf('1.0.3') > -1);
      t.ok(buffer.indexOf('Example Person') > -1);
      t.end()
    })
    .end([
        "var version = require('package.version');",
        "var author = require('package.author');"
    ].join('\n'))
});

test('Allows for chaining off of a require by non greedily matching "package.x" requires', function(t) {
  var buffer = '';

  packageify(TEST_FILE_PATH)
    .on('data', function(d) { buffer += d })
    .on('end', function() {
      t.ok(buffer.indexOf('"1.0.3".split(') > -1);
      t.ok(buffer.indexOf('Example Person') > -1);
      t.end()
    })
    .end([
        "var majorVersion = require('package.version').split('.')[0];",
        "var author = require('package.author');"
    ].join('\n'))
});
