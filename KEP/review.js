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

//Create a summary table for the provided room data
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
        "maskCover": ["Mask & Cover", getHours(roomData, "maskCover"), , , , getHours(roomData, "maskCover"), laborCost()],
        "rrHardware": ["R&R Hardware and Lighting", getHours(roomData, "rrHardware"), , , , getHours(roomData, "rrHardware"), laborCost()],
        "roomSetupBreakdown": ["Room Setup & Breakdown", getHours(roomData, "roomSetupBreakdown"), , , , getHours(roomData, "roomSetupBreakdown"), laborCost()],
        "cleanTouchup": ["Cleanup & Touchup", getHours(roomData, "cleanTouchup"), , , , getHours(roomData, "cleanTouchup"), laborCost()]
    };
    html += createRows(roomData, sizeKeys, "Room & Size");

    var miscKeys = {
        "furnitureTreatment": ["Furniture Treatment", getHours(roomData, "furnitureTreatment"), , , , getHours(roomData, "furnitureTreatment"), laborCost()],
        "windowTreatment": ["Window Treatment", getHours(roomData, "windowTreatment"), , , , getHours(roomData, "windowTreatment"), laborCost()],
        "prepWoodwork": ["Prep Woodwork", getHours(roomData, "prepWoodwork"), , , , getHours(roomData, "prepWoodwork"), laborCost()],
        "patchTexture": ["Patch Texture", getHours(roomData, "patchTexture"), , , , getHours(roomData, "patchTexture"), laborCost()]
    };
    html += createRows(roomData, miscKeys, "Miscellaneous");
    wallsKeys = {
        "wallsHeight": ["Wall Height", getWallsHeight(roomData, "wallsHeight"), , , , , ,],
        "wallsPrimeCoats": ["Prime Walls", , getCoats(roomData, "wallsPrimeCoats"), , gallons(), estimatedTime(), laborCost()],
        "wallsPaintCoats": ["Paint Walls", , getCoats(roomData, "wallsPaintCoats"), getFinish(roomData, "wallsPaintFinish"), gallons(), estimatedTime(), laborCost()],
        "ceilingsPrimeCoats": ["Prime Ceilings", , getCoats(roomData, "ceilingsPrimeCoats"), , gallons(), estimatedTime(), laborCost()],
        "ceilingsPaintCoats": ["Paint Ceilings", , getCoats(roomData, "ceilingsPaintCoats"), getFinish(roomData, "ceilingsPaintFinish"), gallons(), estimatedTime(), laborCost()],
        "bullnoseAccentHrs": ["Bullnose/Accent Wall", getHours(roomData, "bullnoseAccentHrs"), , , , getHours(roomData, "bullnoseAccentHrs"), laborCost()],
        "closetsHrs": ["Closets", getHours(roomData, "closetsHrs"), , , , getHours(roomData, "closetsHrs"), laborCost()],
    };
    html += createRows(roomData, wallsKeys, "Walls & Ceilings");
    doorKeys = {
        "doorsFlat": ["Flat Doors", getDoors(roomData, "doorsFlat"), getCoats(roomData, "doorsFlatCoats"), getFinish(roomData, "doorsFlatFinish"), gallons(), estimatedTime(), laborCost()],
        "doorsPaneled": ["Paneled Doors", getDoors(roomData, "doorsPaneled"), getCoats(roomData, "doorsPaneledCoats"), getFinish(roomData, "doorsPaneledFinish"), gallons(), estimatedTime(), laborCost()],
        "doorsFrench": ["French Doors", getDoors(roomData, "doorsFrench"), getCoats(roomData, "doorsFrenchCoats"), getFinish(roomData, "doorsFrenchFinish"), gallons(), estimatedTime(), laborCost()],
        "doorsCasings": ["Door Casings", getDoors(roomData, "doorsCasings"), getCoats(roomData, "doorsCasingsCoats"), getFinish(roomData, "doorsCasingsFinish"), gallons(), estimatedTime(), laborCost()],
        "baseboardCoats": ["Baseboards", getLinearFeet(roomData), getCoats(roomData, "baseboardCoats"), getFinish(roomData, "baseboardFinish"), gallons(), estimatedTime(), laborCost()]
    }
    html += createRows(roomData, doorKeys, "Doors");
    windowKeys = {
        "windowsCasings": ["Casings", getWindows(roomData, "windowsCasings"), getCoats(roomData, "windowsCasingsCoats"), getFinish(roomData, "windowsCasingsFinish"), gallons(), estimatedTime(), laborCost()],
        "windows11": ["1/1", getWindows(roomData, "windows11"), getCoats(roomData, "windows11Coats"), getFinish(roomData, "windows11Finish"), gallons(), estimatedTime(), laborCost()],
        "windows37Panel": ["3/7 Panel", getWindows(roomData, "windows37Panel"), getCoats(roomData, "windows37PanelCoats"), getFinish(roomData, "windows37PanelFinish"), gallons(), estimatedTime(), laborCost()],
        "windowsSingleFrame": ["Single Frame", getWindows(roomData, "windowsSingleFrame"), getCoats(roomData, "windowsSingleFrameCoats"), getFinish(roomData, "windowsSingleFrameFinish"), gallons(), estimatedTime(), laborCost()],
        "windowsSills": [`Sills (${getAprons(roomData)} Aprons)`, getWindows(roomData, "windowsSills"), getCoats(roomData, "windowsSillsCoats"), getFinish(roomData, "windowsSillsFinish"), gallons(), estimatedTime(), laborCost()]
    };
    html += createRows(roomData, windowKeys, "Windows");
    otherKeys = {
        "chairRailCoats": ["Chair Rail", , getCoats(roomData, "chairRailCoats"), getFinish(roomData, "chairRailFinish"), gallons(), estimatedTime(), laborCost()],
        "crownMoldingCoats": ["Crown Molding", , getCoats(roomData, "crownMoldingCoats"), getFinish(roomData, "crownMoldingFinish"), gallons(), estimatedTime(), laborCost()],
        "cabinetry": ["Cabinetry", getHours("cabinetry"), , , gallons(), estimatedTime(), laborCost()],
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

//return number of hours with "hrs"
function getHours(roomData, key) {
    var val = roomData[key];
    if (val != null && val != 0) {
        if (val == 1) return "1 hr";
        return `${val} hrs`
    }
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
    var width = roomData["width"];
    var length = roomData["length"];
    if (width != null && width != 0 && length != null && length != 0) {
        return `${width * 2 + length * 2} linear ft`
    }
    return "x.x linear ft"
}

//return if window sills are with or without aprons
function getAprons(roomData) {
    var val = roomData["aprons"];
    if (val != null) {
        if (val == "hasAprons") return "With";
        if (val == "noAprons") return "Without";
    }
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
    return ""
}

//get labor cost for the row
function laborCost() {
    return "$xxx.xx";
}

//get estimated time for the row
function estimatedTime() {
    return "x.x hrs"
}

//get gallons for the row
function gallons() {
    return "gals"
}
