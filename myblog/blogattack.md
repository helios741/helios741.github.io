今天含着热泪写下这篇文章，在今年的二月份上线的自己的个人博客，今天一看竟然被别人删除了数据库，我的心中有一种动物飞奔呀。虽然是有文章备份的，还是对我造成了很大的上海，所以痛定思痛写下这篇文章。

## 能被攻击的两个地方
我思考几点我的个人网站能够被攻击的几个地方：

- 在评论区有输入文本的地方，可能造成`XSS`公司，但是在项目上线的时候已经经过多次测试了，应该不会是这方面的问题
- `mongodb`数据库没有使用密码，可能是攻击者远程操作数据库然后删除了我的所有数据，

## 被攻击后的思考

当初已经看到微博上关于`mongdb`数据库没有加密而被攻击例子，但是自己觉得我的东西这么小，肯定没有人回去攻击，所以就没有去做数据库加密的措施。这次可能就是被哪个黑客新手当做练手项目了。
总结下来就是一句话：千万不要偷懒呀

## 加密mongodb数据库

首先开启数据库的时候是要开启*开启安全性验证*，也就是在开启数据的时候加上`--auth`参数即可。

1. `use admin`  以进入admin数据库为例
2. `db.addUser(“root”, “root”)`  创建一个用户

在重启数据库的之后，先`use admin`,然后随便输入一个操作这个数据库的命令，比如：`show dbs`就会出现下面的报错：
![这里写图片描述](http://img.blog.csdn.net/20170510145959421?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd29zaGluYW5uYW43NDE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

这就代表是没有操作的权限，当我们使用`db.auth('root','root')`;进行用户名密码进行验证的时候就能进行操作了

## 基本的一些mongodb的指令

###　基本操作相关

1. 切换数据库  `use dbname`
2. 显示数据库列表 `show dbs`
3.  在当前的数据库中的集合中查找 `db.foo.find({'name':'helios'})`
4. 删除当前使用的数据库  `db.dropDatabase();`
5. 查看当前使用的数据库 `db.getName();`


###  用户相关操作

1. 添加用户 ` db.addUser("userName", "pwd123", true); 添加用户、设置密码、是否只读`
2. 数据认证、安全模式： ` db.auth("userName", "123123");`
3. 显示当前所有用户 ` show users;`
4. 删除用户 `db.removeUser("userName");`

## 本博客的展望

没有什么展望，准备学学`react`改版了。现在看来但是代码写的那就一个烂呀，都想直接删除了。况且也想放弃`angular`了