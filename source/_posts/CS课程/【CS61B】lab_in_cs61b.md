---
title: 【UCB】lab and proj in CS61B-sp21
tags: 
	- data structure
	- Java
categories: 知识分享
---

### before coding and learn
> **Q1:** 在本地clone的仓库代码为什么不能运行？
> 
> **A1:** 一种可能的原因是您的项目资源目录没有指定，导致项目可以启动成功，但是在访问时无法访问，并且无报错信息。解决办法是右键资源目录，选择mark Directory as -> Resource Root。


>**TIPS:** 把一个文件夹设置为excluded的意思是指让IntelliJ IDEA忽略该文件夹下的所有文件，不对它们进行索引、检查、运行或调试。这样可以提高IntelliJ IDEA的性能，避免不必要的错误提示或警告。
>把一个文件夹设置为excluded的作用是指让IntelliJ IDEA只关注项目中真正需要的源代码，而不是一些无关的文件或目录。例如，一些虚拟环境、缓存、日志、测试数据等文件夹通常可以被设置为excluded，因为它们不是项目的一部分，也不需要被IntelliJ IDEA识别或执行。
>把一个文件夹设置为excluded的方法是指在IntelliJ IDEA中右键点击该文件夹，选择Mark Directory as -> Excluded。如果想要取消excluded状态，可以右键点击该文件夹，选择Mark Directory as -> Cancel Excluded4。

> **Q2:** 什么是.jav包？
>
> **A2:**.jar文件是一种Java的软件包文件格式，它可以将多个Java类文件、相关的元数据和资源文件（如文本、图片等）压缩到一个文件中，以便分发和使用。.jar文件的扩展名表示它是一个Java归档文件，它基于ZIP格式构建，可以用ZIP工具解压或查看。.jar文件中还包含了一个特殊的文件，叫做Manifest文件，它用来定义扩展或打包相关的数据，例如指定程序的主类或者签名信息。.jar文件可以用于发布和使用类库、作为应用程序和扩展的构建单元、作为组件、applet或插件程序的部署单位等。

>**Q3:** sp21的project0，也就是2048那个项目时候遇到这样的情况：运行project0的起始代码的时候报错”程序包`ucb.gui2`不存在“。在网上找了很久都没有具体针对这个问题的解决方法，原仓库也找不到哪里包含这个包……刚刚接触java和IDEA，如果有人能告诉我怎么办的话非常感谢！

>**A3:** 试了一下把仓库里别的jar也全都放进`/pro0`的`/javalib`下了还是不行
>我也试过不clone，直接下载zip，也是一样。也试过关闭maven，报错倒是不一样了，但是还是说找不到包，这次是`org.junit`了
>但是我在项目文件目录下都有见到名字是ucb或者是junit的jar文件
>这个起始代码的仓库里包含很多不同lab和project的文件夹，有一些文件夹包含了maven文件，导入idea的时候能够自动识别为maven项目帮我导入相应的依赖，但是呢，恰好不知道为什么project0这个文件夹里就没有maven文件，所以虽然文件夹内有所需要的依赖比如ucb.gui2，但是他就需要我手动导入
>这也是为什么我之前尝试关闭maven功能之后会有不一样的报错。因为别的文件夹原本maven帮我导入的包，我得手动导入了
>要解决这个问题其实很简单，构建完能构建的maven项目之后，只要选中project0目录下的放了jar程序包的文件夹，右键添加为项目的库就可以了
>而且还得整个文件夹（`\pro0\javalib`）添加为库才行，单个添加jar文件（`\pro0\javalib\ucb`或者`\pro0\javalib\ucb\gui2`）为库还是会报错


