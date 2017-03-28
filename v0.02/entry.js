var SnakeNode=require('./SnakeNode.js')
var Snake=require('./Snake.js')
var SnakeBody=require('./SnakeBody.js')
var JoyStick=require('./JoyStick.js')
var Egg=require('./Egg.js')
var Util=require('./Util.js')

var stage,layer,w,h;
var snake,wall;
var eggs=[]
var joyStick;
var mouseDown=false;

window.onload = function(){
  //init Paper.js

  paper.setup(document.getElementById('debugCanvas'));

  //init create.js
  stage = new createjs.Stage("gameCanvas");

  w=stage.canvas.width;
  h=stage.canvas.height;
  layer=new createjs.Container()
  layer.x=w/2;
  layer.y=h/2;
  snake=new Snake();

  //init wall
  wall=new createjs.Shape()
  wall.w=1500
  wall.h=1500
  wall.graphics.beginStroke('#000000');
  wall.graphics.rect(-wall.w/2,-wall.h/2,wall.w,wall.h);
  wall.graphics.endStroke();

  //init eggs
  for(var i=0;i<100;i++){
    var egg=new Egg();
    egg.x=Math.random()*100
    egg.y=Math.random()*100
    layer.addChild(egg)
    eggs.push(egg)
  }

  layer.addChild(snake,wall);

  joyStick=new JoyStick();
  joyStick.x=joyStick.radius+50;
  joyStick.y=h-50-joyStick.radius;

  stage.addChild(layer,joyStick);

  stage.update();
  createjs.Ticker.addEventListener("tick", tick);
  stage.addEventListener("stagemousedown", handleMouseDown);
  stage.addEventListener("stagemousemove", handleMouseOver);
  stage.addEventListener("stagemouseup", handleMouseUp);
};
function handleMouseDown(event){
  mouseDown=true;
  joyStick.handleMouseDown(event)
}
function handleMouseUp(event){
  mouseDown=false;
  joyStick.handleMouseUp(event)
}
function handleMouseOver(event){
  if(mouseDown){
    joyStick.handleMouseDown(event)
  }
}
function tick(event){

  if (joyStick.output) {
    //console.log(joyStick.output.rotation)
    snake.setRotation(joyStick.output.rotation)
  }
  joyStick.tick(event)
  snake.tick(event)

  //判断snake是否吃到egg
  for(var egg of eggs){
    if(egg.active&&Util.hitRadius(egg,snake)){
      layer.removeChild(egg);
      egg.active=false
      snake.energy+=egg.energy;
    }
  }

  //判断是否碰到墙
  if(Util.outsideRect({x:snake.x,y:snake.y,w:snake.radius,h:snake.radius},wall)){
    console.log('dead')
  }

  //update view port
  var p=layer.localToGlobal(snake.x,snake.y)
  layer.x=layer.x+w/2-p.x
  layer.y=layer.y+h/2-p.y

  stage.update(event)
}
