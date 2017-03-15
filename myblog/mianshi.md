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
5. 多使用id选择器，在jQuery中因为它使用的是底层的`getElemntsById`

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

## css的优先级
important > 内联 > ID > 类 > 标签 | 伪类 | 属性选择 > 伪对象 > 通配符 > 继承

## express中间件得原理
通过客户端传过来的`http`请求将一系列的中间件连接起来，然后按照注册的前后顺序处理`http`请求，在每个中间件处理请求的过程中，得出的数据都可以传递到下一个中间件，我们也可以选择性的性质后面的中间件，也可以直接返回给客户端。

[express中间件实现的原理](http://liucc.me/2014/04/14/express-%E4%B8%AD%E9%97%B4%E4%BB%B6%E6%9C%BA%E5%88%B6%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86/)
[中间件的解释](http://www.cnblogs.com/lovesueee/p/4731635.html)
## CDN加速原理以及怎么找到全球最近的节点
CDN加速的原理：全球中有许多节点服务器，在现有的互联网基础之上新建一层只能虚拟网络，能够根据`网络流量和各节点之间的联系`，`负载状况`，`到用户的距离`,`响应时间`等综合因素将用户的请求导向离用户最近的那个节点上。
解决了`用户带宽小`,`用户访问量大`，`网点分布不均`
[不错的文章](http://blog.csdn.net/luoweifu/article/details/51031099)

## 在什么情况使用websoket代替ajax
`web socket`相对于`http`来说就是能够长时间的联系，但是这也让服务器必须能够坚持的住N个服务器的压力
## 跨域除了jsonp
### CORS (跨资源共享)
只需要服务器设置 `Access-Control-Allow-Origin: *`
### HTML5的postMessage
动态的插入`iframe`,在从`iframe`中拿回数据
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
### 服务器跨域
1. 前端先想本地服务器发送请求
2. 本地服务器代替前端在向目的服务器发送请求进行服务器见的通信
3. 本地服务器作为一个中转站的角色，再将相应的数据传送给前端
例子：
```javscript
//http://127.0.0.1:8888/server
var xhr = new XMLHttpRequest();
xhr.onload = function(data){
  var _data = JSON.parse(data.target.responseText)
  for(key in _data){
    console.log('key: ' + key +' value: ' + _data[key]);
  }
};
xhr.open('POST','http://127.0.0.1:8888/feXhr',true);  //向本地服务器发送请求   
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.send("url=http://127.0.0.1:2333/beXhr");    //以参数形式告知需要请求的后端接口
```
```javacript
//node js后台
//http://127.0.0.1:8888/feXhr
app.post('/feXhr',(req,res) => {
  let url  = req.body.url;
  superagent.get(url)           //使用superagent想api接口发送请求
      .end(function (err,docs) {
          if(err){
              console.log(err);
              return
          }
          res.end(docs.res.text); //返回到前端
      })
})

//http://127.0.0.1:2333/beXhr
app.get('/beXhr',(req,res) => {
  let obj = {
    type : 'superagent',
    name : 'weapon-x'
  };
  res.writeHead(200, {"Content-Type": "text/javascript"});
  res.end(JSON.stringify(obj));     //响应
})
```

## 后台是单线程还是多线程分布
[看看这篇文章就行了](https://github.com/DoubleSpout/threadAndPackage/blob/master/chapter.7.thread_and_process.md)
## 怎样避免XSS攻击
`CSRF` : `跨站请求伪造`
`XSS` : `跨站脚本`
[避免XSS攻击](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/09.3.md)
## 怎么避免CSRF
`CSRF` : 借助受害者的`cookie`骗取服务器的信任，
1. 验证 HTTP Referer 字段
    在http协议中，可以添加一个字段叫做`refered`，记录了http请求的来源地址.如歌黑客想要攻击的话必须要在自己的网站上，在服务器上的验证就不会通过，但是这个在IE6等其他浏览器是可以被修改的
2. 在请求地址中添加 token 并验证
    在http请求中以参数的形式加入一个随机的token，服务器烟瘴token。一些可以发表内容的网站，黑客可以在上面发表自己的个人网站，然后这个网站上也是带有了token
3. 在http头中自定义属性并验证
    把token的值放到http头的自定义属性之中，通过ajax加到http的头部。
## 协议的三要素
1. 语法 ： 数据与控制信息的结构和格式
2. 语义 ： 需要发出何种控制信息，完成何种动作以及做出何种相应
3. 同步 ： 时间实现的顺序
## TCP/IP 对应于OSI七层模型的哪些层
(应用层 + 表示层 + 会话层 ) -> 应用层
(传输层) -> 传输层
(网络层) -> 网络差
(数据链路层 + 物理层) ->网络接口层
## WEB缓存
缓存能够提高页面的反应速度
1. 方法 ： 添加Expires头和“配置ETag”
    当我们秀改了原来的文件的时候，就必须修改缓存文件的内容才能进行生效，可以使用`script`引入文件的时候加一个没有必要的参数，如：`<script src="a.js?v=0.0.1"></script>`。这时候我们更新了`index.html`和`a.js`,`index.html`里面引用了`a.js`，那么当我们访问的时候会出现怎样的变化呢？
    1. 如果先覆盖index.html，后覆盖a.js，用户在这个时间间隙访问，会得到新的index.html配合旧的a.js的情况，从而出现错误的页面。
    2. 如果先覆盖a.js，后覆盖index.html，用户在这个间隙访问，会得到旧的index.html配合新的a.js的情况，从而也出现了错误的页面。
- 解决方法 ： 把文件的内容进行`hash`,引入的文件变为下面的格式：`<script src="a_sdfgfsgd.js"></script>`其中`_sdfgfsgd`表示的是对`a.js`里面文件内容的`hash`。这样做的还出有下面几个：
    1. 线上的a.js不是同名文件覆盖，而是文件名+hash的冗余，所以可以先上线静态资源，再上线html页面，不存在间隙问题；
    2. 遇到问题回滚版本的时候，无需回滚a.js，只须回滚页面即可；
    3. 由于静态资源版本号是文件内容的hash，因此所有静态资源可以开启永久强缓存，只有更新了内容的文件才会缓存失效，缓存利用率大增；
    4. 修改静态资源后会在线上产生新的文件，一个文件对应一个版本，因此不会受到构造CDN缓存形式的攻击。
[一些缓存的介绍](http://www.alloyteam.com/2016/03/discussion-on-web-caching/)
[使用缓存中遇到的问题](http://www.infoq.com/cn/articles/front-end-engineering-and-performance-optimization-part1)
## 后端渲染和前端渲染有什么不同，优缺点
* 前端渲染：预先定义好`HTML`,然后向后台去请求数据得到数据后通过JS去加载数据
* 后台渲染：在后台渲染后`HTML`直接发给客户端
- 前端渲染优点：节省网络流量，利于`SEO`,节省部分服务器资源
- 前端渲染缺点：前端处理数据时可能会造成假死，不利于SEO，可能会增加http请求
- 后台渲染优点：前台页面加载迅速，没有数据的处理过程
- 后台渲染缺点：占用服务器资源，网路耗费大
1. 服务器为了让前端进行渲染，生成`json`返回给客户端浪费了大量的时间
2. 后台渲染之后，需要的网络传输的体积变大，带来了网络损耗和网络传输时间的损耗。一般在移动端我们通常不会吧渲染交给后台，一方面是后台渲染需要时间，还有就是庞大的数据传输也有延时，所以会出现白屏的问题
3. 可以让后端去渲染一部分，比如首页，然后其他的交给前端异步的处理

## attribute和property的区别是什么
- attribute是dom元素在文档中作为html拥有的元素
- property是DOM元素在js中拥有的属性

## 从输入网址到页面出来的整个流程
1. 浏览器根据用户输的URL提交给DNS解析出真实的ip地址
2. 客户端与服务器连理tcp连接
3. 客户端进行请求数据
4. 服务器进行相应，客户端对返回的资源进行(html,css,js,img)进行语法解析，简历相应的数据结构
5. 载入解析的资源文件，进对页面进行渲染

## Node环境与浏览器的环境的不同
1. this的不同
2. js引擎：前端的js引擎是浏览器，后台的js引擎是V8引擎
3. node不能操作dom
4. I/O读写
5. 模块加载

## 创建BFC的因素
float（除了none）、overflow（除了visible）、display（table-cell/table-caption/inline-block）、position（除了static/relative）

## css 布局，左边定宽右边自适应
1. 左边定宽度，左浮动，右边margin-left
2. 把上面的左浮动改为绝对定位
3. 使用浮动+负边距实现
```html
<div id="left">左边内容</div>
<div id="content">
  <div id="contentInner">主要内容</div>
</div>
```
```css
html, body { margin: 0; padding: 0; }
#left { float: left; width: 200px; margin-right: -100%; background-color: #ccc; }
#content { float: left; width: 100%; }
#contentInner { margin-left: 200px; background-color: #999; }
```

## 三列布局，两边定宽度中间自适应
```html
<div class="left">left</div>
<div class="mid">
	<div class="content">middle</div>
</div>
<div class="right">right</div>
```
```css
.left{
	width: 300px;
	float: left;
	background-color: #ccc;
	margin-right: -300px;
}
.mid{
	float: left;
	width: 100%;
}
.mid .content{
	margin-left: 300px;
	margin-right: 300px;
	background-color: blue;
}
.right{
	width: 300px;
	float: right;
	margin-left: -300px;
	background-color: red;
}
```
2. 使用绝对定位，左右分别：`left:0`和`right:0`
```html
<div class="left">left</div>
<div class="mid">middle</div>
<div class="right">right</div>
```
```css
.left,.right{
	width: 300px;
	position: absolute;
	top: 0;
	background-color: #ccc;
}
.left{
	left: 0;
}
.right{
	right:0;
}
.mid{
	margin: 0 300px;
	background-color: red;
}
```

## 实现两栏等高布局
1. 左边定宽度右边使用margin-bottom
```css
.box{
    overflow: hidden;
}
.left,
.right{
    margin-bottom: -600px;
    padding-bottom: 600px;
}
.left{
    float: left;
    background-color: red;
}
.right{
    float: left;
    background-color: blue;
}
```
```html
<div class="box">
    <div class="left">
        <p>asdgf</p><p>asdgf</p><p>asdgf</p>
    </div>  
    <div class="right">tombot</div>
</div>
```
2. flex布局 ( 下面会有介绍

## 浅拷贝和深拷贝
1. 浅拷贝
```javascript
function extend(p){
	var c = {};
	for( var i in p) c[i] = p[i];
	return c; 
}
var tmp = extend(pfa);
console.log( tmp.a );
tmp.from = "china"; 
console.log( tmp.from );
```
这样会导致修改了子元素同样写修改了父元素
```javascript
pfa = {
	a:5,
	place:["tianjin","beijing"]
}
function extend(p){
	var c = {};
	for( var i in p) c[i] = p[i];
	return c; 
}
var tmp = extend(pfa);
tmp.place.push("china") ; 
console.log( tmp.place );
console.log( pfa.place );
```
2. 深拷贝
```javascript
pfa = {
	a:5,
	place:["tianjin","beijing"]
}
function deepExtend(p,c){
	var c = c || {};
	for( var i in p) {
		if(typeof p[i] === 'object'){
			c[i] = (p[i].constructor === Array) ? [] : {};
			deepExtend(p[i],c[i]);
		} else c[i]  =p[i];
	}
	return c; 
}
var tmp = deepExtend(pfa);
tmp.place.push("china") ; 
console.log( tmp.place );
console.log( pfa.place );
```

## js当中原型链继承和类继承
[原型继承和类继承](https://75team.com/post/inherits.html)

## ES5和ES6继承的实质
* es5中首先创造子类的实例对象this,然后将父类的方法添加到this上(parent.call(this))
* 首先创造父类的实例对象this(必须先调用super)，然后调用子类的构造函数修改this

## 原生事件代理
```javascript
var event = {
	addEvent : function(elem,handler,type){
		if(elem.addEventListener) elem.addEventListener(type,handler,false);
		else if(elem.attachEvent) {
			elem.attachEvent("on"+type,function(){
				handler.call(elem);
			});
		} else elem["on"+type] = handler
	},
	removeEvent : function(elem,type,handler){
		if(elem.removeEventListener) elem.removeEventListener(type,handler,false);
		else if(elem.datachEvent) elem.datachEvent("on"+type,handler);
		else elem.["on"+type] = null;
	},
	//主要是停止冒泡事件，IE下面没有捕获
	stopPropagation : function(ev){
		if(ev.stopPropagation) ev.stopPropagation();
		else ev.cancelBubble = true;
	},
	//取消事件的默认行为
	preventDefault : function(ev){
		if(ev.preventDefault) ev.preventDefault();
		else ev.returnValue = true;
	},
	getTarget : function(ev){
		return ev.target || ev.srcElement;
	}
}
```
## Cookie 是否会被覆盖，localStorage是否会被覆盖。
`cookie`是可以被覆盖的，如果写入同名的`cookie`那么将会被覆盖
`localstorage`存储在对相同，键值对的形式

## 如何实现浏览器内多个标签页之间的通信
调用localstorge、cookies等本地存储方式

##  Css实现保持长宽比1:1
1. `width:20%;padding-top:20%;`
```html
<div class = "father">
	<div class = "daughter"></div>  
</div>
```
```css
.father {
    width: 100%;
}
.daughter {
    width: 20%; height: 0;
    padding-top: 20%;
    background: black;
}
```
2. 使用`:before`
```html
<div></div>
```
```css
body {
  text-align: center;
}

div {
  display: inline-block;
  width: 20%;
  background: green;
}
div:before {
  content: "";
  display: inline-block;
  padding-bottom: 100%;
  vertical-align: middle;
}
```

##  Css实现两个自适应等宽元素中间空10个像素
## Animation还有哪些其他属性
- `animation-fill-mode` : 让动画的结束保持在哪个状态
    1.  none：默认值，回到动画没开始时的状态。
    2.  backwards：让动画回到第一帧的状态。
    3.  both: 根据a`nimation-direction`轮流应用`forwards`和`backwards`规则。
- `animation-direction` ： 动画循环播放时，每次都从结束状态跳转到起始状态
    * `animation-direction`指定了动画播放的方向，最常用的值是`normal`和`reverse` ( 浏览器的支持不佳
- 简写形式`animation: 1s 1s rainbow linear 3 forwards normal;`

动画名字，动画时间，动画效果(渐变)，动画延时，结束保持的状态，动画播放的方向，动画播放的次数
```javascript
animation-name: rainbow;
animation-duration: 1s;
animation-timing-function: linear;
animation-delay: 1s;
animation-fill-mode:forwards;
animation-direction: normal;
animation-iteration-count: 3;
```

## CSS hack是什么意思
IE浏览器的`hack`分为三种
1. 条件hack  `<!--[if IE]>`
2. 属性hack `_color:red适用于IE6`,`*color:red适用于IE7以下`
3. 选择符hack `IE6能识别*html .class{}，IE7能识别*+html .class{}`
- IE都能识别*;标准浏览器(如FF)不能识别*； 　　
- IE6能识别 !important 能识别*； 　　
- IE7能识别*，不能识别!important; 　　
- FF不能识别*，但能识别!important; 

## 304是什么意思？有没有方法不请求不经过服务器直接使用缓存
- 304(未修改) 自从上次请求后，请求的网页未修改过。服务器返回相应的时候,不会放回网页的内容
- 设置`Cache-Control`和`Expires`等缓存

## 为什么要将js脚本放在底部
在请求`src`资源时会将其指向的资源下载并应用到文档中，当浏览器进行解析的时候，会暂停其他资源的下载和处理，直到该资源加载,编译,执行完毕，图片和框架等元素也是如此。

## http请求头有哪些字段
|协议头字段名|说明|实例|
|:--:|:---:|:---:|
|Accept|	能够接受的回应内容类型（Content-Types）|Accept: text/plain|
|Accept-Charset|	能够接受的字符集|Accept-Charset: utf-8|
|Accept-Encoding|	能够接受的编码方式列表|	Accept-Encoding: gzip, deflate|
|Accept-Language|能够接受的回应内容的自然语言列表|Accept-Language: en-US|
|Accept-Datetime|能够接受的按照时间来表示的版本|Accept-Datetime: Thu, 31 May 2007 20:35:00 GMT|
|Cache-Control|	用来指定在这次的请求/响应链中的所有缓存机制 都必须 遵守的指令|Cache-Control: no-cache|
|Connection|该浏览器想要优先使用的连接类型|Connection: keep-alive|
|Cookie|之前由服务器通过 Set- Cookie）发送的一个 超文本传输协议Cookie|	Cookie: $Version=1; Skin=new|
|Content-Type|请求的类型|text/plain|

## splice,slice
- slice(start,end)从0开始，返回截取的数组  ( 不改变原数组
- splice(start,lenght)从0开始 返回删除的数组。改变原来数组
- split() 字符串变为数组

##  Cookie跨域请求能不能带上
不能，因为在`CORS(跨资源共享)`，默认情况下浏览器发送跨域请求的时候不等发送任何的验证信息(`credentials`)。除非设置`xhr.withCredentials`为`true`,服务器也必须能够允许请求的时候携带认证信息。

## 对组件的理解
组件有`html,css,js,图片`等资源组成，是页面展示的一个独立部分，多个组件构成页面

## 静态属性怎么继承
1. 什么静态属性
```javascript
//类属性就是静态属性
function A(){
	this.some = "dd";
}
A.run = function(){
	console.log(444);
}
```
通过`for in`去遍历就可以了

## angular的双向绑定原理
- 使用脏检查的机制
- AngularJS使用`$scope.$watch`（视图到模型）以及`$scope.$apply`（模型到视图）来实现这个功能
`mg-model`会把事件处理指令`例如click`绑定到我们运用的输入元素上面，这就是`$scope.$apply`被调用的地方！而`$scope.$watch`是在指令的控制器中被调用的。
* 下面是手动实现一个简单的双向数据绑定
```javascript
var Scope = function( ) {
    this.$$watchers = [];   
};

Scope.prototype.$watch = function( watchExp, listener ) {
    this.$$watchers.push( {
        watchExp: watchExp,
        listener: listener || function() {}
    } );
};

Scope.prototype.$digest = function( ) {
    var dirty;

    do {
        dirty = false;

        for( var i = 0; i < this.$$watchers.length; i++ ) {
            var newValue = this.$$watchers[i].watchExp(),
                oldValue = this.$$watchers[i].last;

            if( oldValue !== newValue ) {
                this.$$watchers[i].listener(newValue, oldValue);

                dirty = true;

                this.$$watchers[i].last = newValue;
            }
        }
    } while(dirty);
};


var $scope = new Scope();

$scope.name = 'Ryan';

var element = document.querySelectorAll('input');

element[0].value = $scope.name;

element[0].onkeyup = function() {
    $scope.name = element[0].value;

    $scope.$digest();
};

$scope.$watch(function(){
    return $scope.name;
}, function( newValue, oldValue ) {
    console.log('Input value updated - it is now ' + newValue);

    element[0].value = $scope.name;
} );
```
[好文章](http://www.html-js.com/article/2145)

##　MVVM是什么
![](http://image.beekka.com/blog/2015/bg2015020110.png)

## 浏览器内核的种类
* Trident : IE类的浏览器
* Gecko : Firefox
* webkit: safari,chrome.,android

## Label的作用是什么？是怎么用的？
用来定义表单之间的控制关系，当用户选择标签的时候，浏览器会自动将焦点转到相关标签的表单控件之上
```css
<label for="username">Click me</label>
<input type="text" id="username">
```

## 介绍一下对浏览器内核的理解
主要分为两部分：`渲染引擎`和`js引擎`
* `渲染引擎`:负责对取得页面的内容(HTML,图像)加入样式信息，以及计算的显示方式，然后输出
* `JS引擎` : 执行个解析js来实现页面的动态效果

## HTML5的离线存储
### 介绍
在没有联网的状态下依然能够正常访问互联网，联网的时候更新用户的缓存文件
### 原理
基于`.appcache`文件的缓存机制，通过这个文件上的解析清单离线存储资源，这些资源就会想`cookie`一样被存储下来
### 使用
```javascript
<!DOCTYPE HTML>
<html manifest = "cache.manifest">
...
</html>
```
``` appcache
CACHE MANIFEST

CACHE:

js/app.js
css/style.css

NETWORK:
resourse/logo.png

FALLBACK:
/ /offline.html
```
1. `CACHE` : 表示需要离线存储的资源列表
2. `NETWORK` : 只有在线的情况下会被访问，不会被缓存
3. `FALLBACK` : (示例里面'/ /'不是注释)表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问`offline.html`

## generator和async的对比
||generator|async|
|:--:|:--:|:--:|
|内置执行器|靠执行器(co模块|自带执行器(和普通函数一模一样|
|执行|调用next方法执行|自动执行|
|语义|不语义化|语义化|
|适用性|yield||

## HTTP协议是无状态的，为了保证通话使用了什么技术方法弥补，如果禁用cookie怎么搞
常用的保持会话状态的方式有`session`,`cookie`,`URL GET`

## HTML的输出元素
```html
<form onsubmit="return false" oninput="o.value = parseInt(a.value) + parseInt(b.value)">
	<input type="number" name="a"> + 
	<input type="number" name="b"> =
	<output name="o"></output> 
</form>
```

## angualr中的MVVM

## jQuery和原生js中操作DOM的方法

## 正则表达式判断url，判断手机号
[正则表达式学习](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
## flex布局
## .怎么去除字符串前后的空格
（正则匹配^\s和\s$并且替代，Jquery的$.trim，string.trim()）
## jQuery优化的方法
## 实现响应式布局的方法
## 怎么使一个服务器稳定
[前端面试-网络篇](http://www.cnblogs.com/haoyijing/p/5898420.html)

## 面试计算机网络基础
[点击进入](https://www.nowcoder.com/discuss/1937?type=0&order=0&pos=25&page=3)



