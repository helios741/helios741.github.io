# ES6和node中

## node篇

### Node中的事件循环

#### Node的运行机制
1. V8引擎解析javascript脚本
2. 解析代码后，调用`Node API`
3. `libuv`负责Node API的执行，他将不同的任务分配给不同的线程，形成Event loop(事件循环),以异步的方式将任务的执行结果返回给V8引擎
4. V8引擎将结果返回给用户

#### Node中的异步语法
除了`setTimeout`和`setInterval`这两个方法，Node.js还提供了另外两个与"任务队列"有关的方法：`process.nextTick`和`setImmediate`

```
process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像
```
```javascript

process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)
// 1
// 2
// TIMEOUT FIRED
```

### express中间件

#### 什么是中间件
express通过客户端传送过来的http请求来将一些列注册好的中间件联系起来，而这些中间件会按照注册的顺序依次处理这个http请求，在每个中间件处理请求的过程中，得出的数据可以传送到下一个中间件也可以直接返回给客户端。

#### 注册和处理中间件

- app.use([path], function) --- 注册中间件
- app.handle(req, res, out) --- 处理中间件(自动执行的

**path的作用是什么呢？** 过滤中间件

#### 原理

按照use的顺序一次加入一个数组，`app.use()`的时候这个函数里面的数组依次执行

### NODE环境和浏览器环境的不同
1. this不同 (全局
2. js引擎：前端的js引擎是浏览器，后台的js引擎是V8引擎
3. node不能操作dom
4. I/O读写
5. 模块加载
6. for-of(用来遍历数据—例如数组中的值)
7. 实现了`promise`规范

## ES6

### generator和async的对比
|类型|generator|async|
|:--:|:--:|:--:|
|内置执行器|靠执行器(co模块|自带执行器(和普通函数一模一样|
|执行|调用next方法执行|自动执行|
|语义|不语义化|语义化|
|适用性|yield||

### 对es6的一些认识
1. let 作用域 const
2. 箭头函数
3.  模块化
4.  class类
5.  支持promise

### promise的实现

就是把所有的方法压入一个数组，有三种状态，判断当前状态如果是`pending`就改变状态

## CMD规范

### 入口
`seajs.use('./b.js');`

### 参数定义
```javascript
// a.js
define(function (require, exports, module) {
    exports.add = function (a, b) {
        return a + b;
    };
});
```
```javascript
// b.js
define(function (require) {
    var a = require('./a');
    var c = a.add(1, 2);
    alert(c);
});
```
第一个参数`require`不能修改，其他的能修改

