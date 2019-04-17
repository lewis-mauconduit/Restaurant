'use strict';

var Basket = function (){

    this.basket = [];
    this.loadBasket();

}
    Basket.prototype.loadBasket = function(){

        this.basket = loadDataFromDomStorage('panier');
        
        if(this.basket == null) {
            this.basket = [];
        }
    }

    Basket.prototype.addProducts = function(mealId, name, photo, quantity, price){
        
        for (var i = 0; i < this.basket.length; i++) {

            var finalQuantity = parseInt( this.basket[i].quantity) + parseInt(quantity);

            if(this.basket[i].mealId == mealId) {
                    
                this.basket[i].quantity= finalQuantity;
                saveDataToDomStorage('panier', this.basket);
                this.loadBasket();
                        
                return; //arrête la fonction addProducts
            }
        }
        
        this.basket.push({

            'mealId': mealId,
            'name' : name,
            'photo' : photo,
            'quantity': quantity,
            'priceU' : price
    
        });

        saveDataToDomStorage('panier', this.basket);
            
        this.loadBasket();

    }

