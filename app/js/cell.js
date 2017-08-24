

function Cell(x,y){
  this.x = x*w;
  this.y = y*w;
  this.x2 = this.x+w/2
  this.y2 = this.y+w/2
  this.i = [x,y]
  this.on = false
  this.on2 = false
  this.takeRoute = false

  this.hasFlooded = false


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


  // for (var i = 0; i<grid.length/2; i++){
  //   for (var j = 0; j<grid[i].length/2; j++){
  //
  //     grid[i][0].on = true;
  //     grid[i][cols/2-1].on = true;
  //     grid[rows/2-1][j].on = true;
  //     grid[0][j].on = true;
  //
  //   }
  // }
  // grid[1][1].floodFill()

}

var floodArr =[];

Cell.prototype.floodFill = function(){

  if(this.on === false && this.hasFlooded === false){
    this.hasFlooded = true;
    // this.on2 = true;
    floodArr.push(this.i)
    for (var xoff = -1; xoff<=1; xoff++){
      for (var yoff = -1; yoff<=1; yoff++){
        grid[this.i[0]-xoff][this.i[1]-yoff].floodFill()
          // grid[this.i[0]-xoff][this.i[1]-yoff].on2 = true

      }
    }
    return floodArr;

  }
}

function floodReset(){
  floodArr =[];
  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      grid[i][j].hasFlooded = false
    }
  }
}

var checkA
var checkB


function checkFlood(){


}

function checkFlood(){
  var takeArrX, takeArrY, potFloodUp, potFloodDown, potFloodLeft, potFloodRight
  var getFlood  = []

  for (var k = 0; k<takeArr.length;k++){
    takeArrX = takeArr[k][0]
    takeArrY = takeArr[k][1]
    potFloodDown = grid[takeArrX][takeArrY+1]
    potFloodUp = grid[takeArrX][takeArrY-1]
    potFloodRight = grid[takeArrX-1][takeArrY]
    potFloodLeft = grid[takeArrX+1][takeArrY]


    checkFloodDir(potFloodDown)
    checkFloodDir(potFloodUp)
    checkFloodDir(potFloodRight)
    checkFloodDir(potFloodLeft)

  }

  checkArrForMonster(getFlood)

  floodReset()

  function checkFloodDir(dir){
    // console.log(dir)
    if(!dir.on && !dir.hasFlooded && !dir.takeRoute){
      getFlood.push(grid[dir.i[0]][dir.i[1]].floodFill())
      floodArr = []
    }

  }

  function checkArrForMonster(arr){
    let currentX
    let currentY
    let currentCell
    let currentSpace
    let foundMoster
    for (var i = 0; i<arr.length; i++){
      currentSpace = arr[i]
      foundMoster= false

      for (var ii = 0; ii<currentSpace.length; ii++){
        currentX = currentSpace[ii][0]
        currentY = currentSpace[ii][1]
        currentCell = grid[currentX][currentY]

        for (var iii = 0; iii<reds.length; iii++){
          if (dist(currentCell.x,currentCell.y, reds[iii].x, reds[iii].y) < w){
            foundMoster = true
          }
        }
      }
      if (foundMoster) {
        //DO NOTHING
      }else {
        for (var ii = 0; ii<currentSpace.length; ii++){
          currentX = currentSpace[ii][0]
          currentY = currentSpace[ii][1]
          currentCell = grid[currentX][currentY]
          currentCell.on = true
        }
      }

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
