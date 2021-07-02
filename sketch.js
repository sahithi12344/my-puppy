var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastfed
var bgImg,doghouse,dimg

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bgImg = loadImage("bg.png")
dimg = loadImage("d.png")
}
 
        
        


function setup() {
  database=firebase.database();
  createCanvas(1000,600);

  foodObj = new food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,500,150,150);
  dog.addImage(sadDog);
  dog.scale=0.4;

  doghouse = createSprite(300,450,50,150)
  doghouse.addImage(dimg)
  doghouse.scale=0.2

  //create feed the dog button here
  
  feed = createButton("feed");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food" );
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(bgImg);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastfed = database.ref('feedtime')


  
 
  //write code to display text lastFed time here
  if(lastfed<=12){
    fill("black")
    text("last Feed : 1 PM" , 800, 50)
  }                                             
  else if(lastfed==0){
    fill("black")
    text("last feed : 12 AM" , 800, 50)
  } else {
    fill("black")
    text("last feed : 11 AM" , 800, 50)
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val<= 0){
    foodObj.updateFoodStock(food_stock_val *01);

  }else{
    foodObj.updateFoodStock(food_stock_val -1);
 
}
}
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}
    