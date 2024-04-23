---
title: DragonOS招新面试小任务
tags: 
  - 操作系统
  - Rust
  - 文件系统
  - 内核
  - DragonOS
categories: 
  - DragonOS
---
# DragonOS
## rust入门与开发环境推荐
rust入门的教程仓库 https://github.com/rust-lang/rustlings

开发环境推荐用 `vscode` + `rust-analyzer` 插件+ `CodeLLDB` 插件


### rustlings
#### quiz2
The difference between the two snippets lies in how they iterate over `input`.

In the first snippet, `input.iter()` is used. This method returns an iterator that borrows each element from `input`. This means that the `string` and `command` variables in the loop are references to the elements in `input`. This is why you see `*n` in the `Command::Append(n)` match arm - it's dereferencing `n` to get the actual value. Also, because `string` is a reference, methods that consume the string (like `to_owned()`) or return a new owned string (like `to_uppercase()`) can be used without issues.

In the second snippet, `input` is used directly in the `for` loop. This means that `input` is being moved into the loop, and `string` and `command` are the actual values from `input`, not references. This is why you don't see `*n` in the `Command::Append(n)` match arm - `n` is already the actual value. However, because `string` is not a reference, you would run into issues if you tried to use methods that borrow the string, unless you clone or copy the string first.

#### error2
In the `total_cost` function, `e` is a variable that holds the error returned by the `parse` method when it fails to convert `item_quantity` into an `i32`. The `parse` method returns a `Result` type, which can be either `Ok` if the parsing is successful, or `Err` if it fails. In the case of an error, the `Err` variant will contain a `ParseIntError` object, which is captured in the `e` variable.

The `match` statement is used to handle both the `Ok` and `Err` cases. If `parse` is successful, the `Ok` branch multiplies the quantity by the cost per item and adds the processing fee, then wraps the total cost in an `Ok` variant. If `parse` fails, the `Err` branch simply passes the error along by wrapping it in an `Err` variant.

The test `item_quantity_is_an_invalid_number` is checking the error handling of the `total_cost` function. It calls `total_cost` with an invalid string "beep boop", which cannot be parsed into an `i32`. This causes `parse` to return an error, which is then returned by `total_cost`.

The `unwrap_err` method is called on the result of `total_cost`, which returns the contained `ParseIntError` if the result is `Err`, or panics if the result is `Ok`. The `to_string` method is then called on the error to convert it into a string.

The test asserts that the string representation of the error is "invalid digit found in string", which is the error message associated with a `ParseIntError` when the string contains invalid digits. Since "beep boop" indeed contains invalid digits, the error message is as expected, and the test passes.

#### &，*，ref
In Rust, `&`, `*`, and `ref` are used in different contexts related to references and dereferencing.

1. `&`: This is used to **create a reference to a value**. For example, `&x` creates a reference to `x`. **This means you can access `x` without taking ownership of it.**
```rust
let x = 10;
let y = &x; // y is a reference to x
```

2. `*`: This is used to **dereference a reference**, i.e., get the value that the reference points to. For example, if `y` is a reference to `x`, then `*y` gives you `x`.

```rust
let x = 10;
let y = &x; // y is a reference to x
let z = *y; // z is now 10, the value that y points to
```

3. `ref`: This is used in **pattern matching** to **create a reference to a value**. For example, in a match expression, you might want to create a reference to the value you're matching on, rather than moving the value.

```rust
let x = 10;
match x {
    ref y => println!("{}", y), // y is a reference to x
    _ => (),
}
```

