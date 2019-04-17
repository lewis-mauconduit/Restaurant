'use strict';

var RecapValidate = function (){

    this.loadBasket();
    this.showRecap();

}
    RecapValidate.prototype.loadBasket = function(){

        this.basket = loadDataFromDomStorage('panier');
        
        console.log(this.basket);
    }

    RecapValidate.prototype.showRecap = function(){

        var totalHt = 0;

        
        for (var i=0; i<this.basket.length ; i++){

            var tr = $('<tr>');
            tr.append('<td><img src='+this.basket[i].photo+'></td>');
            tr.append('<td>'+this.basket[i].name+'</td>');
            tr.append('<td>'+this.basket[i].quantity+'</td>');
            tr.append('<td>'+this.basket[i].priceU+' €</td>');
            tr.append('<td>'+this.basket[i].priceU * this.basket[i].quantity+' €</td>');
            $('#recapOrder').append(tr);
            totalHt += (this.basket[i].priceU * this.basket[i].quantity);

      

        }

        $('#totalht').append(totalHt.toFixed(2)+' €');
        var tva = totalHt * 0.2
        $('#tva').append(tva.toFixed(2)+' €');
        $('#totalttc').append((totalHt + tva).toFixed(2)+' €');

        var orders = JSON.stringify(this.basket);
        $('#orderValidation').val(orders);
    }