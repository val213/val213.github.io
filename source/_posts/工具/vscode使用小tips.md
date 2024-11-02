---
title: vscode使用小tips
tags: 
categories: 技术分享
---
Q1：多开vscode进程的时候，md文件的预览会失败，报错：Error loading webview: Error: Could not register service worker: InvalidStateError: Failed to register a ServiceWorker: The document is in an invalid state..

解决方法：只留下一个进程，删掉其他的进程，然后重启vscode，再打开md文件，就可以正常预览了。
不过不知道有没有更好的解决方法。