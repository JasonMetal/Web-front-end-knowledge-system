# 基础类型

## 运行方式

### 有两种方式：使用Visual studio 和使用 NodeJs

才能让TypeScript写的东西正确的运行起来

```
// 安装
install : npm install -g typescript
// 编译
compile : tsc your.ts


```

## 类型

### Boolean(布尔类型)

最基本的数据类型是简单的true/false，在JavaScript和TypeScript(其他语言也一样)中称为"boolean"类型。

```
var isDone:boolean = false;

```

### Number(数字)

正如在JavaScript中，在TypeScript中的数值也都是浮点数。这些浮点数都是"number"类型的。

```
var height: number = 6;
```

### String(字符串)

在JavaScript编写网页或者服务端程序中，另外一个重要的部分便是文本类型数据。和其他语言一样，我们使用字符串（string）来指代这些文本类型的数据。和JavaScript相同，TypeScript也是用双引号("")或者单引号('')来包含字符串数据。

```
var name: string = "bob";
name = 'smith';
```



### Array(数组)

TypeScript和JavaScript一样，允许使用数组来含括一系列的值。有两种不同的方式来

```
写一个数组。

第一种是在元素类型后面用中括号([])来表示这种类型元素的数组：var list:number[] = [1,2,3,4];
第二种是使用泛型创建类型数组,Array
```


### Enum(枚举)

在JavaScript原生的标准数据集之外，TypeScript增加了一个很实用的"enum"类型。比如C#，枚举给了我们更友好的名称(数字类型)来辨别数值集合。

```
enum Color {Red, Green, Blue};
var c: Color = Color.Green;
```


默认情况下，枚举中的元素是从0开始编号的。你可以通过手动设置元素的这个值。比如，我们现在设置从1开始，而非原先例子中的0：

```
enum Color {Red = 1, Green, Blue};
var c: Color = Color.Green;
```

或者，即使是手动设置所有枚举元素的数值都是可以的：

```
enum Color {Red = 1, Green = 2, Blue = 4};
var c: Color = Color.Green;

```

枚举类型有个便捷的特性，你可以通过数值来查找枚举中的对应的元素名称。我们看例子，假如我们有一个数值是2，但我们不知道在上面的枚举中对应的是哪个元素，那么我们可以查找相对应的名称：

```
enum Color {Red = 1, Green, Blue};
var colorName: string = Color[2];
alert(colorName);
```

### Any

当我们编写应用程序的时候，我们可能需要描述一些不明确类型的变量。这些变量可能来自动态的内容，比如用户提供或者第三方库。在这些情况下，我们想要跳出类型检查并且让这些值通过编译时的检查。为了实现这个目的，我们使用"Any"类型来标识这些值：

```
var notSure: any = 4;
notSure = "maybe a string instead"; // 现在是string类型
notSure = false; // 现在是boolean类型
```



"any"类型对于处理我们现有的JavaScript代码很有好用，可以用它来控制编译时是否增加还是减少数据的类型检查。
如果你仅知道一部分数据类型而非全部数据类型，那么使用"any"类型是很方便的。例如，你可能有个数组，但这个数组的元素又是对应不同的数据类型。

```
var list:any[] = [1, true, "free"];
list[1] = 100;
```

### Void

与"any"类型相对的是"void"类型，它代表没有任何类型。你也许经常看到它作为个不返回值的函数：

function warnUser(): void {
alert("This is my warning message");
}
