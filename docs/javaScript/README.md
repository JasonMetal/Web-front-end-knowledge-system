  ## 数据类型
   ES标准规定了8种数据类型，其中有7种简单数据类型：`Undefind`、`Null`、`Boolean`、`Number`、`String`、`Symbol`、`BigInt`。以及1种复杂数据类型：`Object`

   ### Undefined 类型
   Undefined 类型只有一个值，即特殊的 undefined。未初始化的变量会自动被赋予undefined值，但是显示地初始化变量依然是明智的选择。
   ### Null 类型
   Null 类型只有一个值，null。从逻辑角度来看，null值表示一个空对象指针，而这也正是typeof操作符检测null值时返回“object”的原因。

   如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为null而不是其他值。
   这样一来，只要直接检查null值就可以知道相应的变量是否已经保存了一个对象的应用，如下面的例子
   ```js
    if (car !== null) {

    }
   ```
   实际上，undefined值是派生自null值的，因此ECMA-262规定它们的相等性测试要返回true;
   ```js
    alter(null == undefined); // true
   ```
   ### Boolean 类型
   Boolean 类型时ES中使用最多的一种类型，该类型只有两个字面量：true和false。
   ### String类型
   **1. 字符串** 

   String 数据类型包含一些特殊的字符字面量，也叫转移序列，用于表达非打印字符，或者具有其他用途的字符
   
   **2. 字符串** 
   字符串的特点，ES中的字符串是不可变的，也就说，字符串一旦创建，它们的值就不能改变。要改变某个变量保存的字符串，首先要摧毁原来的字符串，
   然后再用另一个包含新值的字符串填充该变量，例如：
   ```js
     var lang = 'java';
     lang = lang + "Script";
   ```
   ### Number类型

   ES中Number类型使用`IEEE754`标准来表示整数和浮点数值。
   `IEEE754`：全称IEEE二进制浮点数算术标准，定义了表示浮点数的格式等内容。

   在 IEEE754 中，规定了四种表示浮点数值的方式：单精确度（32位）、双精确度（64位）、
   延伸单精确度、延伸双精确度。像ES采用的就是双精确度，也就是说，会用64位字节来存储
   一个浮点数。

  
   #### 浮点数值
   所谓浮点数值，就是该数值种必须包含一个小数点，并且小数点后面必须至少有一位数字。
   浮点数值得最高精度是17位小数。
   
   #### 0.1+0.2为什么不等于0.3？
  
   ***浮点数转二进制***

   1020二进制：1111111100
   ```js
   1020 = 1020 = 1 * 2^9 + 1 * 2^8 + 1 * 2^7 
   + 1 * 2^6 + 1 * 2^5 + 1 * 2^4 + 1 * 2^3 + 1 * 2^2 + 0 * 2^1 + 0 * 2^0
   ```

   0.75二进制
   ```js
      0.75 = a * 2^-1 + b * 2^-2 + c * 2^-3 + d * 2^-4 + ...
   ```
   因为使用的是二进制，abcd……的值的是 0 或 1。两边不停的 * 2 算出，解法如下：
   ```js
      0.75 = a * 2^-1 + b * 2^-2 + c * 2^-3 + d * 2^-4...
      1 + 0.5 = a * 2^0 + b * 2^-1 + c * 2^-2 + d * 2^-3... (所以 a = 1)
      0.5 = b * 2^-1 + c * 2^-2 + d * 2^-3...
      1 + 0 = b * 2^0 + c * 2^-2 + d * 2^-3... (所以 b = 1)
  ```
   0.75 用二进制表示就是 0.ab，也就是 0.11
   
   0.1二进制

   ```js
    0.1 = a * 2^-1 + b * 2^-2 + c * 2^-3 + d * 2^-4 + ...
    0 + 0.2 = a * 2^0 + b * 2^-1 + c * 2^-2 + ...   (a = 0)
    0 + 0.4 = b * 2^0 + c * 2^-1 + d * 2^-2 + ...   (b = 0)
    0 + 0.8 = c * 2^0 + d * 2^-1 + e * 2^-2 + ...   (c = 0)
    1 + 0.6 = d * 2^0 + e * 2^-1 + f * 2^-2 + ...   (d = 1)
    1 + 0.2 = e * 2^0 + f * 2^-1 + g * 2^-2 + ...   (e = 1)
    0 + 0.4 = f * 2^0 + g * 2^-1 + h * 2^-2 + ...   (f = 0)
    0 + 0.8 = g * 2^0 + h * 2^-1 + i * 2^-2 + ...   (g = 0)
    1 + 0.6 = h * 2^0 + i * 2^-1 + j * 2^-2 + ...   (h = 1)
    ....
   ```
   0.1用二进制表示就是0.00011001100110011……

  ***浮点数的存储***

  IEEE754标准认为，浮点数 (Value)可表示为 `Value = sign * exponent * fraction`，简单理解就是科学计数法。
  
  比如 -1020：
  ```js
    用科学计数法表示:  -1 * 10^3 * 1.02。
    sign: -1，exponent: 10^3，fraction: 1.02。
  ```
  再比如：以 0.1 的二进制 0.00011001100110011……。

  ```js
    用科学计数法表示：1 * 2^-4 * 1.1001100110011…
    sign：1，exponent：2^-4，fraction：1.1001100110011……
  ```

  **只做二进制科学计数法的表示时**：`Value = (-1)^S * (1 + Fraction) * 2^E`

  `(-1)^S`: 
  
  表示符号位，当 S = 0，V 为正数；当 S = 1，V 为负数。

  `(1 + Fraction)`: 
  
  所有的浮点数都可以表示为 1.xxxx * 2^xxx 的形式，
  前面的一定是 1.xxx，那干脆我们就不存储这个 1 了，
  直接存后面的 xxxxx 好了，这也就是 Fraction 的部分。

  `2^E`: 
  ```js
  1020.75:
    二进制数: 1111111100.11，
    二进制科学计数法： 1 * 1.11111110011 * 2^9，E 的值就是 9，
  ```

  ```js
    0.1: 
    二进制科学计数法: 1 * 1.1001100110011…… * 2^-4，E 的值就是 -4，
  ```


  E 既可能是负数，又可能是正数，
  
  **该怎么储存 E 呢？**

  假如用 8 位字节来存储 E 这个数：正数值的范围是 0 ~ 254；正负数值的范围是 -127~127。把要存储的数字加上 127，当存 -127 的时候，存 0；当存 127 的时候，存 254，当取值时减去 127。

  实际存储： E + bias。8 个字节的时候，bias 就是 127。要存储一个浮点数： S + Fraction + (E + bias) 。
  
  要分配多少个字节位来存储这些数呢？IEEE754 给出了标准：1 位存储 S，0 表示正数，1 表示负数。用 11 位存储 E + bias，对于 11 位来说，bias 的值是 2^(11-1) - 1，也就是 1023。用 52 位存储 Fraction。以0.1为例：
  
  ```

  `科学计数法`: 1 * 1.1001100110011…… * 2^-4 

  `Sign`: 0

  `E + bias`: -4 + 1023 = 1019

  1019 用二进制表示是 1111111011

  Fraction 是 1001100110011……

  ```

  对应 64 个字节位的完整表示就是：
  ```
  0 01111111011 1001100110011001100110011001100110011001100110011010
  ```
  同理, 0.2 表示的完整表示是：
  ```
  0 01111111100 1001100110011001100110011001100110011001100110011010
  ```
  ***浮点数的运算***

  五个步骤完成：对阶、尾数运算、规格化、舍入处理、溢出判断。

  **对阶**

  0.1 是 1.1001100110011…… * 2^-4，阶码是 -4
  
  0.2 就是 1.10011001100110...* 2^-3，阶码是 -3
  
  两个阶码不同，先调整, 小阶对大阶

  ```
    0.1 -4 调到 -3: 0.11001100110011…… * 2^-3
  ```

  **尾数运算**

  ```
  0.1100110011001100110011001100110011001100110011001101
  + 1.1001100110011001100110011001100110011001100110011010
  ————————————————————————————————————————————————————————
  10.0110011001100110011001100110011001100110011001100111
  ```

  **规格化**
  ```
      1.0011001100110011001100110011001100110011001100110011(1) * 2^-2
  ```
  **舍入处理**

  括号里的 1 超出了范围，要被舍弃（0 舍 1 入）。
  ```
    1.0011001100110011001100110011001100110011001100110100 * 2^-2
  ```

  **结果存成 64 位**
  ```
      0 01111111101 0011001100110011001100110011001100110011001100110100
  ```
  转换为10进制数：0.30000000000000004440892098500626

  **结论**

  因为两次存储时的精度丢失加上一次运算时的精度丢失，最终导致了 0.1 + 0.2 !== 0.3
  
   ### 类型检测

   #### 检测基本类型：
   检测变量的基本类型使用`typeof`,除了`null`都可以显示正确的类型。
   
   使用`typeof`检查`null`值会返回`object`。因为从逻辑角度看，`null`表示一个空对象指针。 

   `typeof`检测函数时，会返回“function。

   #### 检测引用类型：
   检测变量的引用类型使用: `instanceof`。

   检测某个对象是否为数组使用: `Array.isArray(obj)`
   
   ### 类型转换

   #### 原始值转布尔
   只有 6 种值可以被转换成 false，
   
   不传任何参数时返回 false, 
   
   其他都会被转换成 true，
   ```js
    console.log(Boolean()) // false
    console.log(Boolean(false)) // false
    console.log(Boolean(undefined)) // false
    console.log(Boolean(null)) // false
    console.log(Boolean(+0)) // false
    console.log(Boolean(-0)) // false
    console.log(Boolean(NaN)) // false
    console.log(Boolean("")) // false
   ```
    
   ## 变量
   ### 复制变量值
   如果从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一新值，然后把该值复制到新变量分配的位置上。看下例子：
   ```js
     var num1 = 5;
     var num2 = num1;
   ```
  在此，num1中保存的值是5。当使用num1的值来初始化num2时，num2中也保存了值5。
  但num2中5和num1中5是完全独立的，该值只是num1中5的一个副本。
  此后，这两个变量可以参与任何操作而不会相互影响。

  如果从一个变量向另一个变量复制引用类型的值，通用会储存在变量对象中的值赋值一份到位新变量分配的空间中。
  不同的是，这个值的副本实际上，是一个指针，而这个指针指向存储在堆中的一个对象。
  赋值操作结束后，两个变量实际上将引用同一个对象。因此改变其中一个变量，就会影响另一个变量。
  看下例子：
   ```js
     var obj1 = {

     };
     var obj2 = obj1;
     obj1.name = 'wzx';
     alter(obj2.name) // wzx wzx   
  ```
  通常在开发中我们不希望出现这样的问题，我们可以使用深浅浅拷贝来解决这个问题。后面会在高级技巧介绍深浅拷贝。

  ### 参数传递
  ES中所有函数的参数都是按值传递的。也就是说把函数外部的值复制给函数内部的参数，就和把一个值从一个变量复制到另一个变量一样。基本类型值的
  传递如同基本类型变量的复制一样，而引用类型值的传递，则如同引用类型变量的复制一样。
  例子：
  ```js
    function addTen(num) {
      return num +=10;
    }
    var count = 20;
    var result = addTen(count);
    alter(count) // 20
    alter(result)  // 30
  ```
  在看个例子：
  ```js
    function setName(obj) {
      obj.name = 'ming'
    }
    var person = {}
    setName(person)
    alter(person.name) // ming
  ```
 ## 函数
 ### 没有重载
 ```js
   function add(num){
       return num + 100;
   }
   function add(num) {
       return num + 200;
   }

   var result = add(100) // 300
  // 相当于
   var add = function (num) {
       return num + 100;
   }
   add = function (num) {
       return num + 200
   }
   result = add(100) // 300 
 ```
   在创建第二个函数时，实际上覆盖了第一个函数的变量add。
  ### 函数声明与函数表达式
  ```js
    alter(sum(10, 10))
    function sum(num1, num2) {
        return num1 + num2
    }
  ```
  以上代码完全可以正常运行。因为在代码开始执行之前，解析器就已经通过一个名为函数声明提升的过，读取并将函数声明添加到执行环境中。在代码求值时，JavaScript引擎在第一遍会声明函数并将它们提升到顶部。如果像下面例子所示，把上面的函数声明改为等价的函数表达式，就会在执行期间导致错误。
  ```js
    alter(sum(10, 20))
    var sum = function(num1, num2) {
      return num1 + num2
    }
  ```
  ### 函数内部属性
  在函数内部，有两个特殊对象：arguments 和 this.
  #### Arguments 对象
  Arguments 它是一个类数组对象，包含传入函数中的所有参数。

  1. length属性

  Arguments对象的length属性，表示实参的长度，举个例子：
  ```js
  function foo(b, c, d){
    console.log("实参的长度为：" + arguments.length)
  }

  console.log("形参的长度为：" + foo.length)

  foo(1)

  // 形参的长度为：3
  // 实参的长度为：1
  ```
  2. callee属性

  Arguments 对象的 callee 属性，通过它可以调用函数自身。

  讲个闭包经典面试题使用 callee 的解决方法：
  ```js
  var data = [];
  for (var i = 0; i < 3; i++) {
      (data[i] = function () {
        console.log(arguments.callee.i) 
      }).i = i;
  }

  data[0]();
  data[1]();
  data[2]();

  // 0
  // 1
  // 2
  ```


  ES5中规范化了另一个函数对象的属性：caller。这个属性保存着调用当前函数的函数的引用
  
  #### this
  this的值取决于引用的时函数执行的环境对象。

  ```js
  window.color = 'red';
  var o = { color: 'blue' }
  function sayColors() {
      alter(this.color)
  }

  sayColors() // red 当前执行环境对象是全局对象

  o.sayColors = sayColors

  o.sayColors() // blue 当前执行环境对象是o

  ```
  ## 执行环境
   执行环境定义了变量和函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的**变量对象**，环境中定义的所有变量和函数都保存在这个对象中。

   每个函数都有自己的执行环境。当执行流进入一个函数的时，**函数环境**就会被推入一个**环境栈**中。而在函数执行之后，栈就将其环境弹出，把控制权返回给之前的执行环境。

   当代码在一个环境中执行时，会创建变量对象的一个**作用域链**。作用域链的用途是，保证执行环境有序访问有权访问的所有变量和函数。作用域链的前端，始终是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其**活动对象**作为变量对象。活动变量在最开始只包含一个变量，即arguments对象（这个对象在全局环境中是不存在的）。作用域中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自再下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

  ### 执行上下文栈
  #### 执行顺序
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
  #### 可执行代码
  这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些了？
  其实很简单，就三种，全局代码、函数代码、eval代码。

  举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，
  让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。

  #### 执行上下文栈(环境栈)
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
  #### 思考题
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
  ### 变量对象

  变量对象是与执行上下文相关的数据作用域，执行上下文中定义的所有变量和函数都保存在这个对象中。
  不同执行上下文下的变量对象稍有不同：全局环境的变量对象、函数环境的变量对象。

  #### 全局上下文
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

  #### 函数上下文
  在函数上下文中，用活动对象(activation object, AO)来表示变量对象。

  活动对象和变量对象是一个东西。
  
  变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问。
  
  当进入一个执行上下文中，变量对象被激活，被激活的变量对象才能被访问。

  活动变量在最开始只包含一个变量，即arguments对象（这个对象在全局环境中是不存在的）。

  #### 进入执行上下文

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
  #### 思考题
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

  ### 作用域链
  当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

  一个函数的创建和激活，作用域链分别是如何创建和变化的。

 #### 函数创建
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
 #### 函数创建 
  当函数激活时，创建 VO/AO 后将活动对象添加到作用域链的前端。

  执行上下文的作用域链，命名为 Scope：
  ```js
  Scope = [AO].concat([[Scope]]);
  ```

  #### 举例子
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

  #### 练习题
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
  
  ## 闭包
  闭包是指(有权访问另一个函数作用域中的变量)的函数。
  创建闭包的常见方式，就是在一个函数内创建另一个函数，如下例子：
  ```js
  function createFunction(name) {
    return function(obj1, obj2) {
      var value1 = obj1[name];
      var value2 = obj2[name];
      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0
      }
    }
  }
  ```
  要理解闭包，必须先理解如何创建作用域链以及作用域链有什么作用的细节。
  当某个函数被执行时，会创建一个执行环境以及相应的作用域链。
  然后使用agruments和其他命名参数的值来初始化函数的活动对象。
  但在作用域中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位，直到作为作用域链终端的全局执行环境位置。
  来看下面的例子：
  ```js
   function compare(value1, value2) {
     if (value1 < value2) {
       return -1;
     } else if (value1 > value2) {
       return 1;
     } else {
       return 0;
     }
   }
   var result = compare(5, 10)
  ```
  当调用compare时，会创建一个包含arguments、value1、value2的活动对象。
  全局执行环境的变量对象（result、compare）在compara执行环境的作用域链中则处于第二位。

  后台的每个执行环境都有一个表示变量的对象——变量对象。
  全局的变量对象始终存在，而像compare这样的局部环境的变量对象，只在函数执行时存在。
  
  在创建compare()函数时，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部的[[Scope]]属性中。

  当调用compare时，会创建一个执行环境，然后通过复制函数的[[Scope]]属性中的对象构建起执行环境的作用域链。

  此后，又有一个活动对象被创建并被推入执行环境的作用域链前端。

  作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。

  在另一个函数内部定义的函数会将包含函数（即外部函数）的活动对象添加到它的作用域中。

  因此createFunction（）函数内部定义的匿名函数的作用域中，实际上将会包含createFunction（）的活动对象。

  ```js
  var compare = createFunction('name');
  var result = compare({name: 'nina'}, {name: 'greg'})
  ```
  当createFunction函数返回后，其执行环境的作用域被摧毁，但它的活动变量仍然在内存中；
  直到匿名函数被销毁后，createFunction的活动对象才会被销毁，列如：
  ```js
    // 创建函数
    var compareNames = createFunction('name')
    var result = compare({name: 'nina'}, {name: 'greg'})
    compare = null;
  ```
  通过将 compare 设置为null来接触该函数的引用。
  ## 内存问题
  ### 垃圾收集
   JavaScript 具有自动垃圾收集机制。
   这种垃圾收集机制的原理：找到那些不在继续使用的变量，然后释放其占用的内存。
   垃圾收集器会按照固定的时间间隔来执行这一操作。

   #### 标记清除
   JavaScript 中最经常用的垃圾收集方式是**标记清除**。当变量进入环境时，就将这个变量标记为“进入环境”。
   当变量离开环境时，则将其标记为“离开环境”。

   #### 引用计数
   另一个不太常见的垃圾收集策略叫作**引用计数**。引用计数的含义时跟踪记录每个值被引用的次数，
   当这个值的引用次数变成0时，则回收其内存。
  ## 面向对象的程序设计
  
   ### 理解对象
   #### 属性类型
  ES中有两种属性：数据属性和访问器属性
  
  1.数据属性包含了数据值的位置。在这个位置可以读取和写入值。数据属性有4个描述其行为的特性。
  
  [[Configurable]]:表示能否通过delete删除属性从而重新定义属性，能够修改属性的特性，或者能否把属性修改为访问器属性。
  
  [[Enumerable]]: 表示能否通过for-in 循环返回属性。

  [[Writable]]: 表示能否修改属性的值。

  [[Value]]: 包含这个属性的数据值。

  要修改属性默认的特性，必须使用ES5的Object.definedProperty()方法。
  这个方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。
  其中描述符对象的属性必须是：configurable、enumerable、writable、
  和value。设置其中的一个或多个值，可以修改对应的特性值。例如：

  ```js
    var person = {}
    Object.defindePropertotype(person, 'name', {
      configurable: true,
      enumerable: true,
      writable: false,
      value: 'Nine'
    })
    person.name = 'xiaoming'
    alter(p.name) // Nine
  ```

  2.访问器属性

  [[Configurable]]: 表示能否通过delete删除属性从而重新定义属性，能够修改属性的特性，或者能否把属性修改为访问器属性。

  [[Enumerable]]: 表示能否通过for-in 循环返回属性。

  [[Get]]: 在读取属性时调用的函数。

  [[Set]]: 在写入属性时调用的函数。

  访问器属性不能直接定义，必须使用Object.definedpropertoty()来定义。请看下面的例子。
  ```js
      var book = {
        _year: 2004,
        edition: 1
      }

      Object.defindeProtoperty (book, 'year', {
        get: function() {
          return this._year;
        },
        set: function(newValue) {
          if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
          }
        }
      })

      book.year = 2005;
      book.edition = 2;
  ```
  3. 定义多个属性
  Object.definedProtoperties()用于一次定义多个属性，例如：
  ```js
    var book = {}
    Object.definedProtoperties(book, {
      _year: {
        writable: true,
        value: 2004,
      },
      edition: {
        writable: true,
        value: 1,
      },
      year: {
        get: function() {
          return this._year;
        },
        set: function(newValue) {
          if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
          }
        }
      }
    })
  ```
   ### 创建对象
   虽然Object构造函数或对象字面量都可以用来创建单个对象，但这些方法有个明显的缺点：
   使用一个接口创建很多对象，会产生大量的重复代码：为解决这个问题，人们开始使用工厂模式。

   #### 工厂模式
   工厂模式的一个广为人知的设计模式，这种模式抽象了创建具体对象的过程。考虑到ES中无法创建类，
   开发人员就发明了一个函数，用函数封装以特定接口创建对象的细节：如下面的例子所示：
   ```js
    function createPerson(name, age, job) {
      var obj = new Object();
      obj.name = name;
      obj.age = age;
      obj.job = job;
      return obj;
    }
    var person1 = createPerson('Nine', 28, 'softWare Engineer');
    var person2 = createPerson('xiaoMing', 25, 'Doctor');
   ```
   工厂模式虽然解决了创建多个相似对象的问题，但是缺没有解决对象识别的问题（即怎样知道一个对象的类型）。于是
   构造函数出现了。
   #### 构造函数模式
   可以使用构造函数来重写以下前面的例子：
   ```js
    function Person(name, age, job) {
      this.name = name;
      this.age = age;
      this.job = job;
      this.sayName = function() {
        alter(this.name);
      }
    }
    var person1 = new Person('Nine', 28, 'softWare Engineer');
    var person2 = new Person('xiaoMing', 25, 'Doctor');
   ```
   person1和person2 分别保存着Person的一个不同的实例。这两个对象都有一个constructor（构造函数）属性。
   该属性执行Person，如下所示：
   ```js
    alter(person1.constructor == Person); //true
    alter(person2.constructor == Person); //true
   ```
   对象的constructor属性最初是用来识别对象类型的。但是提到检测对象类型，还是instanceof 操作符更靠谱。
   用instanceof 如下例子:
   ```js
   alter(person1 instanceof Object) // true
   alter(person1 instanceof Person) // true
   ```
   构造函数的缺点： 每个方法都要在每个实例上重新创建一遍。
   于是把函数转移到构造函数, 如下：
   ```js
    function Person(name, age, job) {
      this.name = name;
      this.age = age;
      this.job = job;
      this.sayName = sayName;
    }
    function sayName() {
        alter(this.name);
    }
    var person1 = new Person('Nine', 28, 'softWare Engineer');
    var person2 = new Person('xiaoMing', 25, 'Doctor');
   ```
   可是新问题又来了：在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名副其实。而更让人无法接受的是，如果对象需要定义很多方法，那么要定义很多全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。好在这些问题可以通过使用原型模式来解决。

   #### 原型模式
   我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，
   而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。换句话说，不必在
   构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中，如下：
   ```js
    function Person(){}

    Person.prototype.name = 'Nine';
    Person.prototype.age = 28;
    Person.prototype.job = 'softWare Enginerr';
    Person.prototype.sayName = function () {
      alter(this.name);
    }
   ```
   1. 理解对象原型

   无论何时，创建一个新函数，该函数都会有一个prototype属性。
   prototype是一个指针，指向一个对象。
   在默认情况下，所有原型对象会获取一个constructor属性，这个属性指向构造函数。
   以前面的Person为例，Person.prototype.constructor = Person。
   而通过这个原型对象，我们还可以继续给原型对象添加其他属性。
   当创建了一个新实例时，该实例的内部包含一个指针，指向构造函数的原型。虽然没有标准的方式可以访问。

   2. 原型的动态性
  ```js
  var friend = new Person()
  Person.prototype.sayName = function() {
    alter('Hi');
  }
  friend.sayName() // hi

  var friend = new Person()

  Person.prototype = {
    name: 'nina',
    sayName = function() {
      alter('Hi');
    }
  }
  friend.sayName() // 错误
  ```
  原型模式也不是没有缺点。
  首先，它省略了构造函数传递初始化参数这一环境，结果所有实例在默认情况下都将取得相同的属性值。
  虽然这在某种程度上带来一些不方便，但还不是原型的最大问题。
  原型模式最大的问题时由其共享的本性所致的。

  原型中所有属性都是被很多实例共享的，这种共享对于函数非常合适。
  对于那些包含基本值得属性倒也说的过去。
  然而，对于包含引用类型值来说，问题就比较突出了。来看下面的例子：
  ```js
    function Person() {}
    Person.prototype.name = 'Nine';
    Person.prototype.age = 28;
    Person.prototype.job = 'softWare Enginerr';
    Person.prototype.friends: ['shela', 'court'];
    Person.prototype.sayName = function () {
      alter(this.name);
    }

    var person1 = new Person()
    var person2 = new Person()
    person1.friends("Van");
    alter(person1.friends) // 'shela', 'court', 'Van';
    alter(person2.friends) // 'shela', 'court', 'Van';
    alter(person1.frineds === person1.friends) // true;
  ```

  #### 组合使用构造函数和原型模式

  ```js
   function Person(name, age, job, friends) {
      this.name =  name;
      this.age = age;
      this.job = job;
      this.friends = friends;
   }

    Person.prototype.sayName = function () {
      alter(this.name);
    }

    var person1 = new Person('nani', 23, 'sososo', ['1','2','3'])
  ```

  #### 动态原型模式

  ```js
   function Person(name, age, job, friends) {
      this.name =  name;
      this.age = age;
      this.job = job;
      this.friends = friends;
      if (typeof sayName != 'function') {
        Person.prototype.sayName = function () {
          alter(this.name);
        }
      }
   }
  ```

  #### 稳妥构造函数模式
  ```js
    function person(name){
      var o = new Object();
      o.sayName = function(){
          console.log(name);
      };
      return o;
    }
    var person1 = person('kevin');
    person1.sayName(); // kevin
    person1.name = "daisy";
    person1.sayName(); // kevin
    console.log(person1.name); // daisy
  ```
  所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。

  与寄生构造函数模式有两点不同：

  1. 新创建的实例方法不引用 this
  2. 不使用 new 操作符调用构造函数

  稳妥对象最适合在一些安全的环境中。

  稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。

   ### 理解继承
   #### 原型链 
  ES中描述了原型链的概念，并将原型链作为实现继承的主要方法。
  其基本思想时利用原型让一个引用类型继承另一个引用类型的属性和方法。

  假如，我们让原型对象等于另一个类型的实例，结果会是什么样呢？
  显然，此时的原型对象将包含一个指向另一个原型的指针，相对应，另一个原型也包含着指向另一个构造函数的指针。
  假如，另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例和原型的链条。
  这就是所谓的原型链的基本概念。
  实现原型链有一种基本模式，代码大概如下。
  ```js
    function SuperType() {
      this.property = true;
    }
    SuperType.prototype.getSuperValue = function() {
      return this.property;
    }

    function SubType() {
      this.subproperty = false;
    }

    SubType.prototype = new SuperType()

    SubType.prototype.getSubValue = function() {
      return this.subproperty;
    }

    var instance = new SubType()
    instance.getSubperValue() // true
  ```
  原型链继承问题：
  1. 引用类型的属性被所有实例共享，举个例子：
  ```js
    function Parent () {
      this.names = ['kevin', 'daisy'];
    }

    function Child () {

    }

    Child.prototype = new Parent();

    var child1 = new Child();

    child1.names.push('yayu');

    console.log(child1.names); // ["kevin", "daisy", "yayu"]

    var child2 = new Child();

    console.log(child2.names); // ["kevin", "daisy", "yayu"]
  ```
  2.在创建 Child 的实例时，不能向Parent传参


  #### 借用构造函数
  在解决原型链中包含引用类型值所带来问题的过程中，开发人员开始使用一种叫作借用构造函数的技术。
  这种技术的基本思想相当简单，即在子类型构造函数的内部调用超类构造函数。函数只不过实在特定环境中
  执行代码的对象。因此通过使用apply() 和 call()方法也可以在新建对象上执行构造函数。如下所示：
  ```js
  function SuperType() {
    this.colors = ["red", "blue", "green"];
  }

  function SubType() {
    // 继承了SuperType
    SuperType.call(this)
  }

  var instance1 = new SubType();
  instance1.colors.push("yellow");
  alert(instance1.colors) // "red", "blue", "green", "yellow"

  var instance2 = new SubType();
  alert(instance2.colors) // "red", "blue", "green"
  ```
  优点：
  1. 避免了引用类型的属性被所有实例共享
  2. 子类构造函数中传递参数。看下面的例子
  ```js
  function SuperType(name) {
   this.name = name
  }
  function SubType() {
    // 继承了SuperType
    SuperType.call(this, 'nani')
    this.age = 29;
  }
  ```
  缺点：
  如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题————方法都在构造函数中定义。

  #### 组合继承

  组合继承，指的是将原型链和接用构造函数技术组合到一块。背后的思路是：使用原型链实现对原型属性
  和方法的继承，而通过借用构造函数来实现对实例属性的继承。来看以下例子：
  ```js
    function SuperType(name) {
      this.name = name;
      this.colors = ["red", "blue", "green"];
    }

    SuperType.prototype.sayName = function() {
      alert(this.name)
    }

    function SubType(name, age) {
      SuperType.call(this, name)
      this.age = age;
    }

    SubType.prototype = new SubType();
    SubType.prototype.constructor = SubType;
    SubType.prototype.sayAge = function() {
      alert(this.age);
    }
  ```
  优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

  #### 原型式继承

  ```js
  function createObj(o) {
      function F(){}
      F.prototype = o;
      return new F();
  }
  ```
  就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。

  缺点：

  包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
  ```js
  var person = {
      name: 'kevin',
      friends: ['daisy', 'kelly']
  }

  var person1 = createObj(person);
  var person2 = createObj(person);

  person1.name = 'person1';
  console.log(person2.name); // kevin

  person1.firends.push('taylor');
  console.log(person2.friends); // ["daisy", "kelly", "taylor"]
  ```
  #### 寄生式继承
  创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
  ```js
  function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
  }
  ```
  缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。


  #### 寄生组合式继承
  组合式继承的问题是，无论什么情况下都会调用两次超类型构造函数；一次是创建子类原型的时候，
  另一次是在子类型构造函数内部。思路是：不必为子类型的原型而调用超类型的构造函数，我们所需要
  的无非就是超类型的原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后
  再将结果指定给子类型的原型。寄生组合式继承的基本模式如下所示。
  ```js
    function inheritPrototype(subType, superType) {
      var prototype = object(superType);
      prototype.constructor = subType;
      subType.prototype = prototype;
    }

    function SuperType(name) {
      this.name = name;
      this.colors =  ["red", "blue", "green"];
    }
    SuperType.prototype.sayName = function() {
      alert(this.name)
    }

    function SubType(name, age) {
      SuperType.call(this, name)
      this.age = age;
    }

    inheritPrototype(SubType, SuperType)

    SubType.prototype.sayAge = function() {
      alert(this.age)
    }

  ```

  ## 跨域 与 Coment
  ### 跨域
  #### 跨域源资源共享
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
  #### JSONP

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

  ### Comet 
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
  #### 服务器发送事件

  SEE（服务器发送事件）是围绕只读Coment 交互推出的API。服务器响应的类型必须是 text/event-stream。
  要实现SSE，首先要创建一个新的EventSource 对象， 并传进一个入口点：
  ```js
    var source = new EventSource("myevents.php");
  ```
  注意，传入的URL必须与创建对象的页面同源（相同URL模式、域以及端口）。

  #### Web Sockets

  Web Sockets的目标是在一个单独的持久连接上提供全双工、双向通信。
  ```js
    var sockets = new WebSockets("ws://www.example.com/server.php")
    sockets.send("hello world")  //只能发送鹑尾村数据

    socket.onmessage = function(event) {
      var data = event.data
    }
  ```
