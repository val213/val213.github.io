---
title: 软件需求分析与建模（uml）
categories: 复习
tags: uml
---
感谢很多同学！

考点思维导图：https://mindline.cn/webapp?file=6CUH8M
# 部分名词表

|英文|中文|
|---|---|
|artifacts|工件，制品|
|Low Coupling|低耦合|
|High Cohesion|高内聚|
|monopoly game|大富翁游戏|
|SalesLineItem|销售订单项目|
|aglie|敏捷|
|aggregation|聚合|

# 知识点复习
## 名词解释todo
- 什么是UML（Unified Modeling Language）
    UML是描述(specifying)，构造(constructing)，和文档化(documenting)系统制品与工件的可视化语言
    - 它是一种符号语言，利用OO思想来进行建模
    - 它不是一种方法论
    - 它不是面向过程的

- 什么是OOD和OOP？

- 什么是软件设计模式？
- What are the basic principles of OO technology ？
**抽象，封装，模块化，层次。**
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-192.png?raw=true)
### uml的扩展机制
- tagged value
- constraint
- stereotype
## RUP（统一软件开发过程）
### UP制品
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-222.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/`O83B$FH[BN@Q7M[Y`7Q]@M.png?raw=true)
### 4+1视图
RUP的4+1视图是指用例视图、逻辑视图、实现视图、进程视图和部署视图。这5个视图分别从不同的角度描述了软件系统的不同方面，是软件系统的全面描述。
- **用例（/场景）视图**：用例视图描述了系统的功能需求，用例视图是从用户的角度来描述系统的功能需求，用例视图是系统的功能需求的描述。
- **逻辑视图**：逻辑视图描述了系统的静态结构，逻辑视图是从软件开发人员的角度来描述系统的静态结构，逻辑视图是系统的静态结构的描述。
- **实现（/开发）视图**：实现视图描述了系统的软件组件，实现视图是从软件开发人员的角度来描述系统的软件组件，实现视图是系统的软件组件的描述。
- **进程（/处理）视图**：进程视图描述了系统的动态行为，进程视图是从软件开发人员的角度来描述系统的动态行为，进程视图是系统的动态行为的描述。
- **部署（/物理）视图**：部署视图描述了系统的部署结构，部署视图是从系统管理员的角度来描述系统的部署结构，部署视图是系统的部署结构的描述。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-195.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/{DBDUOVW{Y%ONIA7$D~KOUG.jpg?raw=true)
### 九大核心工作流
RUP中有9个核心工作流，分为6个核心过程工作流(Core Process Workflows)和3个核心支持工作流(Core Supporting Workflows)。尽管6个核心过程工作流可能使人想起传统瀑布模型中的几个阶段，但应注意迭代过程中的阶段是完全不同的，这些工作流在整个生命周期中一次又一次被访问。*9个核心工作流在项目中轮流被使用，在每一次迭代中以不同的重点和强度重复。*

tips：这九大工作流也基本上对应是九个 `discipline` (科目)。课本只关注其中的三个，分别是商业建模、需求和分析设计。其他的工作流在实际项目中也是非常重要的，但是在课本中没有详细讲解。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-220.png?raw=true)
业务建模的制品是领域模型，需求的制品是用例模型，分析设计的制品是设计模型、软件架构文档和数据模型。

1． 商业/业务建模(Business Modeling)

商业建模工作流描述了如何为新的目标组织开发一个构想，并基于这个构想在商业用例模型和商业对象模型中定义组织的过程，角色和责任。

2． 需求(Requirements)

需求工作流的目标是描述系统应该做什么，并使开发人员和用户就这一描述达成共识。为了达到该目标，要对需要的功能和约束进行提取、组织、文档化；最重要的是理解系统所解决问题的定义和范围。

3． 分析和设计(Analysis & Design)

分析和设计工作流将需求转化成未来系统的设计，为系统开发一个健壮的结构并调整设计使其与实现环境相匹配，优化其性能。分析设计的结果是一个设计模型和一个可选的分析模型。设计模型是源代码的抽象，由设计类和一些描述组成。设计类被组织成具有良好接口的设计包(Package)和设计子系统(Subsystem)，而描述则体现了类的对象如何协同工作实现用例的功能。 设计活动以体系结构设计为中心，体系结构由若干结构视图来表达，结构视图是整个设计的抽象和简化，该视图中省略了一些细节，使重要的特点体现得更加清晰。体系结构不仅仅是良好设计模型的承载媒介，而且在系统的开发中能提高被创建模型的质量。

4． 实现(Implementation)

实现工作流的目的包括以层次化的子系统形式定义代码的组织结构；以组件的形式(源文件、二进制文件、可执行文件)实现类和对象；将开发出的组件作为单元进行测试以及集成由单个开发者（或小组）所产生的结果，使其成为可执行的系统。

5． 测试(Test)

测试工作流要验证对象间的交互作用，验证软件中所有组件的正确集成，检验所有的需求已被正确的实现, 识别并确　　认缺陷在软件部署之前被提出并处理。RUP提出了迭代的方法，意味着在整个项目中进行测试，从而尽可能早地发现缺陷，从根本上降低了修改缺陷的成本。测试类似于三维模型，分别从可靠性、功能性和系统性能来进行。

6． 部署(Deployment)

部署工作流的目的是成功的生成版本并将软件分发给最终用户。部署工作流描述了那些与确保软件产品对最终用户具有可用性相关的活动，包括：软件打包、生成软件本身以外的产品、安装软件、为用户提供帮助。在有些情况下，还可能包括计划和进行beta测试版、移植现有的软件和数据以及正式验收。

7． 配置和变更管理(Configuration & Change Management)

配置和变更管理工作流描绘了如何在多个成员组成的项目中控制大量的产物。配置和变更管理工作流提供了准则来管理演化系统中的多个变体，跟踪软件创建过程中的版本。工作流描述了如何管理并行开发、分布式开发、如何自动化创建工程。同时也阐述了对产品修改原因、时间、人员保持审计记录。

8． 项目管理(Project Management)

软件项目管理平衡各种可能产生冲突的目标，管理风险，克服各种约束并成功交付使用户满意的产品。其目标包括：为项目的管理提供框架，为计划、人员配备、执行和监控项目提供实用的准则，为管理风险提供框架等。

9． 环境(Environment)

环境工作流的目的是向软件开发组织提供软件开发环境，包括过程和工具。环境工作流集中于配置项目过程中所需要的活动，同样也支持开发项目规范的活动，提供了逐步的指导手册并介绍了如何在组织中实现过程。

### 四个阶段
RUP中的软件生命周期在时间上被分解为四个顺序的阶段，分别是：初始阶段、细化阶段、构造阶段和交付阶段。每个阶段结束于一个主要的里程碑。每个阶段本质上是两个里程碑之间的时间跨度。在每个阶段的结尾执行一次评估以确定这个阶段的目标是否已经满足。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-145.png?raw=true)
#### 初始阶段 inception
>大体上的构想，业务案例、范围和模糊评估

初始阶段是建立项国共同设想和基本范围的比较简短的起始步骤。为了在随后的细化阶能够开始编程，它将包括**对10%的用例进行分析**、**关键的非功能需求的分析**、**业务案例创建和开发环境的准备**。

>6. Which of the fllowing is NOT TRUE 10 the major milestones for the phase of
Inception (as is shown below) ofthe process ofRUP?
**A Use-case Model, which is completed about 80%,**
B. Prolotypes and poofof-concepts for a citial use case.
C. Project scope definition, cost and schedule estimation.
D. Business case are set up and confirmed with the core business rules has been archived

（1）对需求有大概了解，确定系统中大多数角色和用例。

（2）划分主要子系统，给出系统的体系结构概貌

（3）分析整个项目进行中的业务和需求方面的主要风险，评价项目可行性。

（4）考虑时间、经费、技术、项目规模和效益等因素

（5）制定开发计划

（6）初始阶段结束时是第一个重要的里程碑：生命周期目标里程碑。生命周期目标里程碑评价项目基本的生存能力。
#### 细化阶段 elaboration
>已精化的构想，核心架构的迭代实现、高风险的解决、确定大多数需求和范围以及进行更为实际的评估

（1）进行需求风险分析。考虑项目目标是否偏离用户需求

（2）进行技术风险分析。通过建立原型等方法，考虑所选技术方案可行性

（3）进行技能风险分析。考虑实施项目人员素质能否胜任项目要求

（4）进行政策风险分析。考虑政策性因素对项目的影响

（5）进行高层分析和设计，并作出结构性决策。

（6）产生简要体系结构，包括用例列表、领域概念模型和技术平台等

（7）为构造制定计划

（8）同时为项目建立支持环境，包括创建开发案例，创建模板、准则并准备工具。

（9）细化阶段结束时第二个重要的里程碑：生命周期结构里程碑。生命周期结构里程碑为系统的结构建立了管理基准并使项目小组能够在构建阶段中进行衡量。此刻，要检验详细的系统目标和范围、结构的选择以及主要风险的解决方案


