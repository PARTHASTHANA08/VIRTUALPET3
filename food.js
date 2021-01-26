class FOOD{
    constructor(){
        this.foodS = 0;
        this.lastFed;
        this.image = loadImage("Milk.png");
        
    }
    updateFoodStock(foodStock){
        this.foodS = foodStock;
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    detectFood(){
        if(this.foodS > 0){
            this.foodS-=1;
        }
    }
    getFoodStock(){
        return this.foodS;
    }
    display(){
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.image,250,425,70,70);
        if(this.foodS !== 0){
            for(var i = 0;i<this.foodS;i++){
                if(i % 10 == 0){
                   x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }
}