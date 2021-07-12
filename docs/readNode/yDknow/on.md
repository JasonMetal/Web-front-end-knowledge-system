# 《你不知道的JavaScript(上)》 读书笔记

# 第一部分 作用域和闭包

## 第一章 作用域是什么

在一个编程语言中存储变量，并且之后可以方便地找到变量的规则被称为作用域。

### 1.1 编译原理

尽管通常将JavaScript归类为“动态” 或 “解释执行”语言，但事实上它是一门编译语言。
但与传统的编译语言不同，它不是提前编译，编译结果也不能在分布式系统中进行移植。
尽管如此，JavaScript引擎进行编译的步骤与传统的编译语言的步骤非常相似，在某些
环节可能比预想的复杂。

传统语言的编译步骤：

1. 分词/词法分析

    这个过程会将字符串分解成对编程语言来说有意义的代码块，这些代码块称为词法单元。
    列如：`var a = 2;` 可以分解成 `var` `a` `=` `2` `;`。空格是否被当作词法单元，
    这取决于，空格对这门语言是否有意义。

2. 解析/语法分析

   这个过程会将词法流转成一个逐级嵌套组成的代表了程序语法结构的树，叫做抽象语法树（AST）。

   var a = 2; 的抽象语法树中可能有一个叫做VariableDeclaration的顶级节点，接下来有一个
   叫做Identifier（它的值为a）的子节点，以及一个叫做AssignmentExpression的子节点。
   AssignmentExpression节点有一个叫作NumericLiteral（它的值是2）的子节点。

3. 代码生成
   将AST转化为可执行代码的过程叫做代码生成。简单来说，就是有某种方法将var a = 2;的AST
   转化成机器指令，用来创建一个叫做a(包括分配内存等)的变量，并将一个值存在a中。

### 1.2 理解作用域

1.2.1

引擎：从头到尾负责整个javaScript的编译及执行过程。

编译器：引擎的好朋友之一，负责语法分析以及代码生产等脏活累活。

作用域：引擎的另一个好朋友，负责收集并维护所有声明的变量组成的系列查询，
并实施一套非常严格的规则，确定当前执行代码对这些变量的访问权限。

当你看到 var a = 2; 这段程序时，可能认为这是一个声明。但是引擎并不这么看。
事实上，引擎认为这里有两个完全不同的声明，一个由编译器在编译时处理，另一个
则由引擎在运行时处理。

编译器当遇到 var a, 询问作用域是否有一个该名称的变量存在于同一个作用域的集合中。
如果是，编译器则忽略该声明，继续编译；否则它会要求作用在当前作用域的集合中
声明一个新的变量，并命名为a。

接下来编译器会为引擎生成运行时所需的代码，这些代码用来处理 a = 2这个赋值操作。
引擎运行时会询问当前的作用域集合中是否存在叫a的变量。如果是，引擎就会使用这个变量；
如果否就会继续查找改变了。

如果引擎最终找到了a这个变量，就会将2赋值给它。否则引擎就会抛出一个错误。

1.2.2 编译器的术语

RHS查询与简单地查找某个变量的值别无二致，而LHS查询则是试图找到变量的容器本身，从而可以对其赋值

1.2.3 引擎和作用域的对话

### 1.3 作用域嵌套

引擎从当前作用域开始查询变量，如果找不到，就向上一级继续查找。当抵达最外层的全局作用域为止。

## 第二章 词法作用域

### 2.1 词法阶段

词法作用域是定义在词法阶段的作用域。换句话说，词法作用域是由你写代码时将变量和块作用域写在哪来决定的，
因此词法分析器处理代码时会保持作用域不变。

## 第四章 提升

### 4.1 

直觉上会认为JavaScript会一行一行执行的。但实际上这并不完全正确，有一种特殊情况会导致这个假设是错误的。

```js
a = 2;

var a;

console.log(a);
```

你认为console.log(...)声明会输出什么呢？很多人都认为会输出undefined;
但是，真正输出的是2。

考虑另一端代码

```js
console.log(a);

var a = 2;
```

鉴于上一次代码，你可能认为这段代码也是输出2。还有人认为，由于变量a在使用前没有
先进行声明，因此会抛出ReferenceError异常。

不幸的是，两种猜测都是错误的。

### 4.2 编译器再度来袭

