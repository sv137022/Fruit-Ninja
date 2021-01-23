var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, swordImage;
var fruit
var fruit1;
var fruit2;
var fruit3;
var fruit4;
var monster, monsterImage;

var score;

var select_fruit;

var enemyGroup, fruitGroup;


var gameOverImage , gameOverSound;

var wooshSound;

function preload() {
  swordImage = loadImage("sword.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  gameOverImage = loadImage("gameover.png");

  fruitGroup = new Group();
  enemyGroup = new Group();


  wooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 600);
  createEdgeSprites();

  sword = createSprite(300, 300, 10, 10);
  sword.addImage(swordImage);
  sword.scale = 0.7;


  fruitGroup = createGroup();
  enemyGroup = createGroup();



}

score = 0;

function draw() {
  background(150,75,0);
  fill("white")
  textSize(20);
  text("score : " + score, 450, 40);
  
  
  
  if(score>20){
     
     fruitGroup.velocityX = -(7+(score/4));
     enemyGroup.velocityX = -(7+(score/4));
     }


  if (gameState === PLAY) {

    sword.x = World.mouseX;
    sword.y = World.mouseY;

    fruits();
    Enemy();

    if (fruitGroup.isTouching(sword)) {

      fruitGroup.destroyEach();
      wooshSound.play();
      score = score + 5;

      sword.setCollider("rectangle", 0, 0, 80, 100);
      //sword.debug = true;

    }

  }

  if (gameState === END) {

    enemyGroup.setVelocityEach(0);
    fruitGroup.setVelocityEach(0);

    enemyGroup.destroyEach();
    fruitGroup.destroyEach();

    sword.addImage(gameOverImage);
  }

  if (sword.isTouching(enemyGroup)) {

    gameOverSound.play();
    
    gameState = END;

  }





  drawSprites();
}

function fruits() {

  if (World.frameCount % 80 === 0) {

    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;

    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    }
    if (r == 2) {
      fruit.addImage(fruit2);
    }
    if (r == 3) {
      fruit.addImage(fruit3);
    }
    if (r == 4) {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 380));

    fruit.velocityX = -13;
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);

  }
}

function Enemy() {
  if (World.frameCount % 300 === 0) {

    monster = createSprite(400, 200, 20, 20);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -11;
    monster.setLifetime = 50;
    monster.addAnimation("moving", monsterImage);

    enemyGroup.add(monster);
  }

}