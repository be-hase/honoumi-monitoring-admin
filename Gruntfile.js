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
                    'assets/dist/all.min.css': [
                        'assets/lib_css/jquery-ui.css',
                        'assets/lib_css/bootstrap.css',
                        'assets/lib_css/select2.css',
                        'assets/lib_css/select2-bootstrap.css',
                        'assets/css/style.css'
                    ]
                }
            }
        },
        // handlebarsは読み込む順番が自由なので、ワイルドカード使う
        handlebars: {
            all: {
                options: hbsOptions,
                files: {
                    'assets/js/template.js': [
                        hbsPath + '*.hbs'
                    ]
                }
            }
        },
        concat: {
            all: {
                files: {
                    'assets/dist/all.js': [
                        'assets/lib_js/jquery.min.js',
                        'assets/lib_js/jquery-ui.min.js',
                        'assets/lib_js/bootstrap.js',
                        'assets/lib_js/parsley.min.js',
                        'assets/lib_js/handlebars.runtime-v1.3.0.js',
                        'assets/lib_js/lodash.underscore.min.js',
                        'assets/lib_js/backbone.js',
                        'assets/lib_js/backbone.queryparams.js',
                        'assets/lib_js/backbone-nested.js',
                        'assets/lib_js/purl.js',
                        'assets/lib_js/select2.min.js',
                        'assets/lib_js/moment-with-langs.min.js',
                        'assets/lib_js/cache.js'
                    ]
                }
            }
        },
        uglify: {
            all: {
                files: {
                    'assets/dist/all.min.js': [
                        'assets/dist/all.js'
                    ]
                }
            }
        },
        watch: {
            handlebars: {
                files: ["assets/hbs/*.hbs"],
                tasks: ["handlebars"]
            },
            concat: {
                files: ["assets/js/*.js"],
                tasks: ["concat"]
            },
            cssmin: {
                files: ['assets/css/style.css'],
                tasks: ["cssmin"]
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            all: ['assets/js/*.js']
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