### proj0-2048
官方项目文档：https://sp21.datastructur.es/materials/proj/proj0/proj0
>**Q1:** 为什么采用转换视角的方式处理多种方向？
>
>**A1:** 采用转换视角的方式处理多种方向有几个重要的原因：
>
>- 统一性：通过采用转换视角的方式，可以使游戏逻辑在多个方向上具有统一性。这意味着无论游戏板是以哪个方向呈现的，游戏的规则和逻辑都可以保持一致。>这简化了代码的实现和维护，因为无需为每个可能的方向编写不同的逻辑。
>
>- 灵活性：通过转换视角，可以轻松地适应不同的方向。这意味着游戏可以在不同的设备上以不同的方向进行游玩，而无需修改游戏逻辑。这增加了游戏的灵活性和可玩性。
>
>- 可扩展性：如果以后要添加更多的游戏方向或规则变化，采用转换视角的方式更容易扩展。只需调整视角转换的代码，而不需要大规模修改游戏逻辑。
>
>- 简化移动和合并操作：转换视角可以简化移动和合并操作的实现。在不同方向上，移动和合并的方向也会不同，但通过转换视角，可以在代码中保持相对一致的移动和合并逻辑，只需根据新视角的坐标计算来调整。
>
>总之，采用转换视角的方式能够提高游戏的可维护性、灵活性和可扩展性，使游戏适用于多种不同的方向和设备。这是一个通用的设计原则，可应用于处理多种方向性的应用程序和游戏。


### lab2
Q1：

>报错：java: 错误: 不支持发行版本 5

这个问题是由于jdk版本和module版本不匹配导致的。

#### debug exercise2：
**方法1**

修改project structure中对应的module版本，将其由5改为和自己的jdk版本一致，同时修改file->setting中的`build,execution,deployment`->`compiler`->`Java compiler`中对应module的target bytecode version，也要和jdk版本一致。这样module就可以正常构建运行了。

**方法2**

但是这种方法只是暂时的，下一次更新module的时候又会变回5，所以还是要修改module的`pom.xml`文件，将其中的`<source>5</source>`和`<target>5</target>`改为和jdk版本一致的版本，这样就可以永久解决这个问题了。但是这个方法在构建新project的时候也会失效。

**方法3一劳永逸**
对maven下手。在 maven地址\conf\setting.xml中设置默认jdk版本。
```xml
  <profile>
      <id>development</id>
          <activation>
            <jdk>你的jdk版本</jdk>
            <activeByDefault>true</activeByDefault>
          </activation>
      <properties>
            <maven.compiler.source>你的jdk版本</maven.compiler.source>
            <maven.compiler.target>你的jdk版本</maven.compiler.target>
            <maven.compiler.compilerVersion>你的jdk版本</maven.compiler.compilerVersion>
      </properties>
 </profile>

```

另外补充一句，这个lab的javalib我是从proj1里复制过来设置为library的，不然缺库跑不起来。

这个lab的目的是计算出两个数组每个对应索引上的最大值的和。我们的任务是找出两个错误并修正，注意不要在调试的时候进入add和max这两个函数因为“If you're stepping into this function, click the step out button because you're not going to learn anything.”lab的目的是让我们在其他函数的步进调试中确定是否max等函数有bug。如果max有bug就完全替换他。

使用断点调试和步进调试，可以很快找到错误所在。
一个是计算最大值的时候，很容易发现选的都是较小值。一个是计算和的时候，出现了重复计算。

更改：
```java
    public static int arraySum(int[] x) {
        int i = 0;
        int sum = 0;
        while (i < x.length) {
            sum = sum + add(sum, x[i]);
            i = i + 1;
        }
        return sum;
    }
```
改成

```java
   public static int arraySum(int[] x) {
        int i = 0;
        int sum = 0;
        while (i < x.length) {
            sum = add(sum, x[i]);
            i = i + 1;
        }
        return sum;
    }
```
然后再把
```java
    /** Returns the max of a and b. Do not step into this function. */
    public static int max(int a, int b) {
        int w = (b - a) >> 31;
        /* If you're stepping into this function, click the
           step out button because you're not going to learn anything. */
        int z = ~(b - a) >> 31;

        int max = b & w | a & z;
        return max;
    }
```
改成：
```java
    /** Returns the max of a and b. Do not step into this function. */
    public static int max(int a, int b) {
        int w = ~(b - a) >> 31;
        /* If you're stepping into this function, click the
           step out button because you're not going to learn anything. */
        int z = (b - a) >> 31;

        int max = b & w | a & z;
        return max;
    }
```

