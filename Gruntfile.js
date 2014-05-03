module.exports = function(grunt) {
    var hbsNamespace = 'App.Templates';
    var hbsProcessName = function(filepath) { // input -> app/hbs/partial.hbs
        var pieces = filepath.split("/");
        return pieces[pieces.length - 1].replace(/.hbs$/ , ''); //output -> partial
    };
    var hbsOptions = {
        namespace: hbsNamespace,
        processName: hbsProcessName
    };

    grunt.initConfig({
        cssmin: {
            all: {
                files: {
                    'app/assets/dist/all.min.css': [
                        'app/assets/lib_css/jquery-ui.css',
                        'app/assets/lib_css/bootstrap.css',
                        'app/assets/lib_css/select2.css',
                        'app/assets/lib_css/select2-bootstrap.css',
                        'app/assets/css/style.css'
                    ]
                }
            }
        },
        handlebars: {
            all: {
                options: hbsOptions,
                files: {
                    'app/assets/js/template.js': [
                        'app/assets/hbs/*.hbs'
                    ]
                }
            }
        },
        concat: {
            all: {
                files: {
                    'app/assets/dist/all.js': [
                        'app/assets/lib_js/jquery.min.js',
                        'app/assets/lib_js/jquery-ui.min.js',
                        'app/assets/lib_js/lodash.underscore.min.js',
                        'app/assets/lib_js/backbone.js',
                        'app/assets/lib_js/backbone.queryparams.js',
                        'app/assets/lib_js/backbone-nested.js',
                        'app/assets/lib_js/bootstrap.js',
                        'app/assets/lib_js/handlebars.runtime-v1.3.0.js',
                        'app/assets/lib_js/moment-with-langs.min.js',
                        'app/assets/lib_js/select2.min.js',
                        'app/assets/lib_js/parsley.min.js',
                        'app/assets/lib_js/purl.js',
                        'app/assets/lib_js/cache.js'
                    ]
                }
            }
        },
        uglify: {
            all: {
                files: {
                    'app/assets/dist/all.min.js': [
                        'app/assets/dist/all.js'
                    ]
                }
            }
        },
        watch: {
            handlebars: {
                files: ["app/assets/hbs/*.hbs"],
                tasks: ["handlebars"]
            },
            concat: {
                files: ["app/assets/js/*.js"],
                tasks: ["concat"]
            },
            cssmin: {
                files: ['app/assets/css/style.css'],
                tasks: ["cssmin"]
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            all: ['app/assets/js/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['cssmin', 'handlebars', 'concat', 'uglify', 'jshint']);
};