---
title: IBM联合科研项目
categories: 技术分享
tags: 
    - Prometheus
    - Grafana
---
# 前置工作
## 环境配置
### Prometheus+Grafana
环境：Ubuntu 22.04
- 参考：
    https://www.jianshu.com/p/8d2c020313f0
    https://www.cnblogs.com/crazymakercircle/p/16768535.html
    https://blog.csdn.net/qq_31725371/article/details/114697770
#### Prometheus 安装
https://prometheus.io/download/
#### Grafana 安装
https://grafana.com/grafana/download
#### exporter 安装
- node_exporter为例
    https://github.com/prometheus/node_exporter/releases/tag/v1.8.0

#### tips
如果Grafana是用docker安装的，prometheus是在本地环境中直接安装的话，添加数据源时，prometheus的地址不能直接填写`http://localhost:9090`，需要填写本机的ip地址，因为docker中的Grafana是一个独立的容器，localhost指的是容器内部的地址，而不是本机的地址。同理如果prometheus也是在docker中安装的，那么也需要填写docker的ip地址。


如果都安装在本地上，那么直接使用localhost:9090即可（Prometheus运行在9090，node_exporter 运行在9100，Grafana运行在3000）

## Prometheus使用
参考：https://zhuanlan.zhihu.com/p/351995351
## Grafana使用
官方教程：https://grafana.com/tutorials/?utm_source=grafana_gettingstarted


# 每周学习/开发报告
## 第一周
后端组：
- 任务1 了解下什么是restful API。参考： https://restfulapi.net/
- 任务2 学习使用框架cherrypy，利用框架在本机完成一个helloworld的api接口。参考：https://cherrypy.dev/
- 任务3 学习使用apidoc为自己的接口生成文档。参考：https://apidocjs.com/
### 什么是restful API
RESTful API 是一种设计风格，用于构建 Web 服务。REST 是 Representational State Transfer 的缩写，它是一种设计风格，用于构建 Web 服务。RESTful API 是基于 REST 架构设计的 API，它使用 HTTP 请求来进行通信，并遵循 REST 的设计原则。

RESTful API 的设计原则包括以下几点：

- 使用 HTTP 方法（GET、POST、PUT、DELETE）来操作资源。
- 使用 URL 来标识资源。
- 使用 JSON 或 XML 格式来传输数据。
- 使用状态码来表示请求的结果。

RESTful API 的优点包括：

- 简单：RESTful API 使用 HTTP 方法来操作资源，使得 API 的设计更加简单。
- 易于理解：RESTful API 使用 URL 来标识资源，使得 API 的使用更加直观。
- 易于扩展：RESTful API 使用 JSON 或 XML 格式来传输数据，使得 API 的扩展更加容易。
- 易于测试：RESTful API 使用状态码来表示请求的结果，使得 API 的测试更加简单。

RESTful API 的缺点包括：

- 缺乏标准：RESTful API 没有统一的标准，使得 API 的设计更加随意。
- 缺乏安全性：RESTful API 没有内置的安全机制，使得 API 的安全性更加脆弱。
- 缺乏性能：RESTful API 使用 HTTP 协议来通信，使得 API 的性能更加有限。
### cherrypy
官方仓库的tutorials：https://github.com/cherrypy/cherrypy/blob/main/docs/tutorials.rst
- 安装
    ```shell
    pip install cherrypy
    ```
- 示例代码
    ```python
    import cherrypy

    class HelloWorld(object):
        @cherrypy.expose
        def index(self):
            return "Hello World!"

    cherrypy.quickstart(HelloWorld())
    ```
- 运行
    ```shell
    python helloworld.py
    ```

`cherrypy`是一个Python库，用于创建Web应用程序。它是一个最小主义的框架，提供了HTTP服务器和一个路由系统。

在helloworld.py中，`cherrypy`做了以下几件事：

1. 提供了一个装饰器`@cherrypy.expose`，这个装饰器用于将Python函数公开为Web应用程序的一部分。在你的代码中，`index`函数被公开，当用户访问应用程序的根URL（例如`http://localhost:8080/`）时，将调用此函数。

