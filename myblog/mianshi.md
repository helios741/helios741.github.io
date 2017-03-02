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
## call 和bind的区别
同样第二个参数接受的是不定参数，但是`bind`之后不会立即执行
## jQuery中on，bind，live，delegate的区别
`on` 的第二个参数可以组织冒泡
`bind`有可能会产生冒泡
`live` live能够给新添加的元素添加事件，而`bind`在绑定事件的时候就检查元素对象是否存在
`delegate`将事件绑定在元素的根元素上
```javascript
$('#root').delegate('a', 'click', function(){
    console.log('clicked');
});
```
## 盒子模型
标准盒子模型 ：border和padding不计算入width之内
IE盒子模型   ：border和padding计算入width之内 
`css3`中的`box-sizing`能进行自由的切换
## 前后端路由
前端路由是单个页面的路由
后端路由是整个页面的路由，主要是写的数据请求接口
## promise的实现
见博文
## 能够代替ajax
`fetch` 在新版本的浏览器下才支持，下面是例子：
如果要使用的话，要先申请自己的API KEY
```javascript
var URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=your_api_key&format=json&nojsoncallback=1&tags=penguins';

function fetchDemo() {
    fetch(URL).then(function(response) {
        return response.json();
    }).then(function(json) {
        insertPhotos(json);
    });
}

fetchDemo();
```
或者`websocket`
## 低版本浏览器不支持HTML5标签怎么解决
使用`html5.js`
或者条件注释
## new一个对象的过程都发生了什么
当我们进行`new A(“some”)`的时候，发生下面的过程
1. var o = new Object();
2. o.__proto__ = A.prototype;
3. A.call(o)
## IE的事件与w3c事件的区别？
*W3C事件流*:从根文档(html)开始遍历所有子节点，如果目标事件的父节点设置为捕获时触发，则执行该事件，直到目标被执行，然后再事件冒泡(设置为捕获时触发的事件不再被执行)。
*IE事件流*:从目标事件被执行，然后再冒泡父节点的事件，直到根文档。
## jQuery自定义事件
```javascript
$('#foo').bind('fucked', function(){
    console.log("I'm fucked.");
});
$('#foo').trigger('fucked');
```
## HTML5的新特性
1. 新的文档类型
2. 样式和脚本文件不用使用type
3. 标签的语义化
4. 必须属性，required，Autofocus 自动聚焦
5. audio，video，
6. canvas
7. websockets和webworkers，拖动，地理位置(Geolocation),SVG storage
## CSS3的新特性
1. @Font-face 能从客户端加载字体
2. @keyframes 表示加载到百分之多少做什么事情
3. `column-width`和`column-count`实现多列布局 `columns`两个参数第一个count第二个width;column-gap设置间隙
4. 渐变：
    + 一维渐变：`linear-gradient(to bottom right, blue, white);`
    + 色标 : `background: radial-gradient(red, yellow, rgb(30, 144, 255));`
5. `box-sizeing` : 改变盒子模型
6. `transition` : 过渡 `transition:width 2s, height 2s, background-color 2s, transform 2s;`
    + 四个参数 property过度的性质(background) duration (过渡的持续时间) delay(延时时间) -timing-function(过渡的类型ease)
7. `transform` : 可以让元素进行移动（translate）、旋转（rotate）、缩放（scale）、倾斜（skew） 
## http1.0和1.1的区别
1.
- http 1.0 每次请求一个文档都需要花费两倍的RTT时间(一次RTT用于TCP连接，另一次用于请求和接受文档)，还有点就是每次建立TCP连接服务器都要分配缓存和变量。这种非持续性的连接会对服务器造成很大的压力
- http1.1使用了持续性的连接，就是服务器在发送完相应之后仍然在一段时间内保持这条连接，是同一个用户(浏览器)和该服务器可以继续在这条连接上传送后续的http请求报文和相应报文
2.


