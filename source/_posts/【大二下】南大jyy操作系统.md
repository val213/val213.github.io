---
title: 【大二下】南大jyy操作系统
tag: 操作系统
categories: 
- 知识分享
- 技术分享
---
课程地址：
- 2023：https://jyywiki.cn/OS/2023/index.html
- 2022：https://jyywiki.cn/OS/2022/index.html
# 概述课
 `STFW/RTFM`: search the fucking web/read the fucking mannul
## 命令行工具
### `tmux`
终端复用工具，可以在一个终端窗口中打开多个终端，可以在后台运行，可以在不同终端窗口之间切换，可以在不同终端窗口之间复制粘贴。

主要区分session、Windows和pane的概念。
常用指令：
- `tmux new -s [sessionname]`
- `tmux attach -t [sessionname]`
- `ctrl+b`+其他指令（注意ctrl+b要先放开再按其他键）
    - `?`：列出所有的快捷键，按q返回 
    - `d`：detached当前的session，后台运行。 
    - `c`: 新增windows
    - `x`: 删除当前pane，关掉所有pane和windows后exit了整个session
    - `%`：垂直划分pane
    - `"`：水平划分pane
    - `Space (空格键)` ：对当前窗口下的所有窗格重新排列布局，每按一次，换一种样式。
    - `q`：显示pane的index
    - `s`：等价于`tmux ls`，显示所有的seesion
    - `z`：放大当前的pane，再用一次还原
    - `!`：单独拆分当前的pane
    - `数字`: 跳转对应index的windows
    - `o`： 依次切换当前窗口下的各个窗格。
    - `↑/↓/←/→`：移动光标到对应的pane
### 其他
- `fish`(我没用)：fish is a smart and user-friendly command line shell for Linux, macOS, and the rest of the family.
- `tldr`：too long, dont read.命令行工具的帮助文档，比`man`更简洁，更易读，更实用
- `strace`: 用于trace的工具
- `binutils`： 
- `qemu`:`sudo yum install qemu-kvm qemu-img -y`
- Python37：`centOS`下安装
### `gdb`（GNU Debugger），调试工具

## 作业和lab代码框架
仓库地址：`git clone https://github.com/NJU-ProjectN/os-workbench-2022`

>解决虚拟机无法克隆仓库（443：connected refused）
>1. 进入终端命令行模式，输入sudo vi /etc/hosts
>2. 英文输入法输入GG，vim编辑器跳到hosts文件的最后一行
>3. 用浏览器访问 IPAddress.com 使用 IP Lookup 工具获得github.com和github.global.ssl.fastly.net域名的ip地址
>4. 在vi打开的hosts文件中添加如下格式：

       192.30.253.112 github.com

       151.101.185.194 github.global.ssl.fastly.net
>5. esc退出编辑模式，输入：wq，保存hosts文件，修改hosts结束
>6. 更新DNS缓存，输入sudo /etc/init.d/networking restart
>7. 然后再用git clone， 亲测有效。

### M1：打印进程树
在`os-workbench-2022`目录下，运行`git pull origin M1`，获取M1的框架代码。

#### 前情提要
这个实验我们自己实现pstree的简单功能：进程树会以非常漂亮的格式排版 (每个进程的第一个孩子都与它处在同一行，之后的孩子保持相同的缩进)。可以先把玩一下这个命令。

先下载psmisc:`yum -y install psmisc`，psmisc是一个开源的Linux系统的进程管理软件包，它包含了一些用于显示和控制进程的工具，例如`fuser`, `killall`, `pstree`等。`psmisc`的全称是`Process Status Miscellaneous`，意思是杂项进程状态。psmisc可以帮助你查看进程树，杀死指定名称或端口的进程，显示进程的用户和信号等信息。

`everything is file.`Linux系统里也有专门存放系统进程文件的目录，就是`/proc`目录。`/proc`目录下的文件和目录都是虚拟的，它们的内容都是内核在运行时动态生成的。

>一个有趣的事情是，我在把玩的时候无意中执行了`cat proc/1/exe`，然后弹出了一屏幕的乱码，终端提示符也变成了乱码。
>
>这个命令的作用是打印出进程1（即init进程）的可执行文件的内容。但是，这个文件是一个二进制文件，它不是用人类可读的文本编码的，而是用机器指令编码的。因此，当你用cat命令打印它的时候，终端会尝试用文本编码来解释它，导致出现乱码。
>要解决这个问题，你可以用以下的方法：
>- 按下Ctrl+C或Ctrl+Z，中断cat命令的执行，恢复终端的正常状态。
>- 使用reset命令，重置终端的设置，清除乱码。
>- 使用hexdump或xxd等命令，以十六进制的格式打印二进制文件的内容，避免乱码。
>输入`reset`后终端清空并恢复正常了。


#### 问题分解：
- 解析命令行命令以及不同的选项
- 获取进程信息
- 构建树形结构
- 打印进程树
- 可移植性
##### 解析命令行命令以及不同的选项
- `getopt`函数，只能解析短选项，不能解析长选项
- `getopt_long`函数，可以解析短选项和长选项
- `getopt_long_only`函数，可以解析短选项和长选项，但是短选项必须是一个字符，长选项必须是多个字符
按照要求可以选用  `getopt_long（）`。
##### 获取进程信息
- `\proc\id\stat`此路径包含了我们需要的进程信息，包括进程名称、进程号pid和父进程号ppid

##### 构建树形结构
- `struct process`结构体
- 哈希表
- 栈实现深度优先搜索

##### 按照要求打印
- 版本信息`-v --version`
- 带进程号`-p --show-pids`
- 进程排序`-n --numeric-sort`

##### 可移植性——使用makefile编译32位和64位的可执行文件
- 如果项目目录结构没错的话，执行`make`会自动运行`Makefile`脚本编译32位和64位的可执行文件，最终终端执行的命令是：
```shell
gcc -m64 -O1 -std=gnu11 -ggdb -Wall -Werror -Wno-unused-result -Wno-unused-value -Wno-unused-variable ./pstree.c -o M1-64 
gcc -m32 -O1 -std=gnu11 -ggdb -Wall -Werror -Wno-unused-result -Wno-unused-value -Wno-unused-variable ./pstree.c -o M1-32 
```
得到`M1-32`和`M1-64`两个可执行文件
#### 其他问题
>和系统打交道的编程可有更多的麻烦之处：
>
>1. 你的程序遵守 POSIX 的返回值规定吗？如果你的 main 函数返回了非 0 的数值，我们将认为程序报告了错误——在非法的输入上返回 0，以及在合法的输入上返回非 0 都将导致 Wrong Answer。
>2. 程序够 roubust 吗？它会不会在一些非法的输入上 crash？如果系统里的进程很多呢？如果内存不够了呢？如果 open 或者 malloc 失败了呢？要知道，crash 一般是因为 undefined behavior (UB) 导致的——UB 没把所有的文件都删掉真是谢天谢地了。
>3. 万一我得到进程号以后，进去发现文件没了 (进程终止了)，怎么办？会不会有这种情况？万一有我的程序会不会 crash……？
>4. 进程的信息一直在变，文件的内容也一直在变 (两次 cat 的结果不同)。那我会不会读到不一致的信息(前一半是旧信息、新一半是新信息)？这两个问题都是 race condition 导致的；我们将会在并发部分回到这个话题。
>如果我不确信这些事会不会发生，我有没有写一个程序，至少在压力环境下测试一下它们有没有可能发生？嗯，如果我同时运行很多程序，每个程序都不断扫描目录、读取文件，也观察不到这个问题，至少应该可以放点心。
## L0：直接运行在硬件上的小游戏 (amgame)
在`os-workbench-2022`目录下，运行`git pull origin L0`，获取L0的框架代码。

### AbstractMachine: 抽象计算机
AbstractMachine 是裸机上的 C 语言运行环境，提供 5 组 (15 个) 主要 API，可以实现各类系统软件 (如操作系统)：

- (TRM) putch/halt - 最基础的计算、显示和停机
- (IOE) ioe_read/ioe_write - I/O 设备管理
- (CTE) ienabled/iset/yield/kcontext - 中断和异常
- (VME) protect/unprotect/map/ucontext - 虚存管理
- (MPE) cpu_count/cpu_current/atomic_xchg - 多处理器