#### 构造阶段 construction
> 对遗留下来的风险较低和比较简单的元素进行迭代实现，准备部署。

（1）构建阶段是一个制造过程，其重点放在管理资源及控制运作以优化成本、进度和质量，迭代增量的开发一个完整的软件系统。

（2）在构建阶段，所有剩余的构件和应用程序功能被开发并集成为产品，所有的功能被详细测试。

（3）构建阶段结束时是第三个重要的里程碑：初始功能里程碑。初始功能里程碑决定了产品是否可以在测试环境中进行部署。此刻，要确定软件、环境、用户是否可以开始系统的运作。此时的产品版本也常被称为“beta”版

 

#### 交付阶段 transition
>进行beta测试和部署

（1）交付阶段的重点是确保软件对最终用户是可用的。

（2）交付阶段可以跨越几次迭代，包括为发布做准备的产品测试，基于用户反馈的少量的调整。用户反馈应主要集中在产品调整，设置、安装和可用性问题，所有主要的结构问题应该已经在项目生命周期的早期阶段解决了。

（3）在交付阶段的终点是第四个里程碑：产品发布里程碑。此时，要确定目标是否实现，是否应该开始另一个开发周期。在一些情况下这个里程碑可能与下一个周期的初始阶段的结束重合


### 迭代思想
在软件开发的初期就想完全、准确地获得用户的需求基本是不可能的。实际上，设计者常常碰到的问题是需求在整个软件开发过程中经常会发生变化。而迭代式开发允许每次迭代开发过程中需求发生变化，它正是通过不断迭代来细化对问题的理解。这样，迭代式开发大大降低了项目开发的风险，提高了软件开发的效率。


### 敏捷开发
敏捷开发以用户的需求进化为核心，采用迭代、循序渐进的方法进行软件开发。

在敏捷开发中，软件项目在构建初期被切分成多个子项目，各个子项目的成果都经过测试，具备可视、可集成和可运行使用的特征。换言之，就是把一个大项目分为多个相互联系，但也可独立运行的小项目，并分别完成，在此过程中软件一直处于可使用状态。

- 以交流和理解为核心，而不是以文档为核心
- 敏捷建模也是要建模的，不代表不建模
- 越简单，越快越好，能看懂就行了
- 敏捷开发是一种方法论

#### 迭代过程&增长过程
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-196.png?raw=true)
## OOA/OOD/OOP
一般我们我们接到产品经理的需求后，开发阶段分如何几个步骤

- 可行性预研阶段，此阶段评估需求是否合理，能否实现。
- OOA阶段，此阶段分析用例，定义领域模型。
- OOD阶段，此阶段定义类图，类之间的交互图（时序图等等）。
- OOP阶段，根据OOD设计的类图，类之间的交互图输出代码
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-1.png?raw=true)
### OOA
OOA全拼为Object-Oriented Analysis，面向对象分析。此过程是把现实的需求转义为领域模型（Domain Model）问题，以及输出领域模型（Domain Model）。第一步是根据需求输出用例，用例为一个一个场景，用户与App交互的场景。第二步是根据用例输出领域模型（Domian Model），领域模型（Domain Model）也就是我们常说的业务逻辑。会输出概念类，概念类的交互的关系，这部分概念类一般直接反应现实的事物。

### OOD
OOD全拼为Object-Oriented Design，面向对象设计。此过程是把我们的领域模型转为逻辑架构，类图，类之间的关系。
如何分层，如何分包，如何保证高内聚低耦合都是这部分要考虑的问题。这个阶段输出类图，时序图，包图等等。

### OOP
OOP全程为Object-oriented programming，面向对象编程。是把我们OOD的设计结果转为代码。


## GRASP原则
GRASP是一种面向对象设计的原则，全称为`General Responsibility Assignment Software Patterns`，即`通用职责分配软件模式`。GRASP是一种设计模式，它是一种用于面向对象设计的指导性原则，它提供了一种设计方法，帮助我们在设计过程中确定类的职责。GRASP的目的是帮助我们在设计过程中确定类的职责，以及确定类之间的交互关系。

Responsibilities and RDD 
RDD – Responsibility-Driven Design（职责驱动设计）
- Responsibilities are related to the obligation of an object in terms of its behavior
- Knowing responsibilities:
- Doing responsibilities: 

• GRASP are patterns to assign responsibilities to objects
• Interaction diagram (通信图) is often used as a tool to assign responsibilities to an object

### 1、Creator（创建者）

如果一个类创建了另外一个类，那么这两个类之间就有了耦合，也可以说产生了依赖关系。依赖或耦合本身是没有错误的，但是他们带来的问题就是在以后的维护中产生连锁反应，而必要的耦合是逃不掉的，我们能做的就是正确的创建耦合关系，不要随便建立类之间的依赖关系，那么该如何去做呢？就是要遵守创建者模式规定的基本原则，凡是不符合以下条件的，都不能随便用 A 创建 B。

谁负责创建类？在Java和C++中对应调用new或者对象构造函数。这个还比较容易理解，谁负责创建，则可以考虑将被创建者组合为创建者的一个属性（属性可见），或者创建者的某个函数中创建被创建者（局部可见）。
**Problem:**
Who should be responsible for creating a new instance of some class?
**Solution:**
Assign class B the responsibility to create an instance of class A if one of these is true (the more the better):
- B “contains” or compositely aggregates A
- B records A
- B closely uses A
- B has the initializing data for A, will be passed to A when it is created

例子：
- 订单是商品的容器，订单应该负责创建商品

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-3.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-4.png?raw=true)

如果创建对象需要处理很多复杂性，例如使用回收的实例，或者根据某个外部属性值有条件地从一系列相似的类中创建实例，那么最好将创建对象的任务委托给一个叫做“工厂”的辅助类。

在这种情况下，工厂类会根据提供的信息决定创建哪种类的实例，然后返回这个新创建的实例。这样，工厂模式可以将具体的类名从应用程序代码中解耦，使得应用程序代码可以面向接口编程，而不是面向实现编程。

Low coupling is supported, which implies lower maintenance dependencies and higher opportunities for reuse. 

### ⭐2、Infomation Expert（信息专家）
- **problem**: What is the principle of assigning responsibilities to objects?
- **solution**: Assign a responsibility to the class that has the information needed to fulfill it

信息专家模式是面向设计的最基本原则，是我们平时使用最多，应该跟我们的思想融为一体的原则。也就是说，我们设计对象（类）的时候，**如果某个类拥有完成某个职责所需要的所有信息，那么这个职责就应该分配给这个类来实现。这时，这个类就是相对于这个职责的信息专家。**

谁应该对某个行为或者认知负责？谁拥有实现该行为所需要的必须信息，就讲该职责让谁负责。**对应到代码中通常表现为某个行为方法需要定义在哪个类中。**
对于需要在类与类之间发送消息的方法，需要在发送方保留被发送方的指针或者引用。（对象可见性）

**当需要增加某个方法时，找出合适的”信息专家“，把此方法加入到该信息专家中。**

例子：
-  常见的网上商店的购物车（ShopCar），需要让每种商品（SKU）只在购物车内出现一次，购买相同商品，只需要更新商品的数量即可。
-  一个订单（Order）是由多个订单项（OrderItem）组成，订单项是由商品（Product）和数量（quantity）组成的，订单项的总价是商品的单价乘以数量。

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-5.png?raw=true)

### ⭐3、Low coupling（低耦合）
- **problem**: How to reduce the impact of changes?
- **solution**: Assign responsibilities so that coupling remains low. Use the principle to evaluate alternatives.

低耦合模式的意思就是要我们尽可能地减少类之间的连接。

一个类尽可能少的和多个类发生关系，尽量少的依赖于其他类。表现在代码上为一个类较少的存在其他类的指针和引用。

其作用非常重要：

低耦合降低了因一个类的变化而影响其他类的范围。

低耦合使用类更容易理解，因为类会变得简单，更内聚。

下面这些情况会造成类A、B之间的耦合：

A 是 B 的属性
A 调用 B 的实例的方法
A 的方法中引用的 B，例如 B 是 A 方法的返回值或参数。
A 是 B 的子类，或者 A 实现 B
关于低耦合，还有下面一些基本原则：

a、Don’t Talk to Strangers 原则

意思就是说，不需要通信的两个对象之间，不要进行无谓的连接，连接了就有可能产生问题，不连接就一了百了了。

b、如果 A 已经和 B 有连接，如果分配 A 的职责给 B 不合适的话（违反信息专家模式），那么就把 B 的职责分配给 A。

c、两个不同模块的内部类之间不能连接


### ⭐4、High cohesion（高内聚）
高内聚的意思是给类尽量分配内聚的职责，也可以说成是功能性内聚的职责。即功能性紧密相关的职责应该放在一个类里，并共同完成有限的功能，那么就是高内聚合。这样更有利于类的理解和重用，也便于类的维护。

高内聚也可以说是一种隔离，就像人体由很多独立的细胞组成，大厦由很多砖头、钢筋、混凝土组成，每一个部分（类）都有自己独立的职责和特性，每一个部分内部发生了问题，也不会影响其他部分，因为高内聚的对象之间是隔离开的。

