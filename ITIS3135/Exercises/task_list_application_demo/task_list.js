"use strict";
$(document).ready(function () {

    $("#add_task").click(function () {
        var textbox = $("#task");
        var task = textbox.val();
        if (task === "") {
            alert("Please enter a task.");
            textbox.focus();
        } else {
            // add task to web storage
            var tasks = localStorage.S15tasks || "";  // default value of empty string
            localStorage.S15tasks = tasks.concat(task, "\n");

            // store a 21 day expiration
            var due = new Date();
            due.setDate(due.getDate() + 21);
            localStorage.expiration = due.toDateString();

            // clear task text box and re-display tasks
            textbox.val("");
            displayTasks();
        }
    });

    var displayTasks = function () {
        //$("#task_list").val( localStorage.tasks );

        var expiration = new Date(localStorage.expiration);
        var today = new Date();
        if (expiration.getTime() < today.getTime()) {
            localStorage.removeItem("S15tasks");
            localStorage.removeItem("expiration");
        } else {
            $("#task_list").val(localStorage.S15tasks);
        }

        $("#task").focus();
    };


    $("#clear_tasks").click(function () {
        localStorage.removeItem("S15tasks");
        localStorage.removeItem("expiration");
        $("#task_list").val("");
        $("#task").focus();
    });

    // display tasks on initial load
    displayTasks();
});

