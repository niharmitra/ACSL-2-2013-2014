var input_box = document.getElementById("input_box");
var submit_button = document.getElementById("submit_button");
var input; //makes sure input is a global variable
var output;

submit_button.onclick = function() {
	input = readCommand();
	if(input[0].search("E")!=-1) {
		output = exponentialForm(input);
		displayOutput(output);
	}
	else if(input[0].search(/\*$/)!=-1){
		//removes the *$ once processed
		input[0] = input[0].slice(1);
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
function round(input_param) {
	//finds amount of space available according to string (number of &'s)
	var space = input_param[0].match(/&/g).length;
	//used to allow usage of Math.round(integer)
	var round_factor = Math.pow(10, space-2);
	console.log(space);
	console.log(round_factor);
	return Math.round(input_param[1]*round_factor)/round_factor;
}

//takes input and fills the *'s as needed
function fill(input_param) {
	
}

function decimal(input_param) {
	//finds amount of space available according to string (number of &'s)
	var space = input_param[0].match(/&/g).length;
	//finds the number of digits in the value
	var digits = input_param[1].toString().length-1; //minus 1 because of .
}

function exponentialForm(input_param) {
	var decimal_limit = input_param[0].match(/&/g).length - 1;
	//minus 1 because it is a decimal limit not digit limit (excludes first digit)
	output = input_param[1].toExponential(decimal_limit);
	var output_array = output.split("e+");
	output = output_array[0]+"E"+output_array[1];
	return output;
}

function displayOutput(output_param) {
	document.body.appendChild(document.createElement("br"));
	document.body.appendChild(document.createTextNode(output_param));
}