尽量保持类能够只有单一的事情，只做自己份内的事，不包含过多的职责。表现为对象中的方法只是自己必须完成的工作，对于一些其他不太相关的工作可以委派给其它类，转而建立之间的关联即可。

Some scenarios that illustrate varying degrees of functional cohesion:
• **Very low cohesion** – a class is solely responsible for many things in 
very different functional areas
• **Low cohesion** – a class has sole responsibility for a complex task in 
one functional area
• **High cohesion** – a class has moderate responsibilities in one 
functional area and collaborates with other classes to fulfill tasks

**Problem:** How to keep objects focused, understandable, and manageable, and as a side effect, support Low Coupling? 
**Solution:** Assign responsibilities so that cohesion remains high. Use this to evaluate alternatives
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-7.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-8.png?raw=true)
图2额外增加了register到sale的耦合，让register干了杂活 一定程度破坏了它的内聚性，没那么好。图1更好，实现了低耦合高内聚。
### ⭐5、Controller（控制器）
控制器模式是指在设计过程中，我们需要确定哪个类应该负责处理用户的请求。在这种情况下，我们应该考虑哪个类拥有处理用户请求所需要的所有信息，然后将处理用户请求的职责分配给这个类。这样，我们就可以避免处理用户请求的职责分散到多个类中，从而提高代码的可维护性。

UI层和领域模型之间的模式应用。主要是为了保持UI层和业务逻辑层不相互污染。通常对应的创建一个代表系统的类或者一个虚构类用于UI层和领域层的消息交互。

**Problem:** What first object beyond the UI layer receives and coordinates (“controls”) a system operation?
**Solution:** Assign the responsibility to an object representing one of these choices:
- Represents the overall “system,” a “root object,” a device that the software is running within, or a major subsystem (these are all variables of a façade controller).
- Represents a use case scenario within which the system operation occurs (a use case or session controller)

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-6.png?raw=true)
感觉就像是Java后端开发的Controller层，负责接收前端的请求，然后调用Service层的方法，最后返回结果给前端。这个Controller层就是一个控制器，负责控制整个请求的流程。
>使用控制器对象来控制系统中的流程是MVC架构中的一个实践，但它本身并不直接关系到重用性。控制器的目的是分离关注点，但不一定增加代码的重用性。
>4. Which of the following is good practice to use while designing for reuse?
A. Define a persistence framework that provides services for persisting objects.
B. Use design patterns, wherein complete solutions are already defined.
C. Use controller objects to control the flow of processes in the system.
D. Assign responsilitis to classes such that coupling between them remains high.
**E. AandB.**
F. A,BandC.
G. A, B,C and D.
### 6、Polymorphism（多态）
这里的多态跟 OO 三大基本特征之一的“多态”是一个意思。即多个类有一些共同的形态。在代码上表现为替换switch case之类的操作，建立多态关系，通常以抽象超类和接口的形式呈现，子类进行继承。
**Problem:**
How to handle alternatives based on type? How to create pluggable software components?
**Solution:**
When related alternatives or behaviors vary by type (class), assign responsibility for the behavior – using polymorphic operations – to the types for which the 
behavior varies

**Examples:**
• In the **NextGen POS application**, there are multiple external third-party tax calculators that must be supported; the system needs to be able to integrate with different ones
• What objects should be responsible for handling these varying external tax calculator interfaces?

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-9.png?raw=true)
在monopoly game中的例子：player选择根据不同的square类型来执行不同的操作，这里就可以使用多态来实现。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-10.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-11.png?raw=true)
### 7、Pure Fabrication（纯虚构）
这里的纯虚构跟我们常说说的纯虚构函数意思相近。高内聚低耦合，是系统设计的终极目标，但是内聚和耦合永远都是矛盾对立的。高内聚以为这拆分出更多数量的类，但是对象之间需要协作来完成任务，这又造成了高耦合，反过来依然。该如何解决这个矛盾呢？有时候在类与类之间通过构建一个实际并不存在的类用于信息的传递和交换以保持高内聚和低耦合的特点。

把高度内聚的职责分配给虚构出来的一个类，这个类在领域模型里没有对应的概念。
**Problem:**
What object should have the responsibility, when you do not want to violate High Cohesion and Low Coupling, or other goals, but solutions offered by Expert (for 
example) are not appropriate?
**Solution:**
Assign a highly cohesive set of responsibilities to an artificial or convenience class that does not represent a problem domain concept – something made up, to support high cohesion, low coupling, and reuse

例子：
- 持久化存储
    - 解决信息专家模式留下来的问题：在某些情况下，专家建议的解决方案是不可取的，通常是因为耦合和内聚方面的问题。例如，谁应该负责在数据库中保存Sale ?
    - 假设需要支持在关系数据库中保存Sale实例，从Expert获得的解决方案违反了高内聚、低耦合和重用
    - 一个合理的解决方案是创建一个新类，该类单独负责在某种持久存储介质(例如关系数据库)中保存对象
    - • The Sale remain well-designed, with high cohesion and low coupling
    • The PersistentStorage class is itself relatively cohesive, having the sole purpose of storing or inserting objects in a persistent storage medium
    • The PersistentStorage class is a very generic and reusable object
- 在monopoly game中，Handling the Dice：
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-12.png?raw=true)

Many existing object-oriented design patterns are example of Pure Fabrications: Adapter, Strategy, Command, and so on. All GoF design patterns are Pure Fabrications. Virtually all other design patterns are Pure Fabrications
### ⭐8、Indirection（间接）
保持类和类之间的间接关系，减少直接关系，如适配器等。纯虚构就是因为间接性而产生的。

把职责分配到哪里可以避免两个或者多个对象之间的耦合？如何解耦对象以保持较高的可重用性？

把职责分配给一个中介对象，隔离对象与其他构件或者服务，使它们不产生直接耦合。

因为中介对象是一种特殊的作用，一般对象与中间对象之间的直接耦合，相对比较简单。

“间接”顾名思义，就是这个事不能直接来办，需要绕个弯才行。绕个弯的好处就是，本来直接会连接在一起的对象彼此隔离开了，一个变动不会影响另一个。就像我在前面的低耦合模式里说的一样，“两个不同模块的内部类之间不能直接连接”，但是我们可以通过中间类来间接连接两个不同的模块，这样对于这两个模块来说，他们之间仍然是没有耦合/依赖关系的。

**Problem:**
Where to assign a responsibility, to avoid direct coupling between two (or more) things? How to de-couple objects so that low coupling is supported and reuse potential remains higher?
**Solution:**
Assign the responsibility to an intermediate object to mediate between other components or services so that they not directly coupled
### 9、Protected Variations（受保护的变化/防止变异）
只向自己熟悉的对象发送消息，熟悉的对象包括this对象，方法的参数，this属性，this属性中的集合元素，在类方法中创建的对象。

如何设计对象、系统和子系统，使得这些成分里面的变化因素、不稳定因素不会对系统的其余部分造成意想不到的影响？

标识出能够预计的变化点或者不稳定点，职责分配的时候创建一个稳定的接口，把它们与系统的其余部分隔离开来。

预先找出不稳定的变化点，使用统一的接口封装起来，如果未来发生变化的时候，可以通过接口扩展新的功能，而不需要去修改原来旧的实现。也可以把这个模式理解为 OCP（开闭原则），就是说一个软件实体应当对拓展开发，对修改关闭。在设计一个模块的时候，要保证这个模块可以在不需要被修改的前提下可以得到拓展。这样做的好处就是通过拓展给系统提供了新的职责，以满足新的需求，同时又没有改变系统原来的功能。

**Problem:**
How to design objects, subsystems, and systems so that the variations or instability in these elements does not have an undesirable impact on other elements?
**Solution:**
Identify points of predicted variations or instability; assign responsibilities to create a stable interface around them

Benefits
• Extensions required for new variations are easy to add
• New implementations can be introduced without affecting clients
• Coupling is lowered
• The impact or cost of changes can be lowered
## 设计原则
### 1、开闭原则（OCP）
### 2、（里氏）替换原则/利斯科夫可替代原理/Liskov Substitution Principle
使用基类对象指针或引用的函数必须能够在不了解衍生类的条件下使用衍生类的对象。

主要阐述了有关继承的一些原则，也就是什么时候应该使用继承，什么时候不应该使用继承，以及其中的蕴涵的原理。

我们把里氏代换原则解释得更完整一些：**在一个软件系统中，子类应该可以替换任何基类能够出现的地方，并且经过替换以后，代码还能正常工作。**

https://blog.csdn.net/qq_36501591/article/details/114849676

实现开闭原则的关键步骤是抽象化，基类与子类之间的继承关系就是一种抽象化的体现。**因此，里氏代换原则是实现抽象化的一种规范。违反里氏代换原则意味着违反了开闭原则，反之未必。里氏代换原则是使代码符合开闭原则的一个重要保证。**

