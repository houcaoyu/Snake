function Timer(time,callback,options){
  this.time=time;
  this.callback=callback;
  this.options=$.extend({loop:false},options)

  this.start=function(context){
    if(context){
      context.time=this.time
    }else{
      context={
        time:this.time,
        options:$.extend(true,this.options)};
    }
    var timer=this;
    if(!context.options.loop===true&&context.options.loop>0){
      context.options.loop--
      console.log(context.options.loop)
    }

    var f=function(event){
      context.time-=event.delta;
      if(context.time<=0){
        timer.callback();
        view.off('frame',f)
        if(context.options.loop){

          if(context.options.loop===true){
            timer.start(context);
          }else{
            timer.start(context);
          }
        }
      }
    }
    view.on('frame',f)
  }
}