## http1.1和2.0的区别
1. HTTP/2采用二进制格式而非文本格式   (二进制的协议解析起来，更加有效
2. HTTP/2是完全多路复用的，而非有序并阻塞的——只需一个连接即可实现并行 ( http1.1流水线的方式每次处理一个请求，减少TCP的空闲时间，但是在数据量较大，网速较慢的情况下就很阻碍后面的请求了。http2.0采用的是并行一次能处理多个请求
3. 使用报头压缩，HTTP/2降低了开销 ( 一个页面中有很多的资源，每个资源的头部有很多字节(1000+,如cookie)
4. HTTP/2让服务器可以将响应主动“推送”到客户端缓存中 (服务器推送服务通过“推送”那些它认为客户端将会需要的内容到客户端的缓存中，以此来避免往返的延迟

## 判断变量是不是字符串
1. `Object.prototype.toString.call('str') `能判断任何类型
2. `typeof 'str'`
## DOM操作的优化
1. 优化css样式
`如果需要动态更改css样式，尽量少的出发重绘`
如下
```javascript
element.style.fontWeight = 'bold' ;
element.style.marginLeft= '30px' ;
element.style.marginRight = '30px' ;
```
这样会出发多次重绘，如果直接给元素添加一个`class`就知识一次重绘
2. 不要反复使用 DOM 查询操作，应该用变量缓存
3. 避免大量使用会造成重绘的 DOM 操作
4. 优化节点添加，在外部组装好了之后在添加到DOM树中
[DOM操作的优化](https://cnodejs.org/topic/55e31bd6898f6bdc7e5551ac)
## new 操作符做了什么
创建一个空对象，同时还继承了该函数的原型。

## css的选择器
1. \* 通用元素选择器，匹配任何元素
2. 标签选择器，匹配所有使用E标签的元素 (直接写标签名
3. class选择器 
4. id选择器
5. E>F 子元素选择器，匹配所有E元素的子元素F
6. E F 后代元素选择器，匹配所有属于E元素后代的F元素，E和F之间用空格分隔
7. E,F 多元素选择器，同时匹配所有E元素或F元素，E和F之间用逗号分隔
8. E + F 毗邻元素选择器，匹配所有紧随E元素之后的同级元素F
9. E[att] 匹配所有具有att属性的E元素，不考虑它的值
10. 伪类
11. E ~ F 匹配任何在E元素之后的同级F元素
12. [阮一峰](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)
## 实现垂直水平居中
1. 使用绝对定位，`margin-top`设置为整个容易高度的负的一半
```html
<div class="content"> Content goes here</div> 
.content {
	width: 300px;
	border:1px solid red; 
    position: absolute;
    top: 50%;
    height: 240px;
    margin-top: -120px;
}
```
2. 使用`position`绝对定位
```html
<div id="content"> Content here</div>  
#content {
	border :1px solid red;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 240px;
    width: 70%;
}
```
3. 上面使用一个空的div
```html
<div id="floater"></div>
<div id="content"></div> 
html,body{
	height: 100%;
}
#floater {
    height: 50%;
    margin-bottom: -150px;
}
#content {
    height: 300px;
    margin: 0 auto;
    background-color: #FFCC66;
    width: 70%;
}
```
## 让一个元素消失
1. `display:none;`
2. `visibility:hidden` 这样只会导致页面的重绘不会导致页面的重排
3. `opacity:0`
4. 下面是一种不常用的：(设置高度为0
```javascript
.hiddenBox {
    margin:0;
    border:0;
    padding:0;
    height:0;
    width:0;
    overflow:hidden;
}
```
5. 设置元素的position与z-index，将z-index设置成尽量小的负数
6. 设置元素的position与left，top，bottom，right等，将元素移出至屏幕外

## 怎么使一个服务器稳定
## express中间件得原理
通过客户端传过来的`http`请求将一系列的中间件连接起来，然后按照注册的前后顺序处理`http`请求，在每个中间件处理请求的过程中，得出的数据都可以传递到下一个中间件，我们也可以选择性的性质后面的中间件，也可以直接返回给客户端。

[express中间件实现的原理](http://liucc.me/2014/04/14/express-%E4%B8%AD%E9%97%B4%E4%BB%B6%E6%9C%BA%E5%88%B6%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86/)
[中间件的解释](http://www.cnblogs.com/lovesueee/p/4731635.html)
## CDN加速原理以及怎么找到全球最近的节点
CDN加速的原理：全球中有许多节点服务器，在现有的互联网基础之上新建一层只能虚拟网络，能够根据`网络流量和各节点之间的联系`，`负载状况`，`到用户的距离`,`响应时间`等综合因素将用户的请求导向离用户最近的那个节点上。
解决了`用户带宽小`,`用户访问量大`，`网点分布不均`
[不错的文章](http://blog.csdn.net/luoweifu/article/details/51031099)
## 后台是单线程还是多线程分布

## 实现响应式布局的方法


## 在什么情况使用websoket代替ajax
`web socket`相对于`http`来说就是能够长时间的联系，但是这也让服务器必须能够坚持的住N个服务器的压力
## 跨域除了jsonp
### CORS (跨资源共享)
只需要服务器设置 `Access-Control-Allow-Origin: *`
### HTML5的postMessage
假设在`a.htm`l里嵌套个`<iframe src="http://www.b.com/b.html" frameborder="0"></iframe>`,在这两个页面里互相通信
```javascript
// a.html
window.onload = function() {
    window.addEventListener("message", function(e) {
        alert(e.data);
    });

    window.frames[0].postMessage("b data", "http://www.b.com/b.html");
}
```
```javascript
// b.html
 window.onload = function() {
    window.addEventListener("message", function(e) {
        alert(e.data);
    });
    window.parent.postMessage("a data", "http://www.a.com/a.html");
}
```











