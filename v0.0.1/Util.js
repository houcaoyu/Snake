module.exports={
  line:function(startP,endP,distance){
    var a=endP.x-startP.x
    var b=endP.y-startP.y;
    var c=Math.sqrt(a*a+b*b)
    var cos=a/c;
    var sin=b/c;
    return {
      x:startP.x+distance*cos,
      y:startP.y+distance*sin,
      inside:c>=distance?true:false
    }
  },
  distance:function(startP,endP){
    var a=endP.x-startP.x
    var b=endP.y-startP.y;
    return Math.sqrt(a*a+b*b)
  },
  //判断两个圆形对象是否碰撞
  //objA,objB：两个对象的属性，应是下面的格式
  //x,y:圆心的坐标，radius:半径
  //返回值：boolean，标志是否碰撞
  hitRadius:function(objA,objB){
    //early returns speed it up
		if (objA.x - objA.radius > objB.x + objB.radius) {
			return false;
		}
		if (objA.x + objA.radius < objB.x - objB.radius) {
			return false;
		}

		if (objA.y - objA.radius > objB.y + objB.radius) {
			return false;
		}

		if (objA.y + objA.radius < objB.y - objB.radius) {
			return false;
		}

		//now do the circle distance test
		return objB.radius + objA.radius > Math.sqrt(Math.pow(Math.abs(objB.x - objA.x), 2) + Math.pow(Math.abs(objB.y - objA.y), 2));
  }
}
