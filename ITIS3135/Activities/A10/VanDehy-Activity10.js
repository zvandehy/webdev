$(document).ready(function () {

        $images = []

        $("#image_list a").each(function () {
                // preload the image for each link
                var image = new Image()

                image.src = $(this).attr("href")
                image.alt = $(this).attr("title")
                $images[$images.length] = image

                // set up the event handlers for each link
                $(this).on("click", function (evt) {
                        // get the image URL and caption for each image and animate the caption
                        var imageUrl = $(this).attr("href")
                        var caption = $(this).attr("title")
                        $("#image").fadeOut(3000, function () {
                                $("#image").attr("src", imageUrl);
                                $("#image").fadeIn(3000);
                        });
                        $("#caption").fadeOut(3000, function () {
                                $("#caption").text(caption);
                                $("#caption").fadeIn(3000);
                                $("#caption").animate({ fontSize: "2em" }, 3000);
                        });

                        // cancel the default action of each link
                        evt.preventDefault();
                })
        })

        // move the focus to the first link
        $("a")[0].focus()

        $

}); // end ready