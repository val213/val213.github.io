---
title: JAVA语言程序设计基础
tags: 
	- Java

categories: 复习笔记
---
## overvew
教材：《java 语言程序设计》
参考书目：如下图

### lab
- lab1:java command line environment
- lab2:bank project 1
- lab3:bank project 2
- lab4:GUI
### 教学内容：1～5 章
### Java特性
- oriented object
- distributed
- simple
- multi-threaded
- multi-thread
- secure
- platform-independent(软硬件平台)一次编译，到处运行
### 关键terms解释 
- JVM：Java Visual Machine

#### hotspot？

>HotSpot 是一种 Java 虚拟机（Java Virtual Machine，JVM）的实现，它是由 Oracle（以前是 Sun Microsystems）开发的，并且在 Java 开发和运行时环境中广泛使用。HotSpot JVM 被认为是一种高性能的 JVM 实现，它主要关注在执行 Java 代码时的运行时性能优化。
>
>以下是一些 HotSpot JVM 的关键特点和功能：
>
>- 即时编译（Just-In-Time Compilation，JIT）： HotSpot JVM 采用了即时编译技术，它将 Java 字节码转换为本地机器代码，从而实现更高效的执行。这种编译策略可以避免传统解释器的性能瓶颈，因为本地机器代码可以更快地执行。
>
>- 热点代码识别： HotSpot JVM 使用了热点代码分析来识别频繁执行的代码块。一旦某段代码被识别为热点代码（也称为热点方法），HotSpot 会将其优化为本地机器代码，以提高执行效率。
>
>- 逃逸分析和内联优化： HotSpot JVM 还执行逃逸分析，以确定对象的生命周期及其在方法之间的传递。这有助于进行内联优化，从而减少方法调用的开销。
>
>- 垃圾回收： HotSpot JVM 实现了不同的垃圾回收器，例如串行回收器、并行回收器和 G1（Garbage-First）回收器等。这些回收器有助于管理内存并自动释放不再使用的对象，从而避免内存泄漏和提高应用性能。
>
>- 可扩展性： HotSpot JVM 被设计为可扩展的，允许开发人员根据应用程序的需求进行配置和调优。
>
>- 性能监测和调优工具： HotSpot JVM 提供了多种工具，如 VisualVM、jconsole 等，用于监测和分析应用程序的性能，以便进行调优和优化。

- JRE：Java Runtime Environment

- JDK：Java Development Kit

### 关于编写Java程序的IDE：
- 记事本 第一个Java程序一定要用记事本写
- netbeans 教材用的，估计已经过时了
- eclipse 现在非常庞大，java 程序非常耗内存
- intelliJ IDEA 业界使用最多，虽然收费但是学生邮箱可以每年续一次免费


### 其他关于Java你需要了解的事情

- java 的优势在服务端，优势不在桌面应用客户端什么的，所以写移动端客户端能不用java就不用java。
- 开发Java的公司：原先是sum，后来是oracle
- java 工程上有两个方向：服务端和安卓开发

#### 安卓开发：kotlin和Java
安卓开发的主力语言是 Java 和 Kotlin。在过去的几年中，Java 是安卓开发的主要语言，但随着 Kotlin 的逐渐流行，它也成为了越来越多安卓开发者的首选语言。
kotlin是一个Java系的语言，是一种现代的编程语言，最初由 JetBrains 公司开发。它是一种通用编程语言，被设计用于与 Java 互操作并在 Java 虚拟机（JVM）上运行。Kotlin 具有清晰的语法、丰富的功能以及与 Java 紧密集成的能力，使其成为了一种受欢迎的编程语言选择。kotlin在安卓开发、ios开发、服务端开发都有应用。

#### iOS 开发：swift 和 object c
iOS 开发的主力语言是 Swift。Swift 是由苹果公司开发的一种现代编程语言，专门用于开发 iOS、macOS、watchOS 和 tvOS 应用程序。自从推出以来，Swift 已经成为了 iOS 开发的首选语言，逐渐取代了之前用于 iOS 开发的 Objective-C
---

## Java的基本语法

### Java的comment
- `//` 这是普通的单行注释语法
- `/*……*/` 这是普通的多行注释语法。它用于将一段代码标记为注释，编译器会忽略这段注释中的所有内容。/* 开始注释，*/ 结束注释。这种注释不会被特殊工具解析或用于文档生成。
- `/**……*/` 这是文档注释的语法。它也可以用作多行注释，但它的主要目的是用于生成代码文档。这种注释可以包含一些特殊的标签，比如 @param、@return 等，用于描述方法、类、字段等的信息。这些标签可以由文档生成工具（如 javadoc）解析，从而生成详细的代码文档。

#### swagger API Document 业界的接口文档
Swagger 是一个用于设计、构建、文档化和使用 RESTful API 的开源框架工具集。它允许开发人员在不同的编程语言中定义和描述 API，然后生成互动式的 API 文档。Swagger 的主要目标是简化 API 开发和维护过程，提供一个标准的方法来描述和文档化 API，以及支持客户端和服务器端代码的自动生成。

