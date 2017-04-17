# 关键渲染路径

- 浏览器渲染原理
- 资源对渲染的影响
- 优化关键渲染路径

## 浏览器的渲染原理

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/liulanqi.png)

### DOM

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/DOM1.png)

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/DOM2.png)

#### 增量构建

浏览器无需等待HTML加载完毕，便可以开始解析DOM

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/timeline2.png)

### CSSOM

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/cssdom.png)

### render Tree

下图是DOMTree，CSSTree和Render的区别

![](https://raw.githubusercontent.com/helios741/helios741.github.io/master/tmp/render.png)

- `RenderTree`包含`渲染网页`所需的节点
- 无需渲染的节点不会被添加到`RenderTree`中.如：`<head>`,`dislay:none`的节点

**也就是说，不可见的元素是不会出现在renderTree中**

### layout

layout的作用：`计算渲染树节点的位置大小`

#### 会出发layout的元素

- 屏幕旋转
- 浏览器视窗改变
- 与大小位置相关的CSS属性

下面的网站能够查看CSS各种样式的作用[csstriggers](https://csstriggers.com/)

### 总结浏览器解析的流程

#### 构建DOM

- 构建过程：`character`,`token`,`node`,`DOM`
- 增量构建

#### 构建CSSOM

- 构建过程：`character`,`token`,`node`,`CSSOM`
- 选择器越复杂，匹配用的时间越多

#### 构建RenderTree

- `RenderTree`包含所有需要在页面上呈现的节点信息
- `display:none`的元素不会被添加到`RenderTree`中，因为他不需要被渲染
- `visibility:hidden`的元素会被添加到`RenderTree`中，因为他虽不可见，但是会占位置

#### Layout

- 计算需要渲染的节点的大小和位置
- 节点的位置和大小都是基于`viewpport`计算的
- 在移动端通常将`viewport`设置为浏览器推荐的理想视口，以保证字体显示大小易于阅读
- 旋转屏幕，修改浏览器窗口大小，修改位置大小相关的CSS属性，都可能触发layout

####　paint

根据`background`, `border`, `box-shadow`等样式，将`Layou`t生成的区域填充为最终将显示在屏幕上的像素