In this case, `ref` allows you to **create a reference within the pattern itself**. This is useful when the pattern includes destructuring.
### _
The underscore `_` in Rust is used as a **placeholder** for a value that you don't need or care about. It can be used in various contexts to indicate that a value is being ignored or not used.
### 'static 生命周期
`'static` 生命周期是 Rust 中的一种特殊生命周期，表示一个值在整个程序的生命周期内都有效。具体来说，`'static` 生命周期是一个特殊的生命周期标识符，用于表示一个值的生命周期可以持续到程序的整个运行期间。这意味着这个值在程序启动时创建，直到程序结束时才被销毁。
### dyn 关键字
`dyn` 关键字用于指定动态分发的类型。在 Rust 中，`dyn` 关键字通常与 trait 对象一起使用，用于指定 trait 对象的类型。具体来说，`dyn` 关键字用于标识 trait 对象的类型，表示该类型是动态分发的，即在运行时才确定具体的类型。在 Rust 中，trait 对象是一种允许在运行时处理不同类型的对象的机制。通过 trait 对象，可以将不同类型的对象存储在相同的数据结构中，并在运行时根据具体类型来调用相应的方法。使用 `dyn` 关键字可以明确指定 trait 对象的类型，以便进行动态分发。
### Option 和 Result
`Option` 和 `Result` 是 Rust 中的两种常用枚举类型，用于处理可能为空或可能出错的情况。具体来说，`Option` 用于表示可能为空的值，有两个变体：`Some`（包含值）和 `None`（空值）。`Result` 用于表示可能出错的操作，有两个变体：`Ok`（成功）和 `Err`（错误）。在 Rust 中，`Option` 和 `Result` 是用于处理可选值和错误处理的标准方式。通过 `Option` 和 `Result`，可以更安全和可靠地处理可能为空或可能出错的情况，避免了空指针和未处理异常等问题。
### Arc 和 Mutex
`Arc` 和 `Mutex` 是 Rust 中用于多线程编程的两种常用类型。`Arc` 是原子引用计数类型，用于在多线程环境中共享数据。`Mutex` 是互斥锁类型，用于保护共享数据的访问。在 Rust 中，`Arc` 和 `Mutex` 通常结合使用，以确保多线程环境下对共享数据的安全访问。具体来说，`Arc` 允许多个线程共享对同一份数据的引用，而 `Mutex` 用于在多线程环境中保护共享数据的访问，确保同一时间只有一个线程可以访问数据。通过 `Arc` 和 `Mutex`，可以实现多线程环境下的数据共享和访问控制，确保程序的正确性和可靠性。

### Rust中的生命周期
在 Rust 中，生命周期是一种用于描述引用的有效范围的机制。具体来说，生命周期用于指定引用的作用域，即引用在何时创建和何时销毁。在 Rust 中，生命周期通常用单引号（'）加上标识符来表示，如 'a。生命周期可以应用于函数参数、返回值、结构体字段等地方，用于指定引用的有效范围。通过生命周期，可以确保引用在其有效范围内是有效的，避免悬垂引用和内存安全问题。Rust 的生命周期系统是一种静态检查机制，可以在编译时检查引用的有效性，确保程序的正确性和安全性。

### Rust中的trait
在 Rust 中，trait 是一种用于定义共享行为的机制。trait 允许你抽象地定义某种类型的行为，而不关心具体类型是什么。类似于其他语言中的接口（interface）或抽象类（abstract class），trait 提供了一种将方法签名组合在一起的方式，以在不同类型上共享这些行为。trait 提供了一种在 Rust 中实现多态和代码重用的强大机制。通过使用 trait，可以在不破坏类型安全性的情况下，为不同类型引入共享的行为和规范。

### Rust中的模块系统
在 Rust 中，模块系统是一种用于组织代码的机制。模块系统允许将代码分割成多个逻辑单元，以便更好地组织和管理代码。具体来说，Rust 的模块系统包括如下几个方面：
- 包（package）：一个用于构建、测试并分享单元包的 Cargo 功能。
- 单元包（crate）：一个用于生成库或可执行文件的树形模块结构。
- 模块（module）：用于控制文件结构、作用域及路径的私有性。
- 路径（path）：一种用于命名条目的方法，这些条目包括结构体、函数和模块等。
- 在 Rust 中，模块系统提供了一种灵活的方式来组织代码，使得代码更易于维护和扩展。通过模块系统，可以将代码分割成多个逻辑单元，提高代码的可读性和可维护性。

