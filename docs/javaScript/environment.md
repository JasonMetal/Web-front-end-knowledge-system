 # 执行环境
   执行环境定义了变量和函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的**变量对象**，环境中定义的所有变量和函数都保存在这个对象中。

   每个函数都有自己的执行环境。当执行流进入一个函数的时，**函数环境**就会被推入一个**环境栈**中。而在函数执行之后，栈就将其环境弹出，把控制权返回给之前的执行环境。

   当代码在一个环境中执行时，会创建变量对象的一个**作用域链**。作用域链的用途是，保证执行环境有序访问有权访问的所有变量和函数。作用域链的前端，始终是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其**活动对象**作为变量对象。活动变量在最开始只包含一个变量，即arguments对象（这个对象在全局环境中是不存在的）。作用域中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自再下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

  ## 执行上下文栈
  ### 执行顺序
  如果要问到 JavaScript 代码执行顺序的话，想必写过 JavaScript 的开发者都会有个直观的印象，那就是顺序执行。
  例如：
  ```js
  var foo = function () {
    console.log('foo1');
  }

  foo();  // foo1

  var foo = function () {
      console.log('foo2');
  }

  foo(); // foo2
  ```
  然而去看这段代码：
  ```js
    function foo() {
        console.log('foo1');
    }

    foo();  // foo2

    function foo() {
        console.log('foo2');
    }

    foo(); // foo2
  ```
  打印的结果却是两个 foo2。

  JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。
  当执行一段代码的时候，会进行一个“准备工作”，比如第一个例子中的变量提升，
  和第二个例子中的函数提升。
  
  那到底JavaScript引擎遇到一段怎样的代码时才会做“准备工作”呢？
  ### 可执行代码
  这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些了？
  其实很简单，就三种，全局代码、函数代码、eval代码。

  举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，
  让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。

  ### 执行上下文栈(环境栈)
  如何管理创建的那么多执行上下文呢？
  
  JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文

  为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：
  ```js
  ECStack = [];
  ```
  1. 当 JavaScript 开始要解释执行代码,
  2. 遇到全局代码，向执行上下文栈压入一个全局执行上下文(我们用 globalContext 表示它)
  3. 当整个应用程序结束的时候，ECStack 才会被清空 
  
  程序结束之前， ECStack 最底部永远有个 globalContext：
  ```js
  ECStack = [
      globalContext
  ];
  ```
  现在 JavaScript 遇到下面的这段代码了：

  ```js
  function fun3() {
    console.log('fun3')
  }

  function fun2() {
      fun3();
  }

  function fun1() {
      fun2();
  }

  fun1();
  ```
  当执行一个函数的时候，创建一个执行上下文(执行环境)，并且压入执行上下文栈，
  当函数执行完毕的时候，将函数的执行上下文从栈中弹出。
  ```js
  ECStack.push(<fun1> functionContext);
  ECStack.push(<fun2> functionContext);
  ECStack.push(<fun3> functionContext);
  ECStack.pop(<fun3> functionContext);
  ECStack.pop(<fun2> functionContext);
  ECStack.pop(<fun1> functionContext);
  ```
  ### 思考题
  ```js
  var scope = "global scope";
  function checkscope(){
      var scope = "local scope";
      function f(){
          return scope;
      }
      return f();
  }
  checkscope();
  ```
  ```js
  var scope = "global scope";
  function checkscope(){
      var scope = "local scope";
      function f(){
          return scope;
      }
      return f;
  }
  checkscope()();
  ```
  两段代码执行的结果一样，但两段代码有哪些不同？执行上下文栈的变化不一样。

  模拟第一段代码：
  ```js
  ECStack.push(<checkscope> functionContext);
  ECStack.push(<f> functionContext);
  ECStack.pop(<f> functionContext);
  ECStack.pop(<checkscope> functionContext);

  ```
  模拟第二段代码：
  ```js
  ECStack.push(<checkscope> functionContext);
  ECStack.pop(<checkscope> functionContext);
  ECStack.push(<f> functionContext);
  ECStack.pop(<f> functionContext);
  ```
  ## 变量对象

  变量对象是与执行上下文相关的数据作用域，执行上下文中定义的所有变量和函数都保存在这个对象中。
  不同执行上下文下的变量对象稍有不同：全局环境的变量对象、函数环境的变量对象。

  ### 全局上下文
  我们先了解一个概念，叫全局对象。在 W3School 中也有介绍：

  全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。
  在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。
  例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。

  1.可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。
  ```js
  console.log(this);
  ```
  2.全局对象是由 Object 构造函数实例化的一个对象。

  ```js
  console.log(this instanceof Object);
  ```
  3.预定义了函数和属性。

  ```js
  console.log(Math.random());
  console.log(this.Math.random());
  ```
  4.作为全局变量的宿主。

  ```js
  var a = 1;
  console.log(this.a);
  ```
  5.客户端 JavaScript 中，全局对象有 window 属性指向自身。
  ```js
  var a = 1;
  console.log(window.a);

  this.window.b = 2;
  console.log(this.b);
  ```
  全局环境中的变量对象就是全局对象

  ### 函数上下文
  在函数上下文中，用活动对象(activation object, AO)来表示变量对象。

  活动对象和变量对象是一个东西。
  
  变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问。
  
  当进入一个执行上下文中，变量对象被激活，被激活的变量对象才能被访问。

  活动变量在最开始只包含一个变量，即arguments对象（这个对象在全局环境中是不存在的）。

  ### 进入执行上下文

  变量对象：
  1. arguments对象
  2. 函数声明：由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建；如果变量对象已经存在相同名称的属性，则完全替换这个属性。
  3. 变量声明：由名称和对应值（undefined）组成一个变量对象的属性被创建；如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。
  ```js
  function foo(a) {
    var b = 2;
    function c() {}
    var d = function() {};

    b = 3;
  }

  foo(1);
  ```

  在进入执行上下文后，活动变量（OA）：
  ```js
    AO = {
      arguments: {
          0: 1,
          length: 1
      },
      a: 1,
      b: undefined,
      c: reference to function c(){},
      d: undefined
    }
  ```

  代码执行
  ```js
    AO = {
      arguments: {
          0: 1,
          length: 1
      },
      a: 1,
      b: 3,
      c: reference to function c(){},
      d: reference to FunctionExpression "d"
    }
  ```
  ### 思考题
  ```js
  function foo() {
    console.log(a);
    a = 1;
    }

    foo(); // ???

    function bar() {
        a = 1;
        console.log(a);
    }
    bar(); // ???
  ```
  第一段会报错：Uncaught ReferenceError: a is not defined。

  第二段会打印：1。
  
  这是因为函数中的 "a" 并没有通过 var 关键字声明，所有不会被存放在 AO 中。

  第一段执行 console 的时候， AO 的值是：

  ```js
  AO = {
      arguments: {
          length: 0
      }
  }
  ```

  ```js
  console.log(foo);

  function foo(){
      console.log("foo");
  }

  var foo = 1;
  ```
  会打印函数，而不是 undefined 。

  这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

  ## 作用域链
  当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

  一个函数的创建和激活，作用域链分别是如何创建和变化的。

 ### 函数创建
 函数的作用域是在函数创建的时候就决定的。
 函数有一个内部属性 [[scope]]，创建的时候保存所有父变量对象到其中。
 注意：[[scope]] 并不代表完整的作用域链！

 函数创建时，各自的[[scope]]为：
 
 ```js
 function foo() {
      function bar() {
          ...
      }
  }
 ```
 ```js
  foo.[[scope]] = [
    globalContext.VO
  ];

  bar.[[scope]] = [
      fooContext.AO,
      globalContext.VO
  ];
 ```
 ### 函数变化
  当函数激活时，创建 VO/AO 后将活动对象添加到作用域链的前端。

  执行上下文的作用域链，命名为 Scope：
  ```js
  Scope = [AO].concat([[Scope]]);
  ```

  ### 举例子
  ```js
  var scope = "global scope";
  function checkscope(){
      var scope2 = 'local scope';
      return scope2;
  }
  checkscope();
  ```
  1. checkscope 函数被创建: 保存作用域链到内部属性[[scope]]

  ```js
    checkscope.[[scope]] = [
      globalContext.VO
    ];
  ```
  2. 执行 checkscope 函数: 

    (1) 创建 checkscope 函数执行上下文;
    
    (2) checkscope 函数执行上下文被压入执行上下文栈。

  ```js
  ECStack = [
      checkscopeContext,
      globalContext
  ];
  ```
  3. 开始做准备工作:
    (1) 复制函数[[scope]]属性创建作用域链
    ```js
    checkscopeContext = {
        Scope: checkscope.[[scope]],
    }
    ```
    (2) 用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明
    ```js
    checkscopeContext = {
        AO: {
            arguments: {
                length: 0
            },
            scope2: undefined
        }，
        Scope: checkscope.[[scope]],
    }
    ```
    (3) 将活动对象压入 checkscope 作用域链顶端

    ```js
    checkscopeContext = {
        AO: {
            arguments: {
                length: 0
            },
            scope2: undefined
        },
        Scope: [AO, [[Scope]]]
    }
    ```
  4. 开始执行函数，随着函数的执行，修改 AO 的属性值
  ```js
  checkscopeContext = {
      AO: {
          arguments: {
              length: 0
          },
          scope2: 'local scope'
      },
      Scope: [AO, [[Scope]]]
  }
  ```
  5. 查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
  ```js
    ECStack = [
      globalContext
    ];
  ```

  ### 练习题
  ```js
  var scope = "global scope";
  function checkscope(){
      var scope = "local scope";
      function f(){
          return scope;
      }
      return f;
  }
  checkscope()();
  ```
  1. 执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈
  ```js
    ECStack = [
      globalContext
    ];
  ```
  2. 全局上下文初始化
  ```js
    globalContext = {
        VO: [global],
        Scope: [globalContext.VO],
        this: globalContext.VO
    }
  ```
  3. 初始化的同时，checkscope 函数被创建，保存作用域链到函数的内部属性[[scope]]
  ```js
    checkscope.[[scope]] = [
      globalContext.VO
    ];
  ```
  4. 执行 checkscope 函数: 
      (1) 创建 checkscope 函数执行上下文;
      (2) checkscope 函数执行上下文被压入执行上下文栈。
    ```js
      ECStack = [
        checkscopeContext,
        globalContext
      ];
    ```
  5. 开始做准备工作:
    (1) 复制函数[[scope]]属性创建作用域链
    ```js
      checkscopeContext = {
          Scope: checkscope.[[scope]],
      }
    ```
    (2) 用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明
    ```js
      checkscopeContext = {
          AO: {
              arguments: {
                  length: 0
              },
              scope: undefined,
              f: reference to function f(){}
          }，
          Scope: checkscope.[[scope]],
      }
    ```
    (3) 将活动对象压入 checkscope 作用域链顶端
    ```js
      checkscopeContext = {
          AO: {
              arguments: {
                  length: 0
              },
              scope: undefined,
              f: reference to function f(){}
          }，
          Scope: [AO, globalContext.VO],
          this: undefined
      }
    ```
  6. 开始执行函数, 随着函数的执行，修改 AO 的属性值
    ```js
      checkscopeContext = {
            AO: {
                arguments: {
                    length: 0
                },
                scope: "local scope",
                f: reference to function f(){}
            }，
            Scope: [AO, globalContext.VO],
            this: undefined
      }
      fContext  = {
          AO: {
              arguments: {
                  length: 0
              },
          }，
          Scope: [AO, checkscopeContext.AO, globalContext.VO],
          this: undefined
      }
    ```
  5. 查找到 f 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
  ```js
    ECStack = [
      globalContext
    ];
  ```
  6. 执行 f 函数

  f 函数执行上下文被压入执行上下文栈。
  ```js
  ECStack = [
    fContext,
    globalContext
  ];
  ```
  7. 查找到 scope 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
  ```js
  ECStack = [
    globalContext
  ];
  ```
  