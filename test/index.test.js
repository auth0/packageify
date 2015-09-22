var packageify = require('..');
var path = require('path');
var test = require('tape');

test('Replaces "package.x" requires with data from package.json', function(t) {
  var buffer = '';
  var testFilePath = __filename;

  packageify(testFilePath)
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
