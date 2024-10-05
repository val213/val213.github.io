---
title: Rust语言进阶
categories: 知识分享
tags: Rust
---
# 闭包
在编程语言中，闭包（Closure）是一个重要的概念，它指的是一个函数或方法，它记住了创建时的环境，即使在其定义的作用域之外也能访问这些环境的变量。简单来说，闭包就是能够读取或修改另一个函数内的变量的函数。

在 Rust 语言中，闭包是一种可以捕获其环境中变量的匿名函数。Rust 中的闭包有三种类型，分别是：

1. `FnOnce`：这种类型的闭包可以被调用一次，并且可以获取（即获取所有权）其环境中的变量。
2. `FnMut`：这种类型的闭包可以被多次调用，并且可以可变地借用（即修改）其环境中的变量。
3. `Fn`：这种类型的闭包也可以被多次调用，但是它只能不可变地借用其环境中的变量。

闭包在 Rust 中非常有用，因为它们可以作为参数传递给其他函数，或者作为函数的返回值。这使得闭包在实现回调函数、事件处理器、迭代器和闭包表达式等方面非常有用。

闭包的语法结构通常如下：

```rust
|参数列表| 表达式
```

例如，一个简单的闭包可以这样定义：

```rust
let add_one = |x: i32| x + 1;
```

这个闭包接受一个 `i32` 类型的参数 `x`，并返回 `x + 1` 的结果。你可以像调用普通函数一样调用这个闭包：

```rust
let num = 5;
let result = add_one(num); // result 将会是 6
```

闭包可以捕获它们创建时环境中的变量，并且可以在这些变量的生命周期内使用它们：

```rust
let num = 10;
let add_num = |x: i32| x + num;

let result = add_num(5); // result 将会是 15
```

在这个例子中，闭包 `add_num` 捕获了变量 `num` 的值，并在调用时使用它。

在 Rust 中，**闭包是一种可以捕获其环境中变量的匿名函数**。闭包的实现和普通函数有一些关键的区别，主要体现在它们如何捕获和存储环境中的变量，以及它们如何被调用和传递。

闭包的实现
- 捕获环境：**闭包可以捕获定义它们的环境（即它们被创建的作用域）中的变量**。这些变量可以是不可变借用、可变借用或通过值借用（移动所有权）。

- 存储变量：**闭包内部会存储捕获的变量的副本，或者对这些变量的引用。这意味着闭包可以独立于其原始环境存在**。

- 类型推断：Rust 的编译器会自动为闭包推断类型，但你也可以显式指定闭包的类型。

- 泛型：闭包可以作为泛型类型，这意味着它们可以被用作泛型参数或返回值。

- 闭包与普通函数的区别
匿名性：闭包是匿名的，即它们没有名字，而普通函数必须有名字。

- 捕获环境：闭包可以捕获并存储定义它们的环境的变量，而普通函数不能直接访问它们定义之外的变量，除非通过参数传递。

- 调用方式：闭包可以像函数一样被调用，但它们也可以作为参数传递给其他函数，或者作为其他函数的返回值。

- 类型：闭包的类型是自动推断的，而普通函数的类型必须在定义时明确指定。

- 生命周期：闭包可以有它们自己的生命周期，这意味着它们可以比捕获的变量活得更久，只要它们不尝试访问已经失效的引用。

- 性能：由于闭包需要捕获环境，这可能会增加一些额外的内存开销。普通函数通常没有这种开销。
# 智能指针
智能指针往往都实现了 Deref 和 Drop 特征，这使得它们可以像普通引用一样被解引用，同时也可以在离开作用域时自动释放资源。
## Rust 中的堆栈
Rust 没有GC，所以我们需要手动管理内存。

**栈内存**从高地址向低地址增长，而且栈内存是连续分配的，一般来说操作系统对栈内存的大小都有限制，因此在 C 中，无法创建任意长度的数组。
Rust 中，main 线程的的栈大小是 8MB，普通线程的大小是 2MB。在函数调用的时候，会创建一个临时的栈空间，调用结束之后 Rust 会让这个栈空间里的对象自动进入 Drop 流程，最后栈顶指针自动移动到上一个调用栈顶，无需手动干预。所以栈内存的申请和释放时非常高效的。

与栈相反，**堆上内存**则是从低位地址向上增长，堆内存通常只受物理内存限制，而且通常是不连续的。
相比其它语言，Rust 堆上对象还有一个特殊之处，它们都拥有一个所有者，因此受所有权规则的限制：当赋值时，发生的是所有权的转移（只需浅拷贝栈上的引用或智能指针即可）
```rust
fn main() {
    let b = foo("world");
    println!("{}", b);
}

fn foo(x: &str) -> String {
    let a = "Hello, ".to_string() + x;
    a
}
```
在 foo 函数中，a 是 **String 类型**，它其实是一个**智能指针**结构体，**该智能指针存储在函数栈中，指向堆上的字符串数据**。当被从 foo 函数转移给 main 中的 b 变量时，**栈上的智能指针被复制一份赋予给 b，而底层数据无需发生改变，这样就完成了所有权从 foo 函数内部到 b 的转移**。
### 堆栈的性能
- 小型数据，在栈上的分配性能和读取性能都要比堆上高
- 中型数据，栈上分配性能高，但是读取性能和堆上并无区别，因为无法利用寄存器或 CPU 高速缓存，最终还是要经过一次内存寻址
- 大型数据，只建议在堆上分配和使用

