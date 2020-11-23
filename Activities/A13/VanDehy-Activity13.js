$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "team.json",
        beforeSend: function () {
            $("#team").html("Loading...");
        },
        timeout: 10000,
        error: function (xhr, status, error) {
            alert("Error: " + xhr.status + " - " + error);
        },
        dataType: "json",
        success: function (data) {
            $("#team").html("");
            data = data["teammembers"]
            //     var xmlDoc = $(this);
            for (var i = 0; i < data.length; i++) {
                var member = data[i];
                $("#team").append
                    ("<h3>" + member["name"] + "</h3>" +
                        member["title"] + "<br>" +
                        member["bio"] + "<br>");
            }
        }
    });
});