---
title: google/LevelDB
categories: 技术分享
tags: 开源
---
# Intro
阅读和学习 LevelDB 源码是一项极具挑战性的任务，但也非常有意义。LevelDB 是 Google 开发的一款高效、轻量级的键值存储库，其核心基于 **LSM 树（Log-Structured Merge Tree）** 的设计。学习 LevelDB 源码的过程不仅有助于理解数据库底层存储的实现，还可以提高对系统设计和高性能编程的理解。

---
### **1. 理解 LevelDB 的基础概念**
在直接阅读源码前，先对 LevelDB 的核心原理有一个较深入的理解。包括：
1. **LSM 树**：LevelDB 的核心数据结构。
   - 数据分为内存（MemTable）和磁盘（SSTable）两层。
   - 数据写入先进入内存表，达到一定大小后转化为磁盘文件（SSTable）。
   - 磁盘文件会进行后台合并（Compaction）以优化查询性能。

2. **主要概念**：
   - **MemTable**：存储在内存中的数据，基于跳表（SkipList）实现。
   - **Immutable MemTable**：达到大小限制后，转化为只读内存表，等待刷入磁盘。
   - **SSTable**：存储在磁盘上的有序不可变文件，支持高效的范围查询。
   - **Write-Ahead Log (WAL)**：写操作的日志文件，用于数据恢复。
   - **Compaction**：将多层 SSTable 合并以减少碎片和优化读取。

3. **关键操作**：
   - **写入（Put）**：先写入 WAL，再写入 MemTable。
   - **读取（Get）**：从内存和磁盘查找键值。
   - **删除（Delete）**：以特殊标记表示删除，实际删除在 Compaction 中完成。

