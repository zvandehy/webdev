//Global variables
var prevCalc = 0;
var calc = "";


//The following function displays a number in the textfield when a number is clicked.
//Note that it keeps concatenating numbers which are clicked. 
function showNum(value) {
    document.frmCalc.txtNumber.value += value; //3
}

//The following function decreases the value of displayed number by 1.
//isNaN method checks whether the value passed to the method is a number or not.     
function decrement() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        num--;
        document.frmCalc.txtNumber.value = num; //1
    }
}

//The following function is called when "Add" button is clicked. 
//Note that it also changes the values of the global variables.       
function add() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        prevCalc = num;
        document.frmCalc.txtNumber.value = "";
        calc = "Add";
    }
}
//Called when "multiply" button ("*") is clicked
//changes global variables
function multiply() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        prevCalc = num;
        document.frmCalc.txtNumber.value = "";
        calc = "mult";
    }
}
//Called when "sqrt" button is clicked
//changes global variables
function sqrt() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        num = Math.sqrt(num);
        document.frmCalc.txtNumber.value = num;
    }
}
//Called when "subtract" button ("-") is clicked
//changes global variables
function subtract() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        prevCalc = num;
        document.frmCalc.txtNumber.value = "";
        calc = "sub";
    }
}
//Called when "multiply" button ("*") is clicked
//changes global variables
function divide() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        prevCalc = num;
        document.frmCalc.txtNumber.value = "";
        calc = "div";
    }
}
//Called when "pow" button ("^") is clicked
//changes global variables
function pow() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        prevCalc = num;
        document.frmCalc.txtNumber.value = "";
        calc = "pow";
    }
}
//Called when "pow2" button ("^2") is clicked
//changes global variables
function pow2() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        num = Math.pow(num, 2);
        document.frmCalc.txtNumber.value = num;
    }
}
//Called when "increment" button ("++") is clicked
//changes global variables
function increment() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        num++;
        document.frmCalc.txtNumber.value = num;
    }
}
//Called when "floor" button is clicked
//changes global variables
function flr() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        num = Math.floor(num);
        document.frmCalc.txtNumber.value = num;
    }
}
//Called when "round" button is clicked
//changes global variables
function rnd() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        num = Math.round(num);
        document.frmCalc.txtNumber.value = num;
    }
}


//The following function is called when "Calculate" button is clicked.
//Note that this function is dependent on the value of global variable.        
function calculate() {
    var num = parseFloat(document.frmCalc.txtNumber.value);
    if (!(isNaN(num))) {
        var total;
        switch (calc) {
            case "Add":
                total = prevCalc + num;
                break;
            case "mult":
                total = prevCalc * num;
                break;
            case "sub":
                total = prevCalc - num;
                break;
            case "div":
                total = prevCalc / num;
                break;
            case "pow":
                total = Math.pow(prevCalc, num);
                break;
        }
        document.frmCalc.txtNumber.value = total;
    }
}

function clear() {
    document.frmCalc.txtNumber.value = "";
    prevCalc = 0;
    calc = "";
}