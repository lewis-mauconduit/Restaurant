'use strict';

/////////////////////////////////////////////////////////////////////////////////////////
// FONCTIONS                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////
// CODE PRINCIPAL                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////

if (document.location.href.indexOf('order') != -1 && document.location.href.indexOf('order/validate') == -1 && document.location.href.indexOf('order/payment') == -1 && document.location.href.indexOf('order/success') == -1)  {
    var order = new OrderForm();
  }
  
if (document.location.href.indexOf('order/validate') != -1 ) {
    var recapValidate = new RecapValidate();
}
if (document.location.href.indexOf('order/payment') != -1 ) {
    var payment = new Payment();
}


