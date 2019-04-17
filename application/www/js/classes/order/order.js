'use strict';

var OrderForm = function (){

  
    $('#selectMeal').on('change',this.getJsonSelected.bind(this));
    $('#buttonAddOrder').on('click', this.showRecap.bind(this));

    this.basket = new Basket();
    this.getJsonSelected();
    this.buildTable();
    
}

    

    OrderForm.prototype.getJsonSelected = function (){

        var Id = $('#selectMeal').val();
        $.getJSON(getRequestUrl()+'/meal?Id='+Id, this.showJSON);

    }
    OrderForm.prototype.showJSON = function (response){

        $('#imgMealDetails').attr('src', getWwwUrl()+'/images/meals/'+response['Photo']);
        $('#nameMealDetails').text(response['Name']);
        $('#descriptionMealDetails').text(response['Description']);
        $('#prixMealDetails').text(parseFloat(response['SalePrice']).toFixed(2));
       
    }

    OrderForm.prototype.showRecap = function (event){

        event.preventDefault();
        $('#recapOrder').empty();

        var mealId = $('#selectMeal').val();
        var quantity = parseInt($('#quantityInput').val());
        var photo = $('#imgMealDetails').attr('src');
        var name = $('#nameMealDetails').text();
        var price = $('#prixMealDetails').text();

        if (isNaN(quantity) == false){

            this.basket.addProducts(mealId, name, photo, quantity, price);    
        }
        this.buildTable();
        console.log(this.basket.basket);
    }

    OrderForm.prototype.buildTable = function (){

        for (var i = 0; i<this.basket.basket.length; i++){

            var tr = $('<tr>');

            tr.append('<td class="number">'+this.basket.basket[i].quantity+'</td>');

            tr.append('<td>'+this.basket.basket[i].name+'</td>');
            tr.append('<td class="number">'+this.basket.basket[i].priceU+'€</td>');
            tr.append('<td class="number">'+this.basket.basket[i].priceU * this.basket.basket[i].quantity+'€</td>');
            tr.append('<td><button class="button button-cancel small button-delete-product deleteButton" data-mealid="'+i+'"><i class="fa fa-trash"></i></button></td>');
            $('#recapOrder').append(tr);

        } 

        this.deleteButton = document.querySelectorAll('.deleteButton');
        for (var i=0; i<this.deleteButton.length; i++){

            this.deleteButton[i].addEventListener('click', this.deleteProduct.bind(this));
        }
    }
    
    OrderForm.prototype.deleteProduct = function (event){ 

        event.preventDefault();
        var i = event.currentTarget.dataset.mealid;
        this.basket.basket.splice(i,1);
        
        saveDataToDomStorage('panier', this.basket.basket);
        $('#recapOrder').empty();
        this.buildTable();
    }
