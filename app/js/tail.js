function TailCell(x,y) {
  this.x = x
  this.y = y
  this.waveInit = false
  this.wave = false

  this.lines = [
                {pos: "top", x1:this.x,y1: this.y,x2: this.x+w,y2: this.y},
                {pos: "right", x1:this.x+w,y1: this.y,x2: this.x+w,y2: this.y+w},
                {pos: "bottom", x1:this.x,y1: this.y+w,x2: this.x+w,y2: this.y+w},
                {pos: "left", x1:this.x, y1: this.y, x2: this.x, y2: this.y+w}
              ]

}


function Tail() {
  this.arr = []
  this.waveInitArr = []
  this.waveModulo = 0

  this.waveInit = function(x,y) {
    this.arr.forEach((data, nr)=>{
      if (data.x === x && data.y === y && data.wave === false) {
        this.waveInitArr.push([nr, nr])
        data.wave = true
      }
    })
  }

  this.wave = function(){
    if (this.waveInitArr.length>0 && this.waveModulo % 2===0){
      this.waveInitArr.forEach( (initSpot)=>{
        let minus = initSpot[0]--
        let plus = initSpot[1]++

        if (minus>=0  && this.waveInitArr.length>0){
          this.arr[minus].wave = true
        }
        if (plus<this.arr.length && this.waveInitArr.length>0){
          this.arr[plus].wave = true
        } else {
          die()
        }
      })
    }
    this.waveModulo++
  }

  this.show = function(){
    tail.arr.forEach((data) => {
      if (data.wave) {
        noStroke()
        fill(200,0,150)
      } else {
        noStroke()
        fill(20)
      }
      rect(data.x*w, data.y*w, 20, 20)
    })
  }

  this.lineCheck = function(){

    this.activeLines = []

    let thisX = this.x
    let thisY = this.y

    let above = thisY-1
    let below = thisY+1
    let left = thisX-1
    let right = thisX+1

    if (above >= 0 && grid[thisX][above].on === false) {
      this.activeLines.push(this.lines[0])
    }
    if (left >= 0 && grid[left][thisY].on === false) {
      this.activeLines.push(this.lines[3])
    }
    if (below < rows && grid[thisX][below].on === false) {
      this.activeLines.push(this.lines[2])
    }
    if (right < cols && grid[right][thisY].on === false) {
      this.activeLines.push(this.lines[1])
    }

  }


}
