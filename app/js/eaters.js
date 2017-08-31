function Eater(id){
  this.id = id
  this.location = new p5.Vector(100, 150);
  // this.location = new p5.Vector(58, 45);
  // this.location = new p5.Vector(45, 50);
  // this.x = 250
  // this.y = 250
  this.d = 19
  // this.x = 230
  // this.y = 230
  this.mass = 50

  // this.angle = 3*PI/2
  this.angle = (180-45)*random() * (Math.PI / 180);
  // this.angle = 90 * (Math.PI / 180);
  // this.angle = 180 * (Math.PI / 180)

  this.v = new p5.Vector(0,1);
  this.origSpeed = 0.8
  this.speed = this.origSpeed
  this.radius = 9.5

  this.collide = function(){

    for (var i = 0; i<grid.length; i++){
      for (var j = 0; j<grid[i].length; j++){
        if(grid[i][j].takeRoute && this.squareCollide(i,j)){
          die()
        }
      }
    }

  for (var i = 0; i<bouncers.length; i++){
        if(dist(this.location.x, this.location.y, bouncers[i].location.x, bouncers[i].location.y)<this.radius*2){

          let second = bouncers[i]

          thisSpeedX = Math.cos(this.angle)*this.speed
          thisSpeedY = Math.sin(this.angle)*this.speed
          secondSpeedX = Math.cos(second.angle)*second.speed
          secondSpeedY = Math.sin(second.angle)*second.speed

          thisNewX = (thisSpeedX * (this.mass - second.mass) + (2 * second.mass * secondSpeedX)) / (this.mass + second.mass)
          thisNewY = (thisSpeedY * (this.mass - second.mass) + (2 * second.mass * secondSpeedY)) / (this.mass + second.mass)
          secondNewX = (secondSpeedX * (second.mass - this.mass) + (2 * this.mass * thisSpeedX)) / (this.mass + second.mass)
          secondNewY = (secondSpeedY * (second.mass - this.mass) + (2 * this.mass * thisSpeedY)) / (this.mass + second.mass)

          // console.log(thisNewX,thisNewY)

          this.angle = atan2(thisNewY, thisNewX)
          this.speed = dist(0,0,thisNewX,thisNewY)
          // console.log(this.angle)
          this.walk()

          bouncers[i].angle = atan2(secondNewY, secondNewX)
          bouncers[i].speed = dist(0,0,secondNewX,secondNewY)

          // console.log(this.angle)
          // console.log(bouncers[i].angle)
          bouncers[i].walk()
      }
    }
  }


  this.bounce = function (line){

    // console.log(line)

    let lineSlope = (line.y2-line.y1)/(line.x2-line.x1)
    let linePerpSlope = -1/lineSlope
    let linePerpVector = new p5.Vector(1,linePerpSlope)


    let thisAngleDeg = this.angle* (180 / PI);
    let linePerpRad = Math.atan(linePerpSlope, 1)

    let linePerpDeg = (linePerpRad * (180 / PI) *-1) + 180
    // console.log(linePerpDeg)
    // console.log(thisAngleDeg)
    let newAngleDiff = (thisAngleDeg - linePerpDeg)*2
    // console.log(newAngleDiff)
    // console.log(thisAngleDeg - newAngleDiff)*2
    let newAngle = (thisAngleDeg - newAngleDiff)+180

    // console.log(newAngle)

    let newAngleRad = newAngle * (Math.PI / 180)
    // console.log(newAngleRad)

    // console.log(newAngle)

    this.angle = newAngleRad+0.02
    this.speed = this.speed+0.02
  }

  this.endPointBounce = function (point){
    let p = point
    pc = {x: p.x, y: p.y, r: this.d/2}
    dot = {x: this.location.x, y:this.location.y, angle: this.angle* (180 / PI)}

    diffY = dot.y-pc.y
    diffX = dot.x-pc.x

    angleOfColl = atan2(diffY, diffX)*-1* (180 / PI)

    diffAngle = ((dot.angle-180) - angleOfColl)*2
    console.log(diffAngle)
    newAngleinRad = (dot.angle-180 - diffAngle)* (PI / 180)

    // console.log(newAngleinRad)
    this.angle = newAngleinRad
    this.speed = this.speed+0.02




  }



  this.collideWithLine = function(){
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

  this.show = function(){
    // stroke(100,0,200)
    fill(255,0,0)
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
    // console.log(Math.sin(bouncers[1].angle))
    this.location.y -= Math.sin(this.angle)*this.speed
    this.location.x += Math.cos(this.angle)*this.speed
    // this.location.add(this.v)
    this.speed = this.origSpeed
    // this.location.x = mouseX
    // this.location.y = mouseY



  }
}

Eater.prototype.eatCell = function(){
  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      if(this.squareCollide(i,j) && grid[i][j].onPermanent === false) {
        grid[i][j].on = false
        initLineChecks()
      }
    }
  }
}

