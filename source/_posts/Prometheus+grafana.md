---
title: Prometheus+Grafana
---
此文档主要为ibm项目中使用到的监控工具Prometheus+Grafana的学习笔记。

- 参考文档
  - [Prometheus官方文档](https://prometheus.io/docs/introduction/overview/)
  - [Grafana官方文档](https://grafana.com/docs/grafana/latest/getting-started/getting-started-prometheus/)
  - https://blog.csdn.net/qq_31725371/article/details/114697770
  - https://zhuanlan.zhihu.com/p/321286313
# Prometheus+Grafana
## Prometheus
### What is Prometheus?
Prometheus 是一个开源的系统监控和告警工具集，最初是在 SoundCloud 开发的。自 2012 年推出以来，许多公司和组织都采用了 Prometheus，该项目拥有非常活跃的开发者和用户社区。目前，Prometheus 是一个独立的开源项目，由独立的组织维护。为了强调这一点，并澄清项目的治理结构，Prometheus 在 2016 年加入了 Cloud Native Computing Foundation，成为继 Kubernetes 之后的第二个托管项目。
### Features 特性
Prometheus's main features are:
- a multi-dimensional data model with time series data identified by metric name and key/value pairs
- 一种以度量名称和键/值对标识时间序列数据的多维数据模型。
- PromQL, a flexible query language to leverage this dimensionality
- PromQL 是一种灵活的查询语言，可充分利用这种多维性。
- no reliance on distributed storage; single server nodes are autonomous
- 不依赖分布式存储；单个服务器节点是自治的。
- time series collection happens via a pull model over HTTP
- 时间序列数据是通过HTTP的拉取模型收集的。
- pushing time series is supported via an intermediary gateway
- 通过中间网关可以实现对时间序列的推送。
- targets are discovered via service discovery or static configuration
- 目标是通过服务发现或静态配置来发现的。
- multiple modes of graphing and dashboarding support
- 支持多种图形化和仪表板模式。

### Components 组件
The Prometheus ecosystem consists of multiple components, many of which are optional:
Prometheus生态系统由多个组件组成，其中许多是可选的：

- the main Prometheus server which scrapes and stores time series data
- 主要的Prometheus服务器，用于采集和存储时间序列数据。
- client libraries for instrumenting application code
- 用于对应用程序代码进行监控的客户端库
- a push gateway for supporting short-lived jobs
- 支持短暂作业的推送网关
- special-purpose exporters for services like HAProxy, StatsD, Graphite, etc.
- 专门用于提供HAProxy、StatsD、Graphite等服务的出口商。
- an alertmanager to handle alerts
- 一个用于处理警报的 Alertmanager。
- various support tools 各种支持工具
- Most Prometheus components are written in Go, making them easy to build and deploy as static binaries.
- 大多数Prometheus组件都是用Go编写的，这使得它们可以作为静态二进制文件轻松构建和部署。
### When does it fit? 什么时候合适?

Prometheus works well for recording any purely numeric time series. It fits both machine-centric monitoring as well as monitoring of highly dynamic service-oriented architectures. In a world of microservices, its support for multi-dimensional data collection and querying is a particular strength.

Prometheus适用于记录任何纯数值时间序列数据。它既适用于以机器为中心的监控，也适用于高度动态的面向服务架构的监控。在微服务的世界中，它对多维数据收集和查询的支持是一个特别的优势。

Prometheus is designed for reliability, to be the system you go to during an outage to allow you to quickly diagnose problems. Each Prometheus server is standalone, not depending on network storage or other remote services. You can rely on it when other parts of your infrastructure are broken, and you do not need to setup extensive infrastructure to use it.

Prometheus 的设计目的是为了提高可靠性，在系统出现故障时，它可以帮助您快速诊断问题。每个 Prometheus 服务器都是独立的，不依赖于网络存储或其他远程服务。当您的基础设施的其他部分出现故障时，您可以依赖 Prometheus，而且不需要搭建复杂的基础设施来使用它。

### When does it not fit? 什么时候不合适?

Prometheus values reliability. You can always view what statistics are available about your system, even under failure conditions. If you need 100% accuracy, such as for per-request billing, Prometheus is not a good choice as the collected data will likely not be detailed and complete enough. In such a case you would be best off using some other system to collect and analyze the data for billing, and Prometheus for the rest of your monitoring.

Prometheus重视可靠性。即使在系统出现故障的情况下，您也可以随时查看可用的统计数据。如果您需要100%的准确性，例如用于按请求计费，那么Prometheus可能不是一个好的选择，因为收集到的数据可能不够详细和完整。在这种情况下，您最好使用其他系统来收集和分析计费数据，而使用Prometheus来监控系统的其余部分。

## Grafana