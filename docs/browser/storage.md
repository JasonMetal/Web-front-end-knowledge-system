# 本地存储

浏览器本地存储包括`cookie`和`webStorage`,`webStorage`分为`localstorage`和`sessionStrorage`

## Cookie

### 起源

Cookie 起初被设计出来是为了弥补HTTP在状态管理上的不足的。
HTTP 协议是一个无状态协议，客户端向服务器发请求，服务器返回响应，故事就这样结束了，但是下次发请求如何让服务端知道客户端是谁呢？
这种背景下，就产生了 Cookie.

### 概念

HTTP Cookie(Web Cookie 或 浏览器Cookie) 是服务器发送到用户浏览器并保存在本地的一块数据。
它会在浏览器下次向同一服务发送请求时被携带发送给服务器，服务器便会得知是来至同一个浏览器发来的请求。

cookie是服务端发送并保持在客户端本地的一块数据，它会在浏览器下次发送请求时被携带发送给服务器，服务器便得知是同一个用户发来的请求。

### 作用
cookie设计出来是为了弥补**http无状态的不足**

1. 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）

2. 个性化设置（如用户自定义设置、主题等）

3. 浏览器行为跟踪（如跟踪分析用户行为等）

### 特征

1. 容量：4K

2. 位置：客户端

3. 有效期：服务端无设置，在关闭页面前有效；如果设服务有设置失效时间，在失效时间前有效。

### 缺陷

1. 容量缺陷：Cookie的只能存储`4k`信息

2. 性能缺陷：Cookie 紧跟域名，不管域名下面的某一个地址需不需要这个 Cookie ，请求都会携带上完整的 Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求携带了很多不必要的内容。

3. 安全缺陷：cookie以纯文本的形式在浏览器和服务器之间传递，很容易被非法用户截取，进行一些了不法操作。另外，在HttpOnly为 false 的情况下，Cookie 信息能直接通过 JS 脚本来读取。

## localStorage

localStorage用来作为本地存储来使用的，解决了cookie不足的问题。

### 特征

1. localStorage同一个域名下，会存储相同的一段localStorage。

2. localStorage 的容量上限为5M

3. 只存在客户端，这样就很好地避免了 Cookie 带来的性能问题和安全问题。


### 使用

设置

```js
let obj = { name: "wzx", age: 18 };
localStorage.setItem("name", "wzx"); 
localStorage.setItem("info", JSON.stringify(obj));

```

获取

```js
let name = localStorage.getItem("name"); 
let info = JSON.parse(localStorage.getItem("info"));

```

## sessionStorage

1. 容量上限也为 5M。

2. 只存在客户端，默认不参与与服务端的通信。

3. 接口封装。除了sessionStorage名字有所变化，存储方式、操作方式均和localStorage一样。

sessionStorage 和 localStorage 本质的区别是：`sessionStorage`是会话级的，即关闭页面后储存的数据也随之消失。

## IndexedDB
IndexedDB是运行在浏览器中的非关系型数据库, 本质上是数据库，理论上容量没有上限。

### 特性：
1. 拥有数据库本身的特性;

2. 支持事务;

3. 存储二进制数据;

4. 还有这样一些特性需要格外注意：

    (1)键值对存储。内部采用对象仓库存放数据，在这个对象仓库中数据采用键值对的方式来存储。

    (2)异步操作。数据库的读写属于 I/O 操作, 浏览器中对异步 I/O 提供了支持。

    (3)受同源策略限制，即无法访问跨域的数据库。