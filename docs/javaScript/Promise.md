# Promise

回调表达异步程序和管理并发的两个主要缺陷：缺乏顺序性和可信任性。既然已经对问题有了充分的了解，那么现在是时候把注意力转向可以解决这个问题的模式了。

我们首先想要解决掉的是控制反转问题，其中，信任很脆弱，也很容易失去。

回忆一下，我们用回调函数来封装程序中的continuation,然后把回调交给第三方（甚至可能是外部代码），接着期待其能够调用回调，实现正确的功能。

通过这种形式，我们表达的意思：这是将要作的事情，要在当前的步骤完成后发生。

但是，如果我们能够把控制反转再反转回来呢？会怎么样呢？如果我们不把自己程序的continuation传给第三方，而是第三方给我们提供了解任务何时结束的能力，
然后由我们自己的代码来决定下一步做什么，那将会怎么样呢？

这种范式就称为Promise。

随着开发者和规范撰写者绝望地清理他们的代码和设计中由回调地狱引发的疯狂行为，Promise风暴已经开始席卷JavaScript世界。

实际上，绝大多数JS/DOM平台新增的异步API都是基于Promise构建的。所以学习研究Promise应该是个好主意，你以为如何呢？！

本章经常会使用“立即”一词，通常用来描述某个Promise决议（resolution）动作。

但是，基本上在所有情况下，这个“立即”指任务队列行为（参见第1章）方面的意义，而不是指严格同步的现在。

## 1 什么是Promise

开发人员在学习新技术或模式时，通常第一步就是“给我看看代码”。对我们来说跳进去学习细节是自然的。

但是事实证明，只有了解API会丢失很多抽象的细节。Promise属于这一类工具：通过某人使用它的方式，很容易分辨他是真正理解了这门技术，还是仅仅学习和使用API而已。

所以，在展示Promise代码之前，我们先从概念上完整的解释Promise到底是什么。希望这能够更好地指导你今后将Promise理论集成到自己的异步流中。

明确这一点之后，我们先来查看以下关于Promise定义的两个不同类。

### 1.1 未来值

设想一下这样一个场景：我们走到快餐店的柜台，点了一个芝士汉堡。我交给收银员1.47美元。通过下订单并付款，我已经发出了一个对某个值（就是那个汉堡）的请求。
我已经启动了一次交易。

但是，通常我不能马上就得到这个汉堡。收银员会交给我某个东西来代替汉堡：一张带有订单号的收据，订单号就是一个IOU（I owe you，我欠你的）承诺（promise），保证了最终我会得到我的汉堡。

在等待的过程中，我可以做点其他的事情，比如给朋友发个短信：“嗨，要来和我一起吃午饭吗？我正要吃芝士汉堡。”

已经在想着未来的芝士汉堡了，尽管现在我还没有拿到手。我的大脑之所以可以这么做，是因为它已经把订单号当作芝士汉堡的占位符了。从本质上讲，这个占位符使得这个值不再依赖时间。这是一个未来值。

终于，我听到服务员在喊“订单113”，然后愉快地拿着收据走到柜台，把收据交给收银员，换来了我的芝士汉堡。

换句话说：**一旦我需要的值准备好了，我就用我的承诺值换取这个值本身**

但是，还可能有另一种结果。他们叫到了我的订单号，但当我过去拿芝士汉堡的时候，收银员满是歉意地告诉我：“不好意思，芝士汉堡卖完了。”除了作为顾客对这种情况感到愤怒之外，我们还可以看到未来值的一个重要特性：它可能成功，也可能失败。

每次点芝士汉堡，我都知道最终要么得到一个芝士汉堡，要么得到一个汉堡包售罄的坏消息，那我就得找点别的当午饭了。

#### 1.1.1 现在值与将来值

要把以上内容应用到代码里的话，前面的描述有点过于抽象，所以这里再具体说明一下。

但在具体解释Primose的工作方式之前，先来推导通过我们已经理解的方式————回调————如何处理未来值。

当编写代码要得到某个值的时候，比如通过数学计算，不管你有没有意识到，你已经对这个值做出了一些非常基本的假设，那就是，他已经是一个具体值：

```js
var x, y = 2;
console.log(x + y) // NaN 因为x还没有设定
```
运算x + y 假定了x 和 y 都已经设定。用术语简单地解释就是，这里我们假的x和y的值都是已决议的。

