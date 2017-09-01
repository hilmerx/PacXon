function Pac(){
  this.x = w/2
  this.y = w/2
  // this.y = w*5+w/2
  this.aniX = this.x
  this.aniY = this.y
  this.alive = true
  this.direction = ""
  this.lastDirection = ""
  this.takeRoute = false
  this.flying = false
  this.aniSpeed = 4
  this.prevX = w/2
  this.prevY = w/2

  this.move = function(input) {
      switch (this.direction) {
        case 'down': if(this.y<380 && this.aniY % this.y === 0 && this.aniX % this.x === 0){
          this.prevX = this.x
          this.prevY = this.y
          this.y = this.y + w;

        }
          break;
        case 'up': if(this.y>w/2 && this.aniY % this.y === 0 && this.aniX % this.x === 0){
          this.prevX = this.x
          this.prevY = this.y
          this.y = this.y - w;
        }
          break;
        case 'right': if (this.x<380 && this.aniX % this.x === 0 && this.aniY % this.y === 0) {
          this.prevY = this.y
          this.prevX = this.x
          this.x = this.x + w;
        }
          break;
        case 'left': if(this.x>w/2 && this.aniX % this.x === 0 && this.aniY % this.y === 0){
          this.prevY = this.y
          this.prevX = this.x
          this.x = this.x - w;
        }
          break;
      }
  }
  this.moveAni = function(input) {

    if (this.direction === "down" && this.aniY<380 && this.y > this.aniY || this.y > this.aniY){
      this.aniY = this.aniY + this.aniSpeed
    }
    else if (this.direction === "up" && this.y>w/2 && this.y < this.aniY || this.y < this.aniY){
      this.aniY = this.aniY - this.aniSpeed
    }
    else if (this.direction === "right" && this.aniX<380 && this.x > this.aniX || this.x > this.aniX){
      this.aniX = this.aniX + this.aniSpeed
    }
    else if (this.direction === "left" && this.aniX>w/2 && this.x < this.aniX || this.x < this.aniX){
      this.aniX = this.aniX - this.aniSpeed
    }

  }
}

Pac.prototype.show = function(){
  noStroke()
  fill(255,255,0)
  ellipseMode(CENTER);
  ellipse(this.aniX, this.aniY, 20, 20)
  // ellipse(this.x, this.y, 5, 5)
}




var takeArr = []

Pac.prototype.take = function(){
    for (var i = 0; i<cols;i++){
      for (var j = 0; j<rows;j++){
        if(pacman.x-w/2 === grid[i][j].x && pacman.y-w/2 === grid[i][j].y && grid[i][j].on === false){
          pacman.flying = true;
        }


        if(pacman.prevX-w/2 === grid[i][j].x && pacman.prevY-w/2 === grid[i][j].y && grid[i][j].on === false && grid[i][j].takeRoute === false && pacman.flying === true){
          grid[i][j].takeRoute = true
          takeArr.push([i,j]);
      }
    }
  }

  for (var i = 0; i<cols;i++){
    for (var j = 0; j<rows;j++){
      if(pacman.x-w/2 === grid[i][j].x && pacman.y-w/2 === grid[i][j].y && grid[i][j].on === true && pacman.flying){

      //make line ON
      for (var k = 0; k<takeArr.length;k++){
        grid[takeArr[k][0]][takeArr[k][1]].on = true
      }

      //search for floodFill-prospects

      checkFlood()
      takeArr=[];
      emptyRoute()
      initLineChecks()
      pacman.flying = false;

      if (!keyIsPressed){
        pacman.direction=""
      }
    }
  }
}


  //check if collides with tail

  for (var i = 0; i<takeArr.length-1;i++){

    if (takeArr[i][0] === (pacman.x-w/2) /w && takeArr[i][1] === (pacman.y-w/2) /w){
      die()
    }
  }
}


var keyIsPressed=false;

function keyPressed(){
  if (keyCode===RIGHT_ARROW){
    if(pacman.flying && pacman.direction==="left"){

    }else {
      keyIsPressed=true;
      pacman.direction="right"
      pacman.lastDirection = pacman.direction
    }

  }
  else if (keyCode===LEFT_ARROW){
    if(pacman.flying && pacman.direction==="right"){

    }else{
      keyIsPressed=true;

      pacman.direction="left"
      pacman.lastDirection = pacman.direction
    }
  }
  else if (keyCode===UP_ARROW){
    if(pacman.flying && pacman.direction==="down"){

    }else{
      keyIsPressed=true;

      pacman.direction="up"
      pacman.lastDirection = pacman.direction

    }
  }
  else if (keyCode===DOWN_ARROW){
    if(pacman.flying && pacman.direction==="up"){

    }else{
      keyIsPressed=true;

      pacman.direction="down"
      pacman.lastDirection = pacman.direction

    }
  }
}

function keyReleased() {
  if (pacman.direction==="right" && keyCode===RIGHT_ARROW && !pacman.flying){
    keyIsPressed=false;

    pacman.direction=""

  }
  else if (pacman.direction==="left" && keyCode===LEFT_ARROW && !pacman.flying){
    keyIsPressed=false;

    pacman.direction=""

  }
  else if (pacman.direction==="up" && keyCode===UP_ARROW && !pacman.flying){
    keyIsPressed=false;

    pacman.direction=""

  }
  else if (pacman.direction==="down" && keyCode===DOWN_ARROW && !pacman.flying){
    keyIsPressed=false;

    pacman.direction=""
  }
}
