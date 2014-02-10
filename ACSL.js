var input_box = document.getElementById("input_box");
var submit_button = document.getElementById("submit_button");
var input; //makes sure input is a global variable
var output;

submit_button.onclick = function() {
	input = readCommand();
	if(input[0].search("E")!=-1) {
		output = exponentialForm(input);
	}
	else if(input[0].indexOf('*$')!=-1) {
		//removes the *$ once processed
		input[0] = input[0].slice(2);
		output = process(input);
		output_array = new Array();
		output_array[0] = output.substring(0,output.lastIndexOf("*"));
		output_array[1] = output.slice(output.lastIndexOf("*"));
		console.log(output_array);
		output = output_array[0] + "$" + output_array[1];
	}
	else if(input[0].indexOf("$") != -1)  {
		input[0] = input[0].slice(1);
		output = process(input);
		output = "$"+output;
	}
	else if(input[0].search(",") != -1) {
		output = comma(process(input));
	}
	else {
		output = process(input);
	}
	displayOutput(output);

}

function readCommand() {
	input = input_box.value;
	if(input == null) {
		window.alert("Please enter valid input");
	}
	//splits input into array of two elements
	input = input.split(", ");
	input[0] = input[0].toString();
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
	if(string.length<=1) {
		digits += 1; //add back the 1 subtracted above (assumed decimal)
		output = input_param[1];
		for(var i=1;i<=(space-digits);i++) {
			output = "*"+output;
		}
		return output.toString();
	}
	else {
		//dec_space is amount of space after decimal point
		var dec_space = string[1].match(/&/g).length;
		var dec_digits = input_param[1].toString().split(".");
		dec_digits = dec_digits[1].length;
	}
	output = input_param[1];
	//does rounding when needed
	if(dec_space<dec_digits) {
		var round_factor = Math.pow(10, dec_digits);
		output = Math.round(input_param[1]*round_factor)/round_factor;
	}
	for(var i=1;i<=(space-digits+dec_digits);i++) {
		output = "*"+output;
	}
	for(var j=1; j<=dec_space-dec_digits;j++) {
		output += "0";
	}
	return output.toString();
}

function comma(output_param) {
	var num = Math.floor(output_param.length/3);
	var output_array = output_param.toString().split("");
	console.log(output_array);
	for(var i=output_array.length-1; i>=0; i--) {

	}
	// for(var i=1; i<num; i++) {
	// 	if(i==1){
	// 		var index = -3;
	// 	}
	// 	else {
	// 		var index = output_array.toString().indexOf(",") - 4;
	// 		console.log(output_array.toString().indexOf(","));
	// 	}
	// 	output_array.splice(index, 0, ",");
	// 	//= output_param.toString().slice(0,index-1)+","+output_param.toString().slice(index);
	// }
	// output = "";
	// for(var j=0; j<output_array.length;j++) {
	// 	output += output_array[j];
	// }
	// console.log(output);
	// return output;
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