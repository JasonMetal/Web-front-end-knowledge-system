  # es6
  
  ## let 和 const

  ### 特性

  1. 不会被提升
  ```js
  if (false) {
      let value = 1
  }
  console.log(value) // ReferenceError: value is not defined
  ```
  2. 重复声明报错
  ```js
  var value = 1;
  let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared
  ```
  3. 不绑定全局作用域
  
  在全局作用域使用var的时候，会创建一个新的全局变量作为全局对象的变量。

  ```js
  var value = 1;
  console.log(window.value)
  ```
  然而`let` 和`const`不会
  ```js
  let value = 1;
  const value2 = 2
  console.log(window.value); // undefined
  console.log(window.value2); // undefined
  ```

  ### const 与 let的区别

  const用于声明常量，一旦绑定就不允许修改，否则报错。

  虽然const 不允许修改绑定，但是允许修改对象的值.

  ```js
  const obj = {
    value: 1
  }
  obj.value = 2;
  console.log(obj.value) // 2
  obj = {} // TypeError: invalid assignment to const `obj'
  ```

  ### 暂时性死区

  暂时性死区（Temporal Dead Zone），简写为 TDZ。

  let和const声明不会被提升到作用域顶部，如果在声明之前使用变量，则会报错.

  ```js
  console.log(value); // Uncaught ReferenceError: Cannot access 'value' before initialization
  let value = 1;
  ```

  ## 箭头函数
  
  ### 基本语法

  ```js
  let func = value => value;
  ```
  相当于
  ```js
  let func = function (value) {
    return value;
  };
  ```
  如果需要给函数传入多个参数：

  ```js
  let func = (a, b) => a * b;
  ```
  如果函数的代码块需要多条语句：
  ```js
  let func = (a, b) => { 
    return a * b 
  };
  ```
  如果需要直接返回一个对象：
  ```js
    let func = (a, b) => ({total: a * b });
  ```
  与变量解构结合：

  ```js
  let func = ({value, num}) => ({total: value * num})

  ```

  ### 与普通函数对比
  #### 没有this
  箭头函数没有this, 所以需要通过查找作用域链来确定this的值.
  举个例子: 做一个变色的按钮。
  ```js
  html: <button id="button">点击变色</button>
  js:
  function button(id) {
    this.element = querySelector('#' + id);
    this.bindEvent();
  }
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.element.style.backgroundColor = '#1abc9c'
    }, false);
  }
  ```
  这样的写法看似没问题，但点击按钮时会报错。 // this.element is undefined
  原因是：当addEventListener给一个元素注册事件的时候，事件中的this指向了该元素。
  所以可能会想直接就这样
  ```js
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.style.backgroundColor = '#1abc9c'
    }, false);
  }
  ```
  但是实际开发中，可能还需要
  ```js
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.style.backgroundColor = '#1abc9c';
      this.setElementColor()
    }, false);
  }
  ```
  此时，需要做的是把this指向实例，这样就可以调用其他的函数了。
  利用 ES5，一般会这样做：
  ```js
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.style.backgroundColor = '#1abc9c';
      this.setElementColor()
    }.bind(this), false);
  }
  ```
  利用 es6就更方便了，由于箭头函数没有this，所以会查询到外层函数this,
  即例子中的bindEvent的this，所以可以写成这样
  ```js
  Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", function() {
      console.log(this) // 此时this指向该元素
      this.style.backgroundColor = '#1abc9c';
      this.setElementColor()
    }.bind(this), false);
  }
  ```

  #### 没有 arguments
  箭头函数没有自己的 arguments 对象，这不一定是件坏事，因为箭头函数可以访问外围函数的 arguments 对象：
  ```js
  function constant() {
      return () => arguments[0]
  }

  var result = constant(1);
  console.log(result()); // 1
  ```
  那如果我们就是要访问箭头函数的参数呢？

  你可以通过命名参数或者 rest 参数的形式访问参数:
  ```js
  let nums = (...nums) => nums;
  ```

  ## Promise
  ### promise起源

  回调：
  ```js
  doA( function(){
      doB();

      doC( function(){
          doD();
      } )

      doE();
  } );

  doF();
  ```
  当然这是一种简化的形式，经过一番简单的思考，我们可以判断出执行的顺序为：
  ```js
  doA()
  doF()
  doB()
  doC()
  doE()
  doD()
  ```
  实际的项目中，代码会更加杂乱。为了排查问题需要绕过很多碍眼的内容，排查问题的难度成倍增加。
  这还不是最糟糕的，实际上在代码中还有各种各样的逻辑判断，比如在上面例子中，doD() 必须在 doC() 完成后才能完成。
  如果doC() 执行失败并不可能重试 doC()或者直接转到其他错误处理函数中。
  当我们将这些判断都加入到这个流程中，代码就会变得非常复杂。

  回调地狱

  回调地狱的示例：
  ```js
  var fs = require('fs');
  var path = require('path');

  function findLargest(dir, cb) {
      // 读取目录下的所有文件
      fs.readdir(dir, function(er, files) {
          if (er) return cb(er);

          var counter = files.length;
          var errored = false;
          var stats = [];

          files.forEach(function(file, index) {
              // 读取文件信息
              fs.stat(path.join(dir, file), function(er, stat) {

                  if (errored) return;

                  if (er) {
                      errored = true;
                      return cb(er);
                  }

                  stats[index] = stat;

                  // 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作
                  if (--counter == 0) {

                      var largest = stats
                          .filter(function(stat) { return stat.isFile() })
                          .reduce(function(prev, next) {
                              if (prev.size > next.size) return prev
                              return next
                          })

                      cb(null, files[stats.indexOf(largest)])
                  }
              })
          })
      })
  }
  ```

  回调地狱的其他问题：

  1. 难以复用

  回调的顺序确定下来之后，某些环节很困难进行复用。

  2. 堆栈信息被断开

  JavaScript引擎维护了一个执行上下文栈。当函数执行的时候，会创建该函数的执行上下文压入栈中；执行完毕后，会将该执行上下文出栈。

  如果在A函数中调用了B函数，会先将A函数的执行上下文压入栈中，再将B函数的执行上下文压入栈中。
  当B函数执行完毕，将B函数执行上下文出栈；当A函数执行完毕后，将 A 函数执行上下文出栈。
  如果中断代码执行，还可以检索完整的堆栈信息从中获取的信息。

  可是异步回调函数并非如此，比如执行fs.readdir时会将回调函数加入任务队列中后继续执行。
  直至主线程完成后，从任务队列中选择已经完成的任务加入栈中。
  此时栈中只有这一个执行上下文，如果回调报错也无法获取调用该异步操作时的栈中信息。
  此外，由于异步的缘故使用try catch语句也无法直接捕获错误。Promise也没有解决这个问题。

  3. 借助外层变量

  当多个异步同时进行，由于无法预期完成顺序，必须借助外层作用域的变量。
  比如这里遍历读取文件信息，必须借助外层的 count、errored、stats 等。

  缺点：
  
  （1）编写麻烦；

  （2）如果忽略文件读取错误时，不会记录错误状态就接着读取其他文件，造成无谓的浪费；

  （3）外层的变量，也可能被其它同一作用域的函数访问并且修改，容易造成误操作。

  由于异步回调函数种种不利的原因，Promise便孕育而生，它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。
  ### Promise含义
  Promise是JavaScript中的一种异步解决方案，比传统的回调函数更加合理强大。

  特点：
  
  1. 对象的状态不受外界的影响

  Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
  只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

  2. 一旦状态改变，就不会再变，任何时候都会得到这个结果

  Promise对象状态改变有两种可能：pending（进行中）到fulfilled（已成功）、pending（进行中）到rejected（已失败）。
  只要这两种情况发生，状态就凝固了。如果状态发生改变，你再对Promise对象添加回调函数，会立即得到结果。

  缺点：

  1. 无法取消，Promise一旦新建就立即执行，无法中途取消。

  2. 无法得知Promise内部抛出的错误，无法反映到外部。

  3. 无法得知pedding状态时，进行到哪个阶段。

  ### 基本用法

  创建一个Promise实例的写法。

  ```js
  const promise = new Promise(function(resolve, reject) {
    // ... some code
    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  } )
  ```

  Promise对象接收一个函数作为参数，该函数的参数分别为resolve和reject。

  1. resolve的作用是将Promise的状态从 pedding 过渡到 resolved。在异步操作成功时调用。

  2. resolve的作用是将Promise的状态从 pedding 过渡到 reject。在失败时调用。

  Promise实例生成以后，可以用`then`方法分别指定resolved状态和rejected状态的回调函数。

  ```js
  promise.then(function(value){
    alter(value)
  },function(error){
    alter(error)
  })
  ```

  `then`方法接收两个函数：

  第一个是Promise对象的状态变为resolved时调用。

  第二个是Promise对象的状态变为rejected时调用。（可选）

  接下来看一个promise的例子

  ```js
   function timeout(ms) {
     return new Promise(function(resolve, reject) {
       setTimeout(resolve, ms, 'done');
     })
   }
   timeout(1000).then(function(value) {
     alter(value) // done
   })
  ```
  上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。
  过了指定的时间（ms参数）以后，Promise实例的状态变为resolved，就会触发then方法绑定的回调函数。

  ### Promise.prototype.catch()

  Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

  ```js
  getJSON('/posts.json').then(function(posts) {
    // ...
  }).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
  })
  ```
  上面代码中，getJSON()方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then()方法指定的回调函数；
  如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。
  另外，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获。

  ```js
  const promise = new Promise(function(resolve, reject) {
    resolve('ok');
    throw new Error('test');
  });

  promise
    .then(function(value) { console.log(value) })
    .catch(function(error) { console.log(error) });
  // ok
  ```
  上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

  ```js
  getJSON('/post/1.json').then(function(post) {
    return getJSON(post.commentURL);
  }).then(function(comments) {
    // some code
  }).catch(function(error) {
    // 处理前面三个Promise产生的错误
  });
  ```
  Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。
  也就是说，错误总是会被下一个catch语句捕获。上面代码中，一共有三个 Promise 对象：一个由getJSON()产生，两个由then()产生。
  它们之中任何一个抛出的错误，都会被最后一个catch()捕获。

  ### Promise.prototype.finally() 

  finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

  ```js
  promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
  ```

  ### Promise.all()
  
  Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

  ```js
  const p = Promise.all([p1, p2, p3]);
  ```
  p1、p2、p3都是 Promise 实例

  p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled

  只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected

  ### Promise.race()

  Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

  ```js
  const p = Promise.race([p1, p2, p3]);
  ```
  只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
  那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

  ### Promise.allSettled()
  只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。

  ```js
  const promises = [
    fetch('/api-1'),
    fetch('/api-2'),
    fetch('/api-3'),
  ];

  await Promise.allSettled(promises);
  removeLoadingIndicator();
  ```
  上面代码对服务器发出三个请求，等到三个请求都结束，不管请求成功还是失败，加载的滚动图标就会消失。

  ### Promise.any()
  只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态。
  如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

  ### Promise.resolve()

  有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。

  ```js
  const jsPromise = Promise.resolve($.ajax('/whatever.json'));
  ```

  ### 应用

  加载图片

  ```js
  const preloadImage = function (path) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.onload  = resolve;
      image.onerror = reject;
      image.src = path;
    });
  };
  ```
  Generator 函数与 Promise 的结合
  
  ```js
  function getFoo () {
    return new Promise(function (resolve, reject){
      resolve('foo');
    });
  }

  const g = function* () {
    try {
      const foo = yield getFoo();
      console.log(foo);
    } catch (e) {
      console.log(e);
    }
  };

  function run (generator) {
    const it = generator();

    function go(result) {
      if (result.done) return result.value;

      return result.value.then(function (value) {
        return go(it.next(value));
      }, function (error) {
        return go(it.throw(error));
      });
    }

    go(it.next());
  }

  run(g);
  ```

  ### Promise 模拟实现

  #### 链式调用
  
  根据前面提到的promise概念以及例子，分析 Promise链式调用的实现：

  一、拥有三种状态（1）pendding（2）resolve (3) reject

  二、Promise 是一个对象，new申明。用原型继承的编写。

  三、参数是一个函数，该函数还有两个自带的函数参数resolve，reject。

  1. resolve 是一个微任务，能将状态变成FULFILLED，将value传递给then方法的参数

  2. reject 是一个微任务，能将状态变成REJECTED。

  四、能够通过resolve或reject，将参数传递给then方法。
  ```js
  //定义三种状态
  const PENDING = "pending";
  const FULFILLED = "fulfilled";
  const REJECTED = "rejected";

  function Promise2(fn) {
    this.value = null;
    this.error = null; 
    // 状态
    this.status = PENDING;
    // then的中成功的回调函数
    this.onFulfilled = null;
    // then的中失败的回调函数
    this.onRejected = null;
    const resolve = (value) => {
      if (this.status === PENDING) return;
      setTimeout(() => {
        this.status = FULFILLED;
        this.value = value;
        // 执行then中的回调函数，并传值。
        this.onFulfilled(value)
      })
    }
    const reject = (error) => {
      if (this.status === PENDING) return;
      setTimeout(() => {
        this.status = REJECTED;
        this.error = error;
        // 执行then中的回调函数，并传值。
        this.onRejected(value)
      })
    }
    // 参数是一个函数，该函数两个自带的函数参数resolve，reject。
    fn(resolve, reject)
  }
  Promise2.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === PENDING) {
      // 执行第一轮宏任务，将then中的回调赋值，用与执行微任务 resolve 时调用。
      this.onFulfilled = onFulfilled;
      this.onRejected = onRejected;
    } else if (this.status === FULFILLED) {
      //如果状态是fulfilled，直接执行成功回调，并将成功值传入
      onFulfilled(this.value)
    } else {
      //如果状态是rejected，直接执行失败回调，并将失败原因传入
      onRejected(this.error)
    }
  }
  ```
  目前这一版的 Promise, 存在一些问题的.
  比如下面这样:
  
  ```js
  let promise1 = new Promise2((resolve, reject) => {
    fs.readFile('./001.txt', (err, data) => {
      if(!err){
        resolve(data);
      }else {
        reject(err);
      }
    })
  });

  let x1 = promise1.then(data => {
    console.log("第一次展示", data.toString());    
  });

  let x2 = promise1.then(data => {
    console.log("第二次展示", data.toString());    
  });

  let x3 = promise1.then(data => {
    console.log("第三次展示", data.toString());    
  });
  ```
  只能执行一个回调函数。

  需要将 onFulfilled 和 onRejected 改为数组，调用 resolve 时将其中的方法拿出来一一执行即可。

  ```js
  Promise2.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    } else if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else {
      onRejected(this.error);
    }
    return this;
  }
  ```
  接下来将 resolve 和 reject 方法中执行回调的部分进行修改：

  ```js
  // resolve 中
  this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
  // reject 中
  this.onRejectedCallbacks.forEach((callback) => callback(this.error));
  ```

  依然存在另外一个问题.
  ```js
  let readFilePromise = (filename) => {
    return new Promise2((resolve, reject) => {
      resolve(filename)
    })
  }
  readFilePromise('./001.txt').then(data => {
    console.log(data);
    return readFilePromise('./002.txt');
  }).then(data => {
    console.log(data);
  })
  // 001.txt的内容
  // 001.txt的内容
  ```
  问题出在这里:
  ```js
  Promise2.prototype.then = function(onFulfilled, onRejected) {
    //...
    return this;
  }
  ```
  这么写每次返回的都是第一个 Promise。then 函数当中返回的第二个 Promise 直接被无视了。
  
  接着改版
  ```js
  Promise2.prototype.then = function (onFulfilled, onRejected) {
    let bridgePromise;
    if (this.status === PENDING) {
      return bridgePromise = new Promise2((resolve, reject) => {
        this.onFulfilledCallbacks.push((value) => {
          try {
            // 看到了吗？要拿到 then 中回调返回的结果。
            let x = onFulfilled(value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push((error) => {
          try {
            let x = onRejected(error);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      }.bind(this));
    }
    //...
  }
  ```
  但是这段程度还是存在一些问题:

  1. 首先 then 中的两个参数不传的情况并没有处理，
  
  2. 假如 then 中的回调执行后返回的结果(也就是上面的x)是一个 Promise, 直接给 resolve 了。

  先对参数不传的情况做判断:

  ```js
  // 成功回调不传给它一个默认函数
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
  // 对于失败回调直接抛错
  onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
  ```

  然后对返回Promise的情况进行处理:

  ```js
  function resolvePromise(bridgePromise, x, resolve, reject) {
    //如果x是一个promise
    if (x instanceof Promise2) {
      // 拆解这个 promise ，直到返回值不为 promise 为止
      if (x.status === PENDING) {
        x.then(y => {
          resolvePromise(bridgePromise, y, resolve, reject);
        }, error => {
          reject(error);
        });
      } else {
        x.then(resolve, reject);
      }
    } else {
      // 非 Promise 的话直接 resolve 即可
      resolve(x);
    }
  }
  ```
  然后在 then 的方法实现中作如下修改:

  ```js
  resolve(x)  ->  resolvePromise(bridgePromise, x, resolve, reject);
  ```
  实现一下当 Promise 状态不为 PENDING 时的逻辑。

  成功状态下调用then：

  ```js
  if (this.status === FULFILLED) {
    return bridgePromise = new Promise((resolve, reject) => {
      try {
        // 状态变为成功，会有相应的 self.value
        let x = onFulfilled(this.value);
        // 暂时可以理解为 resolve(x)，后面具体实现中有拆解的过程
        resolvePromise(bridgePromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    })
  }
  ```
  失败状态下调用then：

  ```js
  if (this.status === REJECTED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      try {
        // 状态变为失败，会有相应的 self.error
        let x = onRejected(this.error);
        resolvePromise(bridgePromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }
  ```
  Promise A+中规定成功和失败的回调都是微任务，由于浏览器中 JS 触碰不到底层微任务的分配。
  可以直接拿 setTimeout(属于宏任务的范畴) 来模拟，用 setTimeout将需要执行的任务包裹。
  大家注意一下，其实并不是真正的微任务。

  ```js
  if (self.status === FULFILLED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        //...
      })
  }
  ```
  ```js
    if (self.status === REJECTED) {
      return bridgePromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          //...
        })
    }
  ```
  ```js
    // 001.txt的内容
    // 002.txt的内容
  ```
  可以看到，已经可以顺利地完成链式调用。

  #### 错误捕获及冒泡机制分析

  现在来实现 catch 方法:

  ```js
  Promise2.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
  }
  ```
  catch 是 then 方法的语法糖。

  至此，Promise 三大法宝: 回调函数延迟绑定、回调返回值穿透和错误冒泡。

  ## Generator

  ### 基本概念
  Generator（生成器） 是ES6引入的一种异步编程方案。

  Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

  执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
  返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

  形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

  ```js
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }

  var hw = helloWorldGenerator();
  ```
  下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
  也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
  换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
  ```js
  hw.next()
  // { value: 'hello', done: false }

  hw.next()
  // { value: 'world', done: false }

  hw.next()
  // { value: 'ending', done: true }

  hw.next()
  // { value: undefined, done: true }
  ```
  总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。
  以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
  value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

  ### yield* 表达式

  当一个生成器要调用另一个生成器时，使用 yield* 就变得十分方便。比如下面的例子:

  ```js
  function* gen1() {
      yield 1;
      yield 4;
  }
  function* gen2() {
      yield 2;
      yield 3;
  }
  ```
  我们想要按照1234的顺序执行，如何来做呢？

  在 gen1 中，修改如下:

  ```js
  function* gen1() {
      yield 1;
      yield* gen2();
      yield 4;
  }
  ```
  这样修改之后，之后依次调用next即可。

  ### Generator 与协程

  协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。
  协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。

  **（1）协程与子例程的差异**

  传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。
  协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。
  也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

  从实现上看，在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，也就是说，协程是以多占用内存为代价，实现多任务的并行。

  **（2）协程与普通线程的差异**

  不难看出，协程适合用于多任务运行的环境。
  在这个意义上，它与普通的线程很相似，都有自己的执行上下文、可以分享全局变量。
  它们的不同之处在于，同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。
  此外，普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。

  由于 JavaScript 是单线程语言，只能保持一个调用栈。
  引入协程以后，每个任务可以保持自己的调用栈。
  这样做的最大好处，就是抛出错误的时候，可以找到原始的调用栈。
  不至于像异步操作的回调函数那样，一旦出错，原始的调用栈早就结束。

  Generator 函数是 ES6 对协程的实现，但属于不完全实现。
  Generator 函数被称为“半协程”（semi-coroutine），意思是只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数。
  如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

  如果将 Generator 函数当作协程，完全可以将多个需要互相协作的任务写成 Generator 函数，它们之间使用yield表达式交换控制权。

  ### Generator 与上下文

  JavaScript 代码运行时，会产生全局的上下文环境，包含当前所有的变量和对象。
  然后，执行函数时又会在当前上下文环境的上层，产生一个函数运行的上下文，变成
  当前上下文，由此形成一个上下文环境的堆栈（context stack）。

  这个堆栈是“先进后出”的数据结构，最后产生的上下文环境在最上层，执行结束后先退出堆栈
  然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

  Generator不是这样，它执行产生执行上下文，一旦遇到yield命令，就会暂时退出堆栈，但不会消失，
  里面所有的变量都会冻结当前状态。等到对它执行next命令后加入堆栈，冻结的变量和对象恢复。
  
  ```js
  function* gen() {
    yield 1;
    return 2;
  }

  let g = gen();

  console.log(
    g.next().value,
    g.next().value,
  );
  ```
  上面代码中，第一次执行g.next()时，Generator 函数gen的上下文会加入堆栈，即开始运行gen内部的代码。
  等遇到yield 1时，gen上下文退出堆栈，内部状态冻结。第二次执行g.next()时，gen上下文重新加入堆栈，变成当前的上下文，重新恢复执行。

  ###  Generator 的自执行

  **单个异步任务**
  ```js
  var fetch = require('node-fetch');

  function* gen(){
      var url = 'https://api.github.com/users/github';
      var result = yield fetch(url);
      console.log(result.bio);
  }
  ```
  为了获得最终的执行结果，你需要这样做：

  ```js
  var g = gen();
  var result = g.next();

  result.value.then(function(data){
      return data.json();
  }).then(function(data){
      g.next(data);
  });
  ```
  首先执行 Generator 函数，获取遍历器对象。

  然后使用 next 方法，执行异步任务的第一阶段，即 fetch(url)。

  注意，由于 fetch(url) 会返回一个 Promise 对象，所以 result 的值为：

  ```
  { value: Promise { <pending> }, done: false }
  ```
  最后为这个 Promise 对象添加一个 then 方法，先将其返回的数据格式化(data.json())，
  再调用 g.next，将获得的数据传进去，由此可以执行异步任务的第二阶段，代码执行完毕。

  **多个异步任务**
  ```js
  var fetch = require('node-fetch');

  function* gen() {
      var r1 = yield fetch('https://api.github.com/users/github');
      var r2 = yield fetch('https://api.github.com/users/github/followers');
      var r3 = yield fetch('https://api.github.com/users/github/repos');

      console.log([r1.bio, r2[0].login, r3[0].full_name].join('\n'));
  }
  ```
  为了获得最终的执行结果：

  ```js
  var g = gen();
  var result1 = g.next();

  result1.value.then(function(data){
      return data.json();
  })
  .then(function(data){
      return g.next(data).value;
  })
  .then(function(data){
      return data.json();
  })
  .then(function(data){
      return g.next(data).value
  })
  .then(function(data){
      return data.json();
  })
  .then(function(data){
      g.next(data)
  });
  ```
  其实，利用递归，可以这样写：
  ```js
  function run(gen) {
      var g = gen();

      function next(data) {
          var result = g.next(data);

          if (result.done) return;

          result.value.then(function(data) {
              return data.json();
          }).then(function(data) {
              next(data);
          });

      }

      next();
  }

  run(gen);
  ```
  其中的关键就是 yield 的时候返回一个 Promise 对象，给这个 Promise 对象添加 then 方法，
  当异步操作成功时执行 then 中的 onFullfilled 函数，onFullfilled 函数中又去执行 g.next。
  从而让 Generator 继续执行，然后再返回一个 Promise，再在成功时执行 g.next，然后再返回……

  **启动器函数**

  在 run 这个启动器函数中，then 函数中将数据格式化 data.json()。
  在更广泛的情况下，yield 直接跟一个 Promise，而非一个 fetch 函数返回的 Promise。
  所以为了更具备通用性，修改为：

  ```js
  var fetch = require('node-fetch');

  function* gen() {
      var r1 = yield fetch('https://api.github.com/users/github');
      var json1 = yield r1.json();
      var r2 = yield fetch('https://api.github.com/users/github/followers');
      var json2 = yield r2.json();
      var r3 = yield fetch('https://api.github.com/users/github/repos');
      var json3 = yield r3.json();

      console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'));
  }

  function run(gen) {
      var g = gen();

      function next(data) {
          var result = g.next(data);

          if (result.done) return;

          result.value.then(function(data) {
              next(data);
          });

      }

      next();
  }

  run(gen);
  ```
  **回调函数**

  yield 后一定要跟着一个 Promise 对象才能保证 Generator 的自动执行吗？如果只是一个回调函数呢？来看个例子：

  首先来模拟一个普通的异步请求：
  ```js
  function fetchData(url, cb) {
      setTimeout(function(){
          cb({status: 200, data: url})
      }, 1000)
  }
  ```
  将这种函数改造成:
  ```js
  function fetchData(url) {
      return function(cb){
          setTimeout(function(){
              cb({status: 200, data: url})
          }, 1000)
      }
  }
  ```
  对于这样的 Generator 函数：

  ```js
  function* gen() {
      var r1 = yield fetchData('https://api.github.com/users/github');
      var r2 = yield fetchData('https://api.github.com/users/github/followers');

      console.log([r1.data, r2.data].join('\n'));
  }
  var g = gen();

  var r1 = g.next();

  r1.value(function(data) {
      var r2 = g.next(data);
      r2.value(function(data) {
          g.next(data);
      });
  });
  ```
  利用递归, 将其改造为：
  ```js
  function run(gen) {
      var g = gen();

      function next(data) {
          var result = g.next(data);

          if (result.done) return;

          result.value(next);
      }

      next();
  }

  run(gen);
  ```
  **run**
  由此可以看到 Generator 函数的自动执行需要一种机制，即当异步操作有了结果，能够自动交回执行权。

  而两种方法可以做到这一点。

  （1）回调函数。将异步操作进行包装，暴露出回调函数，在回调函数里面交回执行权。

  （2）Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

  在两种方法中各有 run 启动器函数，需要将两种方式结合写一个通用的 run 函数，尝试一下：
  ```js
  // 第一版
  function run(gen) {
      var gen = gen();

      function next(data) {
          var result = gen.next(data);
          if (result.done) return;

          if (isPromise(result.value)) {
              result.value.then(function(data) {
                  next(data);
              });
          } else {
              result.value(next)
          }
      }

      next()
  }

  function isPromise(obj) {
      return 'function' == typeof obj.then;
  }

  module.exports = run;
  ```
  其实实现的很简单，判断 result.value 是否是 Promise，是就添加 then 函数，不是就直接执行。

  **return Promise**

  现在有一个问题需要思考，如何获得 Generator 函数的返回值呢？又如果 Generator 函数中出现了错误，就比如 fetch 了一个不存在的接口，这个错误该如何捕获呢？

  这很容易让人想到 Promise，如果这个启动器函数返回一个 Promise，就可以给这个 Promise 对象添加 then 函数。
  当所有的异步操作执行成功后执行 onFullfilled 函数，如果有任何失败，就执行 onRejected 函数。

  ```js
  // 第二版
  function run(gen) {
      var gen = gen();

      return new Promise(function(resolve, reject) {

          function next(data) {
              try {
                  var result = gen.next(data);
              } catch (e) {
                  return reject(e);
              }

              if (result.done) {
                  return resolve(result.value)
              };

              var value = toPromise(result.value);

              value.then(function(data) {
                  next(data);
              }, function(e) {
                  reject(e)
              });
          }

          next()
      })

  }

  function isPromise(obj) {
      return 'function' == typeof obj.then;
  }

  function toPromise(obj) {
      if (isPromise(obj)) return obj;
      if ('function' == typeof obj) return thunkToPromise(obj);
      return obj;
  }

  function thunkToPromise(fn) {
      return new Promise(function(resolve, reject) {
          fn(function(err, res) {
              if (err) return reject(err);
              resolve(res);
          });
      });
  }

  module.exports = run;
  ```
  与第一版有很大的不同：

  首先，我们返回了一个 Promise，当 result.done 为 true 的时候，将该值 resolve(result.value)，如果执行的过程中出现错误，被 catch 住，会将原因 reject(e)。

  其次，会使用 thunkToPromise 将回调函数包装成一个 Promise，然后统一的添加 then 函数。在这里值得注意的是，在 thunkToPromise 函数中，遵循了 error first 的原则，这意味着当处理回调函数的情况时：
  ```js
  // 模拟数据请求
  function fetchData(url) {
      return function(cb) {
          setTimeout(function() {
              cb(null, { status: 200, data: url })
          }, 1000)
      }
  }
  ```
  在成功时，第一个参数应该返回 null，表示没有错误原因。

  **优化**
  ```js
  function run(gen) {
    return new Promise(function(resolve, reject) {
        if (typeof gen == 'function') gen = gen();

        // 如果 gen 不是一个迭代器
        if (!gen || typeof gen.next !== 'function') return resolve(gen)

        onFulfilled();

        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function next(ret) {
            if (ret.done) return resolve(ret.value);
            var value = toPromise(ret.value);
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('You may only yield a function, promise ' +
                'but the following object was passed: "' + String(ret.value) + '"'));
        }
    })
  }

  function isPromise(obj) {
      return 'function' == typeof obj.then;
  }

  function toPromise(obj) {
      if (isPromise(obj)) return obj;
      if ('function' == typeof obj) return thunkToPromise(obj);
      return obj;
  }

  function thunkToPromise(fn) {
      return new Promise(function(resolve, reject) {
          fn(function(err, res) {
              if (err) return reject(err);
              resolve(res);
          });
      });
  }

  module.exports = run;
  ```

  **co**

  如果直接使用 co 模块，这两种不同的例子可以简写为：

  ```js
  // yield 后是一个 Promise
  var fetch = require('node-fetch');
  var co = require('co');

  function* gen() {
      var r1 = yield fetch('https://api.github.com/users/github');
      var json1 = yield r1.json();
      var r2 = yield fetch('https://api.github.com/users/github/followers');
      var json2 = yield r2.json();
      var r3 = yield fetch('https://api.github.com/users/github/repos');
      var json3 = yield r3.json();

      console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'));
  }

  co(gen);
  ```

  ## async/await

  async/await被称为 JS 中异步终极解决方案。
  它既能够像 co + Generator 一样用同步的方式来书写异步代码，又得到底层的语法支持，无需借助任何第三方库。
  接下来，从原理的角度来重新审视这个语法糖背后究竟做了些什么。

  ### 基本概念
    
  **async**
  ```
    MDN 的定义: async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。
  ```
  举个例子
  ```js
  async function func() {
      return 100;
  }
  console.log(func());
  // Promise {<resolved>: 100}
  ```
  这就是隐式返回 Promise 的效果。

  **await**

  await做了些什么事情。

  举个例子
  ```js
  async function test() {
    console.log(100)
    let x = await 200
    console.log(x)
    console.log(200)
  }
  console.log(0)
  test()
  console.log(300)
  ```
  来分析一下这段程序。首先代码同步执行，打印出0，然后将test压入执行栈，打印出100, 下面注意了，遇到了关键角色await。

  放个慢镜头:

  ```js
  await 100;
  ```
  被 JS 引擎转换成一个 Promise :

  ```js
  let promise = new Promise((resolve,reject) => {
    resolve(100);
  })
  ```
  这里调用了 resolve，resolve的任务进入微任务队列。

  然后，JS 引擎将暂停当前协程的运行，把线程的执行权交给父协程。

  回到父协程中，父协程的第一件事情就是对await返回的Promise调用then, 来监听这个 Promise 的状态改变 。
  ```js
  promise.then(value => {
    // 相关逻辑，在resolve 执行之后来调用
  })
  ```
  然后往下执行，打印出300。

  根据EventLoop机制，当前主线程的宏任务完成，现在检查微任务队列, 发现还有一个Promise的 resolve，执行，现在父协程在then中传入的回调执行。我们来看看这个回调具体做的是什么。

  ```js
  promise.then(value => {
    // 1. 将线程的执行权交给test协程
    // 2. 把 value 值传递给 test 协程
  })
  ```
  Ok, 现在执行权到了test协程手上，test 接收到父协程传来的200, 赋值给 a ,然后依次执行后面的语句，打印200、200。

  最后的输出为:

  ```js
  0
  100
  300
  200
  200
  ```
  总结一下，async/await利用协程和Promise实现了同步方式编写异步代码的效果，其中Generator是对协程的一种实现，虽然语法简单，但引擎在背后做了大量的工作.
  用async/await写出的代码也更加优雅、美观，相比于之前的Promise不断调用then的方式，语义化更加明显，相比于co + Generator性能更高，上手成本也更低。

# 编码规范
## 引用
1. 注意 let 和 const 都是块级作用域。
```js
// const 和 let 只存在于它们被定义的区块内。
{
  let a = 1;
  const b = 1;
}
console.log(a) // ReferenceError
console.log(b); // ReferenceError
```
## 对象
1. 创建动态属性名的对象时，使用可被计算的属性名称。
   为什么？因为这样可以让你在一个地方定义所有的属性。
```js
function getKey(key) {
  return `a key name ${key}`
}

// bad 
const obj = {
  id: 5,
  name: 'San Francisco'
}
obj[getKey('enabled')] = true;

// good 
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
}
```
2. 如果对象的键是字符串，请使用长格式语法
```js
// bad
const foo = {
  'bar-baz': {},
}
// good
const foo = {
  'bar-baz': function(){},
}
```
3. 在对象属性声明前把简写的的属性分组。
  为什么？因为这样能清楚的看出哪些属性使用了简写。
```js
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJedisWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJedisWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```
4. 禁止在对象中使用不必要的计算属性
```js
// bad
const a = {['0']: 0};
const a = { ['0+1,234']: 0 };
const a = { [0]: 0 };
const a = { ['x']: 0 };
const a = { ['x']() {} };

// good
const c = { a: 0 };
const c = { 0: 0 };
const a = { x() {} };
const c = { a: 0 };
const c = { '0+1,234': 0 };

```
5. 只允许引号标注无效标识符的属性
```js
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

## 数组 
1. 向数组添加元素时使用 Arrary#push 替代直接赋值。
```js
const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

2. 使用数组展开方法...来拷贝数组。
```js
// bad 
const len = items.length;
const itemsCopy = [];
let i ;

for (let i = 0; i < len; i+=1);{
  itemsCopy = item[i];
}

// good
const itemsCopy = [...items];
```

3. 将一个数组对象转成一个数组，使用展开方法``...``代替``Array.from``。

```js
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);


// best
const nodes = [...foo];
```

4. 在数组回调方法中使用return语句。 如果函数体由一个返回无副作用的表达式的单个语句组成，那么可以省略返回值。

```js
// bad 没有返回值，意味着在第一次迭代后acc没有被定义
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
   const flatten = acc.concat(item);
   acc[index] = flatten;
})

