# 面向对象的程序设计
  
   ## 理解对象
   ### 属性类型
  js对象中有两种属性：**数据属性**和**访问器属性**
  
  1.数据属性包含了**数据值的位置**。在这个位置可以**读取**和**写入值**。数据属性有**4个**描述其行为的**特性**。
  
  **[[Configurable]]**: 表示能否通过**delete删除属性**从而**重新定义**属性，能够**修改**属性的特性，或者能否把属性修改为**访问器属性**。
  
  **[[Enumerable]]**: 表示能否通过**for-in** 循环返回属性。

  **[[Writable]]**: 表示能否**修改**属性的**值**。

  **[[Value]]**: 包含这个属性的**数据值**。

  要修改属性默认的特性，必须使用**Object.definedProperty()**方法。
  这个方法接收三个参数：**属性所在的对象**、**属性的名字**和**一个描述符对象**。
  其中描述符对象的属性必须是：configurable、enumerable、writable、
  和value。设置其中的一个或多个值，可以修改对应的特性值。例如：

  ```js
    var person = {}
    Object.defineProperty(person, 'name', {
      configurable: true,
      enumerable: true,
      writable: false,
      value: 'Nine'
    })
    person.name = 'xiaoming'
    alert(person.name) // Nine
  ```

  2.访问器属性

  [[Configurable]]: 表示能否通过**delete删除**属性从而**重新定义**属性，能够修改属性的**特性**，或者能否把属性修改为**访问器属性**。

  [[Enumerable]]: 表示能否通过for-in 循环返回属性。

  [[Get]]: 在**读取**属性时调用的函数。

  [[Set]]: 在**写入**属性时调用的函数。

  访问器属性不能直接定义，必须使用Object.defineProperty()来定义。请看下面的例子。
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
  Object.defineProperties()用于一次定义多个属性，例如：
  ```js
    var book = {}
    Object.defineProperties(book, {
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
   ## 创建对象
   虽然Object构造函数或对象字面量都可以用来创建单个对象，但这些方法有个明显的缺点：
   使用一个接口创建很多对象，会产生**大量的重复代码**：为解决这个问题，人们开始使用工厂模式。

   ### 工厂模式
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
   ### 构造函数模式
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

   ### 原型模式
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

  ### 组合使用构造函数和原型模式

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

  ### 动态原型模式

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

  ### 稳妥构造函数模式
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

   ## 理解继承
   ### 原型链 
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


  ### 借用构造函数
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

  ### 组合继承

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

  ### 原型式继承

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
  ### 寄生式继承
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


  ### 寄生组合式继承
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
