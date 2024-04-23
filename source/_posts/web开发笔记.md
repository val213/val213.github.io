---
title: web开发笔记
tags: web开发
categories: 技术分享
---
## 概述
一个现代的企业级web项目的开发流程一般包括：前期准备、开发实现、上线部署、运维等阶段。

1. 前期准备阶段，您需要确定您的网站的需求分析、功能设计、技术选型等，并制定一个合理的开发计划和时间表。

2. 开发实现阶段，您需要按照**前后端分离**的原则，先定义好数据交互接口和数据格式，并使用mock数据或工具进行测试。

3. 然后分别进行前端和后端的开发工作，并使用版本控制工具进行代码管理。后端开发需要先做好项目架构的搭建，然后查看页面原型，明确需求；阅读接口文档；思路分析；接口开发；接口测试；前后端联调。

4. 最后进行前后端的集成测试和调试，确保功能正常运行。

5. 上线部署阶段，您需要选择一个合适的云服务器平台，并配置好相关的环境和服务。然后将您的前端代码打包并上传到静态资源服务器上，并将您的后端代码部署到应用服务器上。最后进行上线测试和监控，确保网站稳定运行。

以 `https://github.com/OHUHO/portal' 为例，我们将在下面的章节中记录把该前后端分离的项目部署到服务器上并调通实现交互调用的过程以及介绍每个阶段的开发遇到的问题相关的知识。


## 需求分析


## 前端开发
### json（js object notation）
JSON是通过JS对象标记法书写的文本，由于其语法简单，层次结构鲜明，现多用于数据载体在网络中进行数据传输。

#### json字符串和js对象的转换
```js
// js对象转json字符串
var obj = {name: 'zhangsan', age: 18};
var str = JSON.stringify(obj);
console.log(str); // {"name":"zhangsan","age":18}
```
```js
// json字符串转js对象
var str = '{"name":"zhangsan","age":18}';
var obj = JSON.parse(str);
console.log(obj); // {name: "zhangsan", age: 18}
```

### BOM(broswer object model)

### DOM(document object model)

### tailwindcss
tailwindcss是一个实用的工具类优先的css框架，它提供了一系列的工具类，可以通过组合这些工具类来快速构建页面。它的特点是不提供任何预定义的样式，而是提供了一系列的工具类，可以通过组合这些工具类来快速构建页面。

## Vue
### Vue指令
- v-bind: 为html标签绑定属性值，如设置为href、css等
- v-model:在表单元素上创建双向数据绑定
- v-on:绑定事件监听器，如click、mouseover等
- v-if/v-else-if/v-else:条件渲染
- v-show:条件渲染，与v-if的区别是v-show是通过display:none来控制元素的显示与隐藏，而v-if是直接从dom中移除元素
- v-for:循环渲染

### vue的生命周期
指的是一个对象从创建到销毁的过程，每触发一个一个生命周琴就会调用一个钩子函数。
- beforeCreate:实例创建之前
- created:实例创建之后
- beforeMount:挂载之前
- mounted:挂载之后
- beforeUpdate:更新之前
- updated:更新之后
- beforeDestroy:销毁之前
- destroyed:销毁之后

一般会在挂载之后，利用mounted函数向服务端发送请求。

### Ajax-Axios
#### Ajax
Ajax（Asynchronous JavaScript and XML）是一种创建交互式网页应用的网页开发技术，它可以在不重新加载整个网页的情况下，与服务器交换数据并更新部分网页内容。Ajax可以使网页实现异步更新，这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

比如：搜索联想、用户名校验等。
#### Axios
Axios对原生的Ajax进行了封装，提供了更加简洁的API，并且支持Promise。

### 前端工程化
#### 如何创建vue项目？
推荐配置淘宝镜像，特别是网络不好的情况下……
```shell
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```
在全局安装脚手架：
```shell
$ cnpm i -g @vue/cli 或npm i -g @vue/cli
```
然后创建存放项目的目录并进入：
```shell
$ mkdir 目录名 && cd 目录名
```
```shell
$ vue create 项目名
```
然后选择不同版本的`default`配置或者`Manually select features`手动配置。

进入刚刚创建的项目文件夹
```shell
$ cd 项目名
```
启动！
```shell
$ npm run serve
```

#### 接口文档平台：apifox


#### vue-cli
vue-cli是vue官方提供的脚手架工具，它可以帮助我们快速搭建vue项目的基本结构，从而可以更加专注于业务逻辑的开发。


#### vue工程结构
- vue配置文件：vue.config.js
- vue组件：以.vue结尾，每个组件由三部分组成：template、script、style
- vue路由：路由配置文件，用于配置路由信息
- main.js：入口文件，用于创建vue实例并挂载到页面上
- App.vue：根组件，用于挂载其他组件
- assets：静态资源文件夹，用于存放图片、字体等资源
- components：组件文件夹，用于存放自定义组件
- views：视图文件夹，用于存放页面组件
- router：路由文件夹，用于存放路由配置文件
- store：状态管理文件夹，用于存放vuex相关文件

### element-plus


### 一些奇奇怪怪的问题/报错
#### npm fund

#### vue/cli和vite
vue-cli在(前端)服务启动之前，要把所有代码打包成Bundle再启动服务，这也是为什么一个些大型项目 启动时，特别慢的原因。这一点在Vite做了大幅度改善
Vite的特点：

Vite是Vue团队开发的新一代前端开发与构建工具，vite不是基于webpack, 它为了解决项目启动慢的问题，vite通过一开始将应用中的模块分为依赖和源码两类，改进了开发服务器的启动慢的特点；

依赖： 大多为在开发时，不会变动的纯js，一些较大的依赖(例如有上百个模块的组件库：element-ui) ,处理的代价很高。依赖通常会存在多种模块化的格式.vite会使用esbuild预构建依赖，esbuld使用Go编写，并且比 js编写的打包器，速度快10-100倍；

源码： 通常包含一些并非直接是js的文件，需要转换，时常被编译。同时，并不是所有的源码都需要同时被加载。(例如：基于路由拆分的代码模块)。

以上 这就是为什么vite启动快的原因；


##### Vite与Vue-cli之间的区别
vite是基于原生Es6 Modules，在生产环境下打包使用的Rollup；

vue-cli基于webpack封装，生产环境和开发环境都是基于webpack打包；

所以两者在生产环境都是基于源代码的文件打包。

在开发环境中，Vite是基于原生的es6，无需对代码进行打包，浏览器可以直接调用，所以说vite因为基于浏览器的原生功能，省掉了打包过程，在开发环境中体验极好；

#### npm ERR! missing script: dev
npm报错：xxx packages are looking for funding run `npm fund` for details（解决办法）

报错原因：这里是开发者捐赠支持的提示，打开一个github的链接之后，会显示是否需要打赏捐赠的信息。解决方案：这个打赏是自愿的，因此我们选择不打赏（即在后面加 --no-fund）即可解决。​如：在本次执行的语句为npm install crypto-js则我们在后面加上 --no-fund 即可解决：npm install crypto-js--no-fund​
#### element-plus的安装&&引入、
在项目文件夹下安装element-plus：
1. 之前尝试过使用如下命令安装，但是后来在引入的时候浏览器总是报错：
```shell
$ npm install element-plus --save
```
报错：
```shell
app.js:106 Uncaught TypeError: Cannot read property 'isCE' of null
    at renderSlot (runtime-core.esm-bundler.js?ef6b:2812)
    at eval (button.vue?8ea2:70)
    at normalizeChildren (runtime-core.esm-bundler.js?ef6b:7001)
    at createBaseVNode (runtime-core.esm-bundler.js?ef6b:6812)
    at _createVNode (runtime-core.esm-bundler.js?ef6b:6889)
    at createVNodeWithArgsTransform (runtime-core.esm-bundler.js?ef6b:6766)
    at createBlock (runtime-core.esm-bundler.js?ef6b:6738)
    at Proxy.eval (button.vue?8ea2:70)
    at renderComponentRoot (runtime-core.esm-bundler.js?d2dd:815)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js?d2dd:5704)
