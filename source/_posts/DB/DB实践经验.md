---
title: 数据库实践经验
tags: 
    - 数据库设计
    - 数据库实践
categories: 
    - 数据库
---
## 错误日志分析：
- aborted connection
    - https://www.cnblogs.com/chenjw-note/p/14362239.html
- got-an-error-reading-communication-packets
    - https://stackoverflow.com/questions/48951549/docker-and-mysql-got-an-error-reading-communication-packets
    - https://blog.csdn.net/KangKangShenShen/article/details/116208961
    - [「问题排查案例」MySQL报错Got an error reading communication packets问题分析指南](https://zhuanlan.zhihu.com/p/678658984)

## 数据库卡死
如果执行 `DELETE FROM test_table LIMIT 1` 也花费了很长时间没有反应，这表明表格可能非常大，或者存在其他问题导致删除操作非常缓慢。以下是一些建议和步骤，可以帮助你更有效地删除表格并释放空间：

1. 检查当前活动的查询
首先，检查数据库服务器上是否有其他活动的查询或锁定：
```sql
SHOW PROCESSLIST;
```

```
MySQL [springcloud]> SHOW PROCESSLIST;
+----+-----------------+----------------------+-------------+---------+--------+---------------------------------+------------------------------------------------------------------------------------------------------+
| Id | User            | Host                 | db          | Command | Time   | State                           | Info                                                                                                 |
+----+-----------------+----------------------+-------------+---------+--------+---------------------------------+------------------------------------------------------------------------------------------------------+
|  5 | event_scheduler | localhost            | NULL        | Daemon  | 228793 | Waiting on empty queue          | NULL                                                                                                 |
| 14 | root            | 192.168.77.132:36718 | springcloud | Query   |    657 | waiting for handler commit      | INSERT INTO test_table (id, name, age, address, video) VALUES (6056, 'name6056', 43, 'address6056',  |
| 15 | root            | 192.168.77.132:38266 | springcloud | Query   |    588 | Waiting for table metadata lock | CREATE INDEX idx_name ON test_table (name)                                                           |
| 16 | root            | 172.20.0.1:36926     | springcloud | Query   |      0 | init                            | SHOW PROCESSLIST                                                                                     |
+----+-----------------+----------------------+-------------+---------+--------+---------------------------------+------------------------------------------------------------------------------------------------------+
4 rows in set, 1 warning (0.002 sec)
```
从SHOW PROCESSLIST的输出可以看出，有两个查询正在等待完成：

Id 14：一个INSERT操作，状态为waiting for handler commit，已经运行了657秒。这个 INSERT 操作正在等待提交（commit）。通常，这意味着该操作已经完成了数据插入，但由于某种原因（例如事务未提交或等待其他事务完成），它还不能最终提交。
Id 15：一个CREATE INDEX操作，状态为Waiting for table metadata lock，已经运行了588秒。这个 CREATE INDEX 操作正在等待表的元数据锁。这通常发生在另一个事务正在修改表的结构或数据，导致当前操作无法获取必要的锁来创建索引。

2. 使用KILL命令终止长时间运行的查询
```sql
KILL <process_id>;
```

3. 使用 TRUNCATE TABLE
TRUNCATE TABLE 命令比 DELETE 命令更快，因为它不会逐行删除数据，而是直接重置表格。这可以显著加快删除数据的速度。
```sql
TRUNCATE TABLE test_table;
```
然后再执行 DROP TABLE 命令：DROP TABLE test_table;