---
title: Google C++ Style Guide
categories: 技术分享
tags: language
---
# Google C++ Style Guide
## table of contents
| Section                        | Subsections                                                                 |
|--------------------------------|------------------------------------------------------------------------------|
| **C++ Version**                    |                                                                              |
| **Header Files**                   | **Self-contained Headers**, **The #define Guard**, **Include What You Use**, **Forward Declarations**, **Inline Functions**, **Names and Order of Includes** |
| Scoping                        | Namespaces, Internal Linkage, Nonmember, Static Member, and Global Functions, Local Variables, Static and Global Variables, thread_local Variables |
| Classes                        | Doing Work in Constructors, Implicit Conversions, Copyable and Movable Types, Structs vs. Classes, Structs vs. Pairs and Tuples, Inheritance, Operator Overloading, Access Control, Declaration Order |
| Functions                      | Inputs and Outputs, Write Short Functions, Function Overloading, Default Arguments, Trailing Return Type Syntax |
| Google-Specific Magic          | Ownership and Smart Pointers, cpplint                                         |
| Other C++ Features             | Rvalue References, Friends, Exceptions, noexcept, Run-Time Type Information (RTTI), Casting, Streams, Preincrement and Predecrement, Use of const, Use of constexpr, constinit, and consteval, Integer Types, Floating-Point Types, Architecture Portability, Preprocessor Macros, 0 and nullptr/NULL, sizeof, Type Deduction (including auto), Class Template Argument Deduction, Designated Initializers, Lambda Expressions, Template Metaprogramming, Concepts and Constraints, C++20 modules, Coroutines, Boost, Disallowed standard library features, Nonstandard Extensions, Aliases, Switch Statements |
| Inclusive Language             |                                                                              |
| Naming                         | General Naming Rules, File Names, Type Names, Concept Names, Variable Names, Constant Names, Function Names, Namespace Names, Enumerator Names, Macro Names, Exceptions to Naming Rules |
| Comments                       | Comment Style, File Comments, Struct and Class Comments, Function Comments, Variable Comments, Implementation Comments, Punctuation, Spelling, and Grammar, TODO Comments |
| Formatting                     | Line Length, Non-ASCII Characters, Spaces vs. Tabs, Function Declarations and Definitions, Lambda Expressions, Floating-point Literals, Function Calls, Braced Initializer List Format, Looping and branching statements, Pointer and Reference Expressions, Boolean Expressions, Return Values, Variable and Array Initialization, Preprocessor Directives, Class Format, Constructor Initializer Lists, Namespace Formatting, Horizontal Whitespace, Vertical Whitespace |
| Exceptions to the Rules        | Existing Non-conformant Code, Windows Code                                   |

## C++ Version
目前风格指南针对于 C++ 20，不使用 C++ 23 的特性，且不使用非标准扩展，例如如：编译器支持各种不属于标准 C++ 的扩展。这些扩展包括 GCC 的 `__attribute__`、内置函数如 `__builtin_prefetch` 或 SIMD、`#pragma`、内联汇编、`__COUNTER__`、`__PRETTY_FUNCTION__`、复合语句表达式（例如，`foo = ({ int x; Bar(&x); x })`）、可变长度数组和 `alloca()`，以及“Elvis 操作符” `a?:b`。
## Header Files
### Self-contained Headers
> google 这里说的 .cc 其实就是 .cpp
头文件应该是自包含的（可以单独编译）并以 .h 结尾。非头文件但用于包含的文件应以 .inc 结尾，并且应谨慎使用。

所有头文件都应该是自包含的。用户和重构工具不应需要遵守特殊条件来包含头文件。具体来说，头文件应该有头文件保护符，并包含它所需要的所有其他头文件。

当头文件声明内联函数或模板时，客户端将实例化这些内联函数和模板，这些内联函数和模板的定义也必须在头文件中，直接或通过它包含的文件。不应将这些定义移动到单独包含的头文件（-inl.h）文件中；这种做法在过去很常见，但现在不再允许。当模板的所有实例化都发生在一个 .cc 文件中时，无论是因为它们是显式的，还是因为定义仅对 .cc 文件可访问，模板定义都可以保留在该文件中。

在极少数情况下，设计用于包含的文件不是自包含的。这些通常旨在包含在不寻常的位置，例如另一个文件的中间。它们可能不使用头文件保护符，也可能不包含它们的前提条件。将此类文件命名为 .inc 扩展名。谨慎使用，并尽可能使用自包含头文件。

每个 `.cc` 文件应该包含其自己的头文件，以确保它们是自包含的。这意味着 `.cc` 文件应该包含所有它们需要的头文件，而不依赖于其他 `.cc` 文件中的头文件。这样可以确保 `.cc` 文件可以独立编译，并且可以减少构建时间。
### The #define Guard
所有头文件都应该使用 `#define` 防护，以防止头文件被多次包含。防护符号的命名应该遵循这种模式：`<PROJECT>_<PATH>_<FILE>_H_`。为了保证唯一性，它们应该基于项目源代码树中的完整路径。
```cpp
#ifndef FOO_BAR_BAZ_H_
#define FOO_BAR_BAZ_H_

...

#endif  // FOO_BAR_BAZ_H_
```
### Include What You Use
如果源文件或头文件引用了在其他地方定义的符号，则该文件应直接包含一个正确地提供了该符号的声明或定义的头文件。

