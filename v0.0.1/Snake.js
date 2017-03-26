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
    this.keyPoints=[];
    x=x||0;
    y=y||0;
    this.x=x;
    this.y=y;
    this.keyPoints.push({x:x,y:y})

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

    var distances=[];
    var points=new Array(this).concat(this.keyPoints)

    for(var i=0;i<points.length-1;i++){
      distances.push(Util.distance(points[i],points[i+1]));
    }

    var maxJ;
    for (var i = 0; i < this.body.length; i++) {
      var node=this.body[i]
      var distance=(i+1)*node.radius
      var total=0;
      var j=0
      for (; j < distances.length; j++) {

        if(distance<=total+distances[j]){
          break;
        }
        total+=distances[j]
      }
      if(j==distances.length){
        var lastPoint=points[points.length-1]
        node.x=lastPoint.x;
        node.y=lastPoint.y;
      }else{
        var point=Util.line(points[j],points[j+1],distance-total)
        node.x=point.x;
        node.y=point.y;
      }
      if(i==this.body.length-1){
        maxJ=j;
      }
    }
    var i=maxJ+1;
    while(i<this.keyPoints.length){
      this.keyPoints.pop()
      i++;
    }

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
    this.keyPoints.unshift({
      x:this.x,
      y:this.y
    })

  }

  module.exports = createjs.promote(Snake, "SnakeNode");
