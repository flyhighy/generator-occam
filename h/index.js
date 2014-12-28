var os = require('os');
var pkg = require("../package.json");
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    prompting : function () {
        [
            '欢迎使用帮助',
            'occam@v' + pkg.version,
            'node@v' + process.version.substring(1),
            'os@' + os.type() + ' ' + os.release(),
            '',
            'Yeoman 命令',
            ' yo occam:h	显示帮助',
            '	yo occam		在根目录执行，初始化Project',
            '	yo occam:mod	在mods目录中执行，生成一个模块',
            '	yo occam:js	在模块目录中执行，生成一个符合KISSY模块标准的js文件',
            '',
            'gulp 命令',
            '	gulp		执行默认构建流程',
            '工具文档：https://github.com/young-cowboy/generator-occam',
            'author by @影逸'
        ].forEach(function (item) {
                console.log(item);
            });
    }
});