不要依赖 include 的传递。这允许人们在不影响引用了 A 头文件的 B 文件的情况下从 A 头文件中删除不再需要的 #include 语句。例如，如果 foo.cc 使用了 bar.h 中的符号，即使 foo.h 包含了 bar.h，foo.cc 也应该包含 bar.h。

### Forrward Declarations
Avoid using forward declarations where possible. Instead, include the headers you need. 避免使用前向声明，取而代之的是包含需要的头文件。

前向声明指的是一个没有相关定义但是声明了一个符号。
```cpp
// In a C++ source file:
class B;
void FuncInB();
extern int variable_in_b;
ABSL_DECLARE_FLAG(flag_in_b);
```
pros:
- 前向声明可以节省编译时间，因为如果用 `#include` 会强制编译器去打开另一个文件并处理更多输入。
- 前向声明可以避免一些不必要的重复编译，由于不相关的头文件的改变，`#include` 会强制多次编译你的代码。
cons：
- 前向声明会隐藏依赖关系，当头文件改变的时候允许用户的代码跳过必要的重编译。
- 相对于 `#include`，前向声明使得自动工具难以发现定义符号的模块。
- 前向声明可能会因库的后续更改而失效。
- 函数和模板的前向声明可能会阻止头文件所有者对其 API 进行其他兼容性更改，例如扩展参数类型、添加带默认值的模板参数或迁移到新命名空间。
- 前向声明来自 `std::` 命名空间的符号会导致未定义行为。
- 很难确定是需要前向声明还是完整的 `#include`。用前向声明替换 `#include` 可能会悄悄地改变代码的含义。
```
// b.h:
struct B {};
struct D : B {};

// good_user.cc:
#include "b.h"
void f(B*);
void f(void*);
void test(D* x) { f(x); }  // Calls f(B*)
```
- 如果将 #include 替换为 B 和 D 的前向声明，则 test() 将调用 f(void*)。
- 前向声明多个符号可能比简单地 #include 更冗长。
- 构造代码以启用前向声明（例如，使用指针成员而不是对象成员）会使代码更慢、更复杂。
### Inline Functions
只有当函数非常简单时（10行或者更少），才应该将函数定义为内联函数。
pros：
- 只要内联函数很小，内联函数就可以生成更高效的目标代码。 可以随意内联accessors and mutators （getter 和 setter）以及其他简短、性能关键的函数。
cons:
- 过度使用内联实际上会使程序变慢。 根据函数的大小，内联它可能会导致代码大小增加或减少。 内联非常小的访问器函数通常会减少代码大小，而内联非常大的函数会显著增加代码大小。 在现代处理器上，较小的代码通常运行得更快，因为可以更好地利用指令缓存。

一个不错的经验法则是，如果函数长度超过 10 行，则不要内联它。 小心析构函数，由于隐式成员和基函数析构函数调用，它们通常比看起来的要长！

另一个有用的经验法则：使用循环或 switch 语句内联函数通常不太划算（除非在常见情况下循环或 switch 语句永远不会执行）。

重要的是要知道，即使函数被声明为内联函数，它们也并不总是内联的；例如，虚函数和递归函数通常不会内联。通常，递归函数不应内联。将虚函数设为内联的主要原因是将其定义放在类中，以方便使用或记录其行为，例如，用于 accessors and mutators （getter 和 setter）。
### Names and Order of Includes
遵循以下顺序包含头文件：相关头文件、C系统头文件、C标准库头文件、其他库的头文件以及项目的头文件。
项目的所有头文件都应作为项目源代码目录的子目录列出，不使用UNIX目录别名（当前目录）或（父目录）。 For example, `google-awesome-project/src/base/logging.h` should be included as:
```cpp
#include "base/logging.h"
```
只有库要求的时候，才使用尖括号路径包含头文件。特别是以下头文件：

- C 和 C++ 标准库标头（例如 <stdlib.h> 和 <string>）。
- POSIX、Linux 和 Windows 系统标头（例如 <unistd.h> 和 <windows.h>）。
- 在极少数情况下，第三方库（例如 <Python.h>）。

在 `dir/foo.cc` 或 `dir/foo_test.cc` 中，其主要目的是实现或测试 `dir2/foo2.h` 中的内容，请按以下顺序排列包含内容：
1. dir2/foo2.h
2. `空行`
3. C system 头文件 ，以及带有 .h 扩展名的需要用尖括号的其他头文件，例如 <unistd.h>、<stdlib.h>、<Python.h>。
4. `空行`
5. C++ 标准库头文件（不带文件扩展名），例如 <algorithm>、<cstddef>。
6. `空行`
7. 其他库的 .h 文件
8. `空行`
9. 项目的 .h 文件
> 用一个 `空行` 分隔每个非空组。

按照首选顺序，如果相关头文件 dir2/foo2.h 省略了任何必要的包含，则 dir/foo.cc 或 dir/foo_test.cc 的构建将中断。因此，此规则可确保构建中断首先显示给处理这些文件的人员，而不是其他软件包中的无辜人员。

在每个部分中，包含的内容应按字母顺序排列。

例如，`google-awesome-project/src/foo/internal/fooserver.cc` 中的包含内容可能如下所示：
```cpp
#include "foo/server/fooserver.h"

#include <sys/types.h>
#include <unistd.h>

#include <string>
#include <vector>

#include "base/basictypes.h"
#include "foo/server/bar.h"
#include "third_party/absl/flags/flag.h"
```
## Scoping 作用域