## 高速上手 C++ 11/14/17/20
### 与 C 的兼容
在不得不使用 C 时，应该注意使用 `extern "C"` 这种特性，**将 C 语言的代码与 C++代码进行分离编译，再统一链接**这种做法，例如：

```cpp
// foo.h
#ifdef __cplusplus
extern "C" {
#endif

int add(int x, int y);

#ifdef __cplusplus
}
#endif

// foo.c
int add(int x, int y) {
    return x+y;
}

// 1.1.cpp
#include "foo.h"
#include <iostream>
#include <functional>

int main() {
    [out = std::ref(std::cout << "Result from C code: " << add(1, 2))](){
        out.get() << ".\n";
    }();
    return 0;
}
```
应先使用 gcc 编译 C 语言的代码：

```bash
gcc -c foo.c -o foo.o
```
再使用 clang++ 编译 C++ 代码：

```bash
clang++ 1.1.cpp foo.o -std=c+_+2a -o 1.1
```

或者用 Makefile 来管理：

```makefile
C = gcc
CXX = clang++

SOURCE_C = foo.c
OBJECT_C = foo.o

SOURCE_CXX = 1.1.cpp

TARGET = 1.1
LDFLAGS_COMMON = -std=c++2a

all:
      $(C) -c $(SOURCE_C)
      $(CXX) $(SOURCE_CXX) $(OBJECT_C) $(LDFLAGS_COMMON) -o $(TARGET)
clean:
      rm -rf *.o $(TARGET)
```

### 语言可用性的强化
常谈及语言可用性，是指那些发生在运行时之前的语言行为。
#### 常量
##### nullptr
为了解决 `NULL` 的二义性问题，C++11 引入了 `nullptr` 关键字，它是一种空指针常量，类型为 `nullptr_t` 可以用于指针初始化、函数重载等场景，例如：
##### constexpr
C++11 提供了 constexpr 让用户显式的声明函数或对象构造函数在编译期会成为常量表达式，这个关键字明确的告诉编译器应该去验证 len_foo 在编译期就应该是一个常量表达式。

constexpr 修饰的函数可以使用递归：
```cpp
constexpr int fibonacci(const int n) {
    return n == 1 || n == 2 ? 1 : fibonacci(n-1)+fibonacci(n-2);
}
```
从 C++14 开始，constexpr 函数可以在内部使用局部变量、循环和分支等简单语句，例如下面的代码在 C++11 的标准下是不能够通过编译的：
```cpp
constexpr int fibonacci(const int n) {
    if(n == 1) return 1;
    if(n == 2) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
}
```
为此，我们可以写出下面这类简化的版本来使得函数从 C++11 开始即可用：
```cpp
constexpr int fibonacci(const int n) {
    return n == 1 || n == 2 ? 1 : fibonacci(n-1) + fibonacci(n-2);
}
```
#### 变量及其初始化
##### if/switch 中的初始化
在传统 C++ 中，变量的声明虽然能够位于任何位置，甚至于 for 语句内能够声明一个临时变量 int，但始终没有办法在 if 和 switch 语句中声明一个临时的变量。C++17 消除了这一限制，使得我们可以在 if（或 switch）中完成这一操作：
```cpp
// 将临时变量放到 if 语句内
if (const std::vector<int>::iterator itr = std::find(vec.begin(), vec.end(), 3);
    itr != vec.end()) {
    *itr = 4;
}
```
##### 初始化列表
在传统 C++ 中，不同的对象有着不同的初始化方法，例如普通数组、 POD （Plain Old Data，即没有构造、析构和虚函数的类或结构体） 类型都可以使用 {} 进行初始化，也就是我们所说的初始化列表。 而对于类对象的初始化，要么需要通过拷贝构造、要么就需要使用 () 进行。 这些不同方法都针对各自对象，不能通用。

为解决这个问题，C++11 首先把初始化列表的概念绑定到类型上，称其为 std::initializer_list，允许构造函数或其他函数像参数一样使用初始化列表，这就为类对象的初始化与普通数组和 POD 的初始化方法提供了统一的桥梁。
```cpp
#include <initializer_list>
#include <vector>
#include <iostream>

class MagicFoo {
public:
    std::vector<int> vec;
    MagicFoo(std::initializer_list<int> list) {
        for (std::initializer_list<int>::iterator it = list.begin();
             it != list.end(); ++it)
            vec.push_back(*it);
    }
};
int main() {
    // after C++11
    MagicFoo magicFoo = {1, 2, 3, 4, 5};

    std::cout << "magicFoo: ";
    for (std::vector<int>::iterator it = magicFoo.vec.begin(); 
        it != magicFoo.vec.end(); ++it) 
        std::cout << *it << std::endl;
}
```


