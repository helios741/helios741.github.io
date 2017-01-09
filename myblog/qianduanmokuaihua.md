# 模块化开发
## 介绍
### 什么是模块化开发
- 将软件产品看作为一系列功能模块的组合
- 通过特定的方式实现软件所需模块的划分、管理、加载
### 为什么要使用模块化开发呢
- 主要的目标是解决协同开发的问题
- 使得代码能够服用
- 解决了一些矛盾
    + 大量文件的引入
    + 命名出现冲突
    + 文件之间存在依赖关系

### 模块化要到达的目标
**高内聚，低耦合**
什么是高内聚，就是模块之间内部的依赖关系强
什么低耦合，就是模块之间的没有过多的相互牵连
#### 在下面的情况中我们要使用模块化开发
-  业务复杂
-  重用逻辑非常多
-  扩展性要求较高
-  多人合作

### 怎么解决没有模块的带来的问题
先说一下什么命名冲突和是怎么产生的冲突，
比如下面的代码，在index中引入了其他人的库文件(module2），
```javascript
<script src="module2.js"></script>
  <script>
    var module = function() {
      console.log('hellor');
    }
    module();
  </script>
```
下面是`module2`中的代码：
```javascript
var module = function  () {
  console.log('hi');
}
```
这个肯定是没有悬念的会打印出*hi*的，这就是明明冲突。
下面介绍几种解决明明冲突的方式:
下面的情况都是为了实现这个简单计算器的功能(+,-,*,/)
![](https://helios741.github.io/tmp/calc.png)
#### 使用全局函数
先看到代码：
```javascript
function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
  return parseFloat(a) / parseFloat(b);
}
```
这种方式是我们刚开始学习编程是时候，对每一功能编写一个对应的 函数，但是这样加单粗暴的结果就带来了对全局变量(window)中暴露的方法太多了，这样会很污染全局环境
#### 封装函数
我们可以把所有的函数全部封装到对象里面，使这些函数变为对象的方法，
先看代码：
```javascript
var calculator = {
  add: function(a, b) {
    return parseFloat(a) + parseFloat(b);
  },
  subtract: function(a, b) {
    return parseFloat(a) - parseFloat(b);
  },
  multiply: function(a, b) {
    return parseFloat(a) * parseFloat(b);
  },
  divide: function(a, b) {
    return parseFloat(a) / parseFloat(b);
  }
};
```
用这种方式，比如我们使用加法就可以使用`calculator.add(a,b)`这样的方式去调用加法。
为了让这种方式更加语义化，我们还可以按照对象里面方法的类型继续进行分类。
比如对应于上面的情况，我们先可以抽象出来一个数学对象，然后数学对象里面有，运算和转换两个对象或者更多，如下面的代码：
```javascript
var math = {};
    math.calculator = {};
    math.calculator.add = function(a, b) {
      return a + b;
    };
    math.convertor = {};
```
当我们想进行的运算的时候就可以使用`math`下面的`calculator`这个对象的方法就可以了。
这样的做法就很像其他语言中命名空间的概念了。也做到了**高内聚低耦合**的特性。
但是这样的做法还是有一点不好的地方，就是没有私有的空间，所有的方法都是对外暴露的。

#### 封装为函数（划分私有空间）
利用函数的特性我们就能做到像对外部暴露什么方法就能暴露什么方法，先看下面的代码：
```javascript
var calculator = (function() {
  function convert(input){
    return parseInt(input);
  }

  function add(a, b) {
    return convert(a) + convert(b);
  }

  function subtract(a, b) {
    return convert(a) - convert(b);
  }

  function multiply(a, b) {
    return convert(a) * convert(b);
  }

  function divide(a, b) {
    return convert(a) / convert(b);
  }

  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide
  }
})();
```
在这个例子里面除了`convert`这个函数是私有的之外外，所有的函数都是共有的，这样做虽然基本上已经满足的功能，但是这样的做法是很难维护，如果这个时候增加一个新的功能，比如说我们这个例子中新增一个取模的功能，我们应该怎么办呢。我们直接改已经封装好的源代码显然是不好的行为，如果项目足够大的话，你也是很难找到改哪里的。
#### 封装为可维护的函数
为了解决上个方法提及到的问题，我们可以利用向构造函数里面传递要操作的对象就可以了，看代码：
```javascript
(function(calculator) {
  function convert(input) {
    return parseInt(input);
  }
  calculator.add = function(a, b) {
    return convert(a) + convert(b);
  }
  window.calculator = calculator;  //!important
})(window.calculator || {});
```
我们要操作的是全局下的`calculator`这个对象，就可以先传进去然后新增功能的时候看下面的代码：
```javascript
(function(calculator) {
  function convert(input) {
    return parseInt(input);
  }
  // calculator 如果存在的话，我就是扩展，不存在我就是新加
  calculator.remain = function(a, b) {
    return convert(a) % convert(b);
  }
  window.calculator = calculator;
})(window.calculator || {});
```
对应于这种我们方式我们要遵循一个原则就是：**开闭原则**。
开闭原则：对新增开放，对修改关闭
但是在思考一下，我们要引入第三方库怎么办，比如说我们要引入`jQuery`，我们就用类似的方式把，`jQuery`对象传进去就可以了，看下面代码：
```javascript
(function(calculator, $) {
  function convert(input) {
    return parseInt(input);
  }
  calculator.remain = function(a, b) {
    return convert(a) % convert(b);
  }
  window.calculator = calculator;
})(window.calculator || {}, jQuery);
```

#### 第三方依赖管理

这就要使用模块化开发当下著名的`AMD`和`CMD`了
`AMD`是属于世界通用的一个规范(异步模块定义)
`CMD`是在中国范围内引用的一种规范(通用模块定义)


在下一篇文章中会重点介绍这些规范和这些规范的使用



















