var dog, dogHappy, dogSad;
var db, foodS, foodStock;
var fedTime, lastFed, feed, addFood, foodObj;
var bg

function preload(){
    dogImg = loadImage("Dog.png");
    dogImg2 = loadImage("happydog.png");
    bg=loadImage("download.jpg")
}
function setup() {
  createCanvas(1000, 500);
  foodObj = new Food();

  db = firebase.database();
  dog = createSprite(800, 200, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2

  feed = createButton("FEED");
  feed.position(600, 30);
  feed.mousePressed(feedDog,foodObj.velocityX=10);

  addFood = createButton("ADD FOOD");
  addFood.position(700, 30);
  addFood.mousePressed(addfood);

foodStock = db.ref('Food');
foodStock.on("value", readStock);
}

function draw() {  
  background(bg);
foodObj.display();

fedTime = db.ref('fedTime');
fedTime.on('value', function(data){
  lastFed = data.val();
})

if(lastFed >=12){
  fill("White")
  text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
} else if(lastFed === 0){
  fill("White")
  text("LAST FEED : 12 am", 350, 30);
}else {
  fill("White")
  text("LAST FEED :"+ lastFed+'am', 350, 30);
}
  drawSprites();
  
} 
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(dogImg2)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    Food:foodObj.getFoodStock(), fedTime:hour()
  })
}
function addfood(){
  foodS++
  db.ref('/').update({
    Food:foodS
  })
}