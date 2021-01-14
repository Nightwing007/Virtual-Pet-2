var dog;
var foodstock;
var foodS = 20;
var database;
var feedpet,addfood;
var fedtime,lastfed;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogHappyImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(700, 400);


  database = firebase.database();

  dog = createSprite(600,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodstock = database.ref("Food");
  foodstock.on("value", readStock);

  fedtime = database.ref("FeedTime");
  fedtime.on('value', readtime);

  food = new Food(foodS,lastfed);

  feedpet = createButton("Feed Dog");
  feedpet.position(800,70);
  addfood = createButton("Add Food");
  addfood.position(700,70);

}


function draw() {  
  background(46,139,87);

  food.getFoodStock();

  food.update();

  food.display();

  drawSprites();

  feedpet.mousePressed(function()
  {
    feedDog();
  });
  addfood.mousePressed(function()
  {
    addFood();
  });

  fill(255,255,254);
  textSize(15);
  if(lastfed >= 12)
  {
    text("Last Feed : " + lastfed%12 + "PM" , 200,35);
  }
  else if(lastfed === 0)
  {
    text("Last Feed : 12AM", 200,35);
  }
  else{
    text("Last Feed : " + lastfed + "AM" , 200,35);
  }
}

function readStock(data)
{
  foodS = data.val();
  console.log(foodS);
}

function readtime(data)
{
  lastfed = data.val();
}

function feedDog()
{
  dog.addImage(dogHappyImg);
  if(foodS <= 0)
  {
      foodS = 0;
  }
  else
  {
      foodS -= 1;
  }
  database.ref("/").update({
    Food : foodS,
    FeedTime : hour()
  })
}

function addFood()
{
  if(foodS >= 20)
  {
      foodS = 20;
  }
  else
  {
      foodS += 1;
  }
  database.ref().update({
    Food: foodS
  })
}