Eater.prototype.squareCollide = function(i,j){

  var distX = Math.abs(this.location.x - grid[i][j].x-w/2);
  var distY = Math.abs(this.location.y - grid[i][j].y-w/2);

  if (distX > (w/2 + this.radius)) { return false; }
  if (distY > (w/2 + this.radius)) { return false; }

  if (distX <= (w/2)) { return true; }
  if (distY <= (w/2)) { return true; }

  var dx=distX-w/2;
  var dy=distY-w/2;

  return (dx*dx+dy*dy<=(this.radius*this.radius));

}


Eater.prototype.lineEndCollideCheck = function(obj){
  let point
  let lines
  let endPointCollides

  lines = allLines
  for (var i = 0; i < lines.length; i++){
    let l = lines[i]

    if (dist(l.x1,l.y1, this.location.x,this.location.y) < dist(l.x2,l.y2, this.location.x,this.location.y)){
      point = {x:l.x1, y: l.y1}
    } else {
      point = {x:l.x2, y: l.y2}
    }

    endPointCollides = dist(this.location.x, this.location.y, point.x, point.y)<this.d/2
    if (endPointCollides) {

      return point

    } else {
      //DO NOTHING
    }
  }

}

Eater.prototype.lineCollideCheck = function(obj){
  let lines = allLines
  let lineLength
  let line
  let lineSlope
  let objSlope
  let lineOff
  let objOff
  let newX
  let newY
  let hor
  let v
  let m
  let m2
  let dotProduct1
  let dotProduct2
  let withinBoundries
  let point
  let endPointCollides
  let isOnInfLine
  let linesToReturn =[]

  for (var i = 0; i < lines.length; i++){
    // console.log(i)
    l = lines[i]
    lineLength = dist(l.x1,l.y1,l.x2,l.y2)

    if (l.x1 === l.x2){
      lineSlope = 0
    } else {
      lineSlope = ((l.y2-l.y1)/(l.x2-l.x1))
    }


    if (lineSlope === 0){
      objSlope = 0
    } else {
      objSlope = -1/lineSlope
    }


    lineOff = l.y1-l.x1*lineSlope
    objOff = this.location.y-this.location.x*objSlope

    if (l.x1 == l.x2){
      newX = l.x1
      newY = this.location.y

    } else if (l.y1 == l.y2) {
      newY = l.y1
      newX = this.location.x

    } else {
      newX = (objOff-lineOff) / (lineSlope-objSlope)
      newY = newX*objSlope+objOff
    }

    hor = {x: dist(l.x1, l.y1, l.x2, l.x1), y: 0}
    v = {x: l.x2-l.x1, y: l.y2-l.y1 }
    m = {x: this.location.x-l.x1, y: this.location.y-l.y1}
    m2 = {x: this.location.x-l.x2, y: this.location.y-l.y2}

    dotProduct1 = v.x*m.x+v.y*m.y
    dotProduct2 = v.x*m2.x+v.y*m2.y

    withinBoundries = (dotProduct1>0 && dotProduct2<0)

    isOnInfLine = dist(this.location.x, this.location.y, newX, newY)< this.d/2

    if (isOnInfLine && withinBoundries){
      linesToReturn.push(l)
    } else{
      //DO NOTHING
    }
  }
  return linesToReturn
}
