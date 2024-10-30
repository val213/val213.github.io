FORMAT: 1A
HOST: https://api.ebookplatform.com

# 电子图书馆 API

## Data Structures

### BaseResponse (object)
+ code: 200 (number) - 响应码
+ message: 成功 (string) - 响应消息
+ data: (object, optional) - 响应数据

### SseEmitter (object)
+ id: abc123 (string) - SSE 连接的客户端 ID
+ status: connected (string) - SSE 连接状态

### file (string)
+ description: file
+ format: binary

### Book (object)
+ id: 123 (number) - 书本 ID
+ title: 书本标题 (string) - 书本标题
+ author: 作者 (string) - 作者
+ description: 书本描述 (string) - 书本描述
+ status: 0 (number) - 书本状态
+ rating: 4.5 (number) - 书本评分
+ addedDate: 2023-10-01 (string) - 添加日期
+ categories: (array[string]) - 书本分类

### BookPageReq (object)
+ pageNum: 0 (number) - 页码
+ pageSize: 0 (number) - 每页条数
+ sortField: string (string) - 排序字段
+ sortOrder: string (string) - 排序顺序
+ status: 0 (number) - 状态

### ReadingList (object)
+ id: 1 (number) - 书单ID
+ userId: 1 (number) - 创建者用户 ID
+ name: 我的书单(string) - 阅读列表名称
+ isPublic: true (boolean) - 是否公开
+ books: (array[Book]) - 阅读列表中的书本

### Category (object)
+ id: 1 (number) - 分类 ID
+ name: 分类名称 (string) - 分类名称

### Subscription (object)
+ userId: 1 (number) - 用户 ID
+ readingListId: 1 (number) - 书单ID

## 图书馆书本管理

### 书本列表展示 [POST /api/books/v1/page]
+ Request (application/json)
    + Attributes (BookPageReq)
+ Response 200 (application/json)
    + Attributes (BaseResponse[List[Book]])

### 获取书本详情 [GET /api/books/v1/{bookId}]
+ Parameters
    + bookId: 123 (number, required) - 书本 ID
+ Response 200 (application/json)
    + Attributes (BaseResponse[Book]])

### 最近添加的书本 [GET /api/books/v1/recent]
+ Parameters
    + limit: 10 (number, optional) - 返回的书本数量
+ Response 200 (application/json)
    + Attributes (BaseResponse[List[Book]])

### 最高评分的书本 [GET /api/books/v1/top-rated]
+ Parameters
    + limit: 10 (number, optional) - 返回的书本数量
+ Response 200 (application/json)
    + Attributes (BaseResponse[List[Book]])

### 获取所有分类 [GET /api/categories/v1]
+ Response 200 (application/json)
    + Attributes (BaseResponse[List[Category]])

### 根据分类获取书本 [GET /api/categories/v1/{categoryId}/books]
+ Parameters
    + categoryId: 1 (number, required) - 分类 ID
+ Response 200 (application/json)
    + Attributes (BaseResponse[List[Book]])

## 用户书单管理

### 获取用户书单 [GET /api/user/reading-lists]
+ Response 200 (application/json)
    + Attributes (BaseResponse[List[ReadingList]])

### 获取书单详情 [GET /api/reading-lists/{readingListId}]
+ Parameters
    + readingListId: 1 (number, required) - 书单ID
+ Response 200 (application/json)
    + Attributes (BaseResponse[ReadingList]])

### 创建书单 [POST /api/reading-lists]
+ Request (application/json)
    + Attributes (ReadingList)
+ Response 201 (application/json)
    + Attributes (BaseResponse[ReadingList]])

### 更新书单 [PUT /api/reading-lists/{readingListId}]
+ Parameters
    + readingListId: 1 (number, required) - 书单ID
+ Request (application/json)
    + Attributes (ReadingList)
+ Response 200 (application/json)
    + Attributes (BaseResponse[ReadingList]])

### 删除书单 [DELETE /api/reading-lists/{readingListId}]
+ Parameters
    + readingListId: 1 (number, required) - 书单ID
+ Response 204·

### 添加书本到书单 [POST /api/reading-lists/{readingListId}/books]
+ Parameters
    + readingListId: 1 (number, required) - 书单ID
+ Request (application/json)
    + Attributes
        + bookId: 123 (number, required) - 书本 ID
+ Response 200 (application/json)
    + Attributes (BaseResponse[ReadingList]])

### 从书单移除书本 [DELETE /api/reading-lists/{readingListId}/books/{bookId}]
+ Parameters
    + readingListId: 1 (number, required) - 书单ID
    + bookId: 123 (number, required) - 书本 ID
+ Response 204

## 书单订阅管理

### 订阅书单 [POST /api/subscriptions]
+ Request (application/json)
    + Attributes
        + readingListId: 1 (number, required) - 书单ID
+ Response 200 (application/json)
    + Attributes (BaseResponse[Subscription]])

### 取消订阅书单 [DELETE /api/subscriptions/{readingListId}]
+ Parameters
    + readingListId: 1 (number, required) - 书单ID
+ Response 204

## 文件管理

### 获取 OSS 上传临时凭证 [GET /api/files/v1/oss-temp-credential]
+ Response 200 (application/json)
    + Attributes (BaseResponse[OssTempCredentialVO]])

### 上传书本，支持格式：epub [POST /api/files/v1/upload]
+ Request (multipart/form-data)
    + Attributes
        + file: (file, required) - 文件
+ Response 200 (application/json)
    + Attributes (BaseResponse[string]])

### 下载书本 [GET /api/files/v1/download]
+ Parameters
    + bookId: 123 (number, required) - 书本 ID
+ Response 200 (application/json)
    + Attributes (BaseResponse[string]])

## SSE 管理

### 关闭 SSE 长连接 [GET /api/sse/v1/close-sse-connect]
+ Parameters
    + clientId: abc123 (string, required) - 客户端 ID
+ Response 200 (application/json)
    + Attributes (BaseResponse[boolean]])

### 建立 SSE 长连接 [GET /api/sse/v1/create-sse-connect]
+ Parameters
    + clientId: abc123 (string, required) - 客户端 ID
+ Response 200 (application/json)
    + Attributes (SseEmitter]])

## 测试

### ping [GET /api/test/ping]
+ Response 200 (application/json)
    + Attributes (string]])

## 监控与可观测性服务
*Prometheus + Grafana*