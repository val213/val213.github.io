---
title: 【DragonOS】redis服务测试
categories: DragonOS
tag: redis
---
`redis-benchmark` 是一个非常有用的工具，可以帮助你测试 Redis 服务器的性能。然而，它并不是专门设计用于长时间稳定性测试的工具。`redis-benchmark` 更适合用于短时间内的高负载测试。如果你想测试 Redis 服务在 1000 QPS 下稳定运行 24 小时，建议使用更适合长时间测试的工具，如 `redis-benchmark` 配合脚本，或者使用其他负载测试工具如 `Apache JMeter` 或 `wrk`。

### 使用 `redis-benchmark` 和脚本进行长时间测试

你可以编写一个简单的脚本，循环调用 `redis-benchmark`，并记录每次测试的结果。以下是一个示例脚本：

```bash
#!/bin/bash

# 目标 QPS
TARGET_QPS=1000
# 测试持续时间（秒）
DURATION=$((24 * 60 * 60))
# redis-benchmark 参数
REDIS_BENCHMARK_CMD="redis-benchmark -t set,get -n $((TARGET_QPS * 60)) -c 50 -q"

# 开始时间
START_TIME=$(date +%s)

while [ $(($(date +%s) - START_TIME)) -lt $DURATION ]; do
    echo "Running redis-benchmark..."
    $REDIS_BENCHMARK_CMD
    if [ $? -ne 0 ]; then
        echo "redis-benchmark failed"
        exit 1
    fi
    sleep 1
done

echo "Test completed successfully"
```

### 使用 `Apache JMeter` 进行长时间测试

`Apache JMeter` 是一个功能强大的负载测试工具，可以用于长时间的稳定性测试。以下是使用 `JMeter` 进行 Redis 长时间测试的步骤：

1. **安装 JMeter**：
   ```bash
   sudo apt-get install jmeter
   ```

2. **配置 JMeter**：
   - 打开 JMeter GUI。
   - 添加一个线程组，设置线程数和持续时间。
   - 添加一个 Redis 连接配置。
   - 添加一个 Redis 请求采样器，配置要测试的命令（如 `SET` 和 `GET`）。
   - 添加一个监听器（如聚合报告）来记录测试结果。

3. **运行测试**：
   - 配置完成后，保存测试计划。
   - 使用命令行运行 JMeter 测试：
     ```bash
     jmeter -n -t your_test_plan.jmx -l test_results.jtl
     ```

### 使用 `wrk` 进行长时间测试

`wrk` 是一个现代 HTTP 基准测试工具，也可以用于 Redis 的长时间测试。以下是使用 `wrk` 进行 Redis 长时间测试的步骤：

1. **安装 wrk**：
   ```bash
   sudo apt-get install wrk
   ```

2. **编写 Lua 脚本**：
   创建一个 Lua 脚本来发送 Redis 命令：
   ```lua
   -- redis_test.lua
   request = function()
       return "SET key value\r\n"
   end
   ```

3. **运行 wrk 测试**：
   ```bash
   wrk -t12 -c400 -d24h -s redis_test.lua http://localhost:6379
   ```

通过这些方法，你可以测试 Redis 服务在 1000 QPS 下稳定运行 24 小时。选择合适的工具和方法，确保测试结果的准确性和可靠性。