```
考察到我使用的脚手架是`vue/cli`，所以使用了第二种方法(同样是在项目文件夹下执行):
```shell
$ vue add element-plus
```
在未引入router之前，element-plus的引入如下（在入口文件main.js中自动配置）
```js
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import installElementPlus from './plugins/element'
import 'element-plus/dist/index.css'

const app = createApp(App)

installElementPlus(app)
app.use(ElementPlus).mount('#app')
```
再次修改app.vue中的内容，引入element-plus的组件，成功显示了。

再总结一下原因大概是，使用vue/cli自带的插件命令安装element-plus会自动配置，比较方便，避免了一些奇奇怪怪的问题。？

#### node版本管理和nvm
Windows下安装nvm不要用npm！如果你使用了
```shell
$ npm install -g nvm
```
那么请你
```shell
$ npm uninstall -g nvm
```
然后到github上下载nvm-windows的安装包，安装即可。不需要卸载已有的nodejs，nvm会自动管理nodejs的版本。
##### nvm常用命令
- nvm list：查看已安装的node版本
- nvm install 版本号：安装指定版本的node
- nvm use 版本号：切换到指定版本的node
- nvm uninstall 版本号：卸载指定版本的node

#### nust.js
nust.js是一个基于vue.js的服务端渲染框架，它可以帮助我们快速搭建一个服务端渲染的项目，从而可以更好的优化SEO，提高网站的访问速度。

如果使用了nust，项目就没有main.js入口文件了，而是使用nuxt.config.js配置文件来配置项目的一些信息。

### vue 路由
vue router是vue的官方路由管理器，它和vue.js是深度集成的，适合用于构建单页面应用。vue router的核心是一个用于控制页面显示的vue组件，以及一个用于控制页面跳转的路由器。
### 打包部署
前端网站的默认端口是80。

```shell
$ npm run build
```
如果报错如下：
```shell
> city-font-a0@0.1.0 build
> vue-cli-service build

'vue-cli-service' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