通过里氏代换原则给我们带来了什么样的启示？
- 类的继承原则：如果一个继承类的对象可能会在基类出现的地方出现运行错误，则该子类不应该从该基类继承，或者说，应该重新设计它们之间的关系。
- 动作正确性保证：符合里氏代换原则的类扩展不会给已有的系统引入新的错误。
### 3、依赖倒置原则（DIP——Dependency Inversion Principle）
抽象不应该依赖于细节。细节应该依赖于抽象。

高层不应该依赖于底层，两者都应该依赖于抽象。

OCP宣扬了目标，DIP宣扬了机制。
### 4、接口隔离原则（ISP）
接口隔离原则（ISP）是指：客户端不应该被迫依赖于它不使用的接口。这个原则的目的是降低类之间的耦合度，降低依赖，提高类的内聚性。
### 5、单一职责原则（SRP）
单一职责原则（SRP）是指：一个类应该只有一个引起它变化的原因。也就是说，一个类应该只有一个职责。如果一个类有多个职责，那么这些职责之间就会耦合在一起，这样就会导致类的职责不清晰，不利于类的维护和扩展。
### 6、迪米特法则（LOD）
迪米特法则（LOD）是指：一个对象应该对其他对象有最少的了解。也就是说，一个对象应该尽可能少地与其他对象发生相互作用。迪米特法则的目的是降低类之间的耦合度，降低依赖，提高类的内聚性。
### 7、合成/聚合复用原则（CARP）
合成/聚合复用原则（CARP）是指：尽量使用合成/聚合，尽量不要使用继承。合成/聚合复用原则的目的是降低类之间的耦合度，降低依赖，提高类的内聚性。
## GoF设计模式
GoF设计模式是指Gang of Four Design Patterns，即四人帮设计模式。四人帮是指Erich Gamma、Richard Helm、Ralph Johnson和John Vlissides四位作者，他们在1994年出版了一本名为《设计模式：可复用面向对象软件的基础》的书，这本书总结了23种设计模式，这23种设计模式被称为GoF设计模式。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-2.png?raw=true)
前面说明了 GoF 的 23 种设计模式的分类，现在对各个模式的功能进行介绍。

相见恨晚发现了一个不错的网站：https://refactoringguru.cn/design-patterns/structural-patterns
1.	⭐**单例（Singleton）模式**：
    - 谁创建了工厂本身？如何访问工厂的示例呢？
    - 某个类只能生成一个实例，该类提供了一个全局访问点供外部获取该实例，其拓展是有限多例模式。
    - 单例模式可以分为两种：预加载(饿汉)和懒加载（懒汉）。预加载是指在程序启动时就创建单例对象，懒加载是指在第一次使用时才创建单例对象。

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-190.png?raw=true)
2.	原型（Prototype）模式：将一个对象作为原型，通过对其进行复制而克隆出多个和原型类似的新实例。
3.	⭐**工厂方法（Factory Method）模式**
>在了解工厂方法模式之前，有必要对“简单工厂”模式进行⼀定的了解，简单工厂模式是⼀种创建型设计模式，但并不属于23种设计模式之⼀，更多的是⼀种编程习惯。
>简单工厂模式的核⼼思想是将产品的创建过程封装在⼀个工厂类中，把创建对象的流程集中在这个工厂类⾥⾯。简单工厂模式包括三个主要角色，工厂类、抽象产品、具体产品，下⾯的图示则展示了工厂类的基本结构。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-197.png?raw=true)
>抽象产品，⽐如上图中的 Shape 接⼝，描述产品的通⽤⾏为。
>具体产品: 实现抽象产品接⼝或继承抽象产品类，⽐如上⾯的 Circle 类和 Square 类，具体产品通过简单⼯⼚类的 if-else 逻辑来实例化。
>⼯⼚类：负责创建产品，根据传递的不同参数创建不同的产品示例。
>简单⼯⼚类简化了客户端操作，客户端可以调⽤⼯⼚⽅法来获取具体产品，⽽⽆需直接与具体产品类交互，降低了耦合，但是有⼀个很⼤的问题就是不够灵活，如果需要添加新的产品，就需要修改⼯⼚类的代码。
- 提出问题
    - 当有特殊的考虑时，例如复杂的创造逻辑，希望分离创造责任以更好地凝聚力，等等，谁应该负责创造对象？
- 示例
    - 使用工厂模式来创建一批有关联有相似性的适配器或者接口
    - 一般与单例模式配合使用 只有一个工厂
    - 定义一个用于创建产品的接口，由子类决定生产什么产品。

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-189.png?raw=true)
>⼯⼚⽅法模式也是⼀种创建型设计模式，简单⼯⼚模式只有⼀个⼯⼚类，负责创建所有产品，如果要添加新的产品，通常需要修改⼯⼚类的代码。⽽⼯⼚⽅法模式引⼊了抽象⼯⼚和具体⼯⼚的概念，每个具体⼯⼚只负责创建⼀个具体产品，添加新的产品只需要添加新的⼯⼚类⽽⽆需修改原来的代码，这样就使得产品的⽣产更加灵活，⽀持扩展，符合开闭原则。
>⼯⼚⽅法模式分为以下⼏个⻆⾊：
>- 抽象⼯⼚：⼀个接⼝，包含⼀个抽象的⼯⼚⽅法（⽤于创建产品对象）。
>- 具体⼯⼚：实现抽象⼯⼚接⼝，创建具体的产品。
>- 抽象产品：定义产品的接⼝。
>- 具体产品：实现抽象产品接⼝，是⼯⼚创建的对象。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-198.png?raw=true)
- 好处
    - 将复杂创建的责任分离到有凝聚力的帮助对象中 
    - 隐藏潜在的复杂创建逻辑 
    - 允许引入性能增强的内存管理策略，例如对象缓存或回收

4.	抽象工厂（AbstractFactory）模式：
- 提供一个创建产品族的接口，其每个子类可以生产一系列相关的产品。
>在⼯⼚⽅法模式中，每个具体⼯⼚只负责创建单⼀的产品。但是如果有多类产品呢，⽐如说“⼿机”，⼀个品牌的⼿机有⾼端机、中低端机之分，这些具体的产品都需要建⽴⼀个单独的⼯⼚类，但是它们都是相互关联的，都共同属于同⼀个品牌，这就可以使⽤到【抽象⼯⼚模式】。
>- 抽象产品接⼝ AbstractProduct : 定义产品的接⼝，可以定义多个抽象产品接⼝，⽐如说沙发、椅⼦、茶⼏都是抽象产品。
>- 具体产品类 ConcreteProduct : 实现抽象产品接⼝，产品的具体实现，古典⻛格和沙发和现代⻛格的沙发都是具体产品。
>- 抽象⼯⼚接⼝ AbstractFactory : 声明⼀组⽤于创建产品的⽅法，每个⽅法对应⼀个产品。
>- 具体⼯⼚类 ConcreteFactory ： 实现抽象⼯⼚接⼝，负责创建⼀组具体产品的对象，在本例中，⽣产古典⻛格的⼯⼚和⽣产现代⻛格的⼯⼚都是具体实例
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-199.png?raw=true)
>在上⾯的图示中： AbstractProductA/B/C 就是抽象产品， ConcreteProductA2/A2/B1/B2/C1/C2 就是抽象产品的实现， AbstractFactory 定义了抽象⼯⼚接⼝，接⼝⾥的⽅法⽤于创建具体的产品，⽽ConcreteFactory就是具体⼯⼚类，可以创建⼀组相关的产品。

- 简单⼯⼚、⼯⼚⽅法、抽象⼯⼚的区别 
    - 简单⼯⼚模式：⼀个⼯⼚⽅法创建所有具体产品
    - ⼯⼚⽅法模式：⼀个⼯⼚⽅法创建⼀个具体产品
    - 抽象⼯⼚模式：⼀个⼯⼚⽅法可以创建⼀类具体产品

5.	建造者（Builder）模式：将一个复杂对象分解成多个相对简单的部分，然后根据不同需要分别创建它们，最后构建成该复杂对象。
6.	**代理（Proxy）模式**：
>Subject（抽象主题）： 抽象类，通过接⼝或抽象类声明真实主题和代理对象实现的业务⽅法。
>RealSubject（真实主题）：定义了Proxy所代表的真实对象，是客户端最终要访问的对象。
>Proxy（代理）：包含⼀个引⽤，该引⽤可以是RealSubject的实例，控制对RealSubject的访问，并可能负责创建和删除RealSubject的实例。
>![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-206.png?raw=true)
>![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/85285b999c78e9292dd729325718700.png?raw=true)
- 为某对象提供一种代理以控制对该对象的访问。由代理对象控制对原对象的引用。通俗的来讲代理模式就是我们生活中常见的中介。即客户端通过代理间接地访问该对象，从而限制、增强或修改该对象的一些特性。
- 中介隔离作用：在某些情况下，一个客户类不想或者不能直接引用一个委托对象，而代理类对象可以在客户类和委托对象之间起到中介的作用，其特征是代理类和委托类实现相同的接口。
- 开闭原则，增加功能：代理类除了是客户类和委托类的中介之外，我们还可以通过给代理类增加额外的功能来扩展委托类的功能，这样做我们只需要修改代理类而不需要再修改委托类，符合代码设计的开闭原则。代理类主要负责为委托类预处理消息、过滤消息、把消息转发给委托类，以及事后对返回结果的处理等。代理类本身并不真正实现服务，而是同过调用委托类的相关方法，来提供特定的服务。真正的业务功能还是由委托类来实现，但是可以在业务功能执行的前后加入一些公共的服务。例如我们想给项目加入缓存、日志这些功能，我们就可以使用代理类来完成，而没必要打开已经封装好的委托类。
- 代理模式分为三类：1. 静态代理 2. 动态代理 3. CGLIB代理
- 静态代理
    - 静态代理是指在程序运行前就已经存在代理类的字节码文件，代理类和委托类的关系在运行前就确定了。
    - 优点：可以做到在符合开闭原则的情况下对目标对象进行功能扩展。
    - 缺点： 代理对象与目标对象要实现相同的接口，我们得为每一个服务都得创建代理类，工作量太大，不易管理。同时接口一旦发生改变，代理类也得相应修改。 
