## Occam - 阿里旅行杭州技术团队前端脚手架

>奥卡姆剃刀定律（Occam's Razor, Ockham'sRazor）又称“奥康的剃刀”，是由14世纪逻辑学家、圣方济各会修士奥卡姆的威廉（William of Occam，约1285年至1349年）提出。这个原理称为“如无必要，勿增实体”，即“简单有效原理”。

###

### 安装步骤

安装tnpm

```
npm install tnpm -g --registry=http://registry.npm.alibaba-inc.com
```

安装grunt,yo,bower

```
tnpm install -g grunt-cli yo bower
```

安装generator-occam

```
tnpm install -g generator-occam
```


### 使用

创建项目目录

```
mkdir your_project_name
cd your_project_name
```

初始化项目结构

```
yo occam
```

如果yo时没有选择安装node_modules，请执行

```
tnpm install
```

稍后你会得到在一个如下的目录
```
.
|____node_modules
|____bower.json
|____Gruntfile.js
|____package.json
|____README.md
|____src
| |____mods
| |____pages
| |____widgets
```

enjoy yourself