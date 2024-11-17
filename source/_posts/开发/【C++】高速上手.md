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
todo!()
### 语言运行期的强化
#### Lambda 表达式
todo!()
#### 函数对象包装器
todo!()
#### 右值引用
右值引用是 C++11 引入的与 Lambda 表达式齐名的重要特性之一。它的引入解决了 C++ 中大量的历史遗留问题， 消除了诸如 std::vector、std::string 之类的额外开销， 也才使得函数对象容器 std::function 成为了可能。
##### 左值和右值的纯右值、将亡值、右值
- **左值 (lvalue, left value)**，顾名思义就是赋值符号左边的值。准确来说， 左值是表达式（不一定是赋值表达式）**后依然存在的持久对象**。

- **右值 (rvalue, right value)**，右边的值，是指**表达式结束后就不再存在的临时对象**。

而 C++11 中为了引入强大的右值引用，将右值的概念进行了进一步的划分，分为：纯右值、将亡值。

- **纯右值 (prvalue, pure rvalue)**，纯粹的右值，要么是纯粹的字面量，例如 10, true； 要么是求值结果相当于字面量或匿名临时对象，例如 1+2。非引用返回的临时变量、运算表达式产生的临时变量、原始字面量、Lambda 表达式都属于纯右值。

需要注意的是，**字面量除了字符串字面量以外，均为纯右值**。而**字符串字面量是一个左值，类型为 const char 数组**。例如：
```cpp
#include <type_traits>

int main() {
    // 正确，"01234" 类型为 const char [6]，因此是左值
    const char (&left)[6] = "01234";

    // 断言正确，确实是 const char [6] 类型，注意 decltype(expr) 在 expr 是左值
    // 且非无括号包裹的 id 表达式与类成员表达式时，会返回左值引用
    static_assert(std::is_same<decltype("01234"), const char(&)[6]>::value, "");

    // 错误，"01234" 是左值，不可被右值引用
    // const char (&&right)[6] = "01234";
}
```
>- id 表达式：
>这是指简单的标识符，例如变量名、函数名等。例如，x、foo 都是 id 表达式。
>- 类成员表达式：
>这是指通过对象或指针访问类成员的表达式。例如，obj.member 或 ptr->member 都是类成员表达式。

但是注意，数组可以被隐式转换成相对应的指针类型，而转换表达式的结果（如果不是左值引用）则一定是个右值（右值引用为将亡值，否则为纯右值）。例如：
```cpp
const char *p = "01234"; // "01234" 被隐式转换为 const char * 类型，是右值。
const char *&& rp = "01234"; // "01234" 被隐式转换为 const char * 类型，该转换的结果是纯右值。
const char *& lp = "01234"; // 错误，"01234" 被隐式转换为 const char * 类型，是右值，不存在 const char * 的左值
```

- **将亡值 (xvalue, expiring value)**，是指**即将要被销毁的对象**，例如将要过期的临时对象。将亡值是 C++11 新增的概念，是一种特殊的右值引用，可以延长临时对象的生命周期，使其可以被赋值给左值引用。也就是即将被销毁、却能够被移动的值。例如：
```cpp
std::vector<int> foo() {
    std::vector<int> temp = {1, 2, 3, 4};
    return temp;
}

std::vector<int> v = foo();
```
在 C++11 之后，编译器为我们做了一些工作，此处的左值 temp 会被进行此隐式右值转换， 等价于 `static_cast<std::vector<int> &&>(temp)`，进而此处的 v 会将 foo 局部返回的值进行移动。 也就是后面我们将会提到的移动语义。

##### 右值引用和左值引用
要拿到一个将亡值，就需要用到右值引用：`T &&`，其中 T 是类型。 右值引用的声明让这个临时值的生命周期得以延长、只要变量还活着，那么将亡值将继续存活。

C++11 提供了 std::move 这个方法将左值参数无条件的转换为右值， 有了它我们就能够方便的获得一个右值临时对象，例如：
```cpp
#include <iostream>
#include <string>

void reference(std::string& str) {
    std::cout << "左值" << std::endl;
}
void reference(std::string&& str) {
    std::cout << "右值" << std::endl;
}

int main()
{
    std::string lv1 = "string,"; // lv1 是一个左值
    // std::string&& r1 = lv1; // 非法, 右值引用不能引用左值
    std::string&& rv1 = std::move(lv1); // 合法, std::move 可以将左值转移为右值
    std::cout << rv1 << std::endl; // string,

    const std::string& lv2 = lv1 + lv1; // 合法, 常量左值引用能够延长临时变量的生命周期
    // lv2 += "Test"; // 非法, 常量引用无法被修改
    std::cout << lv2 << std::endl; // string,string,

    std::string&& rv2 = lv1 + lv2; // 合法, 右值引用延长临时对象生命周期
    rv2 += "Test"; // 合法, 非常量引用能够修改临时变量
    std::cout << rv2 << std::endl; // string,string,string,Test

    reference(rv2); // 输出左值

    return 0;
}
```
rv2 虽然引用了一个右值，但由于它是一个引用，所以 rv2 依然是一个左值。
##### 移动语义
**传统 C++ 通过拷贝构造函数和赋值操作符为类对象设计了拷贝/复制的概念**，但为了实现对资源的移动操作，调用者必须使用先复制、再析构的方式，否则就需要自己实现移动对象的接口。 试想，搬家的时候是把家里的东西直接搬到新家去，而不是将所有东西复制一份（重买）再放到新家、 再把原来的东西全部扔掉（销毁），这是非常反人类的一件事情。

