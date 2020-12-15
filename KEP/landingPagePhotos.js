$(document).ready(function () {
    var url = "./photos.json";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data) {
            var html = "";
            $.each(data.photos, function (i, item) {
                html += `<img src="${item.photo}" alt="${item.title}">`
            });
            $("#photos").html(html);
        },

    })
});
