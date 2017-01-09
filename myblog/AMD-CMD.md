#模块规范
## commonJS规范
这是一种在服务器使用的模块化规范
### commonjs有以下的特点
- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序

这个在`nodejs`中已经按照这种方式实现了。
`nodejs`和`commonjs`的关系就是，后者是前者的规范，前者是后者的实现

## CMD规范
在这篇文章中我们主要讲解的就是`CMD`这个规范。
`CMD` 是 `SeaJS` 在推广过程中对模块定义的规范化产出.
也就是说CMD是通过Seajs实现的。
### 利用Seajs实现CMD的步骤
1. 在页面中引入sea.js文件
2. 定义一个主模块文件，比如：main.js
3. 在主模块文件中通过define的方式定义一个模块，并导出公共成员
4.  在页面的行内脚本中通过seajs.use('path',fn)的方式使用模块
5.  回调函数的参数传过来的就是模块中导出的成员对象
### Seajs的使用

#### 定义一个模块
```javascript
define(function(require, exports, module) {
  exports.add = function(a, b) {
    return a + b;
  };
});
```
####  使用一个模块
- seajs.use
  + 一般用于入口模块
  + 一般只会使用一次
- require
  + 模块与模块之间

#### 导出成员的方式

- module.exports
- exports.xxx
- return
三种方式的优先级依次升高

####  同步加载模块
var convertor = require('./convertor.js');
这样就能使用`convertor.js`暴露出来的方法和属性

#### 异步加载模块

- 默认require的效果是同步的，会阻塞代码的执行，造成界面卡顿
- require.async();

```javascript
require.async('path',function(module) {

});
```
和同步加载在代码方面就是多个几个字母的区别

#### 使用第三方依赖（jQuery）
- 由于CMD是国产货，jquery默认不支持
- 改造

```javascript
// 适配CMD
if (typeof define === "function" && !define.amd) {
  // 当前有define函数，并且不是AMD的情况
  // jquery在新版本中如果使用AMD或CMD方式，不会去往全局挂载jquery对象
  define(function() {
    return jQuery.noConflict(true);
  });
}
```
### Seajs配置

- [配置](https://github.com/seajs/seajs/issues/262)
- seajs.config
  + base
  + alias


























