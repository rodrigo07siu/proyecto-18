//GameStates (estados del juego)
var PLAY=1;
var END=0;
var gameState=1;
var gameoversound;
var Knifesound;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  gameoversound = loadSound("gameover.mp3");
  Knifesound = loadSound("knifeSwoosh.mp3");//cargar aquí el sonido
}



function setup() {
  createCanvas(600, 600);
  
  //crear sprite de cuchillo
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //establecer colisionador para el cuchillo
  knife.setCollider("rectangle",0,0,40,40);

  //varianles Score (puntuación) y grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //llamar la función fruits (frutas) y Monster (monstruo)
    fruits();
    Monster();
    
    // Mover cuchillo con el mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Incrementar puntuación si el cuchillo toca la fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score = score +2;
      Knifesound.play();
    }
    else
    {
      //Cambiar a estado end state si el cuchillo toca al enemigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        gameoversound.play();//agregar aquí el sonido de gameover (fin del juego)
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        //Cambiar la animación del cuchillo para el fin del juego y reiniciar su posición
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //Mostrar puntuación
  textSize(25);
  text("Puntuación : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //actualizar debajo de la línea de código para aumentar la velocidad de monsterGroup por 10
    monster.velocityX = -(8 + 4* score/10);
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //usar la variable random para cambiar la posición de la fruta, para hacerlo más desafiante
    
    if(position==1)
    {
    fruit.x=600;
    //actualizar la línea de código proporcionada a continuación para aumentar la velocidad de fruitGroup por 4
    fruit.velocityX=-(7 + 4* score/4)
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //actualizar la línea de código proporcionada a continuación para aumentar la velocidad de fruitGroup por 4
      fruit.velocityX= (7 + 4* score/4 );
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
