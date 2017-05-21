# session和cookie的理解以及如何http有状态

因为http协议是无状态的，也就是说每次连接之后就不会记住上一次连接，如果是要登录才能查看的信息，就对用户体验很不好了。这篇文章我们介绍在客户端和服务端如何使得http协议有状态。


## Cookie

cookie的工作机制是`用户识别及状态管理`。web网站为了管理用户的状态会通过WEB浏览器，把一些数据临时写入用户的计算机内，接着用户访问该web网站的时候，可通过通信方式取回之前存的cookie。

### 为cookie服务的首部字段

|首部字段名|说明|首部类型|
|:--:|:--:|:--|
|set-Cookie|开始状态管理所使用的cookie信息|响应首部字段|
|Cookie|服务器接收到的cookie信息|请求首部字段|

#### set-Cookie

例子：
```
Set-Cookie: name=helios; expires=Sun, 17-Jan-2038 19:14:07 GMT; path=/; domain=.example.com 
```
当服务器准备开始管理客户端状态的时候，会事先告知各种信息。
下面列举了`set-Cookie`的字段值：

|属性|说明|
|:--:|:---:|
|NAME=VALUE|赋予cookie属性和值(必选项)|
|expires=DATE|Cookie的有效期(不说明则默认浏览器关闭前为止)|
|path=PATH|将服务器上文件目录作为cookie的适用对象(若不指定则默认为文档所在的文件目录)|
|domain=域名|作为cookie适用对象的域名(若不指定为创建cookie的域名)|
|secure|仅在HTTPS安全通信时才会发送cookie|
|HttpOnly|加以限制，使cookie不能被javascript脚本访问|

如果cookie不设置生命周期就默认为这次会话结束，会暂时将cookie存在内存中。

#### cookie

我们在浏览器的控制台下console里面输入`document.cookie`就能看到浏览器上保存的所有cookie了。

就是一些键值对

### cookie是怎么发送到服务器的呢

根据RFC的标准规定cookie是不能进行跨域的，如果能跨域的话也就会造成大麻烦了。

根据上面的介绍，我们知道cookie中包含两个字段`domain`和`path`，比如说一个URL为`www.example.com/foo/bar.html`;在这个里面domain是`www.example.com`,path为：`foo/bar.html`,domain和path就指定了cookie的作用范围。当要向一个服务器发送请求的时候，在客户端会查找cookie的范围会大于这个要发送的URL的cookie的作用域。
比如要请求`www.example.com/foo/bar.html`这个资源，cookie中的domin为`www.example.com`,path为`/`或者`/foo`或者`/foo/bar.html`的cookie就会发送给服务器。当然是在cookie没有过期的情况下。

### cookie的原理总结

先看一张极丑无比的图：
1. 没有cookie状态下的请求响应
![这里写图片描述](http://img.blog.csdn.net/20170521133119683?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd29zaGluYW5uYW43NDE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
2. 记录状态之后
![这里写图片描述](http://img.blog.csdn.net/20170521133153318?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd29zaGluYW5uYW43NDE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



1. 客户端向服务器发送请求，服务器记录状态(生成cookie)
2. 服务器在响应报文中通过`set-Cookie`字段，在浏览器端生成cookie
3. 当客户端继续发送请求的时候，带有该域名下的cookie发送过去
4. 服务端发现客户端发送过来的请求的时候，回去检查是哪个客户端发送过来的请求，然后对比服务器上的记录，得到之前的那个信息

## session

### session的机制

当程序要为某个客户端的请求生成一个session的时候，服务器会先检查请求中是否存在session的标识(一般为sessionid)，如果包含`sessionid`如果包含sessionid服务器就会检索出和这个session相关的信息，如果请求中不含有`sessionid`那么客户端就会为该请求，创建一个session并会通过严谨的算法创建一个`sessionid`(Tomcat 中sessionid=随机数+当前时间+jvmid)。

### session是的怎么发送给服务器的呢

通常情况下是通过cookie，但是如果客户端禁用了cookie的话，还可以通过添加隐藏域或者把`sessionid`作为URL的参数传递给服务器。



## session和cookie是http变为有状态的

通过下面一张其丑无比的图来展示一下：
![这里写图片描述](http://img.blog.csdn.net/20170521133240371?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd29zaGluYW5uYW43NDE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)