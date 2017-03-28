function Snake() {
    this.path = new Path();

    this.path.selected = true;
    // Give the stroke a color
    this.path.strokeColor = 'black';

    this.position = view.center
    this.direction = new Point(10,0)
    this.speed=150;
    this.unitLength=15;

    this.pathBody = []
    var node = new Path.Circle([0, 0], 10)
    node.fillColor = 'blue'
    var symbol = new Symbol(node)
    for (var i = 0; i < 50; i++) {
        this.pathBody.push(symbol.place(this.position))
        this.path.add(this.position)
    }
    this.tick = function(event) {
        var step = this.direction.normalize(event.delta*this.speed)
        this.position += step
        this.path.insert(0, this.position)

        for (var i = 0; i < this.pathBody.length; i++) {
            var computedDistance=this.unitLength*i;
            var actualDistance=this.path.getOffsetOf(this.pathBody[i].position)
            if(actualDistance>computedDistance){
              this.pathBody[i].position = this.path.getPointAt(computedDistance)
            }
        }

        var lastNode=this.pathBody[this.pathBody.length-1]
        var segment=this.path.getLocationOf(lastNode.position).curve.segment2
        if(segment.next){
          this.path.removeSegments(segment.next.index)
        }
    }

}
