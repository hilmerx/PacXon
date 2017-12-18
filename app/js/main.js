let rows = 20
let cols = 20
let rows2 = 1
let cols2 = 1
let w = 20
let speed = 6
let speedCounter = 0

let bouncersNr = 3
let eatersNr = 3
let lineStepperNr =  0

let bouncers = []
let eaters = []
let lineSteppers = []

let monsters = []
let currentMonster

let allSquares = 0
let redMonsterColor
let pxPurple
let grid
let tail
let pacman;
let lines = []
let allLines = []
let frame = 0
let percent = 0
let winPercent = 75


function setup(){
    createCanvas((rows*w)+1,(cols*w)+1)
    redMonsterColor = color(255,0,0)
    pxPurple = color(255,0,255)
    grid = Make2DArray(rows, cols)

    for (let i = 0; i<grid.length; i++){
        for (let j = 0; j<grid[i].length; j++){
            grid[i][j] = new Cell(i,j)
        }
    }

    tail = new Tail()
    startSquare()
    initLineChecks()
    allSquares = (rows-2)*(cols-2)
    pacman = new Pac()

    for (let i = 0; i<bouncersNr; i++){
        bouncers.push(new Bouncer(i))
    }
    monsters.push(bouncers)

    for (let i = 0; i<eatersNr; i++){
        eaters.push(new Eater(i+(bouncersNr)))
    }

    monsters.push(eaters)
}




function draw(){

    frame++
    background(20)

    tail.show()
    tail.wave()
    for (let i = 0; i<grid.length; i++){
        for (let j = 0; j<grid[i].length; j++){
            grid[i][j].show()
        }
    }
    allLines.forEach((data) => {
        lineShow(data.x1, data.y1, data.x2, data.y2)
    })
    pacman.show()

    for (let i = 0; i<monsters.length; i++){
        for (let j = 0; j<monsters[i].length; j++){
            currentMonster = monsters[i][j]
            currentMonster.show()
            currentMonster.collideWithRoute()
            currentMonster.collideWithBorder()
            currentMonster.walk()
            currentMonster.collideWithPacman()

        }
    }

    for (let i = 0; i<monsters.length; i++){
        for (let j = 0; j<monsters[i].length; j++){
            currentMonster = monsters[i][j]
            currentMonster.collideWithMonster()
        }
    }

    for (let i = 0; i<monsters.length; i++){
        for (let j = 0; j<monsters[i].length; j++){
            currentMonster = monsters[i][j]
            currentMonster.setPostCollSpeedAngle()
        }
    }

    pacman.move()
    pacman.moveAni()
    pacman.take()


    let compPercent = calcPercent()

    if (percent >= winPercent) {
        text("CONGRATULATIONS! WELL DONE.", 10,40) 
        text(100 +" %", 365,15)

    } else if (compPercent <= 100){
        text(compPercent +" %", 365,15)
    } 
}





function die(){
    pacman.x = w/2
    pacman.y = w/2
    pacman.aniX = w/2
    pacman.aniY = w/2
    pacman.prevX = w/2
    pacman.prevY = w/2
    tail.waveInitArr = []

    tail.arr=[]
    pacman.direction=""

    for (let i = 0; i<grid.length; i++){
        for (let j = 0; j<grid[i].length; j++){
            grid[i][j].tail = false
            grid[i][j].on = false
            grid[i][j].activeLines = []
        }
    }
    startSquare()
    initLineChecks()
}

function calcPercent(){
    let onSquares = 0;
    for (let i = 1; i<grid.length-1; i++){
        for (let j = 1; j<grid[i].length-1; j++){
            if(grid[i][j].on){
                onSquares++
            }
        }
    }
    percent = (onSquares / allSquares)*100

    return parseInt((percent/winPercent)*100)
}

function initLineChecks() {
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            if (grid[i][j].on === true || grid[i][j].tail === true){
                grid[i][j].lineCheck()
            }
        }
    }
    for (let j = 0; j < cols; j++){
        for (let i = 0; i < rows; i++){
            if (grid[i][j].activeLines.length > 0){
                grid[i][j].lineConsolidation()
                grid[i][j].activeLines = []

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

    for (let i = 0; i < lines.length; i++){
        lines[i].checked = false
    }

    for (let i = 0; i<lines.length; i++){
        let l1 = lines[i]
        if (l1.y1 === l1.y2) {
            mult = 1
            for (let j = 0; j < lines.length; j++){
                let l2 = lines[j]
                if (l1.y1 === l2.y1 && l1.y2 === l2.y2 && l2.checked === false && i !== j && l1.x1 === l2.x1-w*mult) {
                    linesY.push(l2)
                    lines[j].checked = true
                    mult++
                }
            }

            if (linesY.length > 0){
                y = l1.y1
                smallestX = l1.x1
                lastItem = linesY.length-1
                largestX = linesY[lastItem].x2
                newLine = {pos: l1.pos, x1: smallestX ,y1: y , x2: largestX, y2: y}
                newLines.push(newLine)
                lines[i].checked = true
                linesY = []
            } else if (linesY.length===0 && lines[i].checked === false) {
                y = l1.y1
                smallestX = l1.x1
                largestX = l1.x2
                newLine = {pos: l1.pos, x1: smallestX ,y1: y , x2: largestX, y2: y}
                newLines.push(newLine)
            }
        }

        if (l1.x1 === l1.x2) {
            mult = 1
            for (let j = 0; j<lines.length; j++){
                let l2 = lines[j]
                if (l1.x1 === l2.x1 && l1.x2 === l2.x2 && l2.checked === false && i !== j && l1.y1 === l2.y1-w*mult){
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

function lineShow(x1, y1, x2, y2){
    stroke(255,0,255);
    fill(255,255,0);
    line(x1, y1, x2, y2)
}


function Make2DArray(rows, cols) {

    let arr = new Array(rows)
    for (let i = 0; i<arr.length; i++){
        arr[i] = new Array(cols)
    }

    return arr
}
