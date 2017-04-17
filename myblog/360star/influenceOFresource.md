# 资源对渲染的影响

资源包括：`css`,`js`,`font`,`img`

## CSS

Q: CSS是在DOM加载完立即开始渲染开始加载完DOM和CSSOM开始渲染？
A: 后者

### CSS会阻塞初次渲染

```css
<style>/* styles here */</style>
<link rel="stylesheet" href="index.css">
```
- 通过以上两种方式定义的CSS，均会阻塞初次渲染
- 浏览器会在解析完CSS后，再进行渲染。这是为了防止样式突变带来的抖动。
- 通过link标签引入的CSS阻塞的时间可能更长，因为加载它需要一个网络来回时间

### 如果不是关键资源，如何避免其阻塞

#### media query

```css
<link rel="stylesheet" href="index_print.css" media="print">
```

- 此样式表仍会加载
- 当浏览器环境不匹配媒体查询条件时，该样式表不会阻塞渲染
- 我们可针对不同媒体环境拆分CSS文件，并为link标签添加媒体查询，避免为了加载非关键CSS资源，而阻塞初次渲染

### 还有什么方式能够引入CSS

#### 通过document.write添加link

```javascript
<script>
  document.write('<link ref="stylesheet" href="index.css" />');
</script>
```
仍然会阻塞初次渲染

#### 通过DOM API添加link

```javascript
var style = document.createElement('link');
style.rel = 'stylesheet';
style.href = 'index.css';
document.head.appendChild(style);
```
不会阻塞初次渲染

#### preload

```css
<link rel="preload" href="index_print.css" as="style" onload="this.rel='stylesheet'">
```

- rel不是stylesheet，因此不会阻塞渲染
- preload是[resoure hint](https://w3c.github.io/resource-hints/)规范中定义的一个功能
- resource hint通过告知浏览器提前建立连接或加载资源，以提高资源加载的速度。
- 浏览器遇到遇到标记为preload的link时，会开始加载它
- 当onload事件发生时，将rel改为stylesheet，即可应用此样

如果浏览器不支持的情况下可是使用`loadCSS.js`，就可以让我们使用`preload`语法异步加载CSS。原理就是在DOM API中插入样式资源

### 总结

|引入CSS资源的方法|是否阻塞初次渲染|
|:--:|:--:|
|<link rel="stylesheet" href="index.css" />|是|
|通过document.write写入以上标签|是|
|通过DOM API插入HTMLLinkElement对象|否|
|使用preload方式载入CSS|否|
|为link添加media query|当媒体查询不匹配时，不会阻塞|

## javascript

### Javascript阻塞HTML Parser

```javascript
<-- inline js -->
<script>/* app logics here */</script>

<-- external js -->
<script src="somescript.js"></script>
```

- 通过以上两种方式引入js均会阻塞HTML parser，因而会阻塞出现在脚本后面的HTML标记的渲染
- 外部script阻塞的时间一般更长，因为可能包含了一个网络来回时间
- Javascript可以通过document.write修改HTML文档流，因此在执行js时，浏览器会暂停解析DOM的工作

### CSS阻塞JS

```javascrtpt
<-- inline js -->
<script>/* app logics here */</script>

<-- external js -->
<script src="somescript.js"></script>
```

- 通过以上两种方式引入的JS均会被CSS阻塞
- 由于这些Javascript可能会读取或修改CSSOM，因此需等待CSSOM构造完成后，它们才能执行

### Preload

```javascript
<html>
  <head>
    <!-- index.js内容：
      为button标签添加点击事件，点击后，alert答案
     -->
    <script src="index.js"></script>
    <!-- 百度统计代码 -->
    <script src="tongji.js"></script>
  </head>
  <body>
    <h1>世界上最美丽的语言是什么？</h1>
    <button>See answer</button>
  </body>
</html>
```
js会阻塞HTML parser。那么以上代码中，
- 浏览器是先加载并执行完index.js，再加载tongji.js。
- 还是同时开始加载index.js和tongji.js。
第二个是正确的，这是因为：
- 当HTML Parser被脚本阻塞时，Parser虽然会停止构建DOM，但仍会识别该脚本后面的资源，并提前加载
- 注意：这里是指浏览器的资源加载策略。而非前文提到的resource hint标准中的preload

### 怎么延迟javascript(非关键资源)的运行

#### 把资源放在文档底部

#### 使用defer延迟脚本的执行

```html
<html>
  <head>
    <!-- index.js内容：
      为button标签添加点击事件，点击后，alert答案
     -->
    <script src="index.js" defer></script>
    <!-- 百度统计代码 -->
    <script src="tongji.js" defer></script>
  </head>
  <body>
    <h1>世界上最美丽的语言是什么？</h1>
    <button>See answer</button>
  </body>
</html>
```
- 当script标签拥有defer属性时，该脚本会被推迟到整个HTML文档解析完后，再开始执行
- 被defer的脚本，在执行时会严格按照在HTML文档中出现的顺序执行

#### 使用async异步加载脚本

```html
<html>
  <head>
    <!-- index.js内容：
      document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('p').onclick=function() {
          alert('surprise')
        }
      });    
     -->
    <script src="index.js" async></script>
    <!-- 百度统计代码 -->
    <script src="tongji.js" async></script>
  </head>
  <body>
    <p>Hello World</p>
  </body>
</html>
```
- 当script标签拥有async属性时，该脚本不会再阻塞HTML parser。且不会被CSS阻塞。
- 脚本只要加载完成，便可开始执行
- 被async的脚本，在执行时会不会严格按照在HTML文档中出现的顺序执行
- async适用于无依赖的独立资源

#### 两种方式对比

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/defer.png)

## Font

```html
<head>
    <!-- Google 自定义字体 -->
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <style type="text/css" media="screen, print">
        h1 {
            font-family: 'Roboto', sans-serif;
        }
    </style>
</head>
<body>
    <h1>Web Performance Matters</h1>
</body>
```
加载完HTML文档后，浏览器会如何工作？
- 马上显示内容
- 等字体文件加载完成后显示内容	

### Font阻塞内容渲染

- 浏览器为了避免FOUT(Flash Of Unstyled Text)，会尽量等待字体加载完成后，再显示应用了该字体的内容
- 只有当字体超过一段时间仍未加载成功时，浏览器才会降级使用系统字体。每个浏览器都规定了自己的超时时间
- 但这也带来了FOIT(Flash Of Invisible Text)问题。内容无法尽快地被展示，导致空白

也有异步加载font的插件

## img
图片不会阻塞首次渲染

数