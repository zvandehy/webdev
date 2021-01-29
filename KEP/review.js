$(document).ready(function () {
    // This JSON file simulates a request to a database/api that stores information about orders
    // that the estimator would have entered into the room description page.
    var url = "./orders.json";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data) {
            console.log(data)
            $.each(data["orders"], function (i, order) {
                $("#summaries").append(`<div class="roomSummary">${createRoomTable(order)}</div>`);
                console.log(order)
            })
        }
    });


});

//Create a ƒ table for the provided room data
function createRoomTable(roomData) {
    var html = `<table>
    <thead>
        <tr>
            <th><a href="./roomDetails.html">"${roomData["name"]}"</a></th>
            <th>Job Item</th>
            <th>Order</th>
            <th>Coats</th>
            <th>Finish</th>
            <th>Gallons</th>
            <th>Time</th>
            <th>Labor Cost</th>
        </tr>
    </thead>
    <tbody>`;
    // Room & Size
    //each map is a category (row header)
    //in each map, the key is the dependent key and its value is an array of the table's columns
    // [             jobItem   , order, coats, finish, gallons, time, laborCost]
    // primary key: [hard-coded,   key,   key,    key,    calc, calc,      calc]
    var sizeKeys = {
        "length": ["Length", getFeet(roomData, "length"), , , , , ,],
        "width": ["Width", getFeet(roomData, "width"), , , , , ,],
        "height": ["Height", getFeet(roomData, "height"), , , , , ,],
        // linear feet
        "maskCover": ["Mask & Cover", getHours(roomData, "maskCover"), , , , getHours(roomData, "maskCover"), laborCost(roomData["maskCover"])],
        "rrHardware": ["R&R Hardware and Lighting", getHours(roomData, "rrHardware"), , , , getHours(roomData, "rrHardware"), laborCost(roomData["rrHardware"])],
        "roomSetupBreakdown": ["Room Setup & Breakdown", getHours(roomData, "roomSetupBreakdown"), , , , getHours(roomData, "roomSetupBreakdown"), laborCost(roomData["roomSetupBreakdown"])],
        "cleanTouchup": ["Cleanup & Touchup", getHours(roomData, "cleanTouchup"), , , , getHours(roomData, "cleanTouchup"), laborCost(roomData["cleanTouchup"])],
    };
    html += createRows(roomData, sizeKeys, "Room & Size");

    var miscKeys = {
        "furnitureTreatment": ["Furniture Treatment", getHours(roomData, "furnitureTreatment"), , , , getHours(roomData, "furnitureTreatment"), laborCost(roomData["furnitureTreatment"])],
        "windowTreatment": ["Window Treatment", getHours(roomData, "windowTreatment"), , , , getHours(roomData, "windowTreatment"), laborCost(roomData["windowTreatment"])],
        "prepWoodwork": ["Prep Woodwork", getHours(roomData, "prepWoodwork"), , , , getHours(roomData, "prepWoodwork"), laborCost(roomData["prepWoodwork"])],
        "patchTexture": ["Patch Texture", getHours(roomData, "patchTexture"), , , , getHours(roomData, "patchTexture"), laborCost(roomData["patchTexture"])],
    };
    html += createRows(roomData, miscKeys, "Miscellaneous");
    wallsKeys = {
        "wallsHeight": ["Wall Height", getWallsHeight(roomData, "wallsHeight"), , , , , ,],
        "wallsPrimeCoats": ["Prime Walls", , getCoats(roomData, "wallsPrimeCoats"), , gallons("wallsPrime", calculateSqFt(roomData)), estimatedTime("wallsPrime", roomData["wallsPrimeCoats"], calculateSqFt(roomData)), laborCost(calculateTime("wallsPrime", roomData["wallsPrimeCoats"], calculateSqFt(roomData)))],
        "wallsPaintCoats": ["Paint Walls", , getCoats(roomData, "wallsPaintCoats"), getFinish(roomData, "wallsPaintFinish"), gallons("wallsPaint", calculateSqFt(roomData)), estimatedTime(`wallsPaint${roomData["wallsHeight"]}`, roomData["wallsPaintCoats"], calculateSqFt(roomData)), laborCost(calculateTime(`wallsPaint${roomData["wallsHeight"]}`, roomData["wallsPaintCoats"], calculateSqFt(roomData)))],
        "ceilingsPrimeCoats": ["Prime Ceilings", , getCoats(roomData, "ceilingsPrimeCoats"), , gallons("ceilingsPrime", calculateSqFt(roomData)), estimatedTime("ceilingsPrime", roomData["ceilingsPrimeCoats"], calculateSqFt(roomData)), laborCost(calculateTime("ceilingsPrime", roomData["ceilingsPrimeCoats"], calculateSqFt(roomData)))],
        "ceilingsPaintCoats": ["Paint Ceilings", , getCoats(roomData, "ceilingsPaintCoats"), getFinish(roomData, "ceilingsPaintFinish"), gallons("ceilingsPaint", calculateSqFt(roomData)), estimatedTime("ceilingsPaint", roomData["ceilingsPaintCoats"], calculateSqFt(roomData)), laborCost(calculateTime("ceilingsPaint", roomData["ceilingsPaintCoats"], calculateSqFt(roomData)))],
        "bullnoseAccentHrs": ["Bullnose/Accent Wall", getHours(roomData, "bullnoseAccentHrs"), , , , getHours(roomData, "bullnoseAccentHrs"), laborCost(roomData["bullnoseAccentHrs"])],
        "closetsHrs": ["Closets", getHours(roomData, "closetsHrs"), , , , getHours(roomData, "closetsHrs"), laborCost(roomData["closetsHrs"])],
    };
    html += createRows(roomData, wallsKeys, "Walls & Ceilings");
    doorKeys = {
        "doorsFlat": ["Flat Doors", getDoors(roomData, "doorsFlat"), getCoats(roomData, "doorsFlatCoats"), getFinish(roomData, "doorsFlatFinish"), gallons("doorsFlat", roomData["doorsFlatCoats"]), estimatedTime("doorsFlat", roomData["doorsFlatCoats"], roomData["doorsFlat"]), laborCost(calculateTime("doorsFlat", roomData["doorsFlatCoats"], roomData["doorsFlat"]))],
        "doorsPaneled": ["Paneled Doors", getDoors(roomData, "doorsPaneled"), getCoats(roomData, "doorsPaneledCoats"), getFinish(roomData, "doorsPaneledFinish"), gallons("doorsPaneled", roomData["doorsPaneledCoats"]), estimatedTime("doorsPaneled", roomData["doorsPaneledCoats"], roomData["doorsPaneled"]), laborCost(calculateTime("doorsPaneled", roomData["doorsPaneledCoats"], roomData["doorsPaneled"]))],
        "doorsFrench": ["French Doors", getDoors(roomData, "doorsFrench"), getCoats(roomData, "doorsFrenchCoats"), getFinish(roomData, "doorsFrenchFinish"), gallons("doorsFrench", roomData["doorsFrenchCoats"]), estimatedTime("doorsFrench", roomData["doorsFrenchCoats"], roomData["doorsFrench"]), laborCost(calculateTime("doorsFrench", roomData["doorsFrenchCoats"], roomData["doorsFrench"]))],
        "doorsCasings": ["Door Casings", getDoors(roomData, "doorsCasings"), getCoats(roomData, "doorsCasingsCoats"), getFinish(roomData, "doorsCasingsFinish"), gallons("doorsCasings", roomData["doorsCasingsCoats"]), estimatedTime("doorsCasings", roomData["doorsCasingsCoats"], roomData["doorsCasings"]), laborCost(calculateTime("doorsCasings", roomData["doorsCasingsCoats"], roomData["doorsCasings"]))],
        "baseboardCoats": ["Baseboards", getLinearFeet(roomData), getCoats(roomData, "baseboardCoats"), getFinish(roomData, "baseboardFinish"), gallons("baseboards", calculateLnFt(roomData)), estimatedTime("baseboards", roomData["baseboardCoats"], calculateLnFt(roomData)), laborCost(calculateTime("baseboards", roomData["baseboardCoats"], calculateLnFt(roomData)))],
    }
    html += createRows(roomData, doorKeys, "Doors");
    windowKeys = {
        "windowsCasings": ["Casings", getWindows(roomData, "windowsCasings"), getCoats(roomData, "windowsCasingsCoats"), getFinish(roomData, "windowsCasingsFinish"), gallons("windows11", roomData["windows11Coats"]), estimatedTime("windowsCasings", roomData["windowsCasingsCoats"], roomData["windowsCasings"]), laborCost(calculateTime("windowsCasings", roomData["windowsCasingsCoats"], roomData["windowsCasings"]))],
        "windows11": ["1/1", getWindows(roomData, "windows11"), getCoats(roomData, "windows11Coats"), getFinish(roomData, "windows11Finish"), gallons("windows11", roomData["windows11Coats"]), estimatedTime("windows11", roomData["windows11Coats"], roomData["windows11"]), laborCost(calculateTime("windows11", roomData["windows11Coats"], roomData["windows11"]))],
        "windows37Panel": ["3/7 Panel", getWindows(roomData, "windows37Panel"), getCoats(roomData, "windows37PanelCoats"), getFinish(roomData, "windows37PanelFinish"), gallons("windows37Panel", roomData["windows37PanelCoats"]), estimatedTime("windows37Panel", roomData["windows37PanelCoats"], roomData["windows37Panel"]), laborCost(calculateTime("windows37Panel", roomData["windows37PanelCoats"], roomData["windows37Panel"]))],
        "windowsSingleFrame": ["Single Frame", getWindows(roomData, "windowsSingleFrame"), getCoats(roomData, "windowsSingleFrameCoats"), getFinish(roomData, "windowsSingleFrameFinish"), gallons("windowsSingleFrame", roomData["windowsSingleFrameCoats"]), estimatedTime("windowsSingleFrame", roomData["windowsSingleFrameCoats"], roomData["windowsSingleFrame"]), laborCost(calculateTime("windowsSingleFrame", roomData["windowsSingleFrameCoats"], roomData["windowsSingleFrame"]))],
        "windowsSills": [`Sills (${getAprons(roomData)} Aprons)`, getWindows(roomData, "windowsSills"), getCoats(roomData, "windowsSillsCoats"), getFinish(roomData, "windowsSillsFinish"), gallons("windowsSills", roomData["windowsSillsCoats"]), estimatedTime("windowsSills", roomData["windowsSillsCoats"], roomData["windowsSills"]), laborCost(calculateTime("windowsSills", roomData["windowsSillsCoats"], roomData["windowsSills"]))],
    };
    html += createRows(roomData, windowKeys, "Windows");
    otherKeys = {
        "chairRailCoats": ["Chair Rail", , getCoats(roomData, "chairRailCoats"), getFinish(roomData, "chairRailFinish"), gallons("chairRails", calculateLnFt(roomData)), estimatedTime("chairRails", roomData["chairRailCoats"], calculateLnFt(roomData)), laborCost(calculateTime("chairRails", roomData["chairRailCoats"], calculateLnFt(roomData)))],
        "crownMoldingCoats": ["Crown Molding", , getCoats(roomData, "crownMoldingCoats"), getFinish(roomData, "crownMoldingFinish"), gallons("crownMolding", calculateLnFt(roomData)), estimatedTime("crownMolding", roomData["crownMoldingCoats"], calculateLnFt(roomData)), laborCost(calculateTime("crownMolding", roomData["crownMoldingCoats"], calculateLnFt(roomData)))],
        "cabinetry": ["Cabinetry", getHours(roomData, "cabinetry"), , , gallons("cabinetry", roomData["cabinetry"]), getHours(roomData, "cabinetry"), laborCost(roomData["cabinetry"])],
    };
    html += createRows(roomData, otherKeys, "Other");
    html += `</tbody>
    </table>`;
    return html;
}