##### 结构化绑定
结构化绑定提供了类似其他语言中提供的多返回值的功能。在容器一章中，我们会学到 C++11 新增了 std::tuple 容器用于构造一个元组，进而囊括多个返回值。但缺陷是，C++11/14 并没有提供一种简单的方法直接从元组中拿到并定义元组中的元素，尽管我们可以使用 std::tie 对元组进行拆包，但我们依然必须非常清楚这个元组包含多少个对象，各个对象是什么类型，非常麻烦。

C++17 完善了这一设定，给出的结构化绑定可以让我们写出这样的代码:
```cpp
#include <iostream>
#include <tuple>

std::tuple<int, double, std::string> f() {
   return std::make_tuple(1, 2.3, "456");
}

int main() {
   auto [x, y, z] = f();
   std::cout << x << ", " << y << ", " << z << std::endl;
   return 0;
}
```
#### 类型推断
##### auto
从 C++ 14 起，auto 能用于 lambda 表达式中的函数传参，而 C++ 20 起该功能推广到了一般的函数。

但是要注意，auto 还不能用于推导数组类型。
##### decltype
decltype 关键字是为了解决 auto 关键字只能对变量进行类型推导的缺陷而出现的。它的用法和 typeof 很相似：

decltype(表达式)

```cpp
auto x = 1;
auto y = 2;
decltype(x+y) z;
```

其中，std::is_same<T, U> 用于判断 T 和 U 这两个类型是否相等。

##### 尾返回类型
C++11 还引入了一个叫做尾返回类型（trailing return type），利用 auto 关键字将返回类型后置：
```cpp
template<typename T, typename U>
auto add2(T x, U y) -> decltype(x+y){
   return x + y;
}
```
令人欣慰的是从 C++14 开始是可以直接让普通函数具备返回值推导，因此下面的写法变得合法：
```cpp
template<typename T, typename U>
auto add3(T x, U y){
   return x + y;
}
```

##### decltype(auto)
有了 decltype(auto)，我们可以让编译器完成这一件烦人的参数转发：
```cpp
decltype(auto) look_up_a_string_1() {
   return lookup1();
}
decltype(auto) look_up_a_string_2() {
   return lookup2();
}
```
#### 控制流
##### if constexpr
C++17 将 constexpr 这个关键字引入到 if 语句中，允许在代码中声明常量表达式的判断条件，考虑下面的代码：
```cpp
#include <iostream>

template<typename T>
auto print_type_info(const T& t) {
    if constexpr (std::is_integral<T>::value) {
        return t + 1;
    } else {
        return t + 0.001;
    }
}
int main() {
    std::cout << print_type_info(5) << std::endl;
    std::cout << print_type_info(3.14) << std::endl;
}
```

##### 区间 for 迭代
#### 模板
C++ 的模板一直是这门语言的一种特殊的艺术，模板甚至可以独立作为一门新的语言来进行使用。模板的哲学在于将一切能够在编译期处理的问题丢到编译期进行处理，仅在运行时处理那些最核心的动态服务，进而大幅优化运行期的性能。因此模板也被很多人视作 C++ 的黑魔法之一。
##### 外部模板
传统 C++ 中，模板只有在使用时才会被编译器实例化。换句话说，只要在每个编译单元（文件）中编译的代码中遇到了被完整定义的模板，都会实例化。这就产生了重复实例化而导致的编译时间的增加。并且，我们没有办法通知编译器不要触发模板的实例化。

为此，C++11 引入了外部模板，扩充了原来的强制编译器在特定位置实例化模板的语法，使我们能够显式的通知编译器何时进行模板的实例化：

```cpp
template class std::vector<bool>;          // 强行实例化
extern template class std::vector<double>; // 不在该当前编译文件中实例化模板
```

##### 尖括号“>”
在 C++11 之前，编译器会将 `>>` 解释为右移操作符，而不是模板参数列表的结束。因此，我们需要在两个尖括号之间加上一个空格，以避免编译器的歧义。而在 C++11 之后，编译器已经能够正确的解析 `>>` 为模板参数列表的结束，因此我们可以直接使用 `>>` 了。但是，为了兼容旧版本的编译器，我们还是建议在两个尖括号之间加上一个空格。

