## 手动实现es6的中的promise
### Promise的原理
**个人理解**：`Promise`就是把所有正确的回调的函数放入一个数组里面，所有错误的回调函数放入一个数组里面，然后最后遍历这个数组进行同步的运行，这也是为什么promise一旦开始就不能结束的原因
### 简单实现一个promise
#### 实现promise基本框架
```javascript
function Promise(exec){
	let me = this;
	me.state = "pending";
	me.data = undefined;
	me.succseeCallbackArr = [];
	me.errorCallbackArr = [];
	function resolve(val){
	//success callback
	}
	function reject(reason){
	// error callback
	}
	exec(resolve,reject);
}
```
#### 实现resolve和reject函数
```javasript
function resolve(val){
	if(this.status === "pending"){
		me.status = "resolve";
		me.data = val;
		for(let i=0,len = me.succseeCallbackArr.length;i<len;i++){
			me.succseeCallbackArr[i]();
		}
	}
}
function reject(reason){
	if(this.status === "pending"){
		me.status = "reject";
		me.data = val;
		for(let i=0,len = me.errorCallbackArr.length;i<len;i++){
			me.succseeCallbackArr[i]();
		}
	}
}
```
#### 实现then方法
很明显`then()`要返回的是一个新的`promise`对象，所以我们要把这个函数挂载到原型链上，下面先看一下基本的架构：
```javascript
Promise.prototype.then = function(onResolved,onRejected){
	let me = this;
	let promiseRet;
	onResolved = typeof onResolved=="function"?onResolved:undefined;
	onRejected = typeof onRejected=="function"?onRejected:undefined;

	if(this.status === "resolve")
		return new Promise(function(resolve,reject){});
	if(this.status === "reject")
		return new Promise(function(resolve,reject){});
	if(this.status === "pedding")
		return new Promise(function(resolve,reject){});

};
```
下面我们就是要执行，返回的这个回调函数继续进行了,在这里我只是实现一个`resolve`就可以了，其他的类似:
```javascript
if(this.status === "resolve")
return new Promise(function(resolve,reject){
	try{
		if(let tmp =onRejected(this.data) instanceof Promise) 
			tmp.then(resove,reject);
		else 
			resolve(tmp);
	}catch(e){
		reject(e);
	}
});
```
#### 实现catch方法
这个方法实现起来是及其的简单
```javascript
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}
```
