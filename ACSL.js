var input_box = document.getElementById("input_box");
var submit_button = document.getElementById("submit_button");
var input;

submit_button.onclick = function() {
	input = readCommand();
	if(input.search("E")!=-1) {

	}
}

function readCommand() {
	input = input_box.value;
	//splits input into array of two elements
	input = input.split(", ");
	input[1] = parseFloat(input[1]);
	return input;
}

//takes input and rounds accordingly
function round(input) {
	//finds amount of space available according to string
	var space = input[0].match(/&/g).length;
	//finds the number of digits in the value
	var digits = input[1].toString().length;

	Math.round(input[1]*)
}