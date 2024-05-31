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
### cherrypy
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
### APIDOC
- Install
    - `npm install apidoc -g`
- Run
    - `apidoc -i src -o apidoc`
> Creates an apiDoc of all files within dir src, using the default template, and puts all output to apidoc directory.
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

## 第二周