//count the number of rows in each category of room data
function countRows(roomData, checkKeys) {
    count = 0;
    for (var key in checkKeys) {
        if (roomData[key] != null && roomData[key] != 0) {
            count++;
        }
    }
    return count;
}

//create the table row with appropriate table headers and table database
//getKeys is the map of keys for the specific category
//header is the label for the category
function createRows(roomData, getKeys, header) {
    var isFirst = true;
    var html = ""
    for (var key in getKeys) {
        if (roomData[key] != null && roomData[key] != 0) {
            html += `<tr>`
            if (isFirst) {
                html += `<th rowspan="${countRows(roomData, getKeys)}">${header}</th>`
                isFirst = false;
            }
            var val = getKeys[key]
            for (var i = 0; i < val.length; i++) {
                var v = val[i]
                if (v == undefined) v = "";
                html += `<td>${v}</td>`
            }
            html += `</tr>`
        }
    }
    return html;
}

var baseRates = {
    // name: [rate, measuredBoolean]
    "wallsPrime": [180, true],
    "wallsPaint0to9ft": [170, true],
    "wallsPaint9to14ft": [155, true],
    "wallsPaint14ftPlus": [140, true],
    "ceilingsPrime": [150, true],
    "ceilingsPaint": [170, true],
    "doorsFlat": [.50, false],
    "doorsPaneled": [.75, false],
    "doorsFrench": [2.00, false],
    "doorsCasings": [.40, false],
    "baseboards": [35, true],
    "windowsCasings": [.40, false],
    "windows11": [1.00, false],
    "windows37Panel": [1.25, false],
    "windowsSingleFrame": [.50, false],
    "windowsSills": [.20, false],
    //TODO: aprons
    "chairRails": [50, true],
    "crownMolding": [50, true] //TODO: get this rate
}