**传统的 C++ 没有区分『移动』和『拷贝』的概念，造成了大量的数据拷贝，浪费时间和空间**。 右值引用的出现恰好就解决了这两个概念的混淆问题，例如：
```cpp
#include <iostream>
class A {
public:
    int *pointer;
    A():pointer(new int(1)) {
        std::cout << "构造" << pointer << std::endl;
    }

    // 无意义的对象拷贝构造
    A(A& a):pointer(new int(*a.pointer)) {
        std::cout << "拷贝" << pointer << std::endl;
    }

    // 将传入对象的 pointer 直接赋值给当前对象的 pointer。
    // 将传入对象的 pointer 置为 nullptr，表示资源已被移动
    A(A&& a):pointer(a.pointer) {
        a.pointer = nullptr;
        std::cout << "移动" << pointer << std::endl;
    }
    ~A(){
        std::cout << "析构" << pointer << std::endl;
        delete pointer;
    }
};
// 防止编译器优化
A return_rvalue(bool test) {
    // 首先会在 return_rvalue 内部构造两个 A 对象，于是获得两个构造函数的输出
    A a,b;
    // 根据 test 的值，返回 a 或 b 的右值引用，这会调用移动构造函数
    if(test) return a; // 等价于 static_cast<A&&>(a);
    else return b;     // 等价于 static_cast<A&&>(b);
}
int main() {
    // 调用 return_rvalue(false)，返回 b 的右值引用
    // 使用移动构造函数将返回的右值引用赋值给 obj
    // 等价于 A obj = static_cast<A&&>(b); （将亡值，被移动构造引用，从而延长生命周期）
    // 并将这个右值中的指针赋值给 obj 中的指针，同时将原来的指针置为 nullptr，防止重复释放
    A obj = return_rvalue(false); 
    std::cout << "obj:" << std::endl;
    std::cout << obj.pointer << std::endl;
    std::cout << *obj.pointer << std::endl;
    return 0;
}
```
```shell
构造0x5913a5b9ceb0
构造0x5913a5b9d2e0
移动0x5913a5b9d2e0
析构0
析构0x5913a5b9ceb0
obj:
0x5913a5b9d2e0
1
析构0x5913a5b9d2e0
```
1. **构造 `a` 和 `b`**：
    - 输出两次构造信息。

2. **移动构造 `obj`**：
    - 输出移动信息。

3. **析构 `a` 和 `b`**：
    - `a` 和 `b` 在 `return_rvalue` 函数结束时被析构。
    - `b` 的 `pointer` 已被移动，所以 `b` 的析构不会释放内存。

4. **输出 `obj` 的信息**：
    - 输出 `obj.pointer` 和 `*obj.pointer`。

5. **析构 `obj`**：
    - 输出析构信息，释放内存。

stl 中的例子：
```cpp
#include <iostream>
#include <utility>
#include <vector>
#include <string>

int main() {

    std::string str = "Hello world.";
    std::vector<std::string> v;

    // 将使用 push_back(const T&), 即产生拷贝行为
    v.push_back(str);
    // 将输出 "str: Hello world."
    std::cout << "str: " << str << std::endl;

    // 将使用 push_back(const T&&), 不会出现拷贝行为
    // 而整个字符串会被移动到 vector 中，所以有时候 std::move 会用来减少拷贝出现的开销
    // 这步操作后, str 中的值会变为空
    v.push_back(std::move(str));
    // 将输出 "str: "，因为 str 的值已经被移动了
    std::cout << "str: " << str << std::endl;

    return 0;
}
```
##### 完美转发
前面我们提到了，一个声明的右值引用其实是一个左值。这就为我们进行参数转发（传递）造成了问题：
todo!()

##### g++ 和 clang++ 对 std::move 的优化
**移动语义** 是 C++11 引入的一种优化技术，用于避免不必要的拷贝操作。它通过引入 **右值引用**（`T&&`）来实现。右值引用允许我们区分出那些即将被销毁的对象，从而可以安全地“移动”它们的资源，而不是进行昂贵的拷贝。

**`std::move`** 是一个标准库函数，它将其参数转换为右值引用，从而启用移动语义。它本身并不移动任何东西，只是将左值转换为右值引用。

不同编译器在处理移动语义和右值引用时可能会有不同的策略和优化行为。
`g++` 通常会进行**返回值优化 (RVO)** 和**命名返回值优化 (NRVO)**，即使在没有显式使用 `std::move` 的情况下，也会尽量避免不必要的拷贝操作。因此，在很多情况下，`g++` 不会对不必要的 `std::move` 调用发出警告。

`clang++` 更严格地检查代码，并且会发出警告或错误，特别是在使用 `-Werror` 标志时。`clang++` 会检测到不必要的 `std::move` 调用，并发出 `-Wpessimizing-move` 警告，因为**这种调用会阻止编译器进行返回值优化 (RVO)，从而导致性能下降**。
例如：
```cpp
std::string Buffer::RetrieveAsString(int len){
    assert(read_index_ + len <= write_index_);
    // 这里的 `std::move` 是不必要的，因为 `PeekAsString(len)` 返回的是一个临时对象，编译器可以直接进行返回值优化 (RVO)，避免不必要的拷贝。
    // std::string ret = std::move(PeekAsString(len)); 
    std::string ret = PeekAsString(len);
    Retrieve(len);
    return ret;
}
```


### 容器

### 智能指针与内存管理