期待运算符+本身能够神奇地检测并等待x和y都决议好（也就是准备好）再进行运算是没有意义的。如果有的语句现在完成，而有的语句将来完成，那就会在程序里引起混乱，
对不对？

如果两条语句的任何一个（或全部）可能还没有完成，你怎么可能追踪这两条语句的关系呢？如果语句2依赖于语句1的完成，那么就只有两个输出：要么语句1马上完成，一切顺利执行；要么语句1还未完成，语句2因此也将会失败。

学完第1章之后，如果这种情况你听起来很熟悉的话，非常好！

让我们回到x + y这个算术运算。设想如果可以通过一种方式表达：“把x和y加起来，但如果它们中的任何一个还没有准备好，就等待两者都准备好。一旦可以就马上执行加运算。”

可能你已经想到了回调。好吧，那么……

```js
function add(getX, getY, cb) {
    var x, y;
    getX(function(xVal){
        x = xVal;
        // 两个都准备好了？
        if (y !== undefined) {
            cb(x + y) // 发送和
        }
    })
    getY(function(yVal){
        y = yVal;
        // 两个都准备好了？
        if (x !== undefined) {
            cb(x + y) // 发送和
        }
    })
}

add(fetchX, fetchY, function(sum) {
    console.log(sum)
})
```
先暂停片刻，认真思考一下这段代码的优美度（或缺少优美度，别急着喝彩）。

尽管其中的丑陋不可否认，但这种异步模式体现出了一些非常重要的东西。

在这段代码中，我们把x和y当作未来值，并且表达了一个运算add(..)。

这个运算（从外部看）不在意x和y现在是否都已经可用。换句话说，它把现在和将来归一化了，因此我们可以确保这个add(..)运算的输出是可预测的。

通过使用这个时间上一致的add(..)——从现在到将来的时间，它的行为都是一致的——大大简化了对这段异步代码的追踪。

说得更直白一些就是，为了统一处理现在和将来，我们把它们都变成了将来，即所有的操作都成了异步的。

当然，这个粗糙的基于回调的方法还有很多不足。要体会追踪未来值的益处而不需要考虑其在时间方面是否可用，这只是很小的第一步。

#### 1.1.2 Promise值

本章后面一定会深入介绍很多Promise的细节，因此这里如果读起来有些困惑的话，不必担心。我们先来大致看一下如何通过Promise函数表达这个x + y的例子：

```js
function add(xPromise, yPromise) {
    // Promise.all[..] 接受一个promise数组并返回一个新的promise
    // 这个新的promise等待数组中的所有promise完成
    return Promise.all([xPromise, yPromise])
    // 这个promise决议之后，我们取得收到的x,y的值加载一起
    .then(function(values) {
        // values是来自之前决议的promise消息数组
        return values[0] + values[1]
    })
}
// fetchX() 和 fetchY() 返回相应值的promise，可能已经就绪，也可能以后就绪

add(fetchX, fetchY)
// 我们得到一个这两个数组和的promise
// 现在链式调用then(..)来等待返回promise的决议
.then(function(sum) {
    console.log(sum); //这更简单
})
```
这段代码中有两层Promise。

fetchX()和fetchY()是直接调用的，它们的返回值（promise!）被传给add(..)。

这些promise代表的**底层值的可用时间可能是现在或将来**，但不管怎样，**promise归一保证了行为的一致性**。我们可以按照不依赖于时间的方式追踪值X和Y。它们是未来值。

第二层是add(..)(通过promise.all[..]) 创建并返回的promise。我们通过then(..)等待这个promise。add(..)运算完成后，未来值sum就准备好了，可以打印出来。
我们把等待未来值X和Y的逻辑隐藏在add(..)内部。

就像芝士汉堡订单一样，Promise的决议结果可能是拒绝而不是完成。拒绝值和完成的Promise不一样：完成值总是编程给出的，而拒绝值，通常称为拒绝原因（rejection reason），可能是程序逻辑直接设置的，也可能是从运行异常隐式得出的值。

通过Promise，调用then(..)实际上可以接受两个函数，第一个用于完成情况（如前所示），第二个用于拒绝情况：

