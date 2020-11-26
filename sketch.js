 var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloud,cloudimg;
var obstacle,ob1,ob2,ob3,ob4,ob5 ,ob6
var score=0;
var cloudgrp,obsgrp
const PLAY=1
const END=0
var gamestate=PLAY
var gameovr,restart
var gameovrimg,restartimg
var jump,die,checkpoint
localStorage["hi"]=0
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png")
  cloudimg=loadImage("cloud.png") 
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  gameovrimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")     
  
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  checkpoint=loadSound("checkPoint.mp3")
}

function setup() {
createCanvas(600, 200);

//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trex_collided)
trex.scale = 0.5;
  //trex.debug=true
  trex.setCollider("circle",0,0,40)
  
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -4;
  invisibleground=createSprite(200,190,400,10);
  invisibleground.visible=false
  
  cloudgrp=new Group()
  obsgrp=new Group()
  gameovr=createSprite(300,50,0,0)
  gameovr.addImage("over",gameovrimg)
  
  restart=createSprite(300,80,0,0)
  restart.addImage("restar",restartimg)
  restart.scale=0.5
  gameovr.visible=false
  restart.visible=false
}

function draw() {
background(255);
  if(gamestate===PLAY){
    score=score+Math.round(frameCount/150)
   // console.log(trex.y)
    //jump when the space button is pressed
if (keyDown("space")&& trex.y>159){
  trex.velocityY = -14;
  jump.play()
}
    trex.velocityY = trex.velocityY + 0.8
    ground.velocityX = -(4+3*score/200)

if (ground.x < 0) {
  ground.x = ground.width / 2;
}
    creatclouds()
  creatobstacle()
 if(trex.isTouching(obsgrp)) {
   gamestate=END
   die.play()
 }  
  }
  else if (gamestate===END){
    gameovr.visible=true
    restart.visible=true
   trex.velocityY=0
    ground.velocityX=0
    cloudgrp.setVelocityEach(0,0)
    obsgrp.setVelocityEach(0,0)
   cloudgrp.setLifetimeEach (-2)
    obsgrp.setLifetimeEach(-4)
    trex.changeAnimation("collide",trex_collided)
    if (mousePressedOver(restart)){
      gamestate=PLAY
      
      trex.changeAnimation("running",trex_running)
      obsgrp.destroyEach()
      cloudgrp.destroyEach()
      gameovr.visible=false
      restart.visible=false
      if(score>localStorage["hi"]){
        localStorage["hi"]=score
      }
      score=0
    }
  }
fill("black")
  text("SCORE "+score,500,50)
  text("HI "+localStorage["hi"],50,50)




trex.collide(invisibleground);
  
drawSprites();
}
function creatclouds (){
  if(frameCount%30===0){
  cloud=createSprite(600,50,10,10)
  cloud.velocityX=-(5+3*score/300)
    cloud.y=random(50,100)
    cloud.addImage(cloudimg)
    cloud.scale=0.7
    cloud.lifetime=130
    trex.depth=cloud.depth+1
    cloudgrp.add(cloud)
    
}}

function creatobstacle(){
  if(frameCount%150===0){
    obstacle=createSprite(600,165,10,10)
    obstacle.velocityX=-(3+2*score/200)
    obsgrp.add(obstacle)
    
    var select=Math.round(random(1,6))
    console.log(select)
    switch(select){
      case 1: obstacle.addImage(ob1)
        break;
        case 2: obstacle.addImage(ob2)
        break;
        case 3: obstacle.addImage(ob3)
        break;
        case 4: obstacle.addImage(ob4)
        obstacle.scale=0.5
        break;
        case 5: obstacle.addImage(ob5)
        obstacle.scale=0.5
        break;
        case 6: obstacle.addImage(ob6)
        obstacle.scale=0.4
        break;
        default: break;
    }
   if(select!==5&& select!==4&& select!==6){
    obstacle.scale=0.7}
    obstacle.lifetime=205
  }
}
