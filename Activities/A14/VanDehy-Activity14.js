$(document).ready(function () {

    var url = "./json_files/toobin.json"
    $("aside a").on("click", function (evt) {
        evt.preventDefault();
        url = "./json_files/" + $(this).attr("title") + ".json";
        $("main").html("");
        getSpeaker(url);
    })


}); // end ready

//update main for speaker
function getSpeaker(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();

    $.ajax({
        type: "get",
        url: url,
        timeout: 10000,
        error: function (xhr, status, error) {
            alert("Error: " + xhr.status + " - " + error);
            $("main").html("<p>Error: " + xhr + "</p>");
        },
        dataType: "json",
        success: function (data) {
            speaker = data["speakers"][0]
            var html = `<h1>${speaker["title"]}</h1>
            <h2>${speaker["month"]}</h2>
            <h3>${speaker["speaker"]}</h3>
            <img src="${speaker["image"]}" alt = "Image of ${speaker["speaker"]}">
            <p>A${speaker["text"]}</p>`;
            $("main").html(html);
        }
    });
}