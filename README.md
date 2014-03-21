# JSCrambler Client for Node.js

## How To
    npm install jscrambler

## Upload/download example
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