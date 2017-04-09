# 360前端星计划第一天 下午CSS部分

## 层叠

### 优先级的判定

CSS的优先级我们是知道的，然是这些优先级是怎么来的呢？
在规范中是根据**选择器的特异度(Specificity)**
|选择器|内联?|	id个数|(伪)类个数|标签个数|特异度|
|:----:|:----:|:----:|:----:|:----:|:----:|
|#nav .list li a:link|0|1|2|2|0122|
|.hd ul.links a|0|0|2|2|0022|

所以当我们要覆盖比如`a.list`的时候我们可以用`.list.list`覆盖

#### 简单选择器的特异度级别
* Level 0: *
* Level 1: 标签选择器、伪元素
* Level 2: 类、伪类、属性
* Level 3: id
* Level 4: 内联

### 下图展示了CSS的求值过程

![](css-value.svg)

#### 初始值
起始每个CSS的属性都有一个初始值，例如下面的几个：
- `background-color` 的初始值为 `transparent`
- `margin-left` 的初始值为 0
- 可以显式重置为初始值，比如 `background-color: initial`

## 继承

###　CSS中能够继承的元素属性

- 所有元素可继承：`visibility`和`cursor`
- 内联元素可继承：`letter-spacing`、`word-spacing`、`white-space`、`line-height`、`color`、`font`、`font-family`、`font-size`、`font-style`、`font-variant`、`font-weight`、`text-decoration`、text-`transform`、`direction`
- 终端块状元素可继承：`text-indent`和`text-align`
- 列表元素可继承：`list-style`、`list-style-type`、`list-style-position`、`list-style-image`。

#### 继承的引用

比如在手机端进行开发的时候`boxi-sizing:border-box`是经常使用的，但是这个元素是不是默认继承的，但是我们可以这样搞：
```css
*{
	boxi-sizing:inherit;
}
html{
	boxi-sizing:border-box
}
```

## 视觉格式化模型 ( 浏览器是如何排版的

### 视口 (Viewport)

- 浏览器的可是宽度
- 用户通过视口查看网页内容(通过窗户看风景)

### 盒子的生成

- 每一个块级元素生成一个主块级元素(principal block-level box)，用它来包含子级盒
- 每个行级元素生成一个行级盒，行级盒分布于多行

#### 盒模型再理解
- `margin`：行级盒的 `margin-top` 和 `margin-bottom` 不会产生效果
- `padding`：行级盒的 `padding-top` 和 `padding-top` 不影响行布局

#### 块级盒子中的子盒子的生成

- 块级盒子中可以包含多个子块级盒子
- 也可以包含多个行级盒子
- 不在行级元素里面的文字，会生成**匿名行**级盒。比如 `<p>Some <em>Text</em></p>`
- 块级盒子中不能同时包含块级和行级盒子。遇到这种情况时，会生成匿名块级盒来包含行级盒。比如 `<div><h1>标题</h1><span>2016-12-12</span></div>`

#### 行级盒子内的子盒子的生成

- 行级盒子内可以包含行级盒子
- 行级盒子包含一个块级盒子时，会被块级盒子拆成两个个行级盒子，这两个盒子又分别被匿名块级盒包含

#### Generated Content

- 控制元素
- ::before 和 ::after
- content

```css
<a href="http://example.com">访问链接</a>

<style>
  a::before {
    content: '\2693'
  }
  a::after {
    content: '(' attr(href) ')';
  }
</style>
```


## 定位模式

### 块级格式化上下文 (Block Formatting Context)

- 盒子在容器（包含块）内从上到下一个接一个地放置
- 两个兄弟盒之间的竖直距离由 `margin` 属性决定
- 同一个 BFC 内垂直 `margin` 会合并
- 盒子的左外边缘挨着容器（包含块）的左边

### 行级格式化上下文 (Inline Formatting Context)

- 盒子一个接一个水平放置
- 盒之间的水平 `margin`，`border`和`padding` 都有效
```html
<span>
	<a href="">ffff</a>
	<a href="" style="padding-left: 15px;">ggggg</a>yrhhhr
</span>
```
- 同一行的盒子所在的矩形区域叫行盒(Line box)
- 当一个行盒放不下上下文内所有盒子时，会被分到多个垂直堆叠的行盒里
- 行盒内的水平分布由`text-align`属性决定
- 如果一个行级块无法分割(单词、inline-block)，该元素会被作为一个整体决定分布在哪一个行盒
- 但是浮动元素后面的行级盒子会变短以避开浮动元素

### z-index 的绘制顺序

在每一个堆叠上下文中，从下到上：

- 上下文的元素的`border`和`background`
- `z-index`为负值的子堆叠上下文
- 常规流中的块级元素 ( 非浮动
- 非定位的浮动元素
- 常规流中非定位*行*级元素
- z-index为0的子元素或者子堆叠上下文
- z-index>0的子堆叠上下文