2. 提供了一个函数`cherrypy.quickstart`，用于启动Web应用程序。在你的代码中，这个函数

#### 用py编写一个简单的restful API
```python
# api.py
import cherrypy

# 创建一个图书类，用于模拟数据库中的数据
class Book:
    def __init__(self, title, author, id=None):
        self.id = id
        self.title = title
        self.author = author

    # 用于检索图书的方法
    @classmethod
    def get_book_by_id(cls, id):
        # 在实际应用中，这里会是查询数据库的地方
        books = [book for book in ALL_BOOKS if book.id == id]
        return books[0] if books else None

    # 用于获取所有图书的方法
    @classmethod
    def get_all_books(cls):
        return ALL_BOOKS

    # 用于添加图书的方法
    def save(self):
        ALL_BOOKS.append(self)
        return self

    # 用于删除图书的方法
    def delete(self):
        ALL_BOOKS = [book for book in ALL_BOOKS if book.id != self.id]
        return self

# 模拟数据库中所有的图书记录
ALL_BOOKS = []

# 创建一个RESTful API来处理图书信息的CRUD操作
class LibraryAPI(object):
    @cherrypy.expose
    def index(self):
        return "This is a simple RESTful API for managing books."

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def get_books(self):
        return Book.get_all_books()

    @cherrypy.expose
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def post_books(self):
        book_data = cherrypy.request.json
        new_book = Book(book_data['title'], book_data['author'])
        return new_book.save()

    @cherrypy.expose
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def put_books(self, id):
        book = Book.get_book_by_id(id)
        if book is None:
            raise cherrypy.HTTPError(404, "Book not found")
        book_data = cherrypy.request.json
        book.title = book_data['title']
        book.author = book_data['author']
        return book.save()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def delete_books(self, id):
        book = Book.get_book_by_id(id)
        if book is None:
            raise cherrypy.HTTPError(404, "Book not found")
        return book.delete()

# 设置CherryPy服务器
if __name__ == '__main__':
    cherrypy.config.update({'server.socket_host': '0.0.0.0',
                            'server.socket_port': 8080})
    cherrypy.quickstart(LibraryAPI())
```
这段代码创建了一个简单的RESTful API，包含以下端点：

``` js
GET /books：获取所有图书的信息。
POST /books：添加一本新书到数据库。
PUT /books/<id>：更新指定ID的图书信息。
DELETE /books/<id>：删除指定ID的图书。
```

要运行这个API，只需要执行以下命令：
```shell
curl http://localhost:8080/books
```

#### tutorials
##### Tutorial 4: Submit this form
如何处理HTML表单
```python
import random
import string

import cherrypy


class StringGenerator(object):
    @cherrypy.expose
    def index(self):
        return """<html>
          <head></head>
          <body>
            <form method="get" action="generate">
              <input type="text" value="8" name="length" />
              <button type="submit">Give it now!</button>
            </form>
          </body>
        </html>"""

    @cherrypy.expose
    def generate(self, length=8):
        return ''.join(random.sample(string.hexdigits, int(length)))


if __name__ == '__main__':
    cherrypy.quickstart(StringGenerator())
```
##### Tutorial 5: Track my end-user's activity
代码30-34展示了如何在CherryPy应用程序中启用会话支持。默认情况下，CherryPy将在进程的内存中保存会话。它还支持更持久的会话存储方式。
```python
import random
import string

import cherrypy


class StringGenerator(object):
    @cherrypy.expose
    def index(self):
        return """<html>
          <head></head>
          <body>
            <form method="get" action="generate">
              <input type="text" value="8" name="length" />
              <button type="submit">Give it now!</button>
            </form>
          </body>
        </html>"""

    @cherrypy.expose
    def generate(self, length=8):
        some_string = ''.join(random.sample(string.hexdigits, int(length)))
        cherrypy.session['mystring'] = some_string
        return some_string

    @cherrypy.expose
    def display(self):
        return cherrypy.session['mystring']


if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True
        }
    }
    cherrypy.quickstart(StringGenerator(), '/', conf)
```
##### Tutorial 7: Give us a REST
一个非常基本的遵循 REST 原则的 Web API 示例
```python
import random
import string

import cherrypy


@cherrypy.expose
class StringGeneratorWebService(object):

    @cherrypy.tools.accept(media='text/plain')
    def GET(self):
        return cherrypy.session['mystring']

    def POST(self, length=8):
        some_string = ''.join(random.sample(string.hexdigits, int(length)))
        cherrypy.session['mystring'] = some_string
        return some_string

    def PUT(self, another_string):
        cherrypy.session['mystring'] = another_string

    def DELETE(self):
        cherrypy.session.pop('mystring', None)


if __name__ == '__main__':
    conf = {
        '/': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.sessions.on': True,
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/plain')],
        }
    }
    cherrypy.quickstart(StringGeneratorWebService(), '/', conf)
```

