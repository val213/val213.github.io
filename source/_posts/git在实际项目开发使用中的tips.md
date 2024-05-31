---
title: git在实际项目开发使用中的tips
---

- `git init`    //初始化本地仓库
- `git add .`    //添加所有文件到暂存区
- `git checkout -b feature-branch`    //创建并切换到分支feature-branch  
- `git push origin feature-branch:feature-branch`    //推送本地的feature-branch(冒号前面的)分支到远程origin的feature-branch(冒号后面的)分支(没有会自动创建)

- 删除本地和远程仓库的分支 `git branch -D fix-udp-in-dog` `git push origin --delete fix-udp-in-dog`
- clone原仓库的主分支到本地：`git clone -b master`
- 将本地仓库连接远程仓库：`git remote add matser git@github.com:val213/DragonOS.git`
- 查看远程仓库的地址：`git remote -v`


在将 Visual Studio 中的 C++ 项目推送到 GitHub 时，你应该在项目的**根目录**下初始化为代码仓库并进行推送。以下是详细步骤：

1. **打开命令行终端**：进入你的 C++ 项目所在的本地目录。

2. **初始化本地仓库**：在命令行中执行以下指令，将目录初始化为一个 Git 项目：
    ```bash
    git init
    ```
    这会在当前目录下创建一个名为 `.git` 的隐藏文件夹，其中包含了初始化的 Git 仓库中所有必须的文件。

3. **关联远程仓库**：在项目根目录下，执行以下关联指令，将本地仓库与 GitHub 上的远程仓库关联起来：
    ```bash
    git remote add origin 远程仓库地址
    ```
    注意，执行成功后，先拉取远端仓库，执行拉取指令：
    ```bash
    git pull origin master
    ```
    这里需要设置拉取的分支信息，否则会提示： "There is no tracking information for the current branch." 当前分支没有跟踪信息。

4. **首次上传**：将修改过的文件添加到暂存区域，执行添加指令：
    ```bash
    git add .
    ```
    然后将暂存区域的文件提交至本地仓库，执行提交指令：
    ```bash
    git commit -m "commit msg"
    ```
    最后将本地仓库推送至远程仓库，执行推送指令：
    ```bash
    git push origin master
    ```

- 设置上游仓库：git remote add upstream <upstream_repository_url>