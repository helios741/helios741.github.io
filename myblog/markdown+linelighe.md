#  `marked.js` + `linelight.js`完成md->HTML的转换
关键词：marked+linelight解析md文件
## 牢骚(读者请跳过这一小节)
今天在做自己项目博客的前台文章展示的时候遇到了一个问题，就是把`MD`的文件转换为浏览器能够解析的`html`文件。下面是我的思考过程：
- 要不我先把写好文章的MD文件转换为html文件，存到数据库，然后直接取出来进行渲染
    + 这样做不好，因为还有很多生成的html中还要很多样式需要去处理，这样就要前后端一起搞了(虽然本来就是一起搞的)
    + 还是去网上搜索一下
- 想使用一个论坛的开源项目，发现真的好差劲剪枝不能用，都不能把我写的md文件正确的展示出来
    + 放弃之，继续探索
- 发现了有一个`markdown.js`开源项目`star`挺多的，发现和国内的开源项目的项目结构都一样，这时候就知道了国人又开始拿来主义了，本以为原版会比盗版好以下，看来我是递归了国内的借鉴水平了
    + 再次无果，实在不能再继续搜索下去，去论坛发问把，还是找了一个好方法
- 就是使用`marked.js`这个开源项目，简直无敌，完美把我的`md`展示出来了，但是样式还是不好看。这次就不用继续填坑了，因为以前的那个博客系统还是用过代码高亮这个插件的名字叫`linelight.js`还是很好用的
    + 展示完美解决
    + 两个小时之后，文章展示模块写完了，准备测试，使用`ajax`读取一些数据数据时候，发现`linelight`这个代码高亮竟然不生效了，我顿时觉得十分尴尬，搜索一顿之后，静下来自己思考一些
    + 是不是`ajax`是异步的请求，这个时候页面已经渲染完毕了。改为同步请求，失败
    + 是不是要把页面重绘一下，无果
    + 继续搜，改为英文搜索，去*StackOverflow*等国外网站，甚至都去给作者用因为留言了，还是占不到答案
    + 这时候在阅读`github`上别人给作者提出的问题，看到了一个类似的问题，这个时候我也改为这个形式就可以了，这个时候已经将近四个小时过去了。我也是66666呀。

## 介绍
下面就开始介绍一些这两个插件怎么配合使用：</br>
这两个插件如果不想下载都是有CdN的：</br>
[marked CDN](http://www.bootcdn.cn/marked/)
[linelight CND](http://www.bootcdn.cn/highlight.js/)
### marked的使用
首先我们要先把这个库文件，引入这个我就不多说了，然后进行简单的配置，如下：
```javascript
marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
    
    var md = getElementById('md').innerHTML;//获取md文件
    document.getElementById('content').innerHTML =    marked(md);//把生成的html加入到页面当中反
```
###  linelighe的使用
这次我们要引入两个库文件，一个是`css`文件另一个就是这个主文件：</br>
先看官网的例子：[官网](https://highlightjs.org/download/)  </br>
没错就是这么简单，官网并没给过多的`API`,如果像实现`ajax`之后进行渲染，就要进行相当于重绘的操作，请看下面的代码：
```javascript
$.get("./data/1.md",function(res){
        $("#marked").html(marked(res));
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block); //重绘
        });
    })
```
当然官网的那句话就可以不用写了。就这样就OK了。</br>
填坑结束
