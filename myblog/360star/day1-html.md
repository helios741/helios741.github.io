# 前端星计划第一天 ( 上午

今天拖着疲惫的身体回到宾馆进行一下总结。

## 上午 HTML部分

### DOCTYPE的作用以及历史

#### DOCTYPE的作用

- 指定HTML页面使用的标准和版本
- 浏览器根据哪种doctype决定使用哪种渲染模式

#### 什么是渲染模式

在浏览器进行过渡的时候主要产生了下面的三种渲染模式

- 怪异模式 (Quirks Mode)
- 准标准模式(Almost Standard Mode)
- 标准模式(Standard Mode)

准标准模式主要是在渲染模式不能一下直接到标准模式，进行过渡的

### HTML VS XHTML

- `XHTML`是用`XML`重新定义了`HTML`也就是说`XHTML`是`XML`的一个子集
- 对语法进行更加严格 ( 单标签闭合，都使用小写，属性的值用引号(`class=foo`这样是不行的)

### HTML5的设计思想

- 兼容已有内容
- 避免不必要的复杂性 (以前的doctype写起来十分复杂
- 解决现实的问题 (一些地理位置什么的API的出现
- 优雅降级 ( 比如说`canvas`在canvas标签中能嵌套标签表示如果浏览器不支持这个标签的话，就现实嵌套标签的内容
- 尊重事实的标准 ( 语义化
- 用户 》开发者 》浏览器厂商 》标准制定者 》理论完美 ( 一旦遇到冲突，最终用户优先，其次是作者，其次是实现者，其次标准制定者，最后才是理论上的完满

#### HTML5中语义化的含义
1. 标签的语义化
2. 搜索引擎的优化
3. 对盲人软件有利

#### HTML5中的变化

- doctype,meta ( 具体说一下meta的使用，`meta`一般有两个属性`name`,`content`就像是键值对的样子
	+ `<meta name="keywords" content="HTML,ASP,PHP,SQL">` 关键词利于搜索引擎查找
	+ `<meta http-equiv="expires" content="31 Dec 2008">` 模拟http请求
	+ `<meta name="description" content="免费的 web 技术教程。" />`定义对页面的描述
	+ `<meta name="revised" content="David, 2008/8/8/" />`  定义页面的最新版本
	+ `<meta http-equiv="refresh" content="5" />`  没5s刷新一次
	+ `viewport`
- 新增语义化标签和属性
- 去掉纯展示性标签 ( `strong`,`del`
- canvas、video、audio、离线、本地存储、拖拽等

#### HTML5中语法规范

- 标签不区分大小写，建议使用小写
- 空标签可以不闭合，如：`input`、`meta`
- 属性推荐双引号
- 某些属性值可以省略( `required`、`readonly`

#### HTML5中的元素分类

在HTML5中对元素进行系统化的分类，主要分为下面几类

先看下图然后解释 ![](http://www.5icool.org/uploadfile/2013/0810/20130810120757745.png)

1. 流式元素 ( a,div,p,video 等在应用程序和文档的主体元素中使用的元素
2. 标题内容
3. 可交互内容( a,audio,img,button
4. 章节元素( article,aside,nav
5. 段落元素( p,strong
6. 嵌入式元素 ( audio,svg
7. 元数据元素( base,link,meta,noscript,script,style,title

##### 什么是元数据元素
比如说`base` :
下面表示a标签中如果不写`href`，就会在一个新的tab中打开`www.example.com`
```html
<base href="http:///" target="_blank" />
```

还有`noscript`:
如果用户通过插件的方式禁用了页面中`script`那么`noscript`中的内容就会显示出来

#### 页面的总体结构

![](./article.svg)

## 中午

中午在360食堂吃的午饭，好爽呀，要是能这么天天吃多好呀，但是水平不够进步了360呀( 5555555



## 反思总结

通过文博上午将近两个小时的将`HTML5`,因为时间有限，大致说`HTML5`的轮廓，但是我觉得这样就足够了，对于我这种在学校散养的没加什么实验的来说已经足够了，至少对自己相当于一个路标，比自己在学校盲目搞要好的多，看到旁边都是名校的，甚至还有研究生，觉得多少有点自卑了，哈哈。