// bad
inbox.filter( msg => {
    const { subject, author } = msg;
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee';
    } else {
      return false;
    }
})

// good
inbox.filter( msg => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});

// good
[1, 2, 3].map(x => x + 1);

```

## 解构

1. 在访问和使用对象的多个属性的时候使用对象的解构
   为什么？因为对象解构可以避免为这些属性创建临时引用
```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

2. 对数组使用解构赋值
```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr; // first = 1  second = 2
const [, first, second] = arr;
```
3. 对于多个返回值使用对象解构，而不是数组解构。
  为什么？你可以随时添加新的属性或者改变属性的顺序，而不用修改调用方。
```js
// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// 调用时需要考虑回调数据的顺序。
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// 调用时只选择需要的数据
const { left, right } = processInput(input);
```

## 字符串
1. 静态字符串一律使用`''`。（如果不是引号嵌套，不要使用双引号）；
```js
// bad
const name = "Capt. Janeway";

// bad - 模板文字应该包含插值或换行。

const name = `Capt. Janeway`

// good
const name = 'Capt. Janeway';

```

2. 使行超过100个字符的字符串不应使用字符串连接跨多行写入。
  注：过度使用字符串连接符号可能会对性能造成影响。
```js
// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// good
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```

3. 模板字符串中的嵌入表达式两端不要存在空格
```js
// bad
`hello, ${ name}!`;
`hello, ${name }!`;
`hello, ${ name }!`;

// good
`hello, ${name}!`;
`hello, ${
    name
}!`;
```

