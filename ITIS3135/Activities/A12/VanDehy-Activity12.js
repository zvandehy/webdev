$(document).ready(function () {
    $("#slider").bxSlider({
        randomStart: true,
        auto: true,
        captions: true,
        autoStart: true,
        pause: 3000,
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 500,
        slideMargin: 20,
        pager: true,
        pagerSelector: $("#id_pager"),
        pagerType: "short",
    });
});