# 值

## 1. 数组

和其他强类型语言不同，在JavaScript中，数组可以容纳任何类型的值。

```js
var a = [1, '2', [3]];
a.length; // 3
a[0] === 1 // true
a[2][0] === 3 // true
```

在创建 “稀疏”数组（sparse array, 即含有空白或空缺单元的数组）时要特别注意：
```js
var a = [];
a[0] = 1;
// 此处没有设置a[1]单元
a[2] = 3;
a[1]; // undefined
a.length // 3
```
上面代码可以正常运行，但其中的“空白单元”（empty slot）可能会导致出乎意料的结果。
`a[1]`的值为undefined，但这与将其显示赋值为undefined(a[1] = undefined)还是有区别的。

数组通过数字进行索引，但有趣的是它们也是对象，所以可以包含字符串键值和属性：
```js
var a = [];
a[0] = 1;
a['foobar'] = 2;
a.length; // 1
a['foobar']; // 2
a.foobar; // 2
```
这里有个问题需要特别注意，如果字符串键值能够被强制类型转换为十进制的话，它就会被当作数字索引处理

```js
var a = [];
a["13"] = 42;
a.length // 14
```

### 1.1 类数组
有时需要将类数组（一组通过数字索引的值）转为真正的数组，这一般通过数组工具函数（如indexOf(..),concat(..),forEach(..))来实现。

列如，一些DOM查询操作会返回DOM元素列表，它们并非真正意义上的数组，但十分类似。另一个例子是通过arguments对象（类数组），将函数
当作列表来访问（从ES6开始已废止）。

工具函数（slice）经常被用于这类转换：
```js
    function foo() {
        var arr = Array.prototype.slice().call(arguments);
        arr.push('bam');
        console.log(arr);
    }
    foo('foo','baz'); // ['foo', 'baz', 'bam']
```
如上所示，slice()返回参数列表（上例中是一个类数组）的一个副本。
用ES6的内置工具函数Array.from(..)也能实现同样的功能：
```js
    var arr = Array.from(arguments);
```

## 2. 字符串

字符串经常被当成字符数组。字符串的内部实现究竟有没有使用数组不好说，但是JavaScript中的
字符串和字符串数组并不一回事，最多是看上去相似而已。

列如下面的两个值：

```js
var a = "foo";
var b = ['f', 'o', 'o'];
```
字符串和数组的确很相似，它们都是类数组，都有length属性以及indexOf(..)(从ES5开始数组支持此方法)和concat(..)方法：
```js
a.length; // 3
b.length; // 3
a.indexOf('o'); // 1
b.indexOf('o') // 1

var c = a.concat("bar"); // 'foobar';
var d = b.concat(['b','a','r'])// ['f', 'o', 'o', 'b', 'a', 'r'];

a === c; // false
b === d // false

a; // "foo"
b; // ["f", "o", "o"]
```

JavaScript字符串是不可变的，而数组是可变的。
并且a[1]在JavaScript中并非总是合法语法，
在老版本的IE中就不被允许（现在可以了）。
正确的方法应该是a.charAt(1)。

字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串。
而数组的成员函数都是在其原始值上进行操作。

```js
 c = a.toUpperCase();
 a === c; // false
 a; // "foo"
 c; // "FOO"
 b.push("!");
 b // ["f", "o", "o", "!"]
```
许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但是可以通过“借用”
数组的非变更方法来处理字符串：

```js
a.join; //undefined
a.map // undefined

var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v) {
    return v.toUpperCase() + '.';
}).join("");
c  // "f-o-o"
d = // "F.O.O"
```
另外一个不同点在于字符串反转。数组有一个字符串没有的可变更成员reverse();
```js
a.reverse; // undefined
b.reverse(); // ['!', 'o','o','f']
b //['f','o','o','!']
```
可惜我们无法“借用”数组的可变更成员函数，因为字符串是不可变的。
```js
Array.prototype.reverse.call(a);
```
一个变通的办法是先将字符串转为数组，待处理完再将结果转为字符串：

```js
var c = a
// 将a 的值转为字符数组
.split("")
.reverse()
.join("");
c // "oof"
```
## 3. 数字

JavaScript 只有一种数值类型：number(数字)，包括“整数”和带小数的十进制。
此处“整数”之所以加引号是因为和其他语言不同，JavaScript`没有真正意义上的整数`，
这是它一直以来为人诟病的地方。这种情况在将来或许会有所改观，但目前只有数字类型。

