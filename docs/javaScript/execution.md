# 执行机制
  
  本节讲述V8的执行机制，来理解JavaScript的执行机制。这是能够帮助我们理解很多上层应用，包括Babel、ESlint、前端框架的底层机制.

  一段JavaScript代码放在V8中是如何的执行？机器是读不懂JavaScript代码的，只能理解特定的机器码。
  如果要让JavaScript代码在机器上运行，就必须将JavaScript代码编译成机器码。由于JavaScript属于解释型语言，解释器会对原代码做如下分析：

  1. 通过词法分析和语法分析生成 AST(抽象语法树)

  2. 生成字节码

  然后解释器根据字节码来执行程序。但 JS 整个执行的过程其实会比这个更加复杂，接下来就来一一地拆解。

  ## 生成AST

  生成 AST 分为两步：词法分析和语法分析。

  词法分析即分词，它的工作就是将一行行的代码分解成一个个token。 比如下面一行代码:

  ```js
  const name = 'wzx'
  ```
  其中会把句子分解成四个部分:

  关键字：`const` 、 变量名：`name`、赋值：`=` 、 字符串：`'wzx'`;

  即解析成了四个token，这就是词法分析的作用。

  接下来语法分析阶段，将生成的这些 token 数据，根据一定的语法规则转化为AST。举个例子:

  ```js
    let name = 'sanyuan'
    console.log(name)
  ```
  最后生成的 AST 是这样的:

  ![An image](./img/ast.jpg)

  当生成了 AST 之后，编译器/解释器后续的工作都要依靠 AST 而不是源代码。生成 AST 后，接下来会生成执行上下文。

  ## 生成字节码

  生成AST后，通过V8解释器(Ignition)来生成字节码。但`字节码`并不能直接让机器运行，还需要转成机器码。
  V8早期直接把 AST 转换成机器码，但是造成严重的内存占用问题。

  **字节码概念**
  字节码是介于AST与机器码之间的一种代码，但与特定类型的机器码无关，字节码需要通过解释器将其转成机器码。

  ## 执行代码

  在代码执行阶段，V8会将重复出现的代码标记为`热点代码`，编译成机器码保存起来，这个用来编译的工具就是V8的编译器。
  在这样的机制下，代码执行效率得到提高。这种编译机制叫作`即时编译`，也就是我们常听到的`JIT`。

  总结一下：

  1. 首先通过词法分析和语法生成`AST`

  2. 接着将 `AST` 转成 字节码

  3. 由解释器逐行执行字节码，遇到重复代码启动编译器进行编译成对应的机器码并保持。

  ## 浏览器中的 Event Loop
  浏览器事件循环中有两种队列：宏任务队列和微任务队列。

  常见的宏任务队列 比如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。

  常见的微任务队列 比如: new Promise().then(回调)、MutationObserver(html5新特性) 等。

  ## Event Loop 过程

  干讲理论不容易理解，直接以一个例子开始:

  ```js
  console.log('start');
  setTimeout(() => {
    console.log('timeout');
  })
  Promise.resolve().then(() => {
    console.log('resolve');
  })
  console.log('end')
  ```
  1.  整体作为一个宏任务进来，对于同步代码直接压入执行栈, 因此先打印 `start`和`end`;

  2. setTimeout作为宏任务放入宏任务队列

  3. Promise.then作为一个为微任务放入到微任务队列

  4. 当本次宏任务结束，检查微任务队列是否有任务，发现一个Promise.then, 执行。

  5. 接着进入下一个宏任务————setTimeout,执行。

  因此最后的顺序是:

  ```
   start
   end
   resolve
   timeout
  ```
  这样就直观地感受到了浏览器环境下 EventLoop 的执行流程。
  不过，这只是其中的一部分情况，接下来我们来做一个更完整的总结。
  
  1. 一开始以整段脚本为第一个宏任务执行

  2. 执行过程中同步代码直接执行，**宏任务**进入宏任务队列，**微任务**进入微任务队列

  3. 当宏任务执行完退出队列，检查微任务队列，如果有任务则执行，直到微任务队列为空。

  4. 执行浏览器UI 线程的渲染工作。

  5. 检查是否有 web Worker 任务，有则执行。

  6. 执行队首新的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

  练习题

  ```js
  console.log('1');

  setTimeout(function() {
      console.log('2');
      new Promise(function(resolve) {
          console.log('4');
          resolve();
      }).then(function() {
          console.log('5')
      })
  })
  new Promise(function(resolve) {
      console.log('7');
      resolve();
  }).then(function() {
      console.log('8')
  })

  setTimeout(function() {
      console.log('9');
      new Promise(function(resolve) {
          console.log('11');
          resolve();
      }).then(function() {
          console.log('12')
      })
  })
  // 1 7 8 2 4 5 9 11 12
  ```