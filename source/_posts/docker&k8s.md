---
title: dockers&k8s
tags: docker, kubernetes
categories: 技术分享
---
## docker
### 基本概念
#### image镜像
类似于虚拟机中的snapshot快照，里面包含我们要部署的应用程序以及它先关联的所有库。

#### container容器
通过镜像我们可以创建许多个不同的container容器，每个容器都是一个独立的运行环境（就像虚拟机），每一个容器是独立运行的。
#### dockerfile
自动化脚本。用于创建镜像。就像我们在虚拟机中安装操作系统和软件一样。


### dockerfile编写语法
- FROM：指定基础镜像，必须是第一条指令
- MAINTAINER：指定作者信息
- RUN：创建镜像时执行的命令
- ADD：添加文件
- WORKDIR：指定工作目录
- ENV：设置环境变量
- EXPOSE：暴露端口
- CMD：指定容器启动时执行的命令

#### 示例
```dockerfile
FROM centos:7
MAINTAINER zhangsan
RUN yum install -y vim
ADD test.txt /opt/test.txt
WORKDIR /opt
ENV MYPATH /usr/local
EXPOSE 80
CMD echo $MYPATH
```

### docker desktop

### docker 命令
- docker images：查看本地镜像
- docker ps：查看正在运行的容器
- docker ps -a：查看所有容器
- docker run -d -p 80:5000 nginx：运行镜像，其中-d表示后台运行，-p表示端口映射，80是宿主机端口，5000是容器端口，nginx是镜像名。
- docker start 容器id：启动容器
- docker stop 容器id：停止容器
- docker rm 容器id：删除容器
- docker rmi 镜像id：删除镜像
- docker exec -it 容器id /bin/bash：进入容器

### volume数据卷
数据卷是一个可供一个或多个容器使用的特殊目录，它绕过 UFS，可以提供很多有用的特性：
- 数据卷可以在容器之间共享和重用
- 对数据卷的修改会立马生效
- 对数据卷的更新，不会影响镜像
- 数据卷默认会一直存在，即使容器被删除
- 数据卷的生命周期一直持续到没有容器使用它为止
- 数据卷的使用，类似于 Linux 下对目录或文件进行 mount，Docker 下的数据卷，也可以被类比为 Linux 下的目录挂载。不同的是，Docker 下的数据卷，不需要你自己进行 mount，Docker 自己会完成这些工作。

#### 数据卷的使用
- docker volume create my-vol：创建数据卷
- 启动容器的时候使用参数 -v my-vol:/opt：将数据卷挂载（mount）到容器的/opt目录下。向这个路径写入的数据，会永久保存到这个数据卷中。


### docker-compose
多个容器共同协作：例如用一个容器运行web应用，一个容器运行mysql数据库。这样可以实现数据和应用的分离，方便管理和维护。当web容器宕机的时候，mysql容器不会受到影响，仍然正常运转。我们只需要修复web容器即可。

而docker-compose就是用来管理多个容器的工具。
#### docker-compose.yml
```yml
services:
  web:
    image: nginx
    ports:
      - "80:5000"
    depends_on:
      - mysql
  mysql:
    image: mysql
    environment:
      MYSQL_DATABASE: test
      MYSQL_ROOT_PASSWORD: pswd
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
  volumes:
    my-vol:
    /var/lib/mysql
```
#### 常用命令
启动所有容器：
```shell
$ docker-compose up -d
```
停止并删除所有容器：
```shell
$ docker-compose down
```
以上操作也可以用图形化界面进行。

### docker & kubernetes
一句话概括：docker是容器，kubernetes是容器编排工具。

k8s所做的就是把你的各个容器分发到一个集群（cluster）上运行，可以实现负载均衡、故障转移等。


#### docker hub
类似于github，是一个docker镜像的仓库，可以在上面找到各种各样的镜像，也可以上传自己的镜像。

### kubernetes
#### 基本概念
- node：节点，一个k8s集群由多个node组成，每个node都有自己的ip地址，可以是物理机或虚拟机。
- pod：最小的部署单元。每一个节点运行了若干个相互独立的pod。一个pod可以包含一个或多个容器，这些容器共享网络和存储资源。
- control plane：（中心计算机）控制平面，通过专有的API与各个节点进行通信，实时监控集群的状态，并作出相应的调整。
- replica set：副本集合。后台预先准备好的、随时待命的备用容器来替换掉出故障的容器。
- cluster：集群。以上所有的节点、pod、control plane、replica set等都组成了一个k8s集群。

#### 云服务商的集群/miniKube


#### deployment.yaml
类似于docker中的dockerfile，一个自动化脚本，里面定义了我们应用的基本信息，比如由哪些pod组成，每个pod里有哪些容器等等。

#### 服务
每个pod拥有一个外网不可见的ip地址，这样就无法通过ip地址访问到pod里的容器。所以我们需要一个**服务**来将外网的请求转发到pod里的容器。
##### nodeport
nodeport是一种服务类型，它会在每个node上开放一个端口，这样就可以通过node的ip地址和端口号访问到pod里的容器了。这是一个最原始的把pod暴露到外网的方法，但是不够灵活，因为每个node上的端口号都是固定的，如果我们想要修改端口号，就需要修改deployment.yaml文件，然后重新部署。

##### loadbalancer
loadbalancer是一种服务类型，它会在云服务商上创建一个负载均衡器，然后将请求转发到各个node上。这种方法比nodeport更加灵活，因为我们可以在云服务商的控制台上修改负载均衡器的配置，而不需要修改deployment.yaml文件。

##### ingress
ingress是一种服务类型，它会在集群内部创建一个负载均衡器，然后将请求转发到各个node上。这种方法比loadbalancer更加灵活，因为我们可以在集群内部修改负载均衡器的配置，而不需要修改deployment.yaml文件。

#### kubectl
kubectl是k8s的命令行工具，可以用来管理集群。所有平台都可以使用kubectl，包括云服务商的控制台和minicube模拟的k8s集群。
```shell
$ kubectl get nodes # 查看集群中的节点
$ kubectl get pods # 查看集群中的pod
$ kubectl get services # 查看集群中的服务
$ kubectl get deployments # 查看集群中的部署
$ kubectl get replicaset # 查看集群中的副本集合
$ kubectl get ingress # 查看集群中的负载均衡器
$ kubectl get all # 查看集群中的所有资源
$ kubectl describe pod/pod名 # 查看pod的详细信息
$ kubectl describe service/服务名 # 查看服务的详细信息
$ kubectl describe deployment/部署名 # 查看部署的详细信息
$ kubectl describe replicaset/副本集合名 # 查看副本集合的详细信息
$ kubectl describe ingress/负载均衡器名 # 查看负载均衡器的详细信息
$ kubectl describe node/节点名 # 查看节点的详细信息
$ kubectl apply -f deployment.yaml # 部署应用
$ kubectl delete -f deployment.yaml # 删除应用
```
#### 进一步学习
以上只是最基本的概念和命令，实际生产环境中更复杂的安全配置、网络管理、故障排除甚至是GPU调度等等都需要学习。下面是一些学习资源：
- [kubernetes官方文档](https://kubernetes.io/zh/docs/home/)
- [kubernetes中文指南](https://www.bookstack.cn/read/kubernetes-handbook/README.md)