
 function Make2DArray(rows, cols) {

  var arr = new Array(rows)
  for (var i = 0; i<arr.length; i++){
    arr[i] = new Array(cols)
  }

  return arr
}


var rows = 20
var cols = 20
var rows2 = 1
var cols2 = 1
var w = 20
var speed = 6
var speedCounter = 0
var redMonsters = 5
var allSquares = 0
var redMonsterColor
var pxPurple
var grid
var gridTEST
var pacman;
var reds = []
var lines = []

function setup(){
  // frameRate(5)

  createCanvas(401,401,)
   redMonsterColor = color(255,0,0)
   pxPurple = color(255,0,255)


  grid = Make2DArray(rows, cols)
  gridTEST = Make2DArray(rows2, cols2)

    for (var i = 0; i<grid.length; i++){
      for (var j = 0; j<grid[i].length; j++){
        grid[i][j] = new Cell(i,j)
      }
    }


    gridTEST[0][0] = new CellTEST(0,0)

    lines[0] = new Line(200,300,300,320)
    lines[1] = new Line(100,300,120,220)


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

  for (var j = 0; j<lines.length; j++){
    // lines[j].show();
    // console.log(j)
  }

  pacman.show()

  for (var i = 0; i<redMonsters; i++){
    reds[i].show()
    reds[i].collide()
    reds[i].collideWithLine()
    reds[i].walk()
  }

  pacman.move()
  pacman.moveAni()
  pacman.take()
  // for (var i = 0; i<gridTEST.length; i++){
  //   for (var j = 0; j<gridTEST[i].length; j++){
  //     // grid[i][j].showLine()
  //     gridTEST[i][j].showLine()
  //
  //
  //   }
  // }


  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      // grid[i][j].showLine()


    }
  }



  text(calcPercent(), 10,10)

  if(winPercent>=80){ text("CONGRATULATIONS, YOU ARE VERY GOOD PACXON PLAYER", 10,40) }
}





function die(){
  pacman.x=w/2
  pacman.y=w/2
  pacman.aniX=w/2
  pacman.aniY=w/2
  pacman.prevX=w/2
  pacman.prevY=w/2

    takeArr=[]
    pacman.direction=""

    for (var i = 0; i<grid.length; i++){
      for (var j = 0; j<grid[i].length; j++){
      grid[i][j].takeRoute = false
      grid[i][j].on = false
    }
  }
  startSquare()


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