主要功能和组件包括：

API 描述语言： Swagger 使用 YAML 或 JSON 格式的文档来定义 API 的结构、路径、参数、响应等。这些描述文件明确了每个 API 端点的细节，使开发人员能够理解和使用 API。

API 文档生成： 基于 API 描述文件，Swagger 能够自动生成互动式的 API 文档。这些文档不仅展示了 API 的结构，还提供了请求示例、响应示例、参数说明等信息，有助于开发人员和其他团队成员快速理解和使用 API。

客户端和服务器端代码生成： Swagger 可以根据 API 描述文件生成客户端和服务器端代码。这使得开发人员在不同编程语言中可以方便地调用 API 或实现服务端逻辑。

接口测试工具： Swagger UI 是一个用于交互式地测试 API 的工具，允许用户通过 Web 界面直接发送请求并查看响应，从而在开发和测试阶段快速验证 API 行为。

API 规范和验证： Swagger 定义了一套规范，可以用于验证 API 描述是否符合标准。这有助于保持 API 的一致性和规范性。

集成支持： Swagger 可以与许多框架和工具集成，例如 Spring Boot、Express、Django 等，使得在这些框架中使用 Swagger 更加容易。

### datatype
Java 的数据类型在很多方面与 C++ 的数据类型相似，但也存在一些不同之处。以下是 Java 中的一些常见数据类型，以及与 C++ 的不同之处：

基本数据类型：

Java 的基本数据类型包括整数类型（byte、short、int、long）、浮点数类型（float、double）、字符类型（char）和布尔类型（boolean）。
**与 C++ 相比，Java 的整数类型具有固定的大小，不受机器架构的影响。**例如，int 在 Java 中始终是 32 位，而在 C++ 中可能会根据机器的位数而变化。
**Java 的字符类型 char 使用 UTF-16 编码，用于表示 Unicode 字符。C++ 中的字符类型 char 则通常使用 ASCII 编码。**
引用数据类型：

**在 Java 中，对象和数组都是引用数据类型。**这意味着你在声明一个对象或数组时，实际上是在声明一个引用，指向实际的对象或数组实例。
在 C++ 中，对象和数组可以是值类型或引用类型，可以通过指针或引用来引用对象。**C++ 有更多的灵活性，但也需要更多的内存管理责任。**

- 字符串类型：

Java 使用 String 类来表示字符串，它是一个引用类型。
C++ 使用 std::string 类来表示字符串，也是一个对象。




- 自动装箱与拆箱：**primitive type->wrapper class**
  Java 提供了**自动装箱（autoboxing）和拆箱（unboxing）机制**，允许**基本数据类型和其对应的包装类之间进行隐式转换**。例如，int 可以自动转换为 Integer，反之亦然。在 C++ 中，没有类似的自动装箱和拆箱机制。需要手动使用构造函数和强制类型转换来进行类型之间的转换。
- byte（一个字节）,short,int,long
- float,double
- char(两个字节):unicode
- boolean：not int
### enum: special class,not int
### var: from Java 10,有编译器自动判别是什么类别

### literal value
- binary integer
### 常量
在 Java 中，并没有 const 关键字，而是使用 final 关键字来定义常量。通过将变量声明为 final，可以表示这个变量的值不可更改。常量的命名通常使用大写字母和下划线来表示。

### array
`int[]arr=new int[5]`
- java 的数组在 栈 中存放引用，本体在 堆 中。
- length filed
- 在 Java 中，数组是引用类型，其大小在创建后不能更改。
在 C++ 中，数组可以是值类型，也可以是引用类型。同时，C++ 提供了 std::vector 等动态数组的数据结构，允许在运行时动态调整大小。
---

### package
在Java中，package 是用于组织和管理类的命名空间的一种机制。它是一种用于将相关的类和接口分组在一起的方式，以便更好地组织和管理代码结构。通过将类放置在不同的包中，可以避免类名冲突，并且可以更清晰地表示类之间的关系和层次结构。

具体来说，一个 package 包含了一组相关的类、接口和子包。一个包可以包含多个类，但每个类只能属于一个包。package 在源代码中用关键字 package 来声明，通常位于源文件的顶部。例如，下面的代码片段定义了一个名为 com.example 的包：
```Java
// 定义位于 com.example.app 包中的 Main 类
package com.example.app;

public class Main {
    public static void main(String[] args) {
        // 应用程序的入口点
    }
}

```
### 总结

总体而言，Java 的数据类型在某些方面更加规范和受控，例如整数类型具有固定大小，引用数据类型的处理方式更为一致。而 C++ 则更加灵活，提供了更多的底层控制和指针操作的能力。选择使用哪种语言取决于项目需求和开发者的偏好。

---
## 第一个Java程序

创建一个记事本，重命名为‘halloworld.java’，然后输入以下代码：
```java
public class halloworld {
	public static void main(String[] args) {
		System.out.println("Hello, Java!");
	}
}
```