#### intList

- Part A `addConstant`的bug：

跳出while循环之后最后一个结点没能加上常数。在循环外面增加一句`head.first += c;`即可。

- Part B `firstDigitEqualsLastDigit`的bug：

在判断first digit的时候判断条件应该从`x>10`改为`x>=10`，否则数字10会被误判为前后数位都是0。

- Part C `Tricky IntLists`的bug：
要求先自己编写测试用例，找出错误之后在进行修复。

找到的错误：【待补充】


### lab3
#### 比较AList不同的resize方法（加法和乘法）的时间开销
原理：
>For your convenience, we’ve provided a method called printTimingTable(AList<Integer> Ns, AList<Double> times, AList<Integer> opCounts) that will print the table above, where Ns is the first column, times is the second column, and opCounts is the third column. The fourth column (microsec/op) is automatically computed for you. Your times should be in seconds. You should use the Stopwatch class. See stopwatchDemo for an example. Interestingly, note that we are using the same data structure that we are timing (an AList) to store the timing data! The way we accomplish this is by using many different instances of the data structure; the one that is being timed is not the same as the ones that are storing the timing data.

运行结果上图：
+ 加法resize
```Java
public void addLast(Item x) {
        if (size == items.length) {
            resize(size + 1);
        }

        items[size] = x;
        size = size + 1;
    }
```

[![AListresize_.png](https://img1.imgtp.com/2023/09/26/H3zOJ4Bx.png)](https://img1.imgtp.com/2023/09/26/H3zOJ4Bx.png)

* 乘法resize
```Java
public void addLast(Item x) {
        if (size == items.length) {
            resize((int)(size *1.01));
        }

        items[size] = x;
        size = size + 1;
    }
```

[![AListresize_multiple.png](https://img1.imgtp.com/2023/09/26/o6RUqved.png)](https://img1.imgtp.com/2023/09/26/o6RUqved.png)
#### 比较SLList的getlast操作和proj1中linkedlistdeque的getlast操作的时间开销

[![SLList_time_1.png](https://img1.imgtp.com/2023/09/26/vi7pXT3s.png)](https://img1.imgtp.com/2023/09/26/vi7pXT3s.png)

>Note that the operations are again not constant time!  This means that as the list gets bigger, the getLast operation becomes slower. This would be a serious problem in a real world application.

>For this reason, the LinkedListDeque that you build in project 1 will be required to have a runtime that is independent of the size of the data structure. In other words, the last column will be some approximately constant value.
>
>Optional question to ponder: Why is getLast so slow? What is special about your LinkedListDeque that makes the getLast function faster?

## proj1:Data Structures
### 目的
>In Project 1, we will build implementations of a “Double Ended Queue” using both lists and arrays in a **package** that other classes can use. The project is roughly split into two halves: the data structure portion and the application portion.

### 问题
- Q1：bigLLDequeTest如何通过？
- A1：

## lab4 Git and Debugging
初始化一个git仓库。
```shell
git init
```
把发生变化的文件添加到暂存区。
```shell
git add *（发生更改的文件名）
```
把暂存区的文件提交到本地仓库。
```shell
git commit -m "first commit"
```
查看提交日志。可以复制commit id，然后粘贴到checkout命令中进行版本回滚。
```shell
git log
```
版本回滚。
```shell
git checkout commit_id
```

```shell
git remote add origin
```

```shell
git push -u origin master
```
拉取最新版本。
```shell
git pull origin master
```

```shell
git clone
```
查看当前仓库状态。
```shell
git status
```
查看当前仓库的分支。
```shell
git branch
```
合并分支。
```shell
git merge
```

## lab5 Project 1 Peer Code Review
lab5是组队对porj1的代码进行交流反思。略。
## lab6 Getting Started on Project 2
### 序列化和反序列化

writeObject();

readObejcet();
## proj2:gitlet