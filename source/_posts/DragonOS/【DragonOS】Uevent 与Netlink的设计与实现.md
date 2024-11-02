---
title: 【Docs】Uevent 与 Netlink 的设计与实现
categories: DragonOS
tags:
    - DragonOS
    - Uevent
    - Netlink
---
# feat(Netlink & Uevent): add Uevent with Netlink
## 已实现的功能
- 用户态 POSIX API Netlink 套接字，支持创建、绑定 Netlink 套接字，发送、接收 Netlink 消息
- 内核支持 Netlink 组播消息，发送到用户进程中订阅了该组播组的 Netlink 套接字
- 内核支持准备、发送 uevent 到用户态 
- 支持 sysfs下的 uevent 文件读写，用户态写入 uevent 文件后，内核会发送 uevent 消息到用户态
### 与 Linux 实现不同的
- sk_buff 的实现，简化设计
- NL_TABLE 的哈希链实现，不用 Linux 内部的 rhashtable，用 hashmap 替代
## 目前没有实现的功能
- 内核接受并处理用户态发送的 netlink 消息（由于 uevent 通常不是用户主动发给内核的，而是由内核主动生成并发送给用户态的，故该流程暂未实现）
- udev 守护进程，用于监听 uevent 事件，实现设备的自动配置
- net namespace，用于隔离网络设备
- rcu，Read-Copy-Update，一种用于实现高效并发数据访问的同步机制
## 后续会实现的功能
- 实现 Netlink 的非阻塞操作
- netlink 单播（netlink_unicast），由于 KOBJECT_UEVENT 协议不使用单播，所以此 PR 目前只提交支持多播的部分
- netlink 协议族的 ROUTE 协议，用于大多数网络功能，如路由和邻居协议
# Netlink
Netlink 是 Linux 内核中的一种进程间通信（IPC）机制，用于内核与用户空间之间的通信。Netlink 通过 Netlink Socket 来实现，Netlink Socket 是一种特殊的 Socket，用于与内核进行通信。Netlink 的消息格式是一种特殊的消息格式，用于在内核与用户空间之间传递消息。

Netlink 套接字代表用户空间与内核的IP网络配置之间的首选接口。Netlink 也可作为内核内部以及多个用户空间进程之间的消息传输系统。

通过 Netlink 套接字，你可以使用标准套接字 API (POSIX API)打开或关闭套接字、使用套接字传输数据或者接收套接字数据。

Netlink 的功能之一是传送单播和多播消息:目的地终端点地址可以是一个PID、一个多播群组 ID 或两者的组合。内核定义 Netlink 多播群组的目的是传出特定种类事件的通知信息。

Netlink相对于其他的通信机制具有以下优点：

- 使用 Netlink 通过自定义一种新的协议并加入协议族即可通过 socket API使用 Netlink 协议完成数据交换，而 ioctl 和 proc 文件系统均需要通过程序加入相应的设备或文件。

- Netlink使用socket缓存队列，是一种异步通信机制，而ioctl是同步通信机制，如果传输的数据量较大，会影响系统性能。

- Netlink支持多播，属于一个Netlink组的模块和进程都能获得该多播消息。

- Netlink允许内核发起会话，而ioctl和系统调用只能由用户空间进程发起。

## Netlink 机制
### 内核 -> 用户空间
#### 内核中创建 Netlink 套接字
内核会在内核初始化时创建 Netlink 套接字，用于与用户空间进行通信。内核中的 Netlink 套接字是通过调用 `netlink_kernel_create` 函数来创建的，这个函数会创建一个 Netlink 套接字，并将其绑定到一个 Netlink 协议上。

```rust
netlink_kernel_create(&init_net, NETLINK_KOBJECT_UEVENT, &cfg)
```

#### 发送 Netlink 消息
netlink 发送消息分为单播和多播两种方式，单播是将消息发送给指定的进程，多播是将消息发送给指定的多播组。

- 单播
    - 内核中发送 Netlink 消息的函数是 `netlink_unicast`，这个函数会将消息发送给指定的进程。
- 多播
    - 内核中发送 Netlink 消息的函数是 `netlink_broadcast`，这个函数会将消息发送给指定的多播组。

#### 接收用户空间的 Netlink 消息
（由于 uevent 通常不是用户主动发给内核的，而是由内核主动生成并发送给用户态的，该流程暂未实现）
内核中接收用户空间的 Netlink 消息是通过 `netlink_rcv_skb` 函数来实现的，这个函数会接收用户空间发送的 Netlink 消息，并将消息传递给内核的处理函数。
### 用户空间 -> 内核
#### 用户空间创建、绑定 Netlink 套接字
- `socket` 
和其他任何 Socket 一样，当你打开一个 Netlink Socket，必须提供三个参数，即 Address Family、Socket Type 和 Protocol。对于 Netlink 套接字，Address Family 必须是 AF_NETLINK，Socket Type 必须是 SOCK_DGRAM，Protocol 可以是任何 Netlink 协议。例如，你可以使用以下代码在用户空间创建一个 Netlink 套接字：

