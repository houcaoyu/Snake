/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



    function SnakeNode() {
      this.Container_constructor();

      this.node=new createjs.Shape();
      this.addChild(this.node)



      this.makeShape();

    }
    var p = createjs.extend(SnakeNode, createjs.Container);

    // public properties:
    SnakeNode.TOGGLE = 60;
    SnakeNode.MAX_THRUST = 2;
    SnakeNode.MAX_VELOCITY = 5;

    // public properties:
    p.body;
    p.radius=50
    p.speed=50
    p.lastStepLength;//上一次tick走的距离

    // public methods:
    p.makeShape=function(){
      this.node.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, this.radius);
      this.node.graphics.endFill();
      this.node.graphics.setStrokeStyle(5, 'round', 'round');
      this.node.graphics.beginStroke('#000000');
      this.node.graphics.moveTo(0, 0);
      this.node.graphics.lineTo(this.radius, 0);
      this.node.graphics.endStroke();
      this.node.x=0;
      this.node.y=0;
    }
    p.tick=function(event){
      var deltaS = event.delta / 1000;
      var distance=deltaS*this.speed;
      this.x=this.x+distance*Math.cos(this.rotation*Math.PI/180);
      this.y=this.y+distance*Math.sin(this.rotation*Math.PI/180);
      this.lastStepLength=distance;
    }

    module.exports = createjs.promote(SnakeNode, "Container");


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var SnakeNode = __webpack_require__(0);
  SnakeBody=function(){
    this.SnakeNode_constructor();
    this.keyPoints=[]

  }
  var p = createjs.extend(SnakeBody, SnakeNode);
  p.head;
  p.keyPoints=[];
  p.status='stop'//stop: default status ,preparetogo:going to start,  movingtotarget: has a target  movingnotarget:has no target
  p.prepareDistance // 前一个节点走多远以后开始走，或者当前节点走多远距离后要切换角度

  p.tick=function(event){
    if(this.status=='stop'){
      this.prepareDistance=this.radius;
      this.status='preparetogo'
    }else if (this.status=='preparetogo') {
      var deltaS = event.delta / 1000;
      var distance=deltaS*this.speed;
      this.prepareDistance=this.prepareDistance-distance;
      if(this.prepareDistance<=0){
        this.status='movingnotarget'
      }
    }else if(this.status=='movingnotarget'){
      if(this.keyPoints.length>0){
        this.status='movingtotarget'
        p.prepareDistance=Math.abs((this.y-this.keyPoints[0].y)/Math.sin(this.rotation*Math.PI/180))
      }

      this.SnakeNode_tick(event)
      this.prepareDistance-=this.lastStepLength;

    }else{
      //status==movingtotarget
      if(this.prepareDistance<=0){
        this.keyPoints.unshift();
        if(this.keyPoints.length>0){
          p.prepareDistance=Math.abs((this.y-this.keyPoints[0].y)/Math.sin(this.rotation*Math.PI/180))
        }else{
          this.status='movingnotarget';
        }
      }
      this.SnakeNode_tick(event)
      this.prepareDistance-=this.lastStepLength;
    }
  }


  module.exports = createjs.promote(SnakeBody, "SnakeNode");


/***/ }),
/* 2 */
/***/ (function(module, exports) {


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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var SnakeNode = __webpack_require__(0);
var SnakeBody  = __webpack_require__(1)

  Snake=function(){
    this.SnakeNode_constructor();
    this.addEventListener('added',function(event){
      console.log('added')
      for (var node of event.currentTarget.body) {
        event.currentTarget.parent.addChild(node);
      }
    })
    this.keyPoints=[]//实际在head中并步使用，但是会复制到身体当中
    for (var i = 0; i < Snake.miniLength; i++) {
      this.appendNode()
    }



  }
  Snake.miniLength=3;
  var p = createjs.extend(Snake, SnakeNode);
  p.body=[]

  p.tick=function(event){
    var x=this.x;
    var y=this.y;
    var rotation=this.rotation;
    this.SnakeNode_tick(event)
    var newNode=this.body.pop()
    newNode.x=x;
    newNode.y=y;
    newNode.rotation=rotation;
    this.body.unshift(newNode);
    for(var node of this.body){
        node.tick(event)
    }
  }
  p.appendNode=function(){
    var node=new SnakeBody();
    var origin=this.body.length>0?this.body[this.body.length-1]:this;
    node.x=origin.x;
    node.y=origin.y;
    node.rotation=origin.rotation;
    node.keyPoints=origin.keyPoints;
    this.body.push(node)
  }
  p.setRotation=function(rotation){
    this.rotation=rotation;
    for (var node of this.body) {
      node.keyPoints.push({
        x:this.x,
        y:this.y,
        rotation:rotation
      })
    }

  }

  module.exports = createjs.promote(Snake, "SnakeNode");


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var SnakeNode=__webpack_require__(0)
var Snake=__webpack_require__(3)
var SnakeBody=__webpack_require__(1)
var JoyStick=__webpack_require__(2)

var stage;
var snake;
var joyStick;
var mouseDown=false;

    window.onload = function(){
        stage = new createjs.Stage("gameCanvas");
        var w=stage.canvas.width;
        var h=stage.canvas.height;
        snake=new Snake();

        joyStick=new JoyStick();
        joyStick.x=joyStick.radius+50;
        joyStick.y=h-50-joyStick.radius;

        stage.addChild(snake,joyStick);
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
      stage.update(event)
    }


/***/ })
/******/ ]);