---
title: Linux系统基础
tags: 
	- Linux
	- 虚拟机
categories: 技术分享
---
## 为普通用户配置sudo认证
`/`就是整个Linux系统的根目录。

尝试普通用户在根目录创建文件夹，`cd /`.`mkdir test`,发现权限不足。

普通用户在HOME目录中一般是不受限的，但是一旦出了HOME目录仅有只读和执行权限，没有修改权限。

- `su - root` 切换到root用户
- `su - username` 切换到username用户
- `su -` 命令用于切换账户，源于switch user
- `exit` 命令用于退出当前用户
- `sudo` 命令用于临时以root权限执行命令
- 在root用户下使用 `visudo`，会自动用vi编辑器打开 `/etc/sudoers` 文件，在末尾加上 `username ALL=(ALL)	NOPASSWD:ALL` ，保存退出，即可为username用户配置sudo认证。这样username用户就可以临时免密使用sudo命令了。

## 用户与用户组
linux的权限管控有两个层次：针对用户和用户组

### 用户组
#### 创建用户组
在root用户下用`groupadd groupname` 创建用户组
#### 删除用户组
在root用户下用`groupdel groupname` 删除用户组

### 用户
#### 创建用户
在root用户下用`groupadd [-g -d] username` 创建用户
`-g`: 指定用户组。如果不指定，则默认创建与用户名同名的用户组
`-d`: 指定用户的家目录，如果不指定，则默认创建在 `/home/username` 目录下
>可以使用`pwd`查看当前用户所在的目录
#### 删除用户
在root用户下用`userdel [-r] username` 删除用户
`-r`: 删除用户的同时删除用户的家目录
>`rm -rf`命令用于删除文件夹，`rm`命令用于删除文件
#### 查看用户所属组
`id username` 查看用户所属组。

如果不提供username，则默认查看当前用户所属组
#### 修改用户
`usermod -aG groupname username` 将username用户添加到groupname用户组中

#### 查看所有用户
`gatent passwd` 查看所有用户

#### 查看所有用户组
`gatent group` 查看所有用户组

### 权限信息查看
`ls -l`能够以列表形式查看内容并且显示权限细节。
例如其中有某一行为：`drwxr-xr-x 2 root root 4096 4月  10 10:36 bin`，**第一部分**表示文件或者文件夹的权限控制信息，一共有十个字符，也就是十个槽位。其中第一个字符为文件类型，后面三个字符为文件所有者的权限，中间三个字符为文件所属组的权限，最后三个字符为其他用户的权限：
第一个字符：d/l/-,d表示文件夹，-表示文件，l表示软链接文件。

后面三个字符：r/w/x，r表示读权限，w表示写权限，x表示执行权限。如果出现`-`则表示没有对应的权限。

**第二部分**表示所属用户，**第三部分**表示所属的用户组。


## chmod命令-修改权限信息
`chmod`命令用于修改权限信息（只有所属用户和root用户可修改），`chmod`命令的格式为`chmod[-R][ugoa][+-=][rwx] filename`，其中`-R`表示将文件夹内部所有文件执行相同的权限修改操作；`[ugoa]`表示用户类型，`[+-=]`表示操作类型，`[rwx]`表示权限类型。
例如：
- `chmod u+x filename`，表示将filename文件的所属用户的执行权限添加上x权限。
- `chomd -R u=rwx,g=rx,o=x test`表示将test文件夹内部所有文件的所属用户的权限设置为rwx，所属组的权限设置为rx，其他用户的权限设置为x。

### 权限数字表示法
`chmod`命令还可以使用3位数字来修改权限信息：
- 0：无任何权限，即---
- 1：仅有执行权限，即--x
- 2：仅有写权限，即-w-
- 3：仅有写和执行权限，即-wx
- 4：仅有读权限，即r--
- 5：仅有读和执行权限，即r-x
- 6：仅有读和写权限，即rw-
- 7：拥有所有权限，即rwx

例如`751`表示所属用户拥有所有权限（`u=rwx`），所属组拥有读和执行权限(`g=r-x`)，其他用户拥有执行权限(`o=--x`)。

tips：其实这是3位二进制对应的十进制数。



## chown命令-修改文件所属用户和用户组
`chown`命令用于修改文件的所属用户和用户组，`chown`命令的格式为`chown [-R] username:groupname filename`，其中`-R`表示将文件夹内部所有文件执行相同的权限修改操作；`username:groupname`表示所属用户和用户组，冒号用于分隔用户和用户组。

