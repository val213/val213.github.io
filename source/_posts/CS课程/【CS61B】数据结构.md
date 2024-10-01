---
title: 【UCB】CS61B数据结构笔记
tags: 
	- data structure
categories: 复习笔记
---

CS61B-sp21的课程网站：https://sp21.datastructur.es/
### Static vs. Non-Static Methods
在Java中，**static方法（也成为class method）**和**non-static方法（也称为instance方法）**之间有几个关键区别：

- 调用方式：

Static方法：**可以通过类名直接调用，不需要创建类的实例**。例如：ClassName.staticMethod()。

Non-Static方法：**需要通过创建类的实例（对象）来调用。**例如：ObjectReference.nonStaticMethod()。

- 内存分配：

Static方法：**在类加载时分配内存，并与类的类对象关联，不依赖于类的实例。这意味着只有一份静态方法的内存副本，无论创建多少类的实例。**

Non-Static方法：**每当创建一个类的实例时，都会为该实例分配一份非静态方法的内存副本。这意味着每个对象都有自己的非静态方法。**
- 访问实例变量和方法：

Static方法：**不能直接访问或引用非静态成员（实例变量和非静态方法），因为它们不依赖于特定的对象实例。**

Non-Static方法：**可以直接访问类的静态成员和非静态成员，因为它们依赖于对象实例。**
- 生命周期：

Static方法：**生命周期与类加载和卸载相同**，它们存在于整个应用程序的生命周期中。

Non-Static方法：**生命周期取决于对象实例**，当没有引用指向该对象时，它们可以被垃圾回收。
- 适用场景：

Static方法：**通常用于实用程序方法、工具类方法、常量等不需要依赖于对象状态的操作**。

Non-Static方法：**用于操作对象的状态和属性，通常包括对象的行为和操作**。


### public static void main(String[] args)
在Java中，main 函数总是被声明为 static 的，主要是因为 Java 的程序入口点是类级别的，而不是对象级别的。这意味着在程序启动时，不需要创建类的实例就可以执行 main 函数。
和C++一样，Java一个项目中也只会有一个main函数，但是这个main函数也是写在class里的。但是一个项目里可以拥有很多个class，所以这个特殊的class名称就必须和文件名一致，这样才能被JVM找到。

#### Command Line Arguments
Since main is called by the Java interpreter itself rather than another Java class, it is the interpreter's job to supply these arguments. They refer usually to the command line arguments. For example, consider the program ArgsDemo below:

public class ArgsDemo {
    public static void main(String[] args) {
        System.out.println(args[0]);
    }
}
This program prints out the 0th command line argument, e.g.

>$ java ArgsDemo these are command line arguments
>these

### 关于array
```java
public class DogArrayDemo {
    public static void main(String[] args) {
        /* Create an array of two dogs. */
        Dog[] dogs = new Dog[2];
        dogs[0] = new Dog(8);
        dogs[1] = new Dog(20);

        /* Yipping will result, since dogs[0] has weight 8. */
        dogs[0].makeNoise();
    }
}
```

### test
Ad Hoc Testing和JUnit都是与软件测试相关的概念和工具，但它们有不同的含义和用途。

#### Ad Hoc Testing（临时测试）：

含义：Ad Hoc Testing，也称为临时测试，是一种测试方法，通常用于发现软件中的缺陷、问题或异常，而不是按照事先定义的测试计划或用例来执行测试。这种测试是基于测试人员的直觉、经验和判断力，而不是预先计划的测试步骤。

用途：Ad Hoc Testing通常用于以下情况：

发现和识别未知的问题。
在紧急情况下进行测试，例如修复了一个重要的bug并需要验证修复是否成功。
探索应用程序的功能，了解其行为和潜在问题。
特点：Ad Hoc Testing通常不是结构化的，测试人员根据自己的理解和判断进行测试。它不依赖于预定义的测试用例，而是依赖于测试人员的发现和反馈。

#### JUnit：

含义：JUnit是一个Java编程语言的测试框架，用于编写和运行单元测试。它提供了一种结构化的方法来测试Java代码，使开发人员能够编写测试用例并自动运行它们，以验证代码的正确性。

用途：JUnit主要用于自动化单元测试，可以用于测试Java类和方法的功能。它有助于确保代码在不断开发和维护的过程中保持正确和可靠。

特点：JUnit测试是结构化的，通常包括设置测试环境、运行测试用例、断言预期结果等步骤。JUnit提供了注解和断言，使测试编写更容易和可读性更高。JUnit测试可以轻松集成到持续集成（CI）工具中，以确保每次代码更改后都能进行自动测试。

总之，Ad Hoc Testing是一种非结构化的测试方法，用于发现软件问题，而JUnit是一个专门用于自动化单元测试的框架，用于验证代码的正确性和可靠性。在软件开发过程中，通常会结合使用这两种方法，Ad Hoc Testing用于发现问题，JUnit用于确保代码的质量。


### SLList(singly linked list),DLList(double linked list) and AList(array list)

#### 嵌套类
目前，我们有两个 .java 文件：IntNode 和 SLList。 然而，IntNode 实际上只是 SLList 故事中的一个配角。

针对这种情况，Java 为我们提供了将类声明嵌入到另一个类声明中的能力。 语法简单直观：

```java
public class SLList {
       public class IntNode {
            public int item;
            public IntNode next;
            public IntNode(int i, IntNode n) {
                item = i;
                next = n;
            }
       }

       private IntNode first; 

       public SLList(int x) {
           first = new IntNode(x, null);
       } 
...
```
>Having a nested class has no meaningful effect on code performance, and is simply a tool for keeping code organized. 

If the nested class has no need to use any of the instance methods or variables of SLList, you may declare the nested class static, as follows. Declaring a nested class as static means that methods inside the static class can not access any of the members of the enclosing class. In this case, it means that no method in IntNode would be able to access 

## package
A package is a collection of Java classes that all work together towards some common goal.Using packages to separate logic and functionality. 

When creating a package, we specify that code is part of a package by specifying the package name at the top of the file using the package keyword. For example, if we wanted to declare that a file is part of the `deque` package, we’d add the following line to the top of the file.
```java
package deque;
```

We’ve already seen packages in CS 61B without knowing it. For example, `org.junit` is a package that contains various classes useful for testing, including our familiar Assert class, which contains useful static methods like `assertEquals`. In other words, when we saw org.junit.Assert.assertEquals, the `org.junit` was the package name, Assert was the class name, and assertEquals was the method name. We call `org.junit.Assert.assertEquals` the “canonical name” of the method, and we call `assertEquals` the “simple name” of the method.

When creating a package, we specify that code is part of a package by specifying the package name at the top of the file using the package keyword. For example, if we wanted to declare that a file is part of the deque package, we’d add the following line to the top of the file.

If a programmer wanted to use a class or method from our deque package, they would have to either use the full canonical name, e.g. deque.ArrayDeque, or alternately use import deque.ArrayDeque, at which point they could just use the simple name ArrayDeque. So import statements just allow you to use the simple name of a class/method.

**Typically, package names are the internet address of the entity writing the code, but backwards. **For example, **the JUnit library is hosted at "junit.org", so the package is called `org.junit`.**