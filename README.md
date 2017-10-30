# vue-pulgin
lazyload , infinite-scroll , loadmore , pickdate

## 查看demo
```
git clone https://github.com/523451928/vue-plugin.git
cd vue-plugin
npm install
npm run dev
```

## lazyload 使用方法 

```
import Lazyload from './directive/lazyload'

Vue.use(Lazyload,{
  loadImg:"https://timgsa.baidu.com/timg?loading.gif",
  threshold:100,
  opa:0.1,
  duration:1000
})

 <img v-for="(item,index) in imgArr" v-lazyload="item">
```
| Option | Description |
| ----- | ----- |
| loadImg | String(default '') 未加载之前的loading图片 |
| threshold | Number(default 100) 提前加载距离 |
| opa | Number(default 0.3) 未加载之前的图片透明度 |
| duration | Number(default 1000) 过渡时间|

## infinite-scroll 使用方法 
```
import Infinite from './directive/infinite-scroll'

Vue.use(Infinite)

<ul
    class="infinite-scroll"
    v-infinite="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
    <li v-for="item in list" class="item">{{ item }}</li>
    <div class="loading" v-if="loading && hasMore">加载中..</div>
    <div class="no-more" v-if="!hasMore">没有更多了!</div>
</ul>
```
| Option | Description |
| ----- | ----- |
| v-infinite  | Function 加载更多函数 |
| infinite-scroll-disabled | String 需要绑定在用了指令的dom元素上 指令会监听vue data绑定的loading |
| infinite-scroll-distance | Number 提前加载距离 |

## loadmore 使用方法
```
import VLoadmore from '../public/loadmore.vue'

<v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :all-bottom-loaded="allLoaded"
          @change-translate="changeTranslate"
          @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
  <ul>
    <li v-for="item in list">{{ item }}</li>
  </ul>
</v-loadmore>
```
| Option | Description |
| ----- | ----- |
| top-method  | Function 下拉更新方法 |
| bottom-method | Function 上拉加载方法 |
| all-bottom-loaded | Bollean 是否所有的加载完毕,加载完毕后会关闭上拉加载 |
| change-translate | Function 子组件派发的事件 返回值是容器的下拉或这上拉的位移 |
| top-status-change | 下拉更新派发的事件 返回值是状态(pull,loading,drop) |
| bottom-status-change | 上拉加载派发的事件 返回值是状态(pull,loading,drop) |

* 注意 top-method方法执行后要重置(this.$refs.loadmore.onTopLoaded()) bottom-method 方法执行后要重置(this.$refs.loadmore.onBottomLoaded()) 

## pickdate 使用方法
```
 import VPickdate from '../public/Pickdate.vue'
 
 <v-pickdate :pickStyle="pickStyle" :minDate="minDate" :maxDate="maxDate" :isEdit="false"
              :pickDate="pickDate" :isTime="true" @output="writePut"   @cancelPick="hidePick">
 </v-pickdate>

```

| Option | Description |
| ----- | ----- |
| pickStyle | Object(default {}) 日历组件的样式(主要是positon) |
| pickDate | String(default '2017-10-30') 初始日期 |
| minDate | String(default '2017-10-30') 可以选择的最小日期 |
| maxDate | String(default '2017-10-30') 可以选择的最小日期 |
| isTime | Bollean(default false) 是否能选择时间 |
| isEdit | Bollean(default false) 是否能进行其他操作 |
| @cancelPick | 点击取消pickdate组件后emit出来的方法 |
| @output | 选择日期后pickdate组件后emit出来的方法  返回值为选择的日期 |
