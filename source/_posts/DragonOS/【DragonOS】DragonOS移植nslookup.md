---
title: DragonOS移植nslookup
tags: 
      - DragonOS
      - 移植
      - nslookup
      - dog
      - rust
      - udp
---
# 啥是nslookup？
## Linux中的nslookup
在Linux中，nslookup是一个用于查询DNS的命令行工具。它可以用来查询域名的IP地址，也可以用来查询IP地址对应的域名。nslookup命令的使用方法如下：
```shell
nslookup [选项] [主机名] [DNS服务器]
nslookup [option] [hostname] [server]
```
其中，主机名是要查询的域名，DNS服务器是要查询的域名服务器的IP地址。如果不指定DNS服务器，nslookup会使用系统默认的DNS服务器。


### Nslookup Command Prompt Options in Linux
There are a variety of command prompt options for nslookup on Linux. Many of these options allow you to look up specific record types. These include:
-type=mx: Used to look up mail exchange records.
-type=hinfo: Provides hardware information about the host server, including the operating system.
-type=ns: Provides DNS name server records for your domain query.
Other popular command prompt options in Linux include:
-domain=[domain-name]: Used to change the DNS name for a site.
-debug: Shows debugging information for the domain.
-timeout=[seconds]: Specifies the allowed DNS response time.
-port=[port-number]: Specifies the port number for queries. Nslookup uses port 53 as default.


## 参考开源项目dog
### 本地运行遇到的问题
#### cargo.toml的features
```toml
[features]
default = ["with_idna", "with_tls","with_rustls", "with_https"]
with_idna = ["dns/with_idna"]

with_tls = ["dns-transport/with_tls"]
with_https = ["dns-transport/with_https"]

with_nativetls = ["dns-transport/with_nativetls"]
with_nativetls_vendored = ["with_nativetls", "dns-transport/with_nativetls", "dns-transport/with_nativetls_vendored"]
with_rustls = ["dns-transport/with_rustls"]
```
按照给出的路径溯源到在dns-transport路径下的Cargo.toml文件中，有如下特性：
```toml
[features]
default = []  # these are enabled in the main dog crate

with_tls   = []
with_https = ["httparse"]

with_nativetls = ["native-tls"]
with_nativetls_vendored = ["native-tls", "native-tls/vendored"]
with_rustls = ["rustls", "webpki-roots", "webpki"]
```

在Ubuntu上编译的时候失败，修改主cargo.toml中的默认特性，额外启用了`with_rustls("rustls", "webpki-roots", "webpki")`特性，关闭了`with_nativetls（native-tls）`特性后编译成功。下面解释原因。

#### 前置知识
- TLS和SSL
    - SSL(Secure Sockets Layer)位于可靠的面向连接的`网络层协议和应用层协议`之间，通过互相认证、使用数字签名确保完整性、使用加密确保私密性，实现`客户端和服务器之间的安全通信`。SSL由两层组成：`SSL记录协议和SSL握手协议`。
    - TLS(Transport Layer Security) 用于在两个应用程序之间提供保密性和数据完整性。TLS也由两层组成：`TLS记录协议和TLS握手协议`。`TLS是SSL的后续版本`，建立在SSL 3.0协议规范之上。最新版本的TLS是TLS 1.3，于2018年发布23。

- openssl
  - 先前也有同学遇到过这个问题。openssl是一个开源的加密库，采用的链接方式是动态链接。但是DragonOS现在还不支持动态链接，所以需要修改一下Cargo.toml文件，将默认的特性修改为不使用openssl的特性。
- rustls
  - 选择启用rustls特性，这是一个纯Rust实现的TLS库，不依赖于openssl。这样就不会出现动态链接的问题了。
- native-tls
  - 上述修改后还是是无法构建成功，龙师兄直接猜出来是这个玩意的原因。`native-tls`是一个Rust库，用于在Rust中实现TLS。它依赖于openssl，因此在DragonOS上无法构建成功。因此，关闭`with_nativetls`特性后，编译成功。


- canonical name (CNAME)：别名记录，用于将一个域名指向另一个域名。例如，如果example.com是一个CNAME记录，指向example.net，那么访问example.com时实际上会被重定向到example.net。