注意class name 和 file name 一致！

```
$C:\Users\username\Desktop>javac halloworld.java
$C:\Users\username\Desktop>java halloworld
halo,java!
```
`javac` 是 Java 开发工具包（JDK）中的编译器命令，用于将 Java 源代码文件（.java 文件）编译成 Java 字节码文件（.class 文件）
`java` 是 Java 虚拟机（JVM）的命令，用于执行 Java 字节码文件。


## intellij IDEA 开发第一个Java程序
### intellij IDEA 管理项目的层次
- Project
- Module
- Package
- Class
- Method

## different between java and C++


## java的垃圾回收机制
JVM是一种运行Java字节码的软件，它可以把Java代码转换成机器指令，从而实现跨平台的特性。JVM有自己的内存模型，其中最重要的部分就是堆（Heap），用于存放对象实例和数组。为了提高堆内存的分配和回收效率，JVM采用了分代收集算法（Generational Collector），即将堆内存划分为不同的区域，根据对象的生命周期和特点采用不同的回收策略。

永久代、年老代和年轻代是JVM堆内存的三个区域，它们之间的关系如下：

年轻代（Young Generation）：用于存放新创建的对象，一般占据堆内存的1/15。年轻代又分为一个Eden区和两个Survivor区，比例为8:1:1。每次新创建的对象都会放在Eden区，当Eden区满了时，就会触发一次Minor GC，清理无用的对象，并把有用的对象复制到Survivor区。如果对象经过多次Minor GC仍然存活，就会被晋升到老年代。
老年代（Old Generation）：用于存放长期存活的对象，一般占据堆内存的2/3。老年代中的对象通常是经过多次Minor GC后仍然存活下来的，或者是直接分配到老年代的大对象。当老年代空间不足时，就会触发一次Major GC或Full GC，清理无用的对象，并进行压缩整理。
永久代（Permanent Generation）：用于存放类信息、常量、方法等元数据，不属于堆内存，而是方法区（Method Area）的一种实现。永久代在JDK 8中已经被移除，取而代之的是元数据区（Metaspace），它不在虚拟机中，而是使用本地内存。这样可以避免永久代的内存溢出问题，并提高垃圾回收效率。

元数据区（Metaspace）是JDK 8引入的一个新概念，它是对方法区（Method Area）的一种实现。方法区是JVM规范中定义的一个逻辑概念，它是非堆（Non-Heap）内存中的一块区域，用于存放类信息、常量、静态变量、即时编译器编译后的代码等数据。不同厂商对方法区有不同的实现方式，例如HotSpot虚拟机使用永久代来实现方法区 。

元数据区与永久代最大的区别在于：

- 元数据区不在虚拟机中，而是使用本地内存。
- 元数据区没有固定大小限制，可以根据需要动态扩展。
- 元数据区只存放类信息，其他数据如常量池、静态变量等移动到Java堆中。
- 元数据区可以通过以下参数进行配置：
    -XX:MetaspaceSize：初始空间大小。
    -XX:MaxMetaspaceSize：最大空间大小，默认没有限制。

### java的可达性算法分析

Java的可达性算法分析是一种判断对象是否可以被垃圾回收的方法。它的基本思想是通过一些被称为GC Roots的对象作为起点，从这些节点开始向下搜索，搜索走过的路径被称为引用链，如果一个对象到GC Roots没有任何引用链相连，那么就说明该对象是不可达的，也就是可以被回收的12。

GC Roots是一些特殊的对象，它们是Java程序运行过程中必须存活的对象，例如：

虚拟机栈中引用的对象
方法区中类静态属性引用的对象
方法区中常量引用的对象
本地方法栈中JNI引用的对象3
可达性分析算法可以有效地解决循环引用的问题，即如果两个或多个对象互相引用，但是没有任何GC Roots和它们相连，那么它们也是不可达的，可以被回收4。

可达性分析算法是目前主流的Java虚拟机采用的垃圾回收算法，它可以与不同的回收策略和回收器结合使用，例如标记-清除、标记-整理、复制等5。


## java的反射机制
Java的反射机制是指在程序的运行状态中，可以构造任意一个类的对象，可以了解任意一个对象所属的类，可以了解任意一个类的成员变量和方法，可以调用任意一个对象的属性和方法。这种动态获取程序信息以及动态调用对象方法的功能称为Java语言的反射机制1。

反射机制的优点是可以增加程序的灵活性和扩展性，例如可以实现动态加载类，动态代理，框架开发等。反射机制的缺点是会降低程序的性能，增加资源的消耗，破坏类的封装性和安全性等

反射 (Reflection) 是Java的特征之一，它允许运行中的Java程序获取自身的信息，并且可以操作类或对象的内部属性。

通俗的来讲就是：通过反射机制，可以在运行时获得程序或程序集中每一个类型的成员和成员的信息。

注意这里的重点是：运行时，而不是编译时。我们常规情况下写的对象类型都是在编译期就确定下来的。而Java反射机制可以动态地创建对象并调用其属性，这样创建对象的方式便异常灵活了。

