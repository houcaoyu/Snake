
  Egg=function(){
    this.Shape_constructor();
    this.makeShape();

  }
  var p = createjs.extend(Egg, createjs.Shape);
  p.radius=5;
  p.energy=1;
  p.active=true;//标志是否还活着
  p.makeShape=function(){
    this.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, this.radius);
    this.graphics.endFill();
  };




  module.exports = createjs.promote(Egg, "Shape");
