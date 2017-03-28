var SnakeNode = require('./SnakeNode.js');
var SnakeBody  = require('./SnakeBody.js');
var Util=require('./Util.js')

  Snake=function(x,y){

    this.SnakeNode_constructor();
    this.addEventListener('added',function(event){
      console.log('added')
      for (var node of event.currentTarget.body) {
        event.currentTarget.parent.addChild(node);
      }
    })
    this.path=new paper.Path();
    x=x||0;
    y=y||0;
    this.x=x;
    this.y=y;
    this.path.add(new paper.Point(x,y))

  }

  var p = createjs.extend(Snake, SnakeNode);
  p.body=[]
  p.energy=100;//每10个energy加一个node

  p.tick=function(event){

    this.SnakeNode_tick(event)

    var bodySize=Math.floor(this.energy/10)
    if(bodySize>this.body.length){
      for (var i = 0; i < bodySize-this.body.length; i++) {
        this.appendNode()
      }
    }else{
      for (var i = 0; i < this.body.length-bodySize; i++) {
        this.body.pop();
      }
    }


    this.path.insert(0,new paper.Point(this.x,this.y))

    for (var i = 0; i < this.body.length; i++) {
      var node=this.body[i]
      var distance=(i+1)*node.radius

      var actualDistance=this.path.getOffsetOf(new paper.Point(node.x,node.y))
      if(actualDistance>=distance){
        var point=this.path.getPointAt(distance)
        node.x=point.x;
        node.y=point.y;
      }

    }
    var snakeLength=this.body.length*this.radius;
    var lastIndex=0;
    for (var i=this.path.segments.length-2;i>1;i--) {
      var point=this.path.segments[i].point
      if(this.path.getOffsetOf(point)>snakeLength){
          lastIndex=i;
      }else{
        break;
      }
    }
    if(lastIndex>0)
      this.path.removeSegments(lastIndex+1)
    this.path.removeSegments(0,1)

  }
  p.appendNode=function(){
    var node=new SnakeBody();
    var origin=this.body.length>0?this.body[this.body.length-1]:this;
    node.x=origin.x;
    node.y=origin.y;
    this.body.push(node)
    this.parent.addChild(node)
  }
  p.setRotation=function(rotation){
    if(this.rotation==rotation)
      return ;
    this.rotation=rotation;
    this.path.insert(0,new paper.Point(this.x,this.y))

  }

  module.exports = createjs.promote(Snake, "SnakeNode");