4. 不要在转义字符串中不必要的字符
```js
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

## 函数
1. 使用函数声明代替函数表达式。
为什么？因为函数声明是可命名的，所以他们在调用栈中更容易被识别。此外，函数声明会把整个函数提升（hoisted），而函数表达式只会把函数的引用变量名提升。这条规则使得箭头函数可以取代函数表达式。

```js
// bad
const foo = function () {
};

// good
const short = function test() {
  // ...
};
const foo = () => {};

// best
function foo() {
}
```
2. 函数表达式:

```js
// 立即调用的函数表达式 (IIFE)
(() => {
  console.log('Welcome to the Internet. Please follow me.');
})();
```

3. 永远不要在一个非函数代码块（if, while 等）中申明一个函数，应该把那个函数赋给一个变量。浏览器允许你这么做，但它们的解析表现不一致。

4. ECMA-262 把 block 定义为一组语句。函数声明不是语句
```js
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

## 模块

1. 不要使用通配符导入。
为什么？这样能确保你只有一个默认 export。
```js
// bad 不报错
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

2. 确保import和export命名匹配

```js
// ./foo.js
export const foo = "I'm so foo";

// bad
// ./baz.js
import { notFoo } from './foo'

// good
// ./bar.js
import { foo } from './foo'

```

3. 模块导入顺序优先级注意。并且import优先级一定高于require。模块导入按照以下顺序

node模块(fs等)

外部模块(lodash等)

全局模块

父目录模块

当前目录模块

4. 如果一个模块仅有一个导出 请加上export default

```js
// bad
export const foo = 'foo';

