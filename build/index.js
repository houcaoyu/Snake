function Egg() {
  this.radius = 5;
  this.energy = 1;
  this.active = true; //标志是否还活着
  this.position=new Point(0,0)
  this.path=new Path.Circle(this.position,this.radius)
  this.path.fillColor='DeepSkyBlue'
  this.setActive=function(active){
    this.active=active;
    this.path.visible=active;
  }
}

  //
  // function JoyStick() {
  // this.Container_constructor();
  //
  // this.bg=new createjs.Shape();
  // this.ball=new createjs.Shape();
  // this.addChild(this.bg,this.ball)
  //
  //
  // this.makeShape();
  //
  // }
  //
  // var p = createjs.extend(JoyStick, createjs.Container);
  //
  // // public properties:
  //
  //
  // // public properties:
  // p.radius=50
  // p.ballRadius=15
  //
  //
  // // public methods:
  // p.makeShape=function(){
  //   this.bg.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, this.radius);
  //   this.ball.graphics.beginFill("red").drawCircle(0, 0, this.ballRadius);
  // }
  // p.handleMouseDown=function(event){
  //   this.output={}
  //   var y=event.stageY-this.y
  //   var x=event.stageX-this.x
  //   var radian=Math.atan(y/x)
  //   if(x>=0&&y>=0){
  //     //console.log('1')
  //     this.output.radian=radian;
  //   }else if (x<0&&y>=0) {
  //     //console.log('2')
  //     this.output.radian=Math.PI+radian;
  //   }else if (x<0&&y<0) {
  //     //console.log('3')
  //     this.output.radian=Math.PI+radian;
  //   }else{
  //     //console.log('4')
  //     this.output.radian=2*Math.PI+radian;
  //   }
  //   this.output.rotation=this.output.radian*180/Math.PI
  // }
  // p.handleMouseUp=function(event){
  //   this.output=null
  // }
  // p.tick=function(event){
  //   if(this.output){
  //     this.ball.x=Math.cos(this.output.radian)*(this.radius)
  //     this.ball.y=Math.sin(this.output.radian)*(this.radius)
  //   }else{
  //     this.ball.x=0
  //     this.ball.y=0
  //   }
  // }
  //
  // module.exports = createjs.promote(JoyStick, "Container");

function Snake() {
    this.path = new Path();

    this.path.selected = true;
    // Give the stroke a color
    this.path.strokeColor = 'black';

    this.position = view.center
    this.direction = new Point(10,0)
    this.speed=150;
    this.unitLength=15;
    this.minBodyCount=10;
    this.energy=0;
    this.unitEnergy=10;

    this.pathBody = []
    var node = new Path.Circle([0, 0], 10)
    node.fillColor = 'blue'
    var symbol = new Symbol(node)
    for (var i = 0; i < this.minBodyCount; i++) {
        this.pathBody.push(symbol.place(this.position))
        this.path.add(this.position)
    }
    this.tick = function(event) {

        //update the path
        var step = this.direction.normalize(event.delta*this.speed)
        this.position += step
        this.path.insert(0, this.position)

        //update every body's position
        for (var i = 0; i < this.pathBody.length; i++) {
            var computedDistance=this.unitLength*i;
            var actualDistance=this.path.getOffsetOf(this.pathBody[i].position)
            if(actualDistance>computedDistance){
              this.pathBody[i].position = this.path.getPointAt(computedDistance)
            }
        }

        //remove suplurs segments of the path
        var lastNode=this.pathBody[this.pathBody.length-1]
        var segment=this.path.getLocationOf(lastNode.position).curve.segment2
        if(segment.next){
          this.path.removeSegments(segment.next.index)
        }

        //append or remove body according to energy
        if(this.energy<0){
          this.energy=0;
        }
        var bodyEnergy=(this.pathBody.length-this.minBodyCount)*this.unitEnergy

        if(this.energy-bodyEnergy>=this.unitEnergy){
          this.appendBody();
        }else if(bodyEnergy>this.energy){
          this.removeBody()
        }

    }
    this.appendBody=function(){
      var lastBody=this.pathBody[this.pathBody.length-1]
      this.pathBody.push(symbol.place(lastBody.position))
    }
    this.removeBody=function(){
      if(this.pathBody.length>this.minBodyCount){
        this.pathBody.pop();
      }
    }

}

// module.exports={
//   line:function(startP,endP,distance){
//     var a=endP.x-startP.x
//     var b=endP.y-startP.y;
//     var c=Math.sqrt(a*a+b*b)
//     var cos=a/c;
//     var sin=b/c;
//     return {
//       x:startP.x+distance*cos,
//       y:startP.y+distance*sin,
//       inside:c>=distance?true:false
//     }
//   },
//   distance:function(startP,endP){
//     var a=endP.x-startP.x
//     var b=endP.y-startP.y;
//     return Math.sqrt(a*a+b*b)
//   },
//   //判断两个圆形对象是否碰撞
//   //objA,objB：两个对象的属性，应是下面的格式
//   //x,y:圆心的坐标，radius:半径
//   //返回值：boolean，标志是否碰撞
//   hitRadius:function(objA,objB){
//     //early returns speed it up
// 		if (objA.x - objA.radius > objB.x + objB.radius) {
// 			return false;
// 		}
// 		if (objA.x + objA.radius < objB.x - objB.radius) {
// 			return false;
// 		}
//
// 		if (objA.y - objA.radius > objB.y + objB.radius) {
// 			return false;
// 		}
//
// 		if (objA.y + objA.radius < objB.y - objB.radius) {
// 			return false;
// 		}
//
// 		//now do the circle distance test
// 		return objB.radius + objA.radius > Math.sqrt(Math.pow(Math.abs(objB.x - objA.x), 2) + Math.pow(Math.abs(objB.y - objA.y), 2));
//   },
//   //判断第一个方形是否在第二个方形外面，只要有一个部分出去就算在外面
//   //x,y  方形中心坐标，w,h宽和高
//   outsideRect:function(rectA,rectB){
//     if(rectA.x-rectA.w/2<rectB.x-rectB.w/2){
//       return true;
//     }
//     if(rectA.x+rectA.w/2>rectB.x+rectB.w/2){
//       return true;
//     }
//     if(rectA.y-rectA.h/2<rectB.y-rectB.h/2){
//       return true;
//     }
//     if(rectA.y+rectA.h/2>rectB.y+rectB.h/2){
//       return true;
//     }
//     return false;
//   }
// }

var snake=new Snake()
var eggs=[];
for(var i=0;i<100;i++){
  var egg=new Egg();
  egg.path.position=new Point(Math.random()*300,Math.random()*300)
  eggs.push(egg)
}
function onMouseDrag(event) {
    snake.direction=event.point-snake.position

}

function onFrame(event) {
    snake.tick(event)
    view.center = snake.position

    //hit test between snake and eggs
    for (var i in eggs) {
      var egg=eggs[i]
      if(!egg.active){
        continue
      }

      if(egg.path.intersects(snake.pathBody[0])){
        egg.setActive(false)
        snake.energy+=egg.energy
      }
    }
}
