//preloaded images
var $images = []

$(document).ready(function () {

    // get the image URL and caption for each image
    $("a").each(function (i) {
        // preload the image for each link
        var img = new Image()
        img.src = this.href
        img.alt = this.title
        $images[i] = img
        // set up the event handlers for each link
        $(this).on("click", function (evt) {
            $("#caption").text(this.title)
            $("#gallery").html($images[i])
            // cancel the default action of each link
            evt.preventDefault()
        })
    })

    // move the focus to the first link
    $("a")[0].focus()

}); // end ready
