
  function JoyStick() {
  this.Container_constructor();

  this.bg=new createjs.Shape();
  this.ball=new createjs.Shape();
  this.addChild(this.bg,this.ball)


  this.makeShape();

  }

  var p = createjs.extend(JoyStick, createjs.Container);

  // public properties:


  // public properties:
  p.radius=50
  p.ballRadius=15


  // public methods:
  p.makeShape=function(){
    this.bg.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, this.radius);
    this.ball.graphics.beginFill("red").drawCircle(0, 0, this.ballRadius);
  }
  p.handleMouseDown=function(event){
    this.output={}
    var y=event.stageY-this.y
    var x=event.stageX-this.x
    var radian=Math.atan(y/x)
    if(x>=0&&y>=0){
      //console.log('1')
      this.output.radian=radian;
    }else if (x<0&&y>=0) {
      //console.log('2')
      this.output.radian=Math.PI+radian;
    }else if (x<0&&y<0) {
      //console.log('3')
      this.output.radian=Math.PI+radian;
    }else{
      //console.log('4')
      this.output.radian=2*Math.PI+radian;
    }
    this.output.rotation=this.output.radian*180/Math.PI
  }
  p.handleMouseUp=function(event){
    this.output=null
  }
  p.tick=function(event){
    if(this.output){
      this.ball.x=Math.cos(this.output.radian)*(this.radius)
      this.ball.y=Math.sin(this.output.radian)*(this.radius)
    }else{
      this.ball.x=0
      this.ball.y=0
    }
  }

  module.exports = createjs.promote(JoyStick, "Container");
