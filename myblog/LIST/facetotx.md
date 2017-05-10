## 算法

### 判断一棵树是不是平衡二叉树

```c++
int dep(Tree *rt)
{
    if(!rt) return 0;
    return 1 + max( dep(rt->left) , dep(rt->right) );
}

bool isbal(Tree *rt)
{
    if(!rt ) return true;
    if( !isbal(rt->left) ) return false;
    if( !isbal(rt->right) ) return false;
    int ans = abs( dep(rt->left) - dep(rt->right) );
    if(ans>1) return false;
    return true;
}
```


###二叉树镜像翻转

```c++
void Mirror(Tree* rt)
{
    if(!rt) return ;
    if(!rt->left && !rt->right) return ;
    Tree* tmp =  rt->left;
    rt->left = rt->right;
    rt->right = tmp;
    Mirror(rt->left);
    Mirror(rt->right);
}

```

## javascript翻转字符串

```javascript

s.split('').reverse().join('');
```

## 手写原生的ajax

``` javascript
	let req;
	
	if(window.XMLHttpRequest) {
		req = new XMLHTTPRequest();
	} else {
		req = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	let url = '';
	
	req.open('GET',url,true);
	
	req.send();
	
	req.onreadyStateChange = function() {
		if(req.readyState === 4 ) {
			// TODO	
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

下面是几个重要的状态码：
- `301/302`(重定向)请求的URL已经移走，应答中包含一个`Location URL`,说明你请求的资源现在的位置
- `304`(未修改) 客户端的缓存资源是最新的，要客户端使用缓存

### 304是什么意思？有没有方法不请求不经过服务器直接使用缓存
- 304(未修改) 自从上次请求后，请求的网页未修改过。服务器返回相应的时候,不会放回网页的内容
- 设置`Cache-Control`和`Expires`等缓存

## 浏览器的缓存

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

#### http2.0对1.1的改进
|类型|http2.0|http 1.1|
| :-------- | :--------:| :--: |
|多路复用|多路复用允许通过单一的http的2.0连接发送多重的请求-响应信息|客户端在同一个时间，请对同一个域名下的请求数量是有限制，超过数量的请求是会被阻塞的|
|二进制分帧|在应用层(http/2)和传输层之间增加了二进制分帧层，在二进制分帧里面，HTTP/2会把所有的传输信息分割为更小的消息和帧，并对他们采用二进制格式的编码|HTTP首部会封装到头部当中，数据信息会放在body中|
|性能方面的优化|HTTP/2通过让所有的数据流共用同一个连接，可以更高效的使用TCP连接，让高宽带服务于HTTP服务|性能优化不是在高宽带而是在低延迟，起初会限制最大速度，如果成功会增加(TCP的慢启动)，但是由于这种原因，让原本就具有突发性和短时性的HTTP连接变得十分低效|
|首部压缩|支持首部压缩使用的是HPACK算法|不支持首部压缩|
|服务器推送|在客户端请求之前发送数据的机制(服务端无需通知客户端，想客户端推送想要的文件)，但是还是有一些缺点比如说何时去push，浏览器也可以主动取消push|不支持服务器推送|

## 安全

### CSRF原理

要完成一次`CSRF`攻击，受害者必须完成下面的两个步骤：
1. 登录信任的网站A,并且在本地产生cookie
2. 在不退出A的情况下，访问危险网站B

### CSRF的防范

1. 正确使用`GET`,`POST`和`COOKIE`
2. 在非`GET`请求中添加伪随机数

- 在使用GET的时候，用作查看，列举，展示等不需要改变资源属性的时候
- POST常用于下达订单，改变资源属性或者下达一些其他的命令 

我们限制修改只能使用`POST`，当GET方式请求的时候就拒绝访问，所以上图中的GET方式就可以避免了。
但是`POST`的方式也是可以模拟的,因此我们还要使用第二个步骤，给非GET请求添加伪随机数。
非GET请求中添加伪随机数一般有下面三个方式：
1. 为每一用户生成唯一的`cookie token`,所有的表单都包含同一个伪随机数。因为攻击者理论上是不能获得用户的`cookie`的,所以表单的数据也就构造失败了。但是`XSS`是可以获得用户的`cookie`的
2. 每个请求输入验证码，这种方式是最完美，但是用户的体验是最差的
3. 不同的表单包含不同的伪随机值(可以通过MD5(时间戳)去生成,然后保存在服务器的session中，刷新就会改变)，服务端进行验证。

### XSS原理

1. 在能够输入的地方进行注入，获得信息
2. 得到用户的cookie，来获得敏感信息

### XSS的防范
- 文本传输

## postmessage的作用

动态的插入`iframe`，在从`iframe`中取出数据，假设在`a.html`中嵌套`<iframe src='http://www.b.com/b.html'>`，在这个页面中就能相互通信

```javascript
// a.html
window.addEventListener('message',(e)=>{
	alert(e.data);
});
window.frames[0].postMessage('b data','http://www.b.com/b.html');
```

```javascript
// b.html

