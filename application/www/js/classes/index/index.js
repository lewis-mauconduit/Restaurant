'use strict';

$('#notice').removeClass('hidden');
function hideNotice(){
    $('#notice').addClass('hidden-transition');
}

setTimeout(hideNotice,3000);