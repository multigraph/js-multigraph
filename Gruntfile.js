module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      lib: 'lib',
      core: 'src/core',
      math: 'src/math',
      util: 'src/utility_functions',
      event: 'src/events/jquery',
      drag: 'src/events/jquery/draggable',
      mouse: 'src/events/jquery/mouse',
      touch: 'src/events/jquery/touch',
      raphael: 'src/graphics/raphael',
      canvas: 'src/graphics/canvas',
      norm: 'src/normalizer',
      parser: 'src/parser/jquery'
    },
    sections: {
      lib: [
        '<%= dirs.lib %>/jermaine/build/jermaine.js',
        '<%= dirs.lib %>/jquery/jquery.min.js',
        '<%= dirs.lib %>/ajaxthrottle/src/ajaxthrottle.js',
        '<%= dirs.lib %>/lightbox/lightbox.js',
        '<%= dirs.lib %>/jquery/jquery.mousewheel.js',
        '<%= dirs.lib %>/jquery/jquery-embed.js',
        '<%= dirs.lib %>/busy-spinner/busy_spinner.js',
        '<%= dirs.lib %>/error-display/build/errorDisplay.js',
        '<%= dirs.lib %>/util/util.js',
        '<%= dirs.lib %>/sprintf/sprintf-0.7-beta1.js',
        '<%= dirs.lib %>/requestanimationframe/requestanimationframe.js'
      ],
      core: [
        '<%= dirs.util %>/*.js',
        '<%= dirs.core %>/data_value.js',
        '<%= dirs.core %>/data_measure.js',
        '<%= dirs.core %>/data_formatter.js',
        '<%= dirs.math %>/*.js',
        '<%= dirs.core %>/renderer.js',
        '<%= dirs.core %>/event_emitter.js',
        '<%= dirs.core %>/data_variable.js',
        '<%= dirs.core %>/data.js',
        '<%= dirs.core %>/plot.js',
        [
          '<%= dirs.core %>/**/*.js',
          '<%= dirs.core %>/!(data_value|data_measure|data_formatter|renderer|event_emitter|data_variable|data|plot).js'
        ]
      ],
      parser: [
        '<%= dirs.parser %>/jquery_mixin.js',
        [
          '<%= dirs.parser %>/*.js',
          '<%= dirs.parser %>/!(jquery_mixin).js'
        ]
      ],
      drag: [
        '<%= dirs.drag %>/mixin.js',
        [
          '<%= dirs.drag %>/*.js',
          '<%= dirs.drag %>/!(mixin).js'
        ]
      ],
      mouse: [
        '<%= dirs.mouse %>/mixin.js',
        [
          '<%= dirs.mouse %>/*.js',
          '<%= dirs.mouse %>/!(mixin).js'
        ],
        '<%= dirs.event %>/*.js'
      ],
      touch: [
        '<%= dirs.touch %>/mixin.js',
        [
          '<%= dirs.touch %>/*.js',
          '<%= dirs.touch %>/!(mixin).js'
        ]
      ],
      raphael: [
        '<%= dirs.raphael %>/raphael.js',
        '<%= dirs.raphael %>/raphael_mixin.js',
        [
          '<%= dirs.raphael %>/**/*.js',
          '<%= dirs.raphael %>/!(raphael|raphael_mixin).js'
        ]
      ],
      canvas: [
        '<%= dirs.canvas %>/canvas_mixin.js',
        [
          '<%= dirs.canvas %>/**/*.js',
          '<%= dirs.canvas %>/!(canvas_mixin).js'
        ]
      ],
      norm: [
        '<%= dirs.norm %>/normalizer_mixin.js',
        [
          '<%= dirs.norm %>/*.js',
          '<%= dirs.norm %>/!(normalizer_mixin).js'
        ]
      ]
    },
    concat: {
      options: {
        separator: ''
      },
      build: {
        src: [
          '<%= sections.lib %>',
          '<%= sections.core %>',
          '<%= sections.parser %>',
          '<%= sections.norm %>',
          '<%= sections.drag %>',
          '<%= sections.mouse %>',
          '<%= sections.touch %>',
          '<%= sections.raphael %>',
          '<%= sections.canvas %>'
        ],
        dest: 'build/multigraph.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        src: "build/multigraph.js",
        dest: "build/multigraph-min.js"
      }
    },
    replace: {
      build: {
        options: {
          patterns: [
            {
              match: '.which.',
              replacement: '.'
            },
            {
              match: '.eachOfWhich.',
              replacement: '.'
            },
            {
              match: '.and.',
              replacement: '.'
            }
          ]
        },
        files: [
          {
              src: ['build/multigraph-min.js'],
              dest: 'build/'
          }
        ]
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        ignores: ['<%= dirs.raphael %>/raphael.js'],
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('build', ['uglify', 'replace']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