虽然通过反射可以动态的创建对象，增加了灵活性，但也不是什么地方都可用，还要考虑性能、编码量、安全、面向对象性等。

我们知道Java是面向对象的，如果通过反射机制去操作对象里面的属性或方法，一定程度上破坏了面向对象的特性。同时，通过反射机制还可以修改私有变量，也存在一定的安全性问题。

但这并不影响反射在实践中的应用，几乎各大框架多多少少都在使用Java反射机制。特别是主流的Spring框架。

功能及用途
Java反射主要提供以下功能：

在运行时判断任意一个对象所属的类；
在运行时构造任意一个类的对象；
在运行时判断任意一个类所具有的成员变量和方法（通过反射甚至可以调用private方法）；
在运行时调用任意一个对象的方法；



## 零碎的知识
### ==和equals的区别
基本数据类型（也称原始数据类型） ：byte,short,char,int,long,float,double,boolean。他们之间的比较，应用双等号（==）,比较的是他们的值。
引用数据类型：当他们用（==）进行比较的时候，比较的是他们在内存中的存放地址（确切的说，是堆内存地址）。
注：对于第二种类型，除非是同一个new出来的对象，他们的比较后的结果为true，否则比较后结果为false。因为每new一次，都会重新开辟堆内存空间。



### 2023年12月Java考试
#### 考试范围：
1234567，**9，10，11，12，13**，14，15

#### 考试题型：
试卷近三年低于5%查重率。
其他两个老师出，王亮明老师不出。两张卷子，题型有差别但是基本一致。
- 选择题：15道30分，覆盖范围很广。
- 判断题：单词量
- 简答题：读程序写结果
- 编程大题

各类题型，有老师合起来，有老师分开。
- 30 + 5 + 5×3 + 5×4 + 30。
- 30 + 10 + 3×10 + 30。
#### 划重点
- 基础java语法
- 面向对象
- 异常处理必考非常重要
- javafx一道基础的，主要考察事件相关的。UI里的组件如何读到数据？数据怎么处理？事件绑定。一道题，不多不难。
- 编程题文本文件读写相关必考，看课件/课本？例子。
- 字符串常规处理的方法，比如替换或者其他的，意思就是不考替换。跟其他数据的一些转换。注意一下看一下。
- 创建文件流、异常处理、循环读写这些会了就一半分
- 接口，cloneable和comparable接口，这两个接口。
- 第二第三个实验，用到的核心技术，考试都会涉及到。例如单例设计模式和接口的使用，异常处理。深浅拷贝等。如何实现？
- 自定义异常
- java跟C++差别大的多关注
- ascii码值可能会用到，出题老师觉得需要记一下
  
## chapter 1
### PPP面向过程编程 vs OOP面向对象编程
#### advantages of oop
- modularity:
- information-hiding:
- code reusing:
- pluggability and debugging ease:
### JVM、JRE、JDK
- JVM: Java Virtual Machine
- JRE: Java Runtime Environment
- JDK: Java Development Kit

### how to run a java program
- create source code(eg.welcome.java)
- compile source code(javac welcome.java)->bytecode(eg.welcome.class)
- run bytecode（eg.java welcome）
- result:"welcome to java!"

### platform-independent program
the result of a compiled java technology rogram is platform-independent bytecodes,which can be executed by any system that implements the java virtual machine.

### anatomy of a java program
- class name
- main method
- statements
- statement terminator
- reserved words
- comments
- blocks


## chapter 4 mathematical functions, characters, and strings
### math class
### ASCII code
8位编码表。Unicode码包含ASCII码，其中‘u0000’to‘u007F’是128个ASCII码。
一些常用字符的 ASCII 码值如下所示：
- '0'-'9':48-57 \u0030-\u0039
- 'A'-'Z':65-90 \u0041-\u005A
- 'a'-'z':97-122 \u0061-\u007A

#### casting between char and numeric types
char类型数据可以转换成任意一种数值类型，反之亦然。将整数转换为char类型数据的时候，**只用到该数据的低16位**，其余部分被忽略
#### the string type
the string type is not a primitiv type. it is known as  a reference type(引用类型).any java class can be used as a reference type for a variable.
引用类型定义引用变量引用内容为'halo java'的字符串对象

##### simple methods for string objects
- length()
- charAt(int index)
- toLowerCase()
- toUpperCase()
- trim():return a new string with the leading and trailing spaces removed?

#### instance method and static method
- a static method can be invoked without using an object.all the methodsdefined in the math class are static methods.
- an instance method can be invoked only through an object of the class in which the method is defined.
- 实例方法可以调用实例方法和静态方法，以及访问实例数据域和静态数据域；
- 静态方法只能调用静态方法和访问静态数据域，不能调用实例方法和访问实例数据域。
#### comparing strings
字符串比较：操作符==只能检测两个字符串是否存储在同一个位置（指向同一个对象），而不能检测两个字符串是否相等。要检测两个字符串是否相等，必须使用equals或者comparableTo方法。
- comparableTo方法返回一个整数，如果字符串相等，返回0；如果字符串不相等，返回一个s1和s2从左到右第一个不同字符之间的ASCII码差值。
- 如果字符串相等，equals方法返回true；如果字符串不相等，equals方法返回false。

