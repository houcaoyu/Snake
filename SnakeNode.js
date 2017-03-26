

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
    p.radius=15
    p.speed=150
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