```js
add(fetchX(), fetchY())
.then(
    // 完成处理函数
    function(sum) {
        console.log( sum );
    },
    // 拒绝处理函数
    function(err) {
        console.loh( err ); // 烦！
    }
)
```
如果在获取X或Y的过程中出错，或者在加法过程中出错，add(..)返回的就是一个被拒绝的promise，传给then(..)的第二个错误处理回调就会从这个promise中得到拒绝值。

从外部看，由于Promise封装了依赖于时间的状态——等待底层值的完成或拒绝，所以Promise本身是与时间无关的。因此，Promise可以按照可预测的方式组成（组合），而不用关心时序或底层的结果。

另外，一旦Promise决议，它就永远保持在这个状态。此时它就成为了不变值（immutable value），可以根据需求多次查看。

这是关于Promise需要理解的最强大也最重要的一个概念。经过大量的工作，你本可以通过丑陋的回调组合专门创建出类似的效果，但这真的不是一个有效的策略。
特别是你不得不一次又一次的重复操作。

Promise是一种封装和组合未来值的易用复用的机制。

### 1.2 完成事件

如前所述，单独的Promise展示了未来值的特性。但是，也可以从另一个角度看待Promise的决议：一种在异步任务中作为两个或更多步骤的流程控制机制，时序上的
this-then-that。

假定要调用一个函数foo(..)执行任务。我们不知道也不关心它的任何细节。这个函数可能立即完成任务，也能需要一段时间才能完成。

我们只需要知道foo(..)什么时候结束，这样就可以进行下一个任务。换句话说，我们想要通过某种方式在foo（..）完成的时候得到通知，以便可以继续下一步。

在经典的JS风格中，如果需要侦听某个通知，你可能会想到事件。因此，可以把对通知的需求重新组织为对foo(..)发生的一个完成事件的侦听。

使用回调的话，通知就是任务（foo(..)）调用的回调。而使用Promise的话，我们把这个关系反转了过来，侦听来自foo(..)的事件，然后在得到通知的时候，根据情况继续。

首先，考虑以下伪代码：

```js
foo(x) {
    // 开始做点可能耗时的事情
}
foo(42)
on(foo"completion") {
    // 可以进行下一步了
}
on(foo "error") {
    // 啊，foo(..)中出错了
}
```
我们调用foo(..),然后建立两个事件侦听器，一个用于“completion”，一个用于“error”————foo(..)调用的两个可能结果。从本质上将，foo(..)并不需要了解调用
代码订阅这些事件，这样就很好地实现了关注点分离。

遗憾的是，这样的的代码需要JS环境提供某种魔法，而这种环境并不存在（实际上有点不实际）。以下是在JS中更自然的表达方法。

```js
function foo(x) {
    // 开始做点耗时的工作
    // 构建一个listener事件通知处理对象返回
    return listener;
}
var evt = foo(42);

evt.on("completion", function() {
    // 可以进行下一步了
})
evt.on("err", function() {
    // 出错了
})
```
foo(..)显示创建并返回一个事件订阅对象，调用代码得到这个对象，并且在其上注册了两个事件处理函数。

相对于面向回调的代码，这里的反转是显而易见的，而且这也是有意为之。这里没有把回调传给foo(..),

而是返回一个名为evt的事件注册对，由它来接受回调。

如果你回想一下第2章的话，应该还记得回调本身就表达了一种控制反转。

所以对回调模式的反转实际上是对反转的反转，或者称为反控制反转——把控制返还给调用代码，这也是我们最开始想要的效果。

一个重要的好处是，可以把这个事件侦听对象提供给代码中多个独立的部分；在foo(..)完成的时候，它们都可以独立地得到通知，以执行下一步：

```js
var evt = foo(42);
//让bar(..)侦听foo(..)的完成
bar(evt);

//并且让baz(..)侦听foo(..)的完成。
baz(evt);
```

对控制反转的恢复实现了更好的关注点分离，其中bar(..)和baz(..)不需要牵扯到foo(..)的调用细节。

类似地，foo(..)不需要知道或关注bar(..)和baz(..)是否存在，或者是否在等待foo(..)的完成通知。

从本质上说，evt对象就是分离的关注点之间一个中立的第三方协商机制。

Promise“事件”

你可能已经猜到，事件侦听对象evt就是Promise的一个模拟。

