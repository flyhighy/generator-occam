'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var moment = require("moment");

module.exports = yeoman.generators.Base.extend({

    prompting : function () {
        var done = this.async();
        var packageJSON = this._readJSON();

        this.log(yosay(
            '欢迎使用occam创建模块，建议您在 src/mods 目录执行该命令！'
        ));

        var prompts = [
            {
                name    : 'modName',
                message : '请输入模块名（请使用英文）',
                default : 'demo',
                warning : ''
            }
        ];

        this.prompt(prompts, function (props) {
            var author = packageJSON.author;

            this.modName = props.modName;
            this.createTime = moment().format("L");
            this.author = author.name;
            this.email = author.email;

            done();
        }.bind(this));
    },

    writing : {
        app : function () {
            this.mkdir(this.modName);

            this.template('index.js.tpl', this.modName + '/index.js');
            this.template('index.less.tpl', this.modName + '/index.less');
        }
    },

    /**
     * 获取项目package.json文件
     * @private
     */
    _readJSON : function () {
        var packageJSON = {};

        try {
            packageJSON = require(path.resolve(process.cwd(), 'package.json'));
        } catch (e) {
            console.log('package.json not found');
            try {
                packageJSON = require(path.resolve(process.cwd(), '..', 'package.json'));
            } catch (e) {
                try {
                    packageJSON = require(path.resolve(process.cwd(), '../../', 'package.json'));
                } catch (e) {
                    console.log('do nothing!');
                }
            }
        }

        return packageJSON;
    }
});