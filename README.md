[![Build Status](http://img.shields.io/travis/auth0/packageify.svg?style=flat&branch=master)](https://travis-ci.org/auth0/packageify)

Inline things from your package.json without including all the package.json.

You can require `package.json` with browserify since it is a JSON as follows:

```
require('./package.json');
```

this is often an overkill since it will include all the package.json file and most of the time you only need things like the `version` property:

```
exports.version = require('./package.json').version;
```

With this transforms you can use:

```
exports.version = require('package.version');
```

and it will transform to:

```
exports.version = '1.0.20';
```

Any field works for instance


```
exports.author = require('package.author');
exports.license = require('package.license');
```

## Usage

```
npm i packageify --save-dev
```

Then add the transform as any other transform.

## License

MIT 2014 - Jose F. Romaniello
