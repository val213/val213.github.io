---
title: WSL安装Linux虚拟机（以Ubuntu为例）
date: 2023-07-15 18:51:58
tags: 
	- Linux
	- 虚拟机
categories: 技术分享
cover: https://img1.imgtp.com/2023/07/16/AWWhFuY6.png
---

# WSL安装Linux虚拟机（以Ubuntu为例）

## 为什么要用WSL
WSL作为win10的新特性，比起传统获取Linux操作系统环境的方式更加轻量化，简单便捷，使用的开发者也不少。
## WSL原理图剖析
[![wsl.png](https://img1.imgtp.com/2023/07/16/uFAoB8oc.png)](https://img1.imgtp.com/2023/07/16/uFAoB8oc.png)

## 使用WSL安装Ubuntu具体步骤
[![wsl配置.png](https://img1.imgtp.com/2023/07/16/n0AkckRF.png)](https://img1.imgtp.com/2023/07/16/n0AkckRF.png)

### 打开WSL相关设置
在应用->可选功能->更多windows功能中，拉到最下面勾选Windows下的Linux子系统选项和虚拟机平台选项，然后重启（截图的时候没有勾选虚拟机平台，后来网上看经验贴和视频弹幕的时候发现有人说要勾选）。
### 安装Ubuntu
重启之后，直接在Windows store搜索Ubuntu下载。打开cmd，这个时候在新建标签页那里点击下拉菜单会发现已经出现了Ubuntu的选项。于是就新建一个Ubuntu标签页打开，看到如下图所示的内容，发现这里和黑马的教程不一样了，出现了看不懂的报错……但是给了一个文档的地址。
[![wsl_Ubuntu.png](https://img1.imgtp.com/2023/07/16/BYUn7hEr.png)](https://img1.imgtp.com/2023/07/16/BYUn7hEr.png)

### 错误处理（下载一个更新包）
点击查看文档，发现需要安装Linux kernel update更新包，大小只有6mb左右。
[![wsl文档.png](https://img1.imgtp.com/2023/07/16/7iNhnW6g.png)](https://img1.imgtp.com/2023/07/16/7iNhnW6g.png)

安装好Linux kernel update更新包之后重新打开，发现已经可以注册账号并且正常使用命令行了。
[![wsl_Ubuntu（1）.png](https://img1.imgtp.com/2023/07/16/AWWhFuY6.png)](https://img1.imgtp.com/2023/07/16/AWWhFuY6.png)

## Tips
需要注意的是，由于WSL和直接上虚拟机的实现原理是不一样的，还是会有一些地方存在差异。有人说直接上虚拟机更适合生产环境，使用wsl会有一些奇怪的毛病（不知道说的是wsl1还是wsl2，wsl2在I/O上比wsl1有了一些优化）。但是也有人提出wsl有一些纯虚拟机没有的优点，比如与在虚拟机下使用Linux相比，WSL更加流畅；WSL可以对Windows文件系统下的文件直接进行读写，文件传输更方便；剪贴板互通，可以直接在Windows下其它地方复制文本内容，粘贴到WSL等……
也有人专门对比了Windows，Linux和WSL的性能，如果有需要的话还是深入了解一下，作为拓展学习本人在这一块不做深究。