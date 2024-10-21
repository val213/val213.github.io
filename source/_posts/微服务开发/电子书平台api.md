FORMAT: 1A
HOST: https://api.ebookplatform.com

# 电子书平台 API

FORMAT: 1A
HOST: https://api.ebookplatform.com

## 书本管理

### 书本列表展示 [POST /api/admin/books/v1/page]
+ Request (application/json)
    + Attributes (BookAdminManageDTO)
+ Response 200 (application/json)
    + Attributes (BaseResponse[Page[BookAdminVO]])

## 用户管理

### 用户列表展示 [POST /api/admin/users/v1/page]
+ Request (application/json)
    + Attributes (UserAdminManageDTO)
+ Response 200 (application/json)
    + Attributes (BaseResponse[Page[UserAdminVO]])

### 账号操作改变用户状态 [PUT /api/admin/users/v1/status]
+ Parameters
    + status: 1 (number, required) - 用户状态
    + userId: 123 (number, required) - 用户 ID
+ Response 200 (application/json)
    + Attributes (BaseResponse[boolean])

## 书本详情
todo

## 书本管理

### 分页查询书本 [POST /api/books/v1/page]
+ Request (application/json)
    + Attributes (BookPageReq)
+ Response 200 (application/json)
    + Attributes (BaseResponse[List[BookVO]])

### 删除书本 [DELETE /api/books/v1/{bookId}]
+ Parameters
    + bookId: 123 (number, required) - 书本 ID
+ Response 204


## 文件管理

### 获取 OSS 上传临时凭证 [GET /api/files/v1/oss-temp-credential]
+ Response 200 (application/json)
    + Attributes (BaseResponse[OssTempCredentialVO])

### 上传书本，支持格式：epub [POST /api/files/v1/upload]
+ Request (multipart/form-data)
    + Attributes
        + file: (file, required) - 文件
+ Response 200 (application/json)
    + Attributes (BaseResponse[string])

## SSE 管理

### 关闭 SSE 长连接 [GET /api/sse/v1/close-sse-connect]
+ Parameters
    + clientId: abc123 (string, required) - 客户端 ID
+ Response 200 (application/json)
    + Attributes (BaseResponse[boolean])

### 建立 SSE 长连接 [GET /api/sse/v1/create-sse-connect]
+ Parameters
    + clientId: abc123 (string, required) - 客户端 ID
+ Response 200 (application/json)
    + Attributes (SseEmitter)

## 测试

### ping [GET /api/test/ping]
+ Response 200 (application/json)
    + Attributes (string)

## 用户管理
看看casdoor，以下暂定，可能不需要
### 用户名登录 [POST /api/users/v1/login]
+ Parameters
    + username: 管理员 (string, optional) - 用户名
    + password: 1 (string, optional) - 密码
+ Response 200 (application/json)
    + Attributes
        + code: 200 (number) - 响应码
        + data: (string) - 数据
        + message: (string) - 消息

## 监控与可观测性服务
*Prometheus + Grafana*