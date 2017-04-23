# 对网站进行优化以及HTTP/2

## WEB性能三要素

WEB应用的执行涉及到三个任务：
- 取得资源
- 页面的布局和渲染
- 执行Javascript

页面渲染和执行javascript是在同一个进行交错进行的；
取得资源是`页面进行渲染`和`执行javascript`的先决条件；

## 浏览器如何获取资源

### HTTP请求-响应模式

![](https://p5.ssl.qhimg.com/t01780faa3632a12b62.png)

#### Time To First Byte (TTFB)

TTFB是从浏览器`发起网络请求`到服务器接受第一个字节的这段时间，他包含了TCP的连接时间，发送HTTP请求时间和获得响应消息第一个字节的时间。

### keep-live

使用`keep-live`可以从第二次开始节省TCP的握手时间。

![](https://p3.ssl.qhimg.com/t01cf5ea9ea7dab025c.png)

#### 浏览器同域名并发限制

![](https://p2.ssl.qhimg.com/t01b59ae2a473ff993d.png)
RFC2616：同域名同时只能有 2 个连接（RFC7230 中无限制）；
​​​​​​​现代浏览器：一般允许同域 6 个并发连接；

#### 域名散列

虽然能够解决浏览器域名的并发限制，但是还会有下面的几个危害：
- 域名散列会引入额外的`DNS查询`和`TCP的慢启动`
- 这部分性能让`高延时网络`雪上加霜
- 在`移动端WEB`中过多域名会严重影响性能( 因为网络延时高

#### HTTP头部开销

![](https://p1.ssl.qhimg.com/t010a1b1b9a061c36bd.png)
我们能够观察出：**头部开销比 HTML 页面本身还大**

### 总结

- 在现代 Web 应用中，请求数 / 请求的域名 / 资源大小 都在突飞猛进
- DNS 查询、TCP 连接、服务端处理、及网络传输共同决定了 TTFB
- 由于 TCP 的三次握手及慢启动，建立新连接成本很高（Keep-Alive）
- HTTP/1.1 中，一个 TCP 连接上只能有一个请求 / 响应（TCP 并发连接）
- 为了公平原则，浏览器针对同域名有并发连接数限制（通常为 6个 / 域名）
- 域名散列可以突破并发连接数限制，但需要权衡利弊
- 页面布局和渲染与执行 JavaScript 交错进行，关键资源的加载甚至会阻塞渲染

## 性能优化

### 让TTFB提前

- 设置合理的 `DNS TTL` 时间 ( TTL表示在DNS服务器中的生存时间，最大为255
- 合理的服务器技术选型 
- 合理的服务器部署( Docker 多机房部署、CDN
- 合理使用服务器缓存
- 减少重定向
- 提前输出

### 数据预取与缓存的被动更新

数据预取： 对于一些很慢的接口，可以定时预取，存入缓存。
缓存的被动更新：某些页面数据量大，当访问小。可以优先返回缓存数据，同时出发缓存的更新机制。

### 提前输出 / 让用户更早看到主体框架

比如说前输出静态的内容( 不需要修改的

### 减少传输大小

- 去掉无用 / 冗余代码，精简异步接口
- 代码压缩（HTML、CSS、JS）
- 图片压缩（Webp、Guetzli）
- 矢量图标（CSS 3 / Web Font / SVG）
- 使用 Video 替换 Gif
- 服务端开启响应压缩（Gzip，br）
- 缓存（Cache）

### 减少请求连接数
- 合并请求
	+ 异步接口合并
	+ 图片合并
	+ CSS，JS的合并
	+ CSS，JS内联
	+ 图片，音频内联
- 缓存
- 异步加载 / 按需加载

### 合并请求的弊端

- 可用时间变晚（木桶效应）
- 浪费网络流量
- 浪费浏览器内存
- 降低缓存命中率

### HTTP/2进行优化

#### HTTP/2多路复用

![](https://p3.ssl.qhimg.com/t010694cdd799febd9c.png)

一个 HTTP/2 连接可以同时传输 256 个流，无需合并

#### HTTP/2的server Push

![](https://p1.ssl.qhimg.com/t013f87aeddd6a7f2c0.png)

重要资源在主页面之前推送，无需内联

#### HTTP/2 的头部压缩

![](https://st.imququ.com/i/webp/static/uploads/2015/10/hpack-header-compression.png.webp)

头部压缩解决大量请求引入额外头部开销的问题

### HTTP/1 内联优化方案

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/myblog/360star/http1.png)

## 缓存

缓存一般有下面几种：
- 服务器缓存
- HTTP缓存
- 自己实现缓存(localStorage)
- Service Worker

### HTTP缓存机制
- Last-Modified
- ETag
- Expires
- Cache-Control

#### Last-Modified

![](https://p4.ssl.qhimg.com/t01950c0bd84370e345.png)

#### ETag

![](https://p5.ssl.qhimg.com/t01655b435da1b936de.png)

#### Expires

![](https://p5.ssl.qhimg.com/t015a7b93580aeb2800.png)

#### Cache-Control

![](https://p1.ssl.qhimg.com/t01b69cfbcb3b5f3e0c.png)

#### meta

```<META HTTP-EQUIV="Pragma" CONTENT="no-cache">```

**注**
- `Cache-control` 和`Expires`同时设置的话，`Cache-control`优先级高

#### Last-Modified和Etag的区别

-   Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间
-   如果某些文件会被定期生成，当有时内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存
-   有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形

### Service Worker

![](https://p0.ssl.qhimg.com/t018e45d5b0717d280e.png)

两种最常见的策略

- *networkFirst*：在无网络时才返回 Cache，确保离线可用（缺点是不能提高响应速度，甚至变慢）
- *cacheFirst* ： 优先返回 Cacahe 同时异步更新 Cache，确保响应速度（缺点是页面可能不是最新）


## WEB网路的技术选型

![](https://p1.ssl.qhimg.com/t01493a3c2e859401eb.png)

||特点|适合场景|
|:--:|:--:|:--:|
|XHR|异步、浏览器支持良好|异步文件上传、获取/提交数据|
|SSE（Server-Sent Events）|长连接、浏览器支持良好、服务端 => 浏览器|消息推送、实时报表|
|WebSocket|双向通讯、事件驱动|即时聊天，实时调试|
|WebRTC （RTCDataChannel）|点对点传输任意数据、低延时|实时音视频传输、屏幕共享、文件 P2P 传输|


## 总结

- 了解影响首字节时间（TTFB）的几个主要因素
- 了解常见的减小传输体积方案
- 了解常见的减少请求数方案
- 了解合并请求数的弊端及 HTTP/2 所做的优化
- 了解几种缓存机制
- 了解常见的 WEB 网络技术选型


