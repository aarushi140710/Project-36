var sadDog,dogHappy,database,foodStock,foodS,fedTime,lastFed,foodObj,feed,addFood;

function preload(){
	 sadDog = loadImage("Dog.png");
   dogHappy = loadImage("happydog.png");
}

function setup() {
	createCanvas(1000, 400);
  dog1 = createSprite(730,200,10,10);
  dog1.addImage(sadDog);
  dog1.scale = 0.2;

  database = firebase.database();

  foodObj = new Food ();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);

}


function draw() {  
  background(46,139,87);

  foodObj.display();

  drawSprites();

  textSize(15);
  fill(255,255,255);
  stroke("black");
  if(lastFed >= 12){
    text("Last Feed : "+lastFed%12 + " PM",350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed + " AM",350,30);
  }

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });



}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

/*function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  
  
}*/

function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })

}

function feedDog(){
  dog1.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })

}
