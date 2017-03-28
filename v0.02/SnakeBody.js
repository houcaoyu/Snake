var SnakeNode = require('./SnakeNode.js');
  SnakeBody=function(){
    this.SnakeNode_constructor();

  }
  var p = createjs.extend(SnakeBody, SnakeNode);
  p.head;




  module.exports = createjs.promote(SnakeBody, "SnakeNode");