- CDN(Content Delivery Network)：内容分发网络，用于加速网站的内容传输，通常通过在全球各地部署服务器来缓存网站内容，以减少用户访问时的延迟。
### 移植到DragonOS编译失败的问题
## 错误的思路
在dadk文件中写的路径可以是外部的，只要能编译进去就行。不是说要把在Ubuntu本地能编译的目录直接拷贝到DragonOS目录中。

## makefile
移植程序或者库到DragonIS上请阅读官方文档，需要自己仿照模板配置Makefile文件。
```Makeflie
export CC = x86_64-linux-musl-gcc
```
这是一个在Unix-like系统中设置环境变量的命令。这里，CC 是一个环境变量，通常用于指定C编译器。`x86_64-linux-musl-gcc` 是一个指向使用musl libc作为其C标准库的GCC编译器的路径。musl libc是一个轻量级、快速、简单的C标准库，设计用于静态链接，特别适合在容器和嵌入式系统中使用。

## 在DragonOS/bin/sysroot/etc中的resolv.conf
在Linux操作系统中，DNS网络设置通常涉及两个主要的配置文件：

- /etc/resolv.conf：这个文件包含了DNS服务器的IP地址，通常是由网络配置工具自动生成，或者是手动编辑后由系统动态读取的。在此文件中，你可以看到类似以下格式的配置：
```
nameserver 8.8.8.8
nameserver 8.8.4.4
```
这表示系统会使用`8.8.8.8`和`8.8.4.4`作为DNS服务器。
- /etc/hosts：虽然这个文件主要包含的是本地主机名与IP地址的映射，但它也可以用来配置解析特定的主机名。例如：
```
127.0.0.1   localhost
127.0.1.1   server.example.com
```
在这份文件中，server.example.com会被解析为127.0.1.1，这与DNS解析无关，是完全本地的解析。
对于网络配置，如果使用的是较新的Linux发行版，可能会使用`netplan`这个工具来配置网络。如果是这种情况，配置文件通常位于`/etc/netplan/`目录下，文件名通常以.yml结尾，例如`01-network-manager-all.yml`。在netplan的配置中，DNS设置可能会包含在dns段落中：

/etc/netplan/01-network-manager-all.yml
```
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: yes
      optional: true
  nameservers:
    addresses: [8.8.8.8, 8.8.4.4]
``` 
在上面的netplan配置示例中，nameservers部分定义了DNS服务器的IP地址。
需要注意的是，`/etc/network/interfaces`文件在较老的Linux系统中使用得更为普遍，但是从Ubuntu 15.04开始，netplan被引入并作为默认的网络配置工具，逐渐替代了interfaces文件。因此，具体的配置文件取决于你的Linux发行版和版本。

具体在我本地，在新建的DragonOS/bin/sysroot/etc中的resolv.conf文件中写入（开发环境里可以直接新建文件测试，但是在生产环境则需要在脚本里设置好新建这个文件）
```shell
nameserver=8.8.8.8
```
成功编译后运行，发现了两个bug。而输入`dog example.com --tcp`后是正常工作的。

## 发现新bug，提出issue
### tty
复现：输入`dog -v`、`dog -help`后出现满屏绿色问号，而输入`dog example.com --tcp`后是正常工作的。猜测是有颜色字符的tty转义问题。

### dog的udp版本
输入`dog example.com`或者后出现`error[network]:invalid argument`。
由于dog默认使用的是udp协议，经过测试可以确定是udp的问题。
## 善后：提交PR
龙师兄做了一些修改：
- 修改内核文件架构
- 修改本地CC环境变量相关
- Makefile
最终file changed详见Pr#652.
## debug技巧and日志技巧
内核打印信息
```shell
dmesg
```
日志信息：
DragonOS/serial_opt.txt
### VNC viewer
要虚拟机运行DragonOS之后才能连接上。

## 改--udp的bug
### 阅读kernel/src/net部分的代码
#### kernel/src/net/socket/inet.rs

