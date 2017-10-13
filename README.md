# vue-pulgin
lazyload , infinite-scroll , loadmore , pickdate

## 查看demo
```
git clone
```

## lazyload 使用方法 
* loadImg 未加载之前的loading图片
* threshold 提前加载距离
* opa 未加载之前的图片透明度
* duration 过渡时间
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

## infinite-scroll 使用方法 
* lv-infinite  加载函数
* infinite-scroll-disabled  是否能继续加载
* infinite-scroll-distance  提前加载距离
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

## loadmore 使用方法
* top-method 下拉更新的方法  bottom-method 上拉加载的方法
* all-bottom-loaded 是否所有的加载完毕 change-translate 返回值是容器的下拉或这上拉的位移
* top-status-change 下拉更新 返回值是状态(pull,loading,drop)
* bottom-status-change 上拉加载 返回值是状态(pull,loading,drop)
* 注意 top-method方法执行后要重置(this.$refs.loadmore.onTopLoaded()) bottom-method 方法执行后要重置(this.$refs.loadmore.onBottomLoaded()) 

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

## pickdate 使用方法
* pickStyle 日历组件的样式(主要是位置) pickDate(初始日期) minDate(最小日期) maxDate(最大日期) isTime(是否能选择时间) isEdit(是否能进行别的操作)
* @cancelPick 点击取消pickdate组件后emit出来的方法
* @output 选择日期后pickdate组件后emit出来的方法  返回值为选择的日期

```
 import VPickdate from '../public/Pickdate.vue'
 
 <v-pickdate :pickStyle="pickStyle" :minDate="minDate" :maxDate="maxDate" :isEdit="false"
              :pickDate="pickDate" :isTime="true" @output="writePut"   @cancelPick="hidePick">
 </v-pickdate>

```
