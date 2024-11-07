---
title: 多核调度算法
categories: DragonOS
tags: 
  - 处理器调度
---
## 多级反馈队列 (MLFQ)
- 优先级高的任务先执行
- 优先级相同的任务按照时间片轮转（Round Robin）
- 新任务默认进入最高优先级队列
- 若任务再执行时配额用尽，则将其移动至下一级优先级队列。队列已用配额累计记录。
- 若任务在配额用尽前自愿放弃CPU，则保持在当前优先级队列
- 每隔一段时间，将所有任务移动至最高优先级队列
配额：任务在每个优先级队列中可以执行的时间片数量

## CFS (Completely Fair Scheduler)
"让系统里的多有进程尽可能公平地共享处理器"
- 为每个进程记录精确的运行时间
- 中断/异常发生后，切换到运行时间最少的进程执行
    - 下次中断/异常后，当前进程可能就不是运行时间最少的了
- Linux 的选择：通过红黑树实现
    - 键是进程的运行时间
    - 节点是进程
    - 左子树是运行时间更少的进程
    - 右子树是运行时间更多的进程
    - 根节点是运行时间最少的进程
- 优先级翻转
    - Linus："没法解决，CFS凑合用吧"

## IDLE

## 多处理器调度的挑战
既不能简单地分配线程到处理器，也不能简单地“谁空分给谁”
多处理器调度的两难境地：
- 迁移开销
- 不迁移可能导致负载不均衡

## 其他补充知识
lstopo - 查看系统拓扑结构
![alt text](image-5.png)
### 大小核（big.LITTLE）架构
- 一种异构多核处理器架构
- 由高性能核心（big）和低功耗核心（LITTLE）组成
- 旨在提供高性能和低功耗的平衡
- 例如，高性能核心用于运行计算密集型任务，低功耗核心用于运行轻量级任务

### NUMA（Non-Uniform Memory Access）
- 非一致性内存访问
- 一种多处理器系统架构
- 每个处理器核心连接到一个或多个内存控制器
- 每个内存控制器管理一部分内存
- 处理器核心访问本地内存的延迟比访问远程内存的延迟低
- NUMA 架构旨在减少内存访问延迟，提高系统性能

### SMP（Symmetric Multiprocessing）
- 对称多处理
- 一种多处理器系统架构
- 所有处理器核心共享同一内存
- 每个处理器核心可以访问所有内存区域
- SMP 架构旨在提高系统的整体性能和可伸缩性


## 实现跨核负载均衡
### Per-Entity Load Tracking（PELT）
- 类型：负载跟踪机制，不是独立的调度算法，但用于多核调度。
- 原理：PELT负责追踪每个任务的负载情况，以帮助调度器（如CFS）实现多核环境中的合理分配。通过指数衰减追踪任务负载，PELT为每个任务计算出一个负载因子。
- 特点：PELT使得调度器在多核系统中动态评估任务负载，并协助负载迁移，从而实现更合理的核心利用。
- 局限：PELT只是负载追踪的一部分，而不是独立的调度算法，它通常在CFS等多核调度算法中被用到。

参考：
- https://lwn.net/Articles/531853/
- https://code.dragonos.org.cn/xref/linux-6.6.21/kernel/sched/pelt.c
- https://mp.weixin.qq.com/s/pNZ9I88cjwIuErfP74RSHg

TODO:
- __update_load_avg_blocked_se
- __update_load_avg_cfs_rq: 此函数用于更新 cfs_rq 的负载平均值，是PELT和CFS交互的重要接口。PELT需要实现负载更新逻辑，并在该方法中应用指数衰减和滑动窗口计算。
- __update_load_avg_se
- enqueue_entity() / dequeue_entity()：这些函数在任务进入或退出CFS调度队列时调用。PELT需要在这些函数中重新计算 sched_entity 的负载，将新任务的负载纳入调度队列的总负载中。好像已经完成了？
### CPU调度性能测试工具/程序
GNU time
###  CFS 工作流程（结合PELT）
- 任务创建：初始化 sched_entity，并通过 init_entity_runnable_average() 初始化PELT负载数据。
- 任务入队：通过 enqueue_entity() 将任务插入 cfs_rq，并在 update_load_avg() 中更新PELT的负载信息。
- 任务调度：通过 pick_next_entity() 选择最合适的任务。PELT提供的负载数据保证了调度公平性。
- 调度周期更新：在每个调度周期结束时，task_tick_fair() 会更新任务和调度队列的负载数据。
- 任务休眠/唤醒：通过 dequeue_entity() 和 enqueue_entity() 处理任务的休眠和唤醒，PELT继续追踪任务负载。
- 负载均衡：在多核系统中，load_balance() 使用PELT负载数据实现跨核心负载均衡。
- 任务完成：任务退出时通过 dequeue_entity() 清除 sched_entity 并更新负载。


### 跨核负载均衡的关键工作流程
在Linux的CFS（Completely Fair Scheduler）中，跨核负载均衡的实现依赖于一系列关键函数。这些函数共同作用，在多核系统中对不同CPU核心上的任务进行监控、判断和迁移，从而实现动态、实时的负载均衡。Linux的跨核负载均衡功能主要通过调度器周期性地检查各核心的负载情况，并根据需要在核心之间迁移任务来达成。

以下是实现跨核负载均衡的几个关键函数：

