'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var exec = require('exec');

module.exports = yeoman.generators.Base.extend({
    initializing : function () {
        this.pkg = require('../package.json');
    },

    prompting : function () {
        var done = this.async();

        this.log(yosay(
            '欢迎使用occam创建项目。'
        ));

        var prompts = [
            {
                name    : 'projectName',
                message : '请输入项目名（请使用英文）',
                default : 'demo-project',
                warning : ''
            },
            {
                name    : 'projectDesc',
                message : '请输入项目描述',
                default : 'demo-project',
                warning : ''
            },
            {
                name    : 'author',
                message : 'Author Name(请使用英文花名):',
                default : '',
                warning : ''
            },
            {
                name    : 'email',
                message : 'Author Email(请使用英文邮箱地址):',
                default : '',
                warning : ''
            },
            {
                name    : 'npm_install',
                message : '是否自动安装node_modules',
                default : 'Y/n',
                warning : ''
            }
        ];

        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;
            this.projectDesc = props.projectDesc;
            this.author = props.author;
            this.email = props.email;
            this.npm_install = props.npm_install;

            done();
        }.bind(this));
    },

    writing : {
        app : function () {
            this.template('.gitignore');
            this.template('bower.json');
            this.template('package.json');
            this.template('README.md');
            this.copy('gulpfile.js');

            this.mkdir('demo');
            this.mkdir('src');
            this.mkdir('src/mods');
            this.mkdir('src/widgets');
        }
    },

    install : function () {
        this.npm_install = (/^y/i).test(this.npm_install);

        if (this.npm_install) {
            console.log('\n' + '正在安装项目依赖的package\n');
            exec(['npm', 'install'], function(err, out, code) {

                if (err) {
                    return console.log('\n' + '安装项目依赖的package失败，请执行 "npm install" 或 "tnpm install" 命令，完成安装。\n');
                }

                console.log('\n\n安装项目依赖的package成功，enjoy yourself \n\n');
            });
        } else {
            console.log('\n\nplease run "npm install" or "tnpm install" before grunt\n');
            console.log('\ndone!\n');
        }
    }
});