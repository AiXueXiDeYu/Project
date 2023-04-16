# vue3  响应式源码(reactive, ref)

最近学习了大圣老师关于**vue3** 响应式源码的分析与手写，颇有体会。也有了一些自己的理解，于是突发奇想
写一篇博客来记录一下，最近学习了**VuePress**就结合起来。  


我将手写一个迷你的**Vue**响应式，实现**Vue3**的**reactive**和**ref**，项目就叫**vue-hand-coding**，你可以在 [GitHub](https://github.com/AiXueXiDeYu/lesson-my/tree/main/vue3/source/vue-hand-coding) 上看到核心代码。

## 什么是响应式

**Vue3**中的响应式是一种特性，可以使得数据和界面之间自动关联并实时更新。具体来说，当某个响应式属性被修改时，会自动触发相应的依赖更新。  
例如：

```js
// vue 模块化开发出来的 reqctivity 模块 响应式
// reactive 普通对象包装成 响应式对象 effect 依赖收集器

const { effect, reactive } = require('@vue/reactivity')

let dummy
const counter = reactive({ num1: 1, num2: 2 })
effect(() => {
    // **proxy** get 收集到  effect 和 counter 之间的依赖关系
    dummy = counter.num1 + counter.num2
    console.log(dummy)// 每次counter.num1修改都会打印日志
})
setInterval(() => {
    counter.num1++
}, 1000)
```
每个一秒都会打印新的`dummy`值
`ref` 同理。

## 响应式是干什么的
在**vue3**中，开发者只需要声明哪些数据是响应式的，然后就可以通过模板语法、jsx等方式将它们渲染到ui上。当这些数据被修改时，**vue3**会自动更新ui以反映这些变化，而不需要开发者手动处理。这种机制减轻了开发者的工作负担，提高了开发效率，同时也提高了程序的可靠性和稳定性。
**响应式机制的主要功能就是，可以把普通的 JavaScript 对象封装成为响应式对象，拦截数据的获取和修改操作，实现依赖数据的自动化更新。**

所以，一个最简单的响应式模型，我们可以通过**reactive**或者**ref**函数，把数据包裹成响应式对象，并且通过**effect**函数注册回调函数，然后在数据修改之后，响应式地通知**effect**去执行回调函数即可。

## vue3 响应式的具体过程

下面以**reactive**为例：  
代码可看上面的  
**reactive**会将一个对象用**proxy**包裹通过**proxy**代理变成响应式对象，**Proxy**对象是ES6中新引入的对象拦截器，它可以在目标对象上设置各种拦截器，比如`get、set`等。  
reactive函数在内部创建了一个`handler`对象，用于设置**Proxy**对象的拦截器。  
在`handler`对象中，我们需要为`get`和`set`方法设置拦截器，以便实现数据的响应式。  
当用户访问某个属性时，`get`方法会被触发，执行`track`函数，把`effect`注册到依赖地图`targetMap`中，此时我们可以在这里进行依赖收集，并返回属性的值。  
当用户修改某个属性时，`set`方法会被触发，执行`trigger`函数，把所有的`effect`执行，我们可以在这里通知相关的依赖更新，并更新属性的值。  
具体细节后面有写。

## 测试响应式是否实现 jest

这是项目需要的依赖，jest相关的第三方库。
```json
"dependencies": {
    "@babel/core": "^7.16.5",
    "@babel/preset-env": "^7.16.5",
    "babel-jest": "^27.4.5",
    "jest": "^27.4.5",
    "vue": "^3.2.25"
  }
```
并且要运行测试用例的话要在`package.json`文件的脚本添加`"test": "jest"` 之后，还需要添加配置文件
`jest.config.js`:
```js
module.exports = {
    transform: {
      // '^.+\\.vue$': 'vue-jest', //vuejest 处理.vue
      '^.+\\.js$': 'babel-jest',  // babel jest处理js or jsx
    },
    testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
    "collectCoverage": true,
    "coverageReporters": ["json", "html"],
  }
```   
`babel.config.js`:  
```js
module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  };
```
运行`npm run test`即可  
测试驱动开发(**TDD**) 
编写一些简单的测试用例，来检验代码是否正确。
例如： (注意测试用例文件以`.spec.js`结尾)
```js
describe('测试响应式', () => { // 测试分组
    // item 一个测试用例
    it('测试', () => {
        // expect  toBe  断言
        expect(1 + 2).toBe(3)
    })
    it('reactive 基本使用', () => {
        // expect(1 + 2).toBe(3)
        let obj = {num: 0}
        const ret = reactive(obj)
        // const ret1 = reactive(obj)
        let val
        // let a
        effect(() => {
            val = ret.num // 运行 get 收集依赖
            // a = ret.num2
        })
        expect(val).toBe(0)
        ret.num++ // setter targetMap effect trigger
        expect(val).toBe(1)
        // ret.num = 10
        // expect(val).toBe(10)
    })
})
```
当然现在运行肯定是不成功的，那么我们就可以根据这个测试用例来手写我们的reactive了。

## reactive

Vue3 中，reactive 是通过 ES6 中的 Proxy 特性实现的属性拦截，所以，在 reactive 函数中我们直接返回 newProxy 即可： 
```js
export function reactive(target) {
  if (typeof target!=='object') {
    console.warn(`reactive  ${target} 必须是一个对象`);
    return target
  }

  return new Proxy(target, mutableHandlers);
}
```
但是只返回一个nowProxy 还远远不够，所以我们把他写出一个函数：  
```js
export function reactive(target) {
    return createReactiveObject(target, reactiveMap, mutableHandlers)
} 
```
然后我们的`reactiveMap`是 `WeakMap` 的实例。那为什么要用map呢？  
**vue 依赖关系是用"对象"来组织的  key 对象， map更适合**
且当组件卸载的时候`weakMap`会自动删除（弱引用）`mutableHandlers` 数据修改后如何处理的函数
```js
function createReactiveObject(target, proxyMap, proxyHandlers) {
    if (typeof target !== 'object') {
        console.warn(`reactive ${target} 必须是一个对象`);
        return target
    }
    // 通过 Proxy 创建代理 ， 不同的map 存储不同类型的reactive 依赖关系
    // 缓存找到了，直接返回
    const existringProxy = proxyMap.get(target)
    if (existringProxy) {
        // console.log('//// cached', target);
        return existringProxy // Proxy 代理的是对象
    }
    // 执行代理
    const proxy = new Proxy(target, proxyHandlers)
    // 存个缓存
    proxyMap.set(target, proxy) // 缓存
    return proxy
}
```
下面是一下引入和声明：
```js
import {
    mutableHandlers,
    shallowReactiveHandlers,
  } from "./baseHandlers"
export const reactiveMap = new WeakMap()
export const shallowReactiveMap = new WeakMap()
export const ReactiveFlags = {
    RAW: '__v_raw', // 原生对象
    IS_REACTIVE: '__V_isReactive' // obj.num.a 响应式的
}
```

## mutableHandlers

`Proxy` 是`es6`中引入的一个新特性，用于创建一个代理对象，在这个代理对象上可以拦截一些操作，从而对它们进行处理和自定义。
有两个参数：`target` 和 `handler`
其中，`target` 表示要被代理的对象，`handler` 表示一个对象，用于定制针对 `target` 的拦截行为。`handler` 中可以指定多个拦截器（或称为“陷阱”），根据需要选择相应拦截器来对目标对象进行拦截处理。  
所以：
```js
export const mutableHandlers = {
    get,
    set ,
    has,
    deleteProperty
}
```
我们主要用到的是`get` 和 `set` ，也是等下我们要去写的。

## get 

```js
import { tarck, trigger } from "./effect"
const get = createGetter()
const set = createSetter()
const has = () => {}
const deleteProperty = () => {}

function createGetter(shallow = false) {
    return function get(target, key, receiver) {
        // 本职工作 返回普通对象的值
        // targetMap -> object -> key -> [effect(), effect1(),...]
        // es6 提供的映射api  Reflect
        // target[key]
        // tarck 

        // const isExistMap = () => key === ReactiveFlags.RAW &&
        // (receiver === reactiveMap.get(target) || receiver === shallowReactiveMap.get(target))

        // if (key === ReactiveFlags.IS_REACTIVE) {
        //     return true
        //   } else if (isExistMap()) {
        //     // 已经存在缓存里
        //     return target
        //   }

        const res = Reflect.get(target, key, receiver) 
        // console.log(receiver, res, '////');
        console.log(target, '///');
        tarck(target, 'get', key) // 收集依赖
        if (isObject(res)) {
            return shallow? res:reactive(res)
        }
        return res
    }
}
```
`shallow = false` 是为了等下的浅层代理，先不管。  
`get`包括三个参数：

1. `target`: 被代理的目标对象。
2. `property(key)`: 被代理的属性名。
3. `receiver`: 最初被调用的对象。

其中，`target` 是被代理的对象；`property` 是被代理的属性名或者是 symbol，在这里可以通过 `reflect.get(target, property, receiver)` 获取到原始值；`receiver` 则是最初被调用的对象，通常情况下与 `target` 相同，但是如果存在继承关系，那么 `receiver` 可能会不同于 `target`。 

`Reflect.get()`是`JavaScript`中的内置方法之一，它的作用是返回提供的对象的指定属性的值。它接受两个参数：
`target(必须)`：目标对象，从中获取属性的值。
`propertyKey(必须)`：要获取其值的属性名称。
`receiver(可选)`：如果提供了可选的 `receiver` 参数，则其代表访问该属性时 `this` 的值。

然后执行 `track` 函数 收集依赖。下面的是判断是否是浅层代理。

## set 

`set` 拦截器用于拦截对代理对象属性值的赋值操作，如果存在该拦截器将会被调用。

`set `拦截器的参数如下：

`target`：目标对象，即被代理的对象。
`property(key)`：需要被设置值的属性名称或者 `Symbol`。
`value`：需要设置的值。
`receiver`：最初被调用的对象。通常是代理对象本身，但如果有继承的 `Proxy `，则可能不同。
```js
function createSetter() {
    return function set(target, key, value, receiver) {
        const result = Reflect.set(target, key,value, receiver)
        trigger(target, 'set', key)
        return result
    }
}
```
`Reflect.set(target, propertyKey, value [, receiver])`是 JavaScript 的内置函数之一，可用于设置对象属性的值。

- `target`: 要在其上设置属性的目标对象
- `propertyKey`: 要设置的属性的名称
- `value`: 属性的新值
- `receiver`（可选项）：如果提供了，则操作会基于它，如果未提供，则使用 `target` 作为接收器

`Reflect.set()` 方法将值 `value` 分配给属性 `propertyKey`，并返回一个布尔值，指示分配是否成功。
然后执行`trigger`函数把 `effect` 挨个执行    
现在我们还要写 `track`函数、`rigger`函数 和 `effect` 函数。 

## track

```js
const targetMap = new WeakMap()
let activeEffect = null

export function tarck(target, type, key) {
    // console.log(`触发 track -> target: ${target} type:${type} key:${key}`)
    // obj.nums.a.b proxy 深度代理 懒代理
    // targetMap -> target -> map -> key 
    let depsMap = targetMap.get(target) // 第一层查找 对象 key  undefined 
    if (!depsMap) {
        // 初始化 depsMap 的逻辑
        // depsMap = new Map()  // HashMap 对象 set get 操作
        // targetMap.set(target, depsMap)
        // 上面两行可以简写成下面的
        // 新增
        targetMap.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key) // 有没有？
    if (!deps) {
        deps = new Set() // 数组来存
    }
    if (!deps.has(activeEffect) && activeEffect) {
        // 防止重复注册
        deps.add(activeEffect)
    }
    depsMap.set(key, deps)
}
```
`track()` 是 JavaScript 中用于跟踪用户行为的方法。下面是该函数的参数：

`track()` 方法通常都有一个事件名称、事件属性对象和可选的回调函数作为参数，具体如下：

- `eventName`：必填参数，表示要跟踪的事件名称，通常是一个字符串。
- `eventProperties`：可选参数，表示要跟踪的事件属性或元数据，通常是一个包含键值对的对象。
- `callback`：可选参数，表示当跟踪完成时执行的回调函数，通常是一个函数。

我们这里的`track`函数会将`effect` 注册到相应的对象的相应属性的依赖地图 。  
在 `track` 函数中，我们可以使用一个巨大的 `tragetMap` 去存储依赖关系。`map` 的 `key` 是我们要代理的 `target` 对象，值还是一个 `depsMap`，存储这每一个 `key` 依赖的函数，每一个 `key` 都可以依赖多个 `effect`。   
而依赖地图的格式，用代码描述如下：
```js
targetMap = {
 target： {
   key1: [回调函数1，回调函数2],
   key2: [回调函数3，回调函数4],
 }  ,
  target1： {
   key3: [回调函数5]
 }  

}
```

## trigger

```js
export function trigger(target, type, key) {
    // console.log(`触发 trigger -> target:  type:${type} key:${key}`)
    // 从targetMap中找到触发的函数，执行他
    const depsMap = targetMap.get(target)
    if (!depsMap) {
        // 没找到依赖
        return
    }
    const deps = depsMap.get(key)
    if (!deps) {
        return
    }
    deps.forEach((effectFn) => {
        if (effectFn.scheduler) {
            effectFn.scheduler()
        } else {
            effectFn()
        }
    })
}
```
`trigger` 函数实现的思路就是从 `targetMap` 中，根据 `target` 和 `key` 找到对应的依赖函数集合 `deps`，然后遍历 `deps` 执行依赖函数。  
`effect` 的`scheduler`函数用于控制`effect`的执行时间，`scheduler`决定`effect`何时被加入任务队列并执行。如果未提供`scheduler`函数，则默认使用同步方式执行`effect`。  
当有多个状态发生改变时，`Vue 3` 可以利用 `scheduler` 函数对这些状态进行批处理，从而优化性能。  
最后的最后就剩下了`effect`函数了。

## effect 

```js
export function effect(fn, options = {}) {
    const effectFn = () => {
        // 容错
        try {
            activeEffect = effectFn
            //fn执行的时候，内部读取响应式数据的时候，就能在get配置里读取到activeEffect
            return fn()
        } finally {
            activeEffect = null   // 打扫战场
            // 无论在try块中是否发生异常，finally块中的代码都会执行  
        }
    }
    if (!options.lazy) {
        // 同步运行
        effectFn() // 触发 proxy 的 get
    }
    effectFn.scheduler = options.scheduler // watchEffect
    return effectFn
}
```
`effect` 函数是 Vue3 中的一个响应式函数，它会在创建中追踪其依赖(即响应式数据)，并在依赖发生变化时自动重新运行该函数，通常用于处理副作用和为模板提供响应式状态等。

`effect` 函数可接受两个参数：

- `fn`: 必需参数，传入一个函数，在该函数中定义我们需要执行的操作。

- `options`: 可选参数，是一个包含如下属性的对象：

  - `lazy`: 延迟执行，默认值为 `false`。如果 `lazy` 设置为 `true`，则不会延迟执行传入 `fn` 函数，即默认在 `effect` 函数创建后立即执行 `fn` 函数。如果 `lazy` 设置为 `true`，则使用 `trigger()` 手动触发函数执行。
  
  - `scheduler`: 默认值为 `undefined`。如果传入了 `scheduler` 函数，则在副作用更新时调用此函数，而不是直接运行 `fn` 函数。这是一个高级应用场景，可以控制函数执行的优先级和裁剪冗余操作。   
`options` 还有其他属性，这里只写了用到的，感兴趣的可自行查找。  
现在我们就可以写一个新的测试用例了：
```js
import { reactive, shallowReactive } from "../reactive"
import { effect } from "../effect"

describe('测试响应式', () => { // 测试分组
    // item 一个测试用例
    it('测试', () => {
        // expect  toBe  断言
        expect(1 + 2).toBe(3)
    })
    it('reactive 基本使用', () => {
        // expect(1 + 2).toBe(3)
        let obj = {num: 0}
        const ret = reactive(obj)
        // const ret1 = reactive(obj)
        let val
        // let a
        effect(() => {
            val = ret.num // 运行 get 收集依赖
            // a = ret.num2
        })
        expect(val).toBe(0)
        ret.num++ // setter targetMap effect trigger
        expect(val).toBe(1)
        // ret.num = 10
        // expect(val).toBe(10)
    })
    test('一个reactive 对象的属性在多个effect中', () => {
        const ret = reactive({num: 0})
        let val1, val2
        effect(() => {
            val1 = ret.num
        })
        effect(() => {
            val2 = ret.num
        })
        expect(val1).toBe(0)
        expect(val2).toBe(0)
        ret.num++
        expect(val1).toBe(1)
        expect(val2).toBe(1)
    })
    it('reactive 嵌套', () => {
    const ret = reactive({
      name: '玩转Vue3',
      info: {
        price: 129,
        type: 'f2e'
      }
    })
    let price
    effect(() => {
      price = ret.info.price
    })
    expect(price).toBe(129)
    ret.info.price++
    expect(price).toBe(130)
  })
})   
```
现在就可以通过了。

## shallowReactive

```js
export function shallowReactive(target) {
    return createReactiveObject(
      target,
      shallowReactiveMap, // 区分， 浅层响应式单独存放
      shallowReactiveHandlers
    )
  }
```
其实就是一个`shallow` 的状态区分。

## shallowReactiveHandlers

```js
import {
    reactive,
    ReactiveFlags,
    reactiveMap,
    shallowReactiveMap,
  } from "./reactive"
import { isObject } from '../shared'
const shallowReactiveGet = createGetter(true)

export const shallowReactiveHandlers = {
    get: shallowReactiveGet,
    set,
    has,
    deleteProperty
  }
```
只需要传入`true`即可。

## isObject

```js
export function isObject(val){
    return typeof val === "object" && val !== null
  }
```
检查参数的类型是否为对象，并且不是 `null`。如果参数是对象且不是 `null`，则返回 `true`，否则返回 `false`。
在测试用例了添加： 
```js
test('shalldowReactive基本使用', () => {
        const ret = shallowReactive({ num: 0 })
        let val
        effect(() => {
          val = ret.num
        })
        expect(val).toBe(0)
        ret.num++
        expect(val).toBe(1)
        ret.num = 10
        expect(val).toBe(10)
      })
test('shalldowReactive浅层响应式', () => {
        const ret = shallowReactive({
            name: '玩转vue3',
            info: {
                price: 129,
                type: 'f2e'
            }
        })
        let price
        effect(() => {
            price = ret.info.price
        })
        expect(price).toBe(129)
        ret.info.price++
        expect(price).toBe(129) 
      })
```
运行通过，浅层的响应式只能读，不能改。

## ref

```js
// 简单数据类型 响应式怎么写
import { tarck, trigger } from "./effect";
import { reactive } from "./reactive";
import { isObject } from "../shared";
// ref(null) DOM 标记点
export function ref(val) {
    if (isRef(val)) {
        console.log('////', val);
        return val
    }
    // 简单数据类型的 ref
    return new RefImpl(val)
}

export function isRef(val) {
    return !!(val && val.__isRef)
}

// es6 class get set 方法   ref就是利用面向对象的getter和setters进行track和trigget
class RefImpl {
    constructor(val) {
        // 响应式对象 是用 ref 做的
        this.__isRef = true
        this._val = convert(val)
    }
    get value() {   
        tarck(this, 'get', 'value')
        return this._val
    }
    set value(val) {
        if (val !== this._val) {
            this._val = convert(val)
            trigger(this, 'set', 'value')
        }
    }
}

// ref也可以支持复杂数据结构
function convert(val) {
    return isObject(val) ? reactive(val) : val
}

```
`ref` 的执行逻辑要比 `reactive` 要简单一些，不需要使用 `Proxy` 代理语法，直接使用对象语法的 `getter` 和 `setter` 配置，监听 `value` 属性即可。在 `ref` 函数返回的对象中，对象的 `get value` 方法，使用 `track` 函数去收集依赖，`set value` 方法中使用 `trigger` 函数去触发函数的执行。   
测试用例：
```js
import { effect } from '../effect'
import { ref } from '../ref'

describe('ref测试', () => {
    it('ref基本使用', () => {
        const r = ref(0)
        let val
        effect(() => {
            val = r.value
        })
        expect(val).toBe(0)
        r.value++
        expect(val).toBe(1)
    })

    it('ref复杂数据，其实也是用了reactive', () => {
        const r = ref({ name: '玩转Vue3' })
        let val
        effect(() => {
            val = r.value.name
        })
        expect(val).toBe('玩转Vue3')
        r.value.name = '重学前端'
        expect(val).toBe('重学前端')
    })
    it('ref 在 ref ', () => {
        const r = ref(0)
        const s = ref(r)
        expect(1 + 1).toBe(2)
    })
})
```

## 总结

响应式的主要功能就是可以把普通的 `JavaScript` 对象封装成为响应式对象，在读取数据的时候通过 `track` 收集函数的依赖关系，把整个对象和 `effect` 注册函数的依赖关系全部存储在一个依赖图中。 在修改数据的时候通过 `trigger` 把`effect` 挨个执行，比对数据，更新数据。

定义的 `dependsMap` 是一个巨大的 `Map` 数据，`effect` 函数内部读取的数据都会存储在 `dependsMap` 中，数据在修改的时候，通过查询 `dependsMap`，获得需要执行的函数，再去执行即可。 

`dependsMap` 中存储的也不是直接存储 `effect` 中传递的函数，而是包装了一层对象对这个函数的执行实际进行管理，内部可以通过 `active` 管理执行状态，并且执行的方式也是判断 `scheduler` 方法，实现了对性能的提升。

通过学习大圣老师vue响应式源码手写讲解，深有体会，上面只是自己的一些浅显理解，当然有很多也是学习老师的理解。这里面其实含有另外的知识点 **平台无关性** 和 **VDOM** 。后续还会有文章讲解。