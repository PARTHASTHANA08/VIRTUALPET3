//Create variables here
var database;
var dogi,happyDogi;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var washroomI,gardenI,bedroomI;
var gamestateI;
function preload()
{
  //load images here
  dogi = loadImage("dogImg.png");
  happyDogi = loadImage("dogImg1.png");
  washroomI = loadImage("Wash Room.png");
  gardenI = loadImage("Garden.png");
  bedroomI = loadImage("Bed Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 700);
  foodObj = new FOOD();
  dog = createSprite(400,500,10,10);
  dog.addImage(dogi);
  dog.scale = 0.5;
  foodStock = database.ref('Food');
  foodStock.on("value",food);
  gamestateI = database.ref('gameState');
  gamestateI.on("value",function(data){
    gamestate = data.val();
  });
  feed = createButton('Feed The Dog');
  feed.position(450,145);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(950,145);
  addFood.mousePressed(addFoods);
}


function draw() { 
  background("lightGreen");
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  if(currentTime==(lastFed+1)){
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    foodObj.sleeping();
  } else if(currentTime > (lastFed+2) && currentTime <= (lastFed+4)){
    foodObj.washroom();
  }else{
    foodObj.display();
  }
  if(gameState != 0){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
   feed.show();
   addFood.show();
   dog.addImage(sadDog);
  }
foodObj.display();
//https://github.com/rupinwhitehatjr/d0dceb6947ca210c2baf69acf70d5509/blob/master/sketch.js
textSize(25);
textFont("callestar");
fill("darkBlue"); 
stroke(200);
text("FOOD REMAINING :" + foodS,150,250)

if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 250,100);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 250,100);
 }
drawSprites();
  //add styles here

}
function feedDog(){
  
  dog.addImage(happyDogi);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })//https://github.com/rupinwhitehatjr/c77766f755267213c65579da78fd9311
}
function food(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function foodCount(x){
  if(x < 1){
    x = 20;
  }
  database.ref('/').update({
    Food:x
 })
}
function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food:foodS
  })
} 
function garden(){
background(gardenI);
gamestate = 1;
}
function sleeping(){
  background(bedroomI);
  gameState = 2;
}
function washroom(){
  background(washroomI);
  gamestate = 3;
}

