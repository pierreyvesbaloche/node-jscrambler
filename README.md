# JScrambler Client for Node.js

## CLI
```bash
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

### Required Fields
When making API requests you must pass valid secret and access keys. These are each 40 characters long, alpha numeric strings, and uppercase. You can find them in your jscramber web dashboard under `My Account > Api access`. In the examples these are shortened to `XXXX` for the sake of readability.

### Output to a single file
```bash
jscrambler input.js -a XXXX -s XXXX > output.js
```

### Output multiple files to a directory
```bash
jscrambler input1.js input2.js -o dest/ -a XXXX -s XXXX
```

### Using minimatch
```bash
jscrambler "lib/**/*.js" -o dest/ -a XXXX -s XXXX
```

### Using configuration file
```bash
jscrambler input.js -s XXXX -a XXXX -c ./config.json > output.js
```
where `config.json` is an object optionally containing any of the JScrambler options listed below.
 

## API
```bash
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

## JScrambler Options

The following options are passed to the JScrambler services through the CLI config file or some API methods. More information about them can be found [here](https://jscrambler.com/en/help/webapi/documentation).

### asserts_elimination
Type: `String`

`name1;name2;...` - assert function names

Remove function definitions and function calls with a given name.

### constant_folding
Type: `String`

`%DEFAULT%` - enable constant folding

Simplifies constant expressions at compile-time to make your code faster at run-time.

### dead_code
Type: `String`

`%DEFAULT%` - enable dead code

Randomly injects dead code into the source code.

### dead_code_elimination
Type: `String`

`%DEFAULT%` - enable dead code elimination

Removes dead code and void code from your JavaScript.

### debugging_code_elimination
Type: `String`

`name1;name2;...` - debugging code names

Removes statements and public variable declarations used to control the output of debugging messages that help you debug your code.

### dictionary_compression
Type: `String`

`%DEFAULT%` - enable dictionary compression

Dictionary compression to shrink even more your source code.

### domain_lock
Type: `String`

`domain1;domain2;...` - your domains

Locks your project to a list of domains you specify.

### dot_notation_elimination
Type: `String`

`%DEFAULT%` - enable dot notation elimination

Transforms dot notation to subscript notation.

### exceptions_list
Type: `String`

`name;name1;name2;...` - list of exceptions that will never be replaced or used to create new declarations

There are some names that should never be replaced or reused to create new declarations e.g. document, toUpperCase. Public declarations existing in more than one source file should not be replaced if you submit only a part of the project where they appear. Therefore a list of irreplaceable names and the logic to make distinction between public and local names already exists on JScrambler to avoid touching those names. Use this parameter to add your own exceptions.

### expiration_date:
Type: `String`

`date` - date format YYYY/MM/DD

Sets your JavaScript to expire after a date of your choosing.

### function_outlining
Type: `String`

`%DEFAULT%` - enable function outlining

Turns statements into new function declarations.

### function_reorder
Type: `String`

`%DEFAULT%` - enable function reordering

Randomly reorders your source code's function declarations.

### ignore_files
Type: `String`

`filename;filename1` - List of files (relative paths) to be ignored

Define a list of files (relative paths) that JScrambler must ignore.

### literal_hooking
Type: `String`

`min;max[;percentage]` - min and max predicates in ternary operator and percentage chance of replacement

Replaces literals by a randomly sized chain of ternary operators. You may configure the minimum and maximum number of predicates per literal, as the occurrence probability of the transformation. This allows you to control how big the obfuscated JavaScript grows and the potency of the transformation.

### literal_duplicates
Type: `String`

`%DEFAULT%` - enable literal duplicates

Replaces literal duplicates by a symbol.

### member_enumeration
Type: `String`

`%DEFAULT%` - enable member enumeration

Replaces Browser and HTML DOM objects by a member enumeration.

### mode
Type: `String`

`starter` - Standard protection and optimization behavior. Enough for most JavaScript applications
`mobile` - Transformations are applied having into account the limitations and needs of mobile devices
`html5` - Protects your HTML5 and Web Gaming applications by targeting the new HTML5 features

### name_prefix
Type: `String`

Set a prefix to be appended to the new names generated by JScrambler.

### rename_local
Type: `String`

`%DEFAULT%` - enable rename local

Renames local names only. The best way to replace names without worrying about name dependencies.

### string_splitting:
Type: `String`

`occurrences[;concatenation]`

occurrences - Percentage of occurrences. Accepted values between 0.01 and 1.
concatenation - Percentage of concatenation occurrences. Accepted values between 0 and 1 (0 means chunks of a single character and 1 the whole string).

### whitespace
Type: `String`

`%DEFAULT%` - enable whitespace

Shrink the size of your JavaScript removing unnecessary whitespaces and newlines from the source code.
