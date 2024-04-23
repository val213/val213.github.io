---
title: 【设计模式】obbserver in MVC
tags: 
    - 设计模式
    - MVC
    - observer
categories: 知识分享
cover: https://picx.zhimg.com/80/3c73e679994145c986d2d935c691521d_1440w.webp?source=1940ef5c
---
## MVC和Observer的联系
MVC是软件架构，Observer是设计模式，是不同层面的东西，不能直接比较异同

MVC本质上是解耦，让UI和逻辑，数据分离。一旦应用，基本上整个项目都要遵从这种模式。

Observer是一种传递消息的机制，特点是被观察者不需要知道观察者是谁，降低了耦合。这是一种模式，三两个class就可以实现，对网站构架没有影响。

如果硬要说联系，Observer模式经常被应用在MVC架构中，作为一种消息处理的机制。

[![MVC](https://picx.zhimg.com/80/3c73e679994145c986d2d935c691521d_1440w.webp?source=1940ef5c)](https://picx.zhimg.com/80/3c73e679994145c986d2d935c691521d_1440w.webp?source=1940ef5c)


## observer模式
观察者模式也称作监听模式，即观察与被观察的关系，比如你在烧开水时看它有没有开，你就是观察者，水就是被观察者。观察者模式是指对象之间一对多的依赖关系，每当那个特定对象改变状态时，所有依赖于它的对象都会得到通知并被自动更新。

### cs61b sp21 proj0 2048 中的MVC和observer
#### MVC
> The MVC pattern divides our problem into three parts:
>
> The model represents the subject matter being represented and acted upon – in this case incorporating the state of a board game and the rules by which it may be modified. Our model resides in the Model, Side, Board, and Tile classes. The instance variables of Model fully determine what the state of the game is. Note: You’ll only be modifying the Model class.
> A view of the model, which displays the game state to the user. Our view resides in the GUI and BoardWidget classes.
A controller for the game, which translates user actions into operations on the model. Our controller resides mainly in the Game class, although it also uses the GUI class to read keystrokes

#### observer
> The second pattern utilized is the “Observer pattern”. Basically this means that the model doesn’t actually report changes to the view. Instead, the view registers itself as an observer of the Model object. This is a somewhat advanced topic so we will provide no additional information here.
>
> We’ll now go over the different classes that you will interact with.