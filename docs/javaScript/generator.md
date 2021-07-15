# 生成器

## 1 打破完整运行

### 1.1 输入和输出

#### 1.1.1 迭代消息传递

除了能够接受参数，生产器还提供了更强大的消息输入输出功能，通过yield(..)和next(..)来实现

### 1.2 多个迭代器
```js
function *foo() {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log(x, y ,z)
}

var z = 1;

// ＊foo()的两个实例同时启动
var it1 = foo(); 
var it2 = foo();

// 两个next()分别从yield 2语句得到值2
var val1 = it1.next().value // 2 <-- yield 2 。
var val2 = it2.next().value // 2 <-- yield 2

// val2 ＊ 10也就是2 ＊ 10, 发送到第一个生成器实例it1，因此x得到值20,z从1增加到2，然后20 ＊ 2通过yield发出，将val1设置为40。
val1 = it1.next(val2 * 10).value; // 40 x: 20, z: 2 

// val1 ＊ 5也就是40 ＊ 5，发送到第二个生成器实例it2，因此x得到值200。z再次从2递增到3，然后200 ＊ 3通过yield发出，将val2设置为600。
val2 = it2.next(val1 * 5).value; // 600 x: 200 z: 3

// val2 / 2也就是600 / 2，发送到第一个生成器实例it1，因此y得到值300，
it1.next(val2 / 2); // y: 300

// 然后打印出x y z的值分别是20 300 3。
20 300 3

// val1 / 4也就是40 / 4，发送到第二个生成器实例it2，因此y得到值10，
i2.next(val1 / 4); // y:10

// 然后打印出x y z的值分别为200 10 3。
200 10 3
```