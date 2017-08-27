function redMonster(id){
  this.id = id
  this.location = new p5.Vector(240, 240);
  // this.x = 250
  // this.y = 250
  this.d = 20
  this.x = 240
  this.y = 240

  this.angle = PI

  this.speed = new p5.Vector(0,1);
  this.radius = 10
  this.collide = function(){

    for (var i = 0; i<grid.length; i++){
      for (var j = 0; j<grid[i].length; j++){
        if(grid[i][j].on && this.squareCollide(i,j)){
          // console.log(this.angle)
          this.angle += PI
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

  this.bounce = function (){
    
  }

  this.collide1 = function(){
    for (var i = 0; i<grid.length; i++){
      for (var j = 0; j<grid[i].length; j++){
        if(grid[i][j].on && this.squareCollide(i,j)){
          redMonsterColor = color(120,200,0)
          text("hej", 50,50)
        } else {
          redMonsterColor = color(255,0,0)
        }
      }
    }
  }
  this.collideWithLine = function(){
    if (this.lineCollideCheck()) {
      redMonsterColor = color(120,200,0)
      this.bounce();
    } else {
      redMonsterColor = color(255,0,0)
    }
  }

  this.show = function(){
    noStroke()
    fill(redMonsterColor)
    ellipseMode(CENTER);
    // ellipse(this.location.x, this.location.y, 20, 20)
    ellipse(this.location.x, this.location.y, this.d, this.d)
    fill(255,255,0)
  }


  this.lineShow = function(x1, y1, x2, y2){
    // console.log(x1)
    stroke(255,0,255);
    fill(255,255,0);
    line(x1, y1, x2, y2)
  }


  this.walk = function(){
    // console.log(Math.sin(reds[1].angle))
    // this.x -= Math.sin(this.angle)*this.speed
    // this.y += Math.cos(this.angle)*this.speed
    this.location.add(this.speed)

    // this.x = mouseX
    // this.y = mouseY



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


redMonster.prototype.lineCollideCheck = function(i,j){

  let result = false

  this.x = this.location.x
  this.y = this.location.y

  for (var i = 0; i < lines.length; i++){

    let line = lines[i]

    let lineLength = dist(line.x1,line.y1,line.x2,line.y2)

    let lineSlope = ((line.y1-line.y2)/(line.x1-line.x2))
    let objSlope = -1/lineSlope

    let lineOff = line.y1-line.x1*lineSlope
    let objOff = this.y-this.x*objSlope

    let newX = (objOff-lineOff) / (lineSlope-objSlope)
    let newY = newX*objSlope+objOff


    let hor = {x: dist(line.x1, line.y1, line.x2, line.x1), y: 0}
    let v = {x: line.x2-line.x1, y: line.y2-line.y1 }
    let m = {x: this.x-line.x1, y: this.y-line.y1}
    let m2 = {x: this.x-line.x2, y: this.y-line.y2}

    // let dotProduct1 = hor.x*m.x+hor.y*m.y
    // let dotProduct2 = hor.x*m2.x+hor.y*m2.y
    let dotProduct1 = v.x*m.x+v.y*m.y
    let dotProduct2 = v.x*m2.x+v.y*m2.y


    let withinBoundries = (dotProduct1>0 && dotProduct2<0)

    let point
    if (dist(line.x1,line.y1, this.x,this.y) < dist(line.x2,line.y2, this.x,this.y)){
      point = {x:line.x1, y: line.y1}
    } else {
      point = {x:line.x2, y: line.y2}
    }

    let endPointCollides = dist(this.x, this.y, point.x, point.y)<this.d/2
    // console.log(endPointCollides)
    let isOnInfLine = dist(this.x, this.y, newX, newY)<= this.d/2

    if (isOnInfLine && withinBoundries || endPointCollides){

      return true

    } else {
      //DO NOTHING
    }
  }

}
