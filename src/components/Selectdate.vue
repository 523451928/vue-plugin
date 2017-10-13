<template>
  <div>
    <input @click="selectPick" v-model="pickDate" placeholder="选择日期" />
    <transition name="scale">
      <div class="pick-wrapper" v-show="pickShow" @click="hidePick">
        <v-pickdate :pickStyle="pickStyle" :pickDate="pickDate" :isTime="true" @output="writePut"   @cancelPick="hidePick"></v-pickdate>
      </div>
    </transition>
  </div>
</template>

<script>
  import VPickdate from '../public/Pickdate.vue'
  export default{
    data(){
        return {
            pickShow:false,
            pickStyle:{
              left:"50%",
              marginLeft:"-50%",
              marginTop:"-100px",
              top:"50%",
              width:"100%"
            },
            pickDate:""
        }
    },
    methods:{
        padLeftZero(val){
          return parseInt(val)<10?"0"+parseInt(val):parseInt(val)
        },
        selectPick(){
          this.pickShow=true
        },
        writePut(date){
          this.pickShow=false
          this.pickDate=date
        },
        hidePick(){
          this.pickShow=false
        }
    },
    components:{
      VPickdate
    },
    mounted(){
      var now=new Date()
      this.pickDate=now.getFullYear()+"-"+this.padLeftZero(now.getMonth())+"-"
        +this.padLeftZero(now.getDate())+" "+this.padLeftZero(now.getHours())+":"
        +this.padLeftZero(now.getMinutes())+":"+this.padLeftZero(now.getSeconds())
    }
  }
</script>

<style>
  .scale-enter-active,.scale-leave-active{
    transition: all .3s;
  }
  .scale-enter,.scale-leave-to{
    opacity: 0;
  }

  .scale-enter  #pick-date,.scale-leave-to  #pick-date{
    transform: scale(.5);
  }
  .pick-wrapper{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
