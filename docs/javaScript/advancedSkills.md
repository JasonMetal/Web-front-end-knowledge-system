# 高级技巧
  ## 函数柯里化
  用于创建已经设置好了一个或多个参数的函数。使用一个闭包返回一个函数。在函数被调用时，
  返回的函数需要设置一些传入的参数。请看以下例子。
  ```js
    function add(num1, num2) {
      return num1 + num2;
    }

    function curriedAdd(num2) {
      return add(5, num2)
    }

    alert(add(2, 3)); // 5
    alert(curriedAdd(3)) // 8
  ```
  这段代码定义了两个函数 add() 和 curriedAdd()。后者本质上是在任何情况下第一个参数为5
  的add（）版本。尽管从技术上来说curriedAdd并非柯里化的函数，但它很好的展示了其概念。

  柯里化函数通常由以下步骤动态创建：调用另一个函数并为它传入要柯里化的函数和必要参数。
  ```js
  function curry(fn) {
    // 
    var args = Array.prototype.slice.call(arguments, 1); 
    return function() {
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      return fn.apply(null, finalArgs)
    }
  }
  ```
  curry函数的主要工作就是将被返回的函数参数进行排序。curry()的第一个参数是要进行柯里化
  的函数，其他参数是要传入的值。
  
  ## 深浅拷贝

  首先可以通过 Object.assign 来解决这个问题。
  ```js
  let obj1 = {

  };
  let obj2 = Object.assign({}, obj1)
  obj1.name = 'wzx'
  console.log(obj1.name)
  console.log(obj2.name) // undefined
  ```
  当然我们也可以通过展开运算符（…）来解决
  ```js
  let obj1 = {
    name = 'wzx'
  };
  let obj2 = {
    ...obj1
  }
  obj1.name = 'wzx'
  console.log(obj2.name) // undefined
  ```
  通常情况下浅拷贝能解决大部分问题，但是当我们遇到以下问题时，就需要使用深拷贝了

  ```js
    let person = {
        age: 12,
        jobs: {
            first: 'FE'
        }
    }
    let person2 = {...person}
    person.jobs.first = 'native'
    alert(person2.jobs.first) // 'native'
  ```
  这个问题通常可以通过 JSON.parse(JSON.stringify(object)) 来解决。
  ```js
    let person = {
        age: 12,
        jobs: {
            first: 'FE'
        }
    }
    let person2 = JSON.parse(JSON.stringify(person))
    person.jobs.first = 'native'
    alert(person2.jobs.first) // 'native'
  ```
  但是该方法也是有局限性的：
  1. 会忽略 undefined
  2. 会忽略 symbol
  3. 不能序列化函数
  4. 不能解决循环引用的对象

  为了解决以上问题，再来看一版：
  ```js
  function deepCopy(obj) {
    if (typeof obj !== 'obj') return;
    const newObj = obj instanceof Array ? [] : {}
    for(let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = typeof obj[key] === 'object' ? deepCopy[key] : obj[key]
      }
    }
    return newObj;
  }
  ```
  更加完善的拷贝可以看高级技巧中的从零实现jQuery的extend。
  ## 节流

  节流原理：触发一个事件，每隔一个时段只能触发一次。

  根据首次是否执行以及结束后是否执行。

  ### 使用时间戳

  原理：取出当前的时间戳，减去之前保存的时间戳（初始值0），如果大于设置的时间周期则执行。
  更新保存时间戳为当前时间，如果小于则不执行。

  ```js
    function throttle (func, wait) {
      var context, 
      saveTime = 0;
      return function () {
        var args = arguments;
        var context = this;
        var now = +new Date()
        if ( now - saveTime > wait ) {
          func.apply(context, args)
          saveTime = now;
        }
      }
    }
  ```

  ### 使用定时器
  ```js
  function throttle (func, wait) {
    var context;
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      if (!timeout) {
        setTimeout(function() {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
  }
  ```

  ### 双剑合璧
  ```js
  function throttle (func, wait) {
    var context;
    var timeout;
    var args;
    var previous = 0;
    var later =  function () {
      previous = +new Date();
      timeout = null;
      func.apply(context, args)
    }
    return function() {
      var now = +new Date()
      var remaining = wait - (now - previous);
      context = this;
      args = arguments
      // 剩余的时间或修改了系统时间
      if (remaining <=0 || remaining > wait ) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        previous = now;
        func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
    }
  }
  ```
  ### 优化

  无头有尾，或者有头无尾，这个咋办？
  leading：false 表示禁用第一次执行
  trailing: false 表示禁用停止触发的回调
  ```js
  function throttle (func, wait, options) {
    let context;
    let timeout;
    let args;
    let result;
    let previous = 0;
    if (!options) options = {};

    const later =  function () {
      previous =  !options.leading ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
    }
    return function() {
      const now = new Date().getTime();
      if (!previous && !options.leading) previous = now;
      const remaining = wait - (now - previous);
      context = this;
      args = arguments
      // 剩余的时间或修改了系统时间
      if (remaining <=0 || remaining > wait ) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        previous = now;
        func.apply(context, args);
      } else if (!timeout && options.trailing) {
        timeout = setTimeout(later, remaining);
      }
    }
  }
  ```
  ## 防抖

  防抖原理：尽管触发事件，一定在事件触发n秒后才执行，如果在一个事件触发的n秒内又触发了这个事件，那以新触发的时间点为准，n秒内才执行。

  ### 第一版

  ```js
    function debounce(func, wait) {
      var timeout;
      return function() {
        // 解决：this指向window的问题
        var context = this;
        // 解决：事件对象 event 为undefined的问题
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout( function() {
          func.apply(context, args)
        }, wait);
      }
    }
  ```

  ### 立刻执行

  不希望非要等到事件停止触发后才执行，我希望立刻执行函数,然后等到停止触发 n 秒后，才可以重新触发执行。
  ```js
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var contenxt = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout;
          timeout = setTimeout(function(){
                timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
        } else {
          timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
      }
    }
  ```

  ### 返回值
  函数可能是有返回值的，但是只有immediate是true才返回
  ```js
  // 第五版
  function debounce(func, wait, immediate) {
      var timeout, result;
      return function() {
        var contenxt = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout;
          timeout = setTimeout(function(){
                timeout = null;
          }, wait)
          if (callNow) func.apply(context, args);
          var result = func.apply(context, args);

        } else {
          timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
      }
    }
  ```

  ## 数组去重

  ### indexOf

  例子如下：
  ```js
    var arr = [1, 1, '1'];
    function unique (arr) {
        var array = [];
        for (var i = 0; i < arr.length; i++) {
            if (array.indexOf(arr[i]) === -1) {
                array.push(arr[i])
            }
        }
        return array;
    }
    var uniqueAarry = unique(arr)
    // [1, '1']
    console.log(uniqueAarry);
  ```
  indexOf方法去重优点：兼容性好。

  ### 排序后去重

  ```js
  var array = [1, 1, '1'];

  function unique(array) {
      var res = [];
      var sortedArray = array.concat().sort();
      var seen;
      for (var i = 0, len = sortedArray.length; i < len; i++) {
          // 如果是第一个元素或者相邻的元素不相同
          if (!i || seen !== sortedArray[i]) {
              res.push(sortedArray[i])
          }
          seen = sortedArray[i];
      }
      return res;
  }

  console.log(unique(array));
  ```

  ### unique API

  isSorted :是否已排序
  ```js
  var array1 = [1, 2, '1', 2, 1];
  var array2 = [1, 1, '1', 2, 2];

  // 第一版
  function unique(array, isSorted) {
      var res = [];
      var seen = [];

      for (var i = 0, len = array.length; i < len; i++) {
          var value = array[i];
          if (isSorted) {
              if (!i || seen !== value) {
                  res.push(value)
              }
              seen = value;
          }
          else if (res.indexOf(value) === -1) {
              res.push(value);
          }        
      }
      return res;
  }

  console.log(unique(array1)); // [1, 2, "1"]
  console.log(unique(array2, true)); // [1, "1", 2]
  ```

  ### 优化
  ```js
  var array3 = [1, 1, 'a', 'A', 2, 2];
  // 第二版
  // iteratee 英文释义：迭代 重复
  function unique(array, isSorted, iteratee) {
      var res = [];
      var seen = [];

      for (var i = 0, len = array.length; i < len; i++) {
          var value = array[i];
          var computed = iteratee ? iteratee(value, i, array) : value;
          if (isSorted) {
              if (!i || seen !== computed) {
                  res.push(value)
              }
              seen = computed;
          }
          else if (iteratee) {
              if (seen.indexOf(computed) === -1) {
                  seen.push(computed);
                  res.push(value);
              }
          }
          else if (res.indexOf(value) === -1) {
              res.push(value);
          }    
      }
      return res;
  }

  console.log(unique(array3, false, function(item){
      return typeof item == 'string' ? item.toLowerCase() : item
  })); // [1, "a", 2]
  ```
  ### filter
  比如使用 indexOf 的方法：
  ```js
  var array = [1, 2, 1, 1, '1'];
  function unique(array) {
      var res = array.filter(function(item, index, array){
          return array.indexOf(item) === index;
      })
      return res;
  }

  console.log(unique(array));
  ```
  排序去重的方法：

  ```js
  var array = [1, 2, 1, 1, '1'];

  function unique(array) {
      return array.concat().sort().filter(function(item, index, array){
          return !index || item !== array[index - 1]
      })
  }

  console.log(unique(array));
  ```

  ### Object 键值对

  这种方法的原理：利用空对象，将数组的值存成键值对key的值，比如Objet[value] = true;
  在判断另一个值的时候，如果Objet[value2] 存在的话，就说明值是重复的。实例代码如下：
  ```js
  var array = [1, 2, '1', 1, 2];
  function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array) {
      return  obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
  }
  ```

  ### ES6 set和map 

  set例子如下：
  ```js
  var arr = [1,2,1]

  const unquie = (a) => [...new Set(a)];

  unquie(arr) // [1, 2]
  ```

  Map 例子如下：
  ```js
  function unquie(array) {
    const seen = new Map();
    array.filter((a) => !seen.has(a) && seen.set(a, 1))
  }
  ```

  ## 类型判断

  ### type API
  ```js
  var class2type = {}
  "Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function(item, index) {
    class2type["[object" + item + "]"] = item.toLowerCase()
  })
  function type(obj) {
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ? class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj;
  }
  function isFunction(obj) {
        return type(obj) === "function";
  }

  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;

  function isPlainObject(obj) {
      var proto, Ctor;
      if (!obj || toString.call(obj) !== "[object Object]") {
          return false;
      }
      proto = Object.getPrototypeOf(obj);
      if (!proto) {
          return true;
      }
      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
  }
  ```

  ## 从零实现jQuery的extend

  extend 的用法：
  ```js
  jQuery.extend( target [, object1 ] [, objectN ] )
  ```
  第一个参数 target，表示要拓展的目标。
  后面的参数，都传入对象，内容都会复制到目标对象中，我们就称它们为待复制对象吧。
  举个例子：
  ```js
  var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
  };

  var obj2 = {
      b: { b1: 3, b3: 4 },
      c: 3
  };

  var obj3 = {
      d: 4
  }
  console.log($.extend(obj1, obj2, obj3));
  // {
  //    a: 1,
  //    b: { b1: 3, b3: 4 },
  //    c: 3,
  //    d: 4
  // }
  ```
  当两个对象出现相同字段的时候，后者会覆盖前者，而不会进行深层次的覆盖。

  ### extend 第一版

  ```js
  function extend() {
    var name, options, copy;
    var length = arguments.length;
    var i = 1;
    var target = arguments[0];
    for (;i<length;i++) {
      options = arguments[i];
      if (options !== null) {
        for(name in options) {
          copy = options[name];
          if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
  }
  ```
  ### extend 第二版

  深拷贝

  ```js
    var obj1 = {
      a: 1,
      b: { b1: 1, b2: 2 }
    };
    var obj2 = {
        b: { b1: 3, b3: 4 },
        c: 3
    };

    var obj3 = {
        d: 4
    }
    // 第二版
    function extend() {
      // 默认不进行深拷贝
      var deep = false;
      var name, options, src, copy;
      var length = arguments.length;
      // 记录要复制的对象的下标
      var i = 1;
      // 第一个参数不传布尔值的情况下，target默认是第一个参数
      var target = arguments[0] || {};
      // 如果第一个参数是布尔值，第二个参数是才是target
      if (typeof target == 'boolean') {
          deep = target;
          target = arguments[i] || {};
          i++;
      }
      // 如果target不是对象，我们是无法进行复制的，所以设为{}
      if (typeof target !== 'object') {
          target = {}
      }

      // 循环遍历要复制的对象们
      for (; i < length; i++) {
          // 获取当前对象
          options = arguments[i];
          // 要求不能为空 避免extend(a,,b)这种情况
          if (options != null) {
              for (name in options) {
                  // 目标属性值
                  src = target[name];
                  // 要复制的对象的属性值
                  copy = options[name];
                  // 解决循环引用
                  if (target === copy) {
                      continue;
                  }
                  if (deep && copy && typeof copy == 'object') {
                      // 递归调用
                      target[name] = extend(deep, src, copy);
                  }
                  else if (copy !== undefined){
                      target[name] = copy;
                  }
              }
          }
      }

      return target;
    };

    extend(true,obj1, obj2,obj3)
    console.log(obj1)
  ```
  ### extend 最终代码

  需要考虑的问题：类型不一致、target 是函数、循环引用
  ```js
    var obj1 = {
      a: 1,
      b: { b1: 1, b2: 2 }
    };
    var obj2 = {
        b: { b1: 3, b3: 4 },
        c: 3
    };

    var obj3 = {
        d: 4
    }
    var class2type = {};

    // 生成class2type映射
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    })

    function type(obj) {
        // 一箭双雕
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[Object.prototype.toString.call(obj)] || "object" :
            typeof obj;
    }

    function isFunction(obj) {
        return type(obj) === "function";
    }

    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;

    function isPlainObject(obj) {
        var proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }
        proto = Object.getPrototypeOf(obj);
        if (!proto) {
            return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
    }
    // 第二版
    function extend() {
      // 默认不进行深拷贝
      var deep = false;
      var name, options, src, copy, clone, copyIsArray;
      var length = arguments.length;
      // 记录要复制的对象的下标
      var i = 1;
      // 第一个参数不传布尔值的情况下，target默认是第一个参数
      var target = arguments[0] || {};
      // 如果第一个参数是布尔值，第二个参数是才是target
      if (typeof target == 'boolean') {
          deep = target;
          target = arguments[i] || {};
          i++;
      }
      // 如果target不是对象，我们是无法进行复制的，所以设为{}
      if (typeof target !== "object" && !isFunction(target)) {
          target = {};
      }

      // 循环遍历要复制的对象们
      for (; i < length; i++) {
          // 获取当前对象
          options = arguments[i];
          // 要求不能为空 避免extend(a,,b)这种情况
          if (options != null) {
              for (name in options) {
                  // 目标属性值
                  src = target[name];
                  // 要复制的对象的属性值
                  copy = options[name];
                  // 解决循环引用
                  if (target === copy) {
                      continue;
                  }
                  if (deep && copy && (isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy))))  {
                      if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(copy) ? src : [];
                      } else {
                         clone = src && isPlainObject(copy) ? src : {};
                      }
                      // 递归调用
                      target[name] = extend(deep, clone, copy);
                  }
                  else if (copy !== undefined){
                      target[name] = copy;
                  }
              }
          }
      }

      return target;
    };

    extend(true,obj1, obj2,obj3)
    console.log(obj1)
  ```
  ## 数组的最大值和最小值

  ### 原始方法
  ```js
    var arr = [6, 4, 1, 8, 2, 11, 23];
    var result = arr[0];
    for (var i = 1; i < arr.length; i++) {
        result =  Math.max(result, arr[i]);
    }
    console.log(result);
  ```
  ### reduce
  ```js
  var arr = [6, 4, 1, 8, 2, 11, 23];

  function max(prev, next) {
      return Math.max(prev, next);
  }
  console.log(arr.reduce(max));
  ```
  ### 排序
  ```js
  var arr = [6, 4, 1, 8, 2, 11, 23];

  arr.sort(function(a,b){return a - b;});
  console.log(arr[arr.length - 1])
  ```
  ### eval

  ```js
  var arr = [6, 4, 1, 8, 2, 11, 23];
  var max = eval("Math.max(" + arr + ")");
  console.log(max)

  ```
  ### apply

  ```js
    var arr = [6, 4, 1, 8, 2, 11, 23];
    console.log(Math.max.apply(null, arr))
  ```

  ### ES6 ...

  ```js
    var arr = [6, 4, 1, 8, 2, 11, 23];
    console.log(Math.max(...arr))
  ```

  ## 数组扁平化
  数组扁平化就是将一组嵌套的数组转成一层的数组
  ### 递归

  ```js
  var array = [1, [2, [3, 4]]];
  function flatten(arr) {
      var result = []
      for (var i = 0; i < arr.length;i++) {
          if (Array.isArray(arr[i])) {
              result = result.concat(flatten(arr[i]))
          }
          else{
              result.push(arr[i])
          }
      }
      
      return result
  }
  console.log(flatten(array))
  ```

  ### toString
  如果数组全是数字，可以考虑使用toString;
  ```js
  var array = [1, [2, [3, 4]]];
  function flatten(arr) {
      return arr.toString().split(',').map(function(item){
          return +item
      })
  }
  console.log(flatten(array))
  ```

  ### reduce
  ```js
    // 方法3
  var arr = [1, [2, [3, 4]]];

  function flatten(arr) {
      return arr.reduce(function(prev, next){
          return prev.concat(Array.isArray(next) ? flatten(next) : next)
      }, [])
  }

  console.log(flatten(arr))
  ```

  ### es6 ...
  ```js
    var arr = [1, [2, [3, 4]]];
    function flatten(arr) {
        while(arr.some(item => Array.isArray(item))){
          arr = [].concat([...arr])
        }
    }
    console.log(flatten(arr))
  ```

  ### undercore
  ```js
  /**
  * 数组扁平化
  * @param  {Array} input   要处理的数组
  * @param  {boolean} shallow 是否只扁平一层
  * @param  {boolean} strict  是否严格处理元素，下面有解释
  * @param  {Array} output  这是为了方便递归而传递的参数
  * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
  */
  function flatten(input, shallow, strict, output) {

      // 递归使用的时候会用到output
      output = output || [];
      var idx = output.length;

      for (var i = 0, len = input.length; i < len; i++) {

          var value = input[i];
          // 如果是数组，就进行处理
          if (Array.isArray(value)) {
              // 如果是只扁平一层，遍历该数组，依此填入 output
              if (shallow) {
                  var j = 0, length = value.length;
                  while (j < length) output[idx++] = value[j++];
              }
              // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
              else {
                  flatten(value, shallow, strict, output);
                  idx = output.length;
              }
          }
          // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
          else if (!strict){
              output[idx++] = value;
          }
      }

      return output;

  }
  ```

  ## 查找数组指定元素

  ### findIndex
  用法：
  ```js
  var array = [2, 3, 4, 5];
  var maxIndex = array.findIndex((item) => item > 4) 
  console.log(maxIndex) // 3
  ```
  实现：遍历并返回下标
  ```js
  var array = [2, 3, 4, 5];
  function findIndex(array, fn, context) {
    for (var i = 0; i < array.length; i++) {
      if (fn.call(context, array[i], i)) return i;
    };
    return -1;
  }
  var maxIndex = findIndex(array, (item, i) => item > 4) 
  console.log(maxIndex) // 3
  ```

  ### findLastIndex
  实现：遍历并返回下标
  ```js
  var array = [2, 3, 4, 5];
  function findLastIndex(array, fn, context) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (fn.call(context, array[i], i)) return i;
    };
    return -1;
  }
  var maxIndex = findLastIndex(array, (item, i) => item > 4) 
  console.log(maxIndex) // 3
  ```

  ### createIndexFinder
  findIndex 和 findLastIndex 其实有很多重复的部分,需要精简，

  模仿 underscore 的思路就是利用传参的不同，返回不同的函数。

  ```js
  var newArray = [1,2,3,4]
  function createFinder(dir) {
      return function(array, fn, context) {
          var length = array.length;
          var index = dir > 0 ? 0 : length - 1;
          for (; index >=0 && index < length; index+= dir) {
              if(fn.call(context, array[index], index, array)) return index;
          }
          return -1;
      }
  }
  console.log(createFinder(-1)(newArray, function(item, i, newArray){
      if (item === 3) return true
  }))
  ```

  ### sortedIndex
  用法：在一个排好序的数组中找到 value 对应的位置，保证插入数组后，依然保持有序的状态。
  实现：可以使用二分查找法
  ```js
  var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];
  function cb(func, context) {
      if (context === void 0) return func;
      return function() {
          return func.apply(context, arguments);
      };
  }

  function sortedIndex(array, obj, iteratee, context) {

      iteratee = cb(iteratee, context)

      var low = 0, high = array.length;
      while (low < high) {
          var mid = Math.floor((low + high) / 2);
          if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
          else high = mid;
      }
      return high;
  };

  var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
      return stooge.age;
  });
  ```

  ### indexOf
  实现：
  ```js
  var newArray = [1,2,3,4]
  function createIndexOfFinder(dir) {
      return function(array, item, idx) {
          var length = array.length;
          var index = 0;
          if (typeof idx == "number") { 
              if (dir > 0) {
                index = idx >= 0 ? idx : Math.max(length + idx, 0);
              } else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
              }
          }
          for (idx = dir > 0 ? index : length - 1; idx >= 0 && idx < length; idx += dir) {
              if(array[idx] === item) return idx;
          }
          return -1;
      }
  }
  console.log(createIndexOfFinder(1)(newArray, 2))
  console.log(createIndexOfFinder(-1)(newArray, 2))
  ```

  ## 偏函数

  偏函数定义：在计算机科学中，局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。
  什么是元？元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。

  举个例子：
  ```js
    function add(a, b) {
      return a + b;
    }

    // 执行 add 函数，一次传入两个参数即可
    add(1, 2) // 3

    // 假设有一个 partial 函数可以做到局部应用
    var addOne = partial(add, 1);

    addOne(2) // 3
  ```
  第一版
  ```js
    function partial(fn) {
        var args = [].slice.call(arguments, 1);
        return function() {
            var newArgs = args.concat([].slice.call(arguments));
            return fn.apply(this, newArgs);
        };
    };
    function add(a, b) {
      return a + b;
    }
    add(1, 2) // 3

    // 假设有一个 partial 函数可以做到局部应用
    var addOne = partial(add, 1);

    addOne(2) // 3
  ```
  第二版
  然而正如 curry 函数可以使用占位符一样，我们希望 partial 函数也可以实现这个功能，我们再来写第二版：
  ```js
    var _ = {};
    function partial(fn) {
      var args = [].slice.call(arguments, 1);
      return function() {
          var position = 0, len = args.length;
          for(var i = 0; i < len; i++) {
              args[i] = args[i] === _ ? arguments[position++] : args[i]
          }
          while(position < arguments.length) args.push(arguments[position++]);
          return fn.apply(this, args);
      };
    };
    var subtract = function(a, b) { return b - a; };
    subFrom20 = partial(subtract, _, 20);
    subFrom20(5);
  ```

  ## 惰性函数

  ### 需求
  我们现在需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。
  ### 解决一：普通方法
  ```js
  var t;
  function foo() {
    if(t) return t;
    t = new Date();
    return t;
  }
  ```
  问题有两个，一是污染了全局变量，二是每次调用 foo 的时候都需要进行一次判断。

  ### 解决二：闭包
  ```js
    var foo = (function() {
      var t;
      return function() {
          if (t) return t;
          t = new Date();
          return t;
      }
    })();
  ```
  然而还是没有解决调用时都必须进行一次判断的问题。

  ### 解决三：函数对象
  函数也是一种对象，利用这个特性，我们也可以解决这个问题。
  ```js
  function foo() {
      if (foo.t) return foo.t;
      foo.t = new Date();
      return foo.t;
  }
  ```
  依旧没有解决调用时都必须进行一次判断的问题。
  ### 解决四：惰性函数
  不错，惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数。
  ```js
  var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
  }
  ```
  ### 更多应用

  DOM 事件添加中，为了兼容现代浏览器和 IE 浏览器，我们需要对浏览器环境进行一次判断：

  ```js
  function addEvent (type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if(window.attachEvent){
        el.attachEvent('on' + type, fn);
    }
  }
  ```
  问题在于我们每当使用一次 addEvent 时都会进行一次判断。

  利用惰性函数，我们可以这样做：

  ```js
  function addEvent (type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
  }
  addEvent()
  ```

  当然我们也可以使用闭包的形式：
  ```js
    var addEvent = (function(){
      if (window.addEventListener) {
          return function (type, el, fn) {
              el.addEventListener(type, fn, false);
          }
      }
      else if(window.attachEvent){
          return function (type, el, fn) {
              el.attachEvent('on' + type, fn);
          }
      }
  })();
  ```
  当我们每次都需要进行条件判断，其实只需要判断一次，接下来的使用方式都不会发生改变的时候，想想是否可以考虑使用惰性函数。

  ## 函数组合

  需求：
  
  我们需要写一个函数，输入 'kevin'，返回 'HELLO, KEVIN'。

  尝试：
  ```js
  function toUpperCase(x) {
      return x.toUpperCase()
  }

  function hello(x) {
      return 'hello,' + x;
  }
  function greet(x) {
      return hello(toUpperCase(x));
  }
  console.log(greet('kevin'))
  ```

  ### compose:
  underscore 的 compose 函数的实现：

  ```js
  function compose() {
      var args = arguments;
      var start = args.length - 1;
      return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
      }
  }
  ```
  该函数的作用是什么?

  先看下 pointfree

  ### pointfree
  pointfree是指的是函数无须提及将要操作的数据是什么样的
  ```js
  // 需求：输入 'kevin'，返回 'HELLO, KEVIN'。

  // 非 pointfree，因为提到了数据：name
  var greet = function(name) {
      return ('hello ' + name).toUpperCase();
  }

  // pointfree
  // 先定义基本运算，这些可以封装起来复用
  var toUpperCase = function(x) { return x.toUpperCase(); };
  var hello = function(x) { return 'HELLO, ' + x; };

  var greet = compose(hello, toUpperCase);
  greet('kevin');
  ```
  我们再举个稍微复杂一点的例子，为了方便书写, 之前写到的 curry 函数：
  ```js
  // 需求：输入 'kevin daisy kelly'，返回 'K.D.K'

  // 非 pointfree，因为提到了数据：name
  var initials = function (name) {
      return name.split(' ').map(compose(toUpperCase, head)).join('. ');
  };

  // pointfree
  // 先定义基本运算
  var split = curry(function(separator, str) { return str.split(separator) })
  var head = function(str) { return str.slice(0, 1) }
  var toUpperCase = function(str) { return str.toUpperCase() }
  var join = curry(function(separator, arr) { return arr.join(separator) })
  var map = curry(function(fn, arr) { return arr.map(fn) })

  var initials = compose(join('.'), map(compose(toUpperCase, head)), split(' '));

  initials("kevin daisy kelly");
  ```
  从这个例子中我们可以看到，利用柯里化（curry）和函数组合 (compose) 非常有助于实现 pointfree。

  也许你会想，这种写法好麻烦呐，我们还需要定义那么多的基础函数……可是如果有工具库已经帮你写好了呢？比如 ramda.js：
  ```js
   var initials = R.compose(R.join('.'), R.map(R.compose(R.toUpper, R.head)), R.split(' '));
  ```

  ## 函数记忆

  函数记忆是指将上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。

  举个例子：
  ```js
  function add(a, b) {
    return a + b;
  }
  // 假设 memoize 可以实现函数记忆
  var memoizedAdd = memoize(add);
  memoizedAdd(1, 2) // 3
  memoizedAdd(1, 2) // 相同的参数，第二次调用时，从缓存中取出数据，而非重新计算一次
  ```

  原理: 把参数和对应的结果数据存到一个对象中，调用时，判断参数对应的数据是否存在，存在就返回对应的结果数据。

  ### 第一版

  ```js
  function memoize(f) {
    var cache = {};
    return function(){
      var key = arguments.length + Array.prototype.join.call(arguments, ",");
      if (key in cache) {
            return cache[key]
      } else {
        return cache[key] = f.apply(this, arguments)
      }
    }
  }
  ```

  测试：

  ```js
  var add = function(a, b, c) {
    return a + b + c
  }

  var memoizedAdd = memoize(add)

  console.time('use memoize')
  for(var i = 0; i < 100000; i++) {
      memoizedAdd(1, 2, 3)
  }
  console.timeEnd('use memoize')

  console.time('not use memoize')
  for(var i = 0; i < 100000; i++) {
      add(1, 2, 3)
  }
  console.timeEnd('not use memoize')

  ```
  在 Chrome 中，使用 memoize 大约耗时 60ms，如果我们不使用函数记忆，大约耗时 1.3 ms 左右。
  ### 注意

  函数记忆只是一种编程技巧，本质上是牺牲算法的空间复杂度以换取更优的时间复杂度，
  在客户端 JavaScript 中代码的执行时间复杂度往往成为瓶颈，
  因此在大多数场景下，这种牺牲空间换取时间的做法以提升程序执行效率的做法是非常可取的。

  ### 第二版
  因为第一版使用了 join 方法，我们很容易想到当参数是对象的时候，就会自动调用 toString 方法转换成 [Object object]再拼接字符串作为 key 值
  我们写个 demo 验证一下这个问题：
  ```js
  var propValue = function(obj){
      return obj.value
  }
  var memoizedAdd = memoize(propValue)

  console.log(memoizedAdd({value: 1})) // 1
  console.log(memoizedAdd({value: 2})) // 1
  ```
  两者都返回了 1，显然是有问题的，所以我们看看 underscore 的 memoize 函数是如何实现的：
  ```js
  // 第二版 (来自 underscore 的实现)
  var memoize = function(func, hasher) {
      var memoize = function(key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!cache[address]) {
            cache[address] = func.apply(this, arguments);
        }
        return cache[address];
      };
      memoize.cache = {};
      return memoize;
  };
  ```
  从这个实现可以看出，underscore 默认使用 function 的第一个参数作为 key，所以如果直接使用

  ```js
  var add = function(a, b, c) {
    return a + b + c
  }
  var memoizedAdd = memoize(add)

  memoizedAdd(1, 2, 3) // 6
  memoizedAdd(1, 2, 4) // 6
  ```
  肯定是有问题的，如果要支持多参数，我们就需要传入 hasher 函数，自定义存储的 key 值。所以我们考虑使用 JSON.stringify：
  ```js
  var memoizedAdd = memoize(add, function(){
      var args = Array.prototype.slice.call(arguments)
      return JSON.stringify(args)
  })

  console.log(memoizedAdd(1, 2, 3)) // 6
  console.log(memoizedAdd(1, 2, 4)) // 7
  ```
  如果使用 JSON.stringify，参数是对象的问题也可以得到解决，因为存储的是对象序列化后的字符串。

  ### 适用场景
  我们以斐波那契数列为例：

  ```js
    var count = 0;
    var fibonacci = function(n){
        count++;
        return n < 2? n : fibonacci(n-1) + fibonacci(n-2);
    };
    for (var i = 0; i <= 10; i++){
        fibonacci(i)
    }

    console.log(count) // 453
  ```
  我们会发现最后的 count 数为 453，也就是说 fibonacci 函数被调用了 453 次！也许你会想，我只是循环到了 10，为什么就被调用了这么多次，所以我们来具体分析下：
  ```js
  当执行 fib(0) 时，调用 1 次

  当执行 fib(1) 时，调用 1 次

  当执行 fib(2) 时，相当于 fib(1) + fib(0) 加上 fib(2) 本身这一次，共 1 + 1 + 1 = 3 次

  当执行 fib(3) 时，相当于 fib(2) + fib(1) 加上 fib(3) 本身这一次，共 3 + 1 + 1 = 5 次

  当执行 fib(4) 时，相当于 fib(3) + fib(2) 加上 fib(4) 本身这一次，共 5 + 3 + 1 = 9 次

  当执行 fib(5) 时，相当于 fib(4) + fib(3) 加上 fib(5) 本身这一次，共 9 + 5 + 1 = 15 次

  当执行 fib(6) 时，相当于 fib(5) + fib(4) 加上 fib(6) 本身这一次，共 15 + 9 + 1 = 25 次

  当执行 fib(7) 时，相当于 fib(6) + fib(5) 加上 fib(7) 本身这一次，共 25 + 15 + 1 = 41 次

  当执行 fib(8) 时，相当于 fib(7) + fib(6) 加上 fib(8) 本身这一次，共 41 + 25 + 1 = 67 次

  当执行 fib(9) 时，相当于 fib(8) + fib(7) 加上 fib(9) 本身这一次，共 67 + 41 + 1 = 109 次

  当执行 fib(10) 时，相当于 fib(9) + fib(8) 加上 fib(10) 本身这一次，共 109 + 67 + 1 = 177 次
  ```
  所以执行的总次数为：177 + 109 + 67 + 41 + 25 + 15 + 9 + 5 + 3 + 1 + 1 = 453 次！

  如果我们使用函数记忆呢？

  ```js
  var count = 0;
  var fibonacci = function(n) {
      count++;
      return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
  };

  fibonacci = memoize(fibonacci)

  for (var i = 0; i <= 10; i++) {
      fibonacci(i)
  }

  console.log(count) // 12
  ```

  ## 递归

  程序调用自身的编程技巧称为递归(recursion)。

  ### 阶乘
  ```js
  function factorial(n) {
    if (n==1) return n;
     return n * factorial(n - 1)
  }
  console.log(factorial(5)) // 5 * 4 * 3 * 2 * 1 = 120

  ```
  ### 斐波那契数列
  ```js
  function fibonacci(n){
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
  }
  console.log(fibonacci(5)) // 1 1 2 3 5
  ```
  ### 递归条件
  从这两个例子中，我们可以看出：

  构成递归需具备边界条件、递归前进段和递归返回段，当边界条件不满足时，递归前进，当边界条件满足时，递归返回。阶乘中的 n == 1 和 斐波那契数列中的 n < 2 都是边界条件。

  总结一下递归的特点：

  子问题须与原始问题为同样的事，且更为简单；

  不能无限制地调用本身，须有个出口，化简为非递归状况处理。

  了解这些特点可以帮助我们更好的编写递归函数。

  ### 阶乘函数优化
  ```js
  function factorial(n, res) {
      if (n == 1) return res;
      return factorial(n - 1, n * res)
  }

  console.log(factorial(4, 1)) // 24
  ```

  ## 乱序
  乱序的意思就是将数组打乱。
  ```js
  function shuffle(a) {
      for (let i = a.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
  }
  ```

  demo:
  ```js
  var times = 100000;
  var res = {};

  for (var i = 0; i < times; i++) {
      var arr = shuffle([1, 2, 3]);
      var key = JSON.stringify(arr);
      res[key] ? res[key]++ :  res[key] = 1;
  }

  // 为了方便展示，转换成百分比
  for (var key in res) {
      res[key] = res[key] / times * 100 + '%'
  }

  console.log(res)
  ```

  ## 解读 v8 排序源码
  ### 插入排序
  将第一个元素视为有序序列，遍历数组，将之后的元素依次插入这个构建的有序序列中。
  
  实现：
  ```js
  function insertionSort(arr) {
      for (var i = 1; i < arr.length; i++) {
          var element = arr[i];
          for (var j = i - 1; j >= 0; j--) {
              var tmp = arr[j];
              var order = tmp - element;
              if (order > 0) {
                  arr[j + 1] = tmp;
              } else {
                  break;
              }
          }
          arr[j + 1] = element;
      }
      return arr;
  }

  var arr = [6, 5, 4, 3, 2, 1];
  console.log(insertionSort(arr));
  ```
  ### 时间复杂度
  指执行算法所需要的计算工作量,它考察当输入值大小趋近无穷时的情况,一般情况下，算法中基本操作重复执行的次数是问题规模 n 的某个函数。

  最好情况：数组升序排列，时间复杂度为：O(n)

  最坏情况：数组降序排列，时间复杂度为：O(n²)

  ### 稳定性
  稳定性，是指相同的元素在排序后是否还保持相对的位置。

  要注意的是对于不稳定的排序算法，只要举出一个实例，即可说明它的不稳定性；而对于稳定的排序算法，必须对算法进行分析从而得到稳定的特性。

  比如 [3, 3, 1]，排序后，还是 [3, 3, 1]，但是其实是第二个 3 在 第一个 3 前，那这就是不稳定的排序算法。

  插入排序是稳定的算法。

  ### 优势
  当数组是快要排序好的状态或者问题规模比较小的时候，插入排序效率更高。这也是为什么 v8 会在数组长度小于等于 10 的时候采用插入排序。

  ### 快速排序
  原理: 
  1. 选择一个元素作为"基准"
  2. 小于"基准"的元素，都移到"基准"的左边；大于"基准"的元素，都移到"基准"的右边。
  3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

  示例：
  
  实现：
  ```js
  var quickSort = function(arr) {
  　　if (arr.length <= 1) { return arr; }
      // 取数组的中间元素作为基准
  　　var pivotIndex = Math.floor(arr.length / 2);
  　　var pivot = arr.splice(pivotIndex, 1)[0];

  　　var left = [];
  　　var right = [];

  　　for (var i = 0; i < arr.length; i++){
  　　　　if (arr[i] < pivot) {
  　　　　　　left.push(arr[i]);
  　　　　} else {
  　　　　　　right.push(arr[i]);
  　　　　}
  　　}
  　　return quickSort(left).concat([pivot], quickSort(right));
  };
  ```
  然而这种实现方式需要额外的空间用来储存左右子集，所以还有一种原地(in-place)排序的实现方式。

  ### in-place 实现
  ```js
  function quickSort(arr) {
      // 交换元素
      function swap(arr, a, b) {
          var temp = arr[a];
          arr[a] = arr[b];
          arr[b] = temp;
      }

      function partition(arr, left, right) {
          var pivot = arr[left];
          var storeIndex = left;

          for (var i = left + 1; i <= right; i++) {
              if (arr[i] < pivot) {
                  swap(arr, ++storeIndex, i);
              }
          }

          swap(arr, left, storeIndex);

          return storeIndex;
      }

      function sort(arr, left, right) {
          if (left < right) {
              var storeIndex = partition(arr, left, right);
              sort(arr, left, storeIndex - 1);
              sort(arr, storeIndex + 1, right);
          }
      }

      sort(arr, 0, arr.length - 1);

      return arr;
  }

  console.log(quickSort(6, 7, 3, 4, 1, 5, 9, 2, 8))
  ```

  ## 如何写自己的工具库
  ```js
  (function() {

      var root = (typeof self == 'object' && self.self == self && self) ||
          (typeof global == 'object' && global.global == global && global) ||
          this || {};

      var ArrayProto = Array.prototype;

      var push = ArrayProto.push;

      var _ = function(obj) {
          if (obj instanceof _) return obj;
          if (!(this instanceof _)) return new _(obj);
          this._wrapped = obj;
      };

      if (typeof exports != 'undefined' && !exports.nodeType) {
          if (typeof module != 'undefined' && !module.nodeType && module.exports) {
              exports = module.exports = _;
          }
          exports._ = _;
      } else {
          root._ = _;
      }

      _.VERSION = '0.1';

      var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

      var isArrayLike = function(collection) {
          var length = collection.length;
          return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
      };

      _.each = function(obj, callback) {
          var length, i = 0;

          if (isArrayLike(obj)) {
              length = obj.length;
              for (; i < length; i++) {
                  if (callback.call(obj[i], obj[i], i) === false) {
                      break;
                  }
              }
          } else {
              for (i in obj) {
                  if (callback.call(obj[i], obj[i], i) === false) {
                      break;
                  }
              }
          }

          return obj;
      }

      _.isFunction = function(obj) {
          return typeof obj == 'function' || false;
      };

      _.functions = function(obj) {
          var names = [];
          for (var key in obj) {
              if (_.isFunction(obj[key])) names.push(key);
          }
          return names.sort();
      };

      /**
      * 在 _.mixin(_) 前添加自己定义的方法
      */
      _.reverse = function(string){
          return string.split('').reverse().join('');
      }

      _.mixin = function(obj) {
          _.each(_.functions(obj), function(name) {
              var func = _[name] = obj[name];
              _.prototype[name] = function() {
                  var args = [this._wrapped];

                  push.apply(args, arguments);

                  return func.apply(_, args);
              };
          });
          return _;
      };

      _.mixin(_);

      })()
      _('hello').reverse()
  ```