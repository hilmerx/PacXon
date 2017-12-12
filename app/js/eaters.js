function Eater(id){

  this.id = id
  this.location = new p5.Vector(82, 50*(id+1)+50)
  // this.location = new p5.Vector(250,110)

  this.r = 9.5
  this.mass = 50
  this.angle = (180-45)*random() * (Math.PI / 180);
  // this.angle = (180) * (Math.PI / 180);
  this.origSpeed = 0.8
  this.speed = this.origSpeed
  this.color = color(255,0,0)
  this.speedTemp = this.speed
  this.angleTemp = this.angle


  this.collideWithBorder = function(){
    collidingLines =this.lineCollideCheck()
    collidingLineEnd =this.lineEndCollideCheck()
    if (collidingLines.length>0) {
      collidingLines.forEach((line) => {
        this.bounce(line)
        this.eatCell()
      })
      return
    } else if (collidingLineEnd) {
      this.endPointBounce(collidingLineEnd)
      this.eatCell()
    } else {
      //DO NOTHING
    }
  }


  this.eatCell = function(){
    for (var i = 0; i<grid.length; i++){
      for (var j = 0; j<grid[i].length; j++){
        if(this.squareCollide(i,j) && grid[i][j].onPermanent === false) {
          grid[i][j].on = false
          initLineChecks()
          if (grid[i][j].x2 === pacman.x && grid[i][j].y2 === pacman.y) {
            pacman.direction = pacman.lastDirection
            pacman.flying = true;
          }
        }
      }
    }
  }

}

Eater.prototype = new innerMonster();