不要仅仅因为堆上性能不如栈这个印象，就总是优先选择栈，导致代码更复杂的实现。
## Box
Box 是简单的封装，除了将值存储在堆上外，没有其他性能上的损耗。Box 相比其他智能指针，功能单一，使用场景有：
- 特意的将数据分配在堆上
- 数据较大时，又不想在转移所有权时进行数据拷贝
- 类型的大小在编译期无法确定，但是我们又需要固定大小的类型时
- 特征对象，用于说明对象实现了一个特征，而不是某个特定的类型

`Box` 背后是调用 `jemalloc` 来做内存管理，所以堆上的空间无需我们的手动管理。与此类似，带 GC 的语言中的对象也是借助于 Box 概念来实现的，一切皆对象 = 一切皆 Box， 只不过我们无需自己去 Box 罢了。
### 使用 Box<T> 将数据存储在堆上
```rust
fn main() {
    let a = Box::new(3);
    println!("a = {}", a); // a = 3

    // 下面一行代码将报错
    // let b = a + 1; // cannot add `{integer}` to `Box<{integer}>`
}
```
在表达式中，我们无法自动隐式地执行 Deref 解引用操作，你需要使用 * 操作符 let b = *a + 1，来显式的进行解引用
### 避免栈上数据的拷贝
当栈上数据转移所有权时，实际上是把数据拷贝了一份，最终新旧变量各自拥有不同的数据，因此所有权并未转移。

而堆上则不然，底层数据并不会被拷贝，转移所有权仅仅是复制一份栈中的指针，再将新的指针赋予新的变量，然后让拥有旧指针的变量失效，最终完成了所有权的转移：
### 将动态大小类型变为 Sized 固定大小类型
Rust 需要在编译时知道类型占用多少空间，如果一种类型在编译时无法知道具体的大小，那么被称为动态大小类型 DST 。

其中一种无法在编译时知道大小的类型是递归类型：在类型定义中又使用到了自身，或者说该类型的值的一部分可以是相同类型的其它值，这种值的嵌套理论上可以无限进行下去，所以 Rust 不知道递归类型需要多少空间：

只需要将 List 存储到堆上，然后使用一个智能指针指向它，即可完成从 DST 到 Sized 类型(固定大小类型)的华丽转变。
```rust
enum List {
    Cons(i32, List),
    // Cons(i32, Box<List>),
    Nil,
}
```
### 特征对象
在 Rust 中，想实现不同类型组成的数组只有两个办法：枚举和特征对象，前者限制较多，因此后者往往是最常用的解决办法。

以上代码将不同类型的 Button 和 Select 包装成 Draw 特征的特征对象，放入一个数组中，`Box<dyn Draw>` 就是特征对象。

其实，特征也是 DST 类型，而特征对象在做的就是将 DST 类型转换为固定大小类型。

### Box 内存布局
```rust
fn main() {
    let arr = vec![Box::new(1), Box::new(2)];
    // 使用 & 借用数组中的元素，否则会报所有权错误
    let (first, second) = (&arr[0], &arr[1]);
    // 表达式不能隐式的解引用，因此必须使用 ** 做两次解引用，第一次将 &Box<i32> 类型转成 Box<i32>，第二次将 Box<i32> 转成 i32
    let sum = **first + **second;
}
```
### Box::leak
Box 中还提供了一个非常有用的关联函数：Box::leak，它可以消费掉 Box 并且强制目标值从内存中泄漏。

可以把一个 String 类型，变成一个 'static 生命周期的 &str 类型。

知道真正具有 'static 生命周期的往往都是编译期就创建的值，例如 let v = "hello, world"，这里 v 是直接打包到二进制可执行文件中的，因此该字符串具有 'static 生命周期，再比如 const 常量。

**手动为变量标注 'static 啊。其实你标注的 'static 只是用来忽悠编译器的，但是超出作用域，一样被释放回收**。而使用 Box::leak 就可以将一个运行期的值转为 'static。

需要一个在运行期初始化的值，但是要让他全局有效，也就是和整个程序活得一样久，那么就可以使用  `Box::leak`，例如有一个存储配置的结构体实例，它是在运行期动态插入内容，那么就可以将其转为全局有效，虽然 Rc/Arc 也可以实现此功能，但是 Box::leak 是性能最高的。
# 多线程并发编程
## 编程语言的并发模型
- 直接调用操作系统创建线程API的语言，程序中的线程和操作系统的线程是一一对应的，这种模型称为 1:1 线程模型。例如，C++ ,Java 和 Rust 语言就是采用了 1:1 线程模型。
- 在语言内部实现自己的线程模型（例如绿色线程，协程），程序内部的M个线程映射到N个操作系统线程，这种模型称为 M:N 线程模型。例如，Go 语言就是采用了 M:N 线程模型。
- 还有一种 Actor 模型，基于消息传递的并发模型，例如 Erlang 语言。

>运行时是那些**会被打包到所有程序可执行文件**中的 Rust 代码，根据每个语言的设计权衡，运行时虽然有大有小（**例如 Go 语言由于实现了协程和 GC，运行时相对就会更大一些**），但是除了汇编之外，每个语言都拥有它。**小运行时的其中一个好处在于最终编译出的可执行文件会相对较小**，同时也让该语言更容易被其它语言引入使用。

考虑到系统级使用场景和性能，Rust 的设计希望让运行时尽可能小，所以 Rust 语言的标准库中并没有提供线程的实现，而是由操作系统提供线程的支持。

