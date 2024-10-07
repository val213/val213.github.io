---
title: 【DragonOS】编译相关
categories: DragonOS
tags: DragonOS
---
## PR #954 build: Remove DragonOS_GCC 
x86_64-elf-gcc 是一个交叉编译器，它是 GNU 编译器集合（GNU Compiler Collection，GCC）的一部分，用于为 x86_64-elf 目标平台编译代码。交叉编译器能够在一个平台上编译出另一个平台的可执行代码。在这种情况下，x86_64-elf-gcc 允许开发者在比如 x86-64 架构的机器上编译出能够在 ELF（Executable and Linkable Format）格式下运行的 x86_64 架构的代码，通常用于嵌入式系统开发或其他需要特定目标平台的场景。

x86_64-elf-gcc 通常用于操作系统开发，特别是当你需要为一个不同于宿主机的操作系统或硬件平台编译代码时。例如，如果你正在开发一个需要在 ARM 架构上运行的操作系统，但你的宿主机器是 x86_64 架构的，那么你可以使用 x86_64-elf-gcc 来编译你的操作系统内核和用户空间应用程序，生成 ARM 架构能够理解的二进制文件。

此外，x86_64-elf-gcc 可以安装在类 Unix 系统上，如 Linux 或 macOS，通过包管理器安装，例如在 macOS 上可以使用 Homebrew 来安装：`brew install x86_64-elf-gcc`。

使用交叉编译器时，你需要注意选择合适的二进制工具链（binutils）、C 库（如 glibc 或 uClibc）和其他依赖项，以确保编译出的代码能够在目标平台上正确运行。


