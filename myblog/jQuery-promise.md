在前面的文章中说了在`jQuery`中是怎么加载DOM的，如果不了解请移步[jQuery中记载DOM的流程](http://www.shangyilong.cn/#!/detail/93257)，这这篇文章中我们就要看到源码中怎么实现第三部分的.
## 什么是异步对象
如果对`es6`或者一些框架比较的了解的对这个概念是比较熟悉的，所谓的异步就是在执行一个逻辑的同时并不会应该其他的逻辑，但是在`javascript`中没有多线程的概念，那么只能手动的去实现，在`NodeJs`得异步操作就是通过回调函数来实现的。
在前面也说过对`promise`的实现，如果想深入了解请异步[es6中promise的原理和实现](http://www.shangyilong.cn/#!/detail/97400)

## jQuery中的callbacks

在源码中的$2880$行开始是对`Callbacks`这个对象的封装，下面先说一下这几个方法的用法，
1. add，里面添加的是一个函数或者是个函数列表，表示添加进的函数
```javascript
    var cb = $.Callbacks();
	function aaa(){console.log(1);}
	function bbb(){console.log(2);}
	cb.add(aaa,bbb);
	cb.fire();
```
2. fire 执行添加进的所有方法
3. add能够用在不同的作用域中
```javascript
	var cb = $.Callbacks();
	function aaa(){console.log(1);}
	(function(){
		function bbb(){console.log(2);}
		cb.add(bbb);
	})();
	
	cb.add(aaa);
	cb.fire();
```
### 实现原理
在源码的`3041行`我们能够看到，当我们调用`$.Callbacks()`的时候，起始返回的是一个`self`对象，我们操作的`add`,`fire`等等都是在这个对象里面的。当我们在外面调用`cb.fire()`的时候，其实是调用的`cb.fire()`，这个方法又会调用`self当中在$3018行的$`fireWith` 这个方法，在`fireWith(context,args)`中能够传递两个参数第一个是执行的上下文，一般情况下就是`self`这个对象，然后第二个是传递的参数，这样我们就知道，其实调用`fire()`的时候是可以传递参数的，我们先举个例子然后在接着说下面的：
```javascript
	var cb = $.Callbacks();
	function aaa(n){console.log(n);}
	cb.add(aaa);
	cb.fire(666);
```
这样也是能够运行的就是把fire里面的参数传送给`aaa`这个函数。
然后会有进入一个`fire`函数，这个函数是真正的执行已经添加过的方法，在源码的$2905行$就能看到这个函数，就会顺序的执行。
### `$.Callbacks`参数
这几个参数要理解一下，在后面还是会用到的
1. once 值运行一次fire
```javascript
	var cb = $.Callbacks("once");
	function aaa(){console.log(1);}
	function bbb(){console.log(2);}
	cb.add(aaa);
	cb.fire();
	cb.add(bbb);
	cb.fire();
	// 输出1
```
2. memory 不论add在哪个位置，添加完了函数之后在运行fire
```javascript
	var cb = $.Callbacks("memory");
	function aaa(){console.log(1);}
	function bbb(){console.log(2);}
	cb.add(aaa);
	cb.fire();
	cb.add(bbb);
	// 输出1 2
```
3. unique 确保回调只能增加一次
```javascript
	var cb = $.Callbacks("unique");
	function aaa(){console.log(1);}
	function bbb(){console.log(2);}
	cb.add(aaa);
	cb.add(bbb);
	cb.add(bbb);
	cb.fire();
	//输出 1 2
```
4. stopOnFalse 在return false的时候不会执行下面的
```javascript
	var cb = $.Callbacks("stopOnFalse");
	function aaa(){console.log(1);return false;}
	function bbb(){console.log(2);}
	cb.add(aaa);
	cb.add(bbb);
	cb.add(bbb);
	cb.fire();
	//输出 1
```

## jQuery中的Deferr
上面的部分大多数的都属于铺垫的部分，下面才是说的真正的在`jQuery`中`DOM`加载的步骤。
也就是`jQuery.ready.promise().done( fn );`
我们现在$3044行$找到`Deferred`这个对象，下面我们来仔细研究这段话
```javascript
var tuples = [
		// action, add listener, listener list, final state
		[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
		[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
		[ "notify", "progress", jQuery.Callbacks("memory") ]
	],
```
`tuples`这个数组中的数组，我们先设为`data`方便后面描述，`data[0]`表示当状态为`data[1]`的时候调用函数，实例的是`data[2]`这个时候的状态为`data[3]`，这个里面的第三个表示正在执行，没有状态，这个里面说的状态指的是`Deferred`对象下面的额`status`这个属性。下面来看一个例子：
在我们平常使用`ajax`的时候起始返回的就是一个延时对象，就像下面的形式
```javascript
$.ajax("").done(function(){}).fail(function(){});
```
一般的流程就会是下面这个样子的。
```javascript
	var dfd = $.Deferred();
	setTimeout(function(){
		dfd.resolve();
		//dfd.reject();
	},1000);
	dfd.done(function(){
		console.log(666);
	}).
	fail(function(){
	    console.log("fail");
	});
```
我们在第$3055到3090行$是对`Promise`这个对象的定义，从$30094行$就是开始对`deferred`的定义，并且为他扩展了`resolve`,`reject`,`notify`这三个状态以及相应，然后在$3123行$中又调用了`promise.promise( deferred)` 这个方法是在$3087行$进行定义的，也就是把`promise`这个对象上面得所有方法和属性添加到`deferred`，那么现在我们就能知道`deferred`和`promise`的区别了。***deferred比promise多三个状态方法***
```javascript
	function test(){
		var dfd = $.Deferred();
		return dfd;
	}
	var tmp = test();
	tmp.resolve();

	tmp.done(function(){
		console.log("success");
	}).fail(function(){
		console.log("fail");
	});
	//输出 success
```
上面的代码就是能够执行了，这样就对外暴露了太多的方法，我们就可以使用下面的代码进行改造一下：
报错代码
```javascript
function test(){
	var dfd = $.Deferred();
	return dfd.promise();
}
var tmp = test();
tmp.resolve();
```
下面的就是可以执行的：
```javascript
function test(){
	var dfd = $.Deferred();
	dfd.resolve();
	return dfd.promise();
}
var tmp = test();
tmp.done(function(){
	console.log("success");
}).fail(function(){
	console.log("fail");
});
```
## 再看DOM加载
在这个时候我们在来看`jQuery`中的`DOM`加载的`jQuery.ready.promise().done( fn );`也就是当`promse`对象出发`resolve`的时候就表示(监听的事件)完成加载了。

## 补充 $.when
这个方法在平时也是很重要的，使用方法如下
```javascript
function aaa() {
	var dfd = $.Deferred();
	dfd.resolve();
	return dfd.promise();
}
function bbb() {
	var dfd = $.Deferred();
	dfd.resolve();
	return dfd.promise();
}
$.when(aaa,bbb)
	.done(function(){
		console.log("success");
	})
	.fail(function(){
		console.log("fail");
	});
```
很容易能看出什么意思，当两个方法都是成功的时候才进行的是`done`方法。