We use the Session interface of requests so that it takes care of carrying the session id stored in the request cookie in each subsequent request. That is handy.
我们使用 requests 的 Session 接口，这样它会在每个后续请求中负责携带存储在请求 Cookie 中的会话 ID。这很方便。

使用python客户端进行web api测试，而不是浏览器。这是因为浏览器只支持GET和POST请求，而我们的API还支持PUT和DELETE请求。
```shell
>>> import requests
>>> s = requests.Session()
>>> r = s.get('http://127.0.0.1:8080/')
>>> r.status_code
500
>>> r = s.post('http://127.0.0.1:8080/')
>>> r.status_code, r.text
(200, u'04A92138')
>>> r = s.get('http://127.0.0.1:8080/')
>>> r.status_code, r.text
(200, u'04A92138')
>>> r = s.get('http://127.0.0.1:8080/', headers={'Accept': 'application/json'})
>>> r.status_code
406
>>> r = s.put('http://127.0.0.1:8080/', params={'another_string': 'hello'})
>>> r = s.get('http://127.0.0.1:8080/')
>>> r.status_code, r.text
(200, u'hello')
>>> r = s.delete('http://127.0.0.1:8080/')
>>> r = s.get('http://127.0.0.1:8080/')
>>> r.status_code
500
```
##### Tutorial 9: Data is all my life
作为教程，为了简单起见，选择Python直接支持的数据库—— sqlite

>不幸的是，Python中的sqlite不允许我们在多线程之间共享连接。由于CherryPy是一个多线程服务器，因此这会成为一个问题。这就是为什么我们在每次调用时都会打开和关闭数据库连接的原因。这显然并不真正适合生产环境，最好还是使用更可靠的数据库引擎或更高级的库，如SQLAlchemy，以更好地满足应用程序的需求。

