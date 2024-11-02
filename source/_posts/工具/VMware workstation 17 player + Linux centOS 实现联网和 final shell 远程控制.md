---
title: VMware + Linux centOS 联网 & final shell 远程连接
date: 2023-07-15 18:51:58
tags: 
	- Linux
	- 虚拟机
categories: 技术分享
cover: https://img1.imgtp.com/2023/07/16/Tjbn8Fcl.png
---

# VMware workstation 17 player + Linux centOS 实现联网 & final shell 实现远程连接

## VMware workstation 17 player + Linux centOS 实现联网
vmware为我们提供了三种网络工作模式，它们分别是：**Bridged（桥接模式）、NAT（网络地址转换模式）、Host-Only（仅主机模式）**。

打开vmware虚拟机，我们可以在选项栏的“编辑”下的“虚拟网络编辑器”中看到VMnet0（桥接模式）、VMnet1（仅主机模式）、VMnet8（NAT模式），那么这些都是有什么作用呢？其实，我们现在看到的VMnet0表示的是用于桥接模式下的虚拟交换机；VMnet1表示的是用于仅主机模式下的虚拟交换机；VMnet8表示的是用于NAT模式下的虚拟交换机。

### 前置知识
#### 桥接模式
桥接模式就是将主机网卡与虚拟机虚拟的网卡利用虚拟网桥进行通信。在桥接的作用下，类似于把物理主机虚拟为一个交换机，所有桥接设置的虚拟机连接到这个交换机的一个接口上，物理主机也同样插在这个交换机当中，所以所有桥接下的网卡与网卡都是交换模式的，相互可以访问而不干扰。在桥接模式下，虚拟机ip地址需要与主机在同一个网段，如果需要联网，则网关与DNS需要与主机网卡一致。
<img src="https://pic1.zhimg.com/80/v2-492747c2912028c58f371d8bb8b105ec_1440w.webp">

#### NAT模式
NAT模式借助虚拟NAT设备和虚拟DHCP服务器，使得虚拟机可以联网。
<img src="https://pic1.zhimg.com/80/v2-44c9bfa71f5e83cb35d176d118c5336c_1440w.webp">

#### Host-Only模式
Host-Only模式其实就是NAT模式去除了虚拟NAT设备，然后使用VMware Network Adapter VMnet1虚拟网卡连接VMnet1虚拟交换机来与虚拟机通信的，Host-Only模式将虚拟机与外网隔开，使得虚拟机成为一个独立的系统，只与主机相互通讯。
<img src="https://pic3.zhimg.com/80/v2-0f955bae382c5c1e666651f4b8ac8dc6_1440w.webp">

#### 补充：DHCP是什么？
1. 概念
DHCP是一种基于客户/服务器模式的服务协议，位于应用层，使用UDP协议工作，是一个应用于局域网的网络协议，该协议允许服务器向客户端动态分配IP地址和配置信息。
DHCP的服务端口号为68，客户端口号为67

2. 作用
如果有很多台电脑都需要配置一个网络环境，那么每台电脑都需要手动去完成上述配置。而DHCP服务器主要的作用，就是自动地将网络参数正确的分配给网络中的每台计算机，让客户端可以在开机时就自动分配好网络的参数值。

3. 实现方式
1.为相同网段的电脑分配ID地址——DHCP
2.跨网段为另一个网段的电脑分配IP地址——DHCP中继

### 具体实践过程

黑马的教程好像没有教怎么联网，这一块直接略过了，所以刚开始尝试联网的时候遇到了一些奇奇怪怪的问题，也不知道要用哪一种联网方式，杂糅了一些经验帖的操作，各种命令又不太一样，又因为是刚开始接触Linux，感觉比较混乱，一直获取不到IP地址，甚至是用AI也没法成功。最后是看到了某个社区中的老哥有这样一个简单明了的解决方案：
[![linux联网问答.png](https://img1.imgtp.com/2023/07/16/Tjbn8Fcl.png)](https://img1.imgtp.com/2023/07/16/Tjbn8Fcl.png)

于是我按照他所说的去尝试了一下，发现还真可以。

1.  `ifconfig` 在我这centOS的版本没法识别，只能用 `ip addr` 或者 `ip -a` 来查看ip地址。这个时候还没获取到ip地址，使用查看ip的命令就不会呈现ip地址。但是可以看到自己的虚拟网卡叫什么名字，对下一步有用。例如ens33是我的虚拟机的虚拟网卡名称。
2. 于是我们需要使用 `sudo dhclient ens33` 来得到权限，自动获取ip地址。而且需要注意的是这一步没有回显反馈，我一度以为是什么东西阻塞卡住或者超时了……这个时候要是再用一次这个命令反而会报错啥啥啥exist，正在running。那又是另外的解决方案了。
3. 如果上一步成功了，再次查看ip地址。按理来说可以看到类似这样的结果：

[![ens成功联网.png](https://img1.imgtp.com/2023/07/16/omt0fniL.png)](https://img1.imgtp.com/2023/07/16/omt0fniL.png)

信息显示您的虚拟机的ens33网卡已经获取到了IP地址192.168.254.128。

## final shell 实现远程连接

然后我们再把这个ip地址添加到final shell里，就能成功实现远程连接。

[![成功连接final shell.png](https://img1.imgtp.com/2023/07/16/pOKb2Baq.png)](https://img1.imgtp.com/2023/07/16/pOKb2Baq.png)


然后就可以把VMware的窗口最小化了，通过final shell操作的改变会同步到VMware。


