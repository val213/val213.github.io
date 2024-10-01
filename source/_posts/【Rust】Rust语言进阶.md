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
### Atomic 原子操作与内存顺序
## 基于 Send + Sync 的线程安全

# tokio库