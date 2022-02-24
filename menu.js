/* Открытие меню */
var main = function() {
    $('.icon-menuforum').click(function() {
        $('.menuforum').animate({
            left: '0px'
        }, 200);
        
        $('body').animate({
            left: '285px'
        }, 200);
    });


/* Закрытие меню */
    $('.icon-close').click(function() {
        $('.menuforum').animate({
            left: '-285px'
        }, 200);
        
    $('body').animate({
            left: '0px'
        }, 200);
    });
};

$('.icon-open-dbut').click(function() {
        $('.buttons1').animate({
            top: '285px'
        }, 200);
        
};
                           
$('.icon-close-dbut').click(function() {
        $('.buttons1').animate({
            top: '-285px'
        }, 200);
        
};

$(document).ready(main);
