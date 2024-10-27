---
title: "【DragonOS】DragonReach主线程优化"
categories: DragonOS
tags: DragonReach
---
issue: https://github.com/DragonOS-Community/DragonReach/issues/46
目前dragonreach是单线程逻辑，主循环中主要处理以下事务：
```rust
// 启动完服务后进入主循环
loop {
    // 检查各服务运行状态
    Manager::check_running_status();
    // 检查cmd进程状态
    Manager::check_cmd_proc();
    // 检查计时器任务
    TimerManager::check_timer_task();
    // 监听systemctl
    Systemctl::ctl_listen();
}
```
主线程逻辑会一直循环，但是真正执行任务的时间很短，导致大量的cpu资源浪费。
需求：用更优雅的方式去处理主循环：
- 阻塞读命令管道
- 子进程状态以及计时器任务可以使用信号等机制优化


针对以上需求，以下设计合理吗？
- 在主线程中使用多线程，阻塞读取命令管道，如此主线程就不是 IO 密集型，而是 CPU 密集型
- 用信号机制处理子进程状态以及计时器任务，减少一直遍历然后计算时间消耗的计算量
- 既然用信号机制处理了子进程状态和计时器任务，主线程中要使用多线程还是tokio协程呢？在这个场景中后者有什么好处吗？