我们的应用程序将把会话中生成的字符串存储到SQLite数据库中。该应用程序将具有与 tutorial 08 <tut08> 相同的HTML代码。因此，让我们仅关注应用程序本身的代码.
```python
import os, os.path
import random
import sqlite3
import string
import time

import cherrypy

DB_STRING = "my.db"


class StringGenerator(object):
    @cherrypy.expose
    def index(self):
        return open('public\index.html')


@cherrypy.expose
class StringGeneratorWebService(object):

    @cherrypy.tools.accept(media='text/plain')
    def GET(self):
        with sqlite3.connect(DB_STRING) as c:
            cherrypy.session['ts'] = time.time()
            r = c.execute("SELECT value FROM user_string WHERE session_id=?",
                          [cherrypy.session.id])
            return r.fetchone()

    def POST(self, length=8):
        some_string = ''.join(random.sample(string.hexdigits, int(length)))
        with sqlite3.connect(DB_STRING) as c:
            cherrypy.session['ts'] = time.time()
            c.execute("INSERT INTO user_string VALUES (?, ?)",
                      [cherrypy.session.id, some_string])
        return some_string

    def PUT(self, another_string):
        with sqlite3.connect(DB_STRING) as c:
            cherrypy.session['ts'] = time.time()
            c.execute("UPDATE user_string SET value=? WHERE session_id=?",
                      [another_string, cherrypy.session.id])

    def DELETE(self):
        cherrypy.session.pop('ts', None)
        with sqlite3.connect(DB_STRING) as c:
            c.execute("DELETE FROM user_string WHERE session_id=?",
                      [cherrypy.session.id])


def setup_database():
    """
    Create the `user_string` table in the database
    on server startup
    """
    with sqlite3.connect(DB_STRING) as con:
        con.execute("CREATE TABLE user_string (session_id, value)")


def cleanup_database():
    """
    Destroy the `user_string` table from the database
    on server shutdown.
    """
    with sqlite3.connect(DB_STRING) as con:
        con.execute("DROP TABLE user_string")


if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/generator': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/plain')],
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
    }

    cherrypy.engine.subscribe('start', setup_database)
    cherrypy.engine.subscribe('stop', cleanup_database)

    webapp = StringGenerator()
    webapp.generator = StringGeneratorWebService()
    cherrypy.quickstart(webapp, '/', conf)
```
##### Tutorial 11: Organize my code
CherryPy comes with a powerful architecture that helps you organizing your code in a way that should make it easier to maintain and more flexible.
CherryPy 提供了一个强大的架构，可以帮助您以一种更易于维护和更具灵活性的方式组织代码。

Several mechanisms are at your disposal, this tutorial will focus on the three main ones:
本教程将为您介绍几种可用的机制，重点介绍其中三种主要机制：

- dispatchers <dispatchers>
- tools <tools>
- plugins <busplugins>

###### dispatchers
为了支持不同场景下需要设置一个收银台，也就是这些用例，CherryPy提供了一种称为“路由器（dispatcher）”的机制。路由器在请求处理过程中较早执行，以确定哪个代码片段将处理即将到来的请求。或者，继续使用商店的比喻，路由器将决定将顾客引导到哪个收银台。
###### tools
我们假设你的商店决定举办一次折扣促销活动，但仅针对特定类别的顾客。CherryPy可以通过一种名为“筛选器”（ tool <tools> ）的机制来处理此类用例。

A tool is a piece of code that runs on a per-request basis in order to perform additional work. Usually a tool is a simple Python function that is executed at a given point during the process of the request by CherryPy.
工具是一种在每个请求的基础上运行的代码，用于执行额外的工作。通常，工具是一个简单的Python函数，在请求处理过程中的某个特定点由CherryPy执行。
###### plugins
In the CherryPy world, this translates into having functions that run outside of any request life-cycle. These functions should take care of background tasks, long lived connections (such as those to a database for instance), etc.
在CherryPy的世界中，这意味着需要一些在请求生命周期之外运行的函数。这些函数应该负责处理后台任务、长期连接（例如与数据库的连接）等。

`Plugins <busplugins>` are called that way because they work along with the CherryPy `engine <cpengine>` and extend it with your operations.
它们之所以被称为“CherryPy扩展”，是因为它们与CherryPy框架协同工作，并通过添加自己的操作来扩展该框架。

##### Tutorial 12: Using pytest and code coverage
为以下程序编写测试程序：
```python
import random
import string

import cherrypy


class StringGenerator(object):
    @cherrypy.expose
    def index(self):
        return "Hello world!"

    @cherrypy.expose
    def generate(self):
        return ''.join(random.sample(string.hexdigits, 8))


if __name__ == '__main__':  # pragma: no cover
    cherrypy.quickstart(StringGenerator())
```
测试程序：
```python
import cherrypy
from cherrypy.test import helper

from tut12 import StringGenerator

class SimpleCPTest(helper.CPWebCase):
    @staticmethod
    def setup_server():
        cherrypy.tree.mount(StringGenerator(), '/', {})

    def test_index(self):
        self.getPage("/")
        self.assertStatus('200 OK')
    def test_generate(self):
        self.getPage("/generate")
        self.assertStatus('200 OK')
```
pytest：
```shell
pytest -v test_tut12.py
```

