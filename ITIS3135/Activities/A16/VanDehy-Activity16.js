$(document).ready(function () {
    var url = "https://www.flickr.com/services/feeds/photos_public.gne?id=82407828@N07&tags=vectacorpbuilding&format=json&jsoncallback=?"
    $.getJSON(url, function (data) {
        var html = "";
        $.each(data.items, function (i, item) {
            html += `<a href="${item.media.m}" data-lightbox="New Building" data-title="${item.title}"><img src="${item.media.m}"></a>`
        });
        $("#new_building").html(html);
    })
});