##### 类型别名模板
模板是用来产生类型的。在传统 C++ 中，typedef 可以为类型定义一个新的名称，但是却没有办法为模板定义一个新的名称。因为，模板不是类型。

C++11 引入了类型别名模板，允许我们为模板定义一个新的名称：
```cpp
template<typename T>
using Vec = std::vector<T>;
```
##### 变长参数模板
C++11 加入了新的表示方法， 允许任意个数、任意类别的模板参数，同时也不需要在定义时将参数的个数固定。
    
```cpp
template<typename... Args> class Magic;
```
```cpp
class Magic<int,
            std::vector<int>,
            std::map<std::string, std::vector<int>>> magic;

class Magic<> nothing;
```
变长参数模板也能被直接调整到到模板函数上。
```cpp
template<typename... Args> void printf(const std::string &str, Args... args);
```
定义了变长的模板参数，如何对参数进行解包呢？
使用 sizeof... 来计算参数的个数：
```cpp
template<typename... Ts>
void magic(Ts... args) {
    std::cout << sizeof...(args) << std::endl;
}
```
- 递归模板函数
- 变参模板展开
- 初始化列表展开

##### 折叠表达式
C++ 17 中将变长参数这种特性进一步带给了表达式，考虑下面这个例子：
```cpp
#include <iostream>
template<typename ... T>
auto sum(T ... t) {
    return (t + ...);
}
int main() {
    std::cout << sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) << std::endl;
}
```
##### 非类型模板参数推导
#### 面向对象
##### 委托构造
C++11 引入了委托构造的概念，这使得构造函数可以在同一个类中一个构造函数调用另一个构造函数，从而达到简化代码的目的：
```cpp
#include <iostream>
class Base {
public:
    int value1;
    int value2;
    Base() {
        value1 = 1;
    }
    Base(int value) : Base() { // 委托 Base() 构造函数
        value2 = value;
    }
};

int main() {
    Base b(2);
    std::cout << b.value1 << std::endl;
    std::cout << b.value2 << std::endl;
}
```
##### 继承构造
在传统 C++ 中，构造函数如果需要继承是需要将参数一一传递的，这将导致效率低下。C++11 利用关键字 using 引入了继承构造函数的概念：
```cpp
#include <iostream>
class Base {
public:
    int value1;
    int value2;
    Base() {
        value1 = 1;
    }
    Base(int value) : Base() { // 委托 Base() 构造函数
        value2 = value;
    }
};
class Subclass : public Base {
public:
    using Base::Base; // 继承构造
};
int main() {
    Subclass s(3);
    std::cout << s.value1 << std::endl;
    std::cout << s.value2 << std::endl;
}
```
##### 显式虚函数重载
C++11 引入了 override 和 final 这两个关键字来防止上述情形的发生。

override
当重载虚函数时，引入 override 关键字将显式的告知编译器进行重载，编译器将检查基函数是否存在这样的其函数签名一致的虚函数，否则将无法通过编译：
```cpp
struct Base {
    virtual void foo(int);
};
struct SubClass: Base {
    virtual void foo(int) override; // 合法
    virtual void foo(float) override; // 非法, 父类没有此虚函数
};
```

final 则是为了防止类被继续继承以及终止虚函数继续重载引入的。
```cpp
struct Base {
    virtual void foo() final;
};
struct SubClass1 final: Base {
}; // 合法

struct SubClass2 : SubClass1 {
}; // 非法, SubClass1 已 final

struct SubClass3: Base {
    void foo(); // 非法, foo 已 final
};
```
##### 显式禁用默认函数
编译器产生的默认构造函数与用户定义的构造函数无法同时存在。 若用户定义了任何构造函数，编译器将不再生成默认构造函数， 但有时候我们却希望同时拥有这两种构造函数，这就造成了尴尬。

C++11 提供了上述需求的解决方案，允许显式的声明采用或拒绝编译器自带的函数。 例如：
```cpp
class Magic {
    public:
    Magic() = default; // 显式声明使用编译器生成的构造
    Magic& operator=(const Magic&) = delete; // 显式声明拒绝编译器生成构造
    Magic(int magic_number);
};
```
##### 强类型枚举