- 动态代理
    - 动态代理是指在程序运行时，通过反射等机制动态地生成代理类的对象，代理类和委托类的关系在运行时确定。
- Cglib代理
    - Cglib代理是指在运行时动态生成代理类，这种代理方式不要求委托类实现接口，但要求委托类不能是final类。
7.	⭐**适配器（Adapter）模式**
- 适配器模式是一种结构设计模式，它允许对象之间的接口不兼容的情况下能够一起工作。适配器模式通过创建一个适配器类，将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类能一起工作。
- 适配器模式主要分为三类：类适配器模式、对象适配器模式、接口适配器模式。通常所说的适配器模式，如果没有特别指明类型，一般指的是**对象适配器模式**（Object Adapter）。对象适配器模式是最常见的实现方式，因为它提供了更大的灵活性和更低的耦合度。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-201.png?raw=true)
- ⽬标接⼝ Target : 客户端希望使⽤的接⼝
- 适配器类 Adapter : 实现客户端使⽤的⽬标接⼝，持有⼀个需要适配的类实例。
- 被适配者 Adaptee : 需要被适配的类
这样，客户端就可以使⽤⽬标接⼝，⽽不需要对原来的 Adaptee 进⾏修改， Adapter 起到⼀个转接扩展的作⽤。
```java
public interface Power5WTarget {
 
    public int outPut5W();
 
}
```
```java
public class Power60WAdaptee {
 
    public int outPut60W(){
        System.out.println("充电功率60W");
        return 60;
    }
 
}
```
```java
public class ObjAdapter implements Power5WTarget {
 
    private Power60WAdaptee power60WAdaptee;
 
    public ObjAdapter(Power60WAdaptee power60WAdaptee){
        this.power60WAdaptee = power60WAdaptee;
    }
 
    @Override
    public int outPut5W() {
        int power = this.power60WAdaptee.outPut60W();
        return power/12;
    }
}
```
- **适配器模型与其他模型有什么关系？**

    - **与GRASP核心概念的关系**
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-226.png?raw=true)
        - 以前对**Adapter模式的使用可以看作是对某些GRASP构建块的专门化**:**Adapter通过使用应用接口和多态性的间接对象来支持Protected variation，以更改外部接口或第三方包。**
        - 将Adapter与一些核心GRASP原则联系起来。Adapter模式是一种使用了多态的间接和纯虚构的设计模式；
    - **与外观模式Facade Pattern的关系**
        - **隐藏外部系统的资源适配器也可以被认为是Facade对象**(本章讨论的另一个GoF模式)，因为它用单个对象(这是Facade的本质)包装了对子系统或系统的访问。然而，当**包装对象提供对各种外部接口的适应**时，将其称为资源适配器的动机尤其存在。
    - **与工厂模式Factory Pattern的关系**
        - 适配器在设计中提出了一个新问题:在具有不同接口的外部服务的先前适配器模式解决方案中，**谁创建适配器?以及如何确定要创建哪类适配器**，如TaxMaster-Adapter或GoodAsGoldTaxProAdapter?
        - 选择域对象(例如Register)来创建适配器并不支持关注点分离的目标，并且降低了其内聚性。在这种情况下，一个常见的替代方案是应用工厂模式，在这种模式中，定义一个Pure Fabrication“工厂”对象来创建对象。

参考：
>- 与外观模式（Facade Pattern）：
>   - 外观模式提供了一个简化的接口来访问复杂的类系统。**适配器模式可以作为外观模式的底层实现**，将复杂的接口转换为简化的接口。
>- 与桥接模式（Bridge Pattern）：
>   - 桥接模式将抽象部分与其实现部分分离，使它们可以独立变化。**适配器模式可以用于实现桥接模式中的实现部分**，以适配不同的抽象接口。
>- 与代理模式（Proxy Pattern）：
>   - 代理模式为另一个对象提供一个代替或占位符对象以控制对它的访问。**适配器模式可以作为代理模式的一部分**，以适配代理对象的接口。
>- 与装饰者模式（Decorator Pattern）：
>   - 装饰者模式允许用户在不修改对象本身的情况下动态地添加额外的职责。**适配器模式可以与装饰者模式结合使用**，通过装饰者提供额外的功能，同时使用适配器模式来适配接口。
>- 与策略模式（Strategy Pattern）：
>   - 策略模式定义了一系列算法，并将每一个算法封装起来，使它们可以互换。**适配器模式可以用于策略模式中的算法接口的适配**。
>- 与组合模式（Composite Pattern）：
>   - 组合模式允许将对象组合成树形结构以表示“部分-整体”的层次结构。**适配器模式可以用于组合模式中的叶节点或树枝节点**，以适配不同的组件接口。
8.	桥接（Bridge）模式：将抽象与实现分离，使它们可以独立变化。它是用组合关系代替继承关系来实现，从而降低了抽象和实现这两个可变维度的耦合度。
9.	装饰（Decorator）模式：动态的给对象增加一些职责，即增加其额外的功能。
10.	**外观（Facade）模式**
- 为多个复杂的子系统提供一个一致的接口，使这些子系统更加容易被访问。
>外观模式 Facade Pattern , 也被称为“⻔⾯模式”，是⼀种结构型设计模式，外观模式定义了⼀个⾼层接⼝，这个接⼝使得⼦系统更容易使⽤，同时也隐藏了⼦系统的复杂性。
>⻔⾯模式可以将⼦系统关在“⻔⾥”隐藏起来，客户端只需要通过外观接⼝与外观对象进⾏交互，⽽不需要直接和多个⼦系统交互，⽆论⼦系统多么复杂，对于外部来说是隐藏的，这样可以降低系统的耦合度。
>举个例⼦，假设你正在编写的⼀个模块⽤来处理⽂件读取、解析、存储，我们可以将这个过程拆成三部分，然后创建⼀个外观类，将⽂件系统操作、数据解析和存储操作封装在外观类中，为客户端提供⼀个简化的接⼝，如果后续需要修改⽂件处理的流程或替换底层⼦系统，也只需在外观类中进⾏调整，不会影响客户端代码。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-203.png?raw=true)
- **松散耦合**
    - 使得客户端和子系统之间解耦，让子系统内部的模块功能更容易扩展和维护；
- **简单易用**
    - 客户端根本不需要知道子系统内部的实现，或者根本不需要知道子系统内部的构成，它只需要跟Facade类交互即可。
- **更好的划分访问层次**
    - 有些方法是对系统外的，有些方法是系统内部相互交互的使用的。子系统把那些暴露给外部的功能集中到门面中，这样就可以实现客户端的使用，很好的隐藏了子系统内部的细节。
