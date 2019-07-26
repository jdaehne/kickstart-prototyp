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



    // * * * * * * * * * * * * * * * * * * * * * * * * *
    // * Scroll-To
    // *
    // * Smooth-Scroll to targets on page
    // *
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                scrollTo(target);
            return false;
            }
        }
    });

    function scrollTo(element) {
        $('html, body').animate({
            scrollTop: element.offset().top - 100
        }, 1000);
    }



    // * * * * * * * * * * * * * * * * * * * * * * * * *
	// * cookie-message
	// *
	// *
	var cookieMessage = Cookies.get('cookie-message');

	$(".js-cookie-message-btn").click(function(){
		$(this).parents(".js-cookie-message").fadeOut();
		Cookies.set('cookie-message', '1', { expires: 365 });
	});

	if (!cookieMessage) {
		$(".js-cookie-message").show();
	}


});
