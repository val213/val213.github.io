FORMAT: 1A
HOST: https://api.ebookplatform.com

# 电子书平台 API

## 用户注册登录服务
*casdoor*

## 电子书的基础业务服务

### 获取图书 [GET /books]
+ parameters
    + limit: 10 (number) - 每页显示的图书数量
    + offset: 0 (number) - 偏移量
    + title: `The Great Gatsby` (string) - 图书标题

### 添加新图书 [POST /books]
+ Request (application/json)
    + Attributes (Book)
        + title: `The Great Gatsby` (string, required) - 图书标题
        + author: `F. Scott Fitzgerald` (string, required) - 作者
        + published_date: `1925-04-10` (string, required) - 出版日期
        + isbn: `978-0743273565` (string, required) - ISBN 号码
        + url: `https://www.amazon.com/The-Great-Gatsby/dp/0743273567` (string) - 封面图片链接

+ Response 201 (application/json)
    + Attributes (Book)
        + id: 1 (number) - 图书 ID
        + title: `The Great Gatsby` (string) - 图书标题

### 下载图书 [POST /loans]
+ Request (application/json)
    + Attributes (LoanRequest)
        + user_id: 1 (number, required) - 用户 ID
        + book_id: 1 (number, required) - 图书 ID

+ Response 201 (application/json)
    + Attributes (Loan)
        + id: 1 (number) - 借阅 ID
        + user_id: 1 (number) - 用户 ID
        + book_id: 1 (number) - 图书 ID
        + loan_date: `2024-10-01` (string) - 借阅日期
        + return_date: `2024-10-15` (string) - 归还日期


## 电子书管理
### 元数据更新

### 图书删除
+ Parameters
    + book_id: 1 (number, required) - 图书 ID

+ Response 204


## 评论服务
### 获取图书评论 [GET /books/{book_id}/comments]
+ Parameters
    + book_id: 1 (number, required) - 图书 ID

+ Response 200 (application/json)
    + Attributes (CommentArray)
        + (Comment)
            + id: 1 (number) - 评论 ID
            + user_id: 1 (number) - 用户 ID
            + content: `Great book!` (string) - 评论内容
            + rating: 5 (number) - 评分

### 用户添加评论 [POST /books/{book_id}/comments]
+ Parameters
    + book_id: 1 (number, required) - 图书 ID

+ Request (application/json)
    + Attributes (Comment)
        + user_id: 1 (number, required) - 用户 ID
        + content: `Great book!` (string, required) - 评论内容
        + rating: 5 (number, required) - 评分 (1-5)

+ Response 201 (application/json)
    + Attributes (Comment)
        + id: 1 (number) - 评论 ID
        + user_id: 1 (number) - 用户 ID
        + book_id: 1 (number) - 图书 ID
        + content: `Great book!` (string) - 评论内容
        + rating: 5 (number) - 评分

## 监控与可观测性服务
Prometheus + Grafana