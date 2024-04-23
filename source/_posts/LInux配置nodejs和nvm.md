---
title: Linux配置nodejs和nvm遇到的问题
tag: Linux, nodejs, nvm
categories: 技术分享
---
环境：centos7
某些项目的环境依赖node和npm，不同项目和系统的版本不同，所需要的node版本也不一样；某些工具的安装使用yum无法完成，所以还得下载了npm用npm来安装。
所以node、npm或者node版本管理工具nvm的安装还是必要的。
# nvm
`.nvm`
`./install.sh`
`.bashrc`
`.bash_profile`
# glibc和glibcxx版本与node版本不兼容
## 问题描述
my nvm version is 0.38.0,but when i input node or npm, shows ：
```shell
node: /lib64/libm.so.6: version `GLIBC_2.27' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by node)
node: /lib64/libstdc++.so.6: version `CXXABI_1.3.9' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.27' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.25' not found (required by node)"
```
## 解决方案（来自newbing）:
I'm sorry to hear that you are having trouble with node and npm on CentOS. This error means that your system does not have the required versions of the GNU C Library (glibc) and the GNU Standard C++ Library (libstdc++) that node and npm depend on¹. There are a few possible ways to fix this error:

- You can try to install an older version of node and npm that is compatible with your system's glibc and libstdc++ versions. You can use nvm to switch between different node versions easily². For example, you can run `nvm install 10` to install node 10, which should work with glibc 2.17 and libstdc++ 4.8.5³.
- You can try to update your system's glibc and libstdc++ libraries to the latest versions. This may require you to upgrade your CentOS version or use a third-party repository⁴. For example, you can run `sudo yum install centos-release-scl` and `sudo yum install devtoolset-9-gcc-c++` to install glibc 2.28 and libstdc++ 9.2.1 from the Software Collections Library (SCL) repository⁵.
- You can try to install node and npm from source code. This will allow you to compile them with your system's glibc and libstdc++ versions. However, this may take longer and require more dependencies⁶. For example, you can run `curl -O [7](https://nodejs.org/dist/v18.0.0/node-v18.0.0.tar.gz)` and `tar xvf node-v18.0.0.tar.gz` to download and extract the node source code, and then run `cd node-v18.0.0` and `./configure && make && sudo make install` to build and install node and npm.

I hope one of these options works for you. If you need more help, you can check out some of the web resources I found for you. Good luck! 😊
# yum 安装 npm遇到问题
## 问题描述
```shell
This system is not registered with an entitlement server. You can use subscription-manager to register.
```
## 解决方案
停止掉该插件的使用，在配置文件中让enable=0即可。
>报错的意思是：操作系统需要注册，你可以使用订阅管理器来注册系统。
>
>Redhat需要操作系统注册后才能使用yum。把这个插件的功能关掉，就行了。
>yum源调用订阅管理器插件（其实是一个脚本）
>
>`/usr/lib/yum-plugins/subscription-manager.py`
>这个脚本中定义了订阅管理器的配置文件:
>`/etc/yum/pluginconf.d/subscription-manager.conf`
>```shell
>[main]
>enabled=1
>```
>用vi编辑把这个值改成0 就行。
>————————————————        
>原文链接：https://blog.csdn.net/maibaizhou/article/details/121047462

# npm安装其他库遇到问题
## 问题描述1
```shell
npm install tldr
```
报错：
```shell
npm ERR! code ECONNREFUSED
npm ERR! syscall connect
npm ERR! errno ECONNREFUSED
npm ERR! FetchError: request to https://registry.npmjs.org/afinn-165 failed, reason: connect ECONNREFUSED 104.16.2.35:443
npm ERR!     at ClientRequest.<anonymous> (/root/.nvm/versions/node/v16.20.2/lib/node_modules/npm/node_modules/minipass-fetch/lib/index.js:130:14)
npm ERR!     at ClientRequest.emit (node:events:513:28)
npm ERR!     at TLSSocket.socketErrorListener (node:_http_client:494:9)
npm ERR!     at TLSSocket.emit (node:events:525:35)
npm ERR!     at emitErrorNT (node:internal/streams/destroy:157:8)
npm ERR!     at emitErrorCloseNT (node:internal/streams/destroy:122:3)
npm ERR!     at processTicksAndRejections (node:internal/process/task_queues:83:21)
npm ERR!  FetchError: request to https://registry.npmjs.org/afinn-165 failed, reason: connect ECONNREFUSED 104.16.2.35:443
npm ERR!     at ClientRequest.<anonymous> (/root/.nvm/versions/node/v16.20.2/lib/node_modules/npm/node_modules/minipass-fetch/lib/index.js:130:14)
npm ERR!     at ClientRequest.emit (node:events:513:28)
npm ERR!     at TLSSocket.socketErrorListener (node:_http_client:494:9)
npm ERR!     at TLSSocket.emit (node:events:525:35)
npm ERR!     at emitErrorNT (node:internal/streams/destroy:157:8)
npm ERR!     at emitErrorCloseNT (node:internal/streams/destroy:122:3)
npm ERR!     at processTicksAndRejections (node:internal/process/task_queues:83:21) {
npm ERR!   code: 'ECONNREFUSED',
npm ERR!   errno: 'ECONNREFUSED',
npm ERR!   syscall: 'connect',
npm ERR!   address: '104.16.2.35',
npm ERR!   port: 443,
npm ERR!   type: 'system',
npm ERR!   requiredBy: 'node_modules/natural'
npm ERR! }
npm ERR! 
npm ERR! If you are behind a proxy, please make sure that the
npm ERR! 'proxy' config is set properly.  See: 'npm help config'

npm ERR! A complete log of this run can be found in:
npm ERR!     /root/.npm/_logs/2024-01-26T08_20_39_259Z-debug-0.log
```
## 解决方案1
再试一次好像就成功了（）
