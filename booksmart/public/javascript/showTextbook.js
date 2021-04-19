$(document).ready(function () {
    readyImages();
    // move the focus to the first link
    let images = $("#extra-images-wrap a")
    if (images.length > 0) {
        images[0].focus();
    }

    $('#quality').selectize({
        persist: false,
        create: true,
        createOnBlur: true,
        highlight: true,
        openOnFocus: true,
        maxItems: 1,
        allowEmptyOption: false,
        create: function (input) {
            return {
                value: input,
                text: input
            }
        }
    })

    $('#subject').selectize({
        persist: false,
        create: true,
        createOnBlur: true,
        highlight: true,
        openOnFocus: true,
        maxItems: 1,
        allowEmptyOption: false,
        create: function (input) {
            return {
                value: input,
                text: input
            }
        }
    })

}); // end ready

var readyImages = function () {
    $images = []
    $("#extra-images-wrap a").each(function () {
        // preload the image for each link
        var image = new Image()
        image.src = $(this).attr("href")
        $images[$images.length] = image
        // set up the event handlers for each link
        $(this).on("click", function (evt) {
            console.log("clicked");
            // get the image URL and caption for each image and animate the caption
            var imageUrl = $(this).attr("href")
            $("#image").fadeOut("fast", function () {
                $("#image").attr("src", imageUrl);
                $("#image").fadeIn("fast");
            });
            $("#extra-images-wrap a").each(function () {
                $(this).removeClass("focused");
            });
            $(this).addClass("focused");

            // cancel the default action of each link
            evt.preventDefault();
        })
    });
}