```
则需要先安装vue-cli-service：
```shell
$ npm install
```

然后继续尝试打包，一般就可以成功了。

打包完之后可以得到一个dist文件夹，压缩后上传到服务器再解压到根目录下，把里面的文件拆散放在网站的目录下，就完成了前端的部署。

### Nginx
Nginx 是一款轻量级的web服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器。

将打包好的静态资源文件放到Nginx的html目录下，然后配置Nginx的配置文件，将请求转发到html目录下的index.html文件，这样就可以通过Nginx来访问我们的网站了。

## 后端开发相关
### 开发规范-RESTful
REST(REpresentational State Transfer)表述性状态转换，一种软件架构风格

REST是风格，是约定，不是规定，可以打破。
描述模块的功能通常使用复数，如：/users、/orders、/products等。表示此类资源而不是单个资源。
#### 统一响应结果封装类引入（result）
### maven
maven是apache开源项目基金会旗下一个项目管理工具，它包含了一个项目对象模型（POM：Project Object Model），一组标准集合，一个项目生命周期(Project Lifecycle)，一个依赖管理系统(Dependency Management System)，和用来运行定义在生命周期阶段(phase)中插件(plugin)目标(goal)的逻辑。
#### 依赖管理

### web入门
#### spring boot
spring boot 是一个快速开发框架，它可以基于spring框架快速构建独立的、生产级别的应用程序。spring boot可以自动配置大部分的应用程序，从而减少了开发者的工作量和配置文件的数量。
#### 协议
#### tomcat
#### servlet？


### 数据库

#### mysql可视化
mysql workbench是一个mysql数据库的可视化工具，可以通过它来管理数据库，比如创建数据库、创建表、插入数据、查询数据等。可以通过在mysql workbench中打开sql文件并写入use语句来把sql文件导入到指定的数据库中（注意不要保存，不然就改变了.sql文件了）。
#### 在IDEA中操作数据库

下载驱动，测试连接，开始操作。


#### 数据库配置四要素
```shell
#驱动类名称
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#数据库连接地址
spring.datasource.url=jdbc:mysql://localhost:3306/database_name?(/mybaits)
#数据库用户名
spring.datasource.username=username
#数据库密码
spring.datasource.password=password
```

#### 数据库连接池
跟线程池一样，是一个容器，负责分配、管理数据库连接，它是应用程序与数据库之间的中间层，用于缓存数据库连接，避免每次数据库操作都重新创建连接，从而提高数据库操作的性能。

标准接口：dataSource

现在常用产品：druid(alibaba开源)、hikari(spring boot默认使用的连接池)

##### 如何切换数据库连接池
切换druid连接池：
```xml
<!-- 引入druid依赖 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.8</version>
</dependency>
```
```
# 配置druid连接池
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
```
#### 多表操作

#### mysql事务
事务是由一组SQL语句组成的逻辑处理单元，事务具有以下四个特性：原子性、一致性、隔离性、持久性。
##### 基本操作
开启事务，提交事务，回滚事务。
##### 四大特性（ACID）
- 原子性：事务是一个原子操作单元，其对数据的修改，要么全都执行，要么全都不执行。
- 一致性：事务执行前后，数据保持一致。
- 隔离性：事务的隔离性是多个用户并发访问数据库时，数据库为每一个用户开启的事务，不能被其他事务的操作数据所干扰，多个并发事务之间要相互隔离。
- 持久性：事务一旦提交，对数据的修改是永久性的，即使数据库发生故障也不应该对其有任何影响。
#### mysql索引
索引是帮助mysql高效获取数据的数据结构，索引是在mysql表中创建的，它们可以包含一个或多个列的值，使用索引可以快速访问数据库表中的特定信息。索引可以大大提高数据的查询效率，如果没有索引，mysql就必须扫描整个表中的所有记录，然后逐条进行比对，这种查询方式显然是非常耗时的。

### mybatis
***web后端开发采用的三层框架：（controller）控制层、（service）业务层、（dao）持久层。***


mybaits 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以对配置和原生Map使用简单的 XML 或注解，将接口和 Java 的 POJOs(Plain Old Java Objects,普通的 Java对象)映射成数据库中的记录。

#### 使用mybaits的步骤
1. 准备工作（创建spring工程、数据库表、实体类）
2. 引入mybaits依赖，配置mybaits（数据库连接信息）
3. 编写sql语句（注解/xml）
4. 
#### 配置mybaits中出现的一些问题

##### @Mapper和@Select注解失效？
Mapping文件里没有导入库：
```java
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
```
如果加了这两句ibaits爆红，说明可能是`pom.xml`中mybaits的版本太低，要修改依赖提高版本。

##### 报错找不到bean可能的原因
- 实现类没有写implements关键字绑定到接口类。
- 注解位置写错了（类或者是对象）

##### mybits版本问题
```shell
Java Spring Boot应用程序启动时的错误日志。错误的主要原因是Spring Boot应用程序无法初始化与MyBatis的配置。下面是错误的主要信息：

org.springframework.beans.factory.UnsatisfiedDependencyException: 这个异常表示依赖注入出错，通常是因为Spring容器无法满足一个bean的依赖。

org.springframework.beans.factory.BeanCreationException: 这个异常是在创建bean时发生的，通常是由于依赖问题。

