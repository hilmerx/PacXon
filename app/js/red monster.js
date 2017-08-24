function redMonster(id){
  this.id = id
  this.x = floor(random(3,12))*w
  this.y = floor(random(3,12))*w
  this.angle = floor(random(1,180))
  this.radius = 10
  this.collide = function(){

    for (var i = 0; i<grid.length; i++){
      for (var j = 0; j<grid[i].length; j++){
        if(grid[i][j].on && this.squareCollide(i,j)){
          this.angle += +2
        }
        if(grid[i][j].takeRoute && this.squareCollide(i,j)){
            die()
        }
      }
    }



  for (var i = 0; i<reds.length; i++){
        if(dist(this.x, this.y, reds[i].x, reds[i].y)<this.radius*2 && reds[i].id+1 !== this.id+1){
          reds[i].angle += -1
          // this.angle += -1
      }
    }
  }

  this.show = function(){
    fill(255,0,0)
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 20, 20)
    fill(255,255,0)
  }


  this.walk = function(){
    // console.log(Math.sin(reds[1].angle))
    this.x -= Math.sin(this.angle)*2
    this.y += Math.cos(this.angle)*2

  }
}

redMonster.prototype.squareCollide = function(i,j){

  var distX = Math.abs(this.x - grid[i][j].x-w/2);
  var distY = Math.abs(this.y - grid[i][j].y-w/2);

  if (distX > (w/2 + this.radius)) { return false; }
  if (distY > (w/2 + this.radius)) { return false; }

  if (distX <= (w/2)) { return true; }
  if (distY <= (w/2)) { return true; }

  var dx=distX-w/2;
  var dy=distY-w/2;

  return (dx*dx+dy*dy<=(this.radius*this.radius));

}

// function keyPressed(){
//   for (var j = 0; j<reds.length; j++){
//     reds[j].angle+=Math.PI
//   }
// }