## 原实现的代码理解
https://www.cnblogs.com/yangxinrui/p/15924361.html
### ramfs模块组成
当理解一个文件系统模块时，首先要明确文件系统的基本概念，特别是inode、文件、目录等。以下是对 ramfs 模块中每个函数实现的简要说明：

- LockedRamFSInode 结构体
`LockedRamFSInode` 是对 `RamFSInode` 的加锁封装，通过 `SpinLock` 实现了对 `RamFSInode` 的线程安全访问。

- RamFS 结构体
`RamFS` 结构体代表整个内存文件系统，其中包含一个指向`根 Inode` 的强引用。

- RamFSInode 结构体
`RamFSInode` 结构体表示内存文件系统中的 `Inode`，即文件或目录。以下是它的主要字段：
  - parent: 指向父 Inode 的弱引用。
  - self_ref: 指向自身的弱引用。
  - children: 存储子 Inode 的 B 树，模拟目录结构。
  - data: 存储文件内容的字节向量。
  - metadata: 存储 Inode 的元数据，包括权限、文件类型、大小等信息。
  - fs: 指向文件系统对象的弱引用。
  - special_node: 存储特殊节点的信息，如管道。
- RamFS 实现的 FileSystem trait
  - root_inode: 返回文件系统的根 Inode。
  - info: 返回文件系统信息，包括块设备 ID 和最大文件名长度。
  - as_any_ref: 用于实现动态转换，简单地返回 self。
- RamFS 实现的 IndexNode trait
以下是 `IndexNode trait` 中的一些关键方法：
  - truncate: 截断文件内容至指定长度。
  - close: 关闭文件。
  - open: 打开文件。
  - read_at: 从指定偏移处读取数据。
  - write_at: 在指定偏移处写入数据。
  - fs: 返回文件系统对象。
  - as_any_ref: 返回 self 的动态引用。
  - metadata: 返回 Inode 的元数据。
  - set_metadata: 设置 Inode 的元数据。
  - resize: 调整文件大小。
  - create_with_data: 创建带有初始数据的 Inode。
  - link: 创建硬链接。
  - unlink: 删除硬链接。
  - rmdir: 删除目录。
  - move_: 移动 Inode。
  - find: 根据名称查找 Inode。
  - get_entry_name: 根据 Inode ID 获取目录项名称。
  - list: 列出目录中的项。
  - mknod: 创建 Inode。
  - special_node: 返回特殊节点信息。
这些方法实现了文件系统和 Inode 的基本操作，包括文件和目录的创建、读写、删除等。**对于目录项的查找和管理，使用了 B 树来提高性能**。同时，考虑了`多线程环境下的同步问题`，使用了 `SpinLock` 来保护共享数据结构的访问。
#### 主要功能的函数调用流程
- 文件系统初始化：
 
调用 RamFS::new() 函数初始化内存文件系统。
在初始化过程中，创建了根目录的 Inode（LockedRamFSInode）。
- 创建文件或目录：

调用 create_with_data 函数，该函数会在指定目录下创建一个新的 Inode（文件或目录）。
在 create_with_data 中，首先获取目录的 Inode，然后创建新的 Inode，并将其插入到父目录的子 Inode 列表中。
- 删除文件或目录：

调用 unlink 或 rmdir 函数，这些函数负责删除指定目录下的文件或目录。
在 unlink 或 rmdir 中，首先获取目录的 Inode，然后根据给定的名称找到要删除的子 Inode，最后从父目录中移除该子 Inode。
- 文件读写操作：

调用 read_at 和 write_at 函数进行文件的读写操作。
在这些函数中，首先获取文件的 Inode，然后根据偏移量进行读取或写入操作。
- 创建硬链接：

