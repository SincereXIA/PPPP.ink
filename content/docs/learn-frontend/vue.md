---
title: Vue
date: 2021-06-08T12:59:06.273Z
slug: html-基础
lastmod: 2021-06-08T12:59:08.520Z
---

## 父子组件消息传递

### 父组件传递给子组件

- props：
  parent.vue

  ```javascript
    <template>
    <div>
    parent：下面是我的子组件
    <childSon :userName='name'></childSon>
    </div>
    </template>
    <script>
    import childSon from './Childs'
    export default {
        name:'Parent',
        components:{
        childSon
    },
    data(){
        return{
            name:'啊哈'
            }
        }
    }

 </script>
  ```

  Childs.vue
  
  ```javascript
  Childs.vue
  
  <template>
  <div>
      child:这是父组件给我传的数据——{{userName}}
  </div>
  </template>
  <script>
  export default {
      name:'Childs',
      props:['userName'],
      data(){
          return{
  
          }
      }
  }
  </script>
  ```

### 子组件传递给父组件

`子组件`向`父组件`传递数据，不能像上面一样实时的传递数据，必须通过 `事件` 触发。我们通过 `$emit`方法来向父子间传递数据，第一个参数为事件的 `名称`，第二个为传递的 `数据` ，是一个可选的参数。父组件必须监听同样的事件名称才能监听到我们的这个事件，事件抛出的值必须通过 `$event`或者通过一个`方法`来访问。

Parent.vue

```javascript
<template>
<div>
    parent：这是我的子组件传给我的值：{{num}}
    <childSon :content='content' @getNum='getMsg'></childSon>
</div>
</template>
<script>
import childSon from './Childs'
export default {
    name:'Parent',
    components:{
        childSon
    },
   data() {
    return {
      content:'er',
      num:''
    }
  },
  methods:  {
      getMsg(num){
          this.num = num;
      }
  }
}
</script>
```

Childs.vue

```javascript
<template>
<div>
    child:这是父组件给我传的数据——{{content}} <br />
    <button @click="sendMsgtoParent">点击我可以向父子间传递参数哦</button>
</div>
</template>
<script>
export default {    
    name:'Childs',
    props:['content'],
    data(){
        return{
            num: 0
        }
    },
    methods: {
        sendMsgtoParent(){
            this.$emit('getNum',this.num ++ );
        }
    }
}
</script>
```