window.addEventListener('message',(e)=>{
	alert(e.data);
});
window.frames[0].postMessage('a data','http://www.a.com/a.html');

```

## 操作系统栈和堆的分配

栈是由操作系统分配的，存放函数的参数值，局部变量的值
堆是由程序员自己分配的

## 自定义事件

阻止冒泡：
- stopPropagation
- cancelBubble = true

阻止默认行为：
- preventDefault
- returnValue = false

## http中gzip的实现

### 关于压缩传输的规定
1. 客户端传输到服务器的请求字段中带有：`Accept-Encoding:gzip`,表示客户端支持`gzip压缩`
2. 服务器接收到请求之后，发现请求头中含有`Accept-Encoding`字段，并且支持该类型的压缩，就对相应报文进行压缩返回给客户端，并带有`Content-Encoding:gzip`消息头，表示报文是经过该格式压缩的
3. 客户端接收到请求之后，先判断是否有`Content-Encoding`消息头，如果有按照该格式解压报文

### 服务端实现报文压缩

在`nginx`或者`apache`能进行配置

## HTTPS

`https`中的s是指`SSL`或者`TLS`,就是在原`HTTP`的基础上加上一层用于`数据加密`、`解密`、`身份认证`的安全层。

### 认证原理

1. 服务器向权威机构(CA)申请证书
2. 将证书部署到服务器上
3. 客户端向服务器发送https请求，也就是请求证书
4. 服务器把证书发送给客户端，证书中包含加密消息的公钥
5. 用本地权威机构的的公钥从证书中解密得到加密消息公钥
6. 生成随机密钥K，用A公钥进行加密，发送给服务器
7. 服务器用自己的私钥解密K
8. 进行通信

### 工作流程

![](http://images.cnblogs.com/cnblogs_com/ttltry-air/201208/201208201734398000.png)

## 阅读jQuery源码了解的东西

1. sizzle 特别大
2. 链式调用
3. 事件冒泡的处理：
	+ jQuery中明确禁止一种不断冒泡的事件，即加载事件。
	+ 在内部jQuery通过任何加载事件传递了一个特别的`noBubble:true`,
	+ 所以图片的加载事件不会冒泡到窗口,（ 可能被误匹配为window的加载事件
4. 对ajax进行的封装

## VUE中的双向数据绑定

通过使用观察者模式和ES5中的`defineProperty`来劫持各个属性的`setter`和`getter`在数据变动的时候发布消息给订阅者，触发相应的监听回调。

### 大致描述

1. 通过数据监听器`Observer`能够对数据对象的所有属性进行监听，如果有变动把最新值通知订阅者
2. 指令解析器`Complile`对每个元素上的指令进行解析和扫描，根据指令模板替换数据，以及绑定相应的监听函数
3. 通过`Watcher`作为连接`	Observer`和`Complile`的桥梁，能够订阅每个属性变动的通知，执行指令绑定的相应回调函数

![](https://sfault-image.b0.upaiyun.com/132/184/132184689-57b310ea1804f_articlex)

### 各个部分的作用

#### Observer

通过`Obeject.defineProperty()`来监听属性变动。
需要将`Observer`的数据对象进行递归遍历，包括子属性对象的属性，都要加上`getter`和`setter`。
这样对每个属性赋值就会出发`setter`,那么就能监听到数据的变化。

#### Complie

- 解析模板指令，将模板中的变量替换成数据，
- 然后初始化渲染试图页面，
- 将每个指令对应的节点绑定更新函数
- 添加订阅者，一旦数据变动，收到通知，更新视图

![](https://sfault-image.b0.upaiyun.com/111/738/1117380429-57b3110440af0_articlex)

#### Watcher

作为桥梁：

1. 在自身实例化时往属性订阅器(dep)里面添加自己
2. 自身必须有一个uodate方法
3. 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调

## VUE中的MVVM

通过`Observer`来监听自己`model`数据变化，通过`compile`来解析编译模板指令，最后利用`Watcher`搭建起`Observer`和`Compile`之间的桥梁，达到数据变化 -> 视图更新，视图监护变化(input)->数据model变更的双向数据绑定的效果