调用 link 函数创建文件的硬链接。
在 link 函数中，首先获取目录的 Inode，然后在目录中插入一个新的子 Inode 条目，并增加被链接 Inode 的硬链接计数。
- 查找文件或目录：

调用 find 函数通过文件或目录的名称查找对应的 Inode。
在 find 函数中，根据给定的名称，在当前目录的子 Inode 列表中查找对应的 Inode。
- 列出目录内容：

调用 list 函数列出目录的内容。
在 list 函数中，获取目录的 Inode，然后遍历子 Inode 列表，获取各个子 Inode 的名称。
- 移动文件或目录：

调用 move_ 函数移动文件或目录。
在 move_ 函数中，首先在目标目录下创建一个硬链接，然后取消源目录下的硬链接。
- 获取目录项名称：

调用 get_entry_name 函数获取目录项的名称。
在 get_entry_name 函数中，通过 Inode ID 来查找对应的目录项名称。
#### 加锁和 Arc 的理解
##### 加锁（SpinLock）的作用：
确保多线程环境下对共享数据结构（如 `RamFSInode`）的访问是安全的。在并发环境中，多个线程可能同时访问和修改数据，加锁可以防止竞争条件和数据不一致性。
#### Arc 的作用：
`Arc（Atomic Reference Counting）`是一种智能指针，允许多个引用指向同一份数据，并在引用计数为零时自动释放数据。在这里，Arc 用于确保多个部分可以安全地引用和共享相同的数据结构，如 `RamFSInode`。

锁（Locking）：

代码中使用了 SpinLock，这是一个简单的自旋锁。自旋锁会一直尝试获取锁，而不会让线程进入休眠。这种锁适用于短时间内可以获得锁的情况，避免了线程切换的开销。
锁的主要目的是确保多个线程对共享数据的访问是互斥的，避免竞争条件和数据不一致性。
Arc（Atomic Reference Counting）：

使用了 Arc（原子引用计数），这是一个具有线程安全的引用计数的智能指针。Arc 允许多个引用同时存在，不需要额外的锁来保护引用计数。
在这份代码中，Arc 主要用于保持 Inode 的引用，确保多个地方可以共享对 Inode 的引用而不用担心所有权问题。
元数据更新策略：

在元数据更新时，代码通过获取 Inode 的锁来确保更新的原子性，防止多个线程同时修改相同 Inode 导致的问题。
例如，在 set_metadata 函数中，通过获取 Inode 锁来保护对元数据的修改，确保在多线程环境下对元数据的更新是安全的。
请求时更新策略：

在某些函数中，如 get_entry_name 和 list，可能涉及到对子 Inode 的遍历和查询。这里的实现可能会导致性能问题，因为它使用了暴力遍历来查找相应的 Inode。
代码中通过注释提示了这一点，并建议进行优化。可以考虑改进数据结构或者使用更高效的算法来进行查询，以提高性能。
特殊节点信息（SpecialNodeData）：

Inode 结构中包含了 special_node 字段，用于存储特殊文件（如管道、设备文件）的特殊信息。这可以用来支持一些特殊文件的操作。
目前的实现中提供了对管道文件的支持，使用了 LockedPipeInode 类型。
总体来说，这份代码采用了一些经典的并发编程和文件系统实现的技术，例如自旋锁、引用计数、元数据的锁保护等，以确保在多线程环境下的正确性和可靠性。在使用时需要注意并发操作的正确性，并根据实际需求可能进行性能优化。

### 前置知识
#### 关于软硬链接
链接（Symbolic Link）和硬链接（Hard Link）是文件系统中用来创建文件之间关联的两种不同方式。

硬链接（Hard Link）：

硬链接是指多个文件目录项（文件名）指向同一个 inode 的链接关系。在硬链接中，同一个文件可以有多个硬链接，它们都指向同一个 inode。这意味着一个硬链接的更改会影响到其他所有硬链接，因为它们实际上是同一个文件。
硬链接的限制是必须位于同一个文件系统中，因为 inode 是文件系统内部的标识，不同文件系统的 inode 无法关联。
软链接（Symbolic Link）：

