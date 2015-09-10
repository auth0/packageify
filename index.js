var through = require('through');
var path = require('path');
var fs = require('fs');

function getPackageJson (inDir) {
  var dirname = path.dirname(inDir);
  var pkg_route = path.join(dirname, 'package.json');
  if (fs.existsSync(pkg_route)) return pkg_route;
  return getPackageJson(dirname);
}

module.exports = function (file, opts) {
  return through(function write(data) {
    data = data.toString().replace(/require\((\'|\")package\.(.*?)(\'|\")\)/ig, function (str, p1, p2) {
      var r = JSON.stringify(require(getPackageJson(file))[p2]);
      return r;
    });

    this.emit('data', data);
  }, function end () { //optional
    this.emit('end');
  });
};
