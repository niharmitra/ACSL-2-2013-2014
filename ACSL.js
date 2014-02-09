var input_box = document.getElementById("input_box");
var submit_button = document.getElementById("submit_button");
var input; //makes sure input is a global variable

submit_button.onclick = function() {
	input = readCommand();
	window.alert(input);
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

/*takes input and rounds accordingly
Only called on decimal values*/
function round(input) {
	//finds amount of space available according to string (number of &'s)
	var space = input[0].match(/&/g).length;
	//used to allow usage of Math.round(integer)
	var round_factor = Math.pow(10, space);
	return Math.round(input[1]*round_factor)/round_factor;
}

//takes input and fills the *'s as needed
function fill(input) {
	//finds the number of digits in the value
	var digits = input[1].toString().length-1; //minus 1 because of .
}