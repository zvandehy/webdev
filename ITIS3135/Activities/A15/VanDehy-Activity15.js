$(document).ready(function () {
    var url = "./facultyList.json"
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
            var html = "";
            faculty = data["facultymembers"]
            for (var i = 0; i < faculty.length; i++) {
                var member = faculty[i];
                html += `<img src="./${member["image"]}" alt="Photo of ${member["full_name"]}">
                <h2>${member["full_name"]}</h2>
                <h3>${member["department"]}</h3>
                <p>A${member["bio"]}</p>`;
            }
            $("main").html(html);
        }
    });
});