## 原理模拟实现
  ### call的模拟实现
  call的功能：
  一、将this指向绑定函数，自动运行绑定函数。
  二、传参数给绑定函数。
  设想一下call的this改变指向的实现思路：如果把函数添加到对象中执行，那this是不是就指向这个对象了。如下例子：
  ```js
  var obj = {
      name: 'Nani',
      person: function() {
        alert(this.name)
      }
  }
  obj.person()
  ```
  当然不能去改变对象，但是我们把函数添加到对象中后可以再删除。比如这样：
  ```js
  obj.person = function () {
     alert(this.name)
  };
  delete obj.person;
  ```
  接下来看看第一步具体实现：
  ```js
  var name = 'liming'
  var obj = {
      name: 'Nani',
  }
  Function.prototype.call2 = function(context) {
    context.fn = this;
    context.fn();
    delete context.fn;
  }
  function person() {
      alert(this.name)
  }
  person.call2(obj)
  ```
  call还能传入参数到被绑定的函数，我们可以用arguments,取第一个参数之后的参数。
  ```js
  var name = 'liming'
  var obj = {
      name: 'Nani',
  }
  Function.prototype.call2 = function(context) {
    // 1.this 参数可以传 null，当为 null 的时候，视为指向 window
    context.fn = this || window;
    var arg = []
    for(var i = 1; i < arguments.length; i++) {
      arg.push('arguments[' + i + ']')
    }
    var result = eval('context.fn('+ arg +')');
    delete context.fn;
    // 函数是可以有返回值的
    return result;
  }
  function person(age) {
      alert(this.name)
      console.log(age)
      return {
        obj: 'software'
      }
  }
  person.call2(obj, 12)
  ```
  ### apply的模拟实现
  ```js
  var name = 'liming'
  var obj = {
      name: 'Nani',
  }
  Function.prototype.apply2 = function(context, arr) {
    var context = Object(context) || window;
    context.fn = this || window;
    if (!arr) {
        result = context.fn()
    } else {
        var args = [];
        for(var i = 0; i < arr.length; i++) {
            args.push('arr['+ i +']')
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn;
    return result;

  }
  function person(friend1, friend2) {
      alert(this.name)
      console.log(friend1, friend2)
      return {
        obj: 'software'
      }
  }
  person.apply2(obj, ['kevin', 'liming'])
  ```
  ### bind的模拟实现
  **一、返回绑定函数的模拟**

  首先，先看一下返回bind绑定函数的使用

  ```js
  var person = {
    name: 1
  }
  function sayName() {
    console.log(this.name)
  }
  var bindSayName = sayName.bind(person)
  bindSayName()
  ```
  我们将sayName绑定到了person，这时候this的值指向person。
  this指向的改变，我们可以通过apply或call进行实现，如下例子：
  ```js
  var person = {
    name: 'Nani'
  }
  function sayName() {
    alert(this.name)
  }
  Function.prototype.bind2 = function(context) {
    var self = this
    return function() {
      self.apply(context)
    }
  }
  var bindSayName = sayName.bind2(person)
  bindSayName() // Nani

  ```
  **二、传参的模拟**
  bind拥有传参的功能，如下所示：
  ```js
  var person = {
    name: 'Nani'
  }
  function sayName(age, job) {
    console.log(this.name)
    console.log(age)
    console.log(job)
  }
  var bindSayName = sayName.bind(person, 25)
  bindSayName('softWare') // Nani 25 softWare
  ```
  传入参数我们可以使用es6的扩展符来实现, 如下例子
  ```js
  var person = {
    name: 'Nani'
  }
  function sayName(age, job) {
    console.log(this.name)
    console.log(age)
    console.log(job)
  }
  Function.prototype.bind2 = function(context) {
    const self = this
    var args = Array.pototype.slice.call(arguments, 1)
    return function(...innerArgs) {
      var innerArgs = Array.pototype.slice.call(arguments)
      self.apply(context, args.concat(innerArgs))
    }
  }
  var bindSayName = sayName.bind2(person, 25)
  bindSayName('softWare') // Nani 25 softWare
  ```
  三、构造函数效果的实现

  先来看下效果
  ```js
  var name = 'Nani'
  var personName = {
        name: 'Nani'
    }
  function person(age, job) {
    this.hibat = 'run'
    console.log(this.name) // undefined
    console.log(age) // 12
    console.log(job) // softWare
  }

  person.prototype.friend = 'Gruy';

  var perons1 = person.bind(personName, 12, 'softWare')
  var bindPerons1 = new perons1()
  console.log(bindPerons1.hibat) // run
  console.log(bindPerons1.friend) // Gruy
  
  ```
  我们在全局和personName都申明了name, 而 this.name 的值确是 undefined，说明this已经丢失，指向了bindPerons1实例。

  来看这个效果的实现：
  ```js

  var name = 'Nani'
  var personName = {
        name: 'Nani'
  }
  function person(age, job) {
    this.hibat = 'run'
    console.log(this.name) // undefined
    console.log(age) // 12
    console.log(job) // softWare
  }

  Function.prototype.bind2 = function(context) {
    var self = this
    var args = Array.pototype.slice.call(arguments, 1)
    var callBackfn = function() {
    var innerArgs = Array.pototype.slice.call(arguments)
    // 如果是构造函数, this指向实例,此时结果为 true。将绑定函数的 this 指向该实例, 可以让实例获得来自绑定函数的值
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
      self.apply(this instanceof callBackfn ? this : context, args.concat(innerArgs))
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    // callBackfn.prototype = this.prototype;
    // 构造函数效果的优化实现, 在这个写法中，我们直接将 callBackfn.prototype = this.prototype
    // 会导致我们修改 callBackfn.prototype 的时候，也会修改绑定函数的 prototype
    var transitFn = function(){}
    transitFn.prototype = this.prototype;
    callBackfn.prototype = new transitFn()
    return callBackfn;
  }

  person.prototype.friend = 'Gruy';
  var perons1 = person.bind2(personName, 12, 'softWare')
  var bindPerons1 = new perons1()
  console.log(bindPerons1.hibat) // run
  console.log(bindPerons1.friend) // Gruy
  ```
  **一个小问题**
  
  1.调用 bind 的不是函数咋办？
  ```js
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
  ```
  **最终代码**
  ```js

  Function.prototype.bind2 = function(context) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var args = Array.pototype.slice.call(arguments, 1)
    var self = this;
    var callBackfn = function() {
      var innerArgs = Array.pototype.slice.call(arguments, 1)
      self.apply(this instanceof callBackfn ? this : context, args.concat(innerArgs))
    }
    var transitFn = function(){};
    transitFn.prototype = this.prototype;
    callBackfn.prototype = new transitFn();
    return callBackfn;
  }

  ```
  ### new的模拟实现
  看下new的具体功能，举个例子
  
  ```js
  function Otaku (name, age) {
      this.name = name;
      this.age = age;
      this.habit = 'Games';
  }
  Otaku.prototype.strength = 60;
  Otaku.prototype.sayYourName = function () {
      console.log('I am ' + this.name);
  }
  var person = new Otaku('Kevin', '18');
  console.log(person.name) // Kevin
  console.log(person.habit) // Games
  console.log(person.strength) // 60
  person.sayYourName(); // I am Kevin
  ```
  从上面的例子上，我们可以发现person能：

  1.访问到构造函数中的属性
  2.访问到原型中的属性

  分析：new的结果是返回一个新对象，该对象能够访问构造函数中的属性，那我们就想到继承。
  经典继承中使用到了apply。该对象能够访问原型中的属性，而__proto__是能够指向函数的prototype,
  这样就能访问到原型中的属性了。
  由于new是关键字，所以不能像实现bind那样直接覆盖，所以我们用newObj函数来代替new。
  第一版
  ```js
  function newObj() {
    var obj = {};
    Constructor = [].shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    Constructor.apply(obj, arguments)
    return obj;
  }
  ```

  再来看一下构造函数中有返回值的情况
  ```js
  function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
  }
  var person = new Otaku('Kevin', '18');
  console.log(person.name) // Kevin
  console.log(person.habit) // Games
  console.log(person.strength) // undefined
  console.log(person.age) // undefined
  ```
  再举个例子：
  ```js
  function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return 'handsome boy';
  }

    var person = new Otaku('Kevin', '18');

    console.log(person.name) // undefined
    console.log(person.habit) // undefined
    console.log(person.strength) // 60
    console.log(person.age) // 18
  ```
  结果完全颠倒过来，这次尽管有返回值，但是相当于没有返回值进行处理。
  所以我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。
  ```js
    // 终版
    function newObj() {

      var obj = {},

      Constructor = [].shift.call(arguments);

      obj.__proto__ = Constructor.prototype;

      var ret = Constructor.apply(obj, arguments);

      return typeof ret === 'object' ? ret : obj;

  };
```
## 高级技巧
  ### 函数柯里化
  用于创建已经设置好了一个或多个参数的函数。使用一个闭包返回一个函数。在函数被调用时，
  返回的函数需要设置一些传入的参数。请看以下例子。
  ```js
    function add(num1, num2) {
      return num1 + num2;
    }

    function curriedAdd(num2) {
      return add(5, num2)
    }

    alert(add(2, 3)); // 5
    alert(curriedAdd(3)) // 8
  ```
  这段代码定义了两个函数 add() 和 curriedAdd()。后者本质上是在任何情况下第一个参数为5
  的add（）版本。尽管从技术上来说curriedAdd并非柯里化的函数，但它很好的展示了其概念。

  柯里化函数通常由以下步骤动态创建：调用另一个函数并为它传入要柯里化的函数和必要参数。
  ```js
  function curry(fn) {
    // 
    var args = Array.prototype.slice.call(arguments, 1); 
    return function() {
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      return fn.apply(null, finalArgs)
    }
  }
  ```
  curry函数的主要工作就是将被返回的函数参数进行排序。curry()的第一个参数是要进行柯里化
  的函数，其他参数是要传入的值。
  
  ### 深浅拷贝

  首先可以通过 Object.assign 来解决这个问题。
  ```js
  let obj1 = {

  };
  let obj2 = Object.assign({}, obj1)
  obj1.name = 'wzx'
  console.log(obj1.name)
  console.log(obj2.name) // undefined
  ```
  当然我们也可以通过展开运算符（…）来解决
  ```js
  let obj1 = {
    name = 'wzx'
  };
  let obj2 = {
    ...obj1
  }
  obj1.name = 'wzx'
  console.log(obj2.name) // undefined
  ```
  通常情况下浅拷贝能解决大部分问题，但是当我们遇到以下问题时，就需要使用深拷贝了

  ```js
    let person = {
        age: 12,
        jobs: {
            first: 'FE'
        }
    }
    let person2 = {...person}
    person.jobs.first = 'native'
    alert(person2.jobs.first) // 'native'
  ```
  这个问题通常可以通过 JSON.parse(JSON.stringify(object)) 来解决。
  ```js
    let person = {
        age: 12,
        jobs: {
            first: 'FE'
        }
    }
    let person2 = JSON.parse(JSON.stringify(person))
    person.jobs.first = 'native'
    alert(person2.jobs.first) // 'native'
  ```
  但是该方法也是有局限性的：
  1. 会忽略 undefined
  2. 会忽略 symbol
  3. 不能序列化函数
  4. 不能解决循环引用的对象

  为了解决以上问题，再来看一版：
  ```js
  function deepCopy(obj) {
    if (typeof obj !== 'obj') return;
    const newObj = obj instanceof Array ? [] : {}
    for(let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = typeof obj[key] === 'object' ? deepCopy[key] : obj[key]
      }
    }
    return newObj;
  }
  ```
  更加完善的拷贝可以看高级技巧中的从零实现jQuery的extend。
  ### 节流

  节流原理：触发一个事件，每隔一个时段只能触发一次。

  根据首次是否执行以及结束后是否执行。

  #### 使用时间戳

  原理：取出当前的时间戳，减去之前保存的时间戳（初始值0），如果大于设置的时间周期则执行。
  更新保存时间戳为当前时间，如果小于则不执行。

  ```js
    function throttle (func, wait) {
      var context, 
      saveTime = 0;
      return function () {
        var args = arguments;
        var context = this;
        var now = +new Date()
        if ( now - saveTime > wait ) {
          func.apply(context, args)
          saveTime = now;
        }
      }
    }
  ```

  #### 使用定时器
  ```js
  function throttle (func, wait) {
    var context;
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      if (!timeout) {
        setTimeout(function() {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
  }
  ```

  #### 双剑合璧
  ```js
  function throttle (func, wait) {
    var context;
    var timeout;
    var args;
    var previous = 0;
    var later =  function () {
      previous = +new Date();
      timeout = null;
      func.apply(context, args)
    }
    return function() {
      var now = +new Date()
      var remaining = wait - (now - previous);
      context = this;
      args = arguments
      // 剩余的时间或修改了系统时间
      if (remaining <=0 || remaining > wait ) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        previous = now;
        func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
    }
  }
  ```
  #### 优化

  无头有尾，或者有头无尾，这个咋办？
  leading：false 表示禁用第一次执行
  trailing: false 表示禁用停止触发的回调
  ```js
  function throttle (func, wait, options) {
    let context;
    let timeout;
    let args;
    let result;
    let previous = 0;
    if (!options) options = {};

    const later =  function () {
      previous =  !options.leading ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
    }
    return function() {
      const now = new Date().getTime();
      if (!previous && !options.leading) previous = now;
      const remaining = wait - (now - previous);
      context = this;
      args = arguments
      // 剩余的时间或修改了系统时间
      if (remaining <=0 || remaining > wait ) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        previous = now;
        func.apply(context, args);
      } else if (!timeout && options.trailing) {
        timeout = setTimeout(later, remaining);
      }
    }
  }
  ```
  ### 防抖

  防抖原理：尽管触发事件，一定在事件触发n秒后才执行，如果在一个事件触发的n秒内又触发了这个事件，那以新触发的时间点为准，n秒内才执行。

  #### 第一版

  ```js
    function debounce(func, wait) {
      var timeout;
      return function() {
        // 解决：this指向window的问题
        var context = this;
        // 解决：事件对象 event 为undefined的问题
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout( function() {
          func.apply(context, args)
        }, wait);
      }
    }
  ```

  #### 立刻执行

  不希望非要等到事件停止触发后才执行，我希望立刻执行函数,然后等到停止触发 n 秒后，才可以重新触发执行。
  ```js
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var contenxt = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout;
          timeout = setTimeout(function(){
                timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
        } else {
          timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
      }
    }
  ```

  #### 返回值
  函数可能是有返回值的，但是只有immediate是true才返回
  ```js
  // 第五版
  function debounce(func, wait, immediate) {
      var timeout, result;
      return function() {
        var contenxt = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout;
          timeout = setTimeout(function(){
                timeout = null;
          }, wait)
          if (callNow) func.apply(context, args);
          var result = func.apply(context, args);

        } else {
          timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
      }
    }
  ```

  ### 数组去重

  #### indexOf

  例子如下：
  ```js
    var arr = [1, 1, '1'];
    function unique (arr) {
        var array = [];
        for (var i = 0; i < arr.length; i++) {
            if (array.indexOf(arr[i]) === -1) {
                array.push(arr[i])
            }
        }
        return array;
    }
    var uniqueAarry = unique(arr)
    // [1, '1']
    console.log(uniqueAarry);
  ```
  indexOf方法去重优点：兼容性好。

  #### 排序后去重

  ```js
  var array = [1, 1, '1'];

  function unique(array) {
      var res = [];
      var sortedArray = array.concat().sort();
      var seen;
      for (var i = 0, len = sortedArray.length; i < len; i++) {
          // 如果是第一个元素或者相邻的元素不相同
          if (!i || seen !== sortedArray[i]) {
              res.push(sortedArray[i])
          }
          seen = sortedArray[i];
      }
      return res;
  }

  console.log(unique(array));
  ```

  #### unique API

  isSorted :是否已排序
  ```js
  var array1 = [1, 2, '1', 2, 1];
  var array2 = [1, 1, '1', 2, 2];

  // 第一版
  function unique(array, isSorted) {
      var res = [];
      var seen = [];

      for (var i = 0, len = array.length; i < len; i++) {
          var value = array[i];
          if (isSorted) {
              if (!i || seen !== value) {
                  res.push(value)
              }
              seen = value;
          }
          else if (res.indexOf(value) === -1) {
              res.push(value);
          }        
      }
      return res;
  }

  console.log(unique(array1)); // [1, 2, "1"]
  console.log(unique(array2, true)); // [1, "1", 2]
  ```

  #### 优化
  ```js
  var array3 = [1, 1, 'a', 'A', 2, 2];
  // 第二版
  // iteratee 英文释义：迭代 重复
  function unique(array, isSorted, iteratee) {
      var res = [];
      var seen = [];

      for (var i = 0, len = array.length; i < len; i++) {
          var value = array[i];
          var computed = iteratee ? iteratee(value, i, array) : value;
          if (isSorted) {
              if (!i || seen !== computed) {
                  res.push(value)
              }
              seen = computed;
          }
          else if (iteratee) {
              if (seen.indexOf(computed) === -1) {
                  seen.push(computed);
                  res.push(value);
              }
          }
          else if (res.indexOf(value) === -1) {
              res.push(value);
          }    
      }
      return res;
  }

  console.log(unique(array3, false, function(item){
      return typeof item == 'string' ? item.toLowerCase() : item
  })); // [1, "a", 2]
  ```
  #### filter
  比如使用 indexOf 的方法：
  ```js
  var array = [1, 2, 1, 1, '1'];
  function unique(array) {
      var res = array.filter(function(item, index, array){
          return array.indexOf(item) === index;
      })
      return res;
  }

  console.log(unique(array));
  ```
  排序去重的方法：

  ```js
  var array = [1, 2, 1, 1, '1'];

  function unique(array) {
      return array.concat().sort().filter(function(item, index, array){
          return !index || item !== array[index - 1]
      })
  }

  console.log(unique(array));
  ```

  #### Object 键值对

  这种方法的原理：利用空对象，将数组的值存成键值对key的值，比如Objet[value] = true;
  在判断另一个值的时候，如果Objet[value2] 存在的话，就说明值是重复的。实例代码如下：
  ```js
  var array = [1, 2, '1', 1, 2];
  function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array) {
      return  obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
  }
  ```

  #### ES6 set和map 

  set例子如下：
  ```js
  var arr = [1,2,1]

  const unquie = (a) => [...new Set(a)];

  unquie(arr) // [1, 2]
  ```

  Map 例子如下：
  ```js
  function unquie(array) {
    const seen = new Map();
    array.filter((a) => !seen.has(a) && seen.set(a, 1))
  }
  ```

  ### 类型判断

  #### type API
  ```js
  var class2type = {}
  "Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function(item, index) {
    class2type["[object" + item + "]"] = item.toLowerCase()
  })
  function type(obj) {
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ? class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj;
  }
  function isFunction(obj) {
        return type(obj) === "function";
  }

  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;

  function isPlainObject(obj) {
      var proto, Ctor;
      if (!obj || toString.call(obj) !== "[object Object]") {
          return false;
      }
      proto = Object.getPrototypeOf(obj);
      if (!proto) {
          return true;
      }
      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
  }
  ```

  ### 从零实现jQuery的extend

  extend 的用法：
  ```js
  jQuery.extend( target [, object1 ] [, objectN ] )
  ```
  第一个参数 target，表示要拓展的目标。
  后面的参数，都传入对象，内容都会复制到目标对象中，我们就称它们为待复制对象吧。
  举个例子：
  ```js
  var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
  };

  var obj2 = {
      b: { b1: 3, b3: 4 },
      c: 3
  };

  var obj3 = {
      d: 4
  }
  console.log($.extend(obj1, obj2, obj3));
  // {
  //    a: 1,
  //    b: { b1: 3, b3: 4 },
  //    c: 3,
  //    d: 4
  // }
  ```
  当两个对象出现相同字段的时候，后者会覆盖前者，而不会进行深层次的覆盖。

  #### extend 第一版

  ```js
  function extend() {
    var name, options, copy;
    var length = arguments.length;
    var i = 1;
    var target = arguments[0];
    for (;i<length;i++) {
      options = arguments[i];
      if (options !== null) {
        for(name in options) {
          copy = options[name];
          if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
  }
  ```
  #### extend 第二版

  深拷贝

  ```js
    var obj1 = {
      a: 1,
      b: { b1: 1, b2: 2 }
    };
    var obj2 = {
        b: { b1: 3, b3: 4 },
        c: 3
    };

    var obj3 = {
        d: 4
    }
    // 第二版
    function extend() {
      // 默认不进行深拷贝
      var deep = false;
      var name, options, src, copy;
      var length = arguments.length;
      // 记录要复制的对象的下标
      var i = 1;
      // 第一个参数不传布尔值的情况下，target默认是第一个参数
      var target = arguments[0] || {};
      // 如果第一个参数是布尔值，第二个参数是才是target
      if (typeof target == 'boolean') {
          deep = target;
          target = arguments[i] || {};
          i++;
      }
      // 如果target不是对象，我们是无法进行复制的，所以设为{}
      if (typeof target !== 'object') {
          target = {}
      }

      // 循环遍历要复制的对象们
      for (; i < length; i++) {
          // 获取当前对象
          options = arguments[i];
          // 要求不能为空 避免extend(a,,b)这种情况
          if (options != null) {
              for (name in options) {
                  // 目标属性值
                  src = target[name];
                  // 要复制的对象的属性值
                  copy = options[name];
                  // 解决循环引用
                  if (target === copy) {
                      continue;
                  }
                  if (deep && copy && typeof copy == 'object') {
                      // 递归调用
                      target[name] = extend(deep, src, copy);
                  }
                  else if (copy !== undefined){
                      target[name] = copy;
                  }
              }
          }
      }

      return target;
    };

    extend(true,obj1, obj2,obj3)
    console.log(obj1)
  ```
  #### extend 最终代码

  需要考虑的问题：类型不一致、target 是函数、循环引用
  ```js
    var obj1 = {
      a: 1,
      b: { b1: 1, b2: 2 }
    };
    var obj2 = {
        b: { b1: 3, b3: 4 },
        c: 3
    };

    var obj3 = {
        d: 4
    }
    var class2type = {};

    // 生成class2type映射
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    })

    function type(obj) {
        // 一箭双雕
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[Object.prototype.toString.call(obj)] || "object" :
            typeof obj;
    }

    function isFunction(obj) {
        return type(obj) === "function";
    }

    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;

    function isPlainObject(obj) {
        var proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }
        proto = Object.getPrototypeOf(obj);
        if (!proto) {
            return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
    }
    // 第二版
    function extend() {
      // 默认不进行深拷贝
      var deep = false;
      var name, options, src, copy, clone, copyIsArray;
      var length = arguments.length;
      // 记录要复制的对象的下标
      var i = 1;
      // 第一个参数不传布尔值的情况下，target默认是第一个参数
      var target = arguments[0] || {};
      // 如果第一个参数是布尔值，第二个参数是才是target
      if (typeof target == 'boolean') {
          deep = target;
          target = arguments[i] || {};
          i++;
      }
      // 如果target不是对象，我们是无法进行复制的，所以设为{}
      if (typeof target !== "object" && !isFunction(target)) {
          target = {};
      }

      // 循环遍历要复制的对象们
      for (; i < length; i++) {
          // 获取当前对象
          options = arguments[i];
          // 要求不能为空 避免extend(a,,b)这种情况
          if (options != null) {
              for (name in options) {
                  // 目标属性值
                  src = target[name];
                  // 要复制的对象的属性值
                  copy = options[name];
                  // 解决循环引用
                  if (target === copy) {
                      continue;
                  }
                  if (deep && copy && (isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy))))  {
                      if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(copy) ? src : [];
                      } else {
                         clone = src && isPlainObject(copy) ? src : {};
                      }
                      // 递归调用
                      target[name] = extend(deep, clone, copy);
                  }
                  else if (copy !== undefined){
                      target[name] = copy;
                  }
              }
          }
      }

      return target;
    };

    extend(true,obj1, obj2,obj3)
    console.log(obj1)
  ```
  ### 数组的最大值和最小值

  #### 原始方法
  ```js
    var arr = [6, 4, 1, 8, 2, 11, 23];
    var result = arr[0];
    for (var i = 1; i < arr.length; i++) {
        result =  Math.max(result, arr[i]);
    }
    console.log(result);
  ```
  #### reduce
  ```js
  var arr = [6, 4, 1, 8, 2, 11, 23];

  function max(prev, next) {
      return Math.max(prev, next);
  }
  console.log(arr.reduce(max));
  ```
  #### 排序
  ```js
  var arr = [6, 4, 1, 8, 2, 11, 23];

  arr.sort(function(a,b){return a - b;});
  console.log(arr[arr.length - 1])
  ```
  #### eval

  ```js
  var arr = [6, 4, 1, 8, 2, 11, 23];
  var max = eval("Math.max(" + arr + ")");
  console.log(max)

  ```
  #### apply

  ```js
    var arr = [6, 4, 1, 8, 2, 11, 23];
    console.log(Math.max.apply(null, arr))
  ```

  #### ES6 ...

  ```js
    var arr = [6, 4, 1, 8, 2, 11, 23];
    console.log(Math.max(...arr))
  ```

  ### 数组扁平化
  数组扁平化就是将一组嵌套的数组转成一层的数组
  #### 递归

  ```js
  var array = [1, [2, [3, 4]]];
  function flatten(arr) {
      var result = []
      for (var i = 0; i < arr.length;i++) {
          if (Array.isArray(arr[i])) {
              result = result.concat(flatten(arr[i]))
          }
          else{
              result.push(arr[i])
          }
      }
      
      return result
  }
  console.log(flatten(array))
  ```

  #### toString
  如果数组全是数字，可以考虑使用toString;
  ```js
  var array = [1, [2, [3, 4]]];
  function flatten(arr) {
      return arr.toString().split(',').map(function(item){
          return +item
      })
  }
  console.log(flatten(array))
  ```

  #### reduce
  ```js
    // 方法3
  var arr = [1, [2, [3, 4]]];

  function flatten(arr) {
      return arr.reduce(function(prev, next){
          return prev.concat(Array.isArray(next) ? flatten(next) : next)
      }, [])
  }

  console.log(flatten(arr))
  ```

  #### es6 ...
  ```js
    var arr = [1, [2, [3, 4]]];
    function flatten(arr) {
        while(arr.some(item => Array.isArray(item))){
          arr = [].concat([...arr])
        }
    }
    console.log(flatten(arr))
  ```

  #### undercore
  ```js
  /**
  * 数组扁平化
  * @param  {Array} input   要处理的数组
  * @param  {boolean} shallow 是否只扁平一层
  * @param  {boolean} strict  是否严格处理元素，下面有解释
  * @param  {Array} output  这是为了方便递归而传递的参数
  * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
  */
  function flatten(input, shallow, strict, output) {

      // 递归使用的时候会用到output
      output = output || [];
      var idx = output.length;

      for (var i = 0, len = input.length; i < len; i++) {

          var value = input[i];
          // 如果是数组，就进行处理
          if (Array.isArray(value)) {
              // 如果是只扁平一层，遍历该数组，依此填入 output
              if (shallow) {
                  var j = 0, length = value.length;
                  while (j < length) output[idx++] = value[j++];
              }
              // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
              else {
                  flatten(value, shallow, strict, output);
                  idx = output.length;
              }
          }
          // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
          else if (!strict){
              output[idx++] = value;
          }
      }

      return output;

  }
  ```

  ### 查找数组指定元素

  #### findIndex
  用法：
  ```js
  var array = [2, 3, 4, 5];
  var maxIndex = array.findIndex((item) => item > 4) 
  console.log(maxIndex) // 3
  ```
  实现：遍历并返回下标
  ```js
  var array = [2, 3, 4, 5];
  function findIndex(array, fn, context) {
    for (var i = 0; i < array.length; i++) {
      if (fn.call(context, array[i], i)) return i;
    };
    return -1;
  }
  var maxIndex = findIndex(array, (item, i) => item > 4) 
  console.log(maxIndex) // 3
  ```

  #### findLastIndex
  实现：遍历并返回下标
  ```js
  var array = [2, 3, 4, 5];
  function findLastIndex(array, fn, context) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (fn.call(context, array[i], i)) return i;
    };
    return -1;
  }
  var maxIndex = findLastIndex(array, (item, i) => item > 4) 
  console.log(maxIndex) // 3
  ```

  #### createIndexFinder
  findIndex 和 findLastIndex 其实有很多重复的部分,需要精简，

  模仿 underscore 的思路就是利用传参的不同，返回不同的函数。

  ```js
  var newArray = [1,2,3,4]
  function createFinder(dir) {
      return function(array, fn, context) {
          var length = array.length;
          var index = dir > 0 ? 0 : length - 1;
          for (; index >=0 && index < length; index+= dir) {
              if(fn.call(context, array[index], index, array)) return index;
          }
          return -1;
      }
  }
  console.log(createFinder(-1)(newArray, function(item, i, newArray){
      if (item === 3) return true
  }))
  ```

  #### sortedIndex
  用法：在一个排好序的数组中找到 value 对应的位置，保证插入数组后，依然保持有序的状态。
  实现：可以使用二分查找法
  ```js
  var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];
  function cb(func, context) {
      if (context === void 0) return func;
      return function() {
          return func.apply(context, arguments);
      };
  }

  function sortedIndex(array, obj, iteratee, context) {

      iteratee = cb(iteratee, context)

      var low = 0, high = array.length;
      while (low < high) {
          var mid = Math.floor((low + high) / 2);
          if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
          else high = mid;
      }
      return high;
  };

  var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
      return stooge.age;
  });
  ```

  #### indexOf
  实现：
  ```js
  var newArray = [1,2,3,4]
  function createIndexOfFinder(dir) {
      return function(array, item, idx) {
          var length = array.length;
          var index = 0;
          if (typeof idx == "number") { 
              if (dir > 0) {
                index = idx >= 0 ? idx : Math.max(length + idx, 0);
              } else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
              }
          }
          for (idx = dir > 0 ? index : length - 1; idx >= 0 && idx < length; idx += dir) {
              if(array[idx] === item) return idx;
          }
          return -1;
      }
  }
  console.log(createIndexOfFinder(1)(newArray, 2))
  console.log(createIndexOfFinder(-1)(newArray, 2))
  ```

  ### 偏函数

  偏函数定义：在计算机科学中，局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。
  什么是元？元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。

  举个例子：
  ```js
    function add(a, b) {
      return a + b;
    }

    // 执行 add 函数，一次传入两个参数即可
    add(1, 2) // 3

    // 假设有一个 partial 函数可以做到局部应用
    var addOne = partial(add, 1);

    addOne(2) // 3
  ```
  第一版
  ```js
    function partial(fn) {
        var args = [].slice.call(arguments, 1);
        return function() {
            var newArgs = args.concat([].slice.call(arguments));
            return fn.apply(this, newArgs);
        };
    };
    function add(a, b) {
      return a + b;
    }
    add(1, 2) // 3

    // 假设有一个 partial 函数可以做到局部应用
    var addOne = partial(add, 1);

    addOne(2) // 3
  ```
  第二版
  然而正如 curry 函数可以使用占位符一样，我们希望 partial 函数也可以实现这个功能，我们再来写第二版：
  ```js
    var _ = {};
    function partial(fn) {
      var args = [].slice.call(arguments, 1);
      return function() {
          var position = 0, len = args.length;
          for(var i = 0; i < len; i++) {
              args[i] = args[i] === _ ? arguments[position++] : args[i]
          }
          while(position < arguments.length) args.push(arguments[position++]);
          return fn.apply(this, args);
      };
    };
    var subtract = function(a, b) { return b - a; };
    subFrom20 = partial(subtract, _, 20);
    subFrom20(5);
  ```

  ### 惰性函数

  #### 需求
  我们现在需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。
  #### 解决一：普通方法
  ```js
  var t;
  function foo() {
    if(t) return t;
    t = new Date();
    return t;
  }
  ```
  问题有两个，一是污染了全局变量，二是每次调用 foo 的时候都需要进行一次判断。

  #### 解决二：闭包
  ```js
    var foo = (function() {
      var t;
      return function() {
          if (t) return t;
          t = new Date();
          return t;
      }
    })();
  ```
  然而还是没有解决调用时都必须进行一次判断的问题。

  #### 解决三：函数对象
  函数也是一种对象，利用这个特性，我们也可以解决这个问题。
  ```js
  function foo() {
      if (foo.t) return foo.t;
      foo.t = new Date();
      return foo.t;
  }
  ```
  依旧没有解决调用时都必须进行一次判断的问题。
  #### 解决四：惰性函数
  不错，惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数。
  ```js
  var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
  }
  ```
  #### 更多应用

  DOM 事件添加中，为了兼容现代浏览器和 IE 浏览器，我们需要对浏览器环境进行一次判断：

  ```js
  function addEvent (type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if(window.attachEvent){
        el.attachEvent('on' + type, fn);
    }
  }
  ```
  问题在于我们每当使用一次 addEvent 时都会进行一次判断。

  利用惰性函数，我们可以这样做：

  ```js
  function addEvent (type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
  }
  addEvent()
  ```

  当然我们也可以使用闭包的形式：
  ```js
    var addEvent = (function(){
      if (window.addEventListener) {
          return function (type, el, fn) {
              el.addEventListener(type, fn, false);
          }
      }
      else if(window.attachEvent){
          return function (type, el, fn) {
              el.attachEvent('on' + type, fn);
          }
      }
  })();
  ```
  当我们每次都需要进行条件判断，其实只需要判断一次，接下来的使用方式都不会发生改变的时候，想想是否可以考虑使用惰性函数。

  ### 函数组合

  需求：
  
  我们需要写一个函数，输入 'kevin'，返回 'HELLO, KEVIN'。

  尝试：
  ```js
  function toUpperCase(x) {
      return x.toUpperCase()
  }

  function hello(x) {
      return 'hello,' + x;
  }
  function greet(x) {
      return hello(toUpperCase(x));
  }
  console.log(greet('kevin'))
  ```

  #### compose:
  underscore 的 compose 函数的实现：

  ```js
  function compose() {
      var args = arguments;
      var start = args.length - 1;
      return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
      }
  }
  ```
  该函数的作用是什么?

  先看下 pointfree

  #### pointfree
  pointfree是指的是函数无须提及将要操作的数据是什么样的
  ```js
  // 需求：输入 'kevin'，返回 'HELLO, KEVIN'。

  // 非 pointfree，因为提到了数据：name
  var greet = function(name) {
      return ('hello ' + name).toUpperCase();
  }

  // pointfree
  // 先定义基本运算，这些可以封装起来复用
  var toUpperCase = function(x) { return x.toUpperCase(); };
  var hello = function(x) { return 'HELLO, ' + x; };

  var greet = compose(hello, toUpperCase);
  greet('kevin');
  ```
  我们再举个稍微复杂一点的例子，为了方便书写, 之前写到的 curry 函数：
  ```js
  // 需求：输入 'kevin daisy kelly'，返回 'K.D.K'

  // 非 pointfree，因为提到了数据：name
  var initials = function (name) {
      return name.split(' ').map(compose(toUpperCase, head)).join('. ');
  };

  // pointfree
  // 先定义基本运算
  var split = curry(function(separator, str) { return str.split(separator) })
  var head = function(str) { return str.slice(0, 1) }
  var toUpperCase = function(str) { return str.toUpperCase() }
  var join = curry(function(separator, arr) { return arr.join(separator) })
  var map = curry(function(fn, arr) { return arr.map(fn) })

  var initials = compose(join('.'), map(compose(toUpperCase, head)), split(' '));

  initials("kevin daisy kelly");
  ```
  从这个例子中我们可以看到，利用柯里化（curry）和函数组合 (compose) 非常有助于实现 pointfree。

  也许你会想，这种写法好麻烦呐，我们还需要定义那么多的基础函数……可是如果有工具库已经帮你写好了呢？比如 ramda.js：
  ```js
   var initials = R.compose(R.join('.'), R.map(R.compose(R.toUpper, R.head)), R.split(' '));
  ```

  ### 函数记忆

  函数记忆是指将上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。

  举个例子：
  ```js
  function add(a, b) {
    return a + b;
  }
  // 假设 memoize 可以实现函数记忆
  var memoizedAdd = memoize(add);
  memoizedAdd(1, 2) // 3
  memoizedAdd(1, 2) // 相同的参数，第二次调用时，从缓存中取出数据，而非重新计算一次
  ```

  原理: 把参数和对应的结果数据存到一个对象中，调用时，判断参数对应的数据是否存在，存在就返回对应的结果数据。

  #### 第一版

  ```js
  function memoize(f) {
    var cache = {};
    return function(){
      var key = arguments.length + Array.prototype.join.call(arguments, ",");
      if (key in cache) {
            return cache[key]
      } else {
        return cache[key] = f.apply(this, arguments)
      }
    }
  }
  ```

  测试：

  ```js
  var add = function(a, b, c) {
    return a + b + c
  }

  var memoizedAdd = memoize(add)

  console.time('use memoize')
  for(var i = 0; i < 100000; i++) {
      memoizedAdd(1, 2, 3)
  }
  console.timeEnd('use memoize')

  console.time('not use memoize')
  for(var i = 0; i < 100000; i++) {
      add(1, 2, 3)
  }
  console.timeEnd('not use memoize')

  ```
  在 Chrome 中，使用 memoize 大约耗时 60ms，如果我们不使用函数记忆，大约耗时 1.3 ms 左右。
  #### 注意

  函数记忆只是一种编程技巧，本质上是牺牲算法的空间复杂度以换取更优的时间复杂度，
  在客户端 JavaScript 中代码的执行时间复杂度往往成为瓶颈，
  因此在大多数场景下，这种牺牲空间换取时间的做法以提升程序执行效率的做法是非常可取的。

  #### 第二版
  因为第一版使用了 join 方法，我们很容易想到当参数是对象的时候，就会自动调用 toString 方法转换成 [Object object]再拼接字符串作为 key 值
  我们写个 demo 验证一下这个问题：
  ```js
  var propValue = function(obj){
      return obj.value
  }
  var memoizedAdd = memoize(propValue)

  console.log(memoizedAdd({value: 1})) // 1
  console.log(memoizedAdd({value: 2})) // 1
  ```
  两者都返回了 1，显然是有问题的，所以我们看看 underscore 的 memoize 函数是如何实现的：
  ```js
  // 第二版 (来自 underscore 的实现)
  var memoize = function(func, hasher) {
      var memoize = function(key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!cache[address]) {
            cache[address] = func.apply(this, arguments);
        }
        return cache[address];
      };
      memoize.cache = {};
      return memoize;
  };
  ```
  从这个实现可以看出，underscore 默认使用 function 的第一个参数作为 key，所以如果直接使用

  ```js
  var add = function(a, b, c) {
    return a + b + c
  }
  var memoizedAdd = memoize(add)

  memoizedAdd(1, 2, 3) // 6
  memoizedAdd(1, 2, 4) // 6
  ```
  肯定是有问题的，如果要支持多参数，我们就需要传入 hasher 函数，自定义存储的 key 值。所以我们考虑使用 JSON.stringify：
  ```js
  var memoizedAdd = memoize(add, function(){
      var args = Array.prototype.slice.call(arguments)
      return JSON.stringify(args)
  })

  console.log(memoizedAdd(1, 2, 3)) // 6
  console.log(memoizedAdd(1, 2, 4)) // 7
  ```
  如果使用 JSON.stringify，参数是对象的问题也可以得到解决，因为存储的是对象序列化后的字符串。

  #### 适用场景
  我们以斐波那契数列为例：

  ```js
    var count = 0;
    var fibonacci = function(n){
        count++;
        return n < 2? n : fibonacci(n-1) + fibonacci(n-2);
    };
    for (var i = 0; i <= 10; i++){
        fibonacci(i)
    }

    console.log(count) // 453
  ```
  我们会发现最后的 count 数为 453，也就是说 fibonacci 函数被调用了 453 次！也许你会想，我只是循环到了 10，为什么就被调用了这么多次，所以我们来具体分析下：
  ```js
  当执行 fib(0) 时，调用 1 次

  当执行 fib(1) 时，调用 1 次

  当执行 fib(2) 时，相当于 fib(1) + fib(0) 加上 fib(2) 本身这一次，共 1 + 1 + 1 = 3 次

  当执行 fib(3) 时，相当于 fib(2) + fib(1) 加上 fib(3) 本身这一次，共 3 + 1 + 1 = 5 次

  当执行 fib(4) 时，相当于 fib(3) + fib(2) 加上 fib(4) 本身这一次，共 5 + 3 + 1 = 9 次

  当执行 fib(5) 时，相当于 fib(4) + fib(3) 加上 fib(5) 本身这一次，共 9 + 5 + 1 = 15 次

  当执行 fib(6) 时，相当于 fib(5) + fib(4) 加上 fib(6) 本身这一次，共 15 + 9 + 1 = 25 次

  当执行 fib(7) 时，相当于 fib(6) + fib(5) 加上 fib(7) 本身这一次，共 25 + 15 + 1 = 41 次

  当执行 fib(8) 时，相当于 fib(7) + fib(6) 加上 fib(8) 本身这一次，共 41 + 25 + 1 = 67 次

  当执行 fib(9) 时，相当于 fib(8) + fib(7) 加上 fib(9) 本身这一次，共 67 + 41 + 1 = 109 次

  当执行 fib(10) 时，相当于 fib(9) + fib(8) 加上 fib(10) 本身这一次，共 109 + 67 + 1 = 177 次
  ```
  所以执行的总次数为：177 + 109 + 67 + 41 + 25 + 15 + 9 + 5 + 3 + 1 + 1 = 453 次！

  如果我们使用函数记忆呢？

  ```js
  var count = 0;
  var fibonacci = function(n) {
      count++;
      return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
  };

  fibonacci = memoize(fibonacci)

  for (var i = 0; i <= 10; i++) {
      fibonacci(i)
  }

  console.log(count) // 12
  ```

  ### 递归

  程序调用自身的编程技巧称为递归(recursion)。

  #### 阶乘
  ```js
  function factorial(n) {
    if (n==1) return n;
     return n * factorial(n - 1)
  }
  console.log(factorial(5)) // 5 * 4 * 3 * 2 * 1 = 120

  ```
  #### 斐波那契数列
  ```js
  function fibonacci(n){
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
  }
  console.log(fibonacci(5)) // 1 1 2 3 5
  ```
  #### 递归条件
  从这两个例子中，我们可以看出：

  构成递归需具备边界条件、递归前进段和递归返回段，当边界条件不满足时，递归前进，当边界条件满足时，递归返回。阶乘中的 n == 1 和 斐波那契数列中的 n < 2 都是边界条件。

  总结一下递归的特点：

  子问题须与原始问题为同样的事，且更为简单；

  不能无限制地调用本身，须有个出口，化简为非递归状况处理。

  了解这些特点可以帮助我们更好的编写递归函数。

  #### 阶乘函数优化
  ```js
  function factorial(n, res) {
      if (n == 1) return res;
      return factorial(n - 1, n * res)
  }

  console.log(factorial(4, 1)) // 24
  ```

  ### 乱序
  乱序的意思就是将数组打乱。
  ```js
  function shuffle(a) {
      for (let i = a.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
  }
  ```

  demo:
  ```js
  var times = 100000;
  var res = {};

  for (var i = 0; i < times; i++) {
      var arr = shuffle([1, 2, 3]);
      var key = JSON.stringify(arr);
      res[key] ? res[key]++ :  res[key] = 1;
  }

  // 为了方便展示，转换成百分比
  for (var key in res) {
      res[key] = res[key] / times * 100 + '%'
  }

  console.log(res)
  ```

  ### 解读 v8 排序源码
  #### 插入排序
  将第一个元素视为有序序列，遍历数组，将之后的元素依次插入这个构建的有序序列中。
  
  实现：
  ```js
  function insertionSort(arr) {
      for (var i = 1; i < arr.length; i++) {
          var element = arr[i];
          for (var j = i - 1; j >= 0; j--) {
              var tmp = arr[j];
              var order = tmp - element;
              if (order > 0) {
                  arr[j + 1] = tmp;
              } else {
                  break;
              }
          }
          arr[j + 1] = element;
      }
      return arr;
  }

  var arr = [6, 5, 4, 3, 2, 1];
  console.log(insertionSort(arr));
  ```
  #### 时间复杂度
  指执行算法所需要的计算工作量,它考察当输入值大小趋近无穷时的情况,一般情况下，算法中基本操作重复执行的次数是问题规模 n 的某个函数。

  最好情况：数组升序排列，时间复杂度为：O(n)

  最坏情况：数组降序排列，时间复杂度为：O(n²)

  #### 稳定性
  稳定性，是指相同的元素在排序后是否还保持相对的位置。

  要注意的是对于不稳定的排序算法，只要举出一个实例，即可说明它的不稳定性；而对于稳定的排序算法，必须对算法进行分析从而得到稳定的特性。

  比如 [3, 3, 1]，排序后，还是 [3, 3, 1]，但是其实是第二个 3 在 第一个 3 前，那这就是不稳定的排序算法。

  插入排序是稳定的算法。

  #### 优势
  当数组是快要排序好的状态或者问题规模比较小的时候，插入排序效率更高。这也是为什么 v8 会在数组长度小于等于 10 的时候采用插入排序。

  #### 快速排序
  原理: 
  1. 选择一个元素作为"基准"
  2. 小于"基准"的元素，都移到"基准"的左边；大于"基准"的元素，都移到"基准"的右边。
  3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

  示例：
  
  实现：
  ```js
  var quickSort = function(arr) {
  　　if (arr.length <= 1) { return arr; }
      // 取数组的中间元素作为基准
  　　var pivotIndex = Math.floor(arr.length / 2);
  　　var pivot = arr.splice(pivotIndex, 1)[0];

  　　var left = [];
  　　var right = [];

  　　for (var i = 0; i < arr.length; i++){
  　　　　if (arr[i] < pivot) {
  　　　　　　left.push(arr[i]);
  　　　　} else {
  　　　　　　right.push(arr[i]);
  　　　　}
  　　}
  　　return quickSort(left).concat([pivot], quickSort(right));
  };
  ```
  然而这种实现方式需要额外的空间用来储存左右子集，所以还有一种原地(in-place)排序的实现方式。

  #### in-place 实现
  ```js
  function quickSort(arr) {
      // 交换元素
      function swap(arr, a, b) {
          var temp = arr[a];
          arr[a] = arr[b];
          arr[b] = temp;
      }

      function partition(arr, left, right) {
          var pivot = arr[left];
          var storeIndex = left;

          for (var i = left + 1; i <= right; i++) {
              if (arr[i] < pivot) {
                  swap(arr, ++storeIndex, i);
              }
          }

          swap(arr, left, storeIndex);

          return storeIndex;
      }

      function sort(arr, left, right) {
          if (left < right) {
              var storeIndex = partition(arr, left, right);
              sort(arr, left, storeIndex - 1);
              sort(arr, storeIndex + 1, right);
          }
      }

      sort(arr, 0, arr.length - 1);

      return arr;
  }

  console.log(quickSort(6, 7, 3, 4, 1, 5, 9, 2, 8))
  ```

  ### 如何写自己的工具库
  ```js
  (function() {

      var root = (typeof self == 'object' && self.self == self && self) ||
          (typeof global == 'object' && global.global == global && global) ||
          this || {};

      var ArrayProto = Array.prototype;

      var push = ArrayProto.push;

      var _ = function(obj) {
          if (obj instanceof _) return obj;
          if (!(this instanceof _)) return new _(obj);
          this._wrapped = obj;
      };

      if (typeof exports != 'undefined' && !exports.nodeType) {
          if (typeof module != 'undefined' && !module.nodeType && module.exports) {
              exports = module.exports = _;
          }
          exports._ = _;
      } else {
          root._ = _;
      }

      _.VERSION = '0.1';

      var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

      var isArrayLike = function(collection) {
          var length = collection.length;
          return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
      };

      _.each = function(obj, callback) {
          var length, i = 0;

          if (isArrayLike(obj)) {
              length = obj.length;
              for (; i < length; i++) {
                  if (callback.call(obj[i], obj[i], i) === false) {
                      break;
                  }
              }
          } else {
              for (i in obj) {
                  if (callback.call(obj[i], obj[i], i) === false) {
                      break;
                  }
              }
          }

          return obj;
      }

      _.isFunction = function(obj) {
          return typeof obj == 'function' || false;
      };

      _.functions = function(obj) {
          var names = [];
          for (var key in obj) {
              if (_.isFunction(obj[key])) names.push(key);
          }
          return names.sort();
      };

      /**
      * 在 _.mixin(_) 前添加自己定义的方法
      */
      _.reverse = function(string){
          return string.split('').reverse().join('');
      }

      _.mixin = function(obj) {
          _.each(_.functions(obj), function(name) {
              var func = _[name] = obj[name];
              _.prototype[name] = function() {
                  var args = [this._wrapped];

                  push.apply(args, arguments);

                  return func.apply(_, args);
              };
          });
          return _;
      };

      _.mixin(_);

      })()
      _('hello').reverse()
  ```

  ## ES6

  ### let 和 const

  #### 特性

  1. 不会被提升
  ```js
  if (false) {
      let value = 1
  }
  console.log(value) // ReferenceError: value is not defined
  ```
  2. 重复声明报错
  ```js
  var value = 1;
  let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared
  ```
  3. 不绑定全局作用域
  
  在全局作用域使用var的时候，会创建一个新的全局变量作为全局对象的变量。

  ```js
  var value = 1;
  console.log(window.value)
  ```
  然而`let` 和`const`不会
  ```js
  let value = 1;
  const value2 = 2
  console.log(window.value); // undefined
  console.log(window.value2); // undefined
  ```

  #### const 与 let的区别

  const用于声明常量，一旦绑定就不允许修改，否则报错。

  虽然const 不允许修改绑定，但是允许修改对象的值.

  ```js
  const obj = {
    value: 1
  }
  obj.value = 2;
  console.log(obj.value) // 2
  obj = {} // TypeError: invalid assignment to const `obj'
  ```

  #### 暂时性死区

  暂时性死区（Temporal Dead Zone），简写为 TDZ。

  let和const声明不会被提升到作用域顶部，如果在声明之前使用变量，则会报错.

  ```js
  console.log(value); // Uncaught ReferenceError: Cannot access 'value' before initialization
  let value = 1;
  ```

  ### 箭头函数
  
  #### 基本语法

  ```js
  let func = value => value;
  ```
  相当于
  ```js
  let func = function (value) {
    return value;
  };
  ```
  如果需要给函数传入多个参数：

  ```js
  let func = (a, b) => a * b;
  ```
  如果函数的代码块需要多条语句：
  ```js
  let func = (a, b) => { 
    return a * b 
  };
  ```
  如果需要直接返回一个对象：
  ```js
    let func = (a, b) => ({total: a * b });
  ```
  与变量解构结合：

  ```js
  let func = ({value, num}) => ({total: value * num})

  ```

  #### 比较
  箭头函数与普通函数对比
  #### 没有this
  箭头函数没有this, 所以需要通过查找作用域链来确定this的值.
  举个例子: 做一个变色的按钮。
  ```js
  html: <button id="button">点击变色</button>
  js:
  function button(id) {
    this.element = querySelector('#' + id);
    this.bindEvent();
  }
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.element.style.backgroundColor = '#1abc9c'
    }, false);
  }
  ```
  这样的写法看似没问题，但点击按钮时会报错。 // this.element is undefined
  原因是：当addEventListener给一个元素注册事件的时候，事件中的this指向了该元素。
  所以可能会想直接就这样
  ```js
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.style.backgroundColor = '#1abc9c'
    }, false);
  }
  ```
  但是实际开发中，可能还需要
  ```js
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.style.backgroundColor = '#1abc9c';
      this.setElementColor()
    }, false);
  }
  ```
  此时，需要做的是把this指向实例，这样就可以调用其他的函数了。
  利用 ES5，一般会这样做：
  ```js
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.style.backgroundColor = '#1abc9c';
      this.setElementColor()
    }.bind(this), false);
  }
  ```
  利用 es6就更方便了，由于箭头函数没有this，所以会查询到外层函数this,
  即例子中的bindEvent的this，所以可以写成这样
  ```js
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.style.backgroundColor = '#1abc9c';
      this.setElementColor()
    }.bind(this), false);
  }
  ```

  #### 没有 arguments
  箭头函数没有自己的 arguments 对象，这不一定是件坏事，因为箭头函数可以访问外围函数的 arguments 对象：
  ```js
  function constant() {
      return () => arguments[0]
  }

  var result = constant(1);
  console.log(result()); // 1
  ```
  那如果我们就是要访问箭头函数的参数呢？

  你可以通过命名参数或者 rest 参数的形式访问参数:
  ```js
  let nums = (...nums) => nums;
  ```

  ### Promise
  #### promise起源

  回调：
  ```js
  doA( function(){
      doB();

      doC( function(){
          doD();
      } )

      doE();
  } );

  doF();
  ```
  当然这是一种简化的形式，经过一番简单的思考，我们可以判断出执行的顺序为：
  ```js
  doA()
  doF()
  doB()
  doC()
  doE()
  doD()
  ```
  实际的项目中，代码会更加杂乱。为了排查问题需要绕过很多碍眼的内容，排查问题的难度成倍增加。
  这还不是最糟糕的，实际上在代码中还有各种各样的逻辑判断，比如在上面例子中，doD() 必须在 doC() 完成后才能完成。
  如果doC() 执行失败并不可能重试 doC()或者直接转到其他错误处理函数中。
  当我们将这些判断都加入到这个流程中，代码就会变得非常复杂。

  回调地狱

  回调地狱的示例：
  ```js
  var fs = require('fs');
  var path = require('path');

  function findLargest(dir, cb) {
      // 读取目录下的所有文件
      fs.readdir(dir, function(er, files) {
          if (er) return cb(er);

          var counter = files.length;
          var errored = false;
          var stats = [];

          files.forEach(function(file, index) {
              // 读取文件信息
              fs.stat(path.join(dir, file), function(er, stat) {

                  if (errored) return;

                  if (er) {
                      errored = true;
                      return cb(er);
                  }

                  stats[index] = stat;

                  // 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作
                  if (--counter == 0) {

                      var largest = stats
                          .filter(function(stat) { return stat.isFile() })
                          .reduce(function(prev, next) {
                              if (prev.size > next.size) return prev
                              return next
                          })

                      cb(null, files[stats.indexOf(largest)])
                  }
              })
          })
      })
  }
  ```

  回调地狱的其他问题：

  1. 难以复用

  回调的顺序确定下来之后，某些环节很困难进行复用。

  2. 堆栈信息被断开

  JavaScript引擎维护了一个执行上下文栈。当函数执行的时候，会创建该函数的执行上下文压入栈中；执行完毕后，会将该执行上下文出栈。

  如果在A函数中调用了B函数，会先将A函数的执行上下文压入栈中，再将B函数的执行上下文压入栈中。
  当B函数执行完毕，将B函数执行上下文出栈；当A函数执行完毕后，将 A 函数执行上下文出栈。
  如果中断代码执行，还可以检索完整的堆栈信息从中获取的信息。

  可是异步回调函数并非如此，比如执行fs.readdir时会将回调函数加入任务队列中后继续执行。
  直至主线程完成后，从任务队列中选择已经完成的任务加入栈中。
  此时栈中只有这一个执行上下文，如果回调报错也无法获取调用该异步操作时的栈中信息。
  此外，由于异步的缘故使用try catch语句也无法直接捕获错误。Promise也没有解决这个问题。

  3. 借助外层变量

  当多个异步同时进行，由于无法预期完成顺序，必须借助外层作用域的变量。
  比如这里遍历读取文件信息，必须借助外层的 count、errored、stats 等。

  缺点：
  
  （1）编写麻烦；

  （2）如果忽略文件读取错误时，不会记录错误状态就接着读取其他文件，造成无谓的浪费；

  （3）外层的变量，也可能被其它同一作用域的函数访问并且修改，容易造成误操作。

  由于异步回调函数种种不利的原因，Promise便孕育而生，它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。
  #### Promise含义
  Promise是JavaScript中的一种异步解决方案，比传统的回调函数更加合理强大。

  特点：
  
  1. 对象的状态不受外界的影响

  Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
  只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

  2. 一旦状态改变，就不会再变，任何时候都会得到这个结果

  Promise对象状态改变有两种可能：pending（进行中）到fulfilled（已成功）、pending（进行中）到rejected（已失败）。
  只要这两种情况发生，状态就凝固了。如果状态发生改变，你再对Promise对象添加回调函数，会立即得到结果。

  缺点：

  1. 无法取消，Promise一旦新建就立即执行，无法中途取消。

  2. 无法得知Promise内部抛出的错误，无法反映到外部。

  3. 无法得知pedding状态时，进行到哪个阶段。

  #### 基本用法

  创建一个Promise实例的写法。

  ```js
  const promise = new Promise(function(resolve, reject) {
    // ... some code
    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  } )
  ```

  Promise对象接收一个函数作为参数，该函数的参数分别为resolve和reject。

  1. resolve的作用是将Promise的状态从 pedding 过渡到 resolved。在异步操作成功时调用。

  2. resolve的作用是将Promise的状态从 pedding 过渡到 reject。在失败时调用。

  Promise实例生成以后，可以用`then`方法分别指定resolved状态和rejected状态的回调函数。

  ```js
  promise.then(function(value){
    alter(value)
  },function(error){
    alter(error)
  })
  ```

  `then`方法接收两个函数：

  第一个是Promise对象的状态变为resolved时调用。

  第二个是Promise对象的状态变为rejected时调用。（可选）

  接下来看一个promise的例子

  ```js
   function timeout(ms) {
     return new Promise(function(resolve, reject) {
       setTimeout(resolve, ms, 'done');
     })
   }
   timeout(1000).then(function(value) {
     alter(value) // done
   })
  ```
  上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。
  过了指定的时间（ms参数）以后，Promise实例的状态变为resolved，就会触发then方法绑定的回调函数。

  #### Promise.prototype.catch()

  Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

  ```js
  getJSON('/posts.json').then(function(posts) {
    // ...
  }).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
  })
  ```
  上面代码中，getJSON()方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then()方法指定的回调函数；
  如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。
  另外，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获。

  ```js
  const promise = new Promise(function(resolve, reject) {
    resolve('ok');
    throw new Error('test');
  });

  promise
    .then(function(value) { console.log(value) })
    .catch(function(error) { console.log(error) });
  // ok
  ```
  上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

  ```js
  getJSON('/post/1.json').then(function(post) {
    return getJSON(post.commentURL);
  }).then(function(comments) {
    // some code
  }).catch(function(error) {
    // 处理前面三个Promise产生的错误
  });
  ```
  Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。
  也就是说，错误总是会被下一个catch语句捕获。上面代码中，一共有三个 Promise 对象：一个由getJSON()产生，两个由then()产生。
  它们之中任何一个抛出的错误，都会被最后一个catch()捕获。

  #### Promise.prototype.finally() 

  finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

  ```js
  promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
  ```

  #### Promise.all()
  
  Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

  ```js
  const p = Promise.all([p1, p2, p3]);
  ```
  p1、p2、p3都是 Promise 实例

  p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled

  只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected

  #### Promise.race()

  Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

  ```js
  const p = Promise.race([p1, p2, p3]);
  ```
  只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
  那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

  #### Promise.allSettled()
  只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。

  ```js
  const promises = [
    fetch('/api-1'),
    fetch('/api-2'),
    fetch('/api-3'),
  ];

  await Promise.allSettled(promises);
  removeLoadingIndicator();
  ```
  上面代码对服务器发出三个请求，等到三个请求都结束，不管请求成功还是失败，加载的滚动图标就会消失。

  #### Promise.any()
  只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态。
  如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

  #### Promise.resolve()

  有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。

  ```js
  const jsPromise = Promise.resolve($.ajax('/whatever.json'));
  ```

  #### 应用

  加载图片

  ```js
  const preloadImage = function (path) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.onload  = resolve;
      image.onerror = reject;
      image.src = path;
    });
  };
  ```
  Generator 函数与 Promise 的结合
  
  ```js
  function getFoo () {
    return new Promise(function (resolve, reject){
      resolve('foo');
    });
  }

  const g = function* () {
    try {
      const foo = yield getFoo();
      console.log(foo);
    } catch (e) {
      console.log(e);
    }
  };

  function run (generator) {
    const it = generator();

    function go(result) {
      if (result.done) return result.value;

      return result.value.then(function (value) {
        return go(it.next(value));
      }, function (error) {
        return go(it.throw(error));
      });
    }

    go(it.next());
  }

  run(g);
  ```

  #### Promise 模拟实现

  #### 链式调用
  
  根据前面提到的promise概念以及例子，分析 Promise链式调用的实现：

  一、拥有三种状态（1）pendding（2）resolve (3) reject

  二、Promise 是一个对象，new申明。用原型继承的编写。

  三、参数是一个函数，该函数还有两个自带的函数参数resolve，reject。

  1. resolve 是一个微任务，能将状态变成FULFILLED，将value传递给then方法的参数

  2. reject 是一个微任务，能将状态变成REJECTED。

  四、能够通过resolve或reject，将参数传递给then方法。
  ```js
  //定义三种状态
  const PENDING = "pending";
  const FULFILLED = "fulfilled";
  const REJECTED = "rejected";

  function Promise2(fn) {
    this.value = null;
    this.error = null; 
    // 状态
    this.status = PENDING;
    // then的中成功的回调函数
    this.onFulfilled = null;
    // then的中失败的回调函数
    this.onRejected = null;
    const resolve = (value) => {
      if (this.status === PENDING) return;
      setTimeout(() => {
        this.status = FULFILLED;
        this.value = value;
        // 执行then中的回调函数，并传值。
        this.onFulfilled(value)
      })
    }
    const reject = (error) => {
      if (this.status === PENDING) return;
      setTimeout(() => {
        this.status = REJECTED;
        this.error = error;
        // 执行then中的回调函数，并传值。
        this.onRejected(value)
      })
    }
    // 参数是一个函数，该函数两个自带的函数参数resolve，reject。
    fn(resolve, reject)
  }
  Promise2.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === PENDING) {
      // 执行第一轮宏任务，将then中的回调赋值，用与执行微任务 resolve 时调用。
      this.onFulfilled = onFulfilled;
      this.onRejected = onRejected;
    } else if (this.status === FULFILLED) {
      //如果状态是fulfilled，直接执行成功回调，并将成功值传入
      onFulfilled(this.value)
    } else {
      //如果状态是rejected，直接执行失败回调，并将失败原因传入
      onRejected(this.error)
    }
  }
  ```
  目前这一版的 Promise, 存在一些问题的.
  比如下面这样:
  
  ```js
  let promise1 = new Promise2((resolve, reject) => {
    fs.readFile('./001.txt', (err, data) => {
      if(!err){
        resolve(data);
      }else {
        reject(err);
      }
    })
  });

  let x1 = promise1.then(data => {
    console.log("第一次展示", data.toString());    
  });

  let x2 = promise1.then(data => {
    console.log("第二次展示", data.toString());    
  });

  let x3 = promise1.then(data => {
    console.log("第三次展示", data.toString());    
  });
  ```
  只能执行一个回调函数。

  需要将 onFulfilled 和 onRejected 改为数组，调用 resolve 时将其中的方法拿出来一一执行即可。

  ```js
  Promise2.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    } else if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else {
      onRejected(this.error);
    }
    return this;
  }
  ```
  接下来将 resolve 和 reject 方法中执行回调的部分进行修改：

  ```js
  // resolve 中
  this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
  // reject 中
  this.onRejectedCallbacks.forEach((callback) => callback(this.error));
  ```

  依然存在另外一个问题.
  ```js
  let readFilePromise = (filename) => {
    return new Promise2((resolve, reject) => {
      resolve(filename)
    })
  }
  readFilePromise('./001.txt').then(data => {
    console.log(data);
    return readFilePromise('./002.txt');
  }).then(data => {
    console.log(data);
  })
  // 001.txt的内容
  // 001.txt的内容
  ```
  问题出在这里:
  ```js
  Promise2.prototype.then = function(onFulfilled, onRejected) {
    //...
    return this;
  }
  ```
  这么写每次返回的都是第一个 Promise。then 函数当中返回的第二个 Promise 直接被无视了。
  
  接着改版
  ```js
  Promise2.prototype.then = function (onFulfilled, onRejected) {
    let bridgePromise;
    if (this.status === PENDING) {
      return bridgePromise = new Promise2((resolve, reject) => {
        this.onFulfilledCallbacks.push((value) => {
          try {
            // 看到了吗？要拿到 then 中回调返回的结果。
            let x = onFulfilled(value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push((error) => {
          try {
            let x = onRejected(error);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      }.bind(this));
    }
    //...
  }
  ```
  但是这段程度还是存在一些问题:

  1. 首先 then 中的两个参数不传的情况并没有处理，
  
  2. 假如 then 中的回调执行后返回的结果(也就是上面的x)是一个 Promise, 直接给 resolve 了。

  先对参数不传的情况做判断:

  ```js
  // 成功回调不传给它一个默认函数
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
  // 对于失败回调直接抛错
  onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
  ```

  然后对返回Promise的情况进行处理:

  ```js
  function resolvePromise(bridgePromise, x, resolve, reject) {
    //如果x是一个promise
    if (x instanceof Promise2) {
      // 拆解这个 promise ，直到返回值不为 promise 为止
      if (x.status === PENDING) {
        x.then(y => {
          resolvePromise(bridgePromise, y, resolve, reject);
        }, error => {
          reject(error);
        });
      } else {
        x.then(resolve, reject);
      }
    } else {
      // 非 Promise 的话直接 resolve 即可
      resolve(x);
    }
  }
  ```
  然后在 then 的方法实现中作如下修改:

  ```js
  resolve(x)  ->  resolvePromise(bridgePromise, x, resolve, reject);
  ```
  实现一下当 Promise 状态不为 PENDING 时的逻辑。

  成功状态下调用then：

  ```js
  if (this.status === FULFILLED) {
    return bridgePromise = new Promise((resolve, reject) => {
      try {
        // 状态变为成功，会有相应的 self.value
        let x = onFulfilled(this.value);
        // 暂时可以理解为 resolve(x)，后面具体实现中有拆解的过程
        resolvePromise(bridgePromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    })
  }
  ```
  失败状态下调用then：

  ```js
  if (this.status === REJECTED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      try {
        // 状态变为失败，会有相应的 self.error
        let x = onRejected(this.error);
        resolvePromise(bridgePromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }
  ```
  Promise A+中规定成功和失败的回调都是微任务，由于浏览器中 JS 触碰不到底层微任务的分配。
  可以直接拿 setTimeout(属于宏任务的范畴) 来模拟，用 setTimeout将需要执行的任务包裹。
  大家注意一下，其实并不是真正的微任务。

  ```js
  if (self.status === FULFILLED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        //...
      })
  }
  ```
  ```js
    if (self.status === REJECTED) {
      return bridgePromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          //...
        })
    }
  ```
  ```js
    // 001.txt的内容
    // 002.txt的内容
  ```
  可以看到，已经可以顺利地完成链式调用。

  #### 错误捕获及冒泡机制分析

  现在来实现 catch 方法:

  ```js
  Promise2.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
  }
  ```
  catch 是 then 方法的语法糖。

  至此，Promise 三大法宝: 回调函数延迟绑定、回调返回值穿透和错误冒泡。