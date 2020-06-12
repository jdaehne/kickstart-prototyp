$(document).ready(function() {


    // * * * * * * * * * * * * * * * * * * * * * * * * *
    // * teleport links
    // *
    // * @set outer parent element class: js-href-teleport-wrapper
    // * @set link (<a> tag) element class: js-href-teleport-link
    // * @set element to add the link to class: js-href-teleport
    // *
    // * This adds a link tag (<a>) to other elements within a wrapper
    // * links comes from a link. Example: add a link to h2, image etc. inside a teaser
    // *
    $(".js-href-teleport").each(function(){
        var $link = $(this).parents(".js-href-teleport-wrapper").find(".js-href-teleport-link"),
            href = $link.attr("href"),
            target = $link.attr("target") ? $link.attr("target") : '_self';

        if (href) {
            $(this).wrapInner('<a href="' + href + '" target="' + target + '"></a>');
        }
    });



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
		var target = $(this).attr("target"),
			url = $(this).attr("href");

		if (target == "_blank") {
			window.open(url);
		}else {
			window.location = url;
		}
        return false;
    }).click(function(){
		var target = $(this).find("a.js-click-item-link").attr("target"),
			url = $(this).find("a.js-click-item-link").attr("href");

		if (target == "_blank") {
			window.open(url);
		}else {
			window.location = url;
		}
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


    // * * * * * * * * * * * * * * * * * * * * * * * * *
    // * animateIn
    // *
    // *
    var offset = 60; // Distance from Browserbottom where the animation should start

    function fadeInElements(){
        var viewPort = $(window).scrollTop() + $(window).height();

        $(".animateIn:visible").each(function(){
            var elementTop = $(this).offset().top;

            if ((elementTop + offset) <= viewPort) {
                var delay = $(this).data("animation-delay");
                $(this).css("transition-delay", delay + "s").addClass("animateIn--active");
            }
        });
    }

    $(window).scroll(function() {
        fadeInElements();
    });

    fadeInElements();


    // * * * * * * * * * * * * * * * * * * * * * * * * *
    // * add target blank to external links
    // *
    // *
    $('a:not([data-targetblank=ignore])').each(function() {
        if(location.hostname === this.hostname || !this.hostname.length) {
            // ... do nothing?
        }else {
            $(this).attr('target','_blank');
        }
    });


});