而绿色线程/协程的实现会显著增大运行时的大小，因此 Rust 只在标准库中提供了 1:1 的线程模型，如果你愿意牺牲一些性能来换取更精确的线程控制以及更小的线程上下文切换成本，那么可以选择 Rust 中的 M:N 模型，这些模型由三方库提供了实现，例如大名鼎鼎的 tokio。

## 多线程编程的主要问题
由于多线程的代码是同时运行的，因此我们无法保证线程间的执行顺序，这会导致一些问题，例如：
- 竞态条件(race conditions)，多个线程以非一致性的顺序同时访问数据资源
- 死锁(deadlocks)，两个线程都想使用某个资源，但是又都在等待对方释放资源后才能使用，结果最终都无法继续执行
- 一些因为多线程导致的很隐晦的 BUG，难以复现和解决

虽然 Rust 已经通过各种机制减少了上述情况的发生，但是依然无法完全避免上述情况。

## 创建线程/等待子线程的结束
Rust 通过标准库提供了 thread 模块来支持多线程编程，你可以使用 thread::spawn 函数来创建一个新的线程，然后使用 join 方法来等待线程的结束。

```rust
use std::thread;
use std::time::Duration;

fn main() {
    // 创建一个新线程
    let handle = thread::spawn(|| {
        for i in 1..5 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    // 等待子线程结束
    handle.join().unwrap();

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```
## 在线程闭包中使用 move
move 关键字在闭包中的使用可以**让该闭包拿走环境中某个值的所有权**，同样地，你可以使用 move 来**将所有权从一个线程转移到另外一个线程**。

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();

    // 下面代码会报错borrow of moved value: `v`
    // println!("{:?}",v);
}
```
## 线程的结束
在系统编程中，操作系统提供了直接杀死线程的接口，简单粗暴，但是 Rust 并没有提供这样的接口，原因在于，**粗暴地终止一个线程可能会导致资源没有释放、状态混乱等不可预期的结果**，一向以安全自称的 Rust，自然不会砸自己的饭碗。

Rust 中线程是如何结束的呢？答案很简单：线程的代码执行完，线程就会自动结束。但是如果线程中的代码不会执行完呢？那么情况可以分为两种进行讨论：

1. 线程的任务是一个循环 IO 读取，任务流程类似：IO 阻塞，等待读取新的数据 -> 读到数据，处理完成 -> 继续阻塞等待 ··· -> 收到 socket 关闭的信号 -> 结束线程，在此过程中，绝大部分时间线程都处于阻塞的状态，因此虽然看上去是循环，CPU 占用其实很小，也是网络服务中最最常见的模型

2. 线程的任务是一个循环，里面没有任何阻塞，包括休眠这种操作也没有，此时 CPU 很不幸的会被跑满，而且你如果没有设置终止条件，该线程将持续跑满一个 CPU 核心，并且不会被终止，直到 main 线程的结束。

？对于第一种情况，Rust 语言提供了一种简单的解决方案：**使用 Result 类型来处理线程的返回值**，这样可以在线程结束时返回一个 Result 类型的值，然后在主线程中使用 join 方法来获取这个值。

？对于第二种情况，Rust 语言并没有提供直接终止线程的方法，但是你可以通过设置一个标志位来控制线程的结束，例如：

```rust
use std::thread;
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};

fn main() {
    let running = Arc::new(AtomicBool::new(true));
    let r = running.clone();

    let handle = thread::spawn(move || {
        while r.load(Ordering::Relaxed) {
            // do something
        }
    });

    // 等待一段时间
    thread::sleep(std::time::Duration::from_secs(1));

    // 设置标志位，结束线程
    running.store(false, Ordering::Relaxed);
    handle.join().unwrap();
}
```
## 多线程的性能
### 创建线程的开销
据不精确估算，创建一个线程大概需要 0.24 毫秒，随着线程的变多，这个值会变得更大，因此线程的创建耗时是不可忽略的，只有当真的需要处理一个值得用线程去处理的任务时，才使用线程，一些鸡毛蒜皮的任务，就无需创建线程了。

### 创建线程的数量
因为 CPU 的核心数限制，当任务是 CPU 密集型时，就算线程数超过了 CPU 核心数，也并不能帮你获得更好的性能，因为每个线程的任务都可以轻松让 CPU 的某个核心跑满，既然如此，让线程数等于 CPU 核心数是最好的。

但是**当你的任务大部分时间都处于阻塞状态时，就可以考虑增多线程数量**，这样当某个线程处于阻塞状态时，会被切走，进而运行其它的线程，**典型就是网络 IO 操作**，我们可以为每一个进来的用户连接创建一个线程去处理，该连接绝大部分时间都是处于 IO 读取阻塞状态，因此有限的 CPU 核心完全可以处理成百上千的用户连接线程，**但是事实上，对于这种网络 IO 情况，一般都不再使用多线程的方式**了，毕竟操作系统的线程数是有限的，意味着**并发数也很容易达到上限，而且过多的线程也会导致线程上下文切换的代价过大**，使用 async/await 的 M:N 并发模型，就没有这个烦恼。

？因为 async/await 是基于事件循环的，一个线程可以处理成百上千的并发连接，而不会有线程上下文切换的开销。
### 多线程的开销
CAS：Compare And Swap，比较并交换，是一种原子操作，用于实现多线程的同步机制，Rust 中的 Atomic 类型就是基于 CAS 实现的。

举一个无锁实现(CAS)的 Hashmap 在多线程下的使用的例子，发现当线程数增多时，性能并没有线性增长，反而在到达16之后下降了，这是为什么呢？

- 虽然是无锁，但是内部是 CAS 实现，大量线程的同时访问，会让 CAS 重试次数大幅增加
- 线程过多时，CPU 缓存的命中率会显著下降，同时多个线程竞争一个 CPU Cache-line 的情况也会经常发生
- 大量读写可能会让内存带宽也成为瓶颈
- 读和写不一样，无锁数据结构的读往往可以很好地线性增长，但是写不行，因为写竞争太大

总之，多线程的开销往往是在锁、数据竞争、缓存失效上，这些限制了现代化软件系统随着 CPU 核心的增多性能也线性增加的野心。

## 线程屏障 Barrier
```rust
use std::sync::{Arc, Barrier};
use std::thread;