#### 为 Bare-Metal 编程：编译、链接与加载
#### 实验要求
- 有肉眼可辨认的图形输出；
- 能使用键盘与游戏交互；
- 游戏使用的内存 (代码、静态数据总和不超过 1 MiB、堆区 heap 使用不超过 1 MiB)，因此你不必考虑复杂的图形；
- 按 ESC 键后调用 halt() 退出；除此之外游戏程序永不调用 halt() 结束，Game Over 后按键重新开始。
- 在可移植性/通用性上对你的代码做出一定的保证：
    - 兼容很简单的处理器：即小游戏运行中只调用 TRM 和 IOE API，而不使用其他 API，且——这样大家的游戏就可以在各个 CPU 上广为流传下去啦！
    - 你的游戏应当是可以在多个硬件体系结构之间移植的，考虑兼容以下情况：
      - 适配不同的屏幕大小。不同的体系结构中，屏幕大小可能是 $320\times 200$、$640 \times 480$、$800 \times 600$ 等，你的游戏最好能在所有分辨率下都获得不错的体验；
      - 同 minilabs 一样，你的程序可能运行在 32/64-bit 平台，因此你应当使用 intptr_t 或 uintptr_t 来保存指针数值；
兼容大/小端，因此禁止把不同大小的指针类型强制转换；
- 除非按 ESC 键，我们假设游戏程序不结束；如果检测到 halt() 的调用 (包括 assert 失败，我们可能会增加一些额外的合法性检查)，将判定为错 (Runtime Error 或 Wrong Answer)；
- 如果按 ESC 键后游戏不 halt()，将判定为错；
- 如果虚拟机或进程发生崩溃、非预期的重启等 (由 undefined behavior 导致，例如访问某非法内存可能导致异常或 CPU Reset)，则被判定为错；
- 其他违反 specifications 的问题，如在 ioe_init() 之前调用 io_read/io_write，将被判定为错。

#### 前置知识
**freestanding程序**与**hosted程序**相对应，hosted程序是一种依赖于操作系统和标准库的程序，它可以使用C语言的所有函数，宏，类型定义和对象，它的入口函数是main，它的终止方式是return或exit。hosted程序通常用于在操作系统之上的应用程序开发。
freestanding程序是一种不依赖于操作系统或标准库的程序，它只能使用C语言的基本类型和数值范围定义的头文件，如<float.h>，<limits.h>，<stdarg.h>，<stddef.h>等。freestanding程序的入口函数和终止方式都是由实现定义的，它通常用于裸机开发，比如操作系统内核，引导加载器，或者C库本身的开发。

#### qemu

## 第一周阅读材料
大概了解操作系统中`并发`、`持久化`和`虚拟化`三个大主题。这是本课程以及OSTEP的核心内容。
# 【并发】多线程
创建一个新线程就相当于是在栈空间里新增了一条独立的栈帧链。按照状态机模型来理解，create()就是新增了一个状态，join()就是将对应的进程进入等待循环，在状态机里等价于一个环。
## 多处理器编程：从入门到放弃 (线程库；现代处理器和宽松内存模型) 
### 语言特性补充
- volatile
volatile提醒编译器它后面所定义的变量随时都有可能改变，因此编译后的程序每次需要存储或读取这个变量的时候，告诉编译器对该变量不做优化，都会直接从变量内存地址中读取数据，从而可以提供对特殊地址的稳定访问。
如果没有volatile关键字，则编译器可能优化读取和存储，可能暂时使用寄存器中的值，如果这个变量由别的程序更新了的话，将出现不一致的现象。（简洁的说就是：volatile关键词影响编译器编译的结果，用volatile声明的变量表示该变量随时可能发生变化，与该变量有关的运算，不要进行编译优化，以免出错）
- `__thread`关键字
`__thread`是GCC的一个特色，它可以让变量成为线程局部存储，每个线程都有一份独立的变量，互不干扰。`__thread`的语法是`__thread`类型说明符 变量名，其中类型说明符可以是任何类型说明符，变量名可以是任何合法的变量名。`__thread`关键字可以用于全局变量、静态变量和局部静态变量，但不能用于函数参数、自动变量和局部非静态变量。`__thread`关键字可以用于多线程编程，它可以让变量成为线程局部存储，每个线程都有一份独立的变量，互不干扰。`__thread`关键字可以用于全局变量、静态变量和局部静态变量，但不能用于函数参数、自动变量和局部非静态变量。
- `__attribute__`关键字
__attribute__是GCC的一种特色，它允许用户指定函数属性、变量属性和类型属性。这些属性可以使编译器进行更好的优化，也可以使编译器发现代码中的错误。__attribute__的语法是__attribute__((attribute-list))，其中attribute-list是一个或多个以逗号分隔的属性。
  - https://gcc.gnu.org/onlinedocs/gcc/Attribute-Syntax.html
- `asm volatile ("" : : : "memory");`
这是一种内存屏障，它会阻止编译器对内存的优化，保证内存的可见性。这个语句告诉编译器，不要对这个语句进行优化，因为这个语句可能会对内存进行读写操作，所以编译器不要对这个语句进行优化，要保证内存的可见性。
- atomic_int
原子操作是指不会被线程调度机制打断的操作；这种操作一旦开始，就一直运行到结束，中间不会有任何切换。原子操作是线程安全的，因为它不会被线程调度机制打断，所以不会有多个线程同时执行这个操作。原子操作是并发编程中的重要概念，它可以保证多线程环境下的数据一致性。而`atomic_int`是C++11标准中的一个原子操作类型，它是一个整型的原子操作类型，可以保证对它的操作是原子的。
- 管道
`./a.out |head -n 100000|sort -nk 6|unic-c`
head：取前n行

unic-c：统计

sort -nk6：按第六列排序
### 多线程性质验证
#### 线程之间共享内存，线程有独立的堆栈

### 多线程程序
#### 原子性的丧失
阅读printf的手册，搜索\thread可以发现他是线程安全的，但是printf有缓存区，共享内存的情况下不会炸了吗？？

99% 的并发问题都可以用一个队列解决。把大任务切分成可以并行的小任务，**worker thread** 去锁保护的队列里取任务。除去不可并行的部分，剩下的部分可以获得线性的加速。

#### 顺序的丧失（编译优化的问题）
O1、O2编译优化的结果不同。
-O1: R[eax] = sum; R[eax] += N; sum = R[eax]
-O2: sum += N;

#### 可见性的丧失

##### 宽松内存模型（relaxed/weak memory model）
存在的目的是使得单处理器执行效率更高效
X86背负历史包袱，为了程序员能够写汇编代码
ARM/RISC-V
## 理解并发程序执行 (Peterson算法、模型检验与软件自动化工具) 
实现互斥的四条原则：
1. 任何两个进程不能同时处于临界区（critical region）
2. 不应对CPU的数量和速度做任何假设
3. 临界区外运行的进程不能阻塞其他进程
4. 进程不能无限期等待进入临界区
### 屏蔽中断
每个进程进入临界区后马上关闭中断和时钟中断。但是这样把屏蔽中断的权限交给用户进程是不明智的。而且多处理器中，屏蔽中断只能对本处理器有效，其他cpu还是可以运行。

### 锁变量
可能违背第一条原则。在锁变量尚为0的时候，两个进程先看到了锁变量为0，然后都把锁变量为1，同时进入了临界区。读和写的操作不是原子的，可能会出现这种情况。

### 严格轮换
可能违背第三条原则。
严格轮换是指进程按照一定的顺序进入临界区，这样就不会出现两个进程同时进入临界区的情况。但是严格轮换的缺点是，如果一个进程比另一个进程慢很多，那么就会出现一个进程一直在等待，而另一个进程一直在临界区操作的情况，这样就违背了第三条原则。

具体来说，在一个进程比另一个进程慢很多的时候，严格轮换有可能就会出现两个进程都在非临界区操作的时候，其中一个进程0很快完成了非临界区操作，但是另一个进程1还在忙于非临界区操作，不能转换turn为0，所以临界区外的进程1就阻塞了进程0进入临界区。

