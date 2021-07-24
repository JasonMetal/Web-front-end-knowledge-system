# 原生函数

js内建的函数也叫原生函数（native function）, 如string,number.

常用的原生函数：

+ String()

+ Number()

+ Boolean()

+ Array()

+ Object

+ Function()

+ RegExp()

+ Date()

+ Error()

+ Symbol()

## 1. 内部属性[[class]]

所有typeof返回值为“object”的对象（如数组），都包含一个为内部属性[[class]]（我们可以把它看作一个内部的分类，而非传统的面向对象意义的类）。

这个属性无法直接访问，一般通过Object.prototype.toStrin(..)来查看。例如：

```js
Object.prototype.toString.call([1, 2, 3]); // "[object, Array]"
Object.prototype.toString.call(/regex-literal/i); // "[object, RegExp]"
```
上例中，数组的内部[[class]]属性值是“Array”, 正则表达式的值是“RegExp”。
多数情况下，对象的内部[[Class]]属性和创建该对象的内建原生构造函数相对应（如下），但并非总是如此。

```js
Object.prototype.toString.call(null); // "[object, Null]"
Object.prototype.toString.call(undefined); // "[object, Undefined]"
```
虽然Null()和Undefined()这样的原生构造函数并不存在，但是内部[[Class]]属性值仍然是"Null"和"Undefined"。

其他基本类型值（如字符串、数字和布尔）的情况有所不同，通常称为“包装”
```js
Object.prototype.toString.call("abc"); // "[object, String]"
Object.prototype.toString.call(42); // "[object, Number]"
Object.prototype.toString.call(true); // "[object, Number]"
```

## 2. 封装对象包装

封装对象（object wrapper）扮演着十分重要的角色。

由于基本类型值没有．length和．toString()这样的属性和方法，需要通过封装对象才能访问，此时JavaScript会自动为基本类型值包装（box或者wrap）一个封装对象：

```js
var a = "abc";

a.length; // 3
a.toUpperCase(); // "ABC"
```

## 3. 拆封

如果想要得到封装对象中的基本类型值，可以使用valueOf()函数：

```js
var a = new String("abc");
var b = new Number(42)
var c = new Boolean(true)

a.valueOf(); // "42"
b.valueOf(); // 42
c.valueOf(); // true
```

在需要用到封装对象中的基本类型值的地方会发生隐式拆封.

```js
 var a = new String("abc");
 var b = a + '' // b的值为“abc”
 typeof a; // "object"
 typeof b // "string"
```

## 4. 原生函数作为构造函数

### 4.1 Array(..)

```js
var a = new Array(1, 2, 3);
a // [1, 2, 3]
var b = [1, 2, 3]
b // [1, 2, 3]
```

Array构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。

这实非明智之举：一是容易忘记，二是容易出错。

更为关键的是，数组并没有预设长度这个概念。这样创建出来的只是一个空数组，只不过它的length属性被设置成了指定的值。

如若一个数组没有任何单元，但它的length属性中却显示有单元数量，这样奇特的数据结构会导致一些怪异的行为。

而这一切都归咎于已被废止的旧特性（类似arguments这样的类数组）。

对此，不同浏览器的开发控制台显示的结果也不尽相同，这让问题变得更加复杂。

例如：

```js
var a = new Array(3);
a.length // 3
a;
```
a在Chrome中显示为[ undefined x 3 ]（目前为止），这意味着它有三个值为undefined的单元，但实际上单元并不存在（“空单元” 这个叫法也同样不准确）。

从下面代码的结果可以看出它们的差别：

```js
var a = new Array(3);
var b = [ undefined, undefined, undefined ];
var c = [];
c.length = 3;
a;
b;
c;
```

我们可以创建包含空单元的数组，如上例中的c。

只要将length属性设置为超过实际单元数的值，就能隐式地制造出空单元。

另外还可以通过delete b[1]在数组b中制造出一个空单元。

b在当前版本的Chrome中显示为[ undefined, undefined, undefined ]，而a和c则显示为[ undefined x 3 ]。

是不是感到很困惑？

更令人费解的是在当前版本的Firefox中a和c显示为[ , , , ]。

仔细看来，这其中有三个逗号，代表四个空单元，而不是三个。

Firefox在输出结果后面多添了一个，，原因是从**ES5规范开始就允许在列表（数组值、属性列表等）末尾多加一个逗号（在实际处理中会被忽略不计）**。

所以如果你在代码或者调试控制台中输入[ , , , ]，实际得到的是[ , , ]（包含三个空单元的数组）。

这样做虽然在控制台中看似令人费解，实则是为了让复制粘贴结果更为准确。

更糟糕的是，上例中a和b的行为有时相同，有时又大相径庭：

```js
a.join("-") // "--"
b.join("-") // "--"
a.map(function(v, i) { return i }) // [undefined x 3]
b.map(function(v, i) { return i }) // [0, 1, 2] 
```

a.map(..)之所以执行失败，是因为数组中并不存在任何单元，所以map(..)无从遍历。而join(..)却不一样，它的具体实现参考下面的代码：

```js
function fakeJoin(arr, connector) {
  var str = "";
  for( var i = 0; i < arr.length; i++) {
    if (i < 0) {
      str += connerctor;
    }
    if (arr[i] !== undefined) {
      str += arr[i];
    }
  }
  return str
}
var a = new Array(3);
fakeJoin(a, "-"); // "--"
```
从中可以看出，join(..)首先假定数组不为空，然后通过length属性值来遍历其中的元素。

而map(..)并不做这样的假定，因此结果也往往在预期之外，并可能导致失败。

我们可以通过下述方式来创建包含undefined单元（而非“空单元”）的数组：

```js
var a = Array.apply(null, {length: 3});
a // [undefined, undefined, undefined]
```

apply(..)是一个工具函数，适用于所有函数对象，它会以一种特殊的方式来调用传递给它的函数。

总之，永远不要创建和使用空单元数组。

## 4.2 Object(..)、Function(..)和RegExp(..)

同样，除非万不得已，否则尽量不要使用Object(..)/Function(..)/RegExp(..)：

强烈建议使用常量形式（如/^a＊b+/g）来定义正则表达式，这样不仅语法简单，执行效率也更高，

因为JavaScript引擎在代码执行前会对它们进行预编译和缓存。

与前面的构造函数不同，RegExp(..)有时还是很有用的，比如动态定义正则表达式时：

正则表达式 new RegExp("pattern", "flags")就能派上用场。

## 4.3 Symbol(..)

ES6中新加入了一个基本数据类型 ——符号（Symbol）。

**符号是具有唯一性的特殊值（并非绝对），用它来命名对象属性不容易导致重名。**

该类型的引入主要源于ES6的一些特殊构造，此外符号也可以自行定义。

## 4.5 原生原型

原生构造函数有自己的．prototype对象，如Array.prototype、String.prototype等。

这些对象包含其对应子类型所特有的行为特征。

例如，将字符串值封装为字符串对象之后，就能访问String.prototype中定义的方法。

根据文档约定，我们将String.prototype.XYZ简写为String#XYZ，对其他．prototype也同样如此。

+  String#indexOf(..) 在字符串中找到指定子字符串的位置。

+ String#charAt(..) 获得字符串指定位置上的字符。

+ String#substr(..)、String#substring(..)和String#slice(..) 获得字符串的指定部分。

