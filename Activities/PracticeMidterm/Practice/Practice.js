var $ = function (id) {
	return document.getElementById(id);
};

var order = [];
var total = 0.00;



window.onload = function () {

	updateOrder()

	//add onclick event handler for each image
	$("espresso").onclick = function () {
		if (!order.includes("cappuccino")) {
			// for click event add item to order and update total
			order[order.length] = "espresso";
			total += 1.95;
			// display order and total
			updateOrder()
		}
	}

	$("cappuccino").onclick = function () {
		// for click event add item to order and update totl
		if (!order.includes("cappuccino")) {
			order[order.length] = "cappuccino";
			total += 3.45;
			updateOrder()
		}
	}

	$("clear_order").onclick = function () {
		order = []
		total = 0.00
		updateOrder()
	}

}; // end onload

function updateOrder() {
	if (order.includes("cappuccino")) {
		$("cappuccinoContent").style.display = "inline-block"
	} else {
		$("cappuccinoContent").style.display = "none"
	}
	if (order.includes("espresso")) {
		$("espressoContent").style.display = "inline-block"
	} else {
		$("espressoContent").style.display = "none"
	}

	console.log($("total").firstChild.textContent = `Total $${total}`)

}