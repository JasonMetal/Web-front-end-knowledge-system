(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{129:function(a,t,s){"use strict";s.r(t);var n=s(0),e=Object(n.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#语法"}},[a._v("#")]),a._v(" 语法")]),a._v(" "),s("h2",{attrs:{id:"_1-语句和表达式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-语句和表达式"}},[a._v("#")]),a._v(" 1. 语句和表达式")]),a._v(" "),s("p",[a._v("语句相当于句子，表达式相当于短语，运算符则相当于标点符号和连接词。")]),a._v(" "),s("p",[a._v("JavaScript中表达式可以返回一个结果值。例如：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("6")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\nb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[a._v("这三行代码都是包含表达式的语句。var a = 3 ＊ 6和var b = a称为“声明语句”，因为它们声明了变量（还可以为其赋值）。")]),a._v(" "),s("p",[a._v("a = 3 ＊6和b = a（不带var）叫作“赋值表达式”。")]),a._v(" "),s("p",[a._v("第三行代码中只有一个表达式b，同时它也是一个语句（虽然没有太大意义）。这样的情况通常叫作“表达式语句”（expression statement）。")]),a._v(" "),s("h3",{attrs:{id:"_1-1-表达式的副作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-表达式的副作用"}},[a._v("#")]),a._v(" 1.1 表达式的副作用")]),a._v(" "),s("p",[a._v("大部分表达式没有副作用。例如：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[a._v("表达式a + 3本身没有副作用（比如改变a的值）。它的结果值为5，通过b = a + 3赋值给变量b。")]),a._v(" "),s("h4",{attrs:{id:"最常见的副作用的表达式是函数调用："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#最常见的副作用的表达式是函数调用："}},[a._v("#")]),a._v(" 最常见的副作用的表达式是函数调用：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("function")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    a "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 结果值：undefined。副作用：a的值被改变。")]),a._v("\n")])])]),s("h4",{attrs:{id:"其他表达式也有副作用，比如："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#其他表达式也有副作用，比如："}},[a._v("#")]),a._v(" 其他表达式也有副作用，比如：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("42")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" a"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[a._v("a首先返回变量a的当前值42，然后再将a的值加1：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("42")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" a"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\na"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//43")]),a._v("\nb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//42")]),a._v("\n")])])]),s("p",[a._v("很多开发人员误以为变量b和a的值都是43，这是因为没有完全理解++运算符的副作用何时产生。")]),a._v(" "),s("p",[a._v("递增运算符++和递减运算符--都是一元运算符（参见第4章），它们既可以用在操作数的前面，也可以用在后面：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("++")]),a._v("a "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 43")]),a._v("\na "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 43")]),a._v("\n")])])]),s("h4",{attrs:{id:"再如delete运算符。第2章讲过，delete用来删除对象中的属性和数组中的单元。它通常以单独一个语句的形式出现："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#再如delete运算符。第2章讲过，delete用来删除对象中的属性和数组中的单元。它通常以单独一个语句的形式出现："}},[a._v("#")]),a._v(" 再如delete运算符。第2章讲过，delete用来删除对象中的属性和数组中的单元。它通常以单独一个语句的形式出现：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" obj "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    a"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("42")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\nobj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 42")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("delete")]),a._v(" obj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("a "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// true")]),a._v("\nobj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("a "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// undefined")]),a._v("\n")])])]),s("p",[a._v("如果操作成功，delete返回true,否则返回false。其副作用是属性被对象中删除")]),a._v(" "),s("h4",{attrs:{id:"另一个有趣的例子是-赋值运算符。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#另一个有趣的例子是-赋值运算符。"}},[a._v("#")]),a._v(" 另一个有趣的例子是=赋值运算符。")]),a._v(" "),s("p",[a._v("例如：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\na "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("42")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 42")]),a._v("\na "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 42;")]),a._v("\n")])])]),s("p",[a._v("a = 42中的=运算符看起来没有副作用，实际上它的结果值是42，它的副作用是将42赋值给a。")]),a._v(" "),s("p",[a._v("组合赋值运算符，如+=和-=等也是如此。例如，a = b += 2首先执行b +=2（即b = b + 2），然后结果再被赋值给a。")]),a._v(" "),s("p",[a._v("多个赋值语句串联时，赋值表达式（和语句）的结果值就能派上用场，比如：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" c"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\na "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" c "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("42")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[a._v("这里c = 42的结果值为42（副作用是将c赋值42），然后b = 42的结果值为42（副作用是将b赋值42），最后是a = 42（副作用是将a赋值42）。")]),a._v(" "),s("h4",{attrs:{id:"另一个需要注意的问题是："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#另一个需要注意的问题是："}},[a._v("#")]),a._v(" 另一个需要注意的问题是：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("function")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vowels")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[a._v("str")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" matches"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("str"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 提取所有元音字母")]),a._v("\n        matches "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" str"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("match")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token regex"}},[a._v("/[aeiou]/g")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("matches"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" matches"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vowels")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Hello World"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v('// ["e", "o", "o"]')]),a._v("\n")])])]),s("p",[a._v("上面的代码没问题，很多开发人员也喜欢这样做。其实我们可以利用赋值语句的副作用将两个if语句合二为一")]),a._v(" "),s("h3",{attrs:{id:"_1-2-代码块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-代码块"}},[a._v("#")]),a._v(" 1.2 代码块")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// [object object]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 0")]),a._v("\n")])])]),s("p",[a._v("表面上看+ 运算符根据第一个操作数（[]或{}）的不同会产生不同的结果，实则不然。")]),a._v(" "),s("p",[a._v("第一行代码中，{}出现在+运算符表达式中，因此它被当作一个值（空对象）来处理。")]),a._v(" "),s("p",[a._v('第4章讲过[]会被强制类型转换为""，而{}会被强制类型转换为"[objectObject]"。')]),a._v(" "),s("p",[a._v("但在第二行代码中，{}被当作一个独立的空代码块（不执行任何操作）。")]),a._v(" "),s("p",[a._v("代码块结尾不需要分号，所以这里不存在语法上的问题。最后+ []将[]显式强制类型转换（参见第4章）为0。")]),a._v(" "),s("h2",{attrs:{id:"_2-运算符优先级"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-运算符优先级"}},[a._v("#")]),a._v(" 2. 运算符优先级")]),a._v(" "),s("p",[a._v("&&运算符先于||执行")]),a._v(" "),s("h3",{attrs:{id:"_2-2-更强的绑定"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-更强的绑定"}},[a._v("#")]),a._v(" 2.2 更强的绑定")]),a._v(" "),s("p",[a._v("&&运算符的优先级高于||，而||的优先级又高于？ :。")])])}),[],!1,null,null,null);t.default=e.exports}}]);