```rust
socket(AF_NETLINK, SOCK_DGRAM, libc::NETLINK_KOBJECT_UEVENT)
```
Netlink 使用 PF_NETLINK 协议族，只支持 SOCK_DGRAM 类型，而且定义了几种协议，每一种都用于网络协议栈的不同组件(或一组组件)。例如，暂未实现的 NETLINK_ROUTE 协议用于大多数网络功能，如路由和邻居协议，而 NETLINKFIREWALL 用于防火墙(Netfilter)。目前我们只实现了 NETLINK_KOBJECT_UEVENT 协议，用于内核对象事件通知。

Netlink的协议列在 `net/socket/netlink/netlink_proto.rs` 中的 `netlink_protocol` 模块中。

- `bind` 
Netlink 套接字的地址结构是一个 sockaddr_nl 结构，它包含一个 nl_family 字段，一个 nl_pid 字段和一个 nl_groups 字段。nl_family 字段必须设置为 AF_NETLINK，nl_pid 字段是进程的 PID，nl_pid 通常是由打开此套接字的进程的 ID(PID) 标识，而特殊值 0 代表的就是内核。nl_groups 字段是一个位掩码，用于指定多播组。


#### 用户空间 Netlink 的消息接收
目前在用户态使用 `recvfrom` 函数来接收 Netlink 消息，这个函数会阻塞等待内核发送消息，当内核发送消息时，`recvfrom` 函数会返回消息的内容。

#### 用户空间 Netlink 的消息发送
目前在用户态使用 `sendto` 函数来发送 Netlink 消息，这个函数会将消息发送到内核。

## Netlink 的消息格式
Netlink 的消息格式分为消息头和消息负载两部分，消息头用于描述消息的类型和长度，消息负载用于携带消息的内容。Netlink 的消息可以是任意的数据，但通常用于传递内核事件，比如设备的插拔事件。
### Netlink 消息头
Netlink 消息头的结构体如下：
```rust
pub struct NLmsghdr {
    pub nlmsg_len: usize, /* Length of message including header */
    pub nlmsg_type: NLmsgType, /* Message content */
    pub nlmsg_flags: NLmsgFlags, /* Additional flags */
    pub nlmsg_seq: u32, /* Sequence number */
    pub nlmsg_pid: u32, /* Sender port ID */
}
```
### Netlink 消息负载
Netlink 消息的负载是一个字节数组，可以是任意的数据。在 Uevent 中，Netlink 消息的负载是一个字符串，用来表示 Uevent 的消息。

# Uevent 的设计与实现
Uevent 是 Linux 内核中的一个子系统，用于处理设备的插拔事件。Uevent 通过 Netlink 与用户空间进行通信，当设备插入或者拔出时，内核会发送一个 Uevent 消息到用户空间，用户空间的程序可以通过监听 Netlink Socket 来接收这些消息，从而实现对设备插拔事件的处理。

uevent 的事件类型有以下几种：
- add：设备被添加
- remove：设备被移除
- change：设备的属性发生变化
- move：设备被移动
- online：设备上线
- offline：设备下线

设备驱动程序在特定事件发生时（例如设备插入或移除）组装好 uevent 消息，然后将其发送到用户态的 Netlink 套接字的缓冲区或接收队列中。
## Uevent 消息格式
Uevent 消息是一个字符串，格式如下：
```
add@/devices/virtual/net/lo
```
其中，`add` 表示事件类型，`@` 为分隔符，后面的字符串为设备的路径。

## 内核设备初始化
uevent 通常是通过 Netlink 套接字以广播的方式发送的，这样所有监听该 Netlink 套接字的用户态进程都能接收到消息。在每个设备初始化的时候，内核会发送一个 uevent 事件。
## sysfs 中的 Uevent 设备文件
### 读取 uevent 文件
在/sys下，基本上每个设备的目录下都有一个 uevent 属性文件，这个文件是一个可读写的文件。内核初始化之后，会在 /sys 下的每个设备目录下创建一个 uevent 文件，这个文件以键值对的形式说明了该设备的基本信息，比如设备的名称，设备的子系统，设备的驱动等。例如：
```shell
# cat /sys/class/net/lo/uevent
INTERFACE=lo
IFINDEX=1
```
```shell
# cat /sys/devices/virtual/tty/tty0/uevent
MINOR=4
MAJOR=0
DEVNAME=4:0
DEVTYPE=char
```
### 写入 uevent 文件
当用户空间写入这个文件的时候，内核会对这个文件进行解析，然后触发 `kobject_uevent` 函数，这个函数会经过一系列处理过程后发送一个 uevent 消息到用户空间。
### 接受 uevent 消息
用户空间可以通过监听 Netlink 套接字来接收 uevent 消息，当内核发送 uevent 消息时，用户空间的程序会接收到这个消息，从而实现对设备插拔事件的处理。
示例消息内容：
```shell
ACTION=add DEVPATH=/devices/platform/rtc_cmos/rtc0 SUBSYSTEM=rtc SEQNUM=1
```