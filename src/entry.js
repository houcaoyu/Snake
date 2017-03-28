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