pytest-cov：
```shell
pytest --cov=tut12 --cov-report term-missing test_tut12.py
```
这两个命令都是用于运行Python的pytest测试框架的。

1. `pytest -v test_tut12.py`：这个命令用于运行名为`test_tut12.py`的测试文件。`-v`参数是`--verbose`的简写，它会使得pytest输出更详细的测试执行信息。

2. `pytest --cov=tut12 --cov-report term-missing test_tut12.py`：这个命令使用了pytest的一个插件pytest-cov，用于计算测试覆盖率。`--cov=tut12`指定了要计算覆盖率的代码模块，这里是`tut12`模块。`--cov-report term-missing`指定了覆盖率报告的格式和输出方式，`term-missing`表示在终端输出报告，并列出未被测试覆盖的代码行。

### APIDOC
- Install: `npm install apidoc -g`
- Run: `apidoc -i src -o apidoc`
    > Creates an apiDoc of all files within dir src, using the default template, and puts all output to apidoc directory.

在我们刚刚编写的RESTful API中，我们可以使用apidoc来生成API文档。
### 关于可观测
可观测性包括 Metrics、Traces、Logs 3 个维度。可观测能力帮助我们在复杂的分布式系统中快速排查、定位问题，是分布式系统中必不可少的运维工具。

在性能压测领域中，可观测能力更为重要，除了有助于定位性能问题，其中Metrics性能指标更直接决定了压测是否通过，对系统上线有决定性左右，具体如下：

#### Metrics，监控指标

系统性能指标，包括请求成功率、系统吞吐量、响应时长

资源性能指标，衡量系统软硬件资源使用情况，配合系统性能指标，观察系统资源水位

#### Logs，日志

施压引擎日志，观察施压引擎是否健康，压测脚本执行是否有报错

采样日志，采样记录 API 的请求和响应详情，辅助排查压测过程中的一些出错请求的参数是否正常，并通过响应详情，查看完整的错误信息

#### Traces，追踪
分布式链路追踪用于性能问题诊断阶段，通过追踪请求在系统中的调用链路，

定位报错 API 的报错系统和报错堆栈，快速定位性能问题点

本篇阐述如何使用 Prometheus 实现性能压测 Metrics 的可观测性。

### 下周目标
## 第二周
前端组 后端组 ：
任务1 学习docker的基本用法，熟悉container，image操作相关命令，使用一个简单的dockerfile build一个image并启动。
任务2 搭建node_exporter+prometheus+grafana监控一个node并在grafana中展示，展示面板用这个就可以https://grafana.com/grafana/dashboards/1860-node-exporter-full/ （每组合作完成一套环境搭建，最好在linux环境下完成）
任务3 进一步熟悉代码框架（后面对应指导老师会有专题讲座）
任务4 linuxone基础知识入门 （后面叶老师会有专题讲座，并有学习资料给到大家）
### 在虚拟机上用docker拉取镜像
由于之前是在Linux实体机上搭建了非dockers的Prometheus+Grafana环境，感觉不是很方便，但是在Windows环境上由于虚拟机的VT支持跟wsl2冲突了，我没法同时在Windows上用dockers以及在虚拟机里面搭建虚拟平台（某些课程和内核项目偶尔的需要），所以我打算直接在虚拟机里用dockers。所以这次我将在虚拟机Ubuntu22.04环境中用docker搭建Prometheus+Grafana环境。

首先遇到了第一个问题：
- 修改ssh配置，用vsc远程控制虚拟机
- 在虚拟机上用dockers拉取镜像的时候居然报错了！
> Error response from daemon: Get "https://registry-1.docker.io/v2/": dial tcp: lookup registry-1.docker.io on 127.0.0.53:53: server misbehaving.

筛查了一下，发现是因为虚拟机的DNS设置有问题，一开始尝试修改了`/etc/dockers/daemon.json`，没有作用；后来的解决方法是修改`/etc/resolv.conf`文件，将`nameserver 127.0.0.53:53`改为`nameserver 8.8.8.8`，然后重启网络服务`sudo service network-manager restart`再重新拉取镜像就可以了。