此命令只能由root用户执行。

例如：
- `chown root:root filename`，表示将filename文件的所属用户和用户组都修改为root。
- `chown -R root:root test`表示将test文件夹内部所有文件的所属用户和用户组都修改为root。
- `chown root: test`表示将文件夹text的所属用户修改为root，用户组不变。
- `chown :root test`表示将文件夹text的所属用户组修改为root，用户不变。
- `chown root test`表示将文件夹text的所属用户修改为root，用户组不变。


## 快捷键
- `ctrl + a`：光标移动到行首
- `ctrl + e`：光标移动到行尾
- `ctrl + u`：删除光标前的所有内容
- `ctrl + k`：删除光标后的所有内容
- `ctrl + w`：删除光标前的一个单词
- `ctrl + y`：粘贴刚刚删除的内容
- `ctrl + l`：清屏
- `ctrl + c`：终止当前程序
- `ctrl + d`：退出当前终端
- `ctrl + z`：将当前程序放到后台运行
- `ctrl + r`：搜索历史命令
- `ctrl + s`：暂停屏幕输出
- `ctrl + q`：恢复屏幕输出
- `ctrl + p`：上一条命令
- `ctrl + n`：下一条命令
- `ctrl + t`：交换光标前两个字符
- `ctrl + h`：删除光标前一个字符
- `ctrl + d`：删除光标后一个字符
- `ctrl + f`：光标前移一个字符
- `ctrl + b`：光标后移一个字符
- `ctrl + v`：输入特殊字符
- `ctrl + x`：输入控制字符
- `ctrl + o`：执行当前命令，并在下一行显示新的提示符
- `ctrl + i`：同tab
- `ctrl + m`：同回车
- `ctrl + [a-z]`：光标前移一个单词
- `ctrl + [A-Z]`：光标后移一个单词
- `ctrl + [0-9]`：切换到指定标签页
- `ctrl + shift + [0-9]`：将当前标签页移动到指定位置
- `ctrl + shift + t`：打开新的标签页
- `ctrl + shift + w`：关闭当前标签页
- `ctrl + shift + c`：复制
- `ctrl + shift + v`：粘贴
- `ctrl + shift + n`：新建文件夹
- `ctrl + shift + r`：重命名


## 软件安装
### yum in centos
yum是一个软件包管理器，可以用来安装、更新、卸载软件包，yum的配置文件为`/etc/yum.conf`，yum的软件包存放在`/etc/yum.repos.d`目录下。

语法：
- `yum [-y] install wget`
`-y`表示自动回答yes,不需要手动输入yes

- `yum [-y] remove wget`

- `yum [-y] search wget`

### apt in ubantu 
apt是一个软件包管理器，可以用来安装、更新、卸载软件包，apt的配置文件为`/etc/apt/sources.list`，apt的软件包存放在`/etc/apt/sources.list.d`目录下。
apt语法和yum完全一样

## systemctl
systemctl是一个系统服务管理器，可以用来管理系统服务，systemctl的配置文件为`/etc/systemd/system`，systemctl的服务存放在`/etc/systemd/system`目录下。
语法：`systemctl start|stop|enabel|disable|restart|status service_name`
例如：`systemctl enabel ntpd`实现ntpd服务开机自启动


## ln命令-创建软链接（快捷方式）
`ln`命令用于创建软链接，`ln`命令的格式为`ln -s source_file target_file`，其中`-s`表示创建软链接，`source_file`表示源文件(被链接的文件或文件夹)，`target_file`表示目标文件（要链接去的目的地）。

例子：
- `ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx`，表示将`/usr/local/nginx/sbin/nginx`软链接到`/usr/bin/nginx`。
- `ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx`，表示将`/usr/local/nginx/sbin/nginx`软链接到`/usr/bin/nginx`。

## date命令-查看时间
`date`命令用于查看时间，`date`命令的格式为`date [-d] [+格式化字符串]'
例如：
- `date +"%Y-%M-%D %H-%M-%S"`，返回：`2023-08-09/04/23 12-08-32`
- `date +%Y-%M-%D`，返回：`2023-07-09/04/23`



## root用户设置
还没有设置root用户的密码，所以不能直接使用root用户，需要先设置root用户的密码。
- `sudo passwd root`，设置root用户的密码
- `su - root`，切换到root用户