不断测试一个变量直到某个值出现，这种方法叫做忙等待。忙等待的缺点是浪费CPU资源。只有在临界区的时间很短的时候才适用。用于忙等待的锁称为自旋锁。

### peterson算法
实现正确的互斥协议。

现实例子：和舍友抢厕所。
- turn：轮到谁用厕所
- interested：谁想用厕所
课本上的代码示例：
```C++
# define FALSE 0
# define TRUE 1
# define N 2
int turn;
int interested[N];
void enter_region(int process)
{
    int other;
    other = 1 - process;
    interested[process] = TRUE;
    turn = process;
    while (turn == process && interested[other] == TRUE);
}
void leave_region(int process)
{
    interested[process] = FALSE;
}
```
想上厕所就举旗子（interested[N]），在厕所门上贴舍友的名字（turn），然后看看轮到谁了，如果轮到自己了，就进去，否则等待（`while(turn == process $$ interested[other]== True);` ），离开的时候把厕所门上的名字撕掉（`interested[process] = FALSE;`）。
### TSL
需要硬件支持的一种方案——TSL(test-and-set lock)： 一个原子指令，可以保证在多线程环境下，对共享变量的操作是原子的。在多线程环境下，可以用它来实现互斥。
```asm
TSL RX, lock
```
- 原子指令，硬件的实现是锁住了内存总线（不等同于屏蔽中断）。
- tsl与xchg（in inter-x86）类似，都是原子指令

### tips
Peterson算法和tsl或者xchg都有忙等待的缺点，他们的本质其实都是当一个进程想进入临界区的时候，如果不被允许，就会一直原地等待，这样会浪费CPU资源。而且可能会有优先级反转的问题。

#### 优先级反转
- 优先级反转是指一个低优先级的任务L先占用了一个高优先级任务H所需要的资源，导致即使调度了H从就绪状态执行，高优先级任务H也阻塞而无法执行的情况。
### 实现并发程序
画状态机图帮助理解。
### model checker
jyy的工具脚本。
## M2: 协程库libco
>Coroutines are computer program components that allow execution to be suspended and resumed, generalizing subroutines for cooperative multitasking. Coroutines are well-suited for implementing familiar program components such as cooperative tasks, exceptions, event loops, iterators, infinite lists and pipes.
>
>协同程序是允许暂停和恢复执行的计算机程序组件，它概括了用于协作多任务处理的子程序。协程非常适合实现熟悉的程序组件，如协作任务、异常、事件循环、迭代器、无限列表和管道。
>
>They have been described as "functions whose execution you can pause".
>
>它们被描述为“可以暂停执行的函数”。

在这个实验中，我们实现轻量级的用户态携谐协程 (coroutine，“协同程序”)，也称为 green threads、user-level threads，可以在一个不支持线程的操作系统上实现共享内存多任务并发。即我们希望实现 C 语言的 “函数”，它能够：

- 被 start() 调用，从头开始运行；
- 在运行到中途时，调用 yield() 被 “切换” 出去；
- 稍后有其他协程调用 yield() 后，选择一个先前被切换的协程继续执行。

实现协程库 co.h 中定义的 API：
```C++
struct co *co_start(const char *name, void (*func)(void *), void *arg);
void       co_yield();
void       co_wait(struct co *co);
```
协程库的使用和线程库非常类似：

- co_start(name, func, arg) 创建一个新的协程，并返回一个指向 struct co 的指针 (类似于 pthread_create)。
  - 新创建的协程从函数 func 开始执行，并传入参数 arg。新创建的协程不会立即执行，而是调用 co_start 的协程继续执行。
  - 使用协程的应用程序不需要知道 struct co 的具体定义，因此请把这个定义留在 co.c 中；框架代码中并没有限定 struct co 结构体的设计，所以你可以自由发挥。
  - co_start 返回的 struct co 指针需要分配内存。我们推荐使用 malloc() 分配。
- co_wait(co) 表示当前协程需要等待，直到 co 协程的执行完成才能继续执行 (类似于pthread_join)。
  - 在被等待的协程结束后、 co_wait() 返回前，co_start 分配的 struct co 需要被释放。如果你使用 malloc()，使用 free() 释放即可。
  - 因此，每个协程只能被 co_wait 一次 (使用协程库的程序应当保证除了初始协程外，其他协程都必须被 co_wait 恰好一次，否则会造成内存泄漏)。
- co_yield() 实现协程的切换。协程运行后一直在 CPU 上执行，直到 func 函数返回或调用 co_yield 使当前运行的协程暂时放弃执行。  
  - co_yield 时若系统中有多个可运行的协程时 (包括当前协程)，你应当随机选择下一个系统中可运行的协程。
- main 函数的执行也是一个协程，因此可以在 main 中调用 co_yield 或 co_wait。main 函数返回后，无论有多少协程，进程都将直接终止。

### 本地调试的tips
果你希望在本地运行时保留调试信息并且不想在提交到 Online Judge 时费力地删除散落在程序中的调试信息，你可以尝试用一个你本地的宏来控制输出的行为，例如
```C++
#ifdef LOCAL_MACHINE
  #define debug(...) printf(__VA_ARGS__)
#else
  #define debug()
#endif
```
这段本地宏定义是用来在 C 或 C++ 语言中实现调试打印的功能的。调试打印是一种在程序运行时输出一些信息，以便检查程序的状态或发现错误的方法。

这段代码的意思是：

如果定义了 LOCAL_MACHINE 这个宏，那么 debug(...) 就会被替换成 printf(__VA_ARGS__)，也就是一个标准的输出函数，可以接受任意数量的参数。
如果没有定义 LOCAL_MACHINE 这个宏，那么 debug(...) 就会被替换成一个空语句，也就是什么都不做。
这样做的好处是，可以在开发或测试时使用 debug(...) 来输出一些有用的信息，而在发布或部署时，只需要取消 LOCAL_MACHINE 的定义，就可以自动屏蔽掉所有的 debug(...)，从而不影响程序的性能或输出结果。

然后通过增加 -DLOCAL_MACHINE 的编译选项来实现输出控制——在 Online Judge 上，所有的调试输出都会消失。

### 共享库（或者共享对象）shared object(.so),（相当于windows中的动态链接库.dll）
共享库可以有自己的代码、数据，甚至可以调用其他共享库 (例如 libc, libpthread 等)。共享库中全局的符号将能被加载它的应用程序调用。共享库中不需要入口 (main 函数)。我们的 Makefile 里已经写明了如何编译共享库：

```shell
$(NAME)-64.so: $(DEPS) # 64bit shared library
    gcc -fPIC -shared -m64 $(CFLAGS) $(SRCS) -o $@ $(LDFLAGS)
```
其中 `-fPIC` `-fshared` 就代表编译成*位置无关代码*的共享库。除此之外，共享库和普通的二进制文件没有特别的区别。虽然这个文件有 +x 属性并且可以执行，但会立即得到 Segmentation Fault (可以试着用 gdb 调试它)。

### 编译相关
- I 选项代表 `include path`，使我们可以 `#include <co.h>`。你可以使用 gcc --verbose 编译看到编译器使用的 include paths。
- L 选项代表增加 `link search path`。例如可以先搜索当前的路径：$(pwd)
- l 选项代表链接某个库，链接时会自动加上 `lib` 的前缀，即 `-lco-64` 会依次在库函数的搜索路径中查找 `libco-64.so` 和 `libco-64.a`，直到找到为止。如果你将 libco-64.so 删除后用 strace 工具查看 gcc 运行时使用的系统调用，就能清晰地看到库函数解析的流程；

如果不设置 `LD_LIBRARY_PATH` 环境变量，你将会遇到 “error while loading shared libraries: libco-xx.so: cannot open shared object file: No such file or directory” 的错误。
### 前置知识
#### volatile register and non-volatile registers
CPU registers can be classified as volatile and non-volatile by calling convension, how does does the meaning of word volatile implies the classification?

>Volatile registers' content may change over a subroutine call.
易失性寄存器的内容可能在子例程调用中发生变化。