org.springframework.beans.BeanInstantiationException: 这个异常表明在实例化bean时发生了错误。

java.lang.NoClassDefFoundError: org/springframework/core/NestedIOException: 这个异常表示找不到类org.springframework.core.NestedIOException，这可能是由于缺少相关的依赖库或版本不匹配引起的。

总的来说，错误链表的根本问题是MyBatis的配置出现了问题，导致Spring Boot应用无法启动。你需要检查你的MyBatis配置和依赖库是否正确，并确保它们与你的Spring Boot版本兼容。此外，确保所有必需的依赖库都已正确添加到你的项目中，以避免类加载问题。
```
原因：一开始的依赖我是直接复制的，虽然满足了springboot版本，但是mybaits-spring的版本也要和mybaits兼容。

解决方法：把`pom.xml`中的相关依赖版本更改一下。
```
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>3.0.2</version>
        </dependency>
```

##### 关于mybaits和spring依赖相关的一些需要注意的点
`<scope>test</scope>` 表示这些依赖仅在测试阶段可用，而不会在实际生产应用程序中使用。这通常用于引入测试框架、测试数据或测试工具，以确保你的应用程序能够进行单元测试、集成测试等。这些依赖不会打包到最终的部署包中。
具体来说，上述两个依赖的作用是：

`<dependency>`包含了 spring-boot-starter-test，这是 Spring Boot 提供的用于支持应用程序测试的 Starter 依赖。它包括了 JUnit、Spring Test 和其他一些测试相关的库。这些库通常用于编写和运行单元测试和集成测试。

`<dependency>`包含了 mybatis-spring-boot-starter-test，这是 MyBatis Spring Boot Starter 的测试模块。它提供了用于测试 MyBatis 数据访问层的支持，包括配置和工具，以帮助你编写 MyBatis 相关的测试。

在开发过程中，将这些测试依赖添加到项目中是很常见的，因为测试是确保应用程序质量和稳定性的重要部分。但是请注意，这些依赖不会被部署到生产环境中，它们只用于开发和测试。当你构建最终的可部署包时，这些依赖将不包括在内。

`<dependency> org.mybatis </dependency>`:

这个依赖项是 MyBatis 框架本身的核心依赖。它包含了 MyBatis 框架的核心库，你需要将其包含在你的项目中，以便使用 MyBatis 进行数据库操作。
这个依赖项通常与 MyBatis 的配置文件（如 mybatis-config.xml）、Mapper 接口和 SQL 映射文件一起使用。你需要手动配置 MyBatis 以连接到数据库，并将 SQL 查询映射到 Java 对象。

`<dependency> org.mybatis.spring.boot </dependency>`:

这个依赖项是 MyBatis Spring Boot Starter 的一部分，用于将 MyBatis 与 Spring Boot 集成。Spring Boot Starters 是 Spring Boot 提供的依赖管理工具，它们简化了在 Spring Boot 项目中集成各种框架的过程。

MyBatis Spring Boot Starter 包含了 MyBatis、Spring、Spring Boot 和其他必需的库的自动配置，以及一些默认配置。这意味着你可以更轻松地将 MyBatis 集成到 Spring Boot 项目中，而无需手动配置许多内容。

通常情况下，如果你正在使用 Spring Boot 来构建应用程序，建议使用 <dependency> org.mybatis.spring.boot </dependency>，因为它提供了自动配置和默认配置，减少了手动配置的工作。你可以通过在项目的 application.properties 或 application.yml 文件中配置一些属性来自定义 MyBatis 的行为。这种方式更符合 Spring Boot 的理念，使得集成更加简单。

如果你在一个非 Spring Boot 项目中使用 MyBatis，那么你应该使用 <dependency> org.mybatis </dependency>，并手动进行所有的配置工作。


#### mybaits_plus
mybaits_plus是mybaits的增强工具，它可以帮助我们更加方便的操作数据库，比如分页查询、逻辑删除等。

#### lombok
lombok是一个java库，可以通过注解的方式，简化java代码的编写，提高开发效率。

### mysql版本受限
在服务器上导入sql文件的时候报错：

```shell
#1273 - Unknown collation: 'utf8mb4_0900_ai_ci'
```

查得资料如下：

utf8mb4_0900_ai_ci 是 MySQL 8.0 版本中引入的一种新的排序规则，它基于 Unicode 9.0 标准，使用了人工智能（AI）技术来处理一些复杂的字符比较问题。

如果您的 MySQL 服务器版本低于 8.0，那么它就不会识别这种排序规则，从而导致 #1273 错误。为了解决这个问题，您有以下几种方法：

- 升级您的 MySQL 服务器版本到 8.0 或更高，以支持 utf8mb4_0900_ai_ci 排序规则。这是最推荐的方法，因为它可以让您享受到最新的功能和性能优化。
- 修改您的 SQL 文件，将 utf8mb4_0900_ai_ci 替换为其他 MySQL 服务器支持的排序规则，例如 utf8mb4_unicode_ci 或 utf8mb4_general_ci。这是最简单的方法，但可能会导致一些查询结果的差异或不准确。

- 修改您的 MySQL 服务器配置文件，添加一个skip-character-set-client-handshake 选项

由于服务器的内存限制，没办法升级mysql到8.0版本，所以这里是修改了sql文件，在MySQL workbench中查找替换，将utf8mb4_0900_ai_ci替换为utf8mb4_unicode_ci。

### 一些注解的理解
- @RequestBody和@RequestParam的区别
  前者是用于接收json格式的数据，后者是用于接收普通的参数。
- @PathVariable
  路径变量，用于获取路径中的参数。
- @RestController和@Controller的区别
  前者是后者的增强版，相当于后者加上了@ResponseBody注解。
- @ResponseBody和@RequestBody的区别
  @ResponseBody注解用于将Controller的方法返回的对象，通过适当的HttpMessageConverter转换为指定格式后，写入到Response对象的body数据区。
  
  而@RequestBody注解用于读取Request请求的body部分数据，再利用HttpMessageConverter将读取到的数据绑定到Controller方法的参数上。
- @GetMapping和@RequestMapping的区别
  限定请求方式，前者是后者的增强版，相当于后者加上了method=RequestMethod.GET注解。
- @Autowired和@Resource的区别
  前者是spring的注解，通过类型来注入，后者是java的注解，通过名称来注入。
- @RequestMapping
  用于映射请求，可以用于类上，也可以用于方法上。在类上用这个注解指定路径的时候，下面方法的@GetMapping等注解就可以省去相同的路径只保留参数了。

### 连接服务器的mysql以及服务器的mysql权限
使用IDEA可以直接连接远程服务器的mysql数据库并进行可视化操作。但是服务器默认只允许本地（服务器自己）访问3306端口，如果想要远程访问，需要修改mysql的权限和服务器的开放端口。不然IDEA就会报错：
`"Case sensitivity: plain=mixed, delimited=exact"`。
用宝塔面板会比较方便。“安全”中可以添加端口，mysql中可以设置访问权限。

这样之后就可以在本地的IDEA中具体配置驱动、url、username、password即可连接服务器的mysql了。



### 实际开发问题
实体类要加@Data注解

### 分页查询
#### pagehelper
### 歪个楼
这一块刚开始不熟悉，没有想到是权限问题呢，所以我摸索了其他一些奇奇怪怪的东西。例如经常听到但是没有实际用过的`ping`和`telnet`。中间还查到可能跟防火墙有关，但是这个服务器压根就还没装防火墙。。。

telnet服务默认是关闭的，要开始得手动打开。

本地的数据库也可以通过mysql workbench快速导入sql文件并在IDEA中连接。


## 后端部署
后端代码的端口：8087

后端代码的注解的解读：不同的控制器返回不同，有一个返回视图
### root权限
第一种方法：sudo（暂时的）

如果是使用root权限而不是直接进入，那么sudo + <指令> 即可。如：sudo chmod 777 /etc/sudoers。（这是最常用且推荐的方式）　　


第二种方法：root（非暂时的）

输入sudo passwd root （注意passwd的拼写），再输入用户密码，接下来会让你设置root密码，并再次确认。

服务器的root：
usr: root
pswd: root

### 打包后端代码为jar包

温馨提醒：记得修改测试类中的相关url。

手动打包和maven打包的文件不一样，为什么？前者总是失败，后者能成功。并且两者输出jar包的路径也不一样。、

实测推荐maven项目使用maven自动打包：在lifecycle中执行：clean、……、test、package。（tips：这些生命周期是向前包含的，也就是说执行package也会先clean和、compile和test等操作，然后再最后执行package打包）。

package会输出一个名为target的目录，目录下会有自动的.jar文件，把他上传到服务器运行就好啦~
### 服务器运行jar包
运行jar包有两种模式：
1. 运行jar包，直到终端关闭就终止：
```shell
$ java -jar jar包名
```

2. 后台持续运行jar包：
```shell
$ nohup java -jar jar包名 &
```

### 关于端口限制
如果使用的端口号小于1024，在Linux下需要root权限才能使用。可以尝试使用大于1024的端口号，或者使用root用户来运行jar包。

并且，前端代码和后端代码不能使用同一个端口！

### 引入tomcat依赖
刚开始如果没有添加tomcat依赖，打包的时候可能会遇到这样的报错：
```shell
org.springframework.context.ApplicationContextException: Unable to start web server; nested exception is org.springframework.boot.web.server.WebServerException: Unable to start embedded Tomcat
```
在spring boot项目中的pom.xml文件中加入：
```xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-tomcat</artifactId>
		</dependency>

