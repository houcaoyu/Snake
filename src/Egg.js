function Egg() {
  this.radius = 5;
  this.energy = 1;
  this.active = true; //标志是否还活着
  this.position=new Point(0,0)
  this.path=new Path.Circle(this.position,this.radius)
  this.path.fillColor='DeepSkyBlue'
}