**(udp无法使用的错误，原因在此文件的历史版本中，udpsocket中，do_bind()的0端口绑定的问题，在#676已修正)**

这段代码是在使用Rust语言实现的一个网络协议栈的一部分，它定义了三种不同类型的套接字：原始套接字（RawSocket）、UDP套接字（UdpSocket）、TCP套接字（TcpSocket）。

代码结构如下：

- RawSocket 结构体：

  - 表示原始套接字，可以直接访问网络层协议（如IP协议）而不经过传输层协议（如TCP或UDP）。
  - 包含句柄、是否包含IP头、元数据等字段。
  - 提供一个new构造函数，用于创建新的原始套接字。
  - 实现了Socket trait，定义了如何读写数据等。
- UdpSocket 结构体：

  - 表示UDP套接字，支持无连接的数据报服务。
  - 包含句柄、远程端点、元数据等字段。
  - 提供一个new构造函数，用于创建新的UDP套接字。
  - 实现了bind方法，允许将套接字绑定到特定的端口。
  - 实现了read和write方法，用于处理UDP的数据包。
- TcpSocket 结构体：
  - 表示TCP套接字，支持面向连接的数据传输服务。
  - 包含句柄、本地端点、是否监听、元数据等字段。
  - 提供一个new构造函数，用于创建新的TCP套接字。
  - 实现了connect方法，用于连接到TCP服务器。
  - 实现了listen方法，允许将套接字变成服务器模式监听端口。
  - 实现了accept方法，用于接受连接请求。
  - 实现了shutdown方法，允许关闭套接字的读写或同时关闭读写。
在这段代码中，Socket trait定义了套接字的标准行为，如数据读写、绑定/连接、关闭等操作。通过实现这个trait，RawSocket、UdpSocket和TcpSocket为不同的网络通信提供了抽象的接口。

此外，该代码还使用了一些高级的Rust概念，如闭包、异步编程、同步机制（如互斥量和读写锁）等，以实现网络套接字的功能。

## 修改get_random()的错误
修改后重新运行发生了kernel panic。详见issue#675。下面开始根据报错定位问题。在/kernel/src/syscall/misc.rs中：
```rust
   /// ## 将随机字节填入buf
    ///
    /// ### 该系统调用与linux不一致，因为目前没有其他随机源
    // pub fn get_random(buf: *mut u8, len: usize, flags: GRandFlags) -> Result {
    //     if flags.bits() == (GRandFlags::GRND_INSECURE.bits() | GRandFlags::GRND_RANDOM.bits()) {
    //         return Err(SystemError::EINVAL);
    //     }

    //     let mut writer = UserBufferWriter::new(buf, len, true)?;

    //     let mut ret = Vec::new();
    //     let mut count = 0;
    //     while count < len {
    //         let rand = rand();
    //         for offset in 0..4 {
    //             ret.push((rand >> (offset * 2)) as u8);
    //             count += 1;
    //         }
    //     }

    //     writer.copy_to_user(&ret, 0)?;
    //     Ok(len)
    // }
    // get_random 新的实现
    pub fn get_random(buf: *mut u8, len: usize, flags: GRandFlags) -> Result<usize, SystemError> {
        if flags.bits() == (GRandFlags::GRND_INSECURE.bits() | GRandFlags::GRND_RANDOM.bits()) {
            return Err(SystemError::EINVAL);
        }

        let mut writer = UserBufferWriter::new(buf, len, true)?;

        let mut ret = Vec::new();
        let mut count = 0;
        while count < len {
            let rand_byte = rand() as u8;
            ret.push(rand_byte);
            count += 1;
        }

        writer.copy_to_user(&ret, 0)?;
        Ok(len)
    }
```
在原来的实现中，代码尝试将32位随机数（rand()）分解为4个字节，并且每个循环中生成4个字节，然后推入ret向量。如果len是1，那么这个循环会产生4个额外不需要的字节，这可能是导致之前提到的错误的原因。 #675

第二种实现则简单地每次生成一个随机字节（rand() as u8），并直接推入ret向量，只有当count小于len时才继续循环。这样，无论len是多少，它都会生成正好len个字节的随机数。
## SYS_POLL
修改完get_random()后，可以运行但是出现了一长串warning，提示`SYS_POLL`
系统调用未实现。搜索后发现这个系统调用是用于等待文件描述符上的事件的，通常用于I/O多路复用。在Linux中，poll系统调用允许进程等待多个文件描述符上的事件，直到其中一个文件描述符准备好为止。这个系统调用在DragonOS中尚未实现，因此会导致警告。目前已有同学在开发了。