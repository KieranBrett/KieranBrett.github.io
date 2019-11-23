function movementUpdate() {
    if (sprinting === true){
      effectiveStep = STEPSIZE * SPRINTMULTIPLIER;
    }
    else{
      effectiveStep = STEPSIZE;
    }
  
    if (moving) {
      movePlayer();
    }
  
    playerY -= yVelocity;
    yVelocity += GRAVITYFORCE;
  
    for (var i = 0; i < squares.length; i++) {
      if (
        playerY + PLAYERHEIGHT >= squares[i].y &&
        playerX + PLAYERWIDTH >= squares[i].relX &&
        playerX <= squares[i].relX + squares[i].picture.width &&
        playerY <= parseInt(squares[i].y) + squares[i].picture.height
      ) {
        if (
          playerY + PLAYERHEIGHT >=
            parseInt(squares[i].y) + squares[i].picture.height &&
          jumping == true
        ) {
          console.log("under");
          yVelocity = 0;
          playerY = parseInt(squares[i].y) + squares[i].picture.height + 1;
        } else {
          playerY = squares[i].y - PLAYERHEIGHT;
          jumping = false;
          doubleJumped = false;
          yVelocity = 0;
        }
      }
    }
  
    if (playerY + PLAYERHEIGHT >= GRASSPOS) {
      // 500 is position of grass
      playerY = GRASSPOS - PLAYERHEIGHT;
      jumping = false;
      doubleJumped = false;
    }
  }

  function movePlayer() {
    let tempX;
    let canMove = true;
  
    if (direction === 0) {
      tempX = playerX - effectiveStep;
    } else {
      tempX = playerX + effectiveStep;
    }
  
    squares.forEach(s => {
      if (
        tempX + PLAYERWIDTH >= s.relX &&
        tempX <= parseInt(s.relX) + s.picture.width &&
        playerY + PLAYERHEIGHT > s.y &&
        playerY <= parseInt(s.y) + s.picture.height
      ) {
        canMove = false;
      }
    });
  
    if (canMove) {
      if (direction === 0) {
        // If left
  
        if (playerX <= FRAMEMOVESIZE) {
          // moves background if player is too far to left or right
          backgroundx += effectiveStep * BACKMULTI;
          backGrassx += effectiveStep * MIDMULTI;
          foregroundGrassx += effectiveStep * FOREMULTI;
          worldX -= effectiveStep;
        } else {
          playerX -= effectiveStep;
        }
      } else {
        // if right
  
        if (playerX >= WIDTH - FRAMEMOVESIZE - PLAYERHEIGHT) {
          backgroundx -= effectiveStep * BACKMULTI;
          backGrassx -= effectiveStep * MIDMULTI;
          foregroundGrassx -= effectiveStep * FOREMULTI;
          worldX += effectiveStep;
        } else {
          playerX += effectiveStep;
        }
      }
    }
  }

  function updatePlayer() {
    movementUpdate(); // Includes jumping and checking boundaries
  
    if (shooting) {
      if (gunTickCount >= FIRERATE) {
        gun.shoot();
        gunTickCount = 0;
      }
      else{
        gunTickCount++;
      }
    }
  
    // Draw Player
    fill(200, 20, 20);
    image(playerPic, playerX, playerY);
  }