软链接是一个指向另一个文件的特殊文件。软链接本身有一个独立的 inode，里面存储的是目标文件的路径。软链接实际上是一个包含目标文件路径的文本文件，当访问软链接时，系统会自动解析路径并访问目标文件。
软链接可以跨越文件系统，并且可以链接到不存在的目标。但是，如果目标文件被删除，软链接就会变为悬空链接。
总体来说，硬链接是文件系统中多个文件名指向同一个实际文件的关系，而软链接是一个特殊的文件，其内容是指向另一个文件的路径。硬链接直接引用 inode，而软链接引用文件路径。
#### 关于强弱引用
弱应用就是C++中的智能指针，强引用就是普通指针。强引用会增加引用计数，弱引用不会增加引用计数。强引用指针指向的对象被释放，强引用指针就会变成空指针，而弱引用指针不会变成空指针。弱引用指针可以通过lock()函数转换成强引用指针，如果强引用指针为空，lock()函数返回空指针。
#### 模块系统
Rust提供了一系列的功能来帮助我们管理代码，这其中就包括决定哪些细节是暴露的，哪些细节是私有的，以及不同的作用域内存在哪些名称。这些功能有时被统称为模块系统，它们包括如下几个方面:

package(包) : 一个用于构建,测试并分享单元包的Cargo功能。
crate(单元包) : 一个用于生成库或可执行文件的树形模块结构。
module(模块) use关键字 : 它们被用于控制文件结构，作域及路径的私有性。
path(路径) : 一种用于命名条目的方法，这些条目包括结构体,函数和模块等。

#### 关于mod.rs
在 Rust 项目中，mod.rs 文件通常是一个模块的主文件。每个目录下的 mod.rs 文件用于定义该目录下的模块的内容，并充当模块的入口点。

具体来说，如果一个目录包含了多个 Rust 源代码文件（.rs 文件），而你希望将这些文件组织成一个模块，可以使用 mod.rs 文件来引入这些文件，使其成为一个单独的模块。

例如，假设有一个名为 my_module 的目录，里面包含了以下两个文件：
```RUST
//my_module/mod.rs：
//rust

// 引入其他文件作为模块的一部分
mod file1;
mod file2;

// 导出模块的内容
pub use file1::function_from_file1;
pub use file2::function_from_file2;

// 模块的其他内容...
```
```RUST
//my_module/file1.rs：
//rust

// 文件1的具体实现
pub fn function_from_file1() {
    // 实现细节...
}
my_module/file2.rs：
rust
Copy code
// my_module/file2.rs

// 文件2的具体实现
pub fn function_from_file2() {
    // 实现细节...
}
```
这样，通过在 `my_module/mod.rs` 中引入文件1和文件2，并导出它们的函数，就可以在其他模块中直接使用 `my_module` 这个模块，而不需要直接引入 `file1` 和 `file2`。

总体而言，`mod.rs` 文件是 `Rust` 中用于组织目录下多个文件形成模块的约定之一。
#### trait
在Rust编程语言中，trait 是一种定义共享行为的机制。trait 允许你抽象地定义某种类型的行为，而不关心具体类型是什么。类似于其他语言中的接口（interface）或抽象类（abstract class），trait 提供了一种将方法签名组合在一起的方式，以在不同类型上共享这些行为。

trait 提供了一种在Rust中实现多态和代码重用的强大机制。通过使用 trait，可以在不破坏类型安全性的情况下，为不同类型引入共享的行为和规范。

## 文件系统架构理解

- RamFS（内存文件系统）： 这是一个基于内存的文件系统，用作默认的根文件系统。在初始化过程中，代码使用RamFS作为根文件系统，创建了一些基本的目录结构，如/proc、/dev、/sys等。

