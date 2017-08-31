function lineStepper(id){
  this.id = id
  this.location = new p5.Vector(30,30);
  this.d = 14

  this.v = new p5.Vector(0,1);
  this.origSpeed = 1
  this.speed = this.origSpeed
  this.radius = 7

  this.show = function(){
    // stroke(100,0,200)
    fill(255,0,0)
    ellipseMode(CENTER);
    // ellipse(this.location.x, this.location.y, 20, 20)
    ellipse(this.location.x, this.location.y, this.d, this.d)
    fill(255,255,0)
  }



  this.walk = function(){
    // console.log(Math.sin(bouncers[1].angle))
    this.location.y -= Math.sin(this.angle)*this.speed
    this.location.x += Math.cos(this.angle)*this.speed
    // this.location.add(this.v)
    this.speed = this.origSpeed
    // this.location.x = mouseX
    // this.location.y = mouseY



  }
}
