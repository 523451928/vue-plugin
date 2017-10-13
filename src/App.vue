<template>
  <div id="app">
    <router-link v-for="m in menu"  :to="m.path" :key="m.name"  :class="{'router-link-active':$route.path==m.path}">
      <i :class="m.name"></i>{{m.txt}}
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
      return {
        menu:[
          {
            name: "infinite",
            path:"/infinite",
            txt: "无限滚动"
          }, {
            name: "loadmore",
            path:"/loadmore",
            txt: "加载更多"
          }, {
            name: "lazyload",
            path:"/lazyload",
            txt: "懒加载"
          }, {
            name: "selectdate",
            path:"/selectdate",
            txt: "选择日期"
          }
        ]
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
  #app a{
    margin-right: 10px;
  }
  #app .router-link-active{
    color: cadetblue;
  }
.infinite-scroll{
  /*height: 400px;*/
  /*overflow: auto;*/
  /*margin-top: 100px;*/
}
.loadmore-box{
  /*height: 300px;*/
  /*overflow: auto;*/
}
.no-more{
  line-height:50px;
  text-align: center;
}
.mint-loadmore-bottom{

}
h1, h2 {
  font-weight: normal;
}
.loading{
  text-align: center ;
  line-height: 40px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: block;
  margin: 0 10px;
  padding: 20px 0;
}
.item{
  display: block;
  height: 40px;
  line-height: 40px;
}
</style>
