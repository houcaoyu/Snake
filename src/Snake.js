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