- MountFS（挂载文件系统）： 挂载文件系统的时候，套了MountFS这一层，以实现文件系统的递归挂载。这是一个用于挂载其他文件系统的文件系统。在初始化时，代码使用RamFS创建了一个MountFS对象，并将其作为根文件系统的一部分。通过MountFS，其他文件系统可以被挂载到指定的目录上。

- procfs、devfs、sysfs： 这些是特殊的文件系统，提供了对进程、设备和系统信息的访问。在初始化过程中，这些文件系统被创建，并通过MountFS挂载到根文件系统的相应目录中。

- sysfs是一个基于内存的文件系统，它的作用是将内核信息以文件的方式提供给用户程序使用。
&emsp;&emsp;sysfs可以看成与proc,devfs和devpty同类别的文件系统，该文件系统是虚拟的文件系统，可以更方便对系统设备进行管理。它可以产生一个包含所有系统硬件层次视图，与提供进程和状态信息的proc文件系统十分类似。sysfs把连接在系统上的设备和总线组织成为一个分级的文件，它们可以由用户空间存取，向用户空间导出内核的数据结构以及它们的属性。sysfs可以看成与proc,devfs和devpty同类别的文件系统，该文件系统是虚拟的文件系统，可以更方便对系统设备进行管理。它可以产生一个包含所有系统硬件层次视图，与提供进程和状态信息的proc文件系统十分类似。sysfs把连接在系统上的设备和总线组织成为一个分级的文件，它们可以由用户空间存取，向用户空间导出内核的数据结构以及它们的属性。

- KernFS是一个伪文件系统，它充当其它内核文件系统的**容器**，面向用户提供文件接口。其核心功能就是，当kernfs的文件被读/写或者触发回调点的时候，将会对预设的回调函数进行调用，触发其它内核文件系统的操作。这种设计使得SysFS和文件系统的基本操作解耦，KernFS作为SysFS的承载物，使得SysFS能更专注于KObject的管理，让代码更加优雅。


- FATFileSystem： 这是一个**FAT32文件系统的实现**，通过AHCI（Advanced Host Controller Interface）访问硬盘上的分区。**在初始化中，代码尝试将FAT32文件系统挂载为新的根文件系统，以替代默认的RamFS**。


关系总结：

- RamFS是默认的根文件系统，用于初始化时创建基本的目录结构。
- MountFS作为根文件系统的一部分，用于挂载其他文件系统（实质上是一个机制）。
- procfs、devfs、sysfs是特殊文件系统，提供了对进程、设备和系统信息的访问。
- FATFileSystem是一个具体的文件系统实现，尝试替代默认的RamFS成为新的根文件系统。

### 用户程序调用的流程
在文件系统的架构中，用户程序调用文件操作通常会经过以下步骤进入内核和系统调用：

用户程序调用文件操作函数： 用户程序通过使用文件系统库（如fs库）提供的文件操作函数来进行文件相关的操作，比如打开文件、读写文件等。

系统调用： 文件操作函数通常是通过系统调用接口提供的。在用户空间，这些系统调用函数的实现只是一些包装，它们将用户传递的参数打包成适当的数据结构，然后通过系统调用指令（如int 0x80或syscall指令）进入内核空间。

系统调用处理： 操作系统内核接收到系统调用后，会根据系统调用号（或其他标识符）来确定用户程序请求的具体服务，例如文件系统服务。

文件系统抽象层： 内核中存在文件系统抽象层，该层负责处理文件系统相关的请求。它通过调用文件系统的相关接口来执行相应的操作。这可能涉及到虚拟文件系统（VFS）层，其中不同类型的文件系统都可以注册自己的实现。

挂载文件系统的时候，套了MountFS这一层，以实现文件系统的递归挂载

文件系统具体实现： 根据文件系统的挂载情况，VFS层会将请求传递给相应的具体文件系统实现。例如，如果用户程序请求对FAT32文件系统的文件进行读取，那么VFS层可能会将请求传递给FAT32文件系统的实现。

