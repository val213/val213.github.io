---
title: Redis
categories: 技术分享
tags: 中间件
---
[Redis 是什么？架构是怎么样的？](https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/redis/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/redis%E6%98%AF%E4%BB%80%E4%B9%88.html)
# Redis 基础认知
## redis 的数据类型
redis 支持五种数据类型：
- String 字符串
- Hash 哈希
- List 列表
- Set 集合
- Zset 有序集合

还有：
- HyperLogLog：基数统计
- Geo：地理位置
- Pub/Sub：发布订阅

还有 Redis Module：
- RedisBloom：布隆过滤器
- RedisSearch：全文搜索
- Redis-ML：机器学习
## Redis 和 Memcached 区别
### 共同点
- 基于内存的数据库，都当作缓存来使用
- 都有过期策略
- 两者的性能都非常高
### 不同
- Redis 支持更多的数据类型
- Redis 支持持久化，Memcached 不支持
- Redis 原生支持集群模式，Memcached 需要依赖客户端来实现往集群中分片写入数据
- Redis 支持发布订阅模型、Lua 脚本、事务等功能

## 为什么选择 Redis
- 高性能
- 高并发

## Redis 是单进程
Redis 是单进程的，这是 Redis 的特点之一。Redis 采用 IO 多路复用模型，通过监听多个文件描述符，来处理多个客户端的请求。Redis 通过非阻塞的 IO，来实现高并发。

但是 Redis 不是单线程的，Redis 在启动的时候，会启动后台进程(BIO)，用于执行一些耗时的操作，比如关闭文件，AOF 刷盘，释放内存等任务。

这三个任务都有各自的任务队列：
- BIO_CLOSE_FILE：
- BIO_AOF_FSYNC：
- BIO_LAZY_FREE：
对应的三个后台进程就像是消费者，不断地从队列中取出任务，执行任务。

## Redis 的回收策略

## Redis 的持久化机制是什么？优缺点？

## Redis 的主从复制模型

## Redis 常见性能问题和解决方案？

## Redis 过期键的删除策略？

## Redis 的同步机制

## Redis 集群

## Redis 哈希槽

## 缓存击穿

## 缓存预热

## 缓存数据的淘汰策略