// get the production rate for the given row
function getBaseRate(rateName, coats) {
    if (baseRates[rateName] !== undefined) {
        var rateIncrease = 0.5;
        var productionRate = baseRates[rateName][0];
        var measured = baseRates[rateName][1];

        if (measured) {
            return (productionRate / coats) + (productionRate / Math.pow(coats, 2) * rateIncrease) * (coats - 1)
        }
        else {
            return (productionRate * coats) - (productionRate * (coats - 1) * rateIncrease)
        }
    }
    //errors
    return 0;


}


//get labor cost for the row
function laborCost(estimatedTime) {
    var laborCost = 58.00;
    var total = (laborCost * estimatedTime).toFixed(2);
    return `$${total}`;
}

function calculateTime(rateName, coats, quantity) {
    var estimatedTime;
    if (coats == null || coats == 0 || quantity == null || quantity == 0) {
        return 0;
    }
    var baseRate = getBaseRate(rateName, coats);
    estimatedTime = (quantity / baseRate).toFixed(1);
    return estimatedTime;
}

function calculateSqFt(roomData) {
    var width = roomData["width"];
    var length = roomData["length"];
    var height = roomData["height"];
    if (width != null && width != 0 && length != null && length != 0 && height != null && height != 0) {
        return width * length * height
    }
    // errors
    return "x.x"
}

