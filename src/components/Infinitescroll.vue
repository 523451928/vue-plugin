<template>
  <div class="infinite">
    <ul
      class="infinite-scroll"
      v-infinite="loadMore"
      infinite-scroll-listen-for-event="test"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="item in list" class="item">{{ item }}</li>
      <div class="loading" v-if="loading && hasMore">加载中..</div>
      <div class="no-more" v-if="!hasMore">没有更多了!</div>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Infinitescroll',
    data () {
      return {
        list:[1,2,3],
        loading:false,
        hasMore:true
      }
    },
    methods:{
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          if(last>30){
            this.loading=true
            this.hasMore=false
            //  return
          }else{
            this.loading = false;
          }
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }

        }, 1000);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
