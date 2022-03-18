## 数据绑定	Feb02_1.html

--单向绑定数据：标签属性前加  `v-bind:`，简写 `:`。解析标签属性、绑定事件.

```html
<a v-bind:href="url">welcome to xxxx</a>
```

--双向绑定数据：标签value属性前加  `v-model:`。简写 `v-model` 后面不需要加value。双向数据绑定在页面中输入框的值改变时，Vue对象中相应的value值也会改变。也就是说后台可以实时同步输入框的值。

```html
<input type="text" v-model:value="nm" />
```

**v-text**类似插值语法，区别就是，会替换掉标签中的内容，插值语法则不会。

```html
<div v-text:"属性名"></div>
```

**v-html**解析html语句，会替换掉原节点中的内容。有安全性问题，在网站上动态渲染任意html时非常危险的，容易导致xss攻击。

```html
<div v-html:"属性名"></div>

data:{
  属性名:'<h3>hello</h3>'
}
```

**v-cloak**指令没有值，是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。

可以配合css解决网速慢时js未加载，页面显示{{xxx}}的问题。

**v-once**指令类似final关键字，值在初始化后不会再改变。

```html
<h2 v-once>初始值未{{n}}</h2>
```

**v-pre**指令，跳过其所在的节点的编译过程，vue不会渲染。

**ref**指令，作用类似id属性，添加了ref指令的标签，会被vue接管dom节点。如果是在组件标签上加ref指令，则可以获取vueComponent对象。

```html
<h2 ref="a_h2"> dddddd</h2>
<School ref="b"></School>
methods:{
	func(){
		//打印整个h2标签，等价于document.getElementById("a_h2");
		console.log(this.$refs.a_h2);	
		this.$refs.b;	//获取vueComponent对象
}
}
```

**v-for**

```vue
<li v-for="(p,index) in persons" :key="p.id">
                    {{p.name}}-{{p.age}}
</li>
```



### data与el的两种写法	Feb02_1.html

#### el：

- new Vue时直接配置el属性
- 先创建Vue实例，随后通过`v.$mount('#id名称')指定el的值`

#### data：

- new Vue时直接配置

- 函数式，先创建Vue实例，再函数调用。使用组件时必须使用函数式

  ```html
  data:function(){				data(){			//this=当前实例对象
  	return{name:''}					return{name:''}
  }								}
  ```




### 事件处理	Feb12_01.html

`v-on:click` 事件绑定，简写 `@click`。绑定的函数写在Vue实例的methods:{}中

```html
<button v-on:click="functionName(value,$event)">{{button_name}}</button>
函数名不带参，默认会带event。如要带参，则需在参数后加个 &event 来传event，否则接受不到event
```

### 事件修饰符	Feb12_02.html

语法：`@click.修饰符名`

prevent：阻止默认事件
stop：阻止事件冒泡
once：事件只触发一次
capture：使用事件的捕获模式
self：只有event.target 是当前操作的元素是才触发事件
passive：事件的默认行为立即执行，无需等待事件回调执行完毕



### 键盘事件	Feb22_01.html

@keyup 松开键位时触发

@keydown 按下键位时才触发

常用按键别名：enter回车、delete删除退格键、esc退出键、space空格、tab空格键、up上、down下、left左、right右。**使用方法：**

```html
 <input type="text" placeholder="请输入" @keyup.enter="showinfo" />
```

特殊按键别名：ctrl、alt、shift、meta。

配合keyup使用：按下修饰键的同时，再按其他键，随后释放其他键，事件才触发。

配合keydown使用：正常触发事件。

Vue.config.keyCodes.自定义建名 = 键码	自定义键别名

### 计算属性	Feb22_02.html

计算属性时通过计算或处理得到的数据，本质和data中的数据一样。写在Vue实例中.

```
computed:{  //计算属性，也就是通过计算或处理得到的数据
                    fullName:{ //此处的 this 默认是vm 
                        get(){//get在初始时调用，在所依赖的参数发生变化时调用
                            return this.firstName+"-"+this.lastName;
                        }
                    }
                }
```

### 监视属性 	Feb23_01.html

当数据发生改变时执行。watch可以执行异步任务，computed不行

```vue
 watch:{
                    isHot:{
                        immediate:true, //初始时就执行handler
                        handler(newValue,oldValue){
                            console.log(newValue+"\t"+oldValue);
                        }
                    }
                }
 另一种写法
 vm.$watch("isHot",{})
 监视多级结构中的某个：vm.$watch("numbers.a",{})
 监视多级结构中的所有：增加 depp:true	//开启深度监视
```

