# 类型
  
  javaScript有其中内置类型：

  + 空值 （null）
  + 未定义（Undefined）
  + 布尔值（boolean）
  + 字符串（string）
  + 数字（number）
  + 对象（Object）
  + 符号（Symbol, ES6中新增）

  用typeof运算符来查看值的类型

  ```js
    typeof null === "object"; // true
    typeof undefined === "undefined"; // true
    typeof true === "boolean"; // true
    typeof 25 === "number" // true
    typeof "25" === "string" // true
    typeof { age: 42 } === "object" // true
    typeof Symbol() === "symbol" // true
  ```
  除了null，其他值使用typeof查看是都有与之对应的类型字符串。
  