function calculateLnFt(roomData) {
    var width = roomData["width"];
    var length = roomData["length"];
    if (width != null && width != 0 && length != null && length != 0) {
        return width * 2 + length * 2
    }
    // errors
    return "x.x"
}

var spreads = {
    // name: [rate, measuredBoolean]
    "wallsPrime": 400,
    "wallsPaint0to9ft": 400,
    "wallsPaint9to14ft": 400,
    "wallsPaint14ftPlus": 400,
    "wallsPaint": 400,
    "ceilingsPrime": 350,
    "ceilingsPaint": 350,
    "doorsFlat": 14,
    "doorsPaneled": 14,
    "doorsFrench": 14,
    "doorsCasings": 10000,
    "baseboards": 400,
    "windowsCasings": 30,
    "windows11": 20,
    "windows37Panel": 20,
    "windowsSingleFrame": 20,
    "windowsSills": 16,
    //TODO: aprons
    "chairRails": 300,
    "crownMolding": 400, //TODO: get this spread
    "cabinetry": 20, //get this rate / need todo cabinetry module
}

function calculateGallons(rateName, quantity) {
    var spread = spreads[rateName];
    //TODO: Missing actual formula, need to account for coats
    var gals = (quantity / spread).toFixed(1);
    if (isNaN(gals)) {
        return "x.x"
    } else {
        return gals;
    }
}

//get gallons for the row
function gallons(rateName, quantity) {
    var gals = calculateGallons(rateName, quantity);
    if (gals == 1) {
        return "1 gal"
    }
    else if (gals == null) {
        return "x.x gals"
    }
    else {
        return `${gals} gals`
    }
}


// ---------- Helper functions for formatting units ----------
//get estimated time for the row
function estimatedTime(rateName, coats, quantity) {
    if (coats == null || coats == 0 || quantity == null || quantity == 0) {
        return `x.x hrs`
    }
    var hours = calculateTime(rateName, coats, quantity);
    if (hours == 1) {
        return hours + " hr";
    }
    else {
        return hours + " hrs";
    }
}

//return number of hours with "hrs"
function getHours(roomData, key) {
    var val = roomData[key];
    if (val != null && val != 0) {
        if (val == 1) return "1 hr";
        return `${val} hrs`
    }
    // error
    return ""
}

//return number of feet with "ft"
function getFeet(roomData, key) {
    var val = roomData[key];
    if (val != null && val != 0) {
        return `${val} ft`
    }
    return ""
}
//return number of coats with "coats"
function getCoats(roomData, key) {
    var val = roomData[key];
    if (val != null && val != 0) {
        if (val == 1) return "1 coat";
        return `${val} coats`
    }
    return ""
}

//return finish type
function getFinish(roomData, key) {
    var val = roomData[key];
    if (val != null) {
        return `${val}`
    }
    return ""
}

//return number of doors with "doors"
function getDoors(roomData, key) {
    var val = roomData[key];
    if (val != null) {
        if (val == 1) return "1 door";
        return `${val} doors`
    }
    return ""
}

//return number of windows with "windows"
function getWindows(roomData, key) {
    var val = roomData[key];
    if (val != null) {
        if (val == 1) return "1 window";
        return `${val} windows`
    }
    return ""
}

//return number of linear feet with "linear ft"
function getLinearFeet(roomData) {
    return `${calculateLnFt(roomData)} linear ft`;
}

//return if window sills are with or without aprons
function getAprons(roomData) {
    var val = roomData["aprons"];
    if (val != null) {
        if (val == "hasAprons") return "With";
        if (val == "noAprons") return "Without";
    }
    // errors
    return "";
}

//return formated string for wall height
function getWallsHeight(roomData, key) {
    var val = roomData[key];
    if (val != null) {
        if (val == "0to9ft") return "0-9 ft";
        if (val == "9to14ft") return "9-14 ft";
        if (val == "14ftPlus") return "14+ ft";
    }
    // errors
    return ""
}