### 绑定class样式	Mar08_01.html

```html
			<!--字符串写法，用于样式的类名不确定，需要动态指定-->
            <div class="basic" :class="mood" @click="changeMood">{{name}}</div><br/>
            <!--数组写法，用于要绑定的样式个数不确定，名字也不确定-->
            <div class="basic" :class="classArr">{{name}}</div><br/>
            <!--对象写法，用于要绑定的样式个数确定，名字也确定,要动态决定用不用-->
            <div class="basic" :class="classObj">{{name}}</div>
            
const vm=new Vue({
                data:{
                    mood:"normal",
                    name:"hello",
                    //数组写法
                    classArr:["sad","happy","happy"],
                    //对象写法
                    classObj:{
                        sad:true,
                        happy:false,
                        normal:false,
                    }
                },
                methods:{
                    //字符串写法
                    changeMood(){
                        const arr=["sad","happy","normal"]
                        const number=Math.floor(Math.random()*3);
                        this.mood=arr[number];
                        console.log(number);
                    }
                }
            })
```

### 绑定style样式

直接写v-show，默认隐藏，后面值如果为真就显示，否则隐藏，底层用display实现，隐藏时节点还在

```html
<div v-show="true"> Hello {{name}}</div>
```

v-if，值为真则显示，否则隐藏，隐藏时节点不在，

```html
//v-else，v-else-if，需要挨着if使用
<div v-if="true"> Hi {{name}}</div>
<div v-else-if="true"> Hi {{name}}</div>//作用类似if和else if语句
<div v-else="true"> Hi {{name}}</div>//作用类似else语句
```

```html
<!--template配合v-show使用，在页面中，不会显示template标签，
                只会显示里面的标签-->
            <template v-show="true">
                <div>aa</div>
                <div>bb</div>
                <div>cc</div>
            </template>
```

### Vue数据修改 Mar08_03.html

key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据新数据生成新的虚拟dom， 随后进行新旧dom对比。key默认是index值， index值是行号，从0开始计数，类似数组的下标，当在列表前插入行时，如果用index值当唯一标识，会造成数据错乱，用id标识则不会错乱。

 Vue.set(属性名,属性值)，给data中的某个属性中再添加一个属性，并生成setter、getter方法，不能修改data下的根元素

 Vue.set(数组名,下标，属性值)，修改数组的值f 

直接操作数组，vue不会重新渲染，需通过数组的几个函数（如：push、pop、shift、unshift、reverse、splice、sort）修改数组，才会重新渲染。

### 过滤器		Mar08_05.html

过滤器一般用于对数据进行特定格式化后再显示，

语法：

```html
<h2>现在时间是：{{time | timer}}</h2>
另一种格式：过滤器格式：v-bind:属性="xx | 过滤器名"

全局过滤器
            Vue.filter("timer",function(value){
                return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
            })
```

### 自定义指令	Mar09_02.html

```javascript
new Vue({
            el: "#root",
            data: {
                n: 22,
            },
            directives: {
                //简写形式默认只有，bind和update，没有inserted
                big(a, b) {
                    console.log(a,b);
                    a.innerText=b.value*10;
                },
                fbind:{
                    //绑定元素时调用
                    bind(elemnet,binding){
                        console.log("bind");
                    },
                    //插入页面时
                    inserted(elemnet,binding){
                        console.log("inserted");
                    },
                    //数据更新时
                    update(elemnet,binding){
                        console.log("update");
                    }
                }
            }
        })
```

### 生命周期