// good
// example1
export const foo = 'foo';
const bar = 'bar';
export default 'bar';

// example2
export const foo = 'foo';
export const bar = 'bar';

// example3
const foo = 'foo';
const bar = 'bar';
export default { foo, bar }

// example4
const foo = 'foo';
export { foo as default }
```

7. 禁止使用default作为导入变量名，因为会与export default冲突发生错误。

8. 禁止使用绝对路径导入

```js
// bad
import f from '/foo';
import f from '/some/path';

const f = require('/foo');
const f = require('/some/path');

// good
import _ from 'lodash';
import foo from 'foo';
import foo from './foo';

const _ = require('lodash');
const foo = require('foo');
const foo = require('./foo');
```

9. 禁止使用AMD require/define。
为什么？因为ES6已经具备模块化，不需要再使用AMD规范了。
```js
// bad
define(["a", "b"], function (a, b) { /* ... */ });

require(["b", "c"], function (b, c) { /* ... */ });
```

10. 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字

```js
// bad
import { foo as foo } from "bar";

export { foo as foo };

export { foo as foo } from "bar";

let { foo: foo } = bar;
let { 'foo': foo } = bar;
function foo({ bar: bar }) {}
({ foo: foo }) => {}

import * as foo from "foo";
import { foo } from "bar";
import { foo as bar } from "baz";

