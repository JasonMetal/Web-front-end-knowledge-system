# 闭包
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