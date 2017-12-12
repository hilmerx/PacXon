function Cell(x,y) {
    this.x = x*w;
    this.y = y*w;
    this.x2 = this.x+w/2
    this.y2 = this.y+w/2
    this.i = [x,y]
    this.on = false
    this.on2 = false
    this.onPermanent = false
    this.hasFlooded = false
    this.tail = false

    this.lines = [
        {pos: "top", x1:this.x,y1: this.y,x2: this.x+w,y2: this.y},
        {pos: "right", x1:this.x+w,y1: this.y,x2: this.x+w,y2: this.y+w},
        {pos: "bottom", x1:this.x,y1: this.y+w,x2: this.x+w,y2: this.y+w},
        {pos: "left", x1:this.x, y1: this.y, x2: this.x, y2: this.y+w}
    ]
    this.activeLines = []
    this.linesPushed = false



    this.showLine = function() {
        let line
        for (let i = 0; i<this.activeLines.length; i++){
            line = this.activeLines[i]
            if(this.on){
                fill(100,0,0)
                stroke(255,0,255)
                fill(255,120,120)
                bouncers[0].lineShow(line.x1, line.y1, line.x2, line.y2)
            }
        }
    }
    this.show = function() {
        if(this.on2){
            noStroke()
            fill(100,0,0)

        }else if (this.on) {
            stroke(1)
            fill(0,0,150)
            rect(this.x, this.y, 20, 20)

        }else{
            noStroke()

        fill(0,0,0,0)
        }
        rect(this.x, this.y, 20, 20)

    }

    this.lineCheck = function() {

        this.activeLines = []

        let thisX = this.i[0]
        let thisY = this.i[1]

        let above = thisY-1
        let below = thisY+1
        let left = thisX-1
        let right = thisX+1

        if (above >= 0 && (grid[thisX][above].on === false && grid[thisX][above].tail === false) ) {
            this.activeLines.push(this.lines[0])
        }
        if (left >= 0 && (grid[left][thisY].on === false && grid[left][thisY].tail === false)) {
            this.activeLines.push(this.lines[3])
        }
        if (below < cols && (grid[thisX][below].on === false && grid[thisX][below].tail === false)) {
            this.activeLines.push(this.lines[2])
        }
        if (right < rows && (grid[right][thisY].on === false && grid[right][thisY].tail === false)) {
            this.activeLines.push(this.lines[1])
        }

    }

    this.lineConsolidation = function(i) {
        let thisX = this.i[0]
        let thisY = this.i[1]

        let above = thisY-1
        let below = thisY+1
        let left = thisX-1
        let right = thisX+1


        this.activeLines.forEach((data)=>{
            lines.push(data)
        })

    }
}






function startSquare() {
    for (let i = 0; i<grid.length; i++){
        for (let j = 0; j<grid[i].length; j++){

            grid[i][0].on = true;
            grid[i][cols-1].on = true;
            grid[rows-1][j].on = true;
            grid[0][j].on = true;

        }
    }
    for (let i = 0; i<grid.length; i++){
        for (let j = 0; j<grid[i].length; j++){
            if (grid[i][j].on === true) {
                grid[i][j].onPermanent = true
            }
        }
    }
}

let floodArr =[];

Cell.prototype.floodFill = function() {
    if(this.on === false && this.hasFlooded === false){
        this.hasFlooded = true;
        floodArr.push(this.i)
        grid[this.i[0]][this.i[1]+1].floodFill()
        grid[this.i[0]][this.i[1]-1].floodFill()
        grid[this.i[0]+1][this.i[1]].floodFill()
        grid[this.i[0]-1][this.i[1]].floodFill()
        return floodArr;
    }
}


function floodReset() {
    floodArr =[];
    for (let i = 0; i<grid.length; i++){
        for (let j = 0; j<grid[i].length; j++){
            grid[i][j].hasFlooded = false
        }
    }
}


function checkFlood() {

    function checkFloodDir(dir){
        if(!dir.on && !dir.hasFlooded && !dir.tail){
            getFlood.push(grid[dir.i[0]][dir.i[1]].floodFill())
            floodArr = []
        }
    }

    function checkArrForMonster(arr) {
        let currentX
        let currentY
        let currentCell
        let currentSpace
        let foundMoster
        for (let i = 0; i<arr.length; i++){
            currentSpace = arr[i]
            foundMoster= false

            for (let ii = 0; ii<currentSpace.length; ii++){
                currentX = currentSpace[ii][0]
                currentY = currentSpace[ii][1]
                currentCell = grid[currentX][currentY]

                for (let iii = 0; iii<bouncers.length; iii++){
                    if (dist(currentCell.x,currentCell.y, bouncers[iii].location.x, bouncers[iii].location.y) < w){
                        foundMoster = true
                    }
                }
                for (let iii = 0; iii<eaters.length; iii++){
                    if (dist(currentCell.x,currentCell.y, eaters[iii].location.x, eaters[iii].location.y) < w){
                        foundMoster = true
                    }
                }
            }
            if (foundMoster) {
                //DO NOTHING
            } else {
                for (let ii = 0; ii<currentSpace.length; ii++){
                    currentX = currentSpace[ii][0]
                    currentY = currentSpace[ii][1]
                    currentCell = grid[currentX][currentY]
                    currentCell.on = true
                }
            }

        }
    }

    let x, y, potFloodUp, potFloodDown, potFloodLeft, potFloodRight
    let getFlood  = []

    for (let k = 0; k<tail.arr.length;k++){
        x = tail.arr[k].x
        y = tail.arr[k].y
        potFloodDown = grid[x][y+1]
        potFloodUp = grid[x][y-1]
        potFloodRight = grid[x-1][y]
        potFloodLeft = grid[x+1][y]


        checkFloodDir(potFloodDown)
        checkFloodDir(potFloodUp)
        checkFloodDir(potFloodRight)
        checkFloodDir(potFloodLeft)
    }

    checkArrForMonster(getFlood)
    floodReset()
}

function emptyRoute() {
    for (let i = 0; i<grid.length; i++){
        for (let j = 0; j<grid[i].length; j++){
            grid[i][j].tail = false;
        }
    }
}
