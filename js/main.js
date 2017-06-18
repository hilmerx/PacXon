function Make2DArray(rows, cols) {

  var arr = new Array(rows)
  for (var i = 0; i<arr.length; i++){
    arr[i] = new Array(cols)
  }

  return arr
}


var rows=20
var cols=20
var w=20
var speed=2
var speedCounter=0;
var redMonsters = 3
var allSquares=0


var grid
var pacman;
var reds = []

function setup(){
  frameRate(20);
  createCanvas(401,401,)


  grid = Make2DArray(rows, cols)

  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      grid[i][j] = new Cell(i,j)
    }
  }

  allSquares = (rows-2)*(cols-2)

  pacman = new Pac()

  for (var i = 0; i<redMonsters; i++){
    reds[i] = new redMonster(i)
  }

  startSquare()
}




function draw(){
  background(180)
  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      grid[i][j].show();
    }
  }
  pacman.show()

  for (var i = 0; i<redMonsters; i++){
    reds[i].show()
    reds[i].collide()
    // console.log('REDS[I].COLLIDE()', reds[i].collide())
    reds[i].walk()
  }

  if(speedCounter===speed){
    pacman.move()
    pacman.take()

    speedCounter=0
  }
  speedCounter++

  text(calcPercent(), 10,10)

  if(winPercent>=80){ text("CONGRATULATIONS, YOU ARE VERY GOOD PACXON PLAYER", 10,40) }
}





function die(){
  pacman.x=0
  pacman.y=0
  takeArr=[]
  pacman.direction=""

  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      grid[i][j].takeRoute = false;
      grid[i][j].on = false;
      startSquare()


    }
  }

}

function calcPercent(){
  var onSquares = 0;
  for (var i = 1; i<grid.length-1; i++){
    for (var j = 1; j<grid[i].length-1; j++){
      if(grid[i][j].on){
        onSquares++
      }
    }
  }

  return winPercent = parseInt(onSquares / allSquares*100)

}