在基于Promise的方法中，前面的代码片段会让foo(..)创建并返回一个Promise实例，而且这个Promise会被传递到bar(..)和baz(..)。

考虑：

```js
function foo(x) {
    // 开始做一些可能耗时的工作
    // 构造并返回一个promise
    return new Promise(function(resolve, reject) {
        // 最终调用resolve() 或者 reject()
        // 这是这个promise的决议回调
    })
}

var p = foo (42);

bar(p);
baz(p)
```

你可能会猜测bar(..)和baz(..)的内部实现或许如下：

```js
function bar(fooPromise) {
    // 侦听foo(..)完成
    fooPromise.then(
        function(){
            // foo(..)已经完毕，所以执行bar(..)的任务
        },
        function(){
            // 出错
        }
    )
}
```
Promise决议并不一定要像前面将Promise看作为未来值查看时一样会涉及发送消息。它也可以只作为一种流程控制信号，就像前面这段代码的用法一样。

另外一种实现方式是：

```js
function bar() {

}

function oppsBar() {

}

var p = foo(42)
p.then(bar, oopsBar)
p.then(baz, oopsBar)
```

这里没有把promise传给bar(..)和baz(..),而是使用prmise控制bar和baz何时执行，如果执行的话。最主要的区别在于错误处理部分。

在第一段代码的方法里，不论foo(..)成功与否，bar(..)都会被调用。

并且如果收到了foo(..)失败的通知，它会亲自处理自己的回退逻辑。显然，baz(..)也是如此。

在第二段代码中，bar(..)只有在foo(..)成功时才会被调用，否则就会调用oppsBar(..)。baz(..)也是如此。

这两种方法本身并谈不上对错，只是各自适用于不同的情况。

不管哪种情况，都是从foo(..)返回的promise p来控制接下来的步骤。

另外，两段代码都以使用promise p调用then(..)两次结束。

这个事实说明了前面的观点，就是Promise（一旦决议）一直保持其决议结果（完成或拒绝）不变，可以按照需要多次查看。一旦p决议，不论是现在还是将来，下一个步骤总是相同的。

## 2 具有then方法的鸭子类型

在Promise领域，一个重要的细节是如何确定某个值是不是真正的Promise。或者更直接的说，它是不是一个行为类似于Promise的值？

既然Promise是通过 new Promise(..)语法创建的，那你可能就认为可以通过p instanceof Promise 来检查。但遗憾的是，这不足以作为检查方法，原因有很多。

其中最主要的是，Promise值可能是从其他浏览器窗口（iframe等）接收到的。这个浏览器窗口自己的Promise可能和当前窗口的/frame不同，因此这样的检查无法是被
Promise实例。

还有，库或框架可能会选择实现自己的Promise，而不是使用原生ES6 Promise实现。实际上，很有可能你是在早期根本没有Promise实现的浏览器中使用由库提供的Promise。

因此，识别Promise（或者行为类似于Promise的东西）就是定义某种称为thenable的东西，将其定义为任何具有then(..)方法的对象和函数。我们认为，任何这样的值就是Promise一致的thenable。

根据一个值的形态（具有哪些属性）对这个值的类型做出一些假定。

这种类型检查（type check）一般用术语鸭子类型（duck typing）来表示——“如果它看起来像只鸭子，叫起来像只鸭子，那它一定就是只鸭子”（参见本书的“类型和语法”部分）。于是，对thenable值的鸭子类型检测就大致类似于：

```js
if (p !== null && (typeof p === "object" && typeof p === "function") && typeof p.then === "function" ) {
    // 假定这个一个thenable!
} else {
    // 不是thenable
}
```

除了在多个地方实现这个逻辑有点丑陋之外，其实还有一些更深层次的麻烦。

如果你试图使用恰好有then(..)函数的一个对象或函数值完成一个Promise，但并不希望它被当作Promise或thenable，那就有点麻烦了，因为它会自动被识别为thenable，并被按照特定的规则处理.

即使你并没有意识到这个值有then(..)函数也是这样。比如：

```js
var o = { then: function() };

// 让v[[Prototype]]-link到o

var v = Object.create(o);

v.someStuff = "cool";
v.toherStuff = "not so cool";

v.hasOwnProperty("then"); // false
```
v看起来根本不像Promise或者thenable。它只是一个具有一些属性的简单对象。你可能只是想要像对其他对象一样发送这个值。

