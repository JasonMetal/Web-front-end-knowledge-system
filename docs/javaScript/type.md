# 类型
  
  ## 1. 内置类型

  javaScript其中内置类型：

  + 空值 （null）
  + 未定义（undefined）
  + 布尔值（boolean）
  + 字符串（string）
  + 数字（number）
  + 对象（object）
  + 符号（symbol, ES6中新增）

  用typeof运算符来查看值的类型

  ```js
    typeof undefined === "undefined"; // true
    typeof true === "boolean"; // true
    typeof 25 === "number" // true
    typeof "25" === "string" // true
    typeof { age: 42 } === "object" // true
    typeof Symbol() === "symbol" // true
  ```
  除了null，其他值使用typeof查看是都有与之对应的类型字符串。
  
  你可能注意到null类型不在此列。它比较特殊，typeof对它的处理有问题：

  ```js
      typeof null === "object"; // true
  ```

  正确的返回结果应该是“null”，但是这个BUG由来已久，在JavaScript中已经存在了
  将近20年，也许永远也不会修复，因为这牵扯到太多的web系统，“修复”它会产生更多
  的BUG，另许多系统无法正常工作。

  我们需要使用符合条件来验证null值的类型：
  ```js
  var a = null;
  (!a && typeof a === "object"); // true
  ```

  “null”是假值，也是唯一一个用typeof检测会返回“object”的基本类型。

  还有一种情况：

  ```js
  typeof function a() {} === "function" // true
  ```

  这样看来，function(函数)也是JavaScript的一个内置对象，但是查阅资料就会知道，
  它实际上是一个object的一个“子类型”。具体来说，函数是“可调用对象”，它有一个内部
  属性[[call]]，该属性使其可被调用。

  再来看看数组。JavaScript支持数组，那么它是否也是一个特殊类型？

  ```js
  typeof [1, 2, 3] === 'object'; // true
  ```

  数组也是对象。确切的说，它是object的一个“子类型”。
  数组的元素按数字的顺序来进行索引，其length属性是元素的个数。

  ## 2. 值和类型

  JavaScript中的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。

  换个角度来讲，JavaScript做不到“类型强制”，也就是说，语言引擎不要求变量总是持有
  与其初始值同类型的值。一个变量可以现在被赋值为字符串类型值，随后又被赋值为数字类型值。

  42的类型为number，并且无法更改。而“42”的类型为string。数字42可以通过强制类型转换为“42”

  在对变量进行typeof检测时，返回的不是该变量的类型，而是该变量持有的值的类型，因为JavaScript
  中变量没有类型。
  ```js
    var a = 42;
    typeof a // “number”;

    a = true;
    typeof a; // “boolean”

  ```

  typeof 运算符总是返回一个字符串

  ```js
  typeof typeof 42 // "string"
  ```
  typeof 42首先返回字符串"number"，然后typeof "number"返回"string"。

  ### 2.1 undefined 和 undeclared

  变量在未持有值的时候为undefined,此时typeof返回的是“undefined”

  ```js
  var a;

  typeof a; // "undefined"

  var b = 42;
  var c;
  b = c;

  typeof b; // "undefined"
  typeof c // "undefined"
  ```

  大多数开发者倾向于把undefined当作undeclared（未声明），但在JavaScript中两者完全是两回事。

  已在作用域中声明但是未赋值的变量，是undefined。没有在作用域中声明的变量是undeclared。

  例如：
  ```js
  var a;
  a // undefined
  b // ReferenceError b is no defined
  ```
  上例中的，“b is no defined”容易让人误以为是“b is undefined”。其实“undefined”和“is no defined”
  是两码事。此时如果浏览器报错成“b is no found”或者“b is no declared”会更准确。

  更让人误解的是，typeof 处理undeclared变量的方式。例如

  ```js
  var a;
  typeof a; // "undefined"
  typeof b; // "undefined"
  ```

  对于undeclared(或者 no defined)变量，typeof照样会返回“undefined”。请注意虽然b是一个undeclared变量，
  但是typeof b 却没有报错。这是因为typeof有一个特殊的安全防范机制。

  此时typeof 如果能返回undeclared(而非undefined)的话，情况会好很多。

  ### 2.2 typeof undeclared;

  该安全防范机制在浏览器中运行的代码来说还是很有帮助的，因为多个脚本文件会在共享的全局命名空间中加载变量。

  举个简单的例子，在程序中使用全局变量DEBUG作为“调试模式”的开关。在输出调式信息到控制台之前，我们会检查
  DEBUG变量是否已被声明。顶层的全局变量声明`var DEBUG = true`只在debug.js文件中才有，而该文件只在开发和
  测试的时候才会被加载到浏览器中，在生产环境中不予加载。

  问题是如何检查程序中的全局变量DEBUG才不会出现ReferenceError错误。这时typeof的安全措施机制就成为我们的好帮手。

  ```js
  // 这样会抛出错误
  if (DEBUG) {
    console.log('Debugging is starting');
  }

  // 这样是安全的
  if (typeof DEBUG !== 'undefined') {
    console.log('Debugging is starting');
  }
  ```
  这不仅用户定义的变量（如DEBUG）有用，对内建API也有帮助
  ```js
  if (typeof atob === 'undefined') {
    atob = function { 
      /* */
    }
  }
  ```
  还有一种不用通过typeof的安全防范机制的方法。就是检查全局变量是否是全局变量的属性，浏览器中的全局对象是window.
  所以前面的例子也可以用这样实现：

  ```js
  if (window.DEBUG) {
    // ..
  }
  if(!window.atob) {
    // ..
  }
  ```
  如果想让别人在他们的程序或模块中复制粘贴你的代码，就需要你用的变量是否已经在宿主程序中定义过：
  ```js
  function doSomethingCool() {
    var helper = 
    (typeof FeatureXYZ ! === 'undefined') ?
    FeatureXYZ :
    function () { /* default feature */}

    var val = helper();
    // ..
  }
  ```
  其他模块和程序引入 doSomethingCool()时，doSomething会检查FeatureXYZ变量是否已经
  在宿主程序中定义过；如果是，就用现成的，否则就自己定义：
  ```js
  //
  (function() {
    function FeatureXYZ() {
      // 包含doSomethingCool(..)
      function doSomethingCool() {
        var helper = 
        (typeof FeatureXYZ ! === 'undefined') ?
        FeatureXYZ :
        function () { /* default feature */}

        var val = helper();
        // ..
      }
      doSomethingCool()
    }
  })()
  ```

  这里，FeatureXYZ并不是一个全局变量，但我们还是可以用typeof的安全防范机制来做检查，因为这里没有
  全局对象可用。

  还有一些人喜欢使用“依赖注入”（dependency injection）设计模式，就是将依赖通过参数显示地传递到函数中，如：

  ```js
    function doSomethingCool(FeatureXYZ){
      var helper = FeatureXYZ ||
      function () { /* default feature */}
      var val = helper();
    }
  ```

  ## 3. 小结

  JavaScript 有七种内置类型：null、undefined、boolean、number、string、object、symbol,可以使用typeof来查看。

  变量没有类型，但它们持有的值有类型。类型定义了值的行为特征。

  很多开发者将undefined 和 undeclared混为一谈，但在JavaScript中它们是两码事。undefined是值的一种。undeclared是变量
  还未声明。

  遗憾的是，JavaScript也将它们混为一谈，在我们试图访问“undeclared”变量时这样报错：`ReferenceError: a is no defined`，
  并且 typeof 对 `undefined`和`undeclared`变量都返回`“undefined”`。

  然而，通过typeof 的安全防范机制（阻止报错）来检查undeclared变量，有时是不错的办法。