export { foo };
export { foo as bar };
export { foo as bar } from "foo";

let { foo } = bar;
let { foo: bar } = baz;
let { [foo]: foo } = bar;

function foo({ bar }) {}
function foo({ bar: baz }) {}

({ foo }) => {}
({ foo: bar }) => {}

```

## 比较运算符和等号

1. 对于绝大多数的使用情况下，结果typeof操作是下列字符串常量之一："undefined"，"object"，"boolean"，"number"，"string"，"function"和"symbol"。将typeof运算符的结果与其他字符串文字进行比较通常是代码编写出现错误

```js
 //bad
typeof foo === undefined;
typeof bar == Object;
typeof baz === 'strnig';
typeof qux === 'some invalid type';
typeof baz === anotherVariable;
typeof foo == 5;

//good
typeof foo === 'undefined';
typeof bar == 'object';
typeof baz === 'string';
typeof bar === typeof qux;
```

## 类型转换
1. 在语句开始时执行类型转换

2. 字符串
```js
// => this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// good
const totalScore = String(this.reviewScore);

```

3. 禁止使用位操作运算符
当你使用位运算的时候要小心。 数字总是被以 64-bit 值 的形式表示，但是位运算总是返回一个 32-bit 的整数。 对于大于 32 位的整数值，位运算可能会导致意外行为。 最大的 32 位整数是： 2,147,483,647。
```js
// bad
var test = y | z;
var test = y & z;
x |= y;
x &= y;
var test = y ^ z;
var test = ~ z;
var test = y << z;
var test = y >> z;