JavaScript 中的 “整数”就是没有小数的十进制。所以42.0即等同于“整数”42。

与大部分现代编程语言（包括几乎所有脚本语言）一样，JavaScript中的`数字类型是基于IEEE 754标准来实现`，
该标准通常也被称为`“浮点数”`。JavaScript使用的是`“双精度”`格式（即`64位二进制`）。

### 3.1 数字的语法

JavaScript 的数字字面量一般用十进制表示。例如：
```js
var a = 42;
var b = 42.3;
```
小数点前面的0可以省略
```js
var a = 0.42;
var b = .42;
```
小数点后面的0也可以省略
```js
var a = 42.0;
var b = 42.;
```
特别大的或特别小的数字默认用指数格式显示，与toExponential()函数输出的结果相同。例如：
```js
var a = 5E10;
a; // 50000000000
a.toExponential(); // 5e+10;

var b = a * a;
b // 2.5e+21

var c = 1 / a;
c // 2e - 11;
```
由于数字值可以使用Number对象进行封装，因此数字值可用调用Number.prototype中的方法。
列如，toFixed(..)方法指定小数部分显示的位数。

数字字面量还支持用其他格式来表示，如二进制、八进制和十六进制。
当前的JavaScript版本都支持这些格式；
```js
0xf3; // 243十六进制
0363  // 243的八进制
```
从ES6，严格模式开始不支持0363八进制格式

ES6新格式
```js
0o363 // 243的八进制
0b11110011 // 243的二进制
```

### 3.2 较小的数值

二进制浮点数最大的问题（不仅JavaScript,所有遵循IEEE 754规范的语言都是如此），是会出现如下情况：
```js
0.1 + 0.2 === 0.3 // false
```
从数学角度来说，上面的判断应该为true,可是结果为什么是false呢？

简单来说，二进制浮动数中的0.1和0.2并不是十分精确的，它们相加的结果并非刚好等于0.3，
而是一个非常接近的数字0.30000000000000004，所以判断结果为false.

那么应该怎么来判断0.1 + 0.2 和 0.3是否相等呢？
最常见的方法是设置一个误差范围值，通常称为“机器精度”，对JavaScript的数字来说，这个值
通常是`2^-52(2.220446049250313e-16)`。

从ES6开始该值在Number.EPSILON中，我们可以直接拿来用，也可以为ES6之前的版本写polyfill:

```js
if(!Number.EPSILON) {
    Number.EPSILON = Math.pow(2, -52)
}
```
可以使用`Number.EPSILON`来比较两个数是否相等（在指定的误差范围内）：
```js
function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}
var a = 0.1 + 0.2
var b = 0.3;

numbersCloseEnoughToEqual(a, b); // true
numbersCloseEnoughToEqual(0.0000001, 0.0000002) // false
```
能够呈现的最大浮点数`1.798e+308`(这是一个相当大的数字)，它定义在
`Number.MAX_VALUE`中。最小浮点数定义在Number.MIN VALUE中，大约是5e-324，
它不是负数，但无限接近于0！

### 3.3 整数的安全范围

能够被“安全”呈现的最大整数是2^53-1，即9007199254740991，在ES6中被定义为Number.MAX SAFE INTEGER。最小整数是-9007199254740991，在ES6中被定义为Number. MIN SAFE INTEGER。

有时JavaScript程序需要处理一些比较大的数字，如数据库中的64位ID等。由于JavaScript的数字类型无法精确呈现64位数值，所以必须将它们保存（转换）为字符串。

### 3.4 整数检测

要检测一个值是否是整数，可以使用ES6中的Number.isInteger(..)方法。

```js
Number.isInteger(42) // true
Number.isInteger(42.000) // true
Number.isInteger(42.3) // false
```

也可以为ES6之前的版本polyfill Number.isInteger(..)方法；
```js
if(!Number.isInteger) {
    Number.isInteger = function(num) {
        return typeof num === "number" && num % 1 == 0;
    }
}
```
要检测一个值是否是安全的整数，可以使用ES6中的Number.isSafeInteger(..)方法：
```js
Number.isSafeInteger(Number.Max_Safe_INTEGER); // true
Number.isSafeInteger(Math.pow(2, 53)) // false
Number.isSafeInteger(Math.pow(2, 53) - 1) // true

```
## 4. 特殊数值

