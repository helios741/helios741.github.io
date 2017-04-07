# javascript基础

## 数据类型

- 基本数据类型：Number，String，Boolean，Undefined，Null
- 复杂数据类型：Object，Array，Function，RegExp，Date，Error
- 全局数据类型：Math

### 原始数据类型
`Boolean`,`null`,`undefined`,`Number`,`String`,`Symbol`
Object不属于原始数据类型

## prototype的作用
每个函数都有一个`prototype`属性，这个属性是一个指针指向一个对象，而这个对象的作用就是`共享构造函数的属性和方法`，它是通过调用构造函数来创建那个对象的实例

## call，apply和bind的区别

- call传递的是一系列变量
- apply传递的是数组
- bind和call一样第二个参数也是接受的不定参数，但是接受之后不会立即执行

应用：

### 一个函数必须传递的多个变量不是数组，但是这个这些变量保存在数组(args)中
在es5中我们会使用下面的方式
```javascript
function foo(a,b,c) {
	console.log(a+b+c);
}
var args = [1,2,3];
foo.apply(null,args);
```
在es6中我们会使用下面的方式
```javascript
function foo(a,b,c) {
	console.log(a+b+c);
}
var args = [1,2,3];
foo(...args);
```
### 对一个数组取max操作
在es5中
```javascript
Math.max.apply(null,[1,2,3,6]);
```
在es6中
```javascript
Math.max(...[1,2,6]);
```
### 在一个数组后面追加一个数组
在es5中
```javascript
var a = [1,2,3];
var b = [4,5,6];
Array.prototype.push.apply(a,b);
```
在es6中
```javscript
arr.push(...b);
```

## 原生ajax

### readyState的几个状态
1. 0代表未初始化，还没有调用open方法
2. 1表示正在加载open已经调用，当是send还没有被调用
3. 2代表已经加载完毕，send已经被调用，请求已经开始
4. 3代表交互中，服务器正在发送相应
5. 4代表完成，客户端接收响应

### ajax的几个步骤
1. 创建ajax对象
2. 创建URL并准备发送
3. 发送并进行监听
4. 接收到服务器的相应
```javascript
1. 创建XMLHTTPRequest
var req;
if(window.XMLHTTPRequest) req = new XMLHTTPRequest();
else req = new ActiveXObject("Microsoft.XMLHTTP");
2. 创建URL
var url = "";
req.open("GET",url,true);
3. 进行发送
req.send();
4. 接收服务器的应答
req.onreadyStateChange = function(){
	if(req.readState == 4 )
}
```

## javascript的new过程发生了什么
创建一个空对象并且继承了这儿函数的原型
```javascript

var o = new Object();
o.__proto__ = A.prototype;
A.call(o);
```

## 判断一个变量是不是字符串
1. 能判断任何类型`Object.prototype.toString.call(str)`
2. jQuery源码中 `var o = {}; o.toString.call(str)`
3. typeof str

## attribute和property

1. 前者是元素在HTML中拥有的属性
2. 后者是在js中拥有的属性

## javascript中的浅拷贝和深拷贝

1. 浅拷贝

```javascript
function extends(p){
	var c;
	for(var i in p) c[i] = p[i];
	return c;
}
```

2. 深拷贝

```javascript
function extends(p,c){
	var c = c || {};
	for(var i int p) {
		if( typeof p[i] === 'object' ){
			c[i] = (p[i].contstructor === 'Array') ? [] : {};
			extens(p[i],c[i]);
		} else c[i] = p[i];
	}
}
```

## splce,slice
- slice(st,end):返回截取的数组(不改变原数组
- splice(st,len):返回删除的数组改变原来数组

## 数组和字符串的相互转换
- split() 字符串变为数组
- join()数组变为字符串

## 静态属性怎么继承

for in

## 原生事件代理
```javascript
var Event = {
	add:function(elem,handler,type) {
		if(window.addEventListener) elem.addEventListener(type,handler,false);
		else if(elem.attachEvent) {
			elem.attachEvent('on'+type,function(){
				handler.call(elem);
			});
		} else elem.['on'+type] = handler;
	},
	remove:function(elem,type,handler) {
		if(elem.removeEventListener) elem.removeEventListener(type,handler,false);
		else if(elem.datachEvent) elem.datachEvent('on'+type,handler);
		else elem['on' + type] = null;
	},
	// 主要是阻止冒泡，因为IE下没有捕获
	stopProgation:function(ev){
		if(ev.stopProgation) ev.stopProgation();
		else ev.cancelBubble = true;
	},
	//阻止默认时间
	preventDefult:function(){
		if(ev.preventDefult) ev.preventDefult();
		else ev.returnValue = false;
	}
};
```

### javascript事件模型
1. 原型事件模型：`ele.onclick=function(){}`这种类型的事件模型
2. 冒泡事件模型是指事件从事件的发生地（目标元素），一直向上传递，直到document
3. 捕获型则恰好相反，事件是从document向下传递，直到事件的发生地（目标元素）

## ES和ES6继承的区别
* ES5首先创造子类的实例对象this，然后把父类的方法和属性添加到子类上面(parent.call(this))
* 首先创造父类的对象this(必须先调用super)，然后调用子类的构造函数修改this


## 借助构造函数和原型链继承有哪些缺点

1. 创建子类型实例的时候，不能向父类的构造函数
2. 来自包含引用类型的原型，会被所有实例共享

## 正则表达式

|方法|描述|
|:--:|:--:|
|exec|一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回null）|
|test|一个在字符串中测试是否匹配的RegExp方法，它返回true或false|
|match|一个在字符串中执行查找匹配的String方法，它返回一个数组或者在未匹配到时返回null|
|search|一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1|
|replace|一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串|
|split|一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的String方法|

```javascript
	var myRe = /d(b+)d/g;
	var str = "cdbbdbsbz";
	var myArray = myRe.exec("cdbbdbsbz");
	var a = str.match(myRe);
	console.log(myArray); // ["dbbd", "bb", index: 1, input: "cdbbdbsbz"]
	console.log(a);  // ["dbbd"]
	
	var re = /(\w+)\s(\w+)/;
	var str = "John Smith";
	var newstr = str.replace(re, "$2, $1");
	console.log(newstr); // Smith, John
	
	var str = 'hello world!';
	var result = /^hello/.test(str);
	var result2 = str.search(/^hello/);
	console.log(result); // true
	console.log(result2); // 0
	
	var names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ';
	console.log(names);
	var re = /\s*;\s*/;
	var nameList = names.split(re);
	console.log(nameList);
```

|字符|含义|
|:--:|:--:|
|^|开头|
|$|结束|
|*|	匹配前一个表达式0次或多次。等价于 {0,}|
|+|	匹配前面一个表达式1次或者多次。等价于 {1,}|
|?|	匹配前面一个表达式0次或者1次。等价于 {0,1}|
|.|（小数点）匹配除换行符之外的任何单个字符|
|\d|等价于[0-9]|
|\D|(匹配一个非数字)等价于[^0-9]|
|\s|匹配一个空白字符，包括空格、制表符、换页符和换行符|
|\S|匹配一个非空白字符|
|\w|匹配一个单字字符（字母、数字或者下划线）等价于[A-Za-z0-9_]|
|\W|匹配一个非单字字符，例如匹配 "50%." 中的 '%'|