为了搞明白这个问题，回顾一下关于编译器的内容。
引擎会在解释JavaScript代码之前首先对其进行编译。
编译阶段的一部分工作就是找到所有声明，并用合适的作用域把他们关联起来。

因此，正确的思考思路应该是，**变量和函数在内的所有声明都会在代码执行前被处理**。

当你看到var a = 2 时； 你可能认为这是一个声明。但JavaScript引擎实际上会将其看成，
var a 和 a = 2; **第一个定义声明是在编译阶段进行的。第二个赋值阶段声明会被留在原地等待被执行。**

我们的第一段代码会以如下形式进行处理：
```js
 var a;
 a = 2;
 console.log(a);
```

其中第一部分是编译，第二部分是执行。

类似地，我们的第二段代码会以如下代码形式执行。

```js
var a;
console.log(a);
a = 2;
```
因此，打个比方，这个过程就像**变量或者函数**从它们的代码中出现的**位置被"移动"到了最上面**。
这个过程叫做**提升**;

```js
foo(); // ReferenceError，而是TypeError;
var foo = function bar() {
   // ..
}
```
这段程序的变量标识符foo被提示并且被分配给所有作用域（全局作用域）。
因此foo()不会导致ReferenceError。但是foo此时并没有被赋值（如果是函数声明而不是
函数表达式，那么就会赋值）。foo()由于对undefined值进行函数调用而导致非法操作，
因此抛出TypeError。

同时也要记住，即使是具名的函数表达式，名称标识符在赋值之前也无法在所有作用域中使用。

```js
foo(); // typeError
bar(); // ReferenceError

var foo = function bar() {
   // ..
}
```

### 4.3 函数优先

函数声明和变量声明都会被提升。但是值得注意的一个细节（这个细节出现在多个重复声明的代码中）。
是函数会被先提升然后才是变量。

考虑以下代码：

```js
foo(); // 1

var foo;

foo = function() {
   console.log(2);
}

function foo() {
   console.log(1);
}
```

## 第二章 作用域闭包

### 5.1
闭包是基于词法作用域书写代码时所产生的自然结果，
你甚至不需要为了利用它们而有意识地创建闭包。闭包的创建和使用在你的代码中随处可见。

### 5.2

当函数可以记住并访问所在词法作用域时，就产生闭包了，即使函数是在词法作用域外执行。

```js
function foo() {
   var a = 2;
   function bar() {
      console.log(2); //2
   }

   bar();
}
foo();
```

下面我们看一段代码，清晰地展示了闭包

```js
function foo() {
   var a = 2;
   function bar() {
      console.log(a)
   }
   return bar;
}
var baz = foo();
baz(); // a --朋友，这就是闭包的效果
```
函数bar()的词法作用域能够访问foo()的内部作用域。然后我们将bar()函数本身
当作一个值类型进行传递。在这个例子中，我们将bar所引用的函数对象本身当作返回值。

bar()显然可以被正常执行，但在这个例子中，它在自己定义的词法作用域以外的地方执行。

在foo()执行后，通常foo()的整个内部作用域会被摧毁，因为引擎有垃圾回收器用来释放不再使用的空间。
由于看上去foo()的内容不会再被使用，所以很自然的会考虑将其回收。

而闭包的神奇之处正是可以阻止这件事情发生。事实上内部作用域依然存在，因此没有被回收。谁在使用这个作用域？
原来是bar()本身在使用。

拜bar()所声明的位置所赐，它拥有涵盖foo()内部作用域的闭包，使得改该作用域能够一直存活，以供bar()在之后任何时间使用。

bar()依然持有对该作用域的引用，而这个引用就叫做闭包。

这个函数在定义时的词法作用域以后的地方被调用。闭包使得函数可以继续访问定义时的词法作用域。

当然，无论使用何种方式对函数类型的值进行传递，当函数在别处调用时都可以观察到闭包。

```js
function foo() {
   var a = 2;
   function baz() {
      console.log(a); // 2
   }
   bar(baz);
}

function bar(fn) {
   fn(); // 快看，这里产生闭包了
}
```

把内部函数baz传递给bar, 当调用这个内部函数时（现在叫做fn）,它涵盖了foo()内部作用域的闭包就可以观测到了，因为它能够访问a。

传递函数当然也可以是间接的。

```js
 var fn;

 function foo() {
   var a = 2;

   function baz() {
      console.log(a);
   }
   fn = baz;
 }

 function bar() {
    fn(); // 这是闭包。
 }

 foo();

 bar(); // 2
```
### 5.3 现在我懂了

