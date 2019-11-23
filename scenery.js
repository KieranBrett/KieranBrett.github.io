function drawBackground() {
    // Background that will scroll foreverrrrrrrrr
  
    // BACKGROUND
    image(backgroundPic, backgroundx, 0);
  
    if (backgroundx <= 0) {
      image(backgroundPic, backgroundx + backgroundPic.width, 0); // Image width is 1200
    } else {
      image(backgroundPic, backgroundx - backgroundPic.width, 0);
    }
  
    if (backgroundx >= backgroundPic.width) {
      backgroundx = 0;
    } else if (backgroundx <= -backgroundPic.width) {
      backgroundx = 0;
    }
  
    // MIDGROUND
    image(backGrass, backGrassx, GRASSPOS - SHADOWOFFSET);
  
    if (backGrassx <= 0) {
      image(backGrass, backGrassx + backGrass.width, GRASSPOS - SHADOWOFFSET);
    } else {
      image(backGrass, backGrassx - backGrass.width, GRASSPOS - SHADOWOFFSET);
    }
  
    if (backGrassx >= backGrass.width) {
      backGrassx = 0;
    } else if (backGrassx <= -backGrass.width) {
      backGrassx = 0;
    }
  }
  
  function drawForeground() {
    fill(30, 129, 30);
    rect(0, GRASSPOS, 1200, 100);
  
    image(foregroundGrass, foregroundGrassx, GRASSPOS - GRASSOFFSET);
  
    if (foregroundGrassx <= 0) {
      image(
        foregroundGrass,
        foregroundGrassx + foregroundGrass.width,
        GRASSPOS - GRASSOFFSET
      );
    } else {
      image(
        foregroundGrass,
        foregroundGrassx - foregroundGrass.width,
        GRASSPOS - GRASSOFFSET
      );
    }
  
    if (foregroundGrassx >= foregroundGrass.width) {
      foregroundGrassx = 0;
    } else if (foregroundGrassx <= -foregroundGrass.width) {
      foregroundGrassx = 0;
    }
  
    frameRateTotal += frameRate();
    frameRateCount++;
  
    if (frameRateCount > 2000) {
      frameRateCount = 0;
      frameRateTotal = 0;
    }
  
    fill(color("white"));
    text(`World X : ${worldX}`, 50, 50);
    text(
      `Average FPS : ${(frameRateTotal / frameRateCount).toFixed(2)}`,
      50,
      100
    );
  }
