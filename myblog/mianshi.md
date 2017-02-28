## 原生AJAX
```javascript
/*创建XMLHttpRequest对象*/
var request;
if(window.XMLHttpRequest) request = new XMLHttpRequest();
else request = new ActiveXObject("Microsoft.XMLHTTP");
/*创建URL进行发送*/
var url = "";
request.open("GET",url,true);
request.send();
/*等到接受*/
request.onreadystatechange = function(){
	if(request.readyState==4){
		
	}
}
```
## 常见状态码
|Type|Reason-phrase|Note|
| :-------- | :--------:| :--: |
|1XX|Informational|信息性状态码，表示接受的请求正在处理|
|2XX|Success|成功状态码，表示请求正常处理完毕|
|3XX|Redirection|重定向状态码，表示需要客户端需要进行附加操作|
|4XX|Client Error|客户端错误状态码，表示服务器无法处理请求|
|5XX|Server Error|服务器错误状态码，表示服务器处理请求出错|
## 事件监听
`element.addEventListener('click', cb, false);`第三个参数表示是否是捕获
`ele.attachEvent()`只有两个参数
事件绑定是因为`element.onclick`这种格式一个元素不能退绑定多个事件
## call和apply
`call`传递的是一系列的变量
`apply`第二个参数传递的是数组
如果一个函数的参数必须是单独的数值，但是传进这个函数的参数在我们一个已知的数组里面，在es5中我们就要用下面的方式：
```javascript
function foo(a,b,c){
	console.log(a,b,c);
}
var args = [5,6,9];
foo.apply(null,args);
```
如果使用es6的话，就可以减使用apply
```javascript
function foo(a,b,c){
	console.log(a,b,c);
}
var args = [5,6,9];
foo(...args);
```
如果对一个数组想使用取max的操作，在es5中我们一般会使用下面方法：
```javascript
console.log( Math.max.apply(null,[1,5,6]) );
```
在es6中直接使用
```javascript
console.log( Math.max(...[1,5,6]) );
```
将一个数组追加到另外一个数组的尾部，在es5中使用的是下面的方法
```javascript
var arr1  = [1,2,3];
var arr2 = [4,5];
Array.prototype.push.apply(arr1,arr2)
```
在es6中使用
```javascript
var arr1  = [1,2,3];
var arr2 = [4,5];
arr1.push(...arr2)
```
## jQuery中on，bind，live，delegate的区别
`on` 的第二个参数可以组织冒泡
`bind`有可能会产生冒泡
`live` live能够给新添加的元素添加事件，而`bind`在绑定事件的时候就检查元素对象是否存在
## 盒子模型
标准盒子模型 ：border和padding不计算入width之内
IE盒子模型   ：border和padding计算入width之内 
`css3`中的`box-sizing`能进行自由的切换
## 前后端路由
前端路由是单个页面的路由
后端路由是整个页面的路由，主要是写的数据请求接口
## promise的实现












