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
	else {
		output = process(input);
		displayOutput(output);
	}
}

function readCommand() {
	input = input_box.value;
	if(input == null) {
		window.alert("Please enter valid input");
	}
	//splits input into array of two elements
	input = input.split(", ");
	input[1] = parseFloat(input[1]);
	return input;
}

//takes input and fills the *'s, 0's or rounds as needed
function process(input_param) {
	var string = input_param[0].split(".");
	//space is amount of space in front of decimal
	var space = string[0].match(/&/g).length;

	//finds the number of digits in the value
	var digits = input_param[1].toString().length-1; //minus 1 because of .

	//if there isn't a decimal, directly fill with *'s
	if(string.length<2) {
		console.log("Processing non-decimal");
		digits += 1; //add back the 1 subtracted above (assumed decimal)
		console.log(digits);
		console.log(space);
		output = input_param[1];
		for(var i;i<=space-digits;i++) {
			output = "*"+output;
			console.log(output);
		}
		return output;
	}
	
	//dec_space is amount of space after decimal point
	var dec_space = string[1].match(/&/g).length;


	if(space<digits) {
		var round_factor = Math.pow(10, digits);
		return Math.round(input_param[1]*round_factor)/round_factor;
	}
	else {

	}
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