#### **推荐资源：**
- 阅读 LevelDB 的 [设计文档](https://github.com/google/leveldb/blob/main/doc/index.md)。
- 学习 LSM 树的基本理论（可以搜索论文或博客）。

---

### **2. 环境准备**
1. **源码获取**：
   克隆源码仓库：
   ```bash
   git clone https://github.com/google/leveldb.git
   cd leveldb
   ```
   
2. **工具准备**：
   - 熟悉 C++11，LevelDB 源码基于 C++ 编写。
   - 使用 IDE（如 CLion、VSCode）或者调试工具（如 GDB、LLDB）来阅读代码和调试。
   - 准备 Makefile 或 CMake 编译环境，可以轻松构建和运行测试用例。

3. **测试和验证**：
   - LevelDB 提供了丰富的测试，可以通过运行测试用例快速验证你的理解。
   ```bash
   make
   ./out-static/db_bench  # 性能基准测试
   ```

---

### **3. 代码结构和模块划分**
LevelDB 的源码结构非常清晰，模块化设计有助于逐步学习：

#### **主要代码目录**
```plaintext
.
├── db/               # LevelDB 的核心逻辑 (写、读、合并等)
├── table/            # SSTable 文件相关逻辑
├── util/             # 工具函数 (如缓存、CRC 校验、文件操作)
├── port/             # 平台兼容性代码
├── include/          # 公共头文件 (API 接口)
├── helpers/          # 辅助功能 (如性能分析工具)
├── doc/              # 文档和设计说明
└── tests/            # 测试用例
```

#### **核心模块**
1. **db/**
   - 负责主要的数据库操作，包括写入、读取、Compaction 等逻辑。
   - **关键文件**：
     - `db_impl.cc`：主入口，定义了数据库操作的实现。
     - `write_batch.cc`：批量写入的实现。
     - `log_writer.cc` 和 `log_reader.cc`：WAL 的实现。

2. **table/**
   - 负责 SSTable 文件的读写操作。
   - **关键文件**：
     - `block.cc`：实现了数据块的存储结构。
     - `table.cc`：实现了 SSTable 的接口，支持读取键值数据。

3. **util/**
   - 提供工具支持，包括缓存、文件操作和错误处理等。
   - **关键文件**：
     - `cache.cc`：实现了一个 LRU 缓存。
     - `env.cc`：封装了文件系统接口（如文件读写）。

4. **port/**
   - 封装了跨平台的兼容性代码（如线程、同步机制等）。

---

### **4. 学习顺序：从简单到复杂**
#### **Step 1: 理解接口**
从 `include/leveldb/db.h` 入手，这是 LevelDB 的对外 API：
- **DB 类：**
  - `Status Open(const Options& options, const std::string& name, DB** dbptr);`
  - `Status Put(const WriteOptions& options, const Slice& key, const Slice& value);`
  - `Status Get(const ReadOptions& options, const Slice& key, std::string* value);`
  - `Status Delete(const WriteOptions& options, const Slice& key);`

通过这些接口理解 LevelDB 提供的基本功能。

#### **Step 2: 跟踪写入过程**
1. 从 `DB::Put()` 入手，追踪写操作的流程：
   - WAL 写入（`log_writer`）
   - 写入 MemTable
   - 触发 Immutable MemTable 转换和 Compaction

2. 学习 `WriteBatch` 的实现，理解如何高效批量写入。

#### **Step 3: 跟踪读取过程**
从 `DB::Get()` 开始，逐步分析：
- 如何从 MemTable 查找。
- 如果数据不在内存中，如何从 SSTable 读取。

#### **Step 4: 学习 Compaction**
Compaction 是 LevelDB 的核心优化机制：
- 如何选择要合并的文件。
- 如何解决重叠键值的问题。
- 如何合并并生成新的 SSTable。

#### **Step 5: 理解文件格式**
深入研究 SSTable 的实现：
- **Block**：数据块的组织形式。
- **Index Block**：索引数据。
- **Filter Block**：布隆过滤器，用于快速排除不存在的键。

---

### **5. 常见的学习方法**
1. **搭配文档阅读**：
   - [LevelDB 的设计文档](https://github.com/google/leveldb/blob/main/doc/index.md) 是一个很好的起点，帮助理解整体设计思想。

2. **调试运行代码**：
   - 使用工具（如 GDB）调试典型的写入和读取操作，验证代码逻辑。

3. **阅读测试用例**：
   - 测试代码位于 `tests/` 和 `db/` 的测试文件中，能快速了解典型的调用方式。

4. **关注关键细节**：
   - 跳表（SkipList）的实现：位于 `util/skiplist.h`。
   - LRU 缓存的实现：位于 `util/cache.cc`。
   - CRC 校验：位于 `util/crc32c.cc`。

---

### **6. 练习建议**
1. **实现简单功能：**
   - 从头实现一个简化版本的 MemTable 或 SkipList，熟悉基础数据结构。
   
2. **修改 LevelDB：**
   - 增加自定义日志输出。
   - 优化 Compaction 策略。

3. **性能对比：**
   - 使用工具（如 `db_bench`）对 LevelDB 性能进行测试，观察不同配置的影响。

---

### **总结**
学习 LevelDB 源码需要清晰的规划，从基础概念到代码结构逐步深入。本文按照以下顺序：
1. 阅读设计文档，理解核心思想。
2. 从对外接口入手，逐步跟踪关键模块（如写入、读取、Compaction）。
3. 搭配调试工具运行代码，分析实现细节。
4. 实践修改，尝试实现或优化某些功能。
---
# leveldb 设计文档
https://github.com/google/leveldb/blob/main/doc/index.md

The leveldb library provides a persistent key value store. Keys and values are arbitrary byte arrays. The keys are ordered within the key value store according to a user-specified comparator function. / leveldb 库提供了一个持久的键值存储。键和值是任意字节数组。键在键值存储中根据用户指定的比较器函数进行排序。

## Open A Database
一个LevelDB数据库有一个与文件系统目录相对应的名称。全部 数据库中的内容存储在该目录中。下面的例子演示了如何打开一个数据库。
```cpp
#include <cassert>
#include "leveldb/db.h"

leveldb::DB* db;
leveldb::Options options;
options.create_if_missing = true;
// 如果想在数据库已经存在的情况下引发错误：
// options.error_if_exists = true;
leveldb::Status status = leveldb::DB::Open(options, "/tmp/testdb", &db);
assert(status.ok());
...
```
## status
你可能已经注意到了上面的 leveldb::Status 类型。这种类型的值通常是由 leveldb 中的大多数函数返回的，这些函数可能会遇到错误。你可以检查是否可以接受这样的结果，也可以打印与之相关的错误消息：
```cpp
leveldb::Status s = ...;
if (!s.ok()) cerr << s.ToString() << endl;
```

## Closing A Database
完成对数据库的操作后，只需要删除数据库对象即可。
```cpp
delete db;
```

## Read And Write
该数据库提供了 `Put`、`Delete` 和 `Get` 等方法来修改/查询数据库。例如，下面的代码将存储在 key1 下的值移动到 key2 下：
```cpp
std::string value;
leveldb::Status s = db->Get(leveldb::ReadOptions(), key1, &value);
if (s.ok()) s = db->Put(leveldb::WriteOptions(), key2, value);
if (s.ok()) s = db->Delete(leveldb::WriteOptions(), key1);
```
## Atomic Updates
需要注意的是，如果在将键2放入队列后，进程在删除键1之前终止，则同一值可能会被存储在多个键下。此类问题可以通过使用 WriteBatch 类来原子地应用一组更新来避免:
```cpp
#include "leveldb/write_batch.h"
...
std::string value;
leveldb::Status s = db->Get(leveldb::ReadOptions(), key1, &value);
if (s.ok()) {
  leveldb::WriteBatch batch;
  batch.Delete(key1);
  batch.Put(key2, value);
  s = db->Write(leveldb::WriteOptions(), &batch);
}
```
这个批处理操作包含一系列要对数据库进行的更改操作，这些操作将在批处理中按顺序执行。请注意，我们先执行了 Delete 操作，然后再执行 Put 操作，这样如果 key1 与 key2 相同，我们就不会错误地完全删除该值。

除了原子性的好处外， WriteBatch 还可以通过将大量单独的更改放入同一批中来加快批量更新的速度。

## Synchronous Writes 同步写
默认情况下，每次对 LevelDB 的写操作都是异步的：它在将写操作从进程推送到操作系统后就返回了。从操作系统内存到底层持久存储的传输是异步进行的。同步标志可以为特定的写操作打开，使写操作直到要写的数据被完全推送到持久存储后才返回。（在Posix系统中，可以通过在写操作返回之前调用 fsync(...) 、 fdatasync(...) 或 msync(..., MS_SYNC) 来实现此功能。）
```cpp
leveldb::WriteOptions write_options;
write_options.sync = true;
db->Put(write_options, ...);
```

异步写入通常比同步写入快1000倍以上。异步写入的缺点是，机器的崩溃可能会导致最近的更新丢失。需要注意的是，仅是写入进程（即不是重启）的崩溃不会造成任何损失，因为即使在 sync 为 false 的情况下，更新也会在被视为完成之前从进程内存推送到操作系统中。

异步写入通常是安全的。例如，当向数据库中大量加载数据时，可以在崩溃后重新启动批量加载来处理丢失的更新。也可以采用混合方案，每 N 次写入是同步的，在发生崩溃时，批量加载将在上一次同步写入完成后立即重新启动（同步写入可以更新一个描述在崩溃后从何处重新开始的标记）。

它提供了一种替代异步写入的方法。可以将多个更新放入同一个 WriteBatch 中，并使用同步写入（即 write_options.sync 设置为 true ）。同步写入的额外成本将在批量中的所有写入之间平均分摊。

## Concurrency
据库只能由一个进程同时打开。LevelDB实现从操作系统获取锁以防止误用。在同一个进程中，可以安全地在多个并发线程之间共享相同的 leveldb::DB 对象。也就是说，不同的线程可以同时写入或 fetch iterator 或调用Get方法访问同一个数据库，而无需外部同步（LevelDB实现会自动进行所需的同步）。然而，其他对象（如 Iterator 和 WriteBatch ）可能需要外部同步。如果两个线程共享此类对象，必须使用自己的锁协议保护对该对象的访问。有关更多详细信息，请参阅公开的头文件。

## Iteration
下面的例子演示如何打印数据库中的所有键值对。
```cpp
leveldb::Iterator* it = db->NewIterator(leveldb::ReadOptions());
for (it->SeekToFirst(); it->Valid(); it->Next()) {
  cout << it->key().ToString() << ": "  << it->value().ToString() << endl;
}
assert(it->status().ok());  // Check for any errors found during the scan
delete it;
```
下面的示例演示了如何处理 `[start,limit)` 范围内的所有键：
```cpp
for (it->Seek(start);
   it->Valid() && it->key().ToString() < limit;
   it->Next()) {
  ...
}
```
你也可以按照相反的顺序处理条目。（注意事项：反向遍历可能比正向遍历稍慢。）
```cpp
for (it->SeekToLast(); it->Valid(); it->Prev()) {
  ...
}
```
## Snapshots
快照可以提供对整个键值存储状态的一致只读视图。`ReadOptions::snapshot` 可能不为空，以指示读操作应在数据库状态的特定版本上运行。如果 `ReadOptions::snapshot` 为空，则读操作将在当前状态的隐式快照上运行。

快照是由  DB::GetSnapshot()  方法创建的：
```cpp
leveldb::ReadOptions options;
options.snapshot = db->GetSnapshot();
... apply some updates to db ...
leveldb::Iterator* iter = db->NewIterator(options);
... read using iter to view the state when the snapshot was created ...
delete iter;
db->ReleaseSnapshot(options.snapshot);
```
需要注意的是，当不再需要快照时，应该使用 `DB::ReleaseSnapshot` 接口将其释放。这样可以使实现摆脱仅用于支持该快照读取状态的额外状态。
## Slice
上述的 `it->key()` 和 `it->value()` 调用返回的是 `leveldb::Slice` 类型的实例。Slice 是一个简单的结构，它包含一个长度和指向外部字节数组的指针。返回一个 Slice 是比返回一个 `std::string` 更低成本的选择，因为我们不需要复制可能很大的键值。此外，LevelDB 方法不返回以空字符结尾的C风格字符串，因为LevelDB 键值允许包含 `'\0'` 字节。

C++ 字符串和 null 结尾的字符串可以很轻松地转换为 Slice：
```cpp
leveldb::Slice s1 = "hello";

std::string str("world");
leveldb::Slice s2 = str;
```
一个Slice对象可以很容易地转换回 C++ 字符串：
```cpp
std::string str = s1.ToString();
assert(str == std::string("hello"));
```
在使用切片时要小心，因为确保指向外部字节数组的切片指向的内存在使用期间存活的责任在于调用者。例如，下面的代码存在问题：
```cpp
leveldb::Slice slice;
if (...) {
  std::string str = ...;
  slice = str;
}
// 当 if 语句的作用域消失后，str 将被销毁，同时 slice 的底层存储也将消失。
Use(slice);
```

## Comparators
前面的例子使用了默认的按字节排序的键排序函数，可以按照字典序对字节进行排序。然而，在打开数据库时，您可以提供自定义比较器。例如，假设每个数据库键由两个数字组成，并且我们应该按第一个数字排序，在出现平局时按第二个数字排序。首先，**定义一个适当的 `leveldb::Comparator` 子类，以表达这些规则**：
```cpp
class TwoPartComparator : public leveldb::Comparator {
 public:
  // Three-way comparison function:
  //   if a < b: negative result
  //   if a > b: positive result
  //   else: zero result
  int Compare(const leveldb::Slice& a, const leveldb::Slice& b) const {
    int a1, a2, b1, b2;
    ParseKey(a, &a1, &a2);
    ParseKey(b, &b1, &b2);
    if (a1 < b1) return -1;
    if (a1 > b1) return +1;
    if (a2 < b2) return -1;
    if (a2 > b2) return +1;
    return 0;
  }

  // Ignore the following methods for now:
  const char* Name() const { return "TwoPartComparator"; }
  void FindShortestSeparator(std::string*, const leveldb::Slice&) const {}
  void FindShortSuccessor(std::string*) const {}
};
```
现在使用自定义比较器创建一个数据库：
```cpp
TwoPartComparator cmp;
leveldb::DB* db;
leveldb::Options options;
options.create_if_missing = true;
options.comparator = &cmp;
leveldb::Status status = leveldb::DB::Open(options, "/tmp/testdb", &db);
...
```

### Backwards compatibility
比较器的`Name`方法的返回值在创建数据库时被附加到数据库上，并在随后的每次数据库打开时进行检查。如果名称更改，则` leveldb::DB::Open ` 调用将失败。因此，只有在新的 KEY 格式和比较函数与现有数据库不兼容并且可以丢弃所有现有数据库的内容时才更改名称。
 
TODO()
## Performance

### Block Size

### Compression

### Cache

### Key Layout

### Filters

## Checksums

## Approximate Sizes

## Environment

## Poeting
--- 
# 从对外接口入手

