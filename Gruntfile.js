"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    "gh-pages": {
      options: {
        base: "build"
      },
      src: ["**"]
    },

    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "css/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      }
    },

    less: {
      style: {
        files: {
          "src/css/style.css": "src/less/style.less"
        },
        options: {
          relativeUrls: true
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 1 version",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions"
            ]}),
            require("css-mqpacker")({
              sort: true
            })
          ]
        },
        src: "src/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
          files: {
            "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    uglify: {
      js: {
        options: {
          mangle: false
        },
        files: {
          "build/js/script.min.js": ["build/js/script.js"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/**/*.svg"]
        }]
      },
      src: {
        files: [{
          expand: true,
          src: ["src/img-src/**/*.svg"]
        }]
      }
    },

    replace: {
      inline: {
        src: ["src/*.html"],
        dest: "build/",
        replacements: [{
          from: "css/style.css",
          to: "css/style.min.css"
        }, {
          from: "js/script.js",
          to: "js/script.min.js"
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: ["src/*.html", "src/css/*.css", "src/js/*.js"]
        },
        options: {
          server: "src",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      style: {
        files: ["src/less/**/*.less"],
        tasks: ["less", "postcss"],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);

  grunt.registerTask("build", [
    "clean",
    "svgmin:src",
    "less",
    "postcss",
    "copy",
    "csso",
    "uglify",
    "replace",
    "imagemin",
    "svgmin:symbols"
  ]);

  grunt.registerTask("deploy", ["less","postcss"])
};
