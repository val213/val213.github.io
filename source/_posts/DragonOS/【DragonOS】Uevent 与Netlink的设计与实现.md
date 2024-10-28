---
title: 【Docs】Uevent 与 Netlink 的设计与实现
categories: DragonOS
tags:
    - DragonOS
    - Uevent
    - Netlink
---
# 概况
## 已实现的功能
- 用户态可以创建、绑定 Netlink 套接字，用来发送、接收 Uevent 消息
- 支持 sysfs下的 uevent 文件读写
- Netlink 消息组播
- 用户态接收 uevent 消息
- 用户态发送 uevent 消息
### 与 Linux 实现不同的
- skb 的实现
- NL_TABLE 的哈希链实现
## 目前没有实现的功能
- 阻塞读取
- 消息队列
- 异步回调
- net namespace
- rcu
## 后续可能会支持的功能
- netlink 单播
- netlink 协议族的 ROUTE    协议
# Uevent 的基础设施：Netlink
## 创建 Netlink 套接字
相关结构体和特征：
- `struct netlink_kernel_cfg`
- `struct netlink_sock`
- `struct netlink_table`
### 在内核中创建 Netlink 套接字
- `netlink_kernel_create`
- 
### 在用户空间中创建 Netlink 套接字
- `socket` 系统调用
- `bind` 系统调用
## Netlink 的消息格式
Netlink 的消息格式分为两部分：消息头和消息负载。
### Netlink 消息头
Netlink 消息头的结构体如下：
### Netlink 消息负载
Netlink 消息的负载是一个字节数组，可以是任意的数据。在 Uevent 中，Netlink 消息的负载是一个字符串，用来表示 Uevent 的消息。
## Netlink 的消息处理
Netlink Socket 实现了 socket 的接口，因此可以使用 socket 的接口来进行消息的发送和接收。
### Netlink 的消息接收
recvfrom
### Netlink 的消息发送
sendto
# Uevent 的设计与实现
Uevent 是 Linux 内核中的一个子系统，用于处理设备的插拔事件。Uevent 通过 Netlink 与用户空间进行通信，当设备插入或者拔出时，内核会发送一个 Uevent 消息到用户空间，用户空间的程序可以通过监听 Netlink Socket 来接收这些消息，从而实现对设备插拔事件的处理。

uevent 的事件类型有以下几种：
- add：设备被添加
- remove：设备被移除
- change：设备的属性发生变化
- move：设备被移动
- online：设备上线
- offline：设备下线

## Uevent 消息的格式
Uevent 消息是一个字符串，格式如下：
```
add@/devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.1
```
其中，`add` 表示事件类型，`@` 为分隔符，后面的字符串为设备的路径。

## 内核设备初始化
## sysfs 中实现 Uevent
### 读取 uevent 文件
在/sys下，基本上每个设备的目录下都有一个uevent文件，这个文件是一个可读写的文件，内核初始化之后，会在/sys下的每个设备目录下创建一个 uevent 文件，这个文件以键值对的形式说明了该设备的基本信息，比如设备的名称，设备的子系统，设备的驱动等。
### 写入 uevent 文件
当用户空间写入这个文件的时候，内核会对这个文件进行解析，然后发送一个 uevent 消息。
## Uevent 的处理链条
相关函数：
- `kobject_uevent`
- `kobject_uevent_env`
- 

# 测试
