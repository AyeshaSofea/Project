function setup (){
    createCanvas(windowWidth, windowHeight);
    makeBounce();
    blockYPos = 300;
    blockWidth = windowWidth * 0.1;
    blockHeight = windowHeight * 0.05;
    
}

var bounceList = [];
var yFactor = 0.2;
var blockYPos;
var blockWidth;
var blockHeight;
var gamePoints = 0;
var bounceLives = 5;
var gameTimeout;

function makeBounce(){
    bounceObj = new bounce();
    bounceList.push(bounceObj);
    console.log(bounceList);
    gameTimeout = setTimeout(makeBounce, 1000);
}

class bounce {
  constructor() {
    this.x = random(10,140);
    this.y = random(10,100);
    this.height = 100;
    this.width = 100;
    this.xSpeed = random(1,10);
    this.ySpeed = random(-5,-10);
  }

  move(){
    this.x += this.xSpeed;
    this.ySpeed += yFactor;
    if (this.y + this.height > blockYPos && this.x + this.width > mouseX && this.x < mouseX + blockWidth && this.y < blockYPos + blockHeight
    ){
    this.ySpeed = -1 * this.ySpeed;
    }
  
    this.y += this.ySpeed;
    image(bounceImage,this.x,this.y,this.width,this.height);
  }
}

function preload (){
    backgroundImage = loadImage("background_image.jpg");
    bounceImage = loadImage("rainbow.png")
}

function draw(){
    background("grey");
    image(backgroundImage,0,0,windowWidth,windowHeight);
    makeBlocks();
    fill("Yellow");
    textSize(50);
    text('Points:' + gamePoints, 50, 50);
    text('Lives:' + bounceLives, 50, 120);
    bounceList.forEach(processBounceList);
}

function processBounceList(item,index){
    item.move();
    if (item.x > windowWidth){
        bounceList.splice(index,1);
        gamePoints += 1;
    }

    if (item.y > windowHeight){
        bounceList.splice(index,1);
        bounceLives -= 1;
        if (bounceLives == 0){
          endGame()
        }      
    }
}

function makeBlocks(){
  fill("red");
  ellipse(mouseX, blockYPos, blockWidth, blockHeight);

}

function endGame(){
  noLoop();
  background("Black");
  text('GAME OVER', 600, 200);
  text('POINTS:' + gamePoints, 600, 250);
  clearTimeout(gameTimeout)
}