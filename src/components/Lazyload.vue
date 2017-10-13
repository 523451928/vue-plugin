<template>
  <div class="lazyload">
    <div class="img-box">
      <img v-for="(item,index) in imgArr" v-lazyload="item">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Lazyload',
    data () {
      return {
        imgArr:['http://img15.3lian.com/2016/h1/124/171.jpg',
          'http://pic.qiantucdn.com/58pic/13/75/82/36c58PICPZI_1024.jpg',
          'http://pic.58pic.com/58pic/16/00/52/11J58PICD3S_1024.jpg',
          'http://pic19.huitu.com/res/20140427/33714_20140427005724677341_1.jpg',
          'http://pic.58pic.com/58pic/14/44/22/36H58PICezB_1024.jpg',
          'http://tupian.enterdesk.com/2015/xu/04/20/12/zweihua11.jpg',
          'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1307/23/c0/23656308_1374564438326.jpg',
          'http://img0.imgtn.bdimg.com/it/u=2687928152,1179906628&fm=27&gp=0.jpg',
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 img{
   width: 90%;
 }
</style>
