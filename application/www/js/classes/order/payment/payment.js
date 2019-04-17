'use strict';

var Payment = function (){

    this.getJsonSelected();
}

    Payment.prototype.getJsonSelected = function (){

        $.getJSON(getRequestUrl()+'/order/payment', this.showJSON);

    }
    Payment.prototype.showJSON = function (response){

        console.log('coucou');
        console.log(response);
    }

