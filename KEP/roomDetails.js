
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

    // jQuery UI: Accordion
    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content",
        animate: 400,
        icons: {
            header: "ui-icon-plus",
            activeHeader: "ui-icon-minus",
        }
    }
    );

    //jQuery UI: SelectMenu
    $("select").each(function () { $(this).selectmenu(); })

    //jQuery UI: Checkboxradio
    $("input[type=radio]").each(function () {
        $(this).checkboxradio({
            icon: false,
        }
        );
    })

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

    var $counters = $(".handle-counter")
    for (var i = 0; i < $counters.length; i++) {
        // Add handleCounter function (see handleCounter.js plugin file)
        $($counters[i]).handleCounter(options);
    }
}