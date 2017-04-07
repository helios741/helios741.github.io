# CSS

## CSS选择器
1. \* 统配符：表示能够匹配任何元素
2. 标签选择器 ：直接写标签
3. class选择器
4. id选择器
5. 子元素选择器： A>B
6. 后代选择器： A B
7. 多元素选择器：E,F(同时匹配E和F)
8. 毗邻元素选择器：E + F(匹配出紧随E元素之后同级的F元素)
9. 属性选择器：E[attr]
10. 伪类
11. E ~ F :匹配在E元素之后所有的F元素

## CSS的优先级
`important` -> `内联` -> `ID` -> `class` -> `标签 | 伪类 | 属性选择` -> `伪对象` -> `通配符` -> `继承`

## CSS hack是什么意思
IE浏览器的`hack`主要分为下面的三种：
1. 条件hack： `<!--[if IE]->`
2. 属性hack：`*zoom`
3. 选择符hack：`html .class{}，IE7能识别*+html .class{}`

- IE都能识别*;标准浏览器(如FF)不能识别*； 　　
- IE6能识别 !important 能识别*； 　　
- IE7能识别*，不能识别!important; 　　
- FF不能识别*，但能识别!important; 

## CSS3的新特性
1. @Font-face:能从服务器加载字体
2. @keyframes 
3. `columns`通过`column-width`和`column-count`实现多列布局
4. box-sizing：
5. 渐变：
	+ 一维渐变：`background: linear-gradient(to bottom, blue, white);`
	+ 色标 : `background: radial-gradient(red, yellow, rgb(30, 144, 255));`
6. transition:过渡
	+ 用法：`transition:width 2s, height 2s`
	+ 四个参数：性质(color) ， duration(过渡的持续时间) , delay(延时时间) , timing-function(过渡的类型如：ease)
7. transfrom：可以让元素进行移动(translate),旋转(rotate),缩放(scale),倾斜(skew)

## CSS的用法以及布局

### 让一个元素消失
1. `display:none`
2. `visibility:hidden` 这样只会导致页面的重绘不会导致页面的重排
3. `opacity:0`
4. 设置`width:0;hieght:0;overflow:hidden`
5. 设置`z-index`和`position`
6. 设置`postion`脱离文档流，然后设置`left``top`等移动出看不见的地方

### 左边定宽，右边自适应
1. 左侧定宽，左浮动，右侧margin-left
2. 把上面的左浮动改为绝对定位
3. 使用浮动+负边距
```html
<div id="left">左边内容</div>
<div id="content"></div>
```
```css
#left { float: left; width: 200px; margin-right: -100%; background-color: #ccc; }
#content { float: left; width: 100%; margin-left: 200px; background-color: #999;}
```

### 三列布局，两边定宽中间自适应
1. 使用浮动+负边距
```html
<div class="left">left</div>
<div class="mid">
	<div class="content">middle</div>
</div>
<div class="right">right</div>
```
```css
.left{	width: 300px;float: left;background-color: #ccc;	margin-right: -300px;}
.mid{float: left;width: 100%;}
.mid .content{margin-left: 300px;	margin-right: 300px;background-color: blue;}
.right{	width: 300px;float: right;margin-left: -300px;background-color: red;}
```
2. 使用绝对定位
```html
<div class="left">left</div>
<div class="mid">middle</div>
<div class="right">right</div>
```
```css
.left,.right{width: 300px;position: absolute;top: 0;background-color: #ccc;}
.left{left: 0;}
.right{	right:0;}
.mid{	margin: 0 300px;background-color: red;}
```

### 实现两列等高布局
1. 使用flex布局
2. 背景色不能再margin里面显示，但是能够在padding里面显示
```html
<div class="box">
    <div class="left">
        <p>asdgf</p><p>asdgf</p><p>asdgf</p>
    </div>  
    <div class="right">tombot</div>
</div>
```
```css
.box{overflow: hidden;}
.left,
.right{margin-bottom: -600px; padding-bottom: 600px;}
.left{float: left;background-color: red;}
.right{float: left;background-color: blue;}
```

### CSS实现长宽等比

`padding-top:100%;width:100%;`

### 文字的水平居中

父元素使用`display:table`子元素使用`display:table-cell,vertival:middle`子元素中的文字就能垂直居中了

### animation有哪些属性

1. `animation-fill-mode` :让动画结束保持在哪个状态
	+ nonde默认值，回到动画还没开始的地方
	+ backwards，让动画回到第一帧的状态
	+ both 根据`animation-direction`轮流应用`forwards`和`backwards`
2. `animation-direction`是否轮流播放。(规定是否应该轮流反向播放动画。)
3. 简写形式`animation: name duration timing-function delay iteration-count direction;`
	+ animation-name (规定需要绑定到选择器的 keyframe 名称)
	+ animation-duration(规定完成动画所花费的时间，以秒或毫秒计)
	+ animation-timing-function(规定动画的速度曲线)
	+ animation-delay(规定在动画开始之前的延迟)
	+ animation-iteration-count(规定动画应该播放的次数)
	+ animation-direction(规定是否应该轮流反向播放动画)



