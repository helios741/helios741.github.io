# 前端工程化

主要分为下面的几个部分：
- 是什么？
- 必要性？
- 包含哪些内容？
- 实践


## 什么是前端工程化( 是什么？

### 软件工程 

创立和使用健全的工程原则，以便经济地获得可靠且高效率的软件。
- *工程化*是方法论，是将软件的研发的各个链路`规则化`，`系统化`，`流程化`
- 前端工程是软件工程的一个`子项`

通过上面的两条，我们能够得出下面的结论：
**将前端的开发流程、技术、工程、经验等规范化，标准化**

## 前端的发展 ( 必要性

### 刀耕火种

这个阶段的网站基本都是这个样子的
![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/1990.png)

这个(刀耕火种)阶段的特点：

- 用户 
	+ 需求简单
- 开发者
	+ 前后端没有明确的分工
	+ 只需要关注页面是否正确输出
- 代码特点
![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/chu.png)
- 说明
	+ 初期： 由后端进行简单的字符串的拼接，然后交给前台进行显示
	+ 后端代码插入html
	+ 优势： 代码明快，快速成型
	+ 劣势：开发困难，维护困难

### 近现代

近现代时期的特点：
- 代码特点：
![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/jinxiandai.png)

- 说明
	+ html中插入后端代码
	+ 有了明确的分工，后端为主的MVC
	+ 强依赖后端
	+ 开始意识到前端之间多人协作开发、优化问题

### 转型时期

#### 会转型的原因

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/zhuanxing.png)

由于以上的原因，前端的接触越来越广泛，现在移动端和PC已经开始特别关注用户体验

#### 这个阶段特点

- 用户
	+ 加载快
	+ 流量省
	+ 内容丰富
	+ 更加安全
- 开发者
	+ 多人合作
	+ 前端亦可以独立开发
	+ 需要关注的点更多，安全、性能、部署等
- 代码特点
	+ 项目变大
	+ 结构复杂、逻辑复杂、功能多
	+ 前端部分变重
	+ 不断变换的需求

#### 遇到的问题的思考

- 代码方面
	+ 前端的代码分散在后端的目录中
	+ SASS,ES6
	+ 代码校验
	+ 页面有相似性
- 开发流程
![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/lc.png)

	1. 前端能不能有限开发动态的部分
	2. 如何有效的联系这些信息孤岛
- 开发者角度
	+ 高效的多人合作
	+ 更高的开发效率和开发质量
	+ 更高的代码维护性
	+ 提供高性能的服务
- 问题如何解决
	+ 一致性
	+ 分而治之
	+ 新特性
	+ 自动化
## 现代前端工程 ( 包含哪些内容

### 可能包含的内容

- 业务开发
	1. 规范化
	2. 模块化开发
	3. 组件化开发
- 工程优化
	1. 开发流程
	2. 测试
	3. 部署
	4. 性能优化
	5. 监控、统计

这是一套方法论，需要结合项目特点加以优化。

一般会有的开发过程如下：
![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/guifan.png)

### 规范化

- 代码规范
	+ 变量命名，固定的DOM结构
	+ 代码规范，各自项目的“约定”
- 文件的结构规范
![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/filegf.png)
- 代码检测
	+ CSS Lint，JSLint

### 模块化

####  模块化含义
开发阶段使用`分而治之`的思想对方法的封装和设计。


### 模块化CSS

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/css-model.png)

- *POSTCSS*:一个平台，自身什么也不做，只是一个插件的集合
- *CSS Modules* ： 解决变量名全局冲突的问题

### 模块化JS

|规范|应用|
|:---:|:---:|
|CommonJS|Nodejs|
|AMD|requirejs|
|CMD|seajs|
|ES6 import|

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/jslc.png)

### 组件化

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/zujianhua.png)

#### 组件化含义
可独立部署的软件单元，产品功能

#### 组件化结构

- WEBAPP = PAGE1 + PAGE2 + …
- PAGE = LAYOUT + COMPONENT
- COMPONENT = TPL + CSS + JS + DATA

#### 开发流程

- MOCK API
- 实时编译
- 实时更新
- 本地调试

#### 测试

- 单元测试
- 功能测试
- UI测试
- 自动化测试

#### 发布和部署

- 静态资源管理和版本管理
- 发布上线，批量，单个
- 增量修改
- 多机房部署
- 自动化部署

#### 性能优化

- 资源合并
- 代码压缩、混淆
- 按需/增量 加载
- 安全漏洞自动修复

#### 其他

- 线上监控、统计
- 及时发现问题、定位问题


### 前端构建工具

通过一系列的插件实现了原本复杂繁琐的任务自动化，如：拷贝，替换文件

#### npm和yarn

- 安装node是会自动安装npm
- npm install -g yarn

yarn的出现是为了解决：

- 安装速度慢，可离线，可从多个源安装
- 自动锁定软件包版本，安装依赖包版本在所有机器上都一致

#### gulp与npm script的对比

|gulp|npm script|
|:---:|:---:|
|本来有很多好的插件|本来就需要使用npm|
|依赖插件开发者|对shell命令有一定要求|
|需要关注的文档很多|不容易添加注释|
|难以调试|


#### webpack

- 模块化打包工具，一切资源皆模块，以JS为入口
- 是一个流程中的一部分

特点：
- 对js、css、图片等资源文件都支持打包
- 对 CommonJS 、 AMD 、ES6的语法做了兼容
- 串联式模块加载器以及插件机制
- 支持按需加载，降低首屏加载时间

|webpack可以做|webpack不擅长|
|:---:|:---:|
|代码压缩|模板处理|
|代码合并|安全漏洞自动修复|
|内联图片转成base64|在处理资源之前，先更新代码|
|编译转换，js ，react, vue, sass|上线之前走个测试|
|上传cdn|单线程|
|按需加载|
|简单的HTML处理|

## 基于webpack的前端工程化实践 ( 实践

### 项目

流量分析平台

### 介绍

通过分析最近一个月内的360搜索（PC&移动）PV数据并进行可视化展示。

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/webpack-project.png)

下面的内容还没深入理解，知识大致的了解，能力不足没法深入总结，请看ppt把









