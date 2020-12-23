 # 跨域 与 Coment
  ## 跨域
  ### 跨域源资源共享
  通过XHR实现Ajax通信的一个主要限制，来源于跨域安全策略。默认情况下，XHR对象只能访问
  与包含它的页面位于同一个域中的资源。这种安全策略可以防止某些恶意行为。

  CORS(Cross-Origin Resoure Shaing, 跨域源资源分享)是W3C的一个工作草案，定义了在必须访问
  跨域源资源时，浏览器与服务器应该如何沟通。CORS背后的基本思想，就是使用自定义的HTTP头部让
  浏览器与服务器进行沟通，从而决定请求成功还是失败。

  比如一个简单GET或POST请求，它没有自定义的头部，而主体内容是text/plain。在发送该请求时，需要
  给它加一个额外的Origin头部，其中包含请求页面的源信息（协议、域名、端口），以便服务器根据这个
  头部信息来决定是否给予响应。下面是Origin头部的一个示例：
  
  Origin: http://www.nczonlin.net

  如果服务器认为这个请求可以接受，就在Access-Control-Allow-Origin 头部中回发相同的源信息。例如：

  Access-Control-Allow-Origin: http://www.nczonlin.net

  如果没有这个头部，或者有这个头部但信息不匹配，浏览器就会驳回请求。
  ### JSONP

  JSONP由两部分组成：回调函数和数据。JSONP是通过动态标签`<script>`元素来使用的，使用时可以为
  src属性指定一个跨域URL。这里的`<script>`有能力不受限制地从其他跨加载资源。因为JSONP是有效
  的JavaScript代码，所以在请求完成后，即在JSONP响应加载到页面中以后，就立即执行。来看一个例子。

  ```js
  function handleRes(res) {
    alter('Ip': res.ip + 'city' + res.region_name);
  }

  var script = document.createElement("script");
  script.src = "http://freegeoip.net/json/?callback=handleRes"
  document.body.insertBefore(script, document.body.firstChild);
  ```
  JSONP它的有点在于能够直接访问相应文本，支持在浏览器与服务器之间双向通信。不过JSON也有两点不足。
  JSON会从其他域加载代码执行，如果其他域不安全，很可能在响应中夹带一些恶意代码。要确认JSONP 请求
  是否失败并不容易。只能能进行get请求。

  ## Comet 
  Coment是一种服务器向页面推送数据的技术。
  有两种实现Coment的方式：长轮询和流。长轮询是浏览器定时向服务器发送请求，看看有没有数据更新。
  轮询的优势是所有浏览器都支持，因为使用的是XHR对象和setTimeout()就能实现。

  第二种是流行的Coment实现是http流。流不同于轮询，因为它在页面的整个生命周期内只使用HTTP连接。
  具体来说，就是浏览器向服务器发送一个请求，而服务器保持连接打开，然后周期性地向浏览器发送数据。
  比如，下面这段PHP脚本就是采用流实现的服务中常见的形式。
  ```js
    ?php
     $i = 0;
     while(true) {
       // 输出一些数据，然后立即刷新输出缓存
       echo "number is $i";
       flush();
       // 等几秒钟
       slepp(10)

       $i ++
     }
  ```
  所有服务器端语言都支持打印到输出缓存然后刷新（将输出缓存中的内容一次性全部发送到客户端）的功能。
  而这正是实现HTTP流的关键所在。

  在浏览器中，通过侦听Readystatechange事件及检测readyState均值是否为3，就可以利用XHR对象实现HTTP流。
  使用XR对象实现HTTP流的典型代码如下所示。
  ```js
    function createStreaming(url, progress, finished) {
      var xhr = new XMLHttpRequest(),
      received = 0;

      xhr.open("get", url, true);
      xhr.onreadystatechange = function() {
        var result;
        if (xhr.readyState === 3) {
          // 只取得最新数据并调整计数器
          result = xhr.responseText.substring(received);
          received += result.length;
          progress(result)
        } else if (xhr.readyState == 4) {
          finished(xhr.responseText)
        }
      };
      xhr.send(null);
      return xhr;
    }

    var client = createStreaming("streaming.php", function(data) {
      alert("Received:" + data);
    }, function (data) {
      alert("Done!")
    })

  ```
  ### 服务器发送事件

  SEE（服务器发送事件）是围绕只读Coment 交互推出的API。服务器响应的类型必须是 text/event-stream。
  要实现SSE，首先要创建一个新的EventSource 对象， 并传进一个入口点：
  ```js
    var source = new EventSource("myevents.php");
  ```
  注意，传入的URL必须与创建对象的页面同源（相同URL模式、域以及端口）。

  ### Web Sockets

  Web Sockets的目标是在一个单独的持久连接上提供全双工、双向通信。
  ```js
    var sockets = new WebSockets("ws://www.example.com/server.php")
    sockets.send("hello world")  //只能发送鹑尾村数据

    socket.onmessage = function(event) {
      var data = event.data
    }
  ```