在`/etc/dockers/daemon.json`中更换docker hub的国内镜像，成功拉取
```json
{
"registry-mirrors": ["https://docker.mirrors.ustc.edu.cn/","https://hub-mirror.c.163.com","https://registry.docker-cn.com"],
"insecure-registries": ["10.0.0.12:5000"]
}
```

### 在Ubuntu上安装配置Maria DB
在 Ubuntu 上安装和配置 MariaDB 的步骤如下：

#### 步骤 1: 安装 MariaDB

1. **更新包索引**:
   ```bash
   sudo apt update
   ```

2. **安装 MariaDB 服务器**:
   ```bash
   sudo apt install mariadb-server
   ```

#### 步骤 2: 安全配置 MariaDB

MariaDB 安装完成后，运行 `mysql_secure_installation` 脚本来设置 root 密码，移除匿名用户，禁止 root 用户远程登录，并删除测试数据库。

1. **运行安全脚本**:
   ```bash
   sudo mysql_secure_installation
   ```

   按照提示操作：
   - 设置 root 密码。
   - 移除匿名用户。
   - 禁止 root 用户远程登录。
   - 删除测试数据库并访问它。
   - 重新加载权限表。

#### 步骤 3: 配置 MariaDB 用户（可选）

为了更安全地操作数据库，建议创建一个新的数据库用户。

1. **登录 MariaDB**:
   ```bash
   sudo mysql -u root -p
   ```

2. **创建新用户**:
   替换 `your_new_user` 和 `user_password` 为你的用户名和密码。
   ```sql
   CREATE USER 'your_new_user'@'localhost' IDENTIFIED BY 'user_password';
   ```

3. **授权新用户**:
   为用户授权，允许访问和操作数据库。替换 `database_name` 为你的数据库名。
   ```sql
   GRANT ALL PRIVILEGES ON database_name.* TO 'your_new_user'@'localhost';
   ```

4. **刷新权限** 并 **退出**:
   ```sql
   FLUSH PRIVILEGES;
   EXIT;
   ```

#### 步骤 4: 测试 MariaDB 安装

1. **登录 MariaDB**:
   使用新创建的用户登录（如果已创建）。
   ```bash
   mysql -u your_new_user -p
   ```

2. **查看 MariaDB 版本**:
   ```sql
   SELECT version();
   ```

完成以上步骤后，MariaDB 就安装并配置好了。你现在可以开始创建数据库和表，进行数据管理操作了。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/image-35.png)


### 配置dockers环境过程中遇到启动了容器但是访问不到端口的问题
不管是虚拟机还是宿主机都访问不到。

尝试过程：
初步了解并排除了docker-compose.yml和prometheus.yml的问题。
```shell
val213@ubuntu:~$ curl 192.168.77.128:3000
curl: (7) Failed to connect to 192.168.77.128 port 3000 after 21025 ms: Connection refused

val213@ubuntu:~$ curl localhost:3000
curl: (56) Recv failure: Connection reset by peer
```

#### docker-compose.yml
这个文件是一个配置文件，用来定义和运行多容器的 Docker 应用程序。通过这个文件，可以使用 `docker-compose` 命令来启动、停止、删除多个容器，还可以一键启动多个容器。

docker-compose.yml文件是基于项目的，也就是说，每个项目都可以有一个对应的docker-compose.yml文件。这个文件通常放在项目的根目录下，用来定义项目的容器、网络、卷等信息。
#### prometheus.yml
这个文件是 Prometheus 的配置文件，用来定义 Prometheus 的配置信息。通过这个文件，可以配置 Prometheus 的抓取规则、告警规则、存储配置等信息。

**启动 prometheus 容器的时候，使用-v参数将prometheus.yml文件挂载到容器内的/etc/prometheus目录下，这样 prometheus 就会读取这个配置文件。**

