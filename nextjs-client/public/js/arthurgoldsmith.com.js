$(document).ready(function() {
    $("#about-button").click(function() {
        $.scrollTo('#about-section',400); 
    });
    $("#skills-button").click(function() {
        $.scrollTo('#skills-section',400); 
    });
    $("#contact-button").click(function() {
        $.scrollTo('#contact-section',400); 
    });
    
    $('.nav-button img').each(function() {
        $(this).on('mouseenter', function() {
            $(this).parent('.nav-button:first').addClass('nav-button-hover');
        });
        $(this).on('mouseleave', function() {
            $(this).parent('.nav-button:first').removeClass('nav-button-hover');
        });
    });
    
    $('.iframe-link').magnificPopup({
        type:'iframe',
        iframe: {
           markup: '<div class="mfp-iframe-scaler ag-smaller-iframe">' +
                       '<div class="mfp-close"></div>' +
                       '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                   '</div>'
        }   
    });
    
    $('.image-link').magnificPopup({
        type:'image',
        gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		}
    });
});