function Pac(){
  this.x = 0
  this.y = 0
  this.alive = true
  this.direction = ""
  this.takeRoute = false
  this.flying = false

  this.move = function(input) {
      switch (this.direction) {
        case 'down': if(this.y<380){this.y = this.y + w;}
          break;
        case 'up': if(this.y>0){this.y = this.y - w;}
          break;
        case 'right': if(this.x<380){this.x = this.x + w;}
          break;
        case 'left': if(this.x>0){this.x = this.x - w;}
          break;
      }
  }
}

Pac.prototype.show = function(){
  fill(255,255,0)
  ellipseMode(CORNER);
  ellipse(this.x, this.y, 20, 20)
}




var takeArr = []

Pac.prototype.take = function(){
    for (var i = 0; i<cols;i++){
      for (var j = 0; j<rows;j++){
        if(pacman.x === grid[i][j].x && pacman.y === grid[i][j].y && grid[i][j].on === false){
          grid[i][j].takeRoute = true
          takeArr.push([i,j]);
          pacman.flying = true;
      }
    }
  }

  for (var i = 0; i<cols;i++){
    for (var j = 0; j<rows;j++){
      if(pacman.x === grid[i][j].x && pacman.y === grid[i][j].y && grid[i][j].on === true && pacman.flying){

        //make line ON
      for (var k = 0; k<takeArr.length;k++){
        grid[takeArr[k][0]][takeArr[k][1]].on = true
      }
      //search for floodFill-prospects
      checkFlood()
      takeArr=[];
      emptyRoute()
      pacman.flying = false;

      if (!keyIsPressed){
        pacman.direction=""
      }
    }
  }
}


  //check if collides with tail
  for (var i = 0; i<takeArr.length-1;i++){
    if (takeArr[i][0] === pacman.x/w && takeArr[i][1] === pacman.y/w){
      die()
      return
    }
  }
}

var keyIsPressed=false;

function keyPressed(){
  if (keyCode===RIGHT_ARROW){
    if(pacman.flying && pacman.direction==="left"){

    }else{
      keyIsPressed=true;
      pacman.direction="right"
    }

  }
  else if (keyCode===LEFT_ARROW){
    if(pacman.flying && pacman.direction==="right"){

    }else{
      keyIsPressed=true;

      pacman.direction="left"
    }
  }
  else if (keyCode===UP_ARROW){
    if(pacman.flying && pacman.direction==="down"){

    }else{
      keyIsPressed=true;

      pacman.direction="up"
    }
  }
  else if (keyCode===DOWN_ARROW){
    if(pacman.flying && pacman.direction==="up"){

    }else{
      keyIsPressed=true;

      pacman.direction="down"
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