# 在linux安装Nginx以从http升级到https

本文章以cent OS为例说一下在linux平台下安装Nginx下的一些经验。

## 可以通过yum 安装

通过命令`yum -y install nginx`就能进行安装，剩下的就是自己进行一些防火墙和配置文件的配置。
但是上面的不能指定版本，也就是说不能下载很新的版本，如果对版本有要求的要是要看下面的方式。

## 解压Nginx压缩包

### 创建用户Nginx使用的www用户

- `groupadd www`  添加www组
- `useradd -g  www www -s /bin/false` 创建nginx运行账户www并加入到www组，不允许www用户直接登录系统

### 安装gcc

可以通过`rpm -qa | grep gcc`查看是否安装的gcc，如果安装了就会显示下图这个样子。
![这里写图片描述](http://img.blog.csdn.net/20170521103148285?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd29zaGluYW5uYW43NDE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

如果没有通过`yum -y install gcc-c++`进行安装

### 安装其他依赖

安装zlib和openssl`yum -y install zlib zlib-devel openssl openssl-devel`

### 解压Nginx压缩包

- `cd /usr/src/n`
- `tar zxvf nginx-1.9.7.tar.gz`

### 进入Nginx目录

- `mv nginx-1.9.7 nginx` (更改文件名可以不用)
- `cd nginx`

### 配置，将Nginx安装在/usr/local下

`./configure --user=www --group=www --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_realip_module`

### 编译安装

`make && make install`(如果不行先执行make，然后执行make install)

### 检查是否安装成功

- `cd /usr/local/nginx/sbin`
- `./nginx -t`

### 配置防火墙

因为在Linux下防火墙是自动关闭的，所以要进行打开80端口。

可以使用下面这一行命令进行打开
`iptables   -A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT`

如果报错的话就先把`iptables`进行安装`yum -y install iptables`

然后通过`service iptables restart`重启防火墙即可。

### 操作Nginx服务器

- `cd /usr/local/nginx/sbin`


#### 打开Nginx服务器

`./nginx`

### 重Nginx服务

`./nginx -s reload`

### 关闭Nginx服务

- 先查询`nginx`的进程号`ps -ef | grep nginx`,如下图
![这里写图片描述](http://img.blog.csdn.net/20170521103254001?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd29zaGluYW5uYW43NDE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
- `kill -QUIT 主进程号`


就此为止，我们就能在自己浏览器中，输入服务器的IP/域名进行访问了。

## 解决Nginx安装pcre安装成功但是不能使用rewrite将http重写为https

当在nginx中配置`rewrite ^(.*)$  https://$host$1 permanent; `以至于网站链访问都不能了，
我们可以尝试一下安装`pcre` 也是通过yum：`yum -y install pcre pcre-devel`

### 解决方案

监听两个文件一个80端口负责http，另一个443端口负责https

简单如下：
```shell
server{
    listen 80;
    server_name woshinannan741.com;
    #告诉浏览器有效期内只准用 https 访问
    add_header Strict-Transport-Security max-age=15768000;
    #永久重定向到 https 站点
    return 301 https://$server_name$request_uri;
}
server {
    listen 443;
    server_name woshinannan741.com;
    ssl on;
    root html;
}
```

这样就能完美解决了