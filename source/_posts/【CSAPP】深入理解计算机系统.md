---
title: 【CMU】深入理解计算机系统
tags: 
	- 计算机组成原理
categories: 复习笔记
---
***本博客为CMU的15-213/15-513 Introduction to Computer Systems (ICS)的笔记，我按照自己的理解排布了结构，进行了翻译并加上了自己的理解作为补充。致谢为这门课付出并公开的所有人。配套教材：CSAPP（深入理解计算机系统）***
# 前置介绍
CSAPP也就是《Computer system:in a programer's perspective》，CMU的镇校神书，是一本非常经典的计算机系统导论教材，也是CMU的本科生计算机系统导论课程的教材。这门课程的目的是让学生了解计算机系统的工作原理，以及如何使用编程语言和系统工具来控制计算机系统。
## 资源分享
- 【课程资源】https://www.cs.cmu.edu/~213/schedule.html
- 【CMU图书馆影印版教材】https://cmu.primo.exlibrisgroup.com/discovery/delivery/01CMU_INST:01CMU/12295179970004436
- 【B站一个老哥分享的PDF课本，提取码】https://pan.baidu.com/s/1crJC8X-p25QmFF5vfc139A
- 【另外一位老哥在B站上记录的lab解决方法以及笔记】https://www.zhihu.com/column/c_1480603406519238656

## 课本结构目录介绍
- chapter 1：计算机系统漫游
- chapter 2：信息的表示和处理
- chapter 3：程序的机器级表示
- chapter 4：处理器体系结构
- chapter 5：优化程序性能
- chapter 6：存储器层次结构
- chapter 7：链接
- chapter 8：异常控制流
- chapter 9：虚拟内存
- chapter 10：系统级I/O
- chapter 11：网络编程
- chapter 12：并发编程

## chapter 1:计算机系统漫游

### 阿曼达定律ammdahl's law
$S=\frac{T_{old}}{T_{new}}=\frac{1}{(1-\alpha)+\alpha/k}$
结论：如果我们需要把系统的性能提高两倍甚至更多，只有通过优化大部分的组件才能实现。

提高计算能力：
- tread level concurrency（线程级并发）
- instruction level parallelism（指令级并行）
- single instruction multiple data parallelism（单指令、多数据并行）

多核处理器：CPU的多个核心有各自的L1、L2缓存，共享L3高速缓存。
Tips：对于一些高性能的服务器，一个CPU有几十个甚至上百个核心，提高系统的性能。

超线程hyper-threading：也叫同时多线程，一个CPU核心可以执行多个控制流，每个控制流都有自己的程序计数器和寄存器状态，但是共享主存和缓存。

SIMD指令加速：
## chapter 2:信息的表示和处理
### 十六进制和二进制的转换小技巧：
- 记住A（1010）、C（1100）、F（1111）
- 二进制数1后面有n个0，那么把n表示为n=i+4j，再把i表示为二进制，然后补上j个0，那么就是这个数的十六进制了。

- 十进制和十六进制转换的乘除法……不想听啊！！

###
字长决定了虚拟地址空间的大小上限（对于w字节的机器，虚拟地址的范围是w，0~2^w-1）。

大端法：最高有效位放在起始位置（形象记忆：现代书写顺序）
小端法：最低有效位放在起始位置（古代从右到左的书写顺序）

Tips:Android、ios和大多数intel的机器只能运行在小端法的处理器上，IBM和SUN的大多数机器运行在大端法的处理器上。不过现在很多新的处理器支持两端法。

## chapter 3:程序的机器级表示
### x86名字的由来
X86对inter处理器来说是一个口头的称谓，因为第一批芯片叫做8086、8286……所以人们叫他们为X86
x86又被叫做CISC，80年代是RISC（精简指令集计算机）和CISC（复杂指令集计算机，带有贬义）大战的年代。

## 多核处理器
一个芯片上有多个处理器，多个处理器共享一个缓存

## ARM
ARM(Acorn RISC Machine)
ARM不卖处理器，而是向公司出售知识产权，现在被NVIDIA收购了，手机上基本都用的ARM架构

## 汇编指令
`gcc -Og -S sum.c`
`gcc`： 这是GNU Compiler Collection（GCC）的命令，用于编译C、C++等源代码文件。

`-Og`： 这是一个优化选项，告诉编译器执行适度的优化，以使生成的汇编代码更易于调试。该选项通常在开发过程中使用，以便在保持代码可读性的同时进行基本优化。'O'代表'Optimize'优化，还有其他优化级别如O1和在OJ上见到过的O2。Og优化没那么严重，汇编代码的可读性比较高。

`-S`： 这个选项告诉编译器只生成汇编代码，而不执行后续的汇编和链接步骤。生成的汇编代码将保存在一个名为sum.s的文件中，其中sum是源代码文件名的基本部分。

`sum.c`： 这是要编译的C源代码文件的文件名。

反汇编：不访问汇编文件和源文件，把目标代码的机器码翻译回汇编语言

对微软的产品进行反汇编（属于逆向工程）违反了最终用户使用协议！哈哈哈哈哈