#### conversion between strings and numbers
- 可以将数值型字符串转换为数值，使用`Integer.parseInt()`、`Double.parseDouble()`等方法。如果字符串不能转换为数值，会抛出NumberFormatException异常。
- 将数值转换为字符串，只需要使用字符串连接操作符+即可。例如，`String s = "" + 5`;将整数5转换为字符串"5"。或者`string s1 = String.valueOf(s)`；也可以使用`Integer.toString()`、`Double.toString()`等方法将数值转换为字符串。

#### repalce and split methods
#### replace string
```java
String s1 = "Welcome to Java";
String s2 = s1.replace('o', 'T');
System.out.println(s2);
```
display : WelcTme tT Java
##### split string
```java
String[] tokens = "Java#HTML#Perl".split("#");
for (int i = 0; i < tokens.length; i++) 
  System.out.print(tokens[i] + " ");
```
display : Java HTML Perl


## chaper 7 single-dimensional arrays
### the Array.sort method
- `java.util.Arrays.sort(array)`
- `java.util.Arrays.sort(array,fromIndex,toIndex)`

## chapter 9 objects and classes
常量应该被声明为`final static`
### array of objects
array of objects is an array of object references variables. it is not an array of objects.
`circle[] circleArray = new circle[10]`
### immutable objects and classes不可变对象和类
if the contents of an objects cannot be changed after it is created, the object is called an immutable object. the class of an immutable object is called an immutable class.eg.String类
#### what class is immutable?
for a class to be immutable, it must mark all data fields private and provide no mutator methods(no accessor methods that would return a reference to a mutable data field object). (提供一个get方法返回数据域的值；提供一个set方法为数据域设置新值。这两者称为accessor mathods 和 mutator methods)

## chapter  10
### wrapper classes包装类
- Java中许多方法需要将对象作为参数，可使用java api中的包装类将基本数据结构类型包装成对象。例如将int类型的数据包装成Integer对象，将double类型的数据包装成Double对象等。包装类的对象可以作为参数传递给方法，也可以作为方法的返回值。
- Java在java.lang包中提供了8个包装类，分别对应8种基本数据类型。这8个包装类分别是：Byte、Short、Integer、Long、Float、Double、Character和Boolean。
#### automatic conversion between primitive types and wrapper classes types
- 自动装箱：将基本数据类型转换为包装类类型。例如，`Integer i = 5;`将整数5自动转换为Integer对象;`Integer[] intArray = {1, 2, 3, 4, 5};`将整数1~5自动转换为Integer对象并存储在数组中。
- 自动拆箱：将包装类类型转换为基本数据类型。例如，`int i = new Integer(5);`将Integer对象转换为整数5;`System.out.println(intArray[0]+intArray[1]);`将Integer对象转换为整数1和2，然后进行加法运算。

#### StringBuilder class and StringBuffer class
- Java中的String类是不可变类，即String类的对象一旦创建，就不能修改。如果需要修改字符串，只能创建一个新的字符串对象。这样会导致大量的字符串对象被创建，占用大量的内存空间，降低程序的执行效率。为了解决这个问题，Java提供了两个可变字符串类：StringBuilder和StringBuffer。这两个类的对象可以修改，而且修改后不会创建新的对象，因此效率更高。
```java
StringBuilder sb = new StringBuilder("Welcome");
sb.append(" to Java");
sb.insert(0, "hello ");
sb.delete(8, 11);
sb.reverse();
System.out.println(sb);
```

> StringBuilder和StringBuffer类的对象都是可变的字符串序列，它们的方法基本相同，主要区别在于StringBuilder类的方法不是线程安全的，而StringBuffer类的方法是线程安全的。因此，如果需要在多线程环境下使用可变字符串，应该使用StringBuffer类。

## chapter 11 inheritance and polymorphism
### Superclass and Subclass
- A subclass inherits all the members (fields, methods, and nested classes) from its superclass. Constructors are not members, so they are not inherited by subclasses, but the constructor of the superclass can be invoked from the subclass.

### using the super keyword
the super keyword refers to the superclass of the class in which the keyword appears. it is used to (access superclass members,?) invoke superclass constructors, and invoke superclass methods that are overridden by subclass methods.

- 不同于于属性和普通方法，父类的构造方法不会被子类继承，他们只能使用关键字super来调用父类的构造方法。
- super()必须是子类构造方法的第一条语句，否则编译出错。这是显式调用父类构造方法的唯一方式，如果没有显式调用，系统会自动调用父类的无参构造方法。
- invoking a superclass constructor's name in a subclass causes a syntax error.

