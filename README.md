# JSCrambler Client for Node.js

## CLI
```
npm install -g jscrambler
```
    Usage: jscrambler [source files] [options]

    Options:

      -h, --help                    output usage information
      -V, --version                 output the version number
      -c, --config [config]         JScrambler configuration options
      -o, --output <output>         Output directory
      -a, --access-key <accessKey>  Access key
      -s, --secret-key <secretKey>  Secret key

## API
```
npm install jscrambler
```
### Upload/download example
```js
var fs = require('fs-extra');
var jScrambler = require('jscrambler');

var client = new jScrambler.Client({
  accessKey: '',
  secretKey: ''
});

jScrambler
  .uploadCode(client, {
    files: ['index.js'],
    // Node.js obfuscation settings
    rename_local: '%DEFAULT%',
    whitespace: '%DEFAULT%',
    literal_hooking: '%DEFAULT%',
    dead_code: '%DEFAULT%',
    dot_notation_elimination: '%DEFAULT%',
    dead_code_elimination: '%DEFAULT%',
    constant_folding: '%DEFAULT%',
    literal_duplicates: '%DEFAULT%',
    function_outlining: '%DEFAULT%',
    string_splitting:'%DEFAULT%'
  })
  .then(function (res) {
    return jScrambler.downloadCode(client, res.id);
  })
  .then(function (res) {
    fs.outputFileSync('dist.zip', res);
  });
  ```
