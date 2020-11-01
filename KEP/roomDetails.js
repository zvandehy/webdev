
$(document).ready(function () {

    //add spinner/counter function with jquery
    addCounterHandlers();

    //focus the input when user selects "units" span
    var counters = document.getElementsByClassName("handle-counter")
    for (const node of counters) {
        const input = node.childNodes[3]
        const span = node.childNodes[4]
        span.onclick = function () {
            input.focus()
        }
    }

    //open and close sections, only one section open at a time
    var sectionHeaders = document.getElementsByTagName("section")
    for (const node of sectionHeaders) {
        node.onclick = function () {
            for (const oNode of sectionHeaders) {
                getChildByClass(oNode, "inputs").style.display = "none"
            }
            getChildByClass(node, "inputs").style.display = "grid"
        }
    }

    //disable "Enter" from submitting form cite:https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});

function addCounterHandlers() {
    var options = {
        minimum: 0,
        maximize: 100,
        onChange: function (num) { },
        onMinimum: function () {
        },
        onMaximize: function () {
        }
    }
    $(".handle-counter").handleCounter(options)
}

function getChildByClass(node, cls) {
    const children = node.childNodes
    for (const child of children) {
        if (child.className == cls) {
            return child
        }
    }
    return null
}