#### constructor chaining
构造方法链
#### overriding methods in the superclass
##### overriding vs overloading
- 重载意味着使用同样的名字但不同的签名来定义多个方法
- 重写意味着在子类中提供一个对方法新的实现
- 方法重写发生在通过继承而相关的不同类中；方法重载可以发生在同一个类中也可以发生在继承的子类中 

### the object class and its methods
- every class in java is descended from the java.lang.Object class. if a class does not extend another class, it is implicitly a subclass of Object.
```java
public class Circle {
    // ...
}
```
equivalent to
```java
public class Circle extends Object {
    // ...
}
```
#### the toString method in the object class
- the toString method returns a string representation of an object. the default toString method in the Object class returns a string consisting of the name of the class of which the object is an instance, the at-sign character `@`, and the unsigned hexadecimal representation of the hash code of the object.
### polymorphism
#### dynamic binding
Which implementation is used will be determined dynamically by the Java Virtual Machine at runtime. This capability is known as dynamic binding.

 If o invokes a method p, **the JVM searches the implementation for the method p** in C 1 , C 2 , ..., C n-1
and C n , in this order, **until it is found.**
##### method matching vs binding
两个不同的概念。
- 方法匹配：在编译时刻，编译器根据方法名和参数列表选择调用哪个方法。
- 方法绑定：在运行时刻，虚拟机根据对象的实际类型选择调用哪个方法。


#### casting objects
除了用casting operator来转换变量的基本数据类型，Casting can also be used to convert an object of one class type to another within an inheritance hierarchy.
- 一个对象可以被强制转换为它的**子类类型**，这称为向下转型。例如，`Object object = new Circle();`，将Circle对象转换为Object对象，这称为向上转型，这种转换也称为隐式转换。；
- `Circle circle = (Circle)object;`，将Object对象转换为Circle对象，这称为向下转型。

#### the instanceof operator
Use the instanceof operator to test whether an object is an
instance of a class：
```java
object o = new Circle();
if (o instanceof Circle) {
    System.out.println("The circle diameter is " + ((Circle) o).getDiameter());
    // ...
}
```

### the ArrayList class
Java provides the ArrayList class that can be used to **store an unlimited number of objects.**

存储在ArrayList中的元素**必须是一种对象**，不能使用诸如int的基本数据类型来代替一个泛型类型。但是，可以创建一个存储Integer对象的ArrayList
### 访问权限summary
|Modifier on members in a class|Access from the same class|Access from the same package|Access from a subclass|Access from a different package|
|:---:|:---:|:---:|:---:|:---:|
|public|Yes|Yes|Yes|Yes|
|protected|Yes|Yes|Yes|No|
|default|Yes|Yes|No|No|
|private|Yes|No|No|No|

## chapter 12 Exception handling and text I/O
### Exception handling 
#### checked exceptions vs. unchecked exceptions
- RuntimeExeption、Error and their subclasses are unchecked exceptions（免检）. 
- All other exceptions are checked exceptions（必检，meaning that thecompiler forces the programmer to check and deal with the exceptions，必检异常意味着编译器会强制程序员检查并通过try-catch块处理它们，或者在方法头进行声明。）.
#### declaring exceptions
Every method must state the types of checked exceptions it might throw. This is known as declaring exceptions.
```java
public void myMethod() throws IOException,
OtherException1, …, OtherExceptionN
```
### Throwing exceptions
#### try-throw-catch
在执行完catch块之后，程序控制不返回到throw语句；而是执行catch块之后的下一条语句

#### Rethrowing Exceptions
如果异常处理器不能处理一个异常，或者只是简单地想让调用者注意到该异常，JAVA 允许该异常处理器重新抛出异常。
```java
try {
statements;
}
catch(TheException ex) {
perform operations before exits;
throw ex;
}
```
语句 `throw ex` 重新抛出异常给调用者，以便调用者的其他处理器获得处理异常`ex`

#### The  finally Clause
无论异常是否产生，finally 子句总会被执行
```java
try {
statements;
}
catch(TheException ex) {
handling ex;
}
finally {
finalStatements;
}
```
#### Defining Custom Exception Classes
```java
public class MyException extends Exception {
public MyException() {
super();
}
public MyException(String message) {
super(message);
}
}
```
### Text IO
>A File object encapsulates the properties of a file or a path, but does not contain the methods for reading/writing data from/to a file.
>
> In order to perform I/O, you need to create objects using
appropriate Java I/O classes. The objects contain the methods for reading/writing data from/to a file.
>
>This section introduces how to read/write strings and
numeric values from/to a text file using the Scanner（读
数据） and PrintWriter classes （写数据）.

#### printwriter
调用printWriter的构造方法创建一个新文件，调用该构造方法可能会抛出一个I/O异常，Java强制要求要编写代码来处理这类异常，因此，简单起见只需在方法头声明中申明throws IOException （第2行）
```java
public class WriteData {
public static void main(String[] args) throws java.io.IOException {
// Create a File object
File file = new File("scores.txt");
// Create a PrintWriter object
PrintWriter output = new PrintWriter(file);
// Write formatted output to the file
output.print("John T Smith ");
output.println(90);
output.print("Eric K Jones ");
output.println(85);
// Close the file,必须使用close()方法关闭文件。如果忘记写，数据就不能正确的保存在文件中
output.close();
}
}
```
#### Try-with-resources
Programmers often forget to close the file. JDK 7 provides
the followings new try-with-resources syntax that automatically closes the files.
````java
try (declare and create resources) {
Use the resource to process the file;
}
````

