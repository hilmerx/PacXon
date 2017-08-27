

function Line(x1,y1,x2,y2){
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;


}

Line.prototype.show = function(){
  stroke(255);
  fill(255,255,0);

  line(this.x1, this.y1, this.x2, this.y2)
}