prometheus.yml文件是允许存在多个的，可以根据需要创建多个配置文件，然后在启动 prometheus 容器的时候指定不同的配置文件。
#### docker/daemon.json
这个是docker的配置文件，用来配置docker的一些参数，比如镜像加速器、日志配置等。我没有在这个文件中配置DNS，所以在排查问题的过程中，运行
```shell
val213@ubuntu:~$ docker exec -it a55d25c92e6f ping google.com
ping: bad address 'google.com'
val213@ubuntu:~$ docker exec -it a55d25c92e6f ping baidu.com
ping: bad address 'baidu.com'
val213@ubuntu:~$ docker exec -it a55d25c92e6f ping www.baidu.com
ping: bad address 'www.baidu.com'
```
#### 内核级别的包过滤系统
`sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT`
`sudo iptables -A INPUT -p tcp --dport 9090 -j ACCEPT`
即使您没有主动使用防火墙软件，Linux系统中的`iptables`仍然是内核级别的包过滤系统，用于控制进出网络数据包的行为。`iptables`规则决定了如何处理经过网络接口的数据包。下面是对您提到的命令的解释：

```bash
sudo iptables -A INPUT -p tcp --dport 9090 -j ACCEPT
```

- `iptables`: 调用iptables工具，它用于设置、查看和修改Linux内核的网络包过滤和NAT规则。
- `-A INPUT`: `-A`参数用于向指定链（这里是`INPUT`链）添加一条规则。`INPUT`链处理进入本机的数据包。
- `-p tcp`: 指定规则适用于TCP协议的数据包。`-p`参数用于指定数据包的协议类型。
- `--dport 9090`: 指定目的端口为9090。`--dport`参数用于匹配目的地端口号，这里表示规则只适用于目标端口为9090的数据包。
- `-j ACCEPT`: `-j`参数指定如果数据包匹配这条规则，应该采取的动作（"jump to"）。`ACCEPT`表示允许数据包通过，即不对符合条件的数据包进行任何阻止。

**原理**：
- 当数据包到达您的系统时，`iptables`根据预设的规则来决定如何处理这些数据包。这些规则按照它们被添加到链中的顺序进行匹配。
- 如果一个进入的TCP数据包的目的端口是9090，这条规则会匹配该数据包，并允许它进入您的系统，而不是被丢弃或拒绝。
- 即使您没有主动配置或启用复杂的防火墙规则，`iptables`仍然在后台运行，根据其配置（包括默认规则和策略）处理网络流量。通过添加这条规则，您确保了所有尝试访问端口9090的TCP连接都不会被防火墙阻止。

最终结果：虚拟机和宿主机都可以访问到Prometheus和Grafana的端口了！

#### 学到了其他的一些命令
- `docker inspect a55d25c92e6f`命令，可以查看容器的详细信息，包括网络配置等。
- 在Docker中，如果在启动容器时没有指定容器名称（`container_name`），Docker会自动生成一个随机的名称。这个名称通常由一个形容词和一个著名科学家或工程师的名字组成，例如`quizzical_ganguly`。

    然而，当使用`docker-compose`并在[`docker-compose.yml`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fval213%2FLOP-learn%2Fdocker-compose.yml%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/val213/LOP-learn/docker-compose.yml")文件中为服务指定了`container_name`属性时，容器将使用这个指定的名称，而不是生成一个随机名称。在您提供的[`docker-compose.yml`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fval213%2FLOP-learn%2Fdocker-compose.yml%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/val213/LOP-learn/docker-compose.yml")文件片段中，Prometheus服务被明确命名为`prometheus`：

    ```dockercompose
    services:
    prometheus:
        container_name: prometheus
    ```

    这意味着，当使用这个`docker-compose.yml`文件启动容器时，Prometheus容器的名称应该是`prometheus`，而不是一个随机生成的名称。如果容器名称是随机的，可能是因为容器是直接通过`docker run`命令启动的，而不是通过`docker-compose up`，或者是使用了不同的`docker-compose.yml`文件。