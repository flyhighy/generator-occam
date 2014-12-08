module.exports = function (grunt) {
    var task = grunt.task;
    // ======================= 配置每个任务 ==========================

    grunt.initConfig({
        pkg           : grunt.file.readJSON('package.json'),

        // 对页面进行清理
        clean         : {
            build : {
                src : 'build/*'
            }
        },

        /**
         * 将src目录中的KISSY文件做编译打包，仅做合并，源文件需要指定名称
         *      KISSY.add('package/path/to/file',function(S){});
         *
         *      @link https://github.com/daxingplay/grunt-kmc
         *
         * 如果需要只生成依赖关系表，不做合并
         * 在kmc.options中增加两个参数:
         *      depFilePath: 'build/mods.js',
         *      comboOnly: true,
         *      comboMap: true,
         */
        kmc   : {
            options : {
                packages : [
                    {
                        name    : '<%= pkg.name %>',
                        path    : '../',
                        charset : 'utf-8'
                    }
                ],
                // 生成模块依赖关系表
                //depFilePath:'build/deps.js',
                //comboOnly:true,
                //fixModuleName:true,
                //comboMap:true,
                map      : [
                    ['<%= pkg.name %>/src/', '<%= pkg.name %>/']
                ]
            },

            main : {
                files : [
                    {
                        // 这里指定项目根目录下所有文件为入口文件，自定义入口请自行添加
                        expand : true,
                        cwd    : 'src/',
                        src    : [ '**/*.js', '!**/*/Gruntfile.js', '!**/config.js'],
                        dest   : 'build/'
                    }
                ]
            }
        },

        // CSS-Combo: 合并项目中所有css，通过@import "other.css" 来处理CSS的依赖关系
        css_combo : {
            options : {
                paths : './'
            },
            main    : {
                files : [
                    {
                        expand : true,
                        cwd    : 'build',
                        src    : ['**/*.css'],
                        dest   : 'build/',
                        ext    : '.css'
                    }
                ]
            }
        },

        // 编译LESS为CSS https://github.com/gruntjs/grunt-contrib-less
        less      : {
            options : {
                paths : './'
            },
            main    : {
                files : [
                    {
                        expand : true,
                        cwd    : 'build/',
                        src    : ['**/*.less'],
                        dest   : 'build/',
                        ext    : '.css'
                    }
                ]
            }
        },

        // 压缩JS https://github.com/gruntjs/grunt-contrib-uglify
        uglify    : {
            options : {
                banner   : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
                beautify : {
                    ascii_only : true
                }
            },
            main    : {
                files : [
                    {
                        expand : true,
                        cwd    : 'build/',
                        src    : ['**/*.js', '!**/*-min.js', '!**/*/Gruntfile.js'],
                        dest   : 'build/',
                        ext    : '-min.js'
                    }
                ]
            }
        },

        // 压缩CSS https://github.com/gruntjs/grunt-contrib-cssmin
        cssmin    : {
            main : {
                files : [
                    {
                        expand : true,
                        cwd    : 'build/',
                        src    : ['**/*.css', '!**/*-min.css'],
                        dest   : 'build/',
                        ext    : '-min.css'
                    }
                ]
            }
        },

        // 拷贝文件
        copy      : {
            main : {
                files : [
                    {
                        // src: files.js,
                        expand : true,
                        src    : ['**/*.html', '**/*.htm', '**/*.js', '**/*.css', 'images/**', '!node_modules'],
                        dest   : 'build/',
                        cwd    : 'src/',
                        filter : 'isFile'
                    }
                ]
            }
        }
    });

    // ======================= 载入使用到的通过NPM安装的模块 ==========================
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-kmc');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', 'clam publish...', function () {
        task.run([
            'clean',
            'copy',
            'kmc',
            'uglify',
            'cssmin'
        ]);
    });
};