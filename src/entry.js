var snake=new Snake()
var eggs=[];
var eggSymbol=new Symbol(new Egg().item);
for(var i=0;i<100;i++){
  var egg=new Egg(eggSymbol);
  egg.item.position=new Point(Math.random()*3000,Math.random()*3000)
  eggs.push(egg)
}

var foolSnakes=[];
for(var i=0;i<10;i++){
  var fs=new Snake(new Point(200+100*i,200)); 
  fs.direction.angle=90*(i%2>0?1:-1)
  foolSnakes.push(fs);
}
var timer=new Timer(2,function(){
  $.each(foolSnakes,function(i,n){
    n.direction.angle*=-1
  })
},{loop:true})
timer.start()

function onMouseDrag(event) {
    snake.direction=event.point-snake.position

}

function onFrame(event) {
    snake.tick(event)
    view.center = snake.position

    $.each(foolSnakes,function(i,n){
      n.tick(event)
    })

    //hit test between snake and eggs
    for (var i in eggs) {
      var egg=eggs[i]
      if(!egg.active){
        continue
      }

      if(egg.item.intersects(snake.pathBody[0])){
        egg.setActive(false)
        snake.energy+=egg.energy
      }
    }

    //hit test between snakes
    if(snake.alive){
      $.each(foolSnakes,function(i,fs){
        if(!fs.alive){
          return;
        }

        //player killed fool snakes
        $.each(snake.pathBody,function(j,body){
          if(body.intersects(fs.pathBody[0])){
            fs.die();
          }
        })

        //fool snakes killed player
        $.each(fs.pathBody,function(j,body){
          if(body.intersects(snake.pathBody[0])){
            snake.die()
          }
        })
      })
    }

}
