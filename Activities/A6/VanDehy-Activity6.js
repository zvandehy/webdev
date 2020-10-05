//function expression getSides()
var getSides = function () {
    var sides;
    //always perform at least 1 time
    do {
        //prompt for a number and convert it to int
        sides = parseInt(prompt("Enter a number of sides between 3-7: "));
        //reprompt if not between 3 and 7 or is not a number
    } while (!(sides >= 3 && sides <= 7) || isNaN(sides));
    return sides;
}

//get the number of sides between 3-7
var s = getSides()
//convert and alert the number of sides to polygon
convertShape(s);

//return the appropriate polygon given the number of sides
function convertShape(sides) {
    switch (sides) {
        case (3):
            alert("Triangle");
            break;
        case (4):
            alert("Square");
            break;
        case (5):
            alert("Pentagon");
            break;
        case (6):
            alert("Hexagon");
            break;
        case (7):
            alert("Heptagon");
            break;
    }
}

