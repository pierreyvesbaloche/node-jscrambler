// resource file loading
var fs    = require('fs');
var join  = require('path').join;


var etc, home, load, rc_path, save, win, _findConfig;

rc_path = null;

// determine the home directory for this platform/OS
etc = '/etc';

win = process.platform === 'win32';

if (win) {
  home = process.env.USERPROFILE;
} else {
  home = process.env.HOME;
}

/*
 return the first found config file, looking in the common places
 across different platforms

 @param string name application name
 @return string full path of config file if it exists. null otherwise
 */

_findConfig = function(name) {
  var l, locs, _i, _len;
  locs = [join(etc, name), join(home, '.' + name), join(home, '.' + name, 'config'), join(home, '.config', name), join(home, '.config', name, 'config')];
  if (win) {
    locs.push(join(etc, name));
    join(etc, name, 'config');
  }

  for (_i = 0, _len = locs.length; _i < _len; _i++) {
    l = locs[_i];
    if (fs.existsSync(l)) {
      return l;
    }
  }
  return null;
};

// load the configuration options. returns an empty object if no config found
module.exports = load = function(config_filename) {
  var rc;
  rc = {};

  // look in common places for the app's config file
  rc_path = _findConfig(config_filename);
  if (rc_path && fs.existsSync(rc_path)) {
    var str = fs.readFileSync(rc_path);
    try {
      rc = JSON.parse(str);
    } catch (e) {
      console.error('could not parse config file: invalid json in ' + rc_path);
      process.exit(1);
    }
  }
  return rc;
};
