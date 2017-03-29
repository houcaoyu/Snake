function Snake(position) {
    this.path = new Path();

    this.path.selected = true;
    // Give the stroke a color
    this.path.strokeColor = 'black';

    this.position = position||view.center
    this.direction = new Point(10,0)
    this.speed=150;
    this.unitLength=15;
    this.minBodyCount=10;
    this.energy=0;
    this.unitEnergy=10;
    this.alive=true;

    this.pathBody = []
    var node = new Path.Circle([0, 0], 10)
    node.fillColor = 'blue'
    var symbol = new Symbol(node)
    for (var i = 0; i < this.minBodyCount; i++) {
        this.pathBody.push(symbol.place(this.position))
        this.path.add(this.position)
    }
    this.tick = function(event) {
        if(!this.alive){
          return ;
        }
        //update the path
        var step = this.direction.normalize(event.delta*this.speed)
        this.position += step
        this.path.insert(0, this.position)

        //update every body's position
        for (var i = 0; i < this.pathBody.length; i++) {
            var computedDistance=this.unitLength*i;
            var position=this.path.getPointAt(computedDistance)
            if(position){
              this.pathBody[i].position=position
            }else{
              this.pathBody[i].position=this.path.lastSegment.point
            }
        }

        var lastNode=this.pathBody[this.pathBody.length-1]
        var totalLength=(this.pathBody.length-1)*this.unitLength
        var location=this.path.getLocationAt(totalLength)
        if(location){
          var segment=location.curve.segment2
          if(segment.next){
            this.path.removeSegments(segment.next.index)
          }
          segment.point=lastNode.position
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
    this.die=function(){
      this.alive=false;
      $.each(this.pathBody,function(i,body){
        body.visible=false;
      })
    }

}
