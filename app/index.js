'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing : function () {
        this.pkg = require('../package.json');
    },

    prompting : function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            '欢迎使用occam创建项目。'
        ));

        var prompts = [
            {
                name    : 'projectName',
                message : '请输入项目名',
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
                message : 'Author Name(花名):',
                default : '',
                warning : ''
            },
            {
                name    : 'email',
                message : 'Author Email:',
                default : '',
                warning : ''
            },
            {
                name    : 'npm_install',
                message : '是否自动安装node_modules',
                default : 'N',
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
            this.template('README.md');
            this.template('package.json');
            this.template('bower.json');
            this.copy('Gruntfile.js');

            this.mkdir('src');
            this.mkdir('src/pages');
            this.mkdir('src/mods');
            this.mkdir('src/widgets');
        }
    },

    install : function () {
        this.npm_install = (/^y/i).test(this.npm_install);

        if (this.npm_install) {
            this.npmInstall('', {}, function (err) {

                if (err) {
                    return console.log('\n' + 'please run "npm install"\n');
                }

                console.log('\n\nnpm was installed successful. \n\n');
            });
        } else {
            console.log('\n\nplease run "npm install" or "tnpm install" before grunt\n');
            console.log('\ndone!\n');
        }
    }
});

function blue (str) {
    return consoleColor(str, 34);
}