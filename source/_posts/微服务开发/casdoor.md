---
title: casdoor 使用实践
tags: 
    - 微服务开发
    - casdoor
categories: 
    - 技术分享
---
## 核心概念
- OAuth2.0
    - OAuth2.0是一个开放标准，允许用户授权第三方应用访问他们存储在另外的服务提供者上的信息，而不需要分享他们的凭证。
- Organization
- Application
- User
- Provider

## Application
### 登录url
如何在前端和后端代码中获取其他应用程序的URLs呢？ 您可以手动连接字符串，或者调用Casdoor SDKs提供的一些实用函数来获取URL。
- 手动连接字符串
- 前端SDK
- 后端SDK

## Provider
Casdoor是一个联合的单点登录系统，支持通过OIDC、OAuth和SAML的多个身份提供商。 Casdoor也可以通过电子邮件或短信向用户发送验证码或其他通知。 Casdoor 使用 Provider 的概念来管理所有这些第三方连接器。

## Casdoor是如何自我管理的？
首次运行Casdoor时，会创建一些内置对象以方便其管理：

- 一个内置的命名为 built-in 的组织。
- built-in 组织下用户名为 admin的用户 。
- 一个名为app-built-in的内置应用，由built-in组织管理，代表Casdoor本身。

## 数据库
Casdoor使用 XORM 与数据库进行交互。 基于 Xorm Drivers, 当前支持的数据库包括


## 开发模式
Casdoor的Go后端默认在8000端口运行。 您可以使用以下命令启动Go后端：
```go
go run main.go
```

Casdoor的前端是一个非常经典的Create-React-App (CRA)项目。 它默认在端口7001上运行。 使用以下命令来运行前端：
```shell
cd web
yarn install
yarn start
```

## 生产模式
```shell
go build
./casdoor
```

```
cd web
yarn build
```

## 使用 Docker 运行
纯 casdoor 镜像（不含mysql）地址 `https://hub.docker.com/r/casbin/casdoor`
将 app.conf 挂载到 /conf/app.conf，启动容器。
```shell
docker run \
 -p 8000:8000 \
 -v /folder/of/app.conf:/conf \
 casbin/casdoor:latest
```

有关配置文件示例：https://github.com/casdoor/casdoor/blob/master/conf/app.conf


## 使用 K8S Helm 运行
```shell
helm install casdoor oci://registry-1.docker.io/casbin/casdoor-helm-charts --version v1.702.0
```
通过 Kubernetes 集群提供的服务 URL 访问 Casdoor。


### 管理部署
```shell
helm upgrade casdoor casdoor/casdoor-helm-charts
```

```shell
helm delete casdoor
```


## 如何连接到 Casdoor
作为服务提供商(SP)，Casdoor 支持两项认证协议：
- OAuth 2.0 (OIDC)
- SAML
作为身份提供商 (Idp)，Casdoor 支持四项认证协议：
- OAuth 2.0
- OIDC
- SAML
- CAS 1.0, 2.0, 3.0
### OAuth 2.0 (OIDC)
OAuth 2是一个授权框架，它使得应用程序——如Facebook，GitHub和Casdoor——能够在HTTP服务上获得对用户账户的有限访问权限。 它的工作原理是将用户身份验证委托给托管用户帐户的服务，并授权第三方应用程序访问该用户帐户。 OAuth 2为网页和桌面应用程序，以及移动设备提供授权流程。
#### 标准 OIDC 客户端 OpenID Connect (OIDC)
OpenID Connect (OIDC) 是一个在OAuth 2.0 框架顶端运行的开放身份验证协议。 针对消费者，OIDC允许个人通过单点登录(SSO)访问使用OpenID提供商(OPs)的依赖方站点，如电子邮件提供商或社交网络平台，以验证其身份。 它向应用程序或服务提供用户信息、认证背景，并允许访问用户个人资料。
#### Casdoor SDKs
#### Casdoor插件

#### SAML
安全鉴别标记语言(SAML)是一种开放标准，允许身份提供者(IDP)将授权证书传给服务提供者。 这个术语的意思是，你可以使用一套凭证登录到许多不同的网站。 管理每个用户的一个登录要比管理电子邮件、客户关系管理（CRM）软件、活动目录等的单独登录要简单得多。

SAML交易使用可扩展标记语言(XML) 在标识提供者和服务提供者之间进行标准化通信。 SAML是用户身份认证和使用服务授权之间的链接。

#### CAS
中央认证服务（CAS）是网络的单点登录协议。 它的目的是允许用户在只提供一次凭证（如用户ID和密码）的情况下访问多个应用程序。 它还允许网络应用程序在不获取用户的安全凭证（如密码）的情况下对用户进行身份验证。


## 生成 Swagger 文档
casdoor修改了bee。
## 同步器
同步数据库中的用户信息。



## 微服务实践
把API网关单独作为一个服务，让它跟casdoor集成就行了，其他的服务不需要知道casdoor的存在