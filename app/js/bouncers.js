function Bouncer(id){
  this.id = id
  this.location = new p5.Vector(60, 30*(id+1));
  this.d = 16
  this.r = 8
  this.mass = 10
  this.angle = 90 * (Math.PI / 180);
  this.origSpeed = 2
  this.speed = this.origSpeed
  this.color = color(150,200,0,200)

  this.collideWithBorder = function(){
    collidingLines =this.lineCollideCheck()
    collidingLineEnd =this.lineEndCollideCheck()
    if (collidingLines.length>0) {
      collidingLines.forEach((line) => {
        this.bounce(line)
      })
      return
    } else if (collidingLineEnd) {
        this.endPointBounce(collidingLineEnd)
    } else {
      //DO NOTHING
    }
  }
}

Bouncer.prototype = new innerMonster();
