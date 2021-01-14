class Food
{
    constructor(foodStock,lastfed)
    {

        this.foodStock = foodStock; 
        this.lastfed = lastfed;
        this.image = loadImage("Milk.png");

    }
    getFoodStock(){
        var foodStockRef  = database.ref('Food');
        foodStockRef.on("value",function(data){
           foodS = data.val();
        })
       
      }

    update(){
        database.ref('/').update({
          Food: foodS
        });
    }

    deductFood()
    {
        if(foodS <= 0)
        {
            foodS = 0;
        }
        else
        {
            foodS -= 1;
        }
        database.ref('/').update({
            Food: foodS
          });
    }

    display()
    {
        var x = 80 , y = 100;
        var i;

        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.foodStock !== 0)
        {
            for(i=0;i<foodS;i++)
            {
                if(i%10 === 0)
                {
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }
}