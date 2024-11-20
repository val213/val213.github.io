---
title: CMake入门
tag: cmake
categories: 技术分享
---
[Cmake应用：CMakeLists.txt 完全指南](https://zhuanlan.zhihu.com/p/371257515)

`find_library`和`find_package`（你提到的`require mysql`可能是指`find_package(MySQL REQUIRED)`）在CMake中有不同的用途和行为：

1. **find_library**:
   - 用于查找特定的库文件（例如`libmysqlclient.so`）。
   - 只返回库文件的路径，不会自动处理库的依赖项或包含路径。
   - 需要手动指定包含路径和其他依赖项。

2. **find_package**:
   - 用于查找并配置一个完整的软件包（例如MySQL）。
   - 自动处理库的依赖项、包含路径和其他配置。
   - 通常需要一个对应的配置文件（例如`FindMySQL.cmake`或`MySQLConfig.cmake`）。

在你的情况下，使用`find_package`会更方便，因为它会自动处理MySQL库的所有配置。下面是如何使用`find_package`来替代`find_library`：

```cmake
cmake_minimum_required(VERSION 3.5.0)
project(database-program VERSION 0.1.0 LANGUAGES C CXX)

add_executable(database-program main.cpp)
# 链接MySQL库
find_package(MySQL REQUIRED)
target_link_libraries(database-program MySQL::MySQL)
```

这样，CMake会自动找到MySQL库，并处理所有必要的配置。