vm的一生(vm的生命周期）∶
将要创建===>调用beforeCreate函数。
创建完毕===>调用created豳数。
将要挂载===>调用beforeMount函数。(重要)
挂载完毕===>调用mounted函数。====>【重要的钩子】
将要更新===>调用beforeUpdate函数。
更新完毕===>调用updated豳数。(重要)
将要销毁===>调用beforeDestroy图数。====>【重要的钩子】
销毁完毕===>调用destroyed图数。

### 非单文件组件	Mar10_01.html

**命名规则：**单个单词，小写开头大写开头都行。多个单词：要么单词全小写，要么用-作为单词分隔符，以-作为分割符的名称需要用引号包起来。例："my-school"、"myschool"。

​					多个单词：还有一种单词开头全大写的方式，但是需要在脚手架中使用，在html文件中使用会报错。 

```javaScript
 //简写方式，vue会自动帮你调用extend
        const student ={
            template:`
            <div>
                <h2>学生姓名：{{studentName}}</h2>
                <h2>学校年龄：{{age}}</h2>
            </div> `,
            data() {
                return {
                    studentName: "moloom",
                    age: 23,
                } } }
      const school = Vue.extend({
            //给这个组件起别名，这里会修改开发者工具中vue栏下的昵称
            name:"hhh",
            template: `
            <div>
                <h2>学校名称：{{schoolName}}</h2>
                <h2>学校名称：{{address}}</h2>
            </div> `,
            data() {
                return {
                    schoolName: "JXUT",
                    address: "江西省南昌市南昌县紫阳大道355号江西科技学院",
                } } })
      new Vue({
            el: "#root",
            components: {
                school:school,
                student,//同名可以只写一个
            } })
```

### mixin 混入

用于拆分像methods、watchs函数。专门写一个js文件存放methods等等，在需要引入的vue文件的<script></script>标签中 **import { m } from "../mixin";**引入，再添加 **mixins: [m] **到和data同级的地方即完成引入。也可以在main.js中引入，需import并调用 **Vue.mixin()**，全局引入。

```javascript
js文件
export const m = {
    methods: {
        ageAdd() {
            this.myAge += 1;
            console.log(this);
        } }, }

vue文件
import { m } from "../mixin";
export default {
  name: "Student",
    mixins: [m],
}
```

### 插件

在main.js中通过import和Vue.use()语句来使用插件。

定义插件：

```vue
export defalut {
	install (Vue,options){
		Vue.xxx(){}
} }
```

### scoped

在vue文件的style标签中添加，可以让模板优先应用本文件下的style样式

```html
<style scoped></style>
```

### 本地存储

把数据存放在客户端本地

```js
function savaData(){
    localStorage.setItem("key","value")
    localStorage.getItem("key");
}
```

### 组件的自定义事件

适用于子组件向父组件传，

A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件回调在A中），

触发自定义事件。ref配合mounted钩子函数，v-on配合methods

```vue
//APP.vue
<Student ref="student"></Student>

mounted() {
    //这里需要写箭头函数，不然 this是子组件的vc
    this.$refs.student.$on("mo",(name,...params)=>{
      console.log(name,params);
    });
  },

//student子组件
 setStuName(){
      //触发事件，通过这个方法，给App父组件传值
      this.$emit("mo",this.name,this.gender,444,5332,111);
    },
```

### 全局总线

可以各个组件间的通信，适用于兄弟间传，**记得要在接收数据端的销毁钩子中写解绑事件**。

```js
main.js
//全局总线，第一种写法
// const Demo=Vue.extend({});
// const d=new Demo();
// Vue.prototype.x=d;

// 全局总线，第二种写法
  beforeCreate(){
    Vue.prototype.$bus=this;
  },
      
//发送数据
methods: {
    sendStudentName(){
      this.$bus.$emit("事件名",数据);
    }
  },
//接收数据
mounted() {
    this.$bus.$on("事件名",(数据)=>{
      console.log("我收到数据啦-",数据);
    })
  },
//组件销毁时，必须解绑事件，否则全部事件都不能用
  beforeDestroy(){
    this.$bus.$off("事件名");
  }
```

### 订阅与发布	

引入pubsub-js库，安装pubsub：**npm i pubsub-js**，

 引入pubsub库：**import pubsub from "pubsub-js";**

```js
接收数据方
mounted() {
    this.pubId = pubsub.subscribe("m1", (functionName, value)=> {
      console.log("sss", functionName, value);
    });
  },
  //组件销毁时，解绑事件，
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId);
  },
      
发送数据方
methods: {
    sendStudentName(){
      pubsub.publish("m1",[this.name,this.gender]);
    }
  },
```

### **vm.nextTick(function(){})** 等所有代码执行完后执行



### 动画效果

css的动画样式名时vue固定的，以transition标签的name属性值+ -enter-active，或xxx-leave-active，第一个是入场动画，第二个是离场动画。 

```css
 <transition name="hello" :appear="true">//这里可以直接写appear，默认值为true
      <h1 class="de" v-show="isShow">你好啊</h1>
 </transition>

<style>
//拿动画写
.hello-enter-active {
  animation: mo 1s;
}
.hello-leave-active {
  animation: mo 1s reverse;
}
</style>
```

```css
第二种，拿过渡动画写
.hello-enter,.hello-leave-to {
  transform: translateX(-100%);
}
.hello-enter-to,.hello-leave {
  transform: translateX(0);
}
```

引入animate.css动画库	**import 'animate.css'**

```vue
transition-group适用于里面包括多个标签块的，配合key属性使用
<transition-group name="animate__animated animate__bounce" 
    enter-active-class="animate__swing"	入场样式
    leave-active-class="animate__backOutUp"	离场样式
    appear="true">
      <h1 class="d3" key="1" v-show="isShow">你好啊</h1>
      <h1 class="d3" key="2" v-show="!isShow">我好啊</h1>
</transition-group>
```

### 代理服务器



```js
vue.config.js文件 
//配置代理服务器  第一种
 devServer:{
  proxy:"http://localhost:5001",
 },

  // 第二种
  devServer:{
    proxy: {
      '/api': { //"/api"是请求前缀，加前缀vue会认为你走代理，不加就不走代理
        target: 'http://localhost',
        pathRewritw:{"^/api":""},//把前缀替换为空字符
        ws: true,//用于支持websocket
        changeOrigin: true  //true代表跨域伪装，false表示原地址访问，默认为true
      },
    }
  },
      
App.vue
import axios from "axios";
methods: {
    gets(){
      axios.get("http://localhost/api/vue.min.js").then(
        response=>{
          console,log("啦啦啦");
        },
        error=>{
          console.log("呜呜呜");
        }
      )
    }
  },
```

### 默认插槽

在App.vue的组件标签里再写标签，然后在组件里需要放置的地方加上<slot></slot>标签

```vue
App.vue
<Student>
	<img slot="image" src="#"/>
    <a slot="addition" href="#">哈哈哈哈</a>
</Student>

Student.vue
<div>
    <slot name="image">我时默认值，如果没有传标签过来替换我，就会显示我！</slot>
    <slot name=“addition”>我是文字内容</slot>
</div>

```

#### 具名插槽

```vue
<template v-slot:名字>
	<div></div>
</template>
```

作用于插槽

```vue
App.vue
<template scope="mo">
{{games}}//显示获取到的数据
</template>

Catogory.vue
<slot :games="games"></slot>//把数据传到上面去
```

### Vuex  默认配置代码在demo/09...

### 组件化代码在demo/10..

用于共享数据，同时对数据封装，

```js
//该文件用于创建vuex中最为核心的store
目录：src/store/index.js

import Vue from 'vue'
Vue.use(Vuex);
import Vuex from 'vuex'

//向外暴露的操作，但不是主要干活的的人
const actions = {
    add(miniStoreObj,value){
        miniStoreObj.commit("ADD",value);
    },
    decrement(miniStoreObj,value){
        miniStoreObj.commit("DECREMENT",value);
    }
};
//主要干活的人
const mutations={
    ADD(stateObj,value){
        stateObj.sum+=value;
    },
    DECREMENT(stateObj,value){
        stateObj.sum-=value;
    }
};
//数据存放地
const state={
    sum:0,
};

//相当于new一个全局属性，供项目使用
const store =new Vuex.Store({
    actions:actions,
    mutations,
    state,
})

export default store;
```

#### getters 

类似计算属性，不过这个getter是共享的属性，使用:$store.getters.sum()

```vue
const getters={
    bigSum(state){
        return state.sum*10;
    }
}
```

#### mapState，mapGetters

需使用 **import {mapState,mapGetters} from 'vuex'**引入

```
computed:{
    //本来获取sum值的表达式是：$store.state.sum，
    //使用mapState，他会帮你取值并放到一个新变量名上去
    ...mapState({he:"sum"}),//把括号里面的值展开成键值对，
    ...mapGetters(['bigSum']),
  },
```

mutations,actions也可以如上使用，但是这种方法，需要在点击触发事件那加参数。

### 路由

引入router3：**npm i router@3**，router3对于vue2，现在最新版本是4.

使用router：Vue.use(router)

组件切换时，被替换的组件会立即销毁

```vue
	<!--实现切换-->	App.vue
    <router-link to="/home">go Home</router-link>
    <router-link to="/about">go About</router-link>
    <!--    指定组件的展现位置-->
    <router-view></router-view>
```

```js
import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

import About from "@/components/About";
import Home from "@/components/Home";


export default new VueRouter({
    routes:[
        {
            path:"/home",
            component:Home,
        },
        {
            path:"/About",
            component:About,
        }
    ],
})	router/index.js文件
```

#### 传参方式1

```js
直接在路径后面传参数：
    <router-link :to="`/home/message/detail?id=${p.id}`">{{p.text}}</router-link>
对象写法:
	<router-link :to="{
          path:'/home/message/detail',
          query:{
            id:p.id,
            text:p.text,
          }
        }">{{p.text}}</router-link>

取参数：{{$route.query.id}}
```

#### 传参方式2------命令路由

在每个路由中，添加name属性即可，可以简化路由跳转

```vue
使用
<router-link :to="{name:'guanyu'}">go Home</router-link>
```

#### 传参方式3------params参数

```vue
修改路由中的path属性为：
path:"detail/:id/:text",	//和restful风格类似，:xxx时占位符，真正路径只有detail
使用：
<router-link :to="`/home/message/detail/${m.id}/${m.text}`">go Home</router-link>
//用对象写法，只能在里面写name，不能写path
<router-link :to="{
                  name:'guanyu',
                  params:{
                  	id:m.id,
                  	text:m.text,
                  	}
                  }">go Home</router-link>
取值：{{$route.params.text}}
取值2，props接收
{
      path:"detail",
      component:Detail,
	  path:"detail/:id/:text",
	  props:true,值为真，会把该路由组件收到的所有params参数，以props方式传给detail组件。
}，
取值3，函数方式
{
      path:"detail",
      component:Detail,
	  path:"detail/:id/:text",
	  props($route){
		return {id:$route.query.id}
	  }
}
```

#### replace属性

用于消除当前这一步的后退记录，等下点后退时，不能退回到点的这步

```
<router-link :replace="true"></router-link>	使用方法，简写直接写 replace
```

#### 编程式路由导航 push

```vue
<script>
	export default{
        methods:{
			pushShow(m){
                this.$router.push({
                    name:'guanyu',
                  	params:{
                  		id:m.id,
                  		text:m.text,
                  	}
                })
			}
		}
    }
</script>
```

#### 页面 后退前进

```
methods:{
    back(){
      this.$router.back();后退一步
    },
    forward(){
      this.$router.forward();前进一步
    },
    go(){
    	this.$router.go(n);正数就前进，负数就后退，n为几就走几步，
    }
  }

```

#### 缓存路由组件

就是你填下表单数据，点别的组件再回来时数据就没了，这个功能可以给你保存数据。keep-alive标签可以让被包裹的组件，在切换时不被销毁，从而实现数据不清空的功能。

直接写keep-alive标签代表着被包裹的所有组件都不用销毁，

指定不销毁的组件需加include属性

```vue
<template>
	<keep-alive include="向外暴露的组件名">
        <router-view></router-view>
	</keep-alive>
</template>
```

#### activated()、deactivated()钩子

activated激活时触发，deactivated未激活时触发，

### 全局前置路由守卫

全局前置路由守卫，切换组件之前调用;参数：to是要切换到哪的信息，from是从哪里切换的信息，next是放行。

或者：在需要校验身份信息的路由中，配置meta属性，例 meta:{isAuthrity:true};然后再进行if判断就行

```vue
<script>
router.beforeEach((to,from,next)=>{
if(to.path!=='/home/news')	//如果是去/home/news就不放行。
    next();//放行
})
</script>
```

### 全局后置路由守卫

全局后置路由守卫，切换组件之后调用;没有next参数

```vue
<script>
router.afterEach((to,from)=>{
//这里可以实现更改页面标题，把标题方meta属性中，每次切换都更改下标题，
    document.title="",
</script>
```

### 独享路由守卫

单独在路由中配置一个beforeEnter属性，参数和全局一样，没有单独的前置独享路由守卫，可以和后置配合使用。

### 组件内路由守卫

配置在组件中，beforeRouteEnter进入该组件时被调用、beforeRouteLeave离开该组件时被调用。参数和全局前置一样有三个。

### history和hash模式

hash模式，就是浏览器地址栏带/#/的，作用是，#号后面的内容不会被当做是请求路径的一部分。history就是普通的地址栏路径，打包部署时，点击切换组件后再刷新，会出404错误，解决办法是vue教学视频第139个的23分钟。
