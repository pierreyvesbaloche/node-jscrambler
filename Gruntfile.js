module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      test: ['results/']
    },
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: true,
        extensions: 'js'
      },
      test: ['test/specs/']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test', ['clean', 'jasmine_node', 'clean']);
};