```
### 跨域问题及其解决方案
前后端分离的项目中，前端调用后端服务的时候，浏览器报错 `No 'Access-Control-Allow-Origin' header is present on the requested resource.`

这就是遇到了跨域问题：浏览器的同源安全策略限制了不同源之间的交互（即便是同一个域名，不同的端口交互也是跨域）。也就是即使前后端本来可以实现交互，浏览器因为检测到不同源，所以把后端的恢复给拦截了，这时候就会导致连状态码都没有。所以在前后端分离的项目中，如果需要跨域交互，需要进行一些特殊的处理。以下是一些常见的解决方案。

这一块想要快速了解可以看看这个视频：【跨域的解决方法有哪些？JSONP的原理？CORS怎么使用？Nginx如何设置？】 https://www.bilibili.com/video/BV1Ei4y1o7jK/?share_source=copy_web&vd_source=589ae6273d7e5597533c35b38ecfdb77
#### jsonp
jsonp是一种跨域解决方案，它的原理是利用script标签的src属性不受同源策略的限制的特性，通过script标签的src属性来加载一个js文件，这个js文件是一个回调函数的调用，回调函数的参数就是我们需要的数据。jsonp只能用于get请求，而且只能用于跨域请求，不能用于同域请求。

这个方案比较老，并且由于他本身的局限性，现在用的很少了，但是他能兼容比较老的浏览器（btw现在除了特别特殊的业务，应该不会再用了）。
#### cros
cros是一种跨域解决方案，它的原理是在请求头中加入一些特殊的字段，让浏览器知道这个请求是允许跨域的。cros可以用于get请求，也可以用于post请求，而且可以用于跨域请求，也可以用于同域请求。

##### 对前端代码进行cros配置
尝试在vue项目的main.js中加入以下代码：
```shell
//解决同一服务器上不同端口之间交互的跨域问题
axios.defaults.baseURL = 'http://123.207.71.173:8087'; // 后端的地址
axios.defaults.headers.common['Origin'] = 'http://123.207.71.173:80'; // 请求的来源
```


除了前端，还可以在后端进行修改。


##### 对后端代码进行cros配置
在Spring Boot应用中配置允许跨域请求。你可以使用Spring Security或Spring Web的@CrossOrigin注解，或者使用CorsFilter来配置跨域访问。以下是一些示例方法：

1. 使用@CrossOrigin注解：

```java
import org.springframework.web.bind.annotation.CrossOrigin;
// ...
@CrossOrigin(origins = "http://localhost:8080") // 允许来自特定域的请求
@RestController
public class YourController {
    // ...
}
```

这种方法就要手动对每一个controller文件以及其中的每一个接口写一遍，接口不多的时候可以这样，多了就不方便了。不过由于对下一种方法不太熟悉，我尝试的是这一种方法。
2. 使用CorsFilter：

创建一个CorsFilter bean并在WebSecurityConfigurerAdapter中注册它：

```java
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        // ...
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.applyPermitDefaultValues();
        config.addAllowedOrigin("http://localhost:8080"); // 允许来自特定域的请求
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```
#### 失败了！
但是遗憾的是，我前后端都配置了cros之后，并没有成功。但是在这一块探索尝试的时候比较混乱，干扰因素也有点多，我也不确定是不是我其他地方哪里没有配置好。不管怎样，这种方式毕竟需要修改前后端代码，还是不太方便的，下面这种方法也是网上很多推荐的解决方案，能够绕过浏览器的跨域同源策略，还能有其他方面的优点。他就是——

#### nginx反向代理
nginx反向代理指的是nginx服务器接收到客户端的请求后，将请求转发给后端服务器，然后将后端服务器的响应返回给客户端。nginx反向代理可以用于get请求，也可以用于post请求，而且可以用于跨域请求，也可以用于同域请求。


尝试在宝塔面板中添加nginx反向代理，设置目标地址为后端的地址，出现了502 bad gateway。


猜测是不准确的nginx配置导致所有的访问都被转发到了后端端口，这不是我们想要的。我们的需求是在访问后端接口的时候进行转发，这个时候就要修改一下前端配置和nginx的配置了。

#### 成功的解决方案

##### 前端代码的修改
config.js的配置修改：
```js
// config.js
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
    },
  },
  lintOnSave: false, // 关闭语法检查

  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://123.207.71.173:8087',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};