## chapter 13 abstract classes and interfaces
### abstract classes and abstract methods
#### Interfaces vs. Abstract Classes
- In an interface, the data must be **constants**; an abstract class can have **all types of data**.
- Each method in an interface **has only a signature without implementation**; an abstract class **can have concrete methods**.


All classes share a single root, the Object class, **but there is no single root for interfaces**. Like a class, an interface also defines a type. A variable of an interface type can reference any instance of the class that implements the interface. **If a class extends an interface, this interface plays the same role as a superclass**. You can use an interface as a data type of an interface type to its subclass, and vice versa. and cast a variable

#### define an interface
To distinguish an interface from a class, Java uses the
following syntax to define an interface:
```java
public interface InterfaceName {
constant declarations;
abstract method signatures;
}
```
- 一个接口可以继承多个接口；例如：interface a extends cls1,cls2;
- 一个类可以实现多个接口；例如：class b implements face1 , face2；
- 一个类只能继承一个类，这就是JAVA的继承特点;
- interfaces supports multiple inheritance

### the comparable interface
Comparable 接口定义了compareTo 方法，用于比较对象
```java
// This interface is defined in
// java.lang package
package java.lang;
public interface Comparable<E> {
public int compareTo(E o);
}
```
Comparable接口是一个**范型接口**，在实现该接口时，范型类型E被替换成一种具体的类型。compareTo 方法判断这个对象相对于给定对象o 的顺序，并且当这个对象小于、等于或大于给定对象o 时，分别返回负整数、0或者正整数。
#### Generic sort Method
如果对象是Comparable接口的实例，Java API中的java.util.Arrays.sort(Object[])方法可以使用compareTo方法对数组中的对象进行比较和排序。
### the cloneable interface
Cloneable Interface给出了一个可克隆的对象。经常会出现需要创建一个对象拷贝的情况。为了实现这个目的，需要使用 clone 方法并理解 Cloneable接口。接口包括常量和抽象方法，但是 Cloneable 接口是一个特殊情况, 它是空的。
>**一个方法体为空的接口称为标记接口（marker interface）**。它用来表示一个类拥有某些希望具有的特征。

