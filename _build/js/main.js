$(document).ready(function() {


	// * * * * * * * * * * * * * * * * * * * * * * * * *
	// * Name
	// *
	// *



    // * * * * * * * * * * * * * * * * * * * * * * * * *
    // * parent clickable elements (excludes links inside)
    // *
    // * @set outer parent element class: js-click-item-parent
    // * @set link (<a> tag) element class: js-click-item-link
    // *
    // * This makes the whole element clickable and still
    // * makes other links inside clickable with their target
    // *
    $(".js-click-item-parent").delegate('a', 'click', function(e){
        window.location = $(this).attr("href");
        return false;
    }).click(function(){
        window.location = $(this).find("a.js-click-item-link").attr("href");
        return false;
    });​




});