闭包绝不仅仅是一个玩具。你已经写过的代码中一定到处都是闭包的身影我们现在来搞懂这个事实。

```js
function wait(message) {

   setTimeout(function timer(){
      console.log(message);
   }, 1000)
}

wait("Hello, closure");
```

将一个内部函数（名为timer）传递给setTimeout(...)。timer具有涵盖wait(...)作用域的闭包，因此
还保持有对变量message的引用。

wait(..)执行1000毫秒后，它的作用域并不会消失，timer函数依然保有wait(...)作用域的闭包。

在引擎内部，内置的工具函数setTimeout(..)持有对一个参数的引用，这个函数也许叫fn或者fnc,或者类似其他
名字。引擎会调用这个函数，在例子中就是timer函数，而词法作用域在这个过程中保持完整。

这就是闭包。

本质上无论何时何地，如果将（访问它们各自词法作用域的）函数当作第一级的值类型并到处传递，就会看到闭包在这些函数中的应用。
在定时器、事件监听函器、Ajax请求、跨窗口通信、web Works或者其他异步（或同步）任务中，只要使用了回调函数，实际上就是闭包！

### 5.4 闭包与循环

要说明闭包，for循环是最常见的例子。

```js
   for(var i = 1; i <= 5; i++) {
      setTimeout(() => {
         console.log(i);
      }, i * 1000);
   }
```
正常情况下，我们对这段代码行为的的预期是分别输出数字1 ~ 5， 每秒一次，
每次一个。

但实际上，这段代码的运行时会以每秒一次的频率数次五次6.

这是为什么？

首先解释一下6是从哪里来的。这个循环的终止条件是i不再是<=5。条件首次成立时的值
是6.因此，输出显示的是循环结束时i的最终值。

仔细一想，这好像又不是显而易见的，延迟函数的回调会在执行结束时才执行。事实上，
当定时器运行时即使每个迭代中执行的是setTimeout(..,0),所有的回调函数依然是在
循环结束才会被执行，因此会每次输出一个6出来。

这里引申出一个更深入的问题，代码中到底有什么缺陷导致它的行为同语义所暗示的不一致呢？

缺陷是我们假设循环中的每个迭代在运行时都会给自己“捕获”一个i的副本。但是根据作用域的
工作原理，实际情况是尽管循环中的五个函数是带各个迭代中分别定义的，但是它们都被封闭
在一个共享的全局作用域中，因此实际上只有一个i。

这要说的话，当然所有函数共享一个i的引用。循环结构让我们误以为背后还有更复杂的机制在起
作用，但实际上没有。如果将延迟函数的回调充值定义五次，完全不是使用循环，那么它同这段
代码完全等价。

下面回归正题。缺陷是什么？我们需要更多的闭包作用域，特别是在循环的过程中迭代都需要一个闭包作用域。

第3章介绍过，IIFE会同声明并立即执行一个函数来创建作用域。

我们来试一下：

```js
for(var i=1; i< 5; i++){
   (function(){
      setTimeout(function timer() {
         console.log(i)
      }, i * 1000);
   })()
}
```

这样没用。

如果作用域是空的，那么仅仅将它们进行封闭是不够的。仔细看一下，
我们的IIFE只是一个什么都没有的空作用域。它需要包含一点实质内容才能为我们所用。

它需要有自己的变量，用来在每个迭代中存储i的值。

```js
for(var i=1; i<=5;i++){
   (function(){
      var j = i;
      setTimeout(function timer(){
         console.log(j)
      }, j * 1000);
   })
}
```
改进
```js
for(var i=1; i<=5; i++) {
   (function(j) {
      setTimeout(function timer() {
         console.log(j)
      }, j * 1000);
   })(i)
}
```

重返作用域

我们使用IIFE在每次迭代时都创建一个新的作用域。换句话说，每次迭代我们都需要一个块作用域。

本质上这是将这一个块换成一个可以被关闭的作用域。因此，下面这些看起来很酷的代码
就可以正常运行了：

```js
for(var i=1; i<=5;i++){
   let j = i; // 是的,闭包的块作用域
   setTimeout(function timer(){
      console.log(j)
   }, j * 1000)
}
```

```js
for(let i = 1; i<=5;i++) {
   setTimeout(function timer() {
      console.log(i);
   }, i * 1000);
}
```

### 5.5模块
