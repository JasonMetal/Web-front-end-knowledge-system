(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{190:function(t,a,s){t.exports=s.p+"assets/img/ast.b3fbb920.jpg"},213:function(t,a,s){"use strict";s.r(a);var v=s(6),_=Object(v.a)({},(function(){var t=this,a=t.$createElement,v=t._self._c||a;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"执行机制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#执行机制"}},[t._v("#")]),t._v(" 执行机制")]),t._v(" "),v("p",[t._v("本节讲述V8的执行机制，来理解JavaScript的执行机制。这是能够帮助我们理解很多上层应用，包括Babel、ESlint、前端框架的底层机制.")]),t._v(" "),v("p",[t._v("一段JavaScript代码放在V8中是如何的执行？机器是读不懂JavaScript代码的，只能理解特定的机器码。\n如果要让JavaScript代码在机器上运行，就必须将JavaScript代码编译成机器码。由于JavaScript属于解释型语言，解释器会对原代码做如下分析：")]),t._v(" "),v("ol",[v("li",[v("p",[t._v("通过词法分析和语法分析生成 AST(抽象语法树)")])]),t._v(" "),v("li",[v("p",[t._v("生成字节码")])])]),t._v(" "),v("p",[t._v("然后解释器根据字节码来执行程序。但 JS 整个执行的过程其实会比这个更加复杂，接下来就来一一地拆解。")]),t._v(" "),v("h2",{attrs:{id:"生成ast"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#生成ast"}},[t._v("#")]),t._v(" 生成AST")]),t._v(" "),v("p",[t._v("生成 AST 分为两步：词法分析和语法分析。")]),t._v(" "),v("p",[t._v("词法分析即分词，它的工作就是将一行行的代码分解成一个个token。 比如下面一行代码:")]),t._v(" "),v("div",{staticClass:"language-js extra-class"},[v("pre",{pre:!0,attrs:{class:"language-js"}},[v("code",[v("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" name "),v("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token string"}},[t._v("'wzx'")]),t._v("\n")])])]),v("p",[t._v("其中会把句子分解成四个部分:")]),t._v(" "),v("p",[t._v("关键字："),v("code",[t._v("const")]),t._v(" 、 变量名："),v("code",[t._v("name")]),t._v("、赋值："),v("code",[t._v("=")]),t._v(" 、 字符串："),v("code",[t._v("'wzx'")]),t._v(";")]),t._v(" "),v("p",[t._v("即解析成了四个token，这就是词法分析的作用。")]),t._v(" "),v("p",[t._v("接下来语法分析阶段，将生成的这些 token 数据，根据一定的语法规则转化为AST。举个例子:")]),t._v(" "),v("div",{staticClass:"language-js extra-class"},[v("pre",{pre:!0,attrs:{class:"language-js"}},[v("code",[t._v("  "),v("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" name "),v("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sanyuan'")]),t._v("\n  console"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),v("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),v("p",[t._v("最后生成的 AST 是这样的:")]),t._v(" "),v("p",[v("img",{attrs:{src:s(190),alt:"An image"}})]),t._v(" "),v("p",[t._v("当生成了 AST 之后，编译器/解释器后续的工作都要依靠 AST 而不是源代码。生成 AST 后，接下来会生成执行上下文。")]),t._v(" "),v("h2",{attrs:{id:"生成字节码"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#生成字节码"}},[t._v("#")]),t._v(" 生成字节码")]),t._v(" "),v("p",[t._v("生成AST后，通过V8解释器(Ignition)来生成字节码。但"),v("code",[t._v("字节码")]),t._v("并不能直接让机器运行，还需要转成机器码。\nV8早期直接把 AST 转换成机器码，但是造成严重的内存占用问题。")]),t._v(" "),v("p",[v("strong",[t._v("字节码概念")]),t._v("\n字节码是介于AST与机器码之间的一种代码，但与特定类型的机器码无关，字节码需要通过解释器将其转成机器码。")]),t._v(" "),v("h2",{attrs:{id:"执行代码"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#执行代码"}},[t._v("#")]),t._v(" 执行代码")]),t._v(" "),v("p",[t._v("在代码执行阶段，V8会将重复出现的代码标记为"),v("code",[t._v("热点代码")]),t._v("，编译成机器码保存起来，这个用来编译的工具就是V8的编译器。\n在这样的机制下，代码执行效率得到提高。这种编译机制叫作"),v("code",[t._v("即时编译")]),t._v("，也就是我们常听到的"),v("code",[t._v("JIT")]),t._v("。")]),t._v(" "),v("p",[t._v("总结一下：")]),t._v(" "),v("ol",[v("li",[v("p",[t._v("首先通过词法分析和语法生成"),v("code",[t._v("AST")])])]),t._v(" "),v("li",[v("p",[t._v("接着将 "),v("code",[t._v("AST")]),t._v(" 转成 字节码")])]),t._v(" "),v("li",[v("p",[t._v("由解释器逐行执行字节码，遇到重复代码启动编译器进行编译成对应的机器码并保持。")])])])])}),[],!1,null,null,null);a.default=_.exports}}]);