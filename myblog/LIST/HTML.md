# HTML

## HTML5的新特性

1. 新的文档类型：在文档的第一行`<!DOCTYPE>`,该标签告知浏览器文档所使用的`HTML`规范，`doctype`声明不属于标签，他是一条指令告诉浏览器编写所用的标记版本
**doctype的作用？**
定义了XML或者HTML的特定版本中允许出现什么不允许出现什么，在渲染页面的时候浏览器会根据这些规则检查页面的有效性并采取相应的措施。`DOCTYPE`有三种风格：`严格(strict)`,`过渡(transitional)`,`框架集(frameset)`.必须声明在第一行
2. 样式和脚本不用使用`type`
3. 标签的语义化
4. 必须属性:`required`,`autofocus`自动聚焦
5. 媒体属性：`audio`,`video`
6. canvas
7. websocket,webworkers,拖动，地理位置(Geolocation),SVG,localstorage

## HTML5移除的哪些元素
对可用性产生负面影响的元素：`frame`，`frameset`，`noframes`
纯表现的元素：`basefont`，`big`，`center`，`font`

## HTML的语义化的理解
语义化的含义就是用正确的标签做正确的事情，html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；在没有样式CCS情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。
- 用正确的标签做正确的事情
- html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析
- 在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的。
- 搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解

## meta是做什么的
标签提供关于HTML文档的元数据。元数据不会显示在页面上，但是对于机器是可读的。它可用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 web 服务 	

## xhtml和html有什么区别?
功能上：主要是XHTML可兼容各大浏览器、手机以及PDA，并且浏览器也能快速正确地编译网页
书写习惯：XHTML 元素必须被正确地嵌套，闭合，区分大小写，文档必须拥有根元素

## 低版本浏览器怎么支持HTML5

1. 使用`html5.js`
2. 使用条件注释 (<!–[if lt IE 9]> ->)

## 创建BFC的元素

* float(除了none)
* overflo(除了visible)
* display(table-cell/table-caption/inline-block)
* postion(除了static/relative)

## HTML5的离线存储

### 介绍
在没有联网的情况下，仍然能够正常的访问互联网，有网的时候更新用户的缓存文件

### 原理
基于`.appcache`文件的缓存机制，通过这个文件上的解析清单离线存储资源，这些资源就会像`cookie`一样被保存下来

### 使用
```javascript
CACHE MANIFEST

CACHE: //离线储存的资源列表

NETWORK://在有网的情况下会被访问，不会被缓存

FALLBACK: // 下面的/ /不是注释表示如果第一个失败了，回去访问这个
/ /offline.html
```

## HTML的输出元素
```html
<form onsubmit="return false" oninput="o.value = parseInt(a.value) + parseInt(b.value)">
	<input type="number" name="a"> + 
	<input type="number" name="b"> =
	<output name="o"></output> 
</form>
```

## label的作用是什么，怎么用
用来定义表单之间的控制关系，当用户选择标签的时候，浏览器会自动将焦点转到相关标签的表单控件之上
```html
<label for="username">Click me</label>
<input type="text" id="username">
```

## postMessage
动态的插入`iframe`，从`iframe`中取出数据，具体在跨域中讲

## cookie和localstorage能否被覆盖
cookie如果写入同名的就能被覆盖
localstorage存储在一个对象中有事键值对，也是能够被覆盖的

## cookie在跨域的时候能不能被带上

不能，因为在CORS(跨资源共享)，默认情况下浏览器发送跨域请求的时候不能发送任何验证信息，除非设置`xhr.withCredentials`为`true`,，服务器也必须运行请求的时候携带认证信息

## localstorage的优劣以及和cookie的区别


### 优势
1. 扩展了cookie的4k限制
2. 可以将第一次请求的数据直接存储到本地，这相当于一个5M大小针对前端页面的数据库，相比于cookie更加节省带宽

### 劣势
1. 只有IE8+才支持这个属性
2. 浏览器把localstorage的类型定义为string类型，要变为我们常用的json格式需要一定的转换
3. 在浏览器的隐私模式下是不可取的
4. 本质上是对字符串的读取，存储内容多的话会消耗内存，导致页面变卡
5. 不能被爬虫到

### 和cookie的区别

|特性|cookie|localstorage|sessionStorage|
|:---:|:----:|:--:|:--:|
|大小|4k|5M|5M|
|数据的生命周期|一般有服务器产生，可以设置失效时间，如果是浏览器生成的cookie，默认是浏览器关闭后失效|除非请求否则永远有效|仅在当前会话中有效，关闭页面或浏览器失效|
|与服务器通信|每次都会携带在http的头部|仅在浏览器中保存不和服务器通信|同左|
|易用性|需要程序员自己封装，原生cookie不友好|原生接口可以接收|

### 应用场景
- 因为每个http请求中都会带有cookie，所以cookie能精简尽量精简，比较常用的是判断一个用户是否登录。
- localstorage存储一些信息
- sessionstroage没当用户，输入完了就没有用了的信息，比如说不保存密码就是

## 在什么情况使用websoket代替ajax
`web socket`相对于`http`来说就是能够长时间的联系，但是这也让服务器必须能够坚持的住N个服务器的压力

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