let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

let transition=prefixStyle("transition")

let Lazyload={}
Lazyload.install=function(Vue,options){
  let opt={
    loadImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505472217827&di=e24cf99c65ded97fae93d98c55f43020&imgtype=0&src=http%3A%2F%2Fwww.tonghua-china.com%2F3d%2Fimg%2Floading.gif",
    threshold:100,
    opa:0.3,
    duration:1000
  }
  for(let key in options){
    opt[key]=options[key]
  }

  Vue.directive('lazyload',{
    bind(el,binding){

    },
    inserted(el,binding){
      window.addEventListener("scroll",scrollUp);
      el.style[transition] = 'all '+opt.duration+'ms';
      el.style.opacity = opt.opa;
      el.style.filter = "alpha(opacity = " + opt.opa*100 + ")";
      el.src=opt.loadImg;
      scrollUp();
      function scrollUp(){
        let scrollObj={};
        scrollObj.top=document.body.scrollTop;
        scrollObj.left=document.body.scrollLeft;
        if(el.getBoundingClientRect().top<window.innerHeight+opt.threshold
          && el.getBoundingClientRect().left<window.innerWidth+opt.threshold){
          el.src=binding.value;
          el.style.opacity = 1;
          el.style.filter = "alpha(opacity = 100)";
          window.removeEventListener("scroll",scrollUp);
        }
      }
    }
  })
}

export default Lazyload