1. `load_balance()`
- 作用：l`oad_balance()` 是整个跨核负载均衡过程的核心函数。它在调度器周期性触发的负载均衡活动中被调用，用于检查当前CPU的负载是否平衡，并在必要时将任务迁移到其他CPU。
- 工作原理：load_balance() 会遍历所有的调度队列（cfs_rq），查看各CPU上的负载情况，通过负载追踪（依赖PELT的 load_avg 值）来判断是否存在负载不均衡。一旦确定需要迁移任务，它会调用任务迁移相关函数来执行实际的负载均衡。
- 使用场景：该函数通常在某个CPU负载过高或过低时被调用，确保系统在运行过程中保持均衡的资源分配。
2. `find_busiest_group()`
- 作用：find_busiest_group() 是 load_balance() 的辅助函数，用于在负载均衡时找到负载最高的调度组（即CPU核心或CPU组），从而确定需要迁移任务的源CPU。
- 工作原理：该函数会遍历系统中的所有CPU组（如NUMA节点或逻辑CPU集群），计算每个组的总负载，并通过 load_avg 值来确定负载最高的组。它会根据负载和运行队列的信息，返回需要进行负载均衡的目标组。
- 使用场景：当某个CPU负载过高时，load_balance() 会调用 find_busiest_group() **找到适合迁移任务的高负载组**，从而缓解过载。
3. `find_busiest_queue()`
- 作用：find_busiest_queue() 是 find_busiest_group() 的辅助函数，用于**找到负载最高的调度队列（cfs_rq）或CPU**，从而进一步确定负载均衡的源队列。
- 工作原理：在找到负载最高的CPU组后，find_busiest_queue() 会在该组内的CPU之间比较每个CPU上的 cfs_rq 负载（通过 load_avg 值判断），并返回负载最高的队列。
- 使用场景：该函数在负载均衡的过程中用于精细化选择负载源，从而保证任务迁移的准确性。
4. `can_migrate_task()`
- 作用：can_migrate_task() 用于判断某个任务是否适合被迁移到另一个CPU核心上。
- 工作原理：该函数会检查任务的状态、CPU亲和性、调度策略等属性，确保只有符合迁移条件的任务才会被选中。对于某些高优先级或有特殊CPU亲和性的任务，can_migrate_task() 会阻止它们被迁移，以避免性能或响应时间的下降。
- 使用场景：在 load_balance() 中尝试迁移任务时，can_migrate_task() **被用于筛选可迁移的任务**，确保负载均衡过程中不影响系统稳定性或任务性能。
5. `move_queued_task()`
- 作用：move_queued_task() **负责将符合条件的任务从一个CPU的调度队列中移除，并加入到目标CPU的调度队列中，以完成实际的迁移操作**。
- 工作原理：该函数会对任务的调度实体（sched_entity）进行锁定，确保任务状态不发生冲突，然后将任务从源 cfs_rq 中移出，加入目标 cfs_rq。在PELT负载追踪的支持下，move_queued_task() 会更新任务的负载数据，以反映任务迁移后的负载变化。
- 使用场景：此函数在负载均衡的过程中被频繁调用，**用于在两个CPU核心之间执行任务的实际迁移**。
6. `update_sg_lb_stats()`
- 作用：update_sg_lb_stats() 用于**收集当前调度组的负载信息，并将这些信息用于负载均衡的决策**。
- 工作原理：该函数会遍历所有CPU的调度队列（cfs_rq），获取各个 cfs_rq 的负载和利用率数据。PELT的 load_avg 和 util_avg 值在这里被用作负载计算的主要依据，确保负载均衡决策基于实时数据。
- 使用场景：在 load_balance() 函数中用于初始化当前系统的负载统计数据，从而支持后续的负载均衡判断。
7. `rebalance_domains()`
- 作用：rebalance_domains() 是**跨核负载均衡的调度入口函数**，它**负责调用 load_balance() 和其他辅助函数**。
- 工作原理：该函数会遍历每个调度域（sched_domain），判断是否需要进行负载均衡。如果需要，它会调用 load_balance() 执行跨核负载均衡操作。rebalance_domains() **由调度器的定时器周期性触发，使得负载均衡成为一个周期性任务**。
- 使用场景：该函数是负载均衡的触发点，通常在定时器触发或特定事件发生时被调用。
8. `attach_entity_load_avg()` 和 `detach_entity_load_avg()`
- 作用：这些函数用于**在任务加入或移出调度队列时，更新调度实体（sched_entity）的负载数据。**
- 工作原理：
attach_entity_load_avg() 会将新任务的负载值加入到 cfs_rq 中，使目标CPU核心的调度队列负载信息得到更新。
detach_entity_load_avg() 则在任务迁出时将任务的负载数据从原调度队列中移除，防止原CPU核心的负载统计被错误计算。
- 使用场景：在任务迁移的过程中，attach_entity_load_avg() 和 detach_entity_load_avg() 确保源和目标 cfs_rq 的负载值实时更新，使得跨核负载均衡基于准确的负载数据。
#### 总结
跨核负载均衡的关键函数如下：
- rebalance_domains()：负载均衡的触发函数。
- load_balance()：负载均衡的主函数，负责平衡各核心负载。
- find_busiest_group()：找到负载最高的调度组。
- find_busiest_queue()：在调度组中找到负载最高的队列。
- can_migrate_task()：检查任务是否可迁移。
- move_queued_task()：执行任务的实际迁移。
- update_sg_lb_stats()：收集负载均衡的统计信息。
- attach_entity_load_avg() / detach_entity_load_avg()：更新任务迁移的负载数据。
这些函数在 PELT（负载追踪）的支持下，通过实时更新和统计各个CPU核心上的负载，使 CFS 调度器能够有效地实现多核系统中的跨核负载均衡。