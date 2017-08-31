
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
var allLines = []
let frame = 0

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


    // gridTEST[0][0] = new CellTEST(0,0)



  allSquares = (rows-2)*(cols-2)

  pacman = new Pac()

  for (var i = 0; i<redMonsters; i++){
    reds[i] = new redMonster(i)
  }

  startSquare()

  initLineChecks()


}




function draw(){
  // console.log("frame nr:", frame)
  // frame++
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
  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      // grid[i][j].showLine()
    }
  }

  allLines.forEach((data) => {
    reds[0].lineShow(data.x1, data.y1, data.x2, data.y2)
  })

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




  // initLineChecks()

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

function initLineChecks() {
  for (var i = 0; i<grid.length; i++){
    for (var j = 0; j<grid[i].length; j++){
      if (grid[i][j].on === true){
        grid[i][j].lineCheck()
      }
    }
  }
  for (var j = 0; j<rows; j++){
    for (var i = 0; i<cols; i++){
      if (grid[i][j].on === true && grid[i][j].activeLines.length>0){
        grid[i][j].lineConsolidation()
      }
    }
  }
  allLines = lineNeighbors()
}

function lineNeighbors(){
  let linesY = []
  let linesX = []
  let newLines = []

  let y
  let smallestX
  let lastItem
  let largestX
  let newLine
  let mult

  for (var i = 0; i<lines.length; i++){
    lines[i].checked = false
  }

  for (var i = 0; i<lines.length; i++){
    let l1 = lines[i]
    if (l1.y1 === l1.y2) {
      mult = 1
      for (var j = 0; j<lines.length; j++){
        let l2 = lines[j]
        if (l1.y1 === l2.y1 && l1.y2 === l2.y2 && l2.checked === false && i !== j && l1.x1 === l2.x1-w*mult){
          // console.log(l2)
          linesY.push(l2)
          lines[j].checked = true
          mult++
        }
      }

      if (linesY.length>0){
        y = l1.y1
        smallestX = l1.x1
        lastItem = linesY.length-1
        largestX = linesY[lastItem].x2
        newLine = {pos: l1.pos, x1: smallestX ,y1: y , x2: largestX, y2: y}
        newLines.push(newLine)
        lines[i].checked = true
        linesY = []
      } else if (linesY.length===0 && lines[i].checked === false) {
        // console.log("hje")
        y = l1.y1
        smallestX = l1.x1
        largestX = l1.x2
        newLine = {pos: l1.pos, x1: smallestX ,y1: y , x2: largestX, y2: y}
        newLines.push(newLine)
      }
    }

    if (l1.x1 === l1.x2) {
      mult = 1
      for (var j = 0; j<lines.length; j++){
        let l2 = lines[j]
        if (l1.x1 === l2.x1 && l1.x2 === l2.x2 && l2.checked === false && i !== j && l1.y1 === l2.y1-w*mult){
          // console.log(l2)
          linesX.push(l2)
          lines[j].checked = true
          mult++
        }
      }

      if (linesX.length>0){
        x = l1.x1
        smallestY = l1.y1
        lastItem = linesX.length-1
        largestY = linesX[lastItem].y2
        newLine = {pos: l1.pos, x1: x ,y1: smallestY , x2: x, y2: largestY}
        newLines.push(newLine)
        lines[i].checked = true
        linesX = []
      } else if (linesX.length===0 && lines[i].checked === false) {
        x = l1.x1
        smallestY = l1.y1
        largestY = l1.y2
        newLine = {pos: l1.pos, x1: x ,y1: smallestY , x2: x, y2: largestY}
        newLines.push(newLine)
      }
    }

    lines[i].checked = true

  }

  lines = []
  return newLines
}