>A non-volatile register is a type of register with contents that must be preserved over subroutine calls. Whenever the value of a nonvolatile register is changed by the routine, the old value has to be saved on the stack prior to changing the register and that value has to be restored before returning. A register is similar to a variable, except that there is a fixed number of registers. Every register is a unique location in the CPU in which a single value is saved. A register is the one and only place where mathematical functions, such as addition, multiplication, subtraction, etc., can be carried out. Registers often hold pointers that refer to the memory. Moving values between memory and registers is a common phenomenon.
非易失性寄存器是一种寄存器类型，其内容必须在子例程调用中保存。每当例程更改了非易失性寄存器的值时，必须在更改寄存器之前将旧值保存在堆栈上，并且必须在返回之前恢复该值。寄存器类似于变量，不同之处在于寄存器的数量是固定的。每个寄存器在CPU中都是一个唯一的位置，其中保存一个值。寄存器是唯一可以执行诸如加、乘、减等数学函数的地方。寄存器通常保存指向内存的指针。在内存和寄存器之间移动值是一种常见的现象。
### 问题分析
- co_start 会在共享内存中创建一个新的状态机 (堆栈和寄存器也保存在共享内存中)，仅此而已。新状态机的 %rsp 寄存器应该指向它独立的堆栈，%rip 寄存器应该指向 co_start 传递的 func 参数。根据 32/64-bit，参数也应该被保存在正确的位置 (x86-64 参数在 %rdi 寄存器，而 x86 参数在堆栈中)。main 天然是个状态机，就对应了一个协程；
- co_yield 会将当前运行协程的寄存器保存到共享内存中，然后选择一个另一个协程，将寄存器加载到 CPU 上，就完成了 “状态机的切换”；
- co_wait 会等待状态机进入结束状态，即 func() 的返回。

换句话说，我们已经有答案了：co_yield 要做的就是把 yield 瞬间的 call preserved registers “封存” 下来 (其他寄存器按照 ABI 约定，co_yield 既然是函数，就可以随意摧毁)，然后执行堆栈 (rsp) 和执行流 (rip) 的切换.

因此，为了实现 co_yield，我们需要做的事情其实是：

1. 为每一个协程分配独立的堆栈；堆栈顶的指针由 %rsp 寄存器确定；
2. 在 co_yield 发生时，将寄存器保存到属于该协程的 struct co 中 (包括 %rsp)；
3. 切换到另一个协程执行，找到系统中的另一个协程，然后恢复它 struct co 中的寄存器现场 (包括 %rsp)。

#### setjmp/longjmp 实现寄存器现场的保存和恢复
使用 C 语言标准库中的 setjmp/longjmp 函数来实现寄存器现场的保存和恢复。

`setjmp` 将程序执行时的当前环境(程序状态)保存到一个平台特定的数据结构( jmp_buf )中，该数据结构可在以后的程序执行时由 `longjmp` 将 `setjmp` 保存的程序状态恢复到 `jmp_buf` 中。这个过程可以想象成是一个“跳转”回到 `setjmp` 保存环境的程序执行点。 `setjmp` 的返回值(表面)表明控制是正常到达该点(零)还是调用 `longjmp` (非零)。这就产生了一个常见的习语: `if( setjmp(x) ){/* handle longjmp(x) */}` 。

setjmp和longjmp不能用C语言直接实现，需要内联汇编指令。

简单的使用例子：
```C
#include <stdio.h>
#include <setjmp.h>

static jmp_buf buf;

void second() {
    printf("second\n");         // prints
    longjmp(buf, 1);            // jumps back to where setjmp was called - making setjmp now return 1
}

void first() {
    second();
    printf("first\n");          // does not print
}

int main() {
    if (!setjmp(buf))
        first();                // when executed, setjmp returned 0
    else                        // when longjmp jumps back, setjmp returns 1
        printf("main\n");       // prints

    return 0;
}
```

ps: POSIX.1没有指定 setjmp 和 longjmp 是否保存和恢复当前阻塞信号集;如果一个程序使用信号处理，它应该使用POSIX的 sigsetjmp / siglongjmp 。

#### 实现寄存器现现场切换

```
static inline void stack_switch_call(void *sp, void *entry, uintptr_t arg) {
  asm volatile (
#if __x86_64__
    "movq %0, %%rsp;
     movq %2, %%rdi; 
     jmp *%1"
      : : "b"((uintptr_t)sp), "d"(entry), "a"(arg) : "memory"
#else
    "movl %0, %%esp; movl %2, 4(%0); jmp *%1"
      : : "b"((uintptr_t)sp - 8), "d"(entry), "a"(arg) : "memory"
#endif
  );
}
```
>您好，这是必应。我很乐意为您解释以下代码。😊
>
>这段代码是一个**汇编语言**中的**函数调用**函数，用于在**栈上切换**不同的函数。它使用了**volatile**关键字，表示这些指令不会被优化器或内存管理器改变。它还使用了**条件编译**和**内联汇编**的技术，根据不同的平台（__x86_64__或__x86__）选择合适的寄存器和地址。
>
>这个函数的参数包括：
>- **sp**: 栈指针，指向当前执行函数的栈帧。
>- **entry**: 要调用的函数的入口地址。
>- **arg**: 要传递给调用函数的参数。
>
>这个函数的作用是在栈上创建一个新的栈帧，将入口地址和参数压入栈中，然后执行调用指令。当调用完成后，栈帧会被弹出，并恢复原来的栈指针和返回地址。
>
>我希望这能够帮助您理解这段代码。如果您有任何其他问题或想要了解更多关于汇编语言或函数调用的信息，请随时与我联系。😊
>
>源: 与必应的对话， 2/24/2024


每当 co_yield() 发生时，我们都会选择一个协程继续执行，此时必定为以下两种情况之一 (思考为什么)：

1. 选择的协程是新创建的，此时该协程还没有执行过任何代码，我们需要首先执行 stack_switch_call 切换堆栈，然后开始执行协程的代码；
2. 选择的协程是调用 yield() 切换出来的，此时该协程已经调用过 setjmp 保存寄存器现场，我们直接 longjmp 恢复寄存器现场即可。


#### 管理co_start 时分配的 struct co 结构体资源
因为 co_wait 执行的时候，有两种不同的可能性：
1. 此时协程已经结束 (func 返回)，这是完全可能的。此时，co_wait 应该直接回收资源。
2. 此时协程尚未结束，因此 co_wait 不能继续执行，必须调用 co_yield 切换到其他协程执行，直到协程结束后唤醒。

#### 调试
>但如果想要调试代码？gdb libco-test-64 同样也会遇到共享库查找失败的问题。大家可以在终端中使用 export 将当前 shell 进程的 LD_LIBRARY_PATH 设置好，这样就可以无障碍地运行 ./libco-test-64 了。

#### segmentation fault
#### valgrind
## 并发控制：互斥 (自旋锁、互斥锁和 futex)
### 前置概念
- 原子指令：不可分割的指令
- 自旋锁：在获取锁失败时，不断循环检查锁是否可用
- 互斥锁：在获取锁失败时，将线程挂起，直到锁可用
- futex：fast user space mutex，用户空间的快速互斥锁
- 临界区：一段代码，只能有一个线程进入
- 长临界区：临界区执行时间较长
- 短临界区：临界区执行时间较短
### 原子指令和自旋锁(Spin Lock)

实现互斥的根本困难：不能同时读/写共享内存
- `load` (环顾四周) 的时候不能写，只能 “看一眼就把眼睛闭上”，看到的东西马上就过时了
- `store` (改变物理世界状态) 的时候不能读，只能 “闭着眼睛动手”也不知道把什么改成了什么

解决问题的一个思路是从硬件上着手：*假设硬件能为我们提供一条 “瞬间完成” 的读 + 写指令*

请所有人闭上眼睛，看一眼 (load)，然后贴上标签 (store)。如果多人同时请求，硬件选出一个 “胜者”，“败者” 要等 “胜者” 完成后才能继续执行

那就是具有“时停”能力or“霸体”能力的原子指令啦~

`xchg`: 最小的load + store。交换两个变量的值。这个指令是为多处理器设计的，是原子的，不会被打断。

Atomic exchange (load + store)
```C++
int xchg(volatile int *addr, int newval) {
  int result;
  asm volatile ("lock xchg %0, %1"
    : "+m"(*addr), "=a"(result) : "1"(newval));
  return result;
}
```