但你不知道的是，v还[[Prototype]]连接到了另一个对象o,而后者恰好有一个then(..)属性。所以thenable鸭子类型检测会把v认作一个thenable。

甚至不需要直接有意支持的：

```js
Object.prototype.then = function() {}
Array.prototype.then = function() {}
var v1 = { hello: "world" }
var v2 = ["hello", "world"]
```

v1和v2 都会被认作thenable。如果有任何其他代码无意或恶意给Object.prototype，Array.prototy或其他原生原型添加then(..)。

但是别忘了，在ES6之前，社区已经有一些著名的非Promise库恰好有名为then(..)的方法。这些库中有一部分选择了重命名自己的方法以避免冲突（这真糟糕！）。而其他的那些库只是因为无法通过改变摆脱这种冲突，就很不幸地被降级进入了“与基于Promise的编码不兼容”的状态。

标准决定劫持之前未保留的——听起来是完全通用的——属性名then。这意味着所有值（或其委托），不管是过去的、现存的还是未来的，都不能拥有then(..)函数，不管是有意的还是无意的；否则这个值在Promise系统中就会被误认为是一个thenable，这可能会导致非常难以追踪的bug。

## 3 Promise 信任问题
前面已经给出了两个很强的类比，用于解释Promise在不同方面为我们的异步代码。但如果止步于此的话，我们就错过了Promise模式构建的可能最重要的特性：信任。

未来值和完成事件这两个类比在我们之前探讨的代码模式中很明显。但是，我们还不能一眼就看出Promise为什么以及如何用于解决2.3节列出的所有控制反转信任问题。稍微深入探究一下的话，我们就不难发现它提供了一些重要的保护，重新建立了第2章中已经毁掉的异步编码可信任性。

先回顾一下只用回调编码的信任问题。把一个回调传入工具foo(..)时可能出现如下问题：

+ 调用回调过早
+ 调用回调过晚
+ 调用回调次数过少或过多
+ 未能传递传递需的环境和参数
+ 吞掉可能出现的错误和异常

Promise的特性就是专门用来为这些问题提供一个有效的可复用的答案。

### 3.1 调用过早

这个问题主要就是担心代码是否会引入类似Zalgo这样的副作用。
在这类问题中，一个任务有时同步完成，有时异步完成，这可能会导致竞态条件。

根据定义，Promise就不必担心这种问题，因为即使是立即完成的Promise（类似于new Promise(function(resolve){ resolve(42); })）也无法被同步观察到。

也就是说，**对一个Promise调用then(..)的时候，即使这个Promise已经决议，提供给then(..)的回调也总会被异步调用**

### 3.2 调用过晚

和前面类似，Promise创建对象调用resolve(..)或者reject(..)时，这个Promise的then(..)**注册的观察回调**就会被**自动调度**。可以确信，这些被调度的回调在下一个
异步事件点上一定会被触发。

同步查看是不可能的，所以一个同步任务链无法以这种方式运行来实现按照预期有效延迟另一个回调的发生。也就是说，一个Promise决议后，这个Promise上所有的通过then(..)注册的回调都会在下一个异步时机点上依次被立即调用（再次提醒，请参见1.5节）。这些回调中的任意一个都无法影响或延误对其他回调的调用。

```js
p.then(function() {
    p.then(function() {
        console.log("c")
    });
    console.log("A")
});
p.then(function() {
    console.log("B")
})
```
A B C

这里，"C"无法打断或抢占"B"，这是因为Promise的运作方式。

**Promise调度技巧**

但是，还有很重要的一点需要指出，有很多调度的细微差别。在这种情况下，两个独立的Promise上链接的回调相对顺序无法靠预测。

如果两个promise p1和p2都已经决议，那么p1.then(..);p2.then(..)应该最终会先调用p1的回调，然后是p2的那些。但还有一些微妙的场景
可能不是这样的，比如以下代码：
```js
var p3 = new Promise(function(resolve, reject) {
    resolve("B");
})

var p1 = new Promise(function(resolve, reject) {
    resolve(p3)
})

var p2 = new Promise(function(resolve, reject) {
    resolve("A")
})

p1.then(function(v) {
    console.log(v)
})
pe.then(function(v) {
    console.log(v)
})
// A B 而不是像你认为的那样BA
```
后面我们会深入介绍，但目前你可以看到，p1不是用立即值而是用另一个Promise p3决议，后者本身决议值为“B”。规定的行为是把p3展开到p1,但是是异步展开。
所以，在异步队列中，p1的回调排在p2后面。

