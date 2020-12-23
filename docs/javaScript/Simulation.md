# 原理模拟实现
  ## call的模拟实现
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
  ## apply的模拟实现
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
  ## bind的模拟实现
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
  ## new的模拟实现
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