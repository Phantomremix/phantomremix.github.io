var Circles;
var hero;
var gameWidth = window.innerWidth - 20;
var gameHeight = window.innerHeight - 20;
var dFactor = 20;
var numberOfCircles = 25;
var gameOver = false;

function setup() {
  createCanvas(gameWidth, gameHeight);
  noStroke();

  textAlign(CENTER, CENTER);

  resetGame();
  mouseX = gameWidth / 2;
  mouseY = gameHeight / 2;
}

function draw() {
  if (!gameOver) {
    noCursor();

    background(0, 0, 0);

    hero.x = mouseX;
    if (gameWidth < 500) {
      hero.y = mouseY - 50;
    } else if (gameWidth > 500) {
      hero.y = mouseY;
    }
    hero.show();

    for (var c = 0; c < Circles.length; c++) {
      Circles[c].show();
      Circles[c].x += Circles[c].xinc;
      Circles[c].y += Circles[c].yinc;

      if (hero.checkForCollison(Circles[c])) {
        background(0, 0, 0);
        fill(255, 40, 40);
        text("Game Over", gameWidth / 2, gameHeight / 3);
        text(
          hero.score.toFixed(2) / 50 + " Seconds",
          gameWidth / 2,
          gameHeight / 2
        );
        textSize(40);
        fill(0, 255, 0);
        text("Click to Restart", gameWidth / 2, gameHeight / 1.5);
        fill(0, 0, 255);
        text("or", gameWidth / 2, gameHeight / 1.3);
        fill(255, 0, 0);
        text("Embrace Cowardice", gameWidth / 2, gameHeight / 1.15);
        break;
      }

      if (Circles[c].offCanvas()) {
        Circles[c].renew();
      }
      textSize(15);
      text(hero.score.toFixed(2) / 50 + " Seconds", hero.x, hero.y + 25);
      textSize(50);
    }
    hero.score++;
  } else if (mouseClicked) {
    resetGame();
  }

  if (gameOver) {
    cursor();
  }
}

function Circle() {
  this.renew();
}

Circle.prototype.show = function () {
  fill(0, 0, this.b);
  ellipse(this.x, this.y, this.d, this.d);
};

Hero.prototype.checkForCollison = function (circ) {
  if (dist(this.x, this.y, circ.x, circ.y) < this.d / 2 + circ.d / 2) {
    if (this.d > circ.d || this.d < circ.d) {
      //larger
      gameOver = true;
      return true;
    }
  }
  //no collison
  return false;
};

Circle.prototype.renew = function () {
  // left or right orgin
  if (random(0, 2) > 1) {
    if (random(0, 2) > 1) {
      this.x = 0;
      this.xinc = random(3, 5);
    } else {
      this.x = gameWidth;
      this.xinc = -1 * random(3, 5);
    }

    this.y = random(1, gameHeight);
    this.yinc = random(3, 5) - 2.5;
  } else {
    //top or bottem edge origin
    if (random(0, 2) > 1) {
      this.y = 0;
      this.yinc = random(3, 5);
    } else {
      this.y = gameHeight;
      this.yinc = -1 * random(3, 5);
    }
    this.x = random(1, gameWidth);
    this.xinc = random(3, 5) - 2.5;
  }

  //sets diameter
  this.d = dFactor + 10;

  //random color
  this.r = random(0, 255);
  this.g = random(0, 255);
  this.b = random(100, 255);
};
Circle.prototype.offCanvas = function () {
  if (this.x < 0 || this.x > gameWidth) {
    return true;
  } else if (this.y < 0 || this.y > gameHeight) {
    return true;
  } else {
    return false;
  }
};

function Hero(x, y) {
  this.x = x;
  this.y = y;
  this.d = dFactor;
  this.score = 0;
}

Hero.prototype.show = function () {
  //body
  fill(255, 0, 0);
  ellipse(this.x, this.y, this.d, this.d);

  //stripes
  fill(255, 0, 0);
  rect(this.x, this.y / gameHeight, 1, gameHeight);
  rect(this.x / gameWidth, this.y, gameWidth, 1);
};
function resetGame() {
  Circles = [];
  numberOfCircles = floor((gameWidth * 2 + gameHeight * 2) / 175)
  console.log(numberOfCircles);
  for (var c = 0; c < numberOfCircles; c++) {
    Circles.push(new Circle());
  }

  hero = new Hero(gameWidth / 2, gameHeight / 2);
}

function mouseClicked() {
  if (gameOver) {
    resetGame();
    gameOver = false;
  }
}
