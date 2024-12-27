---
title: git在实际项目开发使用中的tips
---
### 基础操作
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


- 处理本地仓库分支与源代码仓库的冲突
    To merge updates from the `upstream` into your local `uevent` branch, you can follow these steps:

    1. Fetch the updates from the `upstream`:

    ```bash
    git fetch upstream
    ```

    2. Switch to your `uevent` branch:

    ```bash
    git checkout uevent
    ```

    3. Merge the updates into your `uevent` branch. If the updates are on the `master` branch of the `upstream`, you would do:

    ```bash
    git merge upstream/master
    ```

    Replace `master` with the appropriate branch name if the updates are on a different branch.

    4. Resolve any merge conflicts if they exist. After resolving conflicts, you need to add the resolved files with `git add <file>` and then commit the changes with `git commit`.

    5. Finally, push the updates to your `uevent` branch on your remote repository:

    ```bash
    git push origin uevent
    ```

    Replace `origin` with the name of your remote if it's different.
- 设置上游仓库：git remote add upstream <upstream_repository_url>

### 分支和主线的合并
- 分支的新特性合并时可以用squash，这样可以将多次提交合并为一次提交，这样可以保持主线的清晰。
- 但是将主线的更新合并到分支时，Merge或Rebase Merge合并主线代码，不能使用Squash Merge，避免后续合并主线时产生大量冲突。因为Squash Merge会将多次提交合并为一次提交，这样会丢失主线的提交历史，导致后续合并主线时产生大量冲突。
- Rebase Merge会将分支的提交历史放在主线的提交历史之后，这样可以保持主线的提交历史，避免后续合并主线时产生大量冲突。

### 克隆特定分支，而不是所有分支：

1. 使用`--branch`（或`-b`）选项来指定你要克隆的分支。这个选项会告诉`git clone`只克隆特定的分支，而不是整个仓库的所有分支。
2. 使用`--single-branch`选项来确保只克隆指定的分支。

例如，假设你要克隆名为`feature-branch`的分支，你可以运行以下命令：

```bash
git clone --branch feature-branch --single-branch <repository-url>
```

这样只会拉取指定的分支，节省时间和空间。

# 安全
## 敏感信息
### 不小心把 .env 提交了，怎么清理现场？
一般来说，不能这么不小心，一定要在提交前确保 .env 被写进了 .gitignore 文件。但是，如果真的不小心提交了，可以使用以下方法清理 commit 历史：
#### 使用 git filter-branch
git filter-branch 是 Git 自带的一个工具，用于重写 Git 仓库的历史记录。它的工作原理如下：  
- 遍历提交：遍历 Git 仓库的所有提交。
- 应用过滤器：对每个提交应用指定的过滤器（如删除文件）。
- 重写提交：重写每个提交，以反映应用过滤器后的更改。
- 更新引用：更新所有引用（如分支和标签），以指向重写后的提交。
其他工具的工作原理也类似，但可能有更多功能和选项。以下是使用 git filter-branch 清理 .env 文件的具体步骤：
1. 运行 git filter-branch： 打开命令提示符，导航到您的 Git 仓库，并运行以下命令来删除 .env 文件：  
```bash
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' --prune-empty --tag-name-filter cat -- --all
```
清理 Git 历史记录： 运行以下命令来清理和压缩 Git 历史记录：  
```bash
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```
#### 使用 git filter-repo 清理敏感信息
如果很不幸，该分支被粗心的 reviewer merge 到其他远程分支了，那么处理清理该分支，你可能需要清理整个项目的 commit 历史。这时，可以使用 git filter-repo 工具来清理敏感信息。以下是具体步骤：
1. 安装 git filter-repo： 如果还没有安装 git filter-repo，可以通过以下命令安装：  
`pip install git-filter-repo`
2. 清理敏感信息： 使用 git filter-repo 删除 .env 文件：  
`git filter-repo --path .env --invert-paths`
3. 强制推送更改到远程仓库： 清理完敏感信息后，您需要强制推送更改到远程仓库的 main 分支：  
```bash
git push origin --force --all
git push origin --force --tags
```
#### 使用 BFG Repo-Cleaner 清理敏感信息
还没用过，暂时不做介绍。