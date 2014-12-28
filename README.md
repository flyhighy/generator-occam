## Generator-Occam  阿里旅行杭州技术团队前端脚手架

![generator-occam](./logo.jpg)

>奥卡姆剃刀定律（Occam's Razor, Ockham'sRazor）又称“奥康的剃刀”，是由14世纪逻辑学家、圣方济各会修士奥卡姆的威廉（William of Occam，约1285年至1349年）提出。这个原理称为“如无必要，勿增实体”，即“简单有效原理”。

### 安装步骤

安装tnpm

```
npm install tnpm -g --registry=http://registry.npm.alibaba-inc.com
```

安装gulp,yo,bower

```
tnpm install -g gulp yo bower
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

#### 初始化项目结构

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
      |____mods
      |____pages
      |____widgets
```

#### 创建模块

在mods目录下执行以下命令
```
yo occam:mod
```

你会获得一个模块的目录结构，并且生成的js文件具有一套模板。

```
.
|____modulename
      |____index.js
      |____index.less
```      
      
#### 创建js

有时候，你想通过模板建立一个js文件，那么执行以下命令

```
yo occam:js
```

enjoy yourself

### change log

* version 0.1.6
    * 创建yo occam:mod
    * 创建yo occam:js
    * 创建yo occam:h 帮助文件

* version 0.1.5

    * 由grunt更换为gulp

* version 0.1.4

    * 文案修改

* version 0.1.3

    * 修改npm为tnpm