#### 现实例子
一开始桌子上放有唯一的钥匙，每个人手中也有一张校卡。来的人会把自己手中的校卡跟桌子上的东西进行交换（或者说是覆盖）（不管是钥匙还是校卡），由于钥匙是唯一的，所以每次都只有拥有钥匙（或者说最开始可以看见钥匙）的那一个人可以进入，正确性不证自明。对应的也就是这段代码每次只能由一个线程进入。

#### 用 xchg 实现互斥
如何协调宿舍若干位同学上厕所问题？

在厕所门口放一个桌子table (共享变量),初始时，桌上是 🔑
##### 实现互斥的协议
想上厕所的同学 (一条 xchg 指令)
- 天黑请闭眼
- 看一眼桌子上有什么 (🔑 或 🔞)
- 把 🔞 放到桌上 (覆盖之前有的任何东西)
- 天亮请睁眼；看到 🔑 才可以进厕所哦
出厕所的同学把 🔑 放到桌上

#### 实现互斥
```C++
int table = YES;

void lock() {
retry:
  int got = xchg(&table, NOPE);
  if (got == NOPE)
    goto retry;
  assert(got == YES);
}

void unlock() {
  xchg(&table, YES)
}
```
```C++
int locked = 0;
void lock() { while (xchg(&locked, 1)) ; }
void unlock() { xchg(&locked, 0); }
```
需要做详尽的测试。

用原子指令可以把所有的并发进程排列出顺序，消灭了并行并且保证了可见性。保证之前的 store 都写入内存
，保证 load/store 不与原子指令乱序。

#### 原子指令的实现
原子指令的诞生：Bus Lock (80486)
- dual socket：两个处理器共享一块内存。socket：就是主板上插cpu的槽的数目，也即管理员说的”路“，一般做server chip说的dual-socket, 就是双路直连的芯片，主要是因为单芯片性能不够，而限于工艺尺寸又没办法放更多的资源在一颗芯片，所以需要多路。这样就可以把多个cpu的资源整合在一起，提高整体的性能。

#### Load-Reserved/Store-Condtitional(LR/SC)
归纳目前常见的原子指令（atomic test-and-set、lock xchg、lock add），他们的本质都是：**load + 处理器本地寄存器的运算 + store**

而RISC-V有另一种原子操作的设计：(LR/SC)

- LR: 在内存上标记 reserved (盯上你了)，中断、其他处理器写入都会导致标记消除。
- SC: 如果 “盯上” 未被解除，则写入

例如，如果同时有两个人对同一片内存进行了标记（load reserved），总有其中一方会在完成处理器本地寄存器的运算后，率先进行写入，此时另一方先前的标记就消失了，他就没法再直接写入了，需要重新标记再重做运算再写入。

除此之外，这个机制和之前的原子指令相比，还可以根据标记来检测锁的拥堵。
##### Campare and Swap (CAS)的LR/SC实现
```C++
int cas(int *addr, int cmp_val, int new_val) {
  int old_val = *addr;
  if (old_val == cmp_val) {
    *addr = new_val; return 0;
  } else { return 1; }
}
检查上一次获得的值是否还有效，如果有效则写入新值，否则返回失败。
```
汇编代码：
```
cas:
  lr.w  t0, (a0)       # Load original value.
  bne   t0, a1, fail   # Doesn’t match, so fail.
  sc.w  t0, a2, (a0)   # Try to update.
  bnez  t0, cas        # Retry if store-conditional failed.
  li a0, 0             # Set return to success.
  jr ra                # Return.
fail:
  li a0, 1             # Set return to failure.
  jr ra                # Return
```
#### cmpxchg（2023）
RTFM: https://www.felixcloutier.com/x86/cmpxchg
### 系统调用和互斥锁 (Mutex Lock)
#### 自旋锁的缺陷
- 性能问题 (0)（2022）
  - 自旋 (共享变量) 会触发处理器间的缓存同步，延迟增加
- 性能问题 (1)
  - 除了进入临界区的线程，其他处理器上的线程都在**空转**
  - 争抢锁的处理器越多，利用率越低
- 性能问题 (2)
  - 获得自旋锁的线程可能**被操作系统切换出去**
  - 操作系统不 “感知” 线程在做什么
  - 实现 100% 的资源浪费（唯一那个有教室钥匙的人在宿舍睡觉,别的人都在白等）
- Scalability: 性能的新维度
同一份计算任务，时间 (CPU cycles) 和空间 (mapped memory) 会随处理器数量的增长而变化。为了保证读取的值是正确的，共享的变量会在处理器的L1缓存之间来回传递，增大开销。
#### 自旋锁的使用场景
- 临界区几乎不 “拥堵”
- 持有自旋锁时禁止执行流切换
使用场景：操作系统内核的并发数据结构 (短临界区)

自旋锁可以说是实现多处理器互斥的唯一方法。在操作系统内核中是很难避免的。

- 操作系统可以*关闭中断和抢占*
  - 保证锁的持有者在很短的时间内可以释放锁（自旋锁的持有者不会被操作系统切换出去，所以自旋锁的持有者必须尽快释放锁，以免其他线程长时间等待。）
- 如果是虚拟机
  - PAUSE 指令会触发 VM Exit
