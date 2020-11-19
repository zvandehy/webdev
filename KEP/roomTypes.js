var rooms = new Map()
rooms.set("Bedroom", ["Bedroom", "Master Bedroom"])
rooms.set("Bathroom", ["Bathroom", "Master Bathroom", "Jack-n-Jill Bathroom", "Commode Room", "Powder Room"])
rooms.set("Living Room", ["Living Room", "Family Room", "Den", "Loft"])
rooms.set("Kitchen", ["Kitchen", "Kitchen & Family Room"])
rooms.set("Dining Room", ["Dining Room"])
rooms.set("Office", ["Office"])
rooms.set("Closet", ["Closet", "Master Closet"])
rooms.set("Passageways", ["Hallway", "Stairway", "Entry Area", "Landing"])
// rooms.set("Other", ["Other"])



window.onload = function () {
    generateRoomTypes();
    getModalReady();
};

function getModalReady() {
    //modal
    var modal = document.getElementById("roomTypeModal")

    //close modal when click off of modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //close modal when clicking the "x" close
    document.getElementsByClassName("close")[0].onclick = function () {
        modal.style.display = "none";
    }

    //roomType elements displayed as photos
    var roomTypes = document.getElementsByClassName("roomType")

    //show modal for each roomType
    for (let i = 0; i < roomTypes.length; i++) {
        const roomType = roomTypes[i];
        // display appropriate modal when clicking roomtype
        roomType.onclick = function () {
            //remove old modal children
            const modalContent = document.getElementsByClassName("modal-content")[0]
            const subTypesDiv = document.getElementsByClassName("subtypes")[0]
            removeAllChildNodes(subTypesDiv)

            const nameInput = document.getElementsByClassName("modal-bottom")[0].childNodes[2]

            // append new children from map to modal
            const subTypes = rooms.get(roomType.textContent)
            for (let j = 0; j < subTypes.length; j++) {
                const subType = subTypes[j];
                const textNode = document.createTextNode(subType)
                const container = document.createElement("span")
                container.appendChild(textNode)
                container.className = "subType"
                if (j == 0) {
                    container.className += " selected"
                }
                container.onclick = function () {
                    document.getElementsByClassName("selected")[0].className = "subType"
                    container.className += " selected"
                    nameInput.value = container.textContent + " 1"
                    nameInput.focus()
                }
                container.appendChild(document.createElement("span"))
                subTypesDiv.appendChild(container)
            }

            //display modal
            modal.style.display = "block"
            nameInput.value = document.getElementsByClassName("selected")[0].textContent + " 1"
            nameInput.focus()
        }
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getChildByClass(node, targetClass) {
    for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if (child.className == targetClass) {
            return child
        }
    }
    return null
}



function generateRoomTypes() {
    for (const roomType of rooms.keys()) {

        var roomTypeDiv = document.createElement("div")
        roomTypeDiv.className = "roomType"

        var cover = document.createElement("div")
        cover.className = "cover"

        var roomName = document.createElement("div")
        roomName.className = "roomName"
        roomName.appendChild(document.createTextNode(roomType))

        var imgNode = document.createElement("img")
        imgFile = roomType.replace(" ", "").toLowerCase()
        imgNode.src = `./src/${imgFile}.jpg`
        imgNode.alt = `${roomType} Image`

        roomTypeDiv.appendChild(cover)
        roomTypeDiv.appendChild(roomName)
        roomTypeDiv.appendChild(imgNode)

        document.getElementById("typesGrid").appendChild(roomTypeDiv)
    }
}