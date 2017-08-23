

function Cell(x,y){
  this.x = x*w;
  this.y = y*w;
  this.x2 = this.x+w/2
  this.y2 = this.y+w/2
  this.i = [x,y]
  this.on = false
  this.on2 = false

  this.floodCounted = false


}
   
Cell.prototype.show = function(){
  if(this.on2){
    noStroke()
    fill(100,0,0)

  }else if (this.on) {
    stroke(1)
    fill(0,0,150)
    rect(this.x, this.y, 20, 20)

  }else if (this.takeRoute) {
    noStroke()
    fill(0,0,150)
  }else{
    noStroke()

  fill(20)
  }
  rect(this.x, this.y, 20, 20)

}

function startSquare(){
  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){

      grid[i][0].on = true;
      grid[i][cols-1].on = true;
      grid[rows-1][j].on = true;
      grid[0][j].on = true;

    }
  }

      // grid[4][0].on = true;
      // grid[4][2].on = true;
      //

/*
  for (var i = 0; i<grid.length/2; i++){
    for (var j = 0; j<grid[i].length/2; j++){

      grid[i][0].on = true;
      grid[i][cols/2-1].on = true;
      grid[rows/2-1][j].on = true;
      grid[0][j].on = true;

    }
  }
  grid[0][19].on2=true;*/
}

var floodArr =[];

Cell.prototype.floodFill = function(A,B){
  if(this.on === false && this.floodCounted === false){
    this.floodCounted = true;
    floodArr.push(this.i)
    for (var xoff = -1; xoff<=1; xoff++){
      for (var yoff = -1; yoff<=1; yoff++){
          grid[this.i[0]-xoff][this.i[1]-yoff].floodFill()
      }
    }
  }
  return floodArr;
}

function floodReset(){
  floodArr =[];
  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      grid[i][j].floodCounted = false
    }
  }
}

var checkA
var checkB


function checkFlood(){


}

function checkFlood(){
  var takeArrX
  var takeArrY
  for (var k = 0; k<takeArr.length;k++){
    takeArrX = takeArr[k][0]
    takeArrY = takeArr[k][1]
    if(!grid[takeArrX][takeArrY+1].on && !grid[takeArrX][takeArrY-1].on){
      checkA = grid[takeArrX][takeArrY+1].floodFill()
      floodReset()
      checkB = grid[takeArrX][takeArrY-1].floodFill()
      floodReset()
      console.log(checkA)
      if(checkA.length<checkB.length){
        for (var l = 0; l<checkA.length;l++){
          grid[checkA[l][0]][checkA[l][1]].on=true
        }
      }else {
        for (var l = 0; l<checkB.length;l++){
          grid[checkB[l][0]][checkB[l][1]].on=true
        }
      }
    break

    }else if(!grid[takeArrX+1][takeArrY].on && !grid[takeArrX-1][takeArrY].on){
      checkA = grid[takeArrX+1][takeArrY].floodFill()
      floodReset()
      checkB = grid[takeArrX-1][takeArrY].floodFill()
      floodReset()
      if(checkA.length<checkB.length){
        for (var l = 0; l<checkA.length;l++){
          grid[checkA[l][0]][checkA[l][1]].on=true
        }
      }else {
        for (var l = 0; l<checkB.length;l++){
          grid[checkB[l][0]][checkB[l][1]].on=true
        }
      }
      break
    }
  }
}

function emptyRoute(){
  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      grid[i][j].takeRoute = false;
    }
  }

}
