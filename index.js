var through = require('through');
var getProperty = require('lodash.get');
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
    data = data.toString().replace(/require\((\'|\")package\.(.*?)(\'|\")\)/ig, function (str, p1, propertyPath) {
      var package = require(getPackageJson(file));
      var property = getProperty(package, propertyPath);
      return JSON.stringify(property);
    });

    this.emit('data', data);
  }, function end () { //optional
    this.emit('end');
  });
};
