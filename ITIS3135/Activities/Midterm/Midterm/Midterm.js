var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var calories = [3000, 2500, 1500, 4000, 2200, 1200, 4400];

var $ = function (id) { return document.getElementById(id); };

window.onload = function () {
    //event handlers
    $("update").onclick = updateCalorie;
    $("averageBtn").onclick = showAverageCalories;
    $("show_max").onmouseover = showMax;
};

function updateCalorie() {
    calorie = parseInt($("calorie").value)
    if (isNaN(calorie) || calorie == 0) {
        alert("Enter a valid number.")
    }
    else {
        try {
            day = document.querySelector('input[name="day"]:checked').value; //cite: https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value            
        } catch (error) {
            alert("Enter a day")
            return;
        }
        calories[days.indexOf(day)] = calorie;
        alert(`Your updated calories are:\n${calories}`)
    }
    $("calorie").value = ""
}

function showAverageCalories() {
    var total = 0;
    for (let i = 0; i < calories.length; i++) {
        const cal = calories[i];
        total += cal;
    }
    var average = total / calories.length;

    $("averageText").value = average
    $("averageText").style.backgroundColor = "transparent"
    $("averageText").style.color = "green"
}

function showMax() {
    var max = calories[0];
    var maxIndex = 0;
    for (let i = 1; i < calories.length; i++) {
        if (calories[i] > calories[maxIndex]) {
            max = calories[i];
            maxIndex = i;
        }
    }
    calorie = max;
    day = days[maxIndex];

    var pNode = document.createElement("p")
    var text = document.createTextNode(`Your maximum consumed calorie is ${calorie} on ${day}`)
    pNode.appendChild(text)
    if ($("showMax").childNodes.length > 0) {
        prev = $("showMax").firstChild
        $("showMax").replaceChild(pNode, prev)
    } else {
        $("showMax").appendChild(pNode)
    }

}