要避免这样的细微区别带来的噩梦，永远不要依赖于不同的Promise间回调的顺序和调度。实际上，好的编码实际方案根本不会让多个回调的顺序有丝毫影响，可能的话
就要避免。

### 3.3 回调未调用

这个问题很常见，Promise可以通过几种途径解决。

首先，没有任何东西（甚至JS错误）能阻止Promise向你通知它的决议（如果它决议的化）。如果你对一个Promise注册了一个完成回调和一个拒绝回调，
那么Promise在决议时总是会调用其中的一个。

当然，如果你的回调函数本身包括JS错误，那可能就会看不到你期望的结果，但实际上回调还是被调用了。后面我们会介绍如何在回调错误时得到通知，
因为就连这些错误也不会被吞掉。

但是，如果Promise本身永远不会被决议呢？即使这样，Promise也提供了解决方案，其使用了一种称为竞态的高级抽象机制：
```js
// 用于超时一个Promise的工具
function timeoutPromise(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            reject("Timeout!");
        }, delay)
    })
}
// 设置foo()超时
Promise.race([foo(), timeoutPromise(3000)]).then(() => {

}, (err) => {

})
```
关于这个Promise超时模式还有更多细节需要考量，后面会深入讨论。

很重要的一点是，我们可以保证一个foo()有一个输出符号，防止其永久挂住程序。

### 3.4 调用次数过多或过少

根据定义，回调被调用的正确次数为1.“过少”的情况就是调用为0次，前面解决过的“未被”调用的是同一种情况

“过多”的情况很容易理解。Promise的定义方式使得它只能被决议一次。如果处于某种原因，Promise创建代码试图
调用resolve(..)或reject(..)多次，或者试图两者都调用，那么这个Promise将只会接受第一次决议，并默默地忽略
任何后续调用。

由于Promise只能被决议一次，所以任何通过then(..)注册的回调只会被调用一次。

当然，如果你把同一个回调注册了不止一次，那么它被调用次数和注册次数一样，响应只会被调用一次，但这个保证并不能
预防你搬起石头砸自己的脚。

### 3.5 未能传递参数/环境值

Promise 至多只能有一个决议值（完成或拒绝）。

如果你没有用任何值显示决议，那么这个值是undefined.这是JS常见的处理方式。但不管这个值是什么，无论当前或将来，它都会
被传给所有注册的回调。

还有一点需要清楚：如果使用多个参数调用resolve(..)或reject(..),第一个参数之后的所有参数都会被忽略。这看起来似乎违背了
我们前面介绍的保证，但实际上没有，因为这是对Promise机制的无效使用。对于这组API的其他无效使用，也是类似的保护处理，所有
这里的Promise的行为是一致的。

如果要传递多个值，你就必须要把它们封装在单个值中传递，比如通过一个数组或对象。

对环境来说，js中的函数总是保持其定义所在的作用域的闭包，所以它们当然可以继续访问你提供的环境状态。当然，对于只能回调的设计也是
这样，因此并不是Promise特有的优点————但不管怎么样，这仍是我们可以依靠的一个保证。

### 3.6 吞掉错误或异常

基本上，这部分是上个要点的再次说明。如果拒绝一个Promise并给出一个理由，这个值就会被传给拒绝回调。

不过在这里还有更多的细节需要研究。如果在Promise的创建过程中或查看其决议结果过程中的任何时间点上出现一个JS异常。比如一个TypeError或ReferenceError，
那这个异常会被捕捉，并且使这个Promise被拒绝。

举例来说：

```js
var p = new Promise(function(resolve, reject) {
    foo.bar() // foo未定义，所以会出错
    resove(42) // 永远不会到这
})
p.then(function fulfilled() {

},
function rejected() {

})
```
foo.bar()中发生的JavaScript异常导致了Promise拒绝，你可以捕捉并对其作出响应。

