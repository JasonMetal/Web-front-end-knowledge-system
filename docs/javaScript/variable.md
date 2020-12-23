 # 变量
   ## 复制变量值
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
     var person1 = {

     };
     var person2 = person1;
     person1.name = 'wzx';
     alter(person2.name) // wzx wzx   
  ```
  通常在开发中我们不希望出现这样的问题，我们可以使用深浅浅拷贝来解决这个问题。后面会在高级技巧介绍深浅拷贝。

  ## 参数传递
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