A class that implements the Cloneable interface is marked cloneable, and its objects can be cloned using the clone() method defined in the Object class. （实现Cloneable接口的类标记为可克隆的，而且它的对象可以使用在*object类中定义的clone()方法*克隆）
```java
package java.lang;
public interface Cloneable {
}
Object类定义了一个clone方法，其方法头是：

```java
protected native Object clone() throws
CloneNotSupportedException;
```

- 关键字`native`表示这个方法不是用Java写的，但它是在`JVM`中针对
本地平台实现的。
- 关键字`protected`限定方法**只能在同一个包中或其子类中访问**。*通常其他类必须重写该方法并将它的可见性修改为public，这样重写的clone方法可以在任何一个包中使用*
- Object类的clone方法完成了克隆对象的任务，实现浅拷贝：将原始对象的每个数据域复制给目标对象。如果一个数据域是基本类型，复制的就是它的值；如果一个数据域是对象，复制的就是其引用。。

- 所以综上，一个对象能被克隆，通常需满足如下2个条件
1. 实现Cloneable接口，使拷贝合法，避免抛出CloneNotSupportedException
2. 重写clone方法

### 深浅拷贝
- Shallow Copy（浅拷贝）是指拷贝对象时仅仅拷贝对象本身，包括对象中的基本变量，而不拷贝对象包含的引用指向的对象。Object类定义的clone方法为浅拷贝。最终拷贝出来，原始对象与拷贝对象共享对象包含的引用指向的对象。
- Deep Copy（深拷贝）不仅拷贝对象本身，而且拷贝对象包含的引用指向的所有对象。最终拷贝出来的对象与原始对象没有任何关联，变量中的对象是独立的，但是基本变量是相同的。**深拷贝需要自己实现。**
- 注意拷贝前后的两个对象是不同的，这一点深浅拷贝都一样。主要区别是浅拷贝的两个对象共享对象包含的引用指向的对象，深拷贝的两个对象不共享任何对象。
## chapter 14 JavaFX basics
### basic strucure of JavaFX
- Application（每个JavaFX应用程序定义在一个继承自`javafx.application.Application`的类中）
- Override the start(Stage) method（重写javafx.application.Application类start方法）
- Stage, Scene, and Nodes
  - Stage（舞台）对象是**一个窗体，它用于显示场景**。当应用程序启动的时候，一个称为主舞台的对象（`primaryStage`）由**JVM自动创建并传递给Start方法**
  - Scene（场景）对象可以在Stage中展示。一个Scene对象可以使用构造方法`Scene(node,width,height)`创建，该方法指定场景的宽度和高度，并将结点置于场景中。
  - Nodes（结点）：面板、组、控件以及形状都是结点。Button（按钮）对象是结点的一种，可以置于一个Scene对象中

```java
import javafx.application.Application;//该类定义了JavaFX应用程序的基本结构
import javafx.scene.Scene;//该类是JavaFX应用程序的场景类
import javafx.scene.control.Button;//该类是JavaFX应用程序的按钮类
import javafx.stage.Stage;//该类是JavaFX应用程序的舞台类
public class MyJavaFX extends Application {
@Override // Override the start method in the Application class
public void start(Stage primaryStage) {
// Create a scene and place a button in the scene
Button btOK = new Button("OK");
Scene scene = new Scene(btOK, 200, 250);
primaryStage.setTitle("MyJavaFX"); // Set the stage title
primaryStage.setScene(scene); // Place the scene in the stage
primaryStage.show(); // Display the stage
}
public static void main(String[] args) {
Application.launch(args);//launch方法是一个定义在Application类中的静态方法，用于启动一个独立的JavaFX应用
}
}
```
在命令行中不需要main方法，直接运行`java MyJavaFX`即可。只有在JavaFX支持有限的IDE中才需要main方法。
### VBox
就是一个垂直列节点布局控件。
- 对比FlowPane，FlowPane可以把子结点布局在多行或多列中，而Hbox或Vbox只能把子结点布局在一行或一列中。
- setMargin()方法用于将结点加入Vbox或其他布局控件的时候设置结点的外边距
## chapter 15 event-driven programming and animation
### Java Event Delegation Model(基于委派的模型)
Java采用基于委派的模型（the delegation model）进行事件的处理：源对象触发一个事件，然后一个对该事件感兴趣的对象处理它。后者称为事件处理器或事件监听器。

如果**一个对象**要成为源对象的事件处理器，需要满足如下2个条件：
1. 一个监听器对象是**对应的事件处理接口的实例**。JavaFX为事件T定义了一个统
一的处理器接口`EventHandler<T extends Event>`,该处理器接口包含`handle(T e)`方法
用于处理事件。
2. 该对象通过调用`source.setOnXEventType(listener)`进行事件处理器注册
### Inner Classes
Inner class: A class is a member of another class.
- Advantages: 
  - In some applications, you can use an inner class to make programs simple.
  - An inner class can reference the data and methods defined in the outer class in which it nests, so you do not need to pass the reference of the outer class to the constructor of the inner class.
  - Inner classes can make programs simple and concise.


An inner class supports the work of its containing outer class and is compiled into a class named `OuterClassName$InnerClassName.class`. For example, the inner class `InnerClass` in `OuterClass` is compiled into `OuterClass$InnerClass.class`.

#### Anonymous Inner Classes(匿名内部类)
Inner class listeners can be shortened using anonymous inner classes. An anonymous inner class is **an inner class without a name**. It **combines declaring an inner class and creating an instance of the class in one step.**

An anonymous inner class is declared as follows:
```java
new SuperClassName/InterfaceName() {
// Implement or override methods in superclass or interface
// Other methods if necessary
}
```
An anonymous inner class is compiled into a class named `OuterClassName$n.class`. For example, if the outer class Test has two anonymous inner classes, these two classes are compiled into `Test$1.class` and `Test$2.class`.

### Simplifying Event Handing Using Lambda Expressions
Lambda expression is a new feature in Java 8. Lambda expressions can be viewed as an anonymous method with a concise syntax. For example, the following code in (a) can be greatly simplified using a lambda expression in (b) in
three lines.
```java
// (a) Without lambda expression
btOK.setOnAction(new EventHandler<ActionEvent>() {
@Override // Override the handle method
public void handle(ActionEvent e) {
System.out.println("OK button clicked");
}
});
// (b) With lambda expression
btOK.setOnAction(e -> System.out.println("OK button clicked"));
```
#### Basic Syntax for a Lambda Expression
The basic syntax for a lambda expression is either `(type1 param1, type2 param2, ...) -> expression` or `(type1 param1, type2 param2, ...) -> { statements; }`

The data type for a parameter may be explicitly declared or implicitly inferred by the compiler. The parentheses(圆括号) can be omitted if there is only one parameter without an explicit data type.

### 单例模式的实现
- 懒汉式，线程不安全
```java
public class Singleton {
private static Singleton instance;
private Singleton() {
}
public static Singleton getInstance() {
if (instance == null)
instance = new Singleton();
return instance;
}
}
```
- 饿汉式，线程不安全
```java
public class Singleton {
private static Singleton instance = new Singleton();
private Singleton() {
}
public static Singleton getInstance() {
return instance;
}
}
```
- 懒汉式，线程安全
```java
public class Singleton {
private static Singleton instance;
private Singleton() {
}
public static synchronized Singleton getInstance() {
if (instance == null)
instance = new Singleton();
return instance;
}
}
```