这是一个重要的细节，因为其有效解决了另外一个潜在的Zalgo风险，即出错可能会引起同步响应，而不出错则会是异步的。Promise甚至把JavaScript异常也变成了异步行为，进而极大降低了竞态条件出现的可能。

但是，如果Promise完成后在查看结果时（then(..)注册的回调中）出现了JavaScript异常错误会怎样呢？即使这些异常不会被丢弃，但你会发现，对它们的处理方式还是有点出乎意料，需要进行一些深入研究才能理解：

```js
var p = new Promise(function(resolve, reject) {
    resolve(42);
})

p.then(function fulfilled(msg){
    foo.bar();
    console.log(msg) //永远不会到这里
}， function rejected(err){

})
```

### 3.7 是可信任的Promise吗？

为什么Promise就比单纯使用回调更值得信任呢？

关于Promise的很重要但是常常被忽略的一个细节是，Promise对这个问题已经有一个解决方案。
包含在原生ES6 Promise实现中的解决方案就是Promise.resolve(..)。

如果向Promise.resolve(..)传递一个非Promise、非thenable的立即值，就会得到一个用这个值填充的promise。下面这种情况下，promise p1和promise p2的行为是完全一样的：
```js
var p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

var p2 = Promise.resolve(42);

```

而如果向 Promise.resolve()传递一个真正的promsie, 就会返回同一个promise。

```js
var p1 = Promise.resolve(42);
var p2 = Promise.resolve(p2);

p1 === p2 // true
```

如果向Promise.resolve(..)传递一个非Promise的thenable值，前者会试图展开这个值，而且展开过程会持续到提取出一个具体的非类Promise的最终值。

考虑：

```js
var p = {
    then: function(cb) {
        cb(42)
    }
}

p.then(function fulffilled(val){

}, function rejected(err) {

})
```

Promise.resolve(..)可以接受任何thenable，将其解封为它的非thenable值。

从Promise. resolve(..)得到的是一个真正的Promise，是一个可以信任的值。

如果你传入的已经是真正的Promise，那么你得到的就是它本身，所以通过Promise.resolve(..)过滤来获得可信任性完全没有坏处。

Promise.resolve(..)提供了可信任的Promise封装工具，可以链接使用：

```js
foo(42).then(function(v){
    console.log(v);
});

Promise.resolve(foo(42)).then(function(v) {
    console.log(v)
});

```

## 4 链式流

Promise固有行为特性：

+ 每次你对Promise调用then(..)，它都会创建并返回一个新的Promise，我们可以将其链接起来；

+ 不管从then(..)调用的完成回调（第一个参数）返回的值是什么，它都会被自动设置为被链接Promise（第一点中的）的完成。

没有消息传递的延迟序列对于Promise流程控制来说并不是一个很有用的示例。我们来考虑如下这样一个更实际的场景。

```js
// 假定工具ajax({url} , {callback}) 存在

function request(url) {
    return new Promise(function(resolve, reject) {
        ajax(url, resolve);
    })
}
request('heep').then(function(res) {
    return request("http2")
})
```

## 5 错误处理

## 6 Promise模式

## 7 Promise API概述

### 7.1 new Promise(..)构造器

### 7.2 Promise.resolve(..)和Promise.reject(..)

### 7.3 then(..)和catch(..)

### 7.4 Promise.all([ .. ])和Promise.race([ .. ])

## 8 Promise局限性

### 8.1 顺序错误处理

Promise设计中的一个局限性，即Promise链中的错误容易被忽略。

如果链中的任何一个步骤事实上进行了自身的错误处理（可能以隐藏或抽象的不可见的方式），那你的handleErrors(..)就不会得到通知。

这可能是你想要的——毕竟这是一个“已处理的拒绝”——

完全不能得到（对任何“已经处理”的拒绝错误的）错误通知也是一个缺陷，它限制了某些用例的功能。

### 8.2 单一值

### 8.3 单决议

### 8.4 惯性

```js
if (!Promise.wrap) {
    Promise.warp = function(fn) {
        return function() {
            var args = [].slice.call(arguments);
            return new Promise(function(resolve, reject) {
                fn.apply(
                    null, 
                    args.concat(function(err, v){
                        if (err) {
                            reject(err)
                        } else {
                            resolve(v)
                        }
                    })
                )
            })
        }
    }
}
```

### 8.5 无法取消的Promise