### 4.1 不是值的值
undefined类型只有一个值，即undefined。
null类型也只有一个值，即null。
它们的名称既是类型也是值。undefined和null常被用来表示“空的”值或“不是值”的值。二者之间有一些细微的差别。

例如：
+ null指空值（empty value）
+ undefined指没有值（missing value）或者 指从未赋值
+ null指曾赋过值，但是目前没有值null是一个特殊关键字，不是标识符，我们不能将其当作变量来使用和赋值。
      然而undefined却是一个标识符，可以被当作变量来使用和赋值。
### 4.2 undefined
在非严格模式下，我们可以为全局标识符undefined赋值（这样的设计实在是欠考虑！）：
```js
    function foo() {
        undefined = 2;
    }
    foo();

    function foo() {
        "use strict";
        undefined = 2 // TypeError!
    }

    foo();
```

void 运算符

undefined是一个内置标识符（除非被重新定义，见前面的介绍），它的值为undefined，通过void运算符即可得到该值。

表达式void__没有返回值，因此返回结果是undefined。void并不改变表达式的结果，只是让表达式不返回值。

```js
var a = 42;
console.log(void a, a); // undefined 42
```

按照惯例我们用 `void 0`来获得`undefined`（这主要源自C语言，当然使用void true或其它void表达式也是可以的）。
void 0、void 1和 undefined之间并没有实质上的区别。

void运算符在其他地方也能派上用场，比如不让表达式返回任何结果（即使其有副作用）。
例如：
```js
    function doSomething() {
        // App.ready 由程序自己定义
        if (!App.ready) {
            // 稍后再试
            return void setTimeout(doSomething, 100);
        }

        var result;
        // 其他
        return result;
    }
    // 现在可以了吗？
    if (doSomething()){
        // 立即执行下一个任务
    }
```
这里setTimeout(..)函数返回一个数值（计时器间隔的唯一标识符，用来取消计时），但是
为了确保if语句不产生误报（false positive）,我们void掉它。

很多开发人员喜欢分开操作，效果都一样，只是没有使用void运算符：

```js
if(!App.ready) {
    // 稍后再试
    setTimeout( doSomething, 1000);
    return;
}
```

### 4.3 特殊的数字

如果数学运算的操作数不是数字类型，就无法返回一个有效的数字，这种情况下返回值为NaN。

NaN意指“不是一个数字”（not a number），这个名字容易引起误会，后面将会提到。

将它理解为“无效数值”“失败数值”或者“坏数值”可能更准确些。

例如：

```js
var a = 2 / "foo";  // NaN
typeof a === "number" // true
```
换句话说，“不是数字的数字”仍然是数字类型。这种说法可能有点绕。

NaN是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。

有人也许认为如果要检查变量的值是否为NaN，可以直接和NaN进行比较，就像比较null和undefined那样。实则不然。

```js
var a = 2 / "foo";

a === NaN; // false;
a === NaN; // false;
```

NaN是一个特殊值，它和自身不相等。

既然我们无法对NaN进行比较（结果永远为false）,那应该怎么样判断它呢？

```js
var a = 2 / "foo";
isNaN(a) // true
```

`isNaN` 有一个严重的缺陷，它的检查方式过于死板，就是“检查参数是否不是NaN, 也不是数字”。但这样做的结果并不太准确。

```js
var a = 2 / "foo";
var b = "foo"
isNaN(a) // true
isNaN(b) // true
```
很明显“foo”不是一个数字，但是它也不是NaN。这个BUG自JavaScript问世以来就一直存在。

从ES6开始我们可以使用工具函数Number.isNaN(..)。ES6之前的浏览器的polyfill如下：

```js
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return (
            typeof n === 'number' &&
            window.isNaN(n)
        )
    }
}
var a = 2 / "foo";
var b = "foo"
isNaN(a) // true
isNaN(b) // false
```

实际上还有一个更简单的方法，即利用NaN不等于自身这个特点。NaN是JavaScript中唯一一个不等于自身的值。

于是我们可以这样：

```js
if(!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;
    }
}
```

#### 4.3.1 无穷数

熟悉传统编译语言（如C）的开发人员可能遇到过编译错误（compiler error） 或者运行时错误（runtime error）,例如“除以0”：