fn main() {
    let mut handles = Vec::with_capacity(6);
    let barrier = Arc::new(Barrier::new(6));

    for _ in 0..6 {
        let b = barrier.clone();
        handles.push(thread::spawn(move|| {
            println!("before wait");
            b.wait();
            println!("after wait");
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

## 线程局部变量（Thread-Local Variable）
### 标准库 thread_local! 宏
可以使用 thread_local! 宏来定义一个线程局部变量，然后在线程内部用变量的 with 方法来获取变量值。

### 三方库 thread_local
除了标准库外，一位大神还开发了 thread-local 库，它允许每个线程持有值的独立拷贝。该库不仅仅使用了值的拷贝，而且还能自动把多个拷贝汇总到一个迭代器中，最后进行求和。

## 用条件控制线程的挂起和执行

## 只被调用一次的函数
```rust
static INIT: Once = Once::new();
```
```rust
let handle1 = thread::spawn(move || {
        INIT.call_once(|| {
            unsafe {
                VAL = 1;
            }
        });
    });
```
call_once 执行初始化过程一次，并且只执行一次。

如果当前有另一个初始化过程正在运行，线程将阻止该方法被调用。

当这个函数返回时，保证一些初始化已经运行并完成，它还保证由执行的闭包所执行的任何内存写入都能被其他线程在这时可靠地观察到。

## 线程同步
### 消息传递
在多线程间有多种方式可以共享、传递数据，最常用的方式就是通过消息传递或者将锁和Arc联合使用。
#### 消息通道
与 Go 语言内置的 `chan` 不同，Rust 是在标准库里提供了消息通道(`channel`)，你可以将其想象成一场直播，多个主播联合起来在搞一场直播，最终内容通过通道传输给屏幕前的我们，其中主播被称之为发送者，观众被称之为接收者，显而易见的是：一个通道应该支持多个发送者和接收者。
##### 多发单收
标准库提供了通道 `std::sync::mpsc`，其中 `mpsc` 是 `multiple producer, single consumer` 的缩写，代表了该通道支持多个发送者，但是只支持唯一的接收者。

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    // 创建一个消息通道, 返回一个元组：(发送者，接收者)
    let (tx, rx) = mpsc::channel();

    // 创建线程，并发送消息
    thread::spawn(move || {
        // 发送一个数字1, send方法返回Result<T,E>，通过unwrap进行快速错误处理。实际开发中，应该做更加严谨的错误处理
        tx.send(1).unwrap();

        // 下面代码将报错，因为编译器自动推导出通道传递的值是i32类型，那么Option<i32>类型将产生不匹配错误
        // tx.send(Some(1)).unwrap()
    });

    // 在主线程中接收子线程发送的消息并输出
    println!("receive {}", rx.recv().unwrap());
}
```
几个需要注意的地方：
- 由于 `mpsc::Sender<i32>` 和 `mpsc::Recevier<i32>` 内部是泛型实现，一旦类型被推导确定，该通道就只能传递对应类型的值, 例如此例中非 i32 类型的值将导致编译错误
- rx.recv() 方法是阻塞的，如果没有接收到消息，程序将一直等待，直到接收到消息为止，或者通道关闭
- 需要使用 move 将 tx 的所有权转移到子线程的闭包中。

##### 不阻塞的 try_recv
如果你不想阻塞等待消息，可以使用 try_recv 方法，它会立即返回一个 Result 类型的值，如果通道中有消息，就返回 Ok，否则返回 Err。
##### 传输具有所有权的数据
- 若值的类型实现了Copy特征，则直接复制一份该值，然后传输过去，例如之前的i32类型
- 若值没有实现Copy，则它的所有权会被转移给接收端，在发送端继续使用该值将报错
##### 使用 for 循环接收消息
```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }
}
```
##### 使用多发送者
使用 Clone 来克隆发送者，每个线程都有一个发送者的所有权。
##### 消息顺序
channel FIFO。发送和接受顺序是一致的。
##### 同步和异步通道
之前我们使用的都是异步通道：无论接收者是否正在接收消息，消息发送者在发送消息时都不会阻塞:

与异步通道相反，同步通道发送消息是阻塞的，只有在消息被接收后才解除阻塞。

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;
fn main() {
    let (tx, rx)= mpsc::sync_channel(0);

    let handle = thread::spawn(move || {
        println!("发送之前");
        tx.send(1).unwrap();
        println!("发送之后");
    });

    println!("睡眠之前");
    thread::sleep(Duration::from_secs(3));
    println!("睡眠之后");

    println!("receive {}", rx.recv().unwrap());
    handle.join().unwrap();
}
```
可以看出，主线程由于睡眠被阻塞导致无法接收消息，因此子线程的发送也一直被阻塞，直到主线程结束睡眠并成功接收消息后，发送才成功：发送之后的输出是在receive 1之后，说明只有接收消息彻底成功后，发送消息才算完成。

- `sync_channel` 方法的参数是通道的缓冲区大小，缓冲满之前发送非阻塞（异步）；如果缓冲区满了，发送者将会阻塞(同步)
- 而异步的通道没有缓冲区，理论上可以无限发送消息

##### 关闭通道
所有发送者被drop或者所有接收者被drop后，通道会自动关闭。

由于 Drop 特征的调用是在编译期确定的，因此**在运行期不会有额外的性能开销**。这与一些其他语言不同，在那些语言中，类似的清理操作可能需要在运行期通过垃圾回收或其他机制来处理。

##### 传输多种消息类型
一个消息通道只能传输一种类型的数据，如果你想要传输多种类型的数据，可以为每个类型创建一个通道，你也可以使用枚举类型来实现。
```rust
use std::sync::mpsc::{self, Receiver, Sender};

enum Fruit {
    Apple(u8),
    Orange(String)
}

fn main() {
    let (tx, rx): (Sender<Fruit>, Receiver<Fruit>) = mpsc::channel();

    tx.send(Fruit::Orange("sweet".to_string())).unwrap();
    tx.send(Fruit::Apple(2)).unwrap();

    for _ in 0..2 {
        match rx.recv().unwrap() {
            Fruit::Apple(count) => println!("received {} apples", count),
            Fruit::Orange(flavor) => println!("received {} oranges", flavor),
        }
    }
}
```
但是由于内存对齐，传输的是枚举中占用内存最小的成员，它占用的内存依然和最大的成员相同, 因此会造成内存上的浪费。
### 锁，condvar和信号量
#### 共享内存和消息传递如何选择
消息传递的底层实际上也是通过共享内存来实现，两者的区别如下：

- 共享内存相对消息传递能节省多次内存拷贝的成本
- 共享内存的实现简洁的多
- 共享内存的锁竞争更多

消息传递适用的场景很多，我们下面列出了几个主要的使用场景:

- 需要可靠和简单的(简单不等于简洁)实现时
- 需要模拟现实世界，例如用消息去通知某个目标执行相应的操作时
- 需要一个任务处理流水线(管道)时，等等

共享内存(并发原语)的场景往往就比较简单粗暴：需要简洁的实现以及更高的性能时。

消息传递类似一个单所有权的系统：一个值同时只能有一个所有者，如果另一个线程需要该值的所有权，需要将所有权通过消息传递进行转移。而共享内存类似于一个多所有权的系统：多个线程可以同时访问同一个值。

#### 互斥锁 Mutex
皇冠上的明珠: 互斥锁Mutex(mutual exclusion 的缩写)
>Mutex让多个线程并发的访问同一个值变成了排队访问：同一时间，只允许一个线程A访问该值，其它线程需要等待A访问完成后才能继续。

#### 单线程中使用Mutex
```rust
use std::sync::Mutex;

fn main() {
    // 使用`Mutex`结构体的关联函数创建新的互斥锁实例
    let m = Mutex::new(5);

    {
        // 获取锁，然后deref为`m`的引用
        // lock返回的是Result
        let mut num = m.lock().unwrap();
        *num = 6;
        // 锁自动被drop
    }

    println!("m = {:?}", m);
}
```
和Box类似，数据被Mutex所拥有，要访问内部的数据，需要使用方法 m.lock() 向 m 申请一个锁, **该方法会阻塞当前线程，直到获取到锁**，因此当多个线程同时访问该数据时，只有一个线程能获取到锁，其它线程只能阻塞着等待，这样就保证了数据能被安全的修改！

m.lock()返回一个智能指针 `MutexGuard<T>` :
- Deref trait，会被**自动解引用后获得一个引用类型**，该引用指向 Mutex 内部的数据
- Drop trait，在超出作用域后，自动释放锁，以便其它线程能继续获取锁

#### 多线程中使用Mutex

Rc 没有实现 Send，因此不能跨线程传递，但是可以使用 Arc 来替代 Rc，Arc 是原子引用计数类型，可以安全的在线程间共享数据。

##### 内部可变性
Rc<T>/RefCell<T>用于单线程内部可变性， Arc<T>/Mutex<T>用于多线程内部可变性。
##### 多线程死锁

##### try_lock
与lock方法不同，try_lock会尝试去获取一次锁，如果无法获取会返回一个错误，因此不会发生阻塞。
一个有趣的命名规则：在 Rust 标准库中，使用try_xxx都会尝试进行一次操作，如果无法完成，就立即返回，不会发生阻塞。例如消息传递章节中的try_recv以及本章节中的try_lock。
#### 读写锁 RwLock
Mutex会对每次读写都进行加锁，但某些时候，**我们需要大量的并发读**，Mutex就无法满足需求了，此时就可以使用RwLock。

RwLock在使用上和Mutex区别不大，只有在多个读的情况下不阻塞程序，其他如读写、写读、写写情况下均会对后获取锁的操作进行阻塞。

我们也可以使用try_write和try_read来尝试进行一次写/读，若失败则返回错误:

简单总结下RwLock:

- 同时允许多个读，但最多只能有一个写
- 读和写不能同时存在
- 读可以使用read、try_read，写write、try_write, 在实际项目中，try_xxx会安全的多
#### Mutex 还是 RwLock
首先简单性上 Mutex 完胜，因为使用 RwLock 你得操心几个问题：

- 读和写不能同时发生，如果使用 try_xxx 解决，就必须做大量的错误处理和失败重试机制
- 当 **读多写少** 时，写操作**可能会**因为一直无法获得锁导致连续多次失败(**writer starvation**)
- RwLock 其实是操作系统提供的，实现原理要比Mutex复杂的多，因此单就锁的性能而言，比不上原生实现的Mutex。

再来简单总结下两者的使用场景：
- 追求**高并发读取**时，使用 RwLock，因为 Mutex 一次只允许一个线程去读取
- 如果要**保证写操作的成功性**，使用 Mutex
- 不知道哪个合适，统一使用 Mutex
- 需要注意的是，RwLock 虽然看上去貌似提供了高并发读取的能力，但这个不能说明它的性能比 Mutex 高，事实上 Mutex 性能要好不少，后者唯一的问题也仅仅在于不能并发读取。

一个常见的、错误的使用 RwLock 的场景就是使用 HashMap 进行简单读写，因为 HashMap 的读和写都非常快，RwLock 的复杂实现和相对低的性能反而会**导致整体性能的降低**，因此一般来说更适合使用 Mutex。

总之，如果你要使用RwLock要确保满足以下两个条件：并发读，且需要对读到的资源进行"长时间"的操作，HashMap也许满足了并发读的需求，但是往往并不能满足后者："长时间"的操作。

#### 条件变量 Condvar
Mutex用于解决资源安全访问的问题，但是我们还需要一个手段来解决资源访问顺序的问题。而 Rust 考虑到了这一点，为我们提供了条件变量(Condition Variables)，它经常和Mutex一起使用，可以让线程挂起，直到某个条件发生后再继续执行。

```rust
use std::sync::{Arc,Mutex,Condvar};
use std::thread::{spawn,sleep};
use std::time::Duration;

fn main() {
    let flag = Arc::new(Mutex::new(false));
    let cond = Arc::new(Condvar::new());
    let cflag = flag.clone();
    let ccond = cond.clone();

    let hdl = spawn(move || {
        let mut lock = cflag.lock().unwrap();
        let mut counter = 0;

        while counter < 3 {
            while !*lock {
                // wait方法会接收一个MutexGuard<'a, T>，且它会自动地暂时释放这个锁，使其他线程可以拿到锁并进行数据更新。
                // 同时当前线程在此处会被阻塞，直到被其他地方notify后，它会将原本的MutexGuard<'a, T>还给我们，即重新获取到了锁，同时唤醒了此线程。
                lock = ccond.wait(lock).unwrap();
            }
            *lock = false;

            counter += 1;
            println!("inner counter: {}", counter);
        }
    });

    let mut counter = 0;
    loop {
        sleep(Duration::from_millis(1000));
        *flag.lock().unwrap() = true;
        counter += 1;
        if counter > 3 {
            break;
        }
        println!("outside counter: {}", counter);
        // notify_one方法会唤醒一个等待的线程，如果有多个线程在等待，只会唤醒其中一个
        cond.notify_one();
    }
    hdl.join().unwrap();
    println!("{:?}", flag);
}
```
#### 信号量 Semaphore
在多线程中，另一个重要的概念就是信号量，使用它可以让我们精准的控制当前正在运行的任务最大数量。
在实际使用中，也有很多时候，我们需要通过信号量来控制最大并发数，防止服务器资源被撑爆。

本来 Rust 在标准库中有提供一个信号量实现, 但是由于各种原因这个库现在已经不再推荐使用了，因此我们推荐使用tokio中提供的Semaphore实现: tokio::sync::Semaphore。
```rust
use std::sync::Arc;
use tokio::sync::Semaphore;

#[tokio::main]
async fn main() {
    // 创建一个容量为3的信号量
    let semaphore = Arc::new(Semaphore::new(3));
    let mut join_handles = Vec::new();

    for _ in 0..5 {
        // 申请信号量
        // acquire_owned方法会返回一个信号量的许可，如果信号量已满，会阻塞当前线程
        // await关键字用于等待异步操作的结果
        let permit = semaphore.clone().acquire_owned().await.unwrap();
        // tokio::spawn会返回一个JoinHandle，用于等待异步任务的结束
        // tokio::spawn 和thread::spawn类似，都是用于创建一个新的线程，区别在于前者是异步的，后者是同步的
        join_handles.push(tokio::spawn(async move {
            //
            // 在这里执行任务...
            //

            // 释放信号量
            drop(permit);
        }));
    }

    for handle in join_handles {
        handle.await.unwrap();
    }
}
```

这里的关键其实说白了就在于：信号量的申请和归还，使用前需要申请信号量，如果容量满了，就需要等待；使用后需要释放信号量，以便其它等待者可以继续。

## Atomic 原子操作与内存顺序
除了锁之外，其实还有一种并发原语可以帮助我们解决并发访问数据的问题，那就是原子类型 Atomic。Mutex 用起来简单，但是无法并发读，RwLock 可以并发读，但是使用场景较为受限且性能不够，那么有没有一种全能性选手呢？ 欢迎我们的 Atomic 闪亮登场。

由于原子操作是通过指令提供的支持，因此它的性能相比锁和消息传递会好很多。相比较于锁而言，原子类型不需要开发者处理加锁和释放锁的问题，同时支持修改，读取等操作，还具备较高的并发性能，几乎所有的语言都支持原子类型。

可以看出原子类型是**无锁类型**，但是**无锁不代表无需等待**，因为**原子类型内部使用了CAS循环**，当大量的冲突发生时，该等待还是得等待！但是总归比锁要好。

> CAS 全称是 Compare and swap, 它通过一条指令读取指定的内存地址，然后判断其中的值是否等于给定的前置值，如果相等，则将其修改为新的值，否则不做任何操作。CAS 是一种乐观锁，它不需要加锁，因此性能很高。
> 乐观锁和悲观锁的区别在于：悲观锁认为数据会被其他线程修改，因此在读取数据时会加锁，而乐观锁则认为数据不会被修改，因此不会加锁，只有在更新数据时才会加锁。

#### 使用 Atomic 作为全局变量
原子类型的一个常用场景，就是作为全局变量来使用。
```rust
use std::ops::Sub;
use std::sync::atomic::{AtomicU64, Ordering};
use std::thread::{self, JoinHandle};
use std::time::Instant;

const N_TIMES: u64 = 10000000;
const N_THREADS: usize = 10;

static R: AtomicU64 = AtomicU64::new(0);

fn add_n_times(n: u64) -> JoinHandle<()> {
    thread::spawn(move || {
        for _ in 0..n {
            R.fetch_add(1, Ordering::Relaxed);
        }
    })
}

fn main() {
    let s = Instant::now();
    let mut threads = Vec::with_capacity(N_THREADS);

    for _ in 0..N_THREADS {
        threads.push(add_n_times(N_TIMES));
    }

    for thread in threads {
        thread.join().unwrap();
    }

    assert_eq!(N_TIMES * N_THREADS as u64, R.load(Ordering::Relaxed));

    println!("{:?}",Instant::now().sub(s));
}
```
当然以上代码的功能其实也可以通过Mutex来实现，但是后者的强大功能是建立在额外的性能损耗基础上的，因此性能会逊色不少。atomic 实现用了673ms，而 Mutex 实现用了 1.2s。在复杂场景下差距会更大。

还有一点值得注意: 和Mutex一样，Atomic的值具有内部可变性，你无需将其声明为mut。

#### 内存顺序
```rust
use std::sync::Mutex;
use std::sync::atomic::{Ordering, AtomicU64};

struct Counter {
    count: u64
}

fn main() {
    // 使用 Mutex 保护 Counter
    let counter_mutex = Mutex::new(Counter {
        count: 0
    });

    counter_mutex.lock().unwrap().count += 1;

    // 使用 AtomicU64 进行原子操作
    let atomic_counter = AtomicU64::new(0);

    atomic_counter.fetch_add(1, Ordering::Relaxed);
}
```
Ordering::Relaxed 是原子类型的一个重要参数，它决定了原子操作的内存顺序，Rust 提供了几种内存顺序，分别是：Relaxed, Acquire, Release, AcqRel, SeqCst。

内存顺序是指 CPU 在访问内存时的顺序，该顺序可能受以下因素的影响：
- 代码中的先后顺序
- 编译器优化导致在编译阶段发生改变(内存重排序 reordering)
- 运行阶段因 CPU 的缓存机制导致顺序被打乱
##### Rust 提供了几种内存顺序
- Relaxed， 这是最宽松的规则，它对编译器和 CPU 不做任何限制，可以乱序
- Release 释放，设定内存屏障(Memory barrier)，保证它之前的操作永远在它之前，但是它后面的操作可能被重排到它前面
- Acquire 获取, 设定内存屏障，保证在它之后的访问永远在它之后，但是它之前的操作却有可能被重排到它后面，往往和Release在不同线程中联合使用
- AcqRel, 是 Acquire 和 Release 的结合，同时拥有它们俩提供的保证。比如你要对一个 atomic 自增 1，同时希望该操作之前和之后的读取或写入操作不会被重新排序
- SeqCst 顺序一致性， SeqCst就像是AcqRel的加强版，它不管原子操作是属于读取还是写入的操作，只要某个线程有用到SeqCst的原子操作，线程中该SeqCst操作前的数据操作绝对不会被重新排在该SeqCst操作之后，且该SeqCst操作后的数据操作也绝对不会被重新排在SeqCst操作前。

##### 以 Release 和 Acquire 构筑出一对内存屏障
原则上，Acquire用于读取，而Release用于写入。但是由于有些原子操作同时拥有读取和写入的功能，此时就需要使用AcqRel来设置内存顺序了。在内存屏障中被写入的数据，都可以被其它线程读取到，不会有 CPU 缓存的问题。

##### 内存顺序的选择
不知道怎么选择时，优先使用SeqCst，虽然会稍微减慢速度，但是慢一点也比出现错误好
多线程只计数fetch_add而不使用该值触发其他逻辑分支的简单使用场景，可以使用Relaxed

#### 多线程中使用Atomic
需要注意的是，Atomic 类型是不能直接使用的，必顿要使用 Arc 包裹一下，因为 Atomic 类型是不能跨线程传递的。
```rust
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::{hint, thread};

fn main() {
    let spinlock = Arc::new(AtomicUsize::new(1));

    let spinlock_clone = Arc::clone(&spinlock);
    let thread = thread::spawn(move|| {
        spinlock_clone.store(0, Ordering::SeqCst);
    });

    // 等待其它线程释放锁
    while spinlock.load(Ordering::SeqCst) != 0 {
        // hint::spin_loop() 是一个空循环，它会告诉 CPU 不要进行空闲状态的优化，而是一直等待
        hint::spin_loop();
    }

    if let Err(panic) = thread.join() {
        println!("Thread had an error: {:?}", panic);
    }
}
```
#### Atomic 总结
- Atomic 不能替代锁。
    - 对于复杂的场景下，锁的使用简单粗暴，不容易有坑
    - std::sync::atomic包中仅提供了数值类型的原子操作：AtomicBool, AtomicIsize, AtomicUsize, AtomicI8, AtomicU16等，而锁可以应用于各种类型
    - 在有些情况下，必须使用锁来配合，例如上一章节中使用Mutex配合Condvar
-  Atomic 应用场景
事实上，Atomic虽然对于用户不太常用，但是对于高性能库的开发者、标准库开发者都非常常用，它是并发原语的基石，除此之外，还有一些场景适用：
    - 无锁(lock free)数据结构
    - 全局变量，例如全局自增 ID, 在后续章节会介绍
    - 跨线程计数器，例如可以用于统计指标
## 基于 Send + Sync 的线程安全
### Rc 和 Arc 源码对比
```rust
// Rc源码片段
impl<T: ?Sized> !marker::Send for Rc<T> {}
impl<T: ?Sized> !marker::Sync for Rc<T> {}

// Arc源码片段
unsafe impl<T: ?Sized + Sync + Send> Send for Arc<T> {}
unsafe impl<T: ?Sized + Sync + Send> Sync for Arc<T> {}
```
!marker::Send 和 !marker::Sync 是 Rust 中的特殊语法，它们表示了一个类型不满足 Send 和 Sync 特性，而 Arc 则是满足的。

### Send 和 Sync
Send 和 Sync 是 Rust 安全并发的重中之重，但是实际上它们只是**标记特征**(**marker trait**，该特征未定义任何行为，因此非常适合用于标记), 来看看它们的作用：

- 实现Send的类型可以在线程间安全的**传递其所有权**
- 实现Sync的类型可以在线程间安全的**共享(通过引用)**
由上可知，若类型 T 的引用&T是Send，则T是Sync。

再通过对比一下 `RwLock<T>` 和 `Mutex<T>`的实现，进一步理解 Sync 的作用。

首先RwLock可以在线程间安全的共享，那它肯定是实现了 Sync，但是我们的关注点不在这里。众所周知，RwLock可以并发的读，说明其中的值T必定也可以在线程间共享，那T必定要实现 Sync。
`RwLock<T>` 的实现中，T的特征约束中就有一个 Sync 特征。

```rust
unsafe impl<T: ?Sized + Send + Sync> Sync for RwLock<T> {}
```
`Mutex<T>` 实现中的T并没有Sync特征约束。
```rust
unsafe impl<T: ?Sized + Send> Sync for Mutex<T> {}
```
#### 为裸指针实现 Send 和 Sync
在 Rust 中，*mut T 是一个裸指针（raw pointer），它可以指向任何类型 T 的内存地址。裸指针不具有 Rust 的所有权和借用检查机制，因此它们的使用是非常不安全的。为了确保线程安全，Rust 对裸指针的 Send 实现有严格的限制。

> Send 和 Sync 是 unsafe 特征，实现时需要用 unsafe 代码块。

```rust
use std::thread;

#[derive(Debug)]
struct MyBox(*mut u8);
// 为裸指针实现Send，使之可以在线程间传递
unsafe impl Send for MyBox {}
fn main() {
    let p = MyBox(5 as *mut u8);
    let t = thread::spawn(move || {
        println!("{:?}",p);
    });

    t.join().unwrap();
}
```

下面尝试为裸指针实现 Sync 特征。

线程如果直接去借用其它线程的变量，会报错:closure may outlive the current function,, 原因在于编译器无法确定主线程main和子线程t谁的生命周期更长，特别是当两个线程都是子线程时，没有任何人知道哪个子线程会先结束，包括编译器！

因此我们得配合Arc去使用：
```rust
use std::thread;
use std::sync::Arc;
use std::sync::Mutex;

#[derive(Debug)]
struct MyBox(*const u8);

unsafe impl Send for MyBox {}
// 为MyBox实现Sync特征，使之可以在线程间共享
unsafe impl Sync for MyBox {}

fn main() {
    let b = &MyBox(5 as *const u8);
    let v = Arc::new(Mutex::new(b));
    let t = thread::spawn(move || {
        // 通过Mutex获取裸指针，实现了Sync特征，可以安全的共享
        let _v1 =  v.lock().unwrap();
    });

    t.join().unwrap();
}
```

- 第一段代码：只需要实现 Send 特征，因为数据 p 被移动到新线程中，不需要在多个线程间共享。
- 第二段代码：需要实现 Send 和 Sync 特征，因为数据 b 被包装在 Arc 和 Mutex 中，并在多个线程间共享。Sync 特征允许多线程同时访问同一个数据，而 Mutex 确保了对数据的互斥访问。
#### 总结一下
- `T` 是 `Sync` 意味着 `&T` 是 `Send`，但 `&T` 是 `Send` 并不意味着 `T` 是 `Sync`
- 实现 Send 的类型可以在线程间安全的传递其所有权, 实现 Sync 的类型可以在线程间安全的共享(通过引用)
- 绝大部分类型都实现了 Send 和 Sync，常见的未实现的有：裸指针、Cell、RefCell、Rc 等
- 可以为自定义类型实现 Send 和 Sync，但是需要 unsafe 代码块
- 可以为部分 Rust 中的类型实现 Send、Sync，但是需要使用 newtype，例如文中的裸指针例子
# 实战：实现一个 Redis
## tokio库