11.	享元（Flyweight）模式：运用共享技术来有效地支持大量细粒度对象的复用。
12.	组合（Composite）模式：将对象组合成树状层次结构，使用户对单个对象和组合对象具有一致的访问性。
13.	模板方法（TemplateMethod）模式：定义一个操作中的算法骨架，而将算法的一些步骤延迟到子类中，使得子类可以不改变该算法结构情况下重定义该算法的某些特定步骤。
14.	⭐**策略（Strategy）模式**
- 策略模式是⼀种⾏为型设计模式，它定义了⼀系列算法（这些算法完成的是相同的⼯作，只是实现不同），并将每个算法封装起来，使它们可以相互替换，⽽且算法的变化不会影响使⽤算法的客户。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-202.png?raw=true)
- 使⽤场景 
那什么时候可以考虑使⽤策略模式呢？
当⼀个系统根据业务场景需要动态地在⼏种算法中选择⼀种时，可以使⽤策略模式。例如，根据⽤户的⾏为选择不同的计费策略。
当代码中存在⼤量条件判断，条件判断的区别仅仅在于⾏为，也可以通过策略模式来消除这些条件语句。
在已有的⼯具库中，Java 标准库中的 Comparator 接⼝就使⽤了策略模式，通过实现这个接⼝，可以创建不同的⽐较器（指定不同的排序策略）来满⾜不同的排序需求。
15.	命令（Command）模式：将一个请求封装为一个对象，使发出请求的责任和执行请求的责任分割开。
16.	职责链（Chain of Responsibility）模式：把请求从链中的一个对象传到下一个对象，直到请求被响应为止。通过这种方式去除对象之间的耦合。
17.	**状态（State）模式**
    - 状态模式是一种行为设计模式，它允许一个对象在其内部状态改变时改变它的行为。对象看起来好像修改了它的类。
    - 状态模式的关键是引入了一个抽象类，它可以有多个子类，每个子类表示一个具体的状态。而对象的属性中就保存了一个指向抽象状态类的指针，这样对象就可以动态地改变它的状态。
    - 状态模式的结构：
        - Context（环境类）：环境类是拥有多种状态的对象，它可以是一个电梯、一个游戏角色等。环境类需要维护一个抽象状态类的实例，这个实例定义当前状态。
        - State（抽象状态类）：抽象状态类是一个接口，或者是一个抽象类，它定义了一个接口，用于封装环境对象中的特定状态所对应的行为。
        - ConcreteState（具体状态类）：具体状态类是抽象状态类的子类，它实现了抽象状态类中定义的接口，完成了特定状态下的行为。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-231.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-205.png?raw=true)
context和state之间的连接时左边空心菱形右边箭头，代表聚合关系，context中有state的引用。
    - 状态模式的优点：
        - 状态模式将与特定状态相关的行为局部化，并且将不同状态的行为分割开来。
        - 状态模式使得状态转换显式化，使得状态之间的转换更加明确。
    - 状态模式和状态图和类图的关系：
        - 状态模式是一种设计模式，它是一种行为设计模式，它允许一个对象在其内部状态改变时改变它的行为。
        - 状态图是一种图形化的表示方法，它用来表示一个对象的状态和状态之间的转换关系。
        - 类图是一种图形化的表示方法，它用来表示一个对象的类和类之间的关系。
    - 使⽤场景 
        - 状态模式将每个状态的实现都封装在⼀个类中，每个状态类的实现相对独⽴，使得添加新状态或修改现有状态变得更加容易，避免了使⽤⼤量的条件语句来控制对象的⾏为。但是如果状态过多，会导致类的数量增加，可能会使得代码结构复杂。
        - 总的来说，状态模式适⽤于有限状态机的场景，其中对象的⾏为在运⾏时可以根据内部状态的改变⽽改变，在游戏开发中，Unity3D 的 Animator 控制器就是⼀个状态机。它允许开发⼈员定义不同的状态（动画状态），并通过状态转换来实现⻆⾊的动画控制和⾏为切换。

18.	观察者（Observer）模式：多个对象间存在一对多关系，当一个对象发生改变时，把这种改变通知给其他多个对象，从而影响其他对象的行为。
19.	中介者（Mediator）模式：定义一个中介对象来简化原有对象之间的交互关系，降低系统中对象间的耦合度，使原有对象之间不必相互了解。
20.	迭代器（Iterator）模式：提供一种方法来顺序访问聚合对象中的一系列数据，而不暴露聚合对象的内部表示。
21.	访问者（Visitor）模式：在不改变集合元素的前提下，为一个集合中的每个元素提供多种访问方式，即每个元素有多个访问者对象访问。
22.	备忘录（Memento）模式：在不破坏封装性的前提下，获取并保存一个对象的内部状态，以便以后恢复它。
23.	解释器（Interpreter）模式：提供如何定义语言的文法，以及对语言句子的解释方法，即解释器。
## 各种图总结
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-130.png?raw=true)
分别是需求分析阶段（用例图、流程图？）、概要设计阶段（类图，对象图）、详细设计阶段（时序图，状态图，活动图）、实现阶段（构件图、部署图）。
### 1、用例图(UseCase Diagrams)
用例图主要回答了两个问题：1、是谁用软件。2、软件的功能。从用户的角度描述了系统的功能，并指出各个功能的执行者，强调用户的使用者，系统为执行者完成哪些功能。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-141.png?raw=true)
#### 用例图中的角色
- 参与者 Actor，具有行为的某物，可以是人，也可以是一个系统，一个组织
    - 主要参与者-primary actor
        - 例如收银员，顾客
    - 次要参与者-supporting actor
        - 可以是计算机系统，也可以是组织或者人
        - 例如外部接口提供者
    - 幕后参与者-offstage actor
        - 政府税收机构
- 用例 Use Case，系统的功能，是系统的一个功能单元，是一个完整的业务流程
    - 成功场景和失败场景的集合
    - 用例应该以文本为重，而不是以图为重 
    - 分类：业务用例与系统用例
        - 用例模型主要关注的是系统用例
    - 用例不是面向对象的
    - 用例就是需求
        - 主要是FURPS+中的F(功能性需求)

- 场景 Scenario，参与者与系统间的一组特定动作的交互序列

用例图中的关系有四种：关联、泛化、包含、扩展
|关系类型|说明||
|---|---|---|
|关联|参与者与用例之间的关系|
|泛化|参与者之间或用例之间的关系|![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-140.png?raw=true)|
|包含|用例之间的关系，类似has-a，被包含的用例是一个大用例中的小步骤|![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-139.png?raw=true)|
|扩展|用例之间的关系，类似继承，从一个基础用例扩展而来，有额外的触发条件以及其他细节|![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-138.png?raw=true)|

四种用例类别：
- Concrete-具体用例
由参与者发起的，被其所期望的完整行为，可以单独存在
例如，EPB，处理销售用例

- Abstract-抽象用例
用于不能被自己实例化，只能作为别的用例的一部分存在，不能单独存在
例如，处理信用卡支付用例只能是处理销售用例的一部分，不能单独存在

- Base-基础用例
包含了其他用例的用例，或者作为被泛化，被扩展的对象的用例(超类/父类用例)，称为基础用例
例如，处理销售用例包含处理信用卡支付用例，所以它是基础用例

- Addition-附加用例
被包含，或者由其他对象泛化，扩展而来的用例是附加用例
例如，处理信用卡用例是附加用例

通常具体用例也是基础用例，抽象用例也是附加用例
#### 如何寻找用例
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-142.png?raw=true)
#### 测试用例是否有效的三种方式
- EBP（elementary business processes）测试
    - 是不是基本业务流程？
- 规模测试
    - 规模是否合适？会不会过小，只是一个完整用例的一小部分？
- 老板测试
    - 老板会不会满意，这个用例有没有价值？

例题：
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-191.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-143.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-144.png?raw=true)
### 2、类图（Class Diagrams）
- 用户根据用例图抽象成类，描述类的内部结构和类与类之间的关系，是一种静态结构图。 
- 设计类图DCD是静态视图，in Domain层
- 类图的定义能从交互图中产生，这表明一种线性顺序，即先绘制交互图，然后再绘制类图。
- 在UML类图中，常见的有以下几种关系: **泛化（Generalization）,  实现（Realization），关联（Association），聚合（Aggregation），组合(Composition)，依赖(Dependency)**。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-137.png?raw=true)
- 各种关系的强弱顺序： 泛化 = 实现 > 组合 > 聚合 > 关联 > 依赖
    |关系|符号表示|
    |---|---|
    |泛化关系|空心三角形+**实线**|
    |实现关系|空心三角形+**虚线**|
    |关联关系|**实线**箭头|
    |聚合关系|**空心**菱形+实线箭头|
    |组合关系|**实心**菱形+实线箭头|
    |依赖关系|**虚线**箭头|
    - 泛化关系：表示的是类之间或者接口之间的继承关系，注意是**子类指向父类**。
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-131.png?raw=true)
    - 实现关系（Realization）：表示的是**类和接口的关系**，类是接口所有特征和行为的实现。
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-132.png?raw=true)
    - 关联关系：表示的是类与类之间存在某种特定的对应关系，**通常是一个类里面有的属性的类型是另一个类。关联可以是单向的，也可以是双向的**。
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-133.png?raw=true)
        - 在边边上表示这个关联的名称
        - ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/<@]U)F8~8$X%%XL0J84PZ~}0.jpg?raw=true>)
选D，A如果把+改成-就对了；不加[+/-/#]符号，默认私有。属性或操作名前面的符号表示元素的可见性:如果使用了+符号，属性或操作具有公共级别的可见性;如果使用了-符号，则属性或操作是私有的。此外，#符号允许将操作或属性定义为受保护的，而~符号表示包的可见性。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-225.png)
    - 聚合关系：表示的是关联关系的一种特例，是强的关联关系，表示的是整体与部分之间的关系，部分不能离开整体单独存在。通常是一个类是另外一个类（主类）的一部分，但是主类与部分类不是“同生共死”的。聚合表示一种弱的"拥有"关系，体现的是**A对象可以包含B对象，但B对象不是A对象的一部分**；
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-134.png)
    - 组合(Composition)：表示的是聚合的一种特殊形式，表示的是类之间更强的组合关系。通常是一个类是另外一个类（主类）的一部分，但是主类与部分类是“同生共死”的。组合是一种强的"拥有"关系，体现了严格的部分和整体的关系，部分和整体的生命周期一样；比如：**A对象可以包含B对象，B对象是A对象的属性**；
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-135.png)
    - 依赖(Dependency)：表示的是类之间的调用关系，**通常是一个类里面的方法的参数类型是另一个类**。依赖关系也是类与类之间的联结 。依赖总是单向的。依赖关系在 Java语言中体现为局部变量、方法的参数或者对静态方法的调用。
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-136.png)