```

api.vue文件的配置修改：
```js
//api.vue
// 引入 axios
import axios from "axios";

let base = '/api'; // 使用代理配置中定义的路径

// 传送json格式的get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`, // 使用代理路径
        data: params,
    });
}
```

##### nginx配置的修改
```shell
# 前端请求，例如Vue.js应用
location ^~ / {
    root /www/wwwroot/demo;
    try_files $uri $uri/ /index.html;
}

# 后端请求代理到Spring Boot
location ^~ /api/ {
    proxy_pass http://123.207.71.173:8087;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_http_version 1.1;
    add_header X-Cache $upstream_cache_status;

    set $static_fileD5RB54Jb 0;
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
        set $static_fileD5RB54Jb 1;
        expires 1m;
    }
    if ( $static_fileD5RB54Jb = 0 )
    {
        add_header Cache-Control no-cache;
    }
}

```
这样，访问地址以/api开头的都会被这个模块捕获，转发到proxy_pass设定的的后端项目端口上去。

##### 后端代码的修改
在修改完前端vue项目的配置后，再次运行后端打开网站调试，发现404了。原来是调用接口的时候路径对不上。前端代码拦截了路径为`/api`的路径，但是后端接口的代码没有这个逻辑路径。于是也要对后端的控制层代码中的路径做一些修改。示例如下：
```java
@Api(tags = "公司信息")
@RestController
public class CompanyController {

    @Autowired
    private CompanyService companyService;


