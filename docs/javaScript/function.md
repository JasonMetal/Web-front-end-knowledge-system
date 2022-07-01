# 函数
 ## 没有重载
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
  ## 函数声明与函数表达式
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
  ## 函数内部属性
  在函数内部，有两个特殊对象：arguments 和 this.
  ### Arguments 对象
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
  
  ### this
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