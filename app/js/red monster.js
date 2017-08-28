function redMonster(id){
  this.id = id
  this.location = new p5.Vector(200 - id*w , 350 - id*w);
  // this.x = 250
  // this.y = 250
  this.d = 20
  // this.x = 230
  // this.y = 230

  // this.angle = 3*PI/2
  this.angle = Math.random()*322 * (Math.PI / 180);
  // this.angle = PI

  this.v = new p5.Vector(0,1);
  this.origSpeed = 1
  this.speed = this.origSpeed
  this.radius = 10

  this.collide = function(){

    for (var i = 0; i<grid.length; i++){
      for (var j = 0; j<grid[i].length; j++){
        if(grid[i][j].takeRoute && this.squareCollide(i,j)){
          die()
        }
      }
    }

  for (var i = 0; i<reds.length; i++){
        if(dist(this.location.x, this.location.y, reds[i].location.x, reds[i].location.y)<this.radius*2 && reds[i].id+1 !== this.id+1){
          reds[i].angle += 179*random() * (Math.PI / 180);
      }
    }
  }


  this.bounce = function (i, j, line){
    // console.log(i,j,line)
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

    this.angle = newAngleRad+0.02;
    this.speed = this.speed +3;
  }

  this.collideWithLine = function(){
    for (var i = 0; i<grid.length; i++){
      for (var j = 0; j<grid[i].length; j++){

        if(grid[i][j].on){
          // console.log(grid[i][j])
          collidingLine =this.lineCollideCheck(grid[i][j])
          if (collidingLine) {

            // text("HELLLLOO", 200,200)
            // console.log(collidingLine)

            // redMonsterColor = color(120,200,0)
            this.bounce(i, j, collidingLine);
            return
          } else {
            redMonsterColor = color(255,0,0)
          }
        }
      }
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
    this.location.y -= Math.sin(this.angle)*this.speed
    this.location.x += Math.cos(this.angle)*this.speed
    // this.location.add(this.v)
    this.speed = this.origSpeed
    // this.location.x = mouseX
    // this.location.y = mouseY



  }
}

redMonster.prototype.squareCollide = function(i,j){

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

let result
redMonster.prototype.lineCollideCheck = function(obj){


  let lines = obj.lines
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

  // this.x = this.location.x
  // this.y = this.location.y

  for (var i = 0; i < lines.length; i++){

    l = lines[i]


    // console.log( line)

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

    // let dotProduct1 = hor.x*m.x+hor.y*m.y
    // let dotProduct2 = hor.x*m2.x+hor.y*m2.y
    dotProduct1 = v.x*m.x+v.y*m.y
    dotProduct2 = v.x*m2.x+v.y*m2.y



    withinBoundries = (dotProduct1>0 && dotProduct2<0)


    if (dist(l.x1,l.y1, this.location.x,this.location.y) < dist(l.x2,l.y2, this.location.x,this.location.y)){
      point = {x:l.x1, y: l.y1}
    } else {
      point = {x:l.x2, y: l.y2}
    }

    endPointCollides = dist(this.location.x, this.location.y, point.x, point.y)<this.d/2-6
    isOnInfLine = dist(this.location.x, this.location.y, newX, newY)< this.d/2

    if (isOnInfLine && withinBoundries /*|| endPointCollides*/){

      return l

    } else {
      //DO NOTHING
    }
  }
}