    @ApiOperation(value = "查找公司信息")
    @GetMapping("/api/findCompanyInfo")//原本是 @GetMapping("/findCompanyInfo")，在前面加上了`/api`
    public Result findCompanyInfo(){
        Company company = companyService.selectCompanyInfo();
        return Result.success(company);
    }
}
```
所有的接口映射路径都要更新一下。

>/api/ 路径通常用于指示一个Web应用程序中包含API（Application Programming Interface）的部分。API是一组规则和协议，允许不同的软件应用程序相互通信。在Web开发中，API通常用于让前端应用程序与后端服务器进行数据交互，例如获取数据、发送数据或执行其他操作。
### 前后端分离的web项目是如何调试以及遇到过的一些错误状态合集
#### 调试
点击network-XHR，这里可以看到接口。

响应状态码：
- 200：OK
- 404：
- 403
- 502
- 500

#### 错误
1. Whitelabel Error Page This application has no explicit mapping for /error, so you are seeing this as……
    可能是目录结构的问题（启动类要和controller、mapping什么的同级），也可能是……


### 请求响应
工具平台：postman->国产apifox
#### 请求方式
##### 简单参数

##### 简单/复杂实体参数
请求的参数名与实体对象的属性名一致，就可以自动封装到实体对象中。

##### 数组/集合参数
- 数组：请求参数名和实体对象的属性名一致，就可以自动封装到数组中。
- 集合：请求参数名和实体对象的属性名一致，通过@ResquestParam绑定参数关系。
##### 日期时间参数
@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")注解。
##### json参数
接口类型选择POST。body选择raw-json。@RequestBody注解。
##### 路径参数
@ResquestMapping（/path/{id}）

@PathVariable注解。

#### 响应方式
响应的构成：响应行+响应头+响应体
##### @ResponseBody注解
写在controller方法/类上，将方法返回值直接响应，如果返回值类型是试题对象或者集合，会自动转换为json格式响应。

@RestController=@Controller+@ResponseBody
##### 统一响应结果
为了让接口更加规范，项目便于维护和管理，需要统一响应的结果。


统一之前：
```java
@RequesMapping("/getAddr")
public Address getAddr(){
  Address addr = new Address();
  addr.setProvince("广东省");
  addr.setCity("广州市");
  return addr;
}
```
统一之后：
```java
public class Result {
    private Integer code;
    private String msg;
    private Object data;

    public static Result success(Object data){
        return new Result(200,"success",data);
    }

