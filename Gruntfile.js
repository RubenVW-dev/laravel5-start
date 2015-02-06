//add additional javascript vendor paths here
var jsVendors = [
    'bower_components/jquery/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/modernizr/modernizr.js',
];

var jsApp = [
    'resources/assets/js/classes/*.js',
    'resources/assets/js/*.js'
];

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            main:{
                files: {
                    'public/style/css/style.css': 'resources/assets/less/theme-default.less' //-> change this to your app theme
                },
                options:{
                    cleancss: true
                }
            }
        },

        watch: {
            files: [
                'resources/assets/less/**/*.less',
                'resources/assets/js/**/*.js',
                'bower_components/**'
            ],
            tasks: [
                'less',
                'uglify',
                'copy'
            ],
            options: {
                livereload: true
            }
        },

        uglify:{
            main:{
                options:{
                    wrap: true,
                    banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n\n(function() {\n\nvar <%= pkg.name %> = {}; \n\n',
                    footer: '\n\n})();'
                },
                files:{
                    'public/js/app.js': jsApp
                }
            }
        },

        copy:{
            main:{
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: jsVendors,
                        dest: 'public/js/vendor'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['less', 'uglify', 'copy']);

};