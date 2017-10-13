const ctx= 'infinite'
let getComputedStyle = document.defaultView.getComputedStyle

let throttle=function(fn,delay){
  let now , lastExec , timer , context , args

  let excute=function(){
    fn.apply(context,args)
    lastExec = now
  }

  return function(){
    context = this
    args = arguments

    now = Date.now()

    if(timer){
      clearTimeout(timer)
      timer = null
    }

    if(lastExec){
      let diff =delay - (now-lastExec)
      if(diff<0){
        excute()
      }else{
        timer=setTimeout(()=>{
          excute()
        },delay)
      }
    }else{
      excute()
    }
  }
}

class Dom{
  constructor(){

  }
  getScrollTop(element){
    if(element==window){
      return Math.max(window.pageYOffset || 0 ,document.documentElement.scrollTop)
    }
    return element.scrollTop
  }
  getScrollEventTarget(element){
    let currentNode=element
    while(currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType ==1 ){
      let overflowY = getComputedStyle(currentNode).overflowY
      if(overflowY=='scroll' || overflowY=='auto'){
        return currentNode
      }
      currentNode=currentNode.parentNode
    }
    return window
  }
  getVisibleHeight (element){
    if(element==window){
      return document.documentElement.clientHeight
    }
    return element.clientHeight
  }
  getElementTop (element){
    if(element==window){
      return this.getScrollTop(window)
    }
    return element.getBoundingClientRect().top + this.getScrollTop(element)
  }
  isAttached (element){
    var currentNode = element.parentNode;
    while (currentNode) {
      if (currentNode.tagName === 'HTML') {
        return true;
      }
      if (currentNode.nodeType === 11) {
        return false;
      }
      currentNode = currentNode.parentNode;
    }
    return false;
  }
}

let infinitDom = new Dom()

let doBind = function(){
  if(this.binded){
    return
  }
  this.binded = true

  let directive = this
  let element = directive.el
  directive.scrollEventTarget=infinitDom.getScrollEventTarget(element)
  directive.scrollListener=throttle(doCheck.bind(directive),200)
  directive.scrollEventTarget.addEventListener('scroll',directive.scrollListener)

  let disabledExpr=element.getAttribute('infinite-scroll-disabled')
  let disabled =false
  if(disabledExpr){
    this.vm.$watch(disabledExpr,function(value){
      directive.disabled=value
      if(!value){
        doCheck.call(directive)
      }
    })
    disabled=Boolean(directive.vm[disabledExpr])
  }
  directive.disabled=disabled

  let distanceExpr=element.getAttribute('infinite-scroll-distance')
  let distance=0
  if(distanceExpr){
    distance=Number(directive.vm[distanceExpr] || distanceExpr)
    if(isNaN(distance)){
      distance=0
    }
  }

  directive.distance=distance
  doCheck.call(directive)
}

let doCheck=function(force){
  let scrollEventTarget = this.scrollEventTarget
  let distance = this.distance

  let element = this.el
  if(force!=true && this.disabled){
    return
  }
  let viewportScrollTop = infinitDom.getScrollTop(scrollEventTarget)
  let viewportBottom = viewportScrollTop + infinitDom.getVisibleHeight(scrollEventTarget)
  let shouldTrigger = false

  if(scrollEventTarget==element){
    shouldTrigger=scrollEventTarget.scrollHeight - viewportBottom <= distance
  }else{
    let elementBottom =element.offsetHeight
    shouldTrigger= viewportBottom+distance >= elementBottom
  }

  if( shouldTrigger && this.expression ){
    this.expression()
  }
}

let infiniteScroll={
  bind(el , binding , vnode){
    el[ctx]={
      el,
      vm:vnode.context,
      expression:binding.value
    }
    const args=arguments
    const cb=function(){
      el[ctx].vm.$nextTick(function(){
        if(infinitDom.isAttached(el)){
          doBind.call(el[ctx],args)
        }
        el[ctx].bindTryCount=0

        const tryBind=function(){
          if(el[ctx].bindTryCount>10){
            return
          }
          el[ctx].bindTryCount++
          if(infinitDom.isAttached(el)){
            doBind.call(el[ctx],args)
          }else{
            setTimeout(tryBind,50)
          }
        }
        tryBind()
      })
    }
    if(el[ctx].vm._isMounted){
      cb()
      return
    }
    el[ctx].vm.$on('hook:mounted',cb)
  },
  unbind(el){
    if(el[ctx] && el[ctx].scrollEventTarget){
      el[ctx].scrollEventTarget.removeEventListener("scroll",el[ctx].scrollListener)
    }
  }
}

let Infinite={}

Infinite.install=function(Vue){
  Vue.directive("infinite",infiniteScroll)
}

export default Infinite