#### 限制关联
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-193.png)
加了限制符itemID之后就只能一一对应了
#### 导出元素-Derived Elements
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-194.png)
例如，可以通过Sale其他属性和方法来直接确定total的值，那么把total叫做导出元素
#### 接口
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/a4d35850f29b4d507ce49f39fa63281.jpg?raw=true)
- 用插座线表示法表示拥有一个接口依赖（必要接口）
- 用棒棒糖表示法表示提供一个接口依赖（提供接口）
- 用虚线表示法表示实现一个接口依赖（实现接口）
#### 聚合关系的两种子类型
- 聚合：has-a，整体与部分之间的关系，部分可以离开整体单独存在
    - 按照value传递（has by value），整体和部分之间的生命周期不一样，用实心小方块表示
    - 按照reference传递（has by reference），整体和部分之间的生命周期一样，用空心小方块（hollow box）表示
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/[WGL3@0{}76IT3%@CYQNF_E.png)
- 组合：contains-a，整体与部分之间的关系，部分不能离开整体单独存在，但是组合关系更强，部分和整体的生命周期一样

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/GOVT%5IPH49LV%$8S_MIE02.jpg?raw=true)
选A。
#### 活动类
活动对象的类为活动类。用双竖线表示。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-224.png)
#### 关联类
用从关联到关联类的虚线表示关联类。
#### 模板类
T写在类名的右上角表示模板类
### 3、对象图（Object Diagrams）
对象图描述的是对象之间的关系，也可以理解为系统在某一个时刻的图像。对象图是在比较具体的层次上描述，比如描述一个系统的各个类的对象是如何组合的。对象图没有类图那么复杂，对象的表示和类相似，只是在名字域要标明对象名和所属类名，两者用冒号分隔，属性域要标识出属性的具体值，对象之间的关系都是用实线段相连。现在很少将对象图独立画出来，一些CASE工具，如Rational Rose 2002就没有提供对象图。对象的概念更多的是用在动态的模型图中

### 4、状态(机)图（State Diagrams）
- 尽量考虑状态相关的复杂对象，而不是考虑状态无关的对象
    - 即各个状态之间应该是有关联的 而不是独立的
- 业务系统中通常信息复杂的状态相关类很少，状态机图作用不大
    - 而在交叉领域，电信，过控等，状态机图作用很大
- 状态是圆角矩形
#### 示例
- 打电话
    - (ldle-等待中 off hook-拿起电话 on hook-放下电话)
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-181.png)
    - （监护条件 只有当valid subscriber(有效订阅者)为真时才会执行状态转换）(play dial tion-播放拨号音)
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-182.png)
- 嵌套状态图
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-183.png?raw=true)
- 网页导航的一个状态图
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-185.png?raw=true)
- Next gen pos的一个状态图
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-184.png?raw=true)
>状态图以状态的概念描述对象、子系统、系统在生命周期中的各种行为，简单的说就是一个状态图只描述某一个对象（可以是类、程序模块、系统）的行为。通过状态图可以知道一个对象、子系统、系统的各种状态及其收到的消息对其状态的影响。世界万物都有可以描述的状态，因此都可以通过状态图来描述他们的行为，状态图具有很强的表达能力。

>状态图有以下几种常用的模型元素：状态（State）、转换（Transition）、起始状态（Start State）、终止状态（End State）。状态描述一个对象的生命周期中某个时间段的特征，状态是用圆角的矩形表示；转换描述状态间的转移，用一个带箭头的实线段表示，还可以给转换添加标注，通过标注来描述引起状态转移的事件、条件和要执行的操作，标注的格式为：事件名[条件]/操作，标注的每个部分都可以省略；起始状态描述对象生命周期的开始阶段，用一个黑色的圆表示，有时为了表述清楚，在不产生混淆概念的情况下，可以省去起始状态；终止状态描述对象生命周期的终止阶段，用一个带圆形外框的黑色圆表示，一个状态图可以有多个终止状态，有时为了表述清楚，在不产生混淆概念的情况下，可以省去终止状态
### 5、活动图（Activity Diagrams）
活动图以及数据流图
活动图分为：
- Partion-分区
- join-连接点
- action-动作
- fork-分叉点，这里可以支持concurrent-并发，除此之外，顺序图也支持并发
- object node-对象节点
活动图非常适合在业务流程建模中使用(Business Process Modeling)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-174.png?raw=true)

数据流图(DFD，Data Flow Diagram)
- UML中没有DFD，但是我们可以使用活动图进行等价替换
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-175.png?raw=true)
（applicant-申请人）
该图也可以使用活动图来等价表示
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-176.png?raw=true)
活动图中的靶子节点，决策节点以及合并节点
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-177.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-178.png?raw=true)

活动图中的信号节点
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-179.png?raw=true)
(显示了一个时间信号和一个取消信号)

#### Tips
- 活动图在涉及多方的业务流程建模中非常好用，而对于简单的流程，用例以及足够了
- 多使用扩展节点，来使第一级的图具有抽象性，可以比较直观看出整体的情况
- 具体细节放在二，三级的图中展示

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-180.png?raw=true)
(Next gen pos的一个活动图)

>活动图是通过一系列活动描述对象的行为，对象可以是程序、模块、子系统、系统。通过活动图，可以了解所描述对象的要进行的各种任务和过程。

>活动图常用的模型元素包括：活动（Activity）、起始点（Start）、终止点（End）、转换（Transition）、对象（Object）、条件判断（Decision）、同步条（Synchronization Bar）、信息流和泳道（Swinlane）。活动描述的是系统要完成的一个任务或要进行的一个过程，是活动图中的一个原子活动，活动用一个圆角的矩形表示，并标上活动名；起始点描述活动图的开始状态，与状态图类似，用一个黑色的圆标识，活动图可以有多个起始点；终止点描述活动图的终止状态，与状态图类似，用一个带圆圈的黑色圆表示，活动图可以有多个终止点；转换描述活动之间的转换，也就是被描述对象的控制流，转换用带箭头的实线段表示，箭头指向转向的活动，可以在转换上用文字标识转换发生的条件；对象是活动图中参与的对象，它可以发送信号给活动或是接收活动的信号，也可以表示活动的输入/输出结果，对象的表示和对象图中的表示相同；条件判断描述活动间转换的分支，只有一个流入的信息流，不同的条件下输出的信息流有不同的流向，条件判断用一个菱形表示;同步条描述活动之间的同步，一般有多个信息流流入，多个信息流流出，必须是流入的信息流都到达，流出的信息流才能同时流出，同步条用一条较粗的水平的或是垂直的实线段表示；信息流描述活动和对象的交互关系，对象可以作为活动的输入/输出，也可以作为一个实体，接收活动的信号或是向活动发送信号，信息流用带箭头的虚线段表示，箭头标识信息流的方向；泳道描述的是活动图中的活动的分组，通常，可以将活动按照某种标准分组，泳道在UML活动图中的表示就是在横向上将活动图划分出一个纵向的区域，同组的活动和对象都在这个区域中，区域之间用虚线分隔。
### 6、时序图（Sequence Diagrams，SD）
交互图有两大类-顺序图和通信图，它们都是动态视图
#### 图像细节
- 生命线(lifeline)，说明生命对象的虚线
- 未命名实例的类实例(也就是说有这个实例，但没有给它名字，隐式调用各种操作)`:Sale`
- 已命名的实例`s1:Sale`
- 对元类实例(meta class)的表示 `《mataclass》`
- 对于数组，列表，接口的表示方法
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-152.png?raw=true)
- 数字1表示单例模式中的单例对象
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-153.png?raw=true)
- 执行规格条 execution specification bar 
- 未指定创建者的创始信息（doX）
- 实心箭头表示同步信息
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-154.png?raw=true)
- 表达返回值的两种方法
    - 直接用虚线返回
    ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-155.png?raw=true)
    - 用 `returnVar=message(parameter): returnType`来返回