硬件抽象层： 文件系统的实现通常会依赖于底层硬件（如硬盘、SSD等）。这可能涉及到存储设备驱动和硬件抽象层，以确保数据正确地传递到和从存储设备中。

执行文件操作： 具体的文件系统实现会执行相应的文件操作，如读取、写入、创建、删除等。这可能涉及到在文件系统中定位文件、更新元数据等步骤。

返回结果给用户程序： 内核最终将文件操作的结果返回给用户程序。如果操作成功，用户程序可以继续执行；否则，用户程序可能会得到相应的错误信息。


### 文件系统架构业务流程的个人总结
用户程序通过外部库进行系统调用，外部库通过软中断将系统调用传递给系统调用处理器`syscall_handler`（`arch->x86_64_syscall->mod.rs：syscall_handler`）。在这个处理过程中，系统调用处理器将规定好的系统调用号（`syscall_num`）作为参数传递给系统调用分发器 `handle`（`syscall->mod.rs：handle`），以匹配相应的处理流程。文件抽象->IndexNode抽象->具体文件系统实现->硬件抽象->执行文件操作->返回结果给用户程序。

在系统初始化过程中（`vfs->core.rs->vfs_init`），创建了一个 RamFS 对象以及 MountFS 对象，并将 RamFS 作为默认的根文件系统。随后，根据需求在根目录下创建了其他具体文件系统（如 DevFS、ProcFS、SysFS）的文件夹并进行了初始化。随后调用了伪文件系统迁移的方法，将原来的文件系统都迁移到了FAT32文件系统下。

每个文件系统都需要实现 vfs 中定义的 `FileSystem trait` 和 `IndexNode trait`。 RamFS 实现了这两个 trait（`impl IndexNode for LockedRamFSInode 和 impl FileSystem for RamFS`）。由于 RamFS 的 IndexNode trait 中实现了 create 函数。当进行系统调用创建文件（例如打开文件）时，VFS 分发到 RamFS 的 create 函数，然后调用 RamFS 的具体处理逻辑。

我所做的就是在内核中的文件系统初始化的代码部分里多初始化了一个myramfs（和proc、sys等同级）,并且在myramfs中实现FileSystem以及IndexNode这两个trait，支持了文件的创建、删除、读写等操作。

随后将myramfs挂载到了根文件系统下，使得用户程序可以通过myramfs进行文件操作。并且这个myramfs也随着后面的迁移操作迁移到了FAT32下。

### 具体架构的构成
FileSystem trait：定义了文件系统的基本操作，如创建、删除、读写等。每个文件系统都需要实现这个 trait，以提供对应的文件系统功能。

IndexNode trait：定义了文件系统中 Inode 的基本操作，如打开、关闭、读写等。每个文件系统的 Inode 都需要实现这个 trait，以提供对应的 Inode 功能。

RamFS：内存文件系统，用作默认的根文件系统。实现了 FileSystem trait 和 IndexNode trait，提供了文件系统的基本操作和 Inode 的基本操作。

MountFS：挂载文件系统，用于挂载其他文件系统。作为根文件系统的一部分，提供了文件系统的递归挂载功能。

procfs、devfs、sysfs：特殊文件系统，提供了对进程、设备和系统信息的访问。在初始化过程中，这些文件系统被创建，并通过 MountFS 挂载到根文件系统的相应目录中。

FATFileSystem：FAT32 文件系统的实现，通过 AHCI 访问硬盘上的分区。在初始化过程中，代码尝试将 FAT32 文件系统挂载为新的根文件系统，以替代默认的 RamFS。

总体而言，文件系统架构由多个文件系统组成，每个文件系统都实现了 FileSystem trait 和 IndexNode trait，以提供文件系统的基本操作和 Inode 的基本操作。这些文件系统可以通过挂载文件系统的方式组合在一起，形成一个完整的文件系统层次结构。


### MountFS在文件系统里的作用
