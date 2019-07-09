jQuery(document).ready(function(e) {
    function t(t) {
        e(t).bind("click", function(t) {
            t.preventDefault();
            e(this).parent().fadeOut()
        })
    }
    e(".dropdown-toggle").click(function() {
        var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
        e(".button-dropdown .dropdown-menu").hide();
        e(".button-dropdown .dropdown-toggle").removeClass("active");
        if (t) {
            e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
        }
    });
    e(document).bind("click", function(t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
    });
    e(document).bind("click", function(t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
    })
});

jQuery(document).ready(function() {
    function close_accordion_section() {
        jQuery('.accordion .accordion-title').removeClass('active');
        jQuery('.accordion .accordion-content').slideUp(300).removeClass('open');
    }

    jQuery('.accordion-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = jQuery(this).attr('href');

        if (jQuery(e.target).is('.active')) {
            close_accordion_section();
        } else {
            close_accordion_section();

            // Add active class to section title
            jQuery(this).addClass('active');
            // Open up the hidden content panel
            jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }

        e.preventDefault();
    });
});

$(".styled-select").click(function() {
    $(this).find('select').first().toggleClass("intro");
});