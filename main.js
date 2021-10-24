// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// This is a Ball class model

function Ball(x, y, velX, velY, color, size) {
    // This is the coordinates, where the ball starts on the screen
    this.x = x;
    this.y = y;
    // this is the horizontal and vertical velocity
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
    // Implement a draw function on the Ball prototype
  Ball.prototype.draw = function() {
   // The beginpath method draw the shape on the canvas 
    ctx.beginPath();
    // the fillStyle define the color of the circle
    ctx.fillStyle = this.color;
    // the arc method specify the shape of a object
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // the fill method finish drawing the path we started with
    ctx.fill();
  }

  // Create an instance of the ball class

  let testBall = new Ball(50, 200, 4, 4, 'blue', 50);
 
  testBall.x
  testBall.size
  testBall.color
  testBall.draw()

// Use the update method and update the ball data

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }

// this while loop generate a lot of ball with the random sizes and postions 
  let balls = [];

while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
}


function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();

    }
  
    requestAnimationFrame(loop);
  }


  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }

  loop()
