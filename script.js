var Circles;
var hero;
var gameWidth = window.innerWidth - 20;
var gameHeight = window.innerHeight - 20;
var dFactor = 20;
var numberOfCircles = 10;
var gameOver = false;

function setup() {
  createCanvas(gameWidth, gameHeight);
  noStroke();
  noCursor();

  textAlign(CENTER, CENTER);

  resetGame();
}

function draw() {
  if (!gameOver) {
    background(0, 0, 0);

    hero.x = mouseX;
    hero.y = mouseY;
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
          hero.score.toFixed(2) / 100 + " Seconds",
          gameWidth / 2,
          gameHeight / 1.6
        );
        break;
      }

      if (Circles[c].offCanvas()) {
        Circles[c].renew();
      }
      textSize(15);
      text(hero.score.toFixed(2) / 100 + " Seconds", mouseX, mouseY + 25);
      textSize(50);
    }
    hero.score++;
  }
}

function Circle() {
  this.renew();
}

Circle.prototype.show = function() {
  fill(this.r, this.g, this.d);
  ellipse(this.x, this.y, this.d, this.d);
};

Hero.prototype.checkForCollison = function(circ) {
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

Circle.prototype.renew = function() {
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
  this.b = random(0, 255);
};
Circle.prototype.offCanvas = function() {
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

Hero.prototype.show = function() {
  //body
  fill(255, 0, 0);
  ellipse(this.x, this.y, this.d, this.d);

  //stripes
  fill(0, 100, 100);
  rect(this.x - this.d / 2, this.y - 2, this.d, 4);
  rect(this.x - 2, this.y - this.d / 2, 4, this.d);
};
function resetGame() {
  Circles = [];
  for (var c = 0; c < numberOfCircles; c++) {
    Circles.push(new Circle());
  }

  hero = new Hero(gameWidth / 2, gameHeight / 2);
}