```js
var a = 1 / 0;
```
然而在JavaScript中上例的结果为Infinty(即Number.POSITIVE_INfINITY)。同样：

```js
var a = 1 / 0; // Infinty
var b = -1 /0 // -Infinty
```
如果除法运算中的一个操作数为负数，则结果为-Infinty(即Number.NEGATIVEINfINITY)。

JavaScript使用有限数字表示法（finite numeric representation，即之前介绍过的IEEE 754浮点数）
所以和纯粹的数学运算不同，JavaScript的运算结果有可能溢出，此时结果为Infinity或者-Infinity。

例如：
```js
var a  = Number.MAX_VALUE // 1.798e+308
a + a;                    // Infinty
a + Math.pow(2, 970);     // Infinty  
a + Math.pow(2, 969);     // 1.798e+308  
```
#### 4.3.2 零值

抛开学术上的繁枝褥节不论，我们为什么需要负零呢？
有些应用程序中的数据需要以`级数形式`来表示（比如`动画帧的移动速度`），数字的符号位（sign）用来代表其他信息（比如`移动的方向`）。
此时`如果一个值为0的变量失去了它的符号位`，它的`方向信息就会丢失`。所以保留0值的符号位可以防止这类情况发生。

### 4.4 特殊等式
如前所述，NaN和-0在相等比较时的表现有些特别。由于NaN和自身不相等，所以必须使用ES6中的Number.isNaN(..)(或者polyfill)。
而-0等于0（对于===也是如此），因此我们必须使用isNegZero这样的工具函数。
ES6中新加入了一个工具方法Object.is(..)来判断两个值是否绝对相等，可以用来处理上述所有的情况：

```js
var a = 2 / "foo";
var b = -3 * 0;

Object.is(a, NaN) // true
Object.is(b, -0) // true
Object.is(b, 0) //false
```
## 5. 值和引用

在许多编程语言中，赋值和参数传递是通过值复制（value-copy）或者引用复制（reference-copy）来完成，这取决于我们使用什么语法。

JavaScript中没有指针，引用的工作机制也不尽相同。在JavaScript中变量不可能成为指向另一个变量的引用。

JavaScript引用指向的是值。如果一个值有10个引用，这些引用指向的都是同一个值，它们相互之间没有引用/指向关系。

JavaScript对值和引用的赋值/传递在语法上没有区别，完全根据值的类型来决定。

```js
var a = 2;
var b = a; // b是a的一个复本。
b++;
a // 2
b // 3

var c = [1,2,3]
d = c; // d是[1,2,3]的一个应用
d.push(4)
c // [1,2,3,4]
d // [1,2,3,4]
```
简单值（即标量基本类型值）,总是通过值复制来赋值和传递的，包括
null,undefined,string,number,boolean,symbol;

复合值——对象和函数，则是通过引用复制的方式来传递。

上例中2是一个标量基本类型值，所以变量a持有该值的一个复本，b持有它的另一个复本。b更改时，a的值保持不变。

和d则分别指向同一个复合值[1,2,3]的两个不同引用。
请注意，c和d仅仅是指向值[1,2,3]，并非持有。所以它们更改的是同一个值（如调用．push(4)），随后它们都指向更改后的新值[1,2,3,4]。

函数参数就经常让人产生这样的困惑：

```js
function foo(x) {
    x.push(4);
    x // [1,2,3,4]
    x = [4,5,6]
    x.push(7)
    x // [4,5,6,7]
}
var a = [1,2,3]
foo(a);
a // 是[1,2,3,4], 不是[4,5,6,7]
```

## 6. 小结

js 中的数组是通过数字索引的一组任意类型的值。字符串和数组类似，但是它们的行为特征不同，在将字符串作为处理时需要特别小心。
js中的数字包括“整数”和“浮点数”。

基本类型中定义了几个特殊的值。

null类型只有一个值null,undefined类型也只有一个值undefined。所有变量在赋值前默认都是undefined。void运算符可以返回undefined。

数字类型有几个特殊值，包括NaN(意指“not a number”, 更确切的说是“invalid number”)、+Infinity、-Infinity和-0。

基本类型的是通过值复制来赋值和传递，而复合值通过值引用来赋值和传递。js中的指针和别的语言不一样，它们不能指向别的变量/引用，
只能指向值。