    public static Result error(Integer code,String msg){
        return new Result(code,msg,null);
    }
}
```

```java
@RequesMapping("/getAddr")
public Result getAddr(){
  Address addr = new Address();
  addr.setProvince("广东省");
  addr.setCity("广州市");
  return Result.success(addr);
}
```

#### 分层解耦
为了完成控制层、业务层、持久层的解耦，需要在控制层中调用业务层的方法，业务层中调用持久层的方法，持久层中调用数据库的方法。
- IOC：控制反转
- DI：依赖注入
- bean:在spring容器中管理的对象。

##### IOC&DI
- @Component注解：将service和dao层的实现类交给IOC容器管理。在类前面加上这个注解,意思就是将当前类交给IOC容器管理,成为IOC容器中的bean.

- @Autowired注解：为controller和service注入运行时依赖的对象。在对象前面加上这个注解,意思就是运行的时候,将当前对象所依赖的对象,自动注入进来. 
tips:
>注意同一个类型不能同时存在两个实现类，否则会报错,无法使用@Autowired自动装配。
>解决方案:
>1. @Primary 指定优先
>2. @Qualifier("bean 的名字") 指定名称
>3. @Resource(name="bean 的名字") 舍弃@Autowired,使用@Resource注解.前者是根据类型注入,后者是根据名称注入.前者是spring提供的注解,后者是JDK提供的注解.

##### component的衍生注解
bean的声明:
- @Service注解：标注在业务类上.将ervice层的实现类交给IOC容器管理。
- @Repository注解：标注在数据访问类上,由于mybaits的整合,用的少.将dao层的实现类交给IOC容器管理。
- @Controller注解：标注在控制类上.将controller层的实现类交给IOC容器管理。
- 不属于以上三个类别的时候，可以使用@Component注解。

tips:

>1. 使用以上四个注解都可以声明bean,但是在springboot集成web开发中,声明控制器bean只能用@Controller注解.
>2. bean的组件扫描:
>以上四种注解想要生效还必须被@ComponentScan注解扫描到.要么是手动在SpringBoot启动类上加上@ComponentScan注解,要么是按照规范把相关文件放在启动类所在包及其子包下.因为@SpringBootApplication注解中已经默认包含了@ComponentScan注解来扫描启动类所在包及其子包下的文件了


### AOP(Aspect Oriented Programming面向切面/特定方法编程)
#### AOP程序应用场景
- 记录操作日志
- 权限控制
- 事务管理

#### AOP优势
- 代码无侵入
- 减少重复代码
- 提高开发效率
- 降低维护成本
#### AOP程序的实现准备
- 添加AOP依赖
- @Aspect注解声明当前类是AOP类
- @slf4j 
#### 切入点表达式

- @Around注解:环绕通知

#### 动态代理
动态代理是面向切面编程这种编程思想最主流的实现方式，它是通过在运行时期动态的创建一个代理类的方式来实现的，这个代理类就叫做动态代理类。动态代理类和被代理类实现了相同的接口，这样就可以在运行时期将某个接口的实现类替换成动态代理类，从而实现对被代理类的代理。


### nuxt中的api调用
GitHub Copilot: 在Nuxt.js项目中，你可以在多个地方调用后端API：

1. **在Vuex Store中**：你可以在Vuex的actions中调用API，然后将返回的数据保存到state中。这种方式适合于需要在多个组件中共享数据的情况。

```javascript
export const actions = {
  async loadData({ commit }) {
    const data = await this.$axios.$get('/api/data');
    commit('setData', data);
  },
};
```

2. **在页面组件或者普通Vue组件的methods中**：你可以在组件的方法中调用API，然后将返回的数据保存到组件的data中。这种方式适合于只在一个组件中使用数据的情况。

```javascript
export default {
  data() {
    return {
      data: null,
    };
  },
  async created() {
    this.data = await this.$axios.$get('/api/data');
  },
};
```

3. **在页面组件的asyncData或fetch方法中**：这两个方法都会在组件加载前被调用，你可以在这两个方法中调用API，然后将返回的数据保存到组件的data中。这种方式适合于需要在服务端渲染(SSR)时获取数据的情况。

```javascript
export default {
  async asyncData({ $axios }) {
    const data = await $axios.$get('/api/data');
    return { data };
  },
};
```

在以上的代码中，`this.$axios.$get('/api/data')`就是调用后端API的代码，你需要将`/api/data`替换为你的实际API路径。这里使用了`$axios`模块，这是Nuxt.js的一个官方模块，用于在Vue组件中方便地使用axios库。如果你的项目中没有安装这个模块，你需要先安装它：`npm install @nuxtjs/axios`。


### 渲染方式：SSR和SPA以及同构渲染
SSR和SPA是两种不同的网页渲染方式，它们的区别主要在于数据和HTML字符串的拼接是在服务器端还是客户端进行的。

#### SSR（Server Side Rendering）
是服务器端渲染，它的优点是首屏加载速度快，对SEO友好，缺点是页面重复加载次数高，开发效率低，数据传输量大，服务器压力大。典型的SSR页面有jsp、asp、php等。

#### SPA（Single Page Application）
是单页应用，它的优点是项目性能高，页面加载速度快，要求客户端渲染，缺点是不利于SEO，首次打开响应速度慢。典型的SPA框架有React、Angular、Vue等。

需要浏览器先向服务器请求，（服务器响应空html页面）、然后浏览器再进行第二次请求，（服务器响应主JS文件），最后是ajax请求服务器响应了数据，这才能开始渲染页面。所以缺点就是**首屏渲染速度慢**，而且由于第一次请求服务器响应的是空html页面，所以也**不利于SEO（搜索引擎记录）**。

#### summary：
简单来说，SSR和SPA的区别就是：

- SSR是服务器端把数据和HTML字符串拼接好，然后发送给浏览器端渲染；
- SPA是浏览器端接收到数据和HTML字符串后，由JavaScript来控制拼接和渲染

#### 同构渲染方式（也叫SSR）
每次刷新都是第一次请求，在服务器端渲染，响应完整的html页面，后续开始就都是ajax请求了。也就是相当于“10%服务器渲染，90%客户端渲染”。解决了首屏渲染慢和不利于SEO的问题。但是部署会比较复杂些。所以考虑什么时候使用同构渲染，主要看我们是否特别需要首屏渲染速度和SEO。否则直接肆无忌惮地客户端渲染就好了。

Nuxt.js和Next.js都属于同构渲染。


### 关于nuxt的部署
https://nuxt.com/docs/getting-started/deployment
https://pm2.keymetrics.io/
#### Node.js Server(pm2)
PM2 (Process Manager 2) is a fast and easy solution for hosting your Nuxt application on your server or VM.
它允许您永久保持应用程序活跃，无需停机即可重新加载它们，并不需要传统部署的.nuxt文件夹，该部署方法也跟生产环境一样含热更新。
- 安装pm2：`npm install -g pm2`

To use pm2, use an `ecosystem.config.js`:
```js
module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      env:{
        HOST: '0.0.0.0',
        PORT: 3020
      }
    }
  ]
}
```
在本地开发环境中执行`yarn build`后，把生成的`.nuxt`以及`nuxt.config.js`，`package.json`，`node_modules`，`ecoosystem.config.js`上传到服务器的网站目录里。


- `pm2 start`开始运行项目
- `pm2 delete [project_name]`删除指定项目进程
- `pm2 ls`列出当前所有运行中的node项目


>个人踩坑经历：同时必须确保`nuxt.config.js`中的所写的配置都已经安装才能成功部署，否则使用curl测试端口是否能成功访问的时候会报错：`curl: (7) Failed to connect to localhost port 3020: Connection refused`。

也可以在宝塔中选择新建node项目，完成外网端口映射等对应的操作。