- 发给自己的信息：指回执行规格条
- 实例的创建，用虚线且等高
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-156.png?raw=true)
- 实例的销毁
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-157.png?raw=true)
#### 信息图框(Frame)
图框分类：
|Frame Operator	|Meaning||
|:---:|:---:|---|
|alt	|Alternative fragment for mutual exclusion; conditional logic expressed in the guards 可选的互斥选项 类似if-else|![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-159.png?raw=true)|
|loop	|Loop fragment while guard is true; can also write loop(n) to indicate looping n times 循环 类似for|![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-160.png?raw=true)|
|opt	|Optional fragment that executes if guard is true 可以选择的选项，例如开发票，可以执行也可以不执行，而alt必须执行一个|![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-158.png?raw=true)|
|par	|Parallel fragments that execute in parallel 并行执行的片段|
|region	|Critical region within which only one thread can run 临界区，同一时刻只能被一个元素访问|
#### 顺序图中的多态，异步以及引用
可以用ref表示引用
> 在整个顺序图周围放置图框，并加上sd标记和诸如`AuthenticateUser`这样的名字
> 用`ref`表示引用，该引用指向另一个已经命名的顺序图

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-161.png?raw=true)
对于多态，创建分离的实例
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-162.png?raw=true)
异步：
刺箭头(stick arrow)代表异步调用
clock是一个主动类(active class)产生的主动对象，可以随时执行交互
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-163.png?raw=true)
通信图中的异步调用：
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-164.png?raw=true)


### 7、系统顺序图（System Sequence Diagrams，SSD）
- 大部分SSD在细化阶段被创建，有利于编写操作契约，初始阶段一般不画SSD
- 输入用例文本及其隐含的系统事件，输出是系统操作，最终再进一步可以编写得到系统的操作契约
- SSD用来描述用例的一个特定场景
- 系统顺序图用来说明与系统有关的输入输出事件
- 在SSD中，系统被建模为黑盒，不需要知道其具体实现
- `:`或者`下划线`表示其为实例
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-223.png?raw=true)
- 与SD的区别：系统顺序图表示外部参与者与系统之间的交互，而顺序图表示的是系统内部的交互
    - 此时系统不再被建模为黑盒
    - 系统顺序图用来分析用例中的交互行为
    - 而顺序图用来分析类中的具体方法
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-149.png?raw=true)

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/<7IU$4$QSGSV3WDZJXSBL(15.jpg?raw=true>)选C
#### operation contract
- 后置条件postcondition有三种类型：
    - instance creation/deletion
    - attribute modified
    - association formed and broken
- how to
    - identify the system operation from SSDs
    - 对每一个complex，subtle的操作，写一个operation contract
    - 写后置条件
### 8、协作图（Collaboration Diagrams）
### 9、构件图（Component Diagrams）
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-186.png?raw=true)

构件图描述系统中的构件以及构件之间的依赖关系，构件图是在很具体的层次描述系统的物理结构。

构件图有一下几个主要的模型元素：构件、接口、依赖关系。构件就是定义了良好接口的实现代码单元，已经成为系统的一部分。构件并不依赖于其他的构件，只依赖于其所支持的接口，因此，构件是可替换的，只要新的替换构件支持相同的接口就可以，**构件用一个左边有两个小矩形的大矩形表示**；**接口用于描述构件定义的接口，用一个圆圈表示，它与构件是用实线段相连**；**依赖关系描述的是构件之间的依赖关系，用带箭头的虚线段表示，箭头一段的是被依赖的构件**。
uml1.4：
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-187.png?raw=true)
uml2.0：
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/288f0760a23f8a6092eab4d8f20a053.jpg?raw=true)
### 10、部署图（Deployment Diagrams）
部署图描述任何基于计算机的应用系统的物理或逻辑的配置。它可以描述系统硬件的物理拓扑结构和在此结构上执行的系统软件，也能描述系统节点的拓扑结构和通信路径、节点上运行的构件、构件中的逻辑单元等。

部署图中有以下几个主要的模型元素：节点、构件、对象、接口、连接和依赖关系。**节点描述一个物理设备以及在其上运行的软件系统，用一个立方体来表示**。**连接是节点之间的通信路径，用实线段来表示**。
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-188.png?raw=true)

### 包图（Package Diagrams）
- 什么是逻辑架构(logical architecture)和层？
    - 逻辑架构是软件类的宏观组织结构，它将软件类组织为包，层等
    - 层是对包，类，子系统的粗粒度的分组分组内的元素职责是高度内聚的

#### 信息系统逻辑架构中常见的层
松散分层耦合
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/f2622a3cd98ef2d260b8a15407baf7c.jpg?raw=true)

![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-151.png?raw=true)
- domain model 启发了 设计模型中架构的domain layer
- 从UI层发送到领域层的消息将是SSD中描述的消息。
- 好处： 总的来说，使用层可以做到关系分离，高级服务和低级服务分离，特定于应用的服务与一般性的服务分离。层可以减少耦合和依赖性，增强内聚性，提高潜在的复用性并且使得概念更清晰
### 通信图（Communication Diagrams）
#### 链
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-173.png?raw=true)
#### 实例创建
(三种都可以)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-172.png?raw=true)
#### 顺序编号
（不为第一个信息编号！！！）
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-171.png?raw=true)
#### 条件判断
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-170.png?raw=true)
#### ALT-互斥判断
从无编号信息msg1出发，走1，而1分为1a与1b，是互斥条件判断，选一条路走，走完之后回到编号2上
 ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-169.png?raw=true)
#### 循环迭代
用*来表示循环
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-168.png?raw=true)
也可以省略循环变量的范围 
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-167.png?raw=true)

#### 静态方法调用
直接用元类来表示，它不是实例，它就是一个类
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-166.png?raw=true)
#### 多态信息
与顺序图类似，分开表示
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-165.png?raw=true)
## 模型
### 1、领域模型
不写方法，区别于类图
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/IH%]BLD$6CO7V2XUVRQ874A.jpg?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-148.png?raw=true)
- 领域模型是可视化的概念类的词典，是对现实世界概念类的表示
- 领域模型中的类可以有属性
- 领域模型中的对象是概念类 而不是软件类 
- 领域模式是概念透视图，属于分析阶段
- 概念符号，概念内涵，概念外延
- 领域模型中的属性一般只能是基本数据类型，如果有别的类作为属性，要把其建模为关联
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-146.png?raw=true)
#### 如何创建领域模型
1.	寻找概念类
2.	将它们绘制成UML类图中的类
3.	添加属性和关联
#### 如何寻找概念类
经验法则：
- 如果X不是现实世界中的文本或者数字，那么它就很可能是概念类
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-147.png?raw=true)
#### 关联
- 关联是类之间的关系，表示有价值，值得关注的连接，领域模型中的关联默认是双向的
- 这种双向性与软件实体间的连接无关
- 两个类之间可能有多个关联
- 关联命名：类名-动词短语-类名
- 阅读方向箭头 ：没有特别意义，也不代表方向性和可见性
#### 操作契约
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-150.png?raw=true)
- 操作契约使用**前置**和***后置条件***的形式，描述领域模型里对象的详细变化，并将其作为系统操作的结果
- 操作契约也可以看作UP用例模型的一部分，它对系统操作的效用提供了更详细的分析
- 只有当用例中的交互过程过于复杂时，才需要使用操作契约
- 操作契约的主要输入是SSD中确定的系统输入，来反映系统黑盒内部各个领域对象的交互变化情况

- 后置条件
    - 后置条件描述了在系统操作后，领域模型内对象状态的变化
    - 具体分为属性的变化，实例的增加和删除，关联的增加和删除
    - 主要分析的是什么状态变化会发生，而不是怎么发生
    - 后置条件是对领域模型的观察结果，不是操作过程的活动
### 2、状态机模型
### 3、用例模型
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-221.png?raw=true)
#### 用例实现
用例实现就是设计模型
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/faff094d9258c153b91dbfe33a73ead.png?raw=true)
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/fcc89a708152a7954fa1768fe83a044.png?raw=true)
# 2024选择题
有人抄下来了，去找找；
有外观模式、工厂模式、代理模式、时序图
# 2024名词解释
- OOA
- uml
- RUP
- GRASP
- pattern
# 2024简答题
- liskov替换原则，不遵循的eamples和后果
- how to enhance adpater pattern with other patterns?
# 建模题，场景
- 定义一些类，画类图
- 定一个用例，写用例文本，画用例图
## 针对场景练习：
### ATM机
- ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-229.png?raw=true)
- ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-227.png?raw=true)
- ![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-228.png?raw=true)
### 银行业务+买股票（2024最终考了银行账户+买股票）
- bank
- customer
- account
    - forsaving
        - interstrate
    - forinvestment
- stock
    - ticker
- stockorder
### 火车订票12306

# 综合设计题
## 可能涵盖的内容
- 用例图、用例模型，用例文本、领域模型、类图、状态机图、设计模式
### 采用GoF的一种设计模式来对状态图或者类图进行修正
从三个场景中选择：
### 智能家居中的远程控制
### 汽车租赁（2024考了汽车租赁画用例图、领域模型、状态图、状态模式修正reservationform类）滴滴打车
- customer
    - online or onphone
    - make reservation
    - fill reservation form
        - states of form: submitted、approved、refused)
    - query reservation form and record 
- salesman
    - process reservation form
    - query customer personal information
    - query reservation form and record
- system
    - store reservation form
    - store reservation record
- maintainer
    - resgist
    - query checkList of vehicles
### 电商拼多多
#### 用例图和类图
![alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-230.png?raw=true)