- 但依旧很难做好
  - An analysis of Linux scalability to many cores (OSDI'10)
#### 实现线程 + 长临界区的互斥
>作业那么多，与其干等 Online Judge 发布，不如把自己 (CPU) 让给其他作业 (线程) 执行？

操作系统先用自旋锁保护临界区，然后再去看能不能得到锁，能得到的话系统调用直接返回；得不到锁的线程，选择不浪费CPU，切换为不可运行，然后切换到另一个线程去运行。

“让” 不是 C 语言代码可以做到的 (C 代码只能计算)。所以把锁的实现放到操作系统里就好啦！

`syscall(SYSCALL_lock, &lk);`
试图获得 lk，但如果失败，就切换到其他线程;

`syscall(SYSCALL_unlock, &lk);`
释放 lk，如果有等待锁的线程就唤醒

线程 + 长临界区的互斥的现实例子：

>操作系统 = 更衣室管理员
>
>先到的人 (线程)成功获得手环，进入游泳馆
>
>*lk = 🔒，系统调用直接返回
>
>后到的人 (线程)不能进入游泳馆，排队等待
>
>线程放入等待队列，执行线程切换 (yield)
>
>洗完澡出来的人 (线程)
>
>交还手环给管理员；管理员把手环再交给排队的人
>
>如果等待队列不空，从等待队列中取出一个线程允许执行
>
>如果等待队列为空，*lk = ✅
>
>管理员 (OS) 使用自旋锁确保有多个人同时进入的时候自己处理手环的过程是原子的，不会有并发问题。
### futex系统调用（2022）
Futex = Spin + Mutex

#### 关于互斥的一些分析（2022）
自旋锁 (线程直接共享 locked)

- 更快的 fast path
  - xchg 成功 → 立即进入临界区，开销很小
- 更慢的 slow path
  - xchg 失败 → 浪费 CPU 自旋等待，而且为了自旋还得关闭中断关闭抢占

互斥锁 (通过系统调用访问 locked)

- 更快的 slow path
  - 上锁失败线程不再占用 CPU
- 更慢的 fast path
  - 即便上锁成功也需要进出内核 (syscall)

>小孩子才做选择
- Fast path: 一条原子指令，上锁成功立即返回
- Slow path: 上锁失败，执行系统调用睡眠

POSIX线程库中的互斥锁（pthread_mutex），两种锁的好处都获得了。成功马上进临界区，失败就进入内核。
### 总结（2022）
#### Take-away message
- 软件不够，硬件来凑 (自旋锁)
- 用户不够，内核来凑 (互斥锁)
  - 找到你依赖的假设，并大胆地打破它
- Fast/slow paths: 性能优化的重要途径

## 并发控制：同步（信号量和条件变量，生产者和消费者，哲♂学家吃饭问题）
同步：协调多个线程的执行顺序，以避免竞争条件和死锁。两个或者两个以上的随时间变化的量在变化过程中保持一定的相对关系
### 生产者和消费者问题
99% 的实际并发问题都可以用生产者-消费者解决。

可以用生产者打印左括号，消费者打印右括号来模拟。
### 信号量和条件变量
Conditional Variables (条件变量, CV)。

#### 条件变量的API
- wait(cv,mutex)
  - 调用的时候必须保证**已经得到mutex**
  - **释放mutex**，进入睡眠状态
- signal/notify(cv)
  - 唤醒一个等待的线程
- broadcast/notifyAll(cv)
  - 唤醒所有等待cv的线程
#### 条件变量实现生产者消费者
- `count`：当前缓冲区中的产品数量
- `count == 0`：缓冲区为空，消费者睡眠
- `count == n`：缓冲区满，生产者睡眠

睡眠唤醒机制避免了自旋锁的浪费，但是需要更多的系统调用。
```C++
void Tproduce() {
  mutex_lock(&lk);
  if (count == n) cond_wait(&cv, &lk);
  printf("("); count++; cond_signal(&cv);
  mutex_unlock(&lk);
}

void Tconsume() {
  mutex_lock(&lk);
  if (count == 0) cond_wait(&cv, &lk);
  printf(")"); count--; cond_signal(&cv);
  mutex_unlock(&lk);
}
jyy上课的时候还进行了压力测试。
```
压力测试后介绍了隔离bug最小触发条件，然后通过分析得到了不能同类唤醒，否则会出现缓冲区溢出的问题。


唤醒失败时，可能导致两个进程都进入sleep，解决方法一是加上`唤醒等待位`，当进程接收到唤醒信号，但当前仍处于awake时，唤醒等待位置1，当下次收到sleep信号时，唤醒等待位置0，忽略此次sleep，但是每多一个进程都会多一个位，因此引出了信号量的机制。

#### 信号量

信号量可以用来解决睡眠唤醒机制sleep和wakeup的累计的问题。

信号量相当于是互斥锁的拓展，原本只有一把钥匙，现在有很多把钥匙，就变成了一个计数器。

信号量（Semaphore）是一个计数器，用于控制对公共资源的访问。它是一个非负整数（计数器），用于表示可以使用的资源的数量。信号量的值大于0表示可用资源的数量，小于0表示等待资源的线程数量。

信号量的操作包括两个原子操作：`P` 和 `V`。
- `P`（Proberen）：尝试获取资源，如果资源不可用，则等待。
- `V`（Verhogen）：释放资源，唤醒等待的线程。
- `P` 和 `V` 操作是原子的，不会被打断。
- `P` 操作会将信号量的值减一，如果值小于0，则线程会进入等待状态。
- `V` 操作会将信号量的值加一，如果有线程在等待，则唤醒一个线程。
- 信号量可以分为同步信号量或者互斥信号量。


还是用游泳池更衣室的例子。

从游泳馆出来，看到有人在等，不经过管理员直接把手环给等待的人，等待的人就可以进去了。如果没人在等，就把手环交给管理员。

>由于Dijisktra是荷兰人，他用的`P`和`V`其实是相当于荷兰语的“Probeer”和“Verhoog”，可以看作是“down”和“up”（分别是一般化后的sleep和wakeup）。
```C++
void producer() {
  P(&empty);   // P()返回 -> 得到手环
  printf("("); // 假设线程安全
  V(&fill);
}
void consumer() {
  P(&fill);
  printf(")");
  V(&empty);
}
```
```C++
DOWN(S):
  S.count = S.count - 1;//减少信号量的值
  if (S.count < 0) {
    //将当前线程加入等待队列
    block(S);
  }
UP(S):
  S.count = S.count + 1;//增加信号量的值
  if (S.count <= 0) {
    //唤醒等待队列中的一个线程
    wakeup(S);
  }
```


信号量可以用来实现互斥或者同步。（互斥信号量/同步信号量）

1. 信号量的物理含义
- S>0表示有S个资源可用
- S=0表示无资源可用
- S<0则|S|表示S等待队列中的进程个数
- P(S)表示申请一个资源，V(S)表示释放一个资源
- 信号量的初值应该大于等于0
2. P,V操作必须成对出现，有一个P操作就一定有一个V操作
- 当为互斥操作时，它们同处于同一进程；当为同步操作时，则不在同一进程中出现。
- 如果P(S1)和P(S2)两个操作在一起，那么P操作的顺序至关重要，一个同步P操作与一个互斥P操作在一起时同步P操作在互斥P操作前；而两个V操作的顺序无关紧要。


虽然看起来简单，但是主要是在 “一单位资源” 明确的问题上更好用，一些复杂的场景可能会有其他问题。信号量的控制分布在整个程序中，很难分析其正确性。


### （课本上也有的）哲♂学家吃饭问题
- 同时拿起左手的叉子——死锁。
- 同时拿起左手的叉子，然后发现右手的叉子被别人拿走了，于是放下左手的叉子，又一起继续等待叉子，陷入循环——饥饿。



失败的尝试（信号量）：
```C++
#include "thread.h"
#include "thread-sync.h"

#define N 3
sem_t locks[N];

void Tphilosopher(int id) {
  int lhs = (N + id - 1) % N;
  int rhs = id % N;
  while (1) {
    P(&locks[lhs]);
    printf("T%d Got %d\n", id, lhs + 1);
    P(&locks[rhs]);
    printf("T%d Got %d\n", id, rhs + 1);
    V(&locks[lhs]);
    V(&locks[rhs]);
  }
}

int main(int argc, char *argv[]) {
  for (int i = 0; i < N; i++) {
      SEM_INIT(&locks[i], 1);
  }
  for (int i = 0; i < N; i++) {
    create(Tphilosopher);
  }
}
```
失败的原因：

成功的万能解决方案（条件变量）：
对于任意一个哲学家，只有在左右两边的叉子都可用的时候才能拿起叉子。

先上一把互斥锁，然后判断左右两边的叉子是否可用，如果不可用就等待，如果可用就拿起叉子。在锁的保护下，把两个叉子都拿起来，然后吃饭，吃完后放下叉子，释放锁。
```C++
mutex_lock(&mutex);
while (!(avail[lhs] && avail[rhs])) {
  wait(&cv, &mutex);
}
avail[lhs] = avail[rhs] = false;
mutex_unlock(&mutex);

mutex_lock(&mutex);
avail[lhs] = avail[rhs] = true;
broadcast(&cv);
mutex_unlock(&mutex);
```
#### leader/follower模式
让一个人来集中管理叉子。
分布式系统中很常见的解决思路HDFS。
```C++
void Tphilosopher(int id) {
  send_request(id, EAT);
  P(allowed[id]); // waiter 会把叉子递给哲学家
  philosopher_eat();
  send_request(id, DONE);
}

void Twaiter() {
  while (1) {
    (id, status) = receive_request();
    if (status == EAT) { ... }
    if (status == DONE) { ... }
  }
}
```
管叉子的人一定不会是性能瓶颈，抛开 `workload`谈优化就是耍流氓.

吃饭的时间通常远远大于请求服务员的时间。

如果一个 `manager` 搞不定，可以分多个` (fast/slow path)`，多层服务员分发。

把系统设计好，使集中管理不成为瓶颈。
### （课本上的）读者写者问题(Readers and Writers)
- 读者写者问题：多个读者可以同时读，但是写者必须独占
### 管程monitor，消息传递，屏障（简单了解）
在并发编程中，管程（Monitor）、消息传递（Message Passing）和屏障（Barrier）是三种常见的同步机制或通信方式，它们在多线程和分布式系统中广泛应用，以确保数据的一致性和任务的协调执行。下面简单介绍一下这三种机制：

#### 管程（Monitor）
管程是一种同步构造，用于管理对共享资源的访问。它是由并发编程先驱Tony Hoare在1970年代提出的概念。一个管程包括一组定义在一个特定锁或互斥量（mutex）保护下的变量，以及在这个锁保护下可以执行的一组过程（函数或方法）。这意味着任何时候只有一个线程可以在管程内部执行某个过程，从而避免了并发访问共享资源时可能出现的数据不一致问题。管程通常提供了条件变量和相应的等待/通知机制（如wait和signal操作），以便在某些条件尚未满足时挂起线程，并在条件满足时唤醒线程。

#### 消息传递（Message Passing）
消息传递是一种在并发或分布式系统中的进程或线程之间进行通信的机制，它通过发送和接收消息来传递数据或通知。这种机制特别适用于分布式系统，其中的进程可能分布在不同的物理机器上。消息传递可以是同步的（发送方直到消息被接收方接收才继续执行）或者是异步的（发送方发送消息后立即继续执行，不等待接收方确认）。消息传递避免了共享内存的复杂性和潜在的竞态条件，但可能引入通信延迟和消息排序等问题。

#### 屏障（Barrier）
屏障是一种同步机制，用于多线程或多进程编程中，在执行后续操作前等待一组并行任务都达到某个点。屏障像是一个检查点，确保所有并行执行的任务都到达这个检查点后，才能继续执行后面的操作。这对于分步骤执行的并行算法非常有用，其中每个步骤的开始依赖于前一个步骤的完成。当最后一个线程到达屏障时，所有等待的线程将被释放并继续执行。

总的来说，这三种机制各有特点和适用场景，管程适用于管理对共享资源的同步访问，消息传递适用于进程或线程间的通信，而屏障适用于并行任务需要按步骤协同执行的情况。
### 课后习题（男女共浴问题）
假设一个大学为了卖弄其政治上的正确性，准备把美国最高法院的信条“平等但隔离其本身就是不平等”既运用在种族上也运用在性别上，从而结束校园内长期使用的浴室按性别隔离的做法。但是，为了迁就传统习惯，学校颁布法令：当有一个女生在浴室里，那么其他女生可以进入，但是男生不行，反之亦然。在每个浴室的门上有一个滑动指示符号，表示当前处于以下三种可能状态之一：{空、有女生、有男生}
用你偏好的程序设计语言编写下面过程（可以随意采用所希望的计数器和同步技术）：
- woman_wants_to_enter
- man_wants_to_enter
- woman_leaves
- man_leaves 
```C++
// 初始化信号量
int woman_in_use = 0; // 当前使用浴室的女性人数
int man_in_use = 0; // 当前使用浴室的男性人数
semaphore mutex = 1; // 互斥信号量，用于保护woman_in_use和man_in_use变量的访问
semaphore woman_allowed = 1; // 控制女性进入浴室的信号量
semaphore man_allowed = 1; // 控制男性进入浴室的信号量

void woman_wants_to_enter() {
    P(woman_allowed);
    P(mutex);
    if (woman_in_use == 0) {
        // 第一个进入的女性负责锁定男性的进入
        P(man_allowed);
    }
    woman_in_use++;
    V(mutex);
    V(woman_allowed);
}

void woman_leaves() {
    P(mutex);
    woman_in_use--;
    if (woman_in_use == 0) {
        // 最后一个离开的女性负责允许男性进入
        V(man_allowed);
    }
    V(mutex);
}

void man_wants_to_enter() {
    P(man_allowed);
    P(mutex);
    if (man_in_use == 0) {
        // 第一个进入的男性负责锁定女性的进入
        P(woman_allowed);
    }
    man_in_use++;
    V(mutex);
    V(man_allowed);
}

void man_leaves() {
    P(mutex);
    man_in_use--;
    if (man_in_use == 0) {
        // 最后一个离开的男性负责允许女性进入
        V(woman_allowed);
    }
    V(mutex);
}

```
### 总结
本次课回答的问题：

Q: 如何在多处理器上协同多个线程完成任务？
#### Take-away message
- 实现同步的方法
  - 条件变量、信号量；生产者-消费者问题
  - Job queue 可以实现几乎任何并行算法
不要 “自作聪明” 设计算法，小心求证

## 真实世界中的并发编程
并发编程的基本工具：线程库、互斥和同步
- 本次课回答的问题
Q: 什么样的任务是需要并行/并发的？它们应该如何实现？
- 本次课主要内容
  - 高性能计算中的并发编程
  - 数据中心里的并发编程
  - 我们身边的并发编程
## 并发bug
### 死锁
#### 死锁的类型
- AA：一把锁，一个进程，也可以发生死锁。就在操作系统内核代码里。spinlock本该在获取锁的时候屏蔽中断、释放锁之后打开中断。而如果**在获取锁的时候,中断被打开**，中断程序在进程获得锁的时候打开了，中断程序想要获得这把锁；而进程又要等中断程序返回才能释放这把锁，这样就会导致死锁。
- ABBA：更常见的十字路口型的死锁。两个进程，两把锁。两个进程分别获得一把锁，然后想要获得对方的锁，就会发生死锁。
#### 造成死锁的必要条件：
- 互斥：一个资源每次只能被一个进程使用
- 请求与保持：一个进程请求资阻塞时，不释放已获得的资源
- 不剥夺：进程已获得的资源不能强行剥夺
- 循环等待：若干进程之间形成头尾相接的循环等待资源关系
#### 避免死锁
##### AA-Deadlock
AA 型的死锁容易检测，及早报告，及早修复。
###### `spinlock-xv6.c` 中的各种防御性编程:
`if (holding(lk)) panic();`
```C
// Mutual exclusion spin locks.

#include "types.h"
#include "param.h"
#include "memlayout.h"
#include "spinlock.h"
#include "riscv.h"
#include "proc.h"
#include "defs.h"

void initlock(struct spinlock *lk, char *name)
{
  lk->name = name;
  lk->locked = 0;
  lk->cpu = 0;
}

// Acquire the lock.
// Loops (spins) until the lock is acquired.
void acquire(struct spinlock *lk)
{
  push_off(); // disable interrupts to avoid deadlock.
  if(holding(lk))
    panic("acquire");

  // On RISC-V, sync_lock_test_and_set turns into an atomic swap:
  //   a5 = 1
  //   s1 = &lk->locked
  //   amoswap.w.aq a5, a5, (s1)
  while(__sync_lock_test_and_set(&lk->locked, 1) != 0);

  // Tell the C compiler and the processor to not move loads or stores
  // past this point, to ensure that the critical section's memory
  // references happen strictly after the lock is acquired.
  // On RISC-V, this emits a fence instruction.
  __sync_synchronize();

  // Record info about lock acquisition for holding() and debugging.
  lk->cpu = mycpu();
}

// Release the lock.
void release(struct spinlock *lk)
{
  if(!holding(lk))
    panic("release");

  lk->cpu = 0;

  // Tell the C compiler and the CPU to not move loads or stores
  // past this point, to ensure that all the stores in the critical
  // section are visible to other CPUs before the lock is released,
  // and that loads in the critical section occur strictly before
  // the lock is released.
  // On RISC-V, this emits a fence instruction.
  __sync_synchronize();

  // Release the lock, equivalent to lk->locked = 0.
  // This code doesn't use a C assignment, since the C standard
  // implies that an assignment might be implemented with
  // multiple store instructions.
  // On RISC-V, sync_lock_release turns into an atomic swap:
  //   s1 = &lk->locked
  //   amoswap.w zero, zero, (s1)
  __sync_lock_release(&lk->locked);

  pop_off();
}

// Check whether this cpu is holding the lock.
// Interrupts must be off.
int holding(struct spinlock *lk)
{
  int r;
  r = (lk->locked && lk->cpu == mycpu());
  return r;
}

// push_off/pop_off are like intr_off()/intr_on() except that they are matched:
// it takes two pop_off()s to undo two push_off()s.  Also, if interrupts
// are initially off, then push_off, pop_off leaves them off.

void push_off(void)
{
  int old = intr_get();

  intr_off();
  if(mycpu()->noff == 0)
    mycpu()->intena = old;
  mycpu()->noff += 1;
}

void pop_off(void)
{
  struct cpu *c = mycpu();
  if(intr_get())
    panic("pop_off - interruptible");
  if(c->noff < 1)
    panic("pop_off");
  c->noff -= 1;
  if(c->noff == 0 && c->intena)
    intr_on();
}
```
##### ABBA-Deadlock
任意时刻系统中的锁都是有限的。**严格按照固定的顺序获得所有锁** (lock ordering; 消除 “循环等待”)。

###### 遇事不决可视化：`lock-ordering.py`
```python
class LockOrdering:
    locks = [ '', '', '' ]

    def tryacquire(self, lk):
        self.locks[lk], seen = '🔒', self.locks[lk]
        return seen == ''

    def release(self, lk):
        self.locks[lk] = ''

    @thread
    def t1(self):
        while True:
            while not self.tryacquire(0): pass
            while not self.tryacquire(1): pass
            while not self.tryacquire(2): pass
            self.release(0), self.release(1), self.release(2)

    @thread
    def t2(self):
        while True:
            while not self.tryacquire(1): pass
            while not self.tryacquire(2): pass
            self.release(1), self.release(2)

    @marker
    def mark_negative(self, state):
        pass
```
 
证明 T1:A→B→C; T2:B→C 是安全的。“在任意时刻总是有获得 “最靠后” 锁的可以继续执行”。
### 数据竞争
不使用锁的时候，也可能出现数据竞争的问题。而且无锁算法很难写对，结论是不如直接使用互斥锁来避免数据竞争。

如果只使用一把锁，绝对没有问题（串行）。

易出现的bug：
- 上错了锁。
- 忘记上锁。
### 其他并发bug
回顾我们实现并发控制的工具：

- 互斥锁 (lock/unlock) - 原子性
- 条件变量 (wait/signal) - 同步

- 忘记上锁——原子性违反 (Atomicity Violation, AV)

- 忘记同步——顺序违反 (Order Violation, OV)

> Empirical study: 在 105 个并发 bug 中 (non-deadlock/deadlock)

> MySQL (14/9), Apache (13/4), Mozilla (41/16), OpenOffice (6/2)
97% 的非死锁并发 bug 都是 AV 或 OV。


#### 原子性违反 (AV)
“ABA” 问题：

一个线程读取了一个值，然后另一个线程修改了这个值。第一个线程再次读取这个值，发现没有变化，但实际上这个值已经被修改了。

但是有时候上锁也不解决问题：

“TOCTTOU” - time of check to time of use.

>TOCTTOU vulnerabilities in UNIX-style file systems: An anatomical study (FAST'05)

#### 顺序违反 (OV)
“BA”：

没按预想的顺序来
### Lockdep: 运行时的死锁检查
Lockdep 规约 (Specification)

为每一个锁确定唯一的 “allocation site”

lock-site.c：
```C
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef struct lock {
  int locked;
  const char *site;
} lock_t;

#define STRINGIFY(s) #s
#define TOSTRING(s)  STRINGIFY(s)
#define LOCK_INIT() \
  ( (lock_t) { .locked = 0, .site = __FILE__ ":" TOSTRING(__LINE__), } )

lock_t lk1 = LOCK_INIT();
lock_t lk2 = LOCK_INIT();

void lock(lock_t *lk) {
  printf("LOCK   %s\n", lk->site);
}

void unlock(lock_t *lk) {
  printf("UNLOCK %s\n", lk->site);
}

struct some_object {
  lock_t lock;
  int data;
};

void object_init(struct some_object *obj) {
  obj->lock = LOCK_INIT();
}

int main() {
  lock(&lk1);
  lock(&lk2);
  unlock(&lk1);
  unlock(&lk2);

  struct some_object *obj = malloc(sizeof(struct some_object));
  assert(obj);
  object_init(obj);
  lock(&obj->lock);

  lock(&lk2);
  lock(&lk1);
}
```
assert: 同一个 `allocation site` 的锁存在全局唯一的上锁顺序
检查方法：printf 

记录所有观察到的上锁顺序，例如[x,y,z]⇒x→y,x→z,y→z。

相当于动态维护一个图，检查是否存在环或者其他不符合规定的顺序。

#### Lockdep 的实现

Since Linux Kernel 2.6.17, also in OpenHarmony!

例子：concurrent use after free

#### ThreadSanitizer: 运行时的数据竞争检查
为所有事件建立 `happens-before` 关系图

Program-order + release-acquire

对于发生在不同线程且至少有一个是写的 x,y 检查。

Time, clocks, and the ordering of events in a distributed system

#### 更多的检查：动态程序分析
上面这两个检查死锁和检查数据竞争的工具都属于动态程序分析的范畴。
##### 在事件发生时记录
- Lockdep: lock/unlock；
- ThreadSanitizer: 内存访问 + lock/unlock
##### 解析记录检查问题
- Lockdep: 
- ThreadSanitizer: 
##### 付出的代价和权衡：
- 程序执行变慢
- 但更容易找到 bug （因此在测试环境中常用）
#### 动态分析工具：Sanitizers
没用过 lint/sanitizers？
>- `-fsanitize=address`：检查内存访问错误
>- `-fsanitize=thread`：检查数据竞争
>- `-fsanitize=undefined`：检查未定义行为
>- `-fsanitize=memory`：检查未初始化读取
>- `-fsanitize=leak`：检查内存泄漏
>- `-fsanitize=pointer-compare`：检查指针比较
>- `-fsanitize=pointer-subtract`：检查指针减法
>- `-fsanitize=pointer-overflow`：检查指针溢出
>- `-fsanitize=shift`：检查位移操作
>- `-fsanitize=signed-integer-overflow`：检查有符号整数溢出
>- `-fsanitize=unsigned-integer-overflow`：检查无符号整数溢出
>- `-fsanitize=bounds`：检查数组越界
>- `-fsanitize=bounds-strict`：检查数组越界（严格模式）
>- ...

- `AddressSanitizer` (asan); (paper): 非法内存访问
  - Buffer (heap/stack/global) overflow, `use-after-free(非常危险)`, use-after-return, double-free, ...
  - Demo: uaf.c; kasan
- `ThreadSanitizer` (tsan): 数据竞争
  - Demo: fish.c, sum.c, peterson-barrier.c; ktsan
- `MemorySanitizer` (msan): 未初始化的读取
- `UBSanitizer` (ubsan): undefined behavior
  - Misaligned pointer, signed integer overflow, ...
  - Kernel 会带着 `-fwrapv` 编译

#### Buffer Overrun 检查
计算机系统中的 canary

“牺牲” 一些内存单元，来预警 memory error 的发生
```C
#define MAGIC 0x55555555
#define BOTTOM (STK_SZ / sizeof(u32) - 1)
struct stack { char data[STK_SZ]; };

void canary_init(struct stack *s) {
  u32 *ptr = (u32 *)s;
  for (int i = 0; i < CANARY_SZ; i++)
    ptr[BOTTOM - i] = ptr[i] = MAGIC;
}

void canary_check(struct stack *s) {
  u32 *ptr = (u32 *)s;
  for (int i = 0; i < CANARY_SZ; i++) {
    panic_on(ptr[BOTTOM - i] != MAGIC, "underflow");
    panic_on(ptr[i] != MAGIC, "overflow");
  }
}
```
不要把空间全部当成栈，在栈区前后设置canary，通过每隔一段时间检查canary的值，来检测栈是否溢出。

msvc 中 debug mode 的 guard/fence/canary：

未初始化栈: 0xcccccccc
未初始化堆: 0xcdcdcdcd
对象头尾: 0xfdfdfdfd
已回收内存: 0xdddddddd

`(b'\xcc' * 80).decode('gb2312')`输出为`烫`
#### 防御性编程：低配版 Lockdep
不必大费周章记录什么上锁顺序

统计当前的 spin count
如果超过某个明显不正常的数值 (1,000,000,000) 就报告
```C
int spin_cnt = 0;
while (xchg(&locked, 1)) {
  if (spin_cnt++ > SPIN_LIMIT) {
    printf("Too many spin @ %s:%d\n", __FILE__, __LINE__);
  }
}
```
#### 防御性编程：低配版 Sanitizer (L1)
内存分配要求：已分配内存 

thread-local allocation + 并发的 free 还蛮容易弄错的
### 总结
本次课回答的问题：

Q: 如何拯救人类不擅长的并发编程？
#### Take-away message
- 常见的并发 bug
  - 死锁、数据竞争、原子性/顺序违反
- 不要盲目相信自己：检查、检查、检查
  - 防御性编程：检查
  - 动态分析：打印 + 检查


## 操作系统的状态机模型 (操作系统的加载; thread-os 代码讲解) 