// good
var test = y || z;
var test = y && z;
var test = y > z;
var test = y < z;
test += y;
```

## 命名规则

1. 避免单字母命名。命名应具备描述性。

```js
// bad 不报错但不推荐使用
function q() {
  // ...stuff...
}

// good
function query() {
  // ..stuff..
}
```

2. 如果你的文件只输出一个类，那你的文件名必须和类名完全保持一致。

```js
// file contents
class CheckBox {
  // ...
}
export default CheckBox;

// in some other file
// bad
import CheckBox from './checkBox';

// bad
import CheckBox from './check_box';

// good
import CheckBox from './CheckBox';
```

3. 当你导出默认的函数时使用驼峰式命名。你的文件名必须和函数名完全保持一致。

```js
function makeStyleGuide() {
}

export default makeStyleGuide;
```

4. 当你导出单例、函数库、空对象时使用帕斯卡式命名。

```js
const AirbnbStyleGuide = {
  es6: {
  }
};

export default AirbnbStyleGuide;
```

## 存取器
1. 对于属性的存取函数不是必须的。

2. 如果你需要存取函数时使用 getVal() 和 setVal('hello')。

不要使用 JavaScript 的 getters/setters 方法，因为它们会导致意外的副作用，并且更加难以测试、维护和推敲。

```js
// bad
dragon.age();

// good
dragon.getAge();

// bad
dragon.age(25);

// good
dragon.setAge(25);
```

3. 如果属性是布尔值，使用 isVal() 或 hasVal()。

```js
// bad
if (!dragon.age()) {
  return false;
}

// good
if (!dragon.hasAge()) {
  return false;
}
```

4. 创建 get() 和 set() 函数是可以的，但要保持一致。

```js
class Jedi {
  constructor(options = {}) {
    const lightsaber = options.lightsaber || 'blue';
    this.set('lightsaber', lightsaber);
  }

  set(key, val) {
    this[key